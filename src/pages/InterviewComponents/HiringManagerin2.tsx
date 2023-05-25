import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import { Rating } from 'primereact/rating'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { candidateworkflowsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { feedbackfieldaction } from '../../features/CandidateActions/feedbackfieldsslice'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
// import { feedbackfieldaction, sendfeedbackaction } from '../../features/Feedback/feedbackfieldsslice'
// import { prevfeedbacksaction } from '../../features/Feedback/prevfeedbacks'
import CandidatePrevFeedbacks from '../DashboardComponents/CandidateActionHiringManager/CandidatePrevFeedbacks'
import CandidateDetails from '../DashboardComponents/CandidateDetails'
import JobPostDetails from '../DashboardComponents/JobPostDetails'
import { candidateactions } from '../../api/agent'
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";


function HiringManagerin2() {
    const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbackfields = useSelector((state: RootState) => state.feedbackfields)
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)

  const candidatedata = location.state
  const jobdata = location.state
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);

  useEffect(() => {
    console.log(candidatedata)
    console.log(prevfeedbacks)
    dispatch(feedbackfieldaction({

        "stagename":candidatedata.stage_name
    //   "Interview_Round": "TechnicalRound_1"
    //   "Interview_Round": "TechnicalRound_2"
      // "Interview_Round": "HRRound"
    }))

    console.log(feedbackfields)
    // dispatch(sendfeedbackaction({data}))
    dispatch(prevfeedbacksaction({
      "Candidate_ID": candidatedata.CandidateId

    }))
  }, [])
  const valuebuilder = (i, j) => {
    return i.toString() + "~" + j.toString()
  }
  const validate = (values) => {

    let errors = {}
    console.log(values)
    var arr = []
    var tempc
    var tempr
    feedbackfields.map((i) => {
      tempc = valuebuilder(i.FeedbackCategoryID.toString(), "Comments")
      tempr = valuebuilder(i.FeedbackCategoryID.toString(), "Rating")
      // arr.push(valuebuilder(i.FeedbackCategoryID.toString(), "Comments"))
      if (!values[tempc]) {
        errors[tempc] = "* Comment is Required";
      }
      if (!values[tempr]) {
        errors[tempr] = "* Rating is required";
      }


    }
    )

    if (values.status == "")
      errors["status"] = "Please select one of the options"

    if (values.status == "Rejected at technical interview" && (values.comments == "" || values.comments == undefined)) {
      console.log(values)
      errors["comments"] = "Comments can't be empty *"
    }

    console.log(errors)



    return errors
  }
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    // console.log(meta)
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };
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
        <CandidatePrevFeedbacks feedbacks={prevfeedbacks}  comments={candidatedata.Comments}></CandidatePrevFeedbacks>
        <br></br>
        <br></br>
        <hr></hr>


      <br></br>
      <div className="container ">

        <Card title='Technical Interview Feedback'>

          <div className="">
            <Form style={{ width: "100%" }}
              onSubmit={(values: any) => {

                console.log(values)


                var req: any = { candidateid: candidatedata.CandidateId, candidateapprovalid: candidatedata.CandidateApprovalID, feedback: [] }
                feedbackfields.forEach((i) => {
                  req.feedback.push({
                    "Candidate": candidatedata.CandidateId,
                    "FeedbackCategory": i.FeedbackCategoryID,
                    "Comments": "",
                    "Rating": 0

                  })
                })

                var temp = ""


                for (var i in values) {
                  if (i.toString().includes("~")) {
                    temp = i.toString().split("~")[0]

                    req.feedback.forEach(e => {
                      if (e.FeedbackCategory == temp) {
                        if (i.toString().includes("Comments"))
                          e.Comments = values[i]
                        else if (i.toString().includes("Rating"))
                          e.Rating = values[i]
                      }
                    });
                  }
                }


                req.comments = values.comments
                req.status = values.status
                console.log(req)

                setShowspinner(true)
                candidateactions.candidateworkflowsubmit(req)
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

                // dispatch(candidateworkflowsubmitaction(req))
                // navigate(-1)

              }}
              initialValues={{comments:"", status : "" } }
              validate={validate}
              keepDirtyOnReinitialize={true}
              render={({ handleSubmit, values, submitting,
                submitError,
                invalid,
                pristine,
                initialValues = {},
                dirtySinceLastSubmit, }) => (
                <form onSubmit={handleSubmit} >


                  {feedbackfields.map((i) =>
                    <div className="p-fluid  grid">
                      <div className="field col-12 md:col-3" style={{paddingTop : "3rem" }}>

                        <span  >
                         <label > {i.FeedbackCategory}</label>
                         </span>
                      </div>
                      <div className="field col-12 md:col-6">
                        <Field
                          name={valuebuilder(i.FeedbackCategoryID.toString(), "Comments")}
                          render={({ input, meta }) => (<>
                            <InputTextarea rows={3} maxLength={500}
                              {...input}
                            >
                            </InputTextarea>
                            {getFormErrorMessage(meta)}
                            </>
                          )
                          }
                        />

                      </div>
                      <div className="field col-12 md:col-2">
                      <Field
                            name={valuebuilder(i.FeedbackCategoryID.toString(), "Rating")}
                            render={({ input, meta }) => (
                              <>
                                <Rating
                                  className={classNames({ "p-error": isFormFieldValid(meta) })}
                                  // value={values[valuebuilder(i.FeedbackCategorID,"Rating")]}
                                  {...input}
                                  // onClick={(e) =>{console.log(values);
                                  //   console.log(e.value);
                                  //   values[valuebuilder(i.FeedbackCategorID,"Rating")]=e.value}}
                                  style={{ marginLeft: "10%", fontSize: "50px" }}
                                  size={80} cancel={false} />
                                  <div style={{}} className="ml-5">

                                {getFormErrorMessage(meta)}
                                  </div>
                              </>
                            )
                            }
                          />
                      </div>
                    </div>
                  )
                  }



                     <br></br>
                  <div className="p-fluid  grid">
                    <div className="field col-12 md:col-3" style={{paddingTop:"2rem"}}>


                      <span>
                        <Field
                          name="status"
                          render={({ input, meta }) => (<>
                            <RadioButton  {...input} className='ml-2 mr-2' inputId="city4" name="city" value="HM Shortlisted" checked={values.status == "HM Shortlisted"} />

                          </>)} />
                        <label className="radio-inline me-3"><b>Shortlist</b>
                        </label>
                      </span>
                      <br></br>
                      <br></br>


                      <span>
                        <Field
                          name="status"
                          id="r"
                          render={({ input, meta }) => (
                            <RadioButton {...input} id="r" className='ml-2 mr-2' name="city" value="Rejected at technical interview" checked={values.status == "Rejected at technical interview"} />
                          )} />
                        <label className="radio-inline me-3" htmlFor={'r'}><b>Reject</b>
                        </label>
                      </span>
                      <br></br>
                      <span>
                        <Field
                          name="status"
                          id="r"
                          render={({ input, meta }) => (<>
                            {getFormErrorMessage(meta)}
                            </> )} />

                      </span>




                    </div>
                    <div className="field col-12 md:col-6">
                      <Field
                        name="comments"
                        render={({ input, meta }) => (
                          <>
                            <label>Comments : </label>
                            <InputTextarea maxLength={1000} {...input}>
                            </InputTextarea>
                            {getFormErrorMessage(meta)}
                          </>
                        )}
                      />
                    </div>
                    <div className="field col-12 md:col-3">
                      <div style={{ float: "right", position: "relative",paddingTop:"2rem", display: "flex" }}>

                        <Button    className="mr-4">Submit</Button>

                        <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                      </div>

                    </div>
                  </div>


                </form>
              )
              }
            />



          </div>


        </Card>
      </div>
      <br></br>

      <div className="p-fluid  grid">
        <div className="field col-12 md:col-4">

        </div>
        <div className="field col-12 md:col-6">

        </div>
        <div className="field col-12 md:col-2">

        </div>
      </div>


      </Panel>
    </Card>
    </LoadingOverlay>
  </div>
  )
}

export default HiringManagerin2
