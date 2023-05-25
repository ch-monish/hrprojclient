import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '../../app/store'
import { getJobPostActionfromapi, IJobPost } from '../../features/JobPostActions/jobpostactionsslice'
import { Imyjobpost } from '../../features/JobPostActions/myjobpostsslice'
import JobPostDetails from './JobPostDetails'
import { getCandidatefromapi } from '../../features/CandidateActions/candidateactionsslice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'

function Jobpostdetailedview() {
  const jobsdata = useSelector((store: RootState) => store.myjobposts)
  const Logindata = useSelector((store: RootState) => store.Login)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { JobCode } = useParams()
  const candidatesdata = useSelector((store: RootState) => store.Candidatesforjobpost)
  const [jobdata, setjobdata] = useState<IJobPost | Imyjobpost | any>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const [globalFilterValue2, setGlobalFilterValue2] = useState("");
const onGlobalFilterChange2 = (e: any) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
};
  
  useEffect(() => {
    console.log(JobCode)
    if (jobdata == null) {
      console.log(jobdata)
      console.log(Logindata.username)
      dispatch(getJobPostActionfromapi({ "ApproverName": Logindata.username }))

      // dispatch(getJobPostActionfromapi("sbatchu"))
    }
    console.log(Logindata)
    console.log(jobdata)
    setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
    dispatch(getCandidatefromapi({
      "jobpostID": jobdata.JobPostId
    }))
    console.log(jobsdata)
  }, [])


  const linktemplate=(rowdata) =>{
    return(
        <Link to="/candidate/candidatedetailsview" state={rowdata}>{rowdata.CandidateCode}</Link>
    )
}

const formatDate = (rowdata:any) => {
    return new Date(rowdata.ExpectedDOJ).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
  }
  const formatCurrency = (rowdata:any) => {
    return rowdata.CurrentCTC?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:0 });
  }
  const formatCurrencyectc = (rowdata:any) => {
    return rowdata.ExpectedCTC?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:0 });
  }

  const Headercomp = () => {
    return (
        <div
            className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
        >
            <h4>Candidates Details</h4>


            <span style={{ width: "30%" }}></span>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
            </span>

          
        </div>
    );
};  

// const rowClass = (data) => {
//   return {
//       'bg-primary': true
//   };
// };

  return (
    
    <div>

      <Card>
        <Panel header={<h4>Job Post Details </h4>}>

          <JobPostDetails JobData={jobdata}></JobPostDetails>
          <br></br>

          {/* {console.log(jobdata)} */}
          {jobdata.approversDetails ?
            <>  <Panel header="Business Unit Head Approver">
              <div className="grid">
                <div className="md:col-4">
                  Name : {jobdata.approversDetails[0].FirstName + ", " + jobdata.approversDetails[0].LastName}
                </div>
                <div className="md:col-2">
                  Status : {jobdata.approversDetails[0].approvalStatus == "N" ? "Pending" : jobdata.approversDetails[0].approvalStatus == "R" ? "Rejected" : "Approved"}
                </div>
                <div className="md:col-2">
                  Approval Date : {jobdata.approversDetails[0].approvalDate ? <>{new Date(jobdata.approversDetails[0].approvalDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}</> : <></>
                  }
                </div>
                <div className="md:col-4">
                  Comments : {jobdata.approversDetails[0].approvalComments
                  }
                </div>
              </div>
            </Panel>
              <br></br>
              <Panel header="HR Details">
                <div className="grid">
                  <div className="md:col-4">
                    Name : {jobdata.approversDetails[1].FirstName + ", " + jobdata.approversDetails[1].LastName}
                  </div>
                  <div className="md:col-2">
                    Status : {jobdata.approversDetails[1].approvalStatus == "N" ? "Profiles Pending" : jobdata.approversDetails[0].approvalStatus == "R" ? "Rejected" : "Approved"}
                  </div>
                  {/* <div className="md:col-5">
                  Comments : {jobdata.approversDetails[1].approvalComments
                  }
                </div> */}

                </div>
              </Panel></>
            : <></>}
          <br></br>
          <DataTable value={candidatesdata}   showGridlines={true} responsiveLayout="scroll" style={{}} paginator={true} rowsPerPageOptions={[10,20,50]} rows={10}
globalFilterFields={['CandidateCode', 'candidatefullname', 'overallexperience', 'ExpectedDOJ', "CurrentCTC",'ExpectedCTC', 'Email','stage_name']}filters={filters2} emptyMessage="No data found." header={Headercomp}>
                    <Column field="CandidateCode" header="Code" body={linktemplate} sortable></Column>
                    <Column field="candidatefullname" header="Name"  sortable></Column>
                    <Column field="overallexperience" header="Overall Experience (in years)"  sortable style={{ minWidth: '8rem', maxWidth : '8rem'}}></Column>
                    <Column field="ExpectedDOJ" header="Expected DOJ" body={formatDate}  sortable style={{ minWidth: '8rem', maxWidth : '8rem'}}  dataType={"date"}  ></Column>
                    <Column field="CurrentCTC" header="Current CTC" body={formatCurrency} sortable></Column>
                    <Column field="ExpectedCTC" header="Expected CTC" body={formatCurrencyectc} sortable></Column>
                    <Column field="Email" header="Email"  sortable></Column>
                    <Column field="stage_name" header="Status"  sortable></Column>
                    

                </DataTable>
          <div>

            <Button style={{ float: "right", position: "relative" }} onClick={e => { navigate(-1) }}> Cancel</Button>

          </div>
          <br></br>
          <br></br>
        </Panel>
      </Card>
    </div>
  )
}

export default Jobpostdetailedview