import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
// import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { generalmanagerapprovalsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CandidateDetails from './CandidateDetails'
import JobPostDetails from './JobPostDetails'
import { RootState } from '../../app/store'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
import CandidatePrevFeedbacks from './CandidateActionHiringManager/CandidatePrevFeedbacks'
import { Toast } from "primereact/toast"
import { candidateactions } from '../../api/agent'
import LoadingOverlay from "react-loading-overlay"

function GeneralManagerApproval() {
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
      if (!(status == "GM Approval Rejected" && comments == "")) {

        setShowspinner(true)
        candidateactions.generalmanagerapprovalsubmit({

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

        // dispatch(generalmanagerapprovalsubmitaction({


        //   "candidateapprovalid": candidatedata.CandidateApprovalID,

        //   "candidateid": candidatedata.CandidateId,

        //   "status": status,

        //   "comments": comments,

        //   "feedback": null


        // }))
        // navigate(-1)
      }
    }

  }

  return (
    <div>
                                          <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
      <Card>
        <Panel header="General Manager Approval">
        <Accordion activeIndex={0}>
            <AccordionTab header={<label>Candidate Details</label>}>

              <CandidateDetails data={candidatedata}></CandidateDetails>
            </AccordionTab>
          </Accordion>
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


          <br />



          <div className="grid">
            <div className="md:col-3">

              <RadioButton className='ml-2 mr-2' name="selectforinterview" value="GM Approved" onChange={(e) => setstatus(e.value)} checked={status === 'GM Approved'} id='selectforinterview' />
              <span><label className="radio-inline me-3" htmlFor='selectforinterview'><b>Approve</b>
              </label>
              </span>
              <br></br>
              <br></br>


              <RadioButton className='ml-2 mr-2' name="city" value="GM Approval Rejected" onChange={(e) => setstatus(e.value)} checked={status === 'GM Approval Rejected'} />
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
                <InputTextarea cols={60} maxLength={1000} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
                <br></br>
               {status == "GM Approval Rejected" && comments == ""? <small  id="username2-help" className= "p-error" >Comments are Required when Reject*</small>
:<></>}
              </div>
              </div>
              <div className="md:col-3">

                <div style={{ paddingTop: "2rem", float: "right", position: "relative", display: "flex" }}>
                  <Button className='btn mr-4' disabled={(status != "GM Approval Rejected" && status != "GM Approved") || (status == "GM Approval Rejected" && comments == "")} onClick={e => { handlesubmit(); }}> Submit</Button>
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

export default GeneralManagerApproval


