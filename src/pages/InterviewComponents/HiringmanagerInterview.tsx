import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { RadioButton } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { arrayBuffer } from "stream/consumers";
import { candidateactions } from "../../api/agent";
import { RootState } from "../../app/store";
import { candidateworkflowsubmitaction } from "../../features/CandidateActions/candidateactiondetailsslice";
import { feedbackfieldaction } from "../../features/CandidateActions/feedbackfieldsslice";
import { prevfeedbacksaction } from "../../features/CandidateActions/prevfeedbacks";
import { getactiveuserroleoptions } from "../../features/UserRoles/userroleoptionsselctor";
import { getadusersaction } from "../../features/UserRoles/userroleslice";
// import { feedbackfieldaction, sendfeedbackaction } from '../../features/Feedback/feedbackfieldsslice'
// import { prevfeedbacksaction } from '../../features/Feedback/prevfeedbacks'
import CandidatePrevFeedbacks from "../DashboardComponents/CandidateActionHiringManager/CandidatePrevFeedbacks";
import CandidateDetails from "../DashboardComponents/CandidateDetails";
import JobPostDetails from "../DashboardComponents/JobPostDetails";
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";


function HiringmanagerInterview(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const feedbackfields = useSelector((state: RootState) => state.feedbackfields);
    const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback);
    const [errors, seterrors] = useState<any>([]);
    const candidatedata = location.state;
    const jobdata = location.state;
    const [showspinner, setShowspinner] = useState(false)
    const toast = useRef(null);

    useEffect(() => {
        console.log(candidatedata);
        console.log(prevfeedbacks);
        dispatch(
            feedbackfieldaction({
                stagename: candidatedata.stage_name,
                //   "Interview_Round": "TechnicalRound_1"
                // "Interview_Round": "TechnicalRound_2"
                // "Interview_Round": "HRRound"
            })
        );

        console.log(feedbackfields);
        // dispatch(sendfeedbackaction({data}))
        dispatch(
            prevfeedbacksaction({
                Candidate_ID: candidatedata.CandidateId,
            })
        );
        dispatch(getadusersaction());

        setemptyerrors();
    }, []);
    function setemptyerrors() {
        var temp: any = [];
        feedbackfields.forEach((i) => {
            temp.push({
                [valuebuilder(i.FeedbackCategoryID.toString(), "Comments")]: "",
            });
            temp.push({
                [valuebuilder(i.FeedbackCategoryID.toString(), "Rating")]: "",
            });
        });
        temp.push({
            status: "",
        });
        seterrors(temp);
    }
    const valuebuilder = (i, j) => {
        return i.toString() + "~" + j.toString();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta) => {
        console.log(meta);
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (values) => {
        let errors = {};
        console.log(values);
        var arr = [];
        var tempc;
        var tempr;
        feedbackfields.map((i) => {
            tempc = valuebuilder(i.FeedbackCategoryID.toString(), "Comments");
            tempr = valuebuilder(i.FeedbackCategoryID.toString(), "Rating");
            // arr.push(valuebuilder(i.FeedbackCategoryID.toString(), "Comments"))
            if (!values[tempc]) {
                errors[tempc] = "* Comment is Required";
            }
            if (!values[tempr]) {
                errors[tempr] = "* Rating is required";
            }
        });

        if (values.status == "") errors["status"] = "Check one of the radio button";

        if ((values.status == "Rejected at technical interview" && (values.comments == "" || values.comments == undefined)) || (values.status == "Further Review" && (values.comments == "" || values.comments == undefined))) {
            console.log(values);
            errors["comments"] = "Comments cant be empty * ";
        }

        if(values.status == "Further Review" && (Object.is(values.Interviewer,null)||Object.is(values.Interviewer,"")|| Object.is(values.Interviewer,undefined))){
            errors["Interviewer"] = "Interviewer Name can't be empty * ";

        }
console.log(errors)
        return errors;
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
                <Panel header="Candidate Interview">
                    <CandidateDetails data={candidatedata}></CandidateDetails>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <Accordion>
                        <AccordionTab header="Job Post Details">
                            <JobPostDetails JobData={jobdata}></JobPostDetails>
                        </AccordionTab>
                    </Accordion>
                    <CandidatePrevFeedbacks feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>
                    <br></br>
                    <br></br>

                    <br></br>
                    <div className="container ">
                        <Panel header="Technical Interview Feedback">
                            <div className="">
                                <Form
                                    style={{ width: "100%" }}
                                    onSubmit={(values: any) => {
                                        console.log(values);

                                        // var f = handlevalidate(values)
                                        // if (f) return
                                        var req: any = { candidateid: candidatedata.CandidateId, candidateapprovalid: candidatedata.CandidateApprovalID, feedback: [] };
                                        feedbackfields.forEach((i) => {
                                            req.feedback.push({
                                                Candidate: candidatedata.CandidateId,
                                                FeedbackCategory: i.FeedbackCategoryID,
                                                Comments: "",
                                                Rating: 0,
                                            });
                                        });

                                        var temp = "";

                                        for (var i in values) {
                                            if (i.toString().includes("~")) {
                                                temp = i.toString().split("~")[0];

                                                req.feedback.forEach((e) => {
                                                    if (e.FeedbackCategory == temp) {
                                                        if (i.toString().includes("Comments")) e.Comments = values[i];
                                                        else if (i.toString().includes("Rating")) e.Rating = values[i];
                                                    }
                                                });
                                            }
                                        }

                                        req.comments = values.comments;
                                        req.status = values.status;

                                        if (!Object.is(values.Internal, null) && (values.Internal == true || values.Internal == false) && values["status"] == "Further Review") {
                                            req.Internal = values.Internal;
                                        }
                                        if (!Object.is(values.Interviewer, null) && (values.Internal == true || values.Internal == false) && values["status"] == "Further Review") {
                                            req.Interviewer = values.Interviewer;
                                        }
                                        console.log(req);

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


                                        // dispatch(candidateworkflowsubmitaction(req));
                                        // navigate(-1);
                                    }}
                                    initialValues={{ status: "", comments: "", Interviewer:null,Internal:null}}
                                    validate={validate}
                                    keepDirtyOnReinitialize={true}
                                    render={({ handleSubmit, values, submitting, submitError, invalid, pristine, initialValues = {}, dirtySinceLastSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            {feedbackfields.map((i) => (
                                                <div className="p-fluid  grid">
                                                    <div className="field col-12 md:col-3" style={{ paddingTop: "3rem" }}>
                                                        <span>
                                                            <label> {i.FeedbackCategory}</label>
                                                        </span>
                                                    </div>
                                                    <div className="field col-12 md:col-6">
                                                        <Field
                                                            name={valuebuilder(i.FeedbackCategoryID.toString(), "Comments")}
                                                            render={({ input, meta }) => (
                                                                <>
                                                                    <InputTextarea rows={3} maxLength={500} className={classNames({ "p-invalid": isFormFieldValid(meta) })} {...input}></InputTextarea>
                                                                    {/* {
                               console.log(   valuebuilder(i.FeedbackCategoryID.toString(), "Comments"))}
                               {console.log(errors)} */}
                                                                    {/* <small className="p-error">{
                               errors.filter((k)=>k['1~Comments'])[0]?
                              <>{Object.values(errors.filter((k)=>k['1~Comments'])[0])[0]?.toString()}</> :
                               <></>
                                }</small> */}
                                                                    {/* <small className="p-error">{errors.filter((k)=>k[valuebuilder(i.FeedbackCategoryID.toString(), "Comments")].length>0)}</small> */}
                                                                    {/* <small className="p-error">{  errors.filter((k)=>k[valuebuilder(i.FeedbackCategoryID.toString(), "Comments")])[0]}</small> */}
                                                                    {/* e.filter((k)=>k['1~Comments'])[0]['1~Comments'] */}
                                                                    {getFormErrorMessage(meta)}
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="field col-12 md:col-3">
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
                                                                        size={80}
                                                                        cancel={false}
                                                                    />
                                                                    <div style={{}} className="ml-5">
                                                                        {getFormErrorMessage(meta)}
                                                                    </div>
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <hr></hr>

                                            <div className="p-fluid  grid">
                                                <div className="field col-12 md:col-3">
                                                    <span>
                                                        <Field name="status" render={({ input, meta }) => <RadioButton {...input} className="ml-2 mr-2" inputId="city4" name="city" value="HM Shortlisted" checked={values.status == "HM Shortlisted"} />} />
                                                        <label className="radio-inline me-3">
                                                            <b>Shortlist</b>
                                                        </label>
                                                    </span>
                                                    <br></br>
                                                    <br></br>
                                                    <span>
                                                        <Field name="status" render={({ input, meta }) => <RadioButton {...input} className="ml-2 mr-2" inputId="city4" name="city" value="Further Review" checked={values.status == "Further Review"} />} />
                                                        <label className="radio-inline me-3">
                                                            <b>Further Review</b>
                                                        </label>
                                                    </span>
                                                    <br></br>
                                                    <br></br>

                                                    {values["status"] == "Further Review" && (
                                                        <>
                                                            <span>
                                                                <Field
                                                                name="Internal"
                                                                type="checkbox"
                                                                render={({ input, meta }) =>
                                                                 <Checkbox {...input} className="ml-2 mr-2" checked={values.Internal == true} />} />
                                                                <label className="radio-inline me-3">
                                                                    <b>Is Internal?</b>
                                                                </label>
                                                            </span>
                                                            <br></br>
                                                            <br></br>

                                                            {values["Internal"] == true ? (
                                                                <>
                                                                    <span>
                                                                        <label>Interviewer Name</label>
                                                                        <br></br>
                                                                        <Field
                                                                            name="Interviewer"
                                                                            render={({ input, meta }) => (<>
                                                                                <Dropdown filter {...input} options={props.getactiveuserroleoptionsprop} optionValue="label" placeholder="Last Name, First Name" />
                                                                                <div style={{}} className="ml-5">
                                                                                {getFormErrorMessage(meta)}
                                                                            </div>

                                                                            </>

                                                                                )}
                                                                        />
                                                                        <label className="radio-inline me-3">

                                                                        </label>
                                                                    </span>
                                                                    <br></br>
                                                                    <br></br>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>
                                                                        <label>Interviewer Name</label>
                                                                        <br></br>
                                                                        <Field
                                                                            name="Interviewer"
                                                                            render={({ input, meta }) => (<>

                                                                                <InputText {...input}></InputText>
                                                                                <div style={{}} className="ml-5">
                                                                        {getFormErrorMessage(meta)}
                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        />
                                                                        <label className="radio-inline me-3">
                                                                        </label>
                                                                    </span>
                                                                    <br></br>
                                                                    <br></br>
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                    <span>
                                                        <Field name="status" render={({ input, meta }) => <RadioButton {...input} className="ml-2 mr-2" inputId="city4" name="city" value="HM Hold" checked={values.status == "HM Hold"} />} />
                                                        <label className="radio-inline me-3">
                                                            <b>Hold</b>
                                                        </label>
                                                    </span>
                                                    <br></br>
                                                    <br></br>
                                                    <span>
                                                        <Field
                                                            name="status"
                                                            id="r"
                                                            render={({ input, meta }) => (
                                                                <>
                                                                    <RadioButton {...input} id="r" className="ml-2 mr-2" name="city" value="Rejected at technical interview" checked={values.status == "Rejected at technical interview"} />
                                                                </>
                                                            )}
                                                        />
                                                        <label className="radio-inline me-3" htmlFor={"r"}>
                                                            <b>Reject</b>
                                                        </label>
                                                        <br></br>
                                                    </span>
                                                </div>
                                                <div className="field col-12 md:col-6">
                                                    <Field
                                                        name="comments"
                                                        render={({ input, meta }) => (
                                                            <>
                                                                <label>Comments : </label>
                                                                <InputTextarea {...input} maxLength={1000}></InputTextarea>
                                                                {getFormErrorMessage(meta)}
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                                <div className="field col-12 md:col-3">
                                                    <div style={{ paddingTop: "4rem", float: "right", position: "relative", display: "flex" }}>
                                                        <Button className="mr-4">Submit</Button>
                                                        <Button
                                                            type="button"
                                                            onClick={(e) => {
                                                                navigate(-1);
                                                            }}
                                                        >
                                                            {" "}
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                />
                            </div>
                        </Panel>
                    </div>
                    <br></br>

                    <div className="p-fluid  grid">
                        <div className="field col-12 md:col-4"></div>
                        <div className="field col-12 md:col-6"></div>
                        <div className="field col-12 md:col-2"></div>
                    </div>
                </Panel>
            </Card>
            </LoadingOverlay>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        getactiveuserroleoptionsprop: getactiveuserroleoptions(state),
    };
}
export default connect(mapStateToProps)(HiringmanagerInterview);
