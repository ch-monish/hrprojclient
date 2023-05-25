import { Button } from 'primereact/button'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { RootState } from '../../../app/store'
import { createpersonaldetailsaction, personaldetailsaction, updatepersonaldetailsaction, } from '../../../features/Candidate info/personaldetailsslice'

import { Panel } from 'primereact/panel'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from 'primereact/inputmask'
import { candidateinfogetaction } from '../../../features/Candidate info/candidateinfoslice'


function PersonalDetails() {
    var personalsdetailsdata = useSelector((state: RootState) => state.CandidatePersonaldetails);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const logindata = useSelector((state: RootState) => state.Login)
    const [edit, setEdit] = useState(personalsdetailsdata.Name == "" ? false : true)
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    console.log(edit)
    console.log(candidateinfodata)
    const dispatch = useDispatch()


    useEffect(() => {

        console.log("working")
        // dispatch(candidateinfogetaction({

        //     "email": logindata.email


        // }))

        console.log(personalsdetailsdata)
        console.log(candidateinfodata)
        dispatch(personaldetailsaction({

            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
        }))
        personalsdetailsdata.Name == "" ? setEdit(false) : setEdit(true)



    }, [])
    useEffect(() => {
        console.log(edit)
    }, [edit])





    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const options = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ]
    const Relation = [
        { value: 'Mother', label: 'Mother' },
        { value: 'Father', label: 'Father' },
        { value: 'Spouse', label: 'Spouse' },
        { value: 'Brother',label: 'Brother' },
        { value: 'Sister', label: 'Sister' },
        { value: 'Others', label: 'Others' },
    ]
    const marital = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' }
    ]
    const bloodgroup = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
    ]



    const validate = (values) => {
        values["CurrentCTC"] = values["CurrentCTC"]
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        // var arr = ["CandidateFirstName", "BusinessUnit_id", "Serviceline_id", "Industry_id", "Industry_id", "Customer_id", "Location_id", "EmploymentType", "JobTitle", "JobDesc", "ExperianceLevel_id", "Qualification", "NoOfPositions", "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        var arr = ["Name", "DateOfBirth", "Marital_status", "Gender", "BloodGroup", "PAN",
            "AADHAR", "Email", "ContactNumber", "Address", "EmergencycontactName", "EmergencycontactRelation", "EmergencycontactNumber"]
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })
        // console.log(values["OverallExpYear"])
        if (values["Name"] == undefined || values["Name"] == null) {

            errors["Name"] = "*This field is required"
        }

        if (values["DateOfBirth"] == undefined || values["DateOfBirth"] == null) {

            errors["DateOfBirth"] = "*This field is required"
        }

        if (values["Marital_status"] == undefined || values["Marital_status"] == null) {

            errors["Marital_status"] = "*This field is required"
        }
        if (values["Gender"] == undefined || values["Gender"] == null) {

            errors["Gender"] = "*This field is required"
        }
        if (values["BloodGroup"] == undefined || values["BloodGroup"] == null) {

            errors["BloodGroup"] = "*This field is required"
        }
        if (values["PAN"] == undefined || values["PAN"] == null) {

            errors["PAN"] = "*This field is required"
        }
        if (values["AADHAR"] == undefined || values["AADHAR"] == null) {

            errors["AADHAR"] = "*This field is required"
        }
        if (values["Email"] == undefined || values["Email"] == null) {

            errors["Email"] = "*This field is required"
        }
        if (values["ContactNumber"] == undefined || values["ContactNumber"] == null) {

            errors["ContactNumber"] = "*This field is required"
        }
        if (values["Address"] == undefined || values["Address"] == null) {

            errors["Address"] = "*This field is required"
        }
        if (values["EmergencycontactName"] == undefined || values["EmergencycontactName"] == null) {

            errors["EmergencycontactName"] = "*This field is required"
        }
        if (values["EmergencycontactRelation"] == undefined || values["EmergencycontactRelation"] == null) {

            errors["EmergencycontactRelation"] = "*This field is required"
        }
        if (values["EmergencycontactNumber"] == undefined || values["EmergencycontactRelation"] == null) {

            errors["EmergencycontactNumber"] = "*This field is required"
        }
        // if (!editmode && (values["Resume"] == null)) {

        //     errors["Resume"] = "*This field is required"
        // }
        console.log(errors)
        return errors;
    };
    const toInputUppercase = e => {
        console.log(e)
        e.target.value = ("" + e.target.value)?.toUpperCase();
      };
    return (
        <div>
            <Form
                // {console.log(candidateinfodata)}
                onSubmit={(values: any) => {
                    console.log(values)


                    var datetemp = new Date(values.DateOfBirth)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    values.DateOfBirth = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    if (values.PassportValidFrom != null){
                        var datetemp = new Date(values.PassportValidFrom)
                        values.PassportValidFrom = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    }
                    if (values.PassportValidTo != null){
                        var datetemp = new Date(values.PassportValidTo)
                        values.PassportValidTo = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    }
                    console.log(values)
                    values.selectedCandidateid = candidateinfodata.Selected_Candidate_ID
                    edit ? dispatch(updatepersonaldetailsaction(values)) : dispatch(createpersonaldetailsaction(values))


                    dispatch(setnextcandidateinfotab())
                }}
                keepDirtyOnReinitialize={true}
                initialValues={edit ? {
                    "Name": personalsdetailsdata.Name,
                    "Email": personalsdetailsdata.Email,

                    "DateOfBirth": new Date(personalsdetailsdata.DateOfBirth),

                    "Marital_status": personalsdetailsdata.Marital_status,

                    "Gender": personalsdetailsdata.Gender,

                    "BloodGroup": personalsdetailsdata.BloodGroup,

                    "PAN": personalsdetailsdata.PAN,

                    "AADHAR": personalsdetailsdata.AADHAR,


                    "ContactNumber": personalsdetailsdata.ContactNumber,

                    "EmergencycontactName": personalsdetailsdata.EmergencycontactName,

                    "EmergencycontactRelation": personalsdetailsdata.EmergencycontactRelation,

                    "EmergencycontactNumber": personalsdetailsdata.EmergencycontactNumber,

                    "PassportNumber": personalsdetailsdata.PassportNumber,

                    "PassportValidFrom": personalsdetailsdata.PassportValidFrom? new Date(personalsdetailsdata.PassportValidFrom):null,

                    "PassportValidTo": personalsdetailsdata.PassportValidTo? new Date(personalsdetailsdata.PassportValidTo):null,

                    "Address": personalsdetailsdata.Address


                } : candidateinfodata.candidate ? {

                    "ContactNumber": candidateinfodata.candidate.ContactNo,
                    "Email": candidateinfodata.candidate.Email,
                    "PassportNumber":null,

                    "PassportValidFrom": null,

                    "PassportValidTo": null,

                } : {}}

                validate={validate}
                render={({ handleSubmit, values, submitting,
                    submitError,
                    invalid,
                    pristine,
                    initialValues = {},
                    dirtySinceLastSubmit, }) => (
                    <form onSubmit={handleSubmit} >






                        <br></br>
                        <br></br>
                        <Panel header="Personal Information">
                        <div className="p-fluid  grid">
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Name"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Employee Name (As per Aadhar Card)*</label>
                                            <span className="label">
                                                <InputText id="Employee Name " {...input}  maxLength={40} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="DateOfBirth"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Date Of Birth (As per Aadhar Card)*</label>
                                            <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                            <span className="label">
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Marital_status"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Marital Status*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Marital Status" {...input} options={marital} placeholder="Select Marital Status " className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="p-fluid  grid">

                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Gender"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Gender*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BloodGroup"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Blood Group*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={bloodgroup} placeholder="Select Blood Group" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="PAN"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="PAN">PAN* </label>
                                            <span className="label">
                                                <InputText   onInput={toInputUppercase}   id="PAN" {...input}  maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="p-fluid  grid">

                            <div className="field col-12 md:col-4"><Field
                                name="AADHAR"
                                render={({ input, meta }) => (
                                    <div className="field " >
                                        <label htmlFor="Employee Name"> Aadhaar* </label>
                                        <span className="label">
                                            <InputText id="Employee Name " {...input}  maxLength={12}  onInput={toInputUppercase}  className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            /></div>
                            <div className="field col-12 md:col-4"><Field
                                name="Email"
                                render={({ input, meta }) => (
                                    <div className="field " >
                                        <label htmlFor="Employee Name">Email*</label>
                                        <span className="label">
                                            <InputText id="Employee Name " {...input} maxLength={50} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            /></div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="ContactNumber"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="ContactNumber">Contact No*</label>
                                            <span className="label">
                                                {/* <InputNumber id="Employee Name " value={values.NoOfPositions} onChange={e=>values["ContactNumber"]=e.value} max={9999999999} {...input}  className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                <InputMask  {...input} maxLength={15}  mask="99-9999999999" />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                        </div>
                        <div className="p-fluid  grid">
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Address"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Address (As per Aadhaar) *</label>
                                            <span className="label">
                                                <InputTextarea style={{ width: "100%" }} maxLength={500} id="Employee Name " {...input}  className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        </Panel>

                        {/* contact no */}
                        <Panel header="Emergency Contact:">
                            <div className="p-fluid  grid">

                                <div className="field col-12 md:col-4">

                                    <Field
                                        name="EmergencycontactName"
                                        render={({ input, meta }) => (
                                            <div className="field ">
                                                <label htmlFor="Employee Name">Name*</label>
                                                <span className="label">
                                                    <InputText id="Employee Name " {...input} maxLength={40} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    /></div>
                                <div className="field col-12 md:col-4">
                                <Field
                                    name="EmergencycontactRelation"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="EmergencycontactRelation ">Relation*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="EmergencycontactRelation " {...input} options={Relation} placeholder="Select Relation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="EmergencycontactNumber"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Contact No*</label>
                                            <span className="label">
                                                <InputMask  {...input} maxLength={20} mask="99-9999999999" />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div>
                        </Panel>
                        <br></br>
                        <Panel header="Passport Details:">

                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="PassportNumber"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="PassportNumber">Passport No</label>
                                                <span className="label">
                                                    <InputText id="PassportNumber " {...input}  maxLength={8} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="PassportValidFrom"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Employee Name">Valid from</label>
                                                <span className="label">
                                                    <Calendar  maxDate={values["PassportValidTo"]?new Date(values["PassportValidTo"]):new Date()} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="PassportValidTo"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Valid to</label>
                                            <span className="label">
                                                <Calendar minDate={values["PassportValidFrom"]?new Date(values["PassportValidFrom"]):new Date()} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div>
                        </Panel>


                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="p-fluid  grid">


                            <div className="field col-12 md:col-5 flex"></div>
                            <div className="field col-12 md:col-5 flex"></div>
                            <div className="field col-12 md:col-2 ">
                                <Button type='submit'
                                // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                                >Save & Next</Button>
                            </div>
                        </div>

                    </form>


                )}
            />


        </div>
    )
}

export default PersonalDetails
