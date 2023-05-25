import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateinterncandidateaction } from "../../../features/Acceptedcandidates/internselectedcanslice";
import { Toast } from "primereact/toast";
import LoadingOverlay from "react-loading-overlay";
import { updateacceptedcandidatesapis } from "../../../api/agent";
import { Card } from "primereact/card";
import { getactiveuserroleoptions } from "../../../features/UserRoles/userroleoptionsselctor";
import { getadusersaction } from "../../../features/UserRoles/userroleslice";

function Updateinterncandidatedetails(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const data = location.state;
    const [showspinner, setShowspinner] = useState(false);
    const toast = useRef(null);
    useEffect(() => {
        console.log(data);
        dispatch(getadusersaction());
    }, []);
    const validatefun = (values) => {
        var errors = [];
        if (!values["Brief_Description"] && values.IsJoined) {
            // console.log(values["Duration"])

            errors["Brief_Description"] = "*This field is required";
        }
        if (!values["OfficialMailId"] && values.IsJoined) {
            // console.log(values["Duration"])

            errors["OfficialMailId"] = "*This field is required";
        }
        return errors;
    };
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <div>
            <style>{`
                .field {
                 margin-bottom: 0rem;
                }


                `}</style>
            <LoadingOverlay active={showspinner} spinner text="Processing...">
                <Toast ref={toast} position="bottom-left" />
                <Card>
                    <Panel header="Update Intern Details">
                        <Form
                            onSubmit={(values) => {
                                if (values["EmployeeID"] == undefined) values["EmployeeID"] = null;
                                if (values["HRCID"] == undefined) values["HRCID"] = null;
                                if (values["OfficialMailId"] == undefined) values["OfficialMailId"] = null;
                                if (values["Brief_Description"] == undefined) values["Brief_Description"] = null;
                                console.log(values);
                                updateacceptedcandidatesapis
                                    .updateinterncandidate(values)
                                    .then((res) => {
                                        console.log(res);
                                        setShowspinner(false);
                                        toast.current.show({ severity: "success", summary: "Success Message", detail: res, life: 3000 });
                                    })
                                    .then((res) => {})
                                    .then(() =>
                                        setTimeout(() => {
                                            navigate(-1);
                                        }, 2000)
                                    )
                                    .catch((ex) => {
                                        console.log(ex);
                                        setShowspinner(false);
                                        toast.current.show({ severity: "error", summary: "Error Message", detail: ex.data, life: 3000 });
                                    });
                                // dispatch(updateinterncandidateaction(values))
                                // navigate(-1)
                            }}
                            validate={validatefun}
                            keepDirtyOnReinitialize={true}
                            initialValues={{
                                selectedcandidateid: data.Selected_Candidate_ID,
                                EmployeeID: data.EmployeeID,
                                HRCID: data.HRCID,
                                OfficialMailId: data.OfficialMailId,
                                BGVStatus: data.BGVStatus,
                                Medicalteststatus: data.Medicalteststatus,
                                IsJoined: data.IsJoined,
                                Brief_Description: data.Brief_Description,
                                Reportingmanager: data.Reportingmanager,
                            }}
                            render={({ handleSubmit, values, pristine, initialValues, dirtySinceLastSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="p-fluid grid">
                                        <div className="field col-12 md:col-4">
                                            <Field name="BGVStatus">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label className="mr-3 mt-1">BGV Status</label>
                                                        {/* <Checkbox id="BGVStatus" {...input} checked={values["BGVStatus"]} ></Checkbox> */}
                                                        <span className="field fluid">
                                                            <Dropdown
                                                                id="BGVStatus"
                                                                {...input}
                                                                options={[
                                                                    { label: "In Process", value: "In Process" },
                                                                    { label: "Completed", value: "Completed" },
                                                                    { label: "Failed", value: "Failed" },
                                                                ]}
                                                                optionLabel="label"
                                                                placeholder="BGV Status"
                                                                className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="field col-12 md:col-4">
                                            <Field name="Medicalteststatus">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label className="mr-3 mt-1">Medical & Drug Test Status</label>
                                                        {/* <Checkbox id="Medicalteststatus" {...input} checked={values["Medicalteststatus"]} ></Checkbox> */}
                                                        <span className="field fluid">
                                                            <Dropdown
                                                                id="Medicalteststatus"
                                                                {...input}
                                                                options={[
                                                                    { label: "In Process", value: "In Process" },
                                                                    { label: "Completed", value: "Completed" },
                                                                    { label: "Failed", value: "Failed" },
                                                                ]}
                                                                optionLabel="label"
                                                                placeholder="Medicalteststatus"
                                                                className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="field col-12 md:col-4">
                                            <label className="mr-4 " style={{}}>
                                                Reporting Manager Name
                                            </label>

                                            <br></br>
                                            <Field
                                                name="Reportingmanager"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <Dropdown filter {...input} options={props.getactiveuserroleoptionsprop} optionValue="UserName" placeholder="Last Name, First Name" />
                                                        <div style={{}} className="ml-5">
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <label className="radio-inline me-3"></label>
                                        </div>
                                    </div>
                                    <div className="p-fluid grid">
                                        <div className="field col-12 md:col-4">
                                            <Field name="EmployeeID">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label>Employee ID</label>
                                                        <span className="field fluid">
                                                            <input className="p-inputtext p-component" {...input} value={values["EmployeeID"]} maxLength={100} placeholder="Employee Id"></input>
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="field col-12 md:col-4">
                                            <Field name="HRCID">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label>HRC ID</label>
                                                        <span className="field fluid">
                                                            <input className="p-inputtext p-component" {...input} value={values["HRCID"]} maxLength={100} placeholder="HRC Id"></input>
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="field col-12 md:col-4">
                                            <Field name="OfficialMailId">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label>Official EMail</label>
                                                        <span className="field fluid">
                                                            <input className="p-inputtext p-component" {...input} value={values["OfficialMailId"]} maxLength={50} type="email" placeholder="OfficialMailId"></input>
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="p-grid fluid mb-2">
                                        <div className="field col-12 md:col-4">
                                            <Field name="IsJoined" type="checkbox">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label className="mr-3 mt-2">Is Joined ?</label>
                                                        <span className="field fluid">
                                                            <Checkbox id="IsJoined" {...input} checked={values["IsJoined"]}></Checkbox>
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="p-fluid grid">
                                        <div className="field col-12 md:col-9">
                                            <Field name="Brief_Description">
                                                {({ input, meta }) => (
                                                    <div className="field fluid">
                                                        <label className="mr-3 mt-1">Brief Description</label>
                                                        <br></br>
                                                        <span className="field fluid">
                                                            <InputTextarea style={{ width: "80%" }} maxLength={500} id="Comments" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                <div className="p-fluid grid">
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4 flex">
                                        <Button className="mr-2" type="button" onClick={(e) => navigate(-1)}>
                                            Cancel
                                        </Button>
                                        <Button className="" type="submit">
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )}
                    ></Form>
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
export default connect(mapStateToProps)(Updateinterncandidatedetails);
