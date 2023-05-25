import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { jobpostactions } from '../../../api/agent'
import { RootState } from '../../../app/store'
import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from '../JobPostDetails'
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";


function JobpostsactionApproval() {
  const jobsdata = useSelector((store: RootState) => store.JobPostAction)
  const Logindata = useSelector((store: RootState) => store.Login)
  const { JobCode } = useParams()
  // console.log(JobCode)
  //     const [jobpostobject,setJobpostobject]=useState()
  // const jobpostdata=useSelector(store=>store.JobPostAction)
  //     console.log(jobcode)
  const [res, setres] = useState("")
  const [comments, setcomments] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [jobdata, setjobdata] = useState<IJobPost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);
  useEffect(() => {
    if (jobdata == null) {
      console.log(jobdata)
      console.log(Logindata.username)
      dispatch(getJobPostActionfromapi({"ApproverName":Logindata.username}))
      // dispatch(getJobPostActionfromapi("sbatchu"))
    }
    console.log(Logindata)
    setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  }, [])
  // console.log(jobdata)
  const onsubmithandle = () => {
    // console.log(res)
    // console.log(comments)



    var payloaddata: any = {}
    if (res) {

      payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
      payloaddata.JobPostId = jobdata.JobPostID
      payloaddata.ApprovalStatus = res
      payloaddata.ApprovalComments = comments
    }
    if (res) {
      if (!(res == "Rejected" && comments == "")) {
        try {
          console.log(payloaddata)
          setShowspinner(true)
          jobpostactions.jobpostactionssubmit(payloaddata)
          .then(res => {
            setShowspinner(false)
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
          })
          .then(() => setTimeout(() => { navigate(-1); }, 2000))
          .catch(ex => {
            // console.log(ex);
            setShowspinner(false)                                    
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
          })
        }catch (err) {
          console.log(err)

          setShowspinner(false)

      }
        // dispatch(jobpostactionssubmit(payloaddata))
      }
    }
  }
  return (
    
    <div>
      {console.log("return")}
                  <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
      <Card title="Business Head Approval">
      <Panel header={"Job Post Details"} style={{ width  : '100%', marginBottom: '2em' }}>
      <JobPostDetails JobData={jobdata}></JobPostDetails>






      </Panel>

<Panel header={"Approval"}>
        <div className="grid">
        
          <div className="md:col-12">
            <span><label className="radio-inline mx-3">Approve
              <RadioButton className='ml-2' inputId="city3" name="city" value="Approved" onChange={(e) => setres(e.value)} checked={res === 'Approved'} />
              
            </label>
            </span>

            <span><label className="radio-inline me-3">Reject
              <RadioButton className='ml-2' inputId="city4" name="city" value="Rejected" onChange={(e) => setres(e.value)} checked={res === 'Rejected'} />
            </label>
            </span>


          </div>


          <div className="md:col-12">
            <div className="ml-10">
              Comments:
              {/* <label for="floatingTextarea2">Comments</label>
              <textarea id="address" rows="4" class="p-inputtextarea p-inputtext p-component mt-3" style={{ width: "100%" }}></textarea> */}
              <InputTextarea style={{width:"100%"}} maxLength={1000} className={res == "Rejected" && comments == "" ? "p-invalid" : ""} aria-label='Approve' cols={80} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
            <small hidden={res == "Rejected" && comments == "" ? false : true} id="username2-help" className={res == "Rejected" && comments == "" ? "p-error block" : ""}>Comments are Required when Rejected*.</small>
            </div>
          </div>




        </div>

        </Panel>
        <br></br>
<div style={{float:"right"}}>

        <Button className='btn ' disabled={(res!="Rejected"&&res!="Approved")||(res == "Rejected" && comments == "") } onClick={e => { onsubmithandle(); }}> Submit</Button>
        <Button  className='btn  ml-4'onClick={e => navigate(-1)}> Cancel</Button><span>   </span>
</div>
<br>
</br>
<br></br>
     
      </Card>
      </LoadingOverlay>
    </div>
  )
  // return (
  //   <div>
  //     <JobPostProfileUpload JobData={jobdata}></JobPostProfileUpload>
  //     <button>Add Candidate</button>
  //     <button>Generate Report</button>
  //     <div>
  //       <DataTable value={jobpostactionsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={['JobPostID', 'JobCode', 'HiringManager', 'Company', 'BusinessUnit', 'ServiceLine', 'Customer', 'ExperianceLevel', 'NoOfPositions']} filters={filters2} header={Headercomp}>
  //         <Column field="JobCode" header="Job Code" body={rowdata =>
  //           // <Button 
  //           // // to={"dashboard/jobpostsactionApproval/"+rowdata.JobCode} 
  //           //  onClick={e=>
  //           //     // Redirect("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
  //           //     // handleredirect(rowdata.JobCode)
  //           // //  usehistory.push("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
  //           // //  navigate("/jobpostsactionApproval/"+rowdata.JobCode)

  //           // }
  //           //  >{rowdata.JobCode}</Button>

  //           <Link to={"/jobpostsactionApproval/" + rowdata.JobCode} state={rowdata}  >{rowdata.JobCode}</Link>



  //         }></Column>
  //         <Column field="JobTitle" header="Job Title" ></Column>
  //         <Column field="HiringManager" header="Hiring Manager" ></Column>
  //         <Column field="Industry" header="Industry" ></Column>
  //         <Column field="Company" header="Company" ></Column>
  //         <Column field="BusinessUnit" header="BusinessUnit" ></Column>
  //         <Column field="ServiceLine" header="ServiceLine" ></Column>
  //         <Column field="Customer" header="Customer" ></Column>
  //         <Column field="ExperianceLevel" header="Experiance Level" ></Column>
  //         <Column field="OnBoardingDate" header="Expected DOJ" ></Column>
  //         <Column field="NoOfPositions" header="No Positions" ></Column>
  //         <Column field="Stage" header="Status" ></Column>

  //       </DataTable>


  //     </div>
  //   </div>
  // )

}

export default JobpostsactionApproval