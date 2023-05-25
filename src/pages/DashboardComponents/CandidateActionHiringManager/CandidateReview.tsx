import React, { useEffect, useRef, useState } from 'react'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { Imyjobpost } from '../../../features/JobPostActions/myjobpostsslice'
import { getJobPostActionfromapi, IJobPost } from '../../../features/JobPostActions/jobpostactionsslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import JobpostsactionApproval from '../JobPostActionsHiringManager/JobpostsactionApproval'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { Accordion, AccordionTab } from 'primereact/accordion';

import LoadingOverlay from "react-loading-overlay";
import { Toast } from 'primereact/toast'
import { candidateactions } from '../../../api/agent'


function CandidateReview() {
  const location = useLocation()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false);

  const candidatedata = location.state
  const jobdata = location.state
  const [comments, setcomments] = useState('')
  const [status, setstatus] = useState('')

  const dispatch = useDispatch()
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);
 
  useEffect(() => {
    console.log(candidatedata)

  }, [])
  const hideDialog = () => {
    setSubmitted(false);
    // setProductDialog(false);
  };
  
  const handlesubmit = () => {
    console.log(comments)
    console.log(status)

    setShowspinner(true)
    candidateactions.candidateworkflowsubmit({


      "candidateapprovalid": candidatedata.CandidateApprovalID,

      "candidateid": candidatedata.CandidateId,

      "status": status,

      "comments": comments,

      "feedback" : null


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
//     dispatch(candidateworkflowsubmitaction({


//       "candidateapprovalid": candidatedata.CandidateApprovalID,

//       "candidateid": candidatedata.CandidateId,

//       "status": status,

//       "comments": comments,

//       "feedback" : null


//     }))
// navigate(-1)
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
        <Panel header='Candidate Review'>
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






          <div className="grid">
            <div className="md:col-3">

              <RadioButton className='ml-2 mr-2' name="selectforinterview" value="Select For Interview" onChange={(e) => setstatus(e.value)} checked={status === 'Select For Interview'} id='selectforinterview' />
              <span><label className="radio-inline me-3" htmlFor='selectforinterview'><b>Selected for Interview</b>
              </label>
              </span>
              <br></br>
              <br></br>


              <RadioButton className='ml-2 mr-2' name="city" value="Rejected at Review" onChange={(e) => setstatus(e.value)} checked={status === 'Rejected at Review'} />
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
              <InputTextarea cols={120} maxLength={1000} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
              <br></br>
              {(status=="Rejected at Review"&&comments=="")?<span className='p-error'>Comments are required*</span>:<></>}
              </div>  
              </div>
            
            <div className="md:col-3">
              {/* <div className="field col-12 md:col-4"> */}
                <div style={{ float: "right",paddingTop:"2rem", position: "relative", display: "flex" }}>
                  <Button  disabled={(status != "Select For Interview" && status != "Rejected at Review") || (status == "Rejected at Review" && comments == "")} className="mr-4" onClick={e => handlesubmit()} >Submit</Button>
                  <Button  onClick={e => { navigate(-1) }}> Cancel</Button>
                  
                </div>

              {/* </div> */}



            </div>





          </div>
        </Panel>

      </Card>
      </LoadingOverlay>
    </div>

  )
}

export default CandidateReview


