import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import { Rating } from 'primereact/rating'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { RootState } from '../../app/store'
import { candidateworkflowsubmitaction, hrupdatecandidateaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { feedbackfieldaction } from '../../features/CandidateActions/feedbackfieldsslice'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
import { getactivedesignationoptions } from '../../features/Designation/designationselector'
import { getactiveemplyementtypes } from '../../features/Dropdownoptions/Employementtypeselector'
import { employementaction } from '../../features/Dropdownoptions/employementtypeslice'
import { getactiveLocationoptions } from '../../features/Location/LocationSelector'
import { getLocationaction } from '../../features/Location/Locationslice'
// import { feedbackfieldaction, sendfeedbackaction } from '../../features/Feedback/feedbackfieldsslice'
// import { prevfeedbacksaction } from '../../features/Feedback/prevfeedbacks'
import CandidatePrevFeedbacks from '../DashboardComponents/CandidateActionHiringManager/CandidatePrevFeedbacks'
import CandidateDetails from '../DashboardComponents/CandidateDetails'
import JobPostDetails from '../DashboardComponents/JobPostDetails'
import { candidateactions } from '../../api/agent'
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";

function HRInterview(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbackfields = useSelector((state: RootState) => state.feedbackfields)
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)
  const logindata = useSelector((state: RootState) => state.Login)

  const candidatedata = location.state
  const jobdata = location.state
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);

  useEffect(() => {
    console.log(candidatedata)
    console.log(prevfeedbacks)
    dispatch(getLocationaction());

    dispatch(employementaction())
    dispatch(feedbackfieldaction({

      "stagename": candidatedata.stage_name
      //   "Interview_Round": "TechnicalRound_1"
      // "Interview_Round": "TechnicalRound_2"
      //   "Interview_Round": "HRRound"
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
    // console.log(values)

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

    if (values.status == "" || values.status == null)
      errors["status"] = "Select one of the options"

    if ((values.status == "Rejected at HR interview" || values.status == "HR Hold") && (values.comments == "" || values.comments == null)) {
      console.log(values)
      errors["comments"] = "Comments can't be empty"
    }
    if (values.status != "Rejected at HR interview")
    {
      if(!values.NegotiatedCTC){
        errors["NegotiatedCTC"]="* this field is Required"
      }
      if(!values.EmploymentType){
        errors["EmploymentType"]="* this field is Required"
      }

      if(values.EmploymentType!="Full-Time" && !values.Duration){
        errors["Duration"]="* this field is Required"
      }

      if(!values.Location){
        errors["Location"]="* this field is Required"
      }
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
        <Panel header="HR Interview">
          <Accordion activeIndex={0}>
            <AccordionTab header={<label>Candidate Details</label>}>

              <CandidateDetails data={candidatedata}></CandidateDetails>
            </AccordionTab>
          </Accordion>
          <br></br>
          <br></br>
          <Accordion >
            <AccordionTab header="Job Post Details">
              <JobPostDetails JobData={jobdata}></JobPostDetails>
            </AccordionTab>

          </Accordion>
          <CandidatePrevFeedbacks feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>
          <br></br>
          <br></br>



          <br></br>
          <div className="container ">

            <Panel header="HR Interview Feedback">

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

                    // dispatch(hrupdatecandidateaction({
                    //   "CandidateId": candidatedata.CandidateId,
                    //   "NegotiatedCTC": values["NegotiatedCTC"],
                    //   "EmploymentType": values["EmploymentType"],
                    //   "Duration":values["Duration"],
                    //   "Location": values["Location"],
                    //   "ModifiedBy": logindata.username
                    // }))

                    setShowspinner(true)
                    candidateactions.hrupdatecandidate({"CandidateId": candidatedata.CandidateId,
                    "NegotiatedCTC": values["NegotiatedCTC"],
                    "EmploymentType": values["EmploymentType"],
                    "Duration":values["Duration"],
                    "Location": values["Location"],
                    "ModifiedBy": logindata.username
                  })

                    .then(() => {
                        candidateactions.candidateworkflowsubmit(req).then((res) =>{
                          setShowspinner(false)
                          toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
                        })
                        .catch((ex) => {
                          console.log(ex);
                          setShowspinner(false)
                          toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
                      })
                    }

                    ).then(() => setTimeout(() => { navigate(-1); }, 2000))
                    .catch((ex) => {
                        console.log(ex);
                        setShowspinner(false)
                        toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
                    })

                    // dispatch(candidateworkflowsubmitaction(req))
                    // navigate(-1)

                  }}
                  initialValues={{
                    comments: "",
                    NegotiatedCTC: candidatedata.NegotiatedCTC,
                    EmploymentType: candidatedata.CanEmploymentType,
                    Duration:candidatedata.CanDuration,
                    Location: candidatedata.Location,


                  }}
                  keepDirtyOnReinitialize={true}
                  validate={validate}

                  render={({ handleSubmit, values, submitting,
                    submitError,
                    invalid,
                    pristine,
                    initialValues = {},
                    dirtySinceLastSubmit, }) => (
                    <form onSubmit={handleSubmit} >
                      <div className="p-fluid  grid">
                        <div className='field col-12 md:col-4' style={{}}>
                        <Field
                                            name="NegotiatedCTC"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="NegotiatedCTC">Negotiated CTC</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="NegotiatedCTC" min={0} value={values.NegotiatedCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="NegotiatedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                        </div>
                        <div className="field col-12 md:col-4" style={{ }}>
                          <Field
                            name="EmploymentType"
                            render={({ input, meta }) => (
                              <div className="field">
                                <label htmlFor="EmploymentType">EmploymentType</label>
                                <span className="p-float-label">
                                  <Dropdown id="EmploymentType"  {...input} options={props.getactiveemplyementtypesprop} optionLabel="label" placeholder="Select Employment Type"

                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                </span>
                                {getFormErrorMessage(meta)}
                              </div>
                            )}
                          />
                        </div>
                        <div hidden={values["EmploymentType"] == "Full-Time" ? true : false} className="field col-12 md:col-4">
                                        <Field
                                            name="Duration"

                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Duration">Duration(In Months)</label>
                                                    <span className="field fluid">
                                                        {/* <InputNumber  id="Duration"  min={0} {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        {/* <input  id="Duration"  {...input} type="number" min={0} value={parseInt(values["Duration"])}   className='p-inputtext p-component' /> */}
                                                        <InputNumber id="Duration" value={values.Duration} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Duration" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>
                        <div className="field col-12 md:col-4" style={{ }}>
                          <Field
                            name="Location"
                            render={({ input, meta }) => (
                              <div className="field">
                                <label htmlFor="Location">Location</label>
                                <span className="p-float-label">
                                  <Dropdown id="Location"  {...input} options={props.getactiveLocationoptionsprop} optionLabel="label" placeholder="Select Location"

                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                </span>
                                {getFormErrorMessage(meta)}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      {feedbackfields.map((i) =>
                        <div className="p-fluid  grid">
                          <div className="field col-12 md:col-3" style={{ paddingTop: "3rem" }}>


                            <label>{i.FeedbackCategory}</label>

                          </div>
                          <div className="field col-12 md:col-6">
                            <Field
                              name={valuebuilder(i.FeedbackCategoryID.toString(), "Comments")}
                              render={({ input, meta }) => (<>
                                <InputTextarea rows={3}
                                  {...input}
                                >
                                </InputTextarea>
                                {getFormErrorMessage(meta)}
                              </>
                              )
                              }
                            />

                          </div>
                          <div className="field col-12 md:col-3">
                            <Field
                              name={valuebuilder(i.FeedbackCategoryID.toString(), "Rating")}
                              render={({ input, meta }) => (<>
                                <Rating
                                  // value={values[valuebuilder(i.FeedbackCategorID,"Rating")]}
                                  {...input}
                                  // onClick={(e) =>{console.log(values);
                                  //   console.log(e.value);
                                  //   values[valuebuilder(i.FeedbackCategorID,"Rating")]=e.value}}
                                  style={{ marginLeft: "10%", fontSize: "50px" }}
                                  size={80} cancel={false} />
                                {getFormErrorMessage(meta)}
                              </>
                              )
                              }
                            />
                          </div>
                        </div>
                      )
                      }
                      <hr></hr>



                      <div className="p-fluid  grid">
                        <div className="field col-12 md:col-3">


                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (
                                <RadioButton {...input} className='ml-2 mr-2' inputId="city4" name="city" value="HR Shortlisted" checked={values.status == "HR Shortlisted"} />
                              )} /><label className="radio-inline mr-3"><b>Shortlist</b>
                            </label>

                          </span>
                          <br></br>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              render={({ input, meta }) => (<>
                                <RadioButton {...input} className='ml-2 mr-2' inputId="city4" name="city" value="HR Hold" checked={values.status == "HR Hold"} />
                              </>)} />
                            <label className="radio-inline mr-3"><b>Hold</b>
                            </label>
                          </span>
                          <br></br>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              id="r"
                              render={({ input, meta }) => (<>
                                <RadioButton {...input} id="r" className='ml-2 mr-2' name="city" value="Rejected at HR interview" checked={values.status == "Rejected at HR interview"} />

                                <label className="radio-inline mr-3" htmlFor={'r'}><b>Reject</b>
                                </label>
                                <br></br>

                              </>)} />
                          </span>
                          <br></br>
                          <span>
                            <Field
                              name="status"
                              id="r"
                              render={({ input, meta }) => (
                                <>{getFormErrorMessage(meta)}</>
                              )} />
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
                          <div style={{ paddingTop: "4rem", float: "right", position: "relative", display: "flex" }}>
                            <Button className="mr-4" >Submit</Button>
                            <Button type="button" onClick={e => { navigate(-1) }}> Cancel</Button>

                          </div>

                        </div>
                      </div>


                    </form>
                  )
                  }
                />



              </div>


            </Panel>
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


const mapStateToProps = (state) => {


  return {
    getactiveemplyementtypesprop: getactiveemplyementtypes(state),
    getactiveLocationoptionsprop: getactiveLocationoptions(state)
  }
}
export default connect(mapStateToProps)(HRInterview)
