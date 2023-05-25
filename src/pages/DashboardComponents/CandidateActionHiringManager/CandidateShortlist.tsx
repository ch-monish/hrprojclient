import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../../app/store'
// import { feedbackfieldaction, sendfeedbackaction } from '../../../features/Feedback/feedbackfieldsslice'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea'
// import { prevfeedbacksaction } from '../../../features/Feedback/prevfeedbacks'
import { Field, Form } from 'react-final-form'
import CandidatePrevFeedbacks from './CandidatePrevFeedbacks'
import { feedbackfieldaction } from '../../../features/CandidateActions/feedbackfieldsslice'
import { prevfeedbacksaction } from '../../../features/CandidateActions/prevfeedbacks'
import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'

function CandidateShortlist() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbackfields = useSelector((state: RootState) => state.feedbackfields)
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)

  const candidatedata = location.state
  const jobdata = location.state

  useEffect(() => {
    console.log(candidatedata)
    console.log(prevfeedbacks)
    dispatch(feedbackfieldaction({
      "stagename": candidatedata.stage_name
      // "Interview_Round": "TechnicalRound_2"
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
  return (
    <div>
      <Card>
        <Panel header="Candidate Interview">

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

        </Panel>

        <br></br>
        <div className="container ">

          <Card >

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
                  dispatch(candidateworkflowsubmitaction(req))


                }}
                // initialValues={ }
                // validate={validate}
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
                        <div className="field col-12 md:col-2">
                          <h4 style={{ marginTop: "5rem", marginLeft: "10%" }}>

                            {i.FeedbackCategory}
                          </h4>
                        </div>
                        <div className="field col-12 md:col-7">
                          <Field
                            name={valuebuilder(i.FeedbackCategoryID.toString(), "Comments")}
                            render={({ input, meta }) => (
                              <InputTextarea rows={8}
                                {...input}
                              >
                              </InputTextarea>
                            )
                            }
                          />

                        </div>
                        <div className="field col-12 md:col-3">
                          <Field
                            name={valuebuilder(i.FeedbackCategoryID.toString(), "Rating")}
                            render={({ input, meta }) => (
                              <Rating
                                // value={values[valuebuilder(i.FeedbackCategorID,"Rating")]}
                                {...input}
                                // onClick={(e) =>{console.log(values);
                                //   console.log(e.value);
                                //   values[valuebuilder(i.FeedbackCategorID,"Rating")]=e.value}}
                                style={{ marginTop: "5rem", marginLeft: "10%", fontSize: "50px" }}
                                size={80} cancel={false} />
                            )
                            }
                          />
                        </div>
                      </div>
                    )
                    }



                    {/* <div className="p-fluid  grid">
                      <div className="field col-12 md:col-3">


                        <span>
                          <Field
                            name="status"
                            render={({ input, meta }) => (
                              <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="S" checked={values.status == "S"} />
                            )} /><label className="radio-inline me-3">Selected
                          </label>

                        </span>
                        <br></br>
                        <span>
                          <Field
                            name="status"
                            render={({ input, meta }) => (
                              <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="SH" checked={values.status == "SH"} />
                            )} />
                          <label className="radio-inline me-3">Shortlist (No Interview Required)
                          </label>
                        </span>
                        <br></br>
                        <span>
                          <Field
                            name="status"
                            render={({ input, meta }) => (
                              <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="FR" checked={values.status == "FR"} />
                            )} />
                          <label className="radio-inline me-3">Further Review
                          </label>
                        </span>
                        <br></br>
                        <span>
                          <Field
                            name="status"
                            render={({ input, meta }) => (
                              <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="H" checked={values.status == "H"} />
                            )} />
                          <label className="radio-inline me-3">Hold
                          </label>
                        </span>
                        <br></br>
                        <span>
                          <Field
                            name="status"
                            id="r"
                            render={({ input, meta }) => (
                              <RadioButton {...input} id="r" className='ml-2' name="city" value="R" checked={values.status == "R"} />
                            )} />
                          <label className="radio-inline me-3" htmlFor={'r'}>Rejected
                          </label>
                        </span>




                      </div>
                      <div className="field col-12 md:col-7">
                        <Field
                          name="comments"
                          render={({ input, meta }) => (
                            <>
                              <label>Comments : </label>
                              <InputTextarea {...input}>
                              </InputTextarea>
                            </>
                          )}
                        />
                      </div>
                      <div className="field col-12 md:col-2">
                        <div style={{ float: "right", position: "relative", display: "flex" }}>

                          <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                          <Button >Submit</Button>
                        </div>

                      </div>
                    </div> */}
                    {candidatedata.stage_name == "Candidate Interview" &&
                      <div className="p-fluid  grid">
                        <div className="field col-12 md:col-3">



                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="HM Shortlisted" checked={values.status == "HM Shortlisted"} />
                              )} />
                            <label className="radio-inline me-3">Shortlist
                            </label>
                          </span>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="Further Review" checked={values.status == "Further Review"} />
                              )} />
                            <label className="radio-inline me-3">Further Review
                            </label>
                          </span>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="HM Hold" checked={values.status == "HM Hold"} />
                              )} />
                            <label className="radio-inline me-3">Hold
                            </label>
                          </span>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              id="r"
                              render={({ input, meta }) => (
                                <RadioButton {...input} id="r" className='ml-2' name="city" value="Rejected" checked={values.status == "Rejected"} />
                              )} />
                            <label className="radio-inline me-3" htmlFor={'r'}>Rejected
                            </label>
                          </span>




                        </div>
                        <div className="field col-12 md:col-7">
                          <Field
                            name="comments"
                            render={({ input, meta }) => (
                              <>
                                <label>Comments : </label>
                                <InputTextarea {...input}>
                                </InputTextarea>
                              </>
                            )}
                          />
                        </div>
                        <div className="field col-12 md:col-2">
                          <div style={{ float: "right", position: "relative", display: "flex" }}>

                            <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                            <Button >Submit</Button>
                          </div>

                        </div>
                      </div>
                    }
                    {
                      candidatedata.stage_name == "Further Review" &&
                      <div className="p-fluid  grid">
                        <div className="field col-12 md:col-3">



                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="HM Shortlisted" checked={values.status == "HM Shortlisted"} />
                              )} />
                            <label className="radio-inline me-3">Shortlist
                            </label>
                          </span>
                          <br></br>


                          <span>
                            <Field
                              name="status"
                              id="r"
                              render={({ input, meta }) => (
                                <RadioButton {...input} id="r" className='ml-2' name="city" value="Rejected" checked={values.status == "Rejected"} />
                              )} />
                            <label className="radio-inline me-3" htmlFor={'r'}>Rejected
                            </label>
                          </span>




                        </div>
                        <div className="field col-12 md:col-7">
                          <Field
                            name="comments"
                            render={({ input, meta }) => (
                              <>
                                <label>Comments : </label>
                                <InputTextarea {...input}>
                                </InputTextarea>
                              </>
                            )}
                          />
                        </div>
                        <div className="field col-12 md:col-2">
                          <div style={{ float: "right", position: "relative", display: "flex" }}>

                            <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                            <Button >Submit</Button>
                          </div>

                        </div>
                      </div>
                    }
                    {
                      candidatedata.stage_name == "HR Interview" &&
                      <div className="p-fluid  grid">
                        <div className="field col-12 md:col-3">


                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="HR Shortlisted" checked={values.status == "HR Shortlisted"} />
                              )} /><label className="radio-inline me-3">Shortlist
                            </label>

                          </span>
                          <br></br>

                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="H" checked={values.status == "H"} />
                              )} />
                            <label className="radio-inline me-3">Hold
                            </label>
                          </span>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              id="r"
                              render={({ input, meta }) => (
                                <RadioButton {...input} id="r" className='ml-2' name="city" value="Rejected" checked={values.status == "Rejected"} />
                              )} />
                            <label className="radio-inline me-3" htmlFor={'r'}>Rejected
                            </label>
                          </span>




                        </div>
                        <div className="field col-12 md:col-7">
                          <Field
                            name="comments"
                            render={({ input, meta }) => (
                              <>
                                <label>Comments : </label>
                                <InputTextarea {...input}>
                                </InputTextarea>
                              </>
                            )}
                          />
                        </div>
                        <div className="field col-12 md:col-2">
                          <div style={{ float: "right", position: "relative", display: "flex" }}>

                            <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                            <Button >Submit</Button>
                          </div>

                        </div>
                      </div>
                    }

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



      </Card>
    </div>
  )
}

export default CandidateShortlist
