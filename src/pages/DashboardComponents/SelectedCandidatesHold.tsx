import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
// import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import CandidateDetails from './CandidateDetails'
import { Accordion, AccordionTab } from 'primereact/accordion'
import JobPostDetails from './JobPostDetails'
import CandidatePrevFeedbacks from './CandidateActionHiringManager/CandidatePrevFeedbacks'
import { RootState } from '../../app/store'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
import { selectedcandidatesholdsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { candidateactions } from '../../api/agent'
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";


function SelectedCandidatesHold() {
  const location = useLocation()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false);

  const candidatedata = location.state
  const jobdata = location.state
  const [comments, setcomments] = useState('')
  const [status, setstatus] = useState('')
const [res, setres] = useState("")
  const dispatch = useDispatch()
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);
  useEffect(() => {
    console.log(candidatedata)
    dispatch(prevfeedbacksaction({

      "Candidate_ID": candidatedata.CandidateId



    }))
  }, [])

  const hideDialog = () => {
    setSubmitted(false);
    // setProductDialog(false);
  };
  const handlesubmit = () => {
    var payloaddata: any = {}
    if (status) {

      payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
      payloaddata.JobPostId = jobdata.JobPostID
      payloaddata.ApprovalStatus = status
      payloaddata.ApprovalComments = comments
    }
    if (status) {
      if (!(status == "Rejected at technical interview" && comments == "")) {

        // console.log(payloaddata)
        // console.log(
        //   {
    
    
        //     "candidateapprovalid": candidatedata.CandidateApprovalID,
    
        //     "candidateid": candidatedata.CandidateId,
    
        //     "status": status,
    
        //     "comments": comments,
    
    
    
        //   }
        // )
        setShowspinner(true)
        candidateactions.candidateworkflowsubmit({


          "candidateapprovalid": candidatedata.CandidateApprovalID,
    
          "candidateid": candidatedata.CandidateId,
    
          "status": status,
    
          "comments": comments,
    
          "feedback": null
    
    
        })
        .then((res) => {
            console.log(res);
            setShowspinner(false)
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
        }).then((res) => { }
        ).then(() => setTimeout(() => { navigate(-1); }, 2000))
        .catch((ex) => {
            console.log(ex);
            setShowspinner(false)                                    
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
        }) 
      //   dispatch(selectedcandidatesholdsubmitaction({


      //     "candidateapprovalid": candidatedata.CandidateApprovalID,
    
      //     "candidateid": candidatedata.CandidateId,
    
      //     "status": status,
    
      //     "comments": comments,
    
      //     "feedback": null
    
    
      //   }))     
      // navigate(-1)
      }
    }
  }
    console.log(comments)
    console.log(status)
    
  
  

  return (
    <div>
                              <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
      <Card>
      <Panel header="Candidate Selection">
        <CandidateDetails data={candidatedata}></CandidateDetails>
        <hr></hr>
        <br></br>
        <br></br>
        <Accordion >
          <AccordionTab header="Job Post Details">
            <JobPostDetails JobData={jobdata}></JobPostDetails>

          </AccordionTab>
        </Accordion>
        <br></br>
        <br></br>
        <CandidatePrevFeedbacks feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>



        <br></br>
        <hr></hr>

        <div className="grid">
          <div className="md:col-3">

            <RadioButton className='ml-2 mr-2' name="selectforinterview" value="HM Shortlisted" onChange={(e) => setstatus(e.value)} checked={status === 'HM Shortlisted'} id='selectforinterview' />
            <span><label className="radio-inline me-3" htmlFor='selectforinterview'><b>Shortlist</b>
            </label>
            </span>
            <br></br>
            <br></br>


            <RadioButton className='ml-2 mr-2' name="city" value="Rejected at technical interview" onChange={(e) => setstatus(e.value)} checked={status === 'Rejected at technical interview'} />
            <span><label className="radio-inline me-3"><b>Reject</b>
            </label>
            </span>
          </div>





          <div className="md:col-6">
            <div className="grid">
            <span><label>Comments:</label></span>
            </div>
            <br></br>
            <div className="grid">
            <InputTextarea cols={60} value={comments} maxLength={1000} onChange={e => setcomments(e.target.value)}></InputTextarea>
            <br></br>
            <small hidden={res == "Rejected at technical interview" && comments == "" ? false : true} id="username2-help" className={status == "Rejected at technical interview" && comments == "" ? "p-error block" : ""}>Comments are Required when Rejected*.</small>
            </div>  
          </div>




          <div className="md:col-3">
            
              <div style={{ float: "right",paddingTop:"2rem", position: "relative", display: "flex" }}>
                <Button className='btn mr-4' disabled={(status!="Rejected at technical interview"&&status!="HM Shortlisted")||(status == "Rejected at technical interview" && comments == "") } onClick={e => handlesubmit() }> Submit</Button>
                <Button className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                
              </div>

           



          </div>





        </div>

        </Panel>
      </Card>
      </LoadingOverlay>
    </div>

  )
}

export default SelectedCandidatesHold


