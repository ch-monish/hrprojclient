import { Button } from 'primereact/button'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { RootState } from '../../../app/store'
import { createpfdetailsaction, pfdetailsaction, updatepfdetailsaction, } from '../../../features/Candidate info/pfdetailsslice'
import { getallqualification } from '../../../features/Dropdownoptions/qualificationselector'
import { qualificationaction } from '../../../features/Dropdownoptions/qualificationtypeslice'
import { Panel } from 'primereact/panel'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from 'primereact/inputmask'
import { candidateinfogetaction } from '../../../features/Candidate info/candidateinfoslice'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { bankdetailsgetaction, Ibankdetail } from '../../../features/Candidate info/bankdetailsslice'
import { Card } from 'primereact/card'
import { Navigate, useNavigate } from 'react-router'
import { pfdetails } from '../../../api/agent'
import LoadingOverlay from "react-loading-overlay";
import { Toast } from 'primereact/toast'

function PFDetails(props) {
  var pfdetailsdata = useSelector((state: RootState) => state.CandidatePfdetails);
  var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
  const logindata = useSelector((state: RootState) => state.Login)
  const [status, setstatus] = useState('')
  var personalsdetailsdata = useSelector((state: RootState) => state.CandidatePersonaldetails);
  const bankdetailsdata: Ibankdetail = useSelector((state: RootState) => state.bankdetails)
  const [edit, setEdit] = useState(pfdetailsdata.MemberNameAsPerAadhar == "" ? false : true)
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  console.log(edit)
  console.log(candidateinfodata)
  console.log(pfdetailsdata)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showspinner, setShowspinner] = useState(false)
  const toast = useRef(null);
  useEffect(() => {
    dispatch(bankdetailsgetaction(
      {
        "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

      }
    ))
    dispatch(qualificationaction())

    console.log("working")


    console.log(pfdetailsdata)

    console.log(props.getallqualificationprop)

    console.log(candidateinfodata)
    dispatch(pfdetailsaction({

      "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
    }))
    pfdetailsdata.MemberNameAsPerAadhar == "" ? setEdit(false) : setEdit(true)



  }, [])
  useEffect(() => {
    console.log(edit)
  }, [edit])





  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };





  const validate = (values) => {
    values["CurrentCTC"] = values["CurrentCTC"]
    let errors = {};

    var arr = ["MemberNameAsPerAadhar", "AADHAR", "DateOfBirth", "Date_Of_Joining", "Gender", "FatherOrHusbandName", "Relation", "Marital_status", "ContactNumber", "Email", "Nationality", "Qualification", "CountryOfOrigin", "AccountNumber", "IFSCcode", "NameAsPerBank", "PAN", "NameAsPerPan"]
    arr.forEach((i) => {
      // console.log(values["Resume"])
      if (!values[i]) {

        // console.log(i.toString())
        errors[i.toString()] = "* This field is required";
      }
    })
    // console.log(values["OverallExpYear"])

    if (values["MemberNameAsPerAadhar"] == undefined || values["MemberNameAsPerAadhar"] == null) {

      errors["MemberNameAsPerAadhar"] = "*This field is required"
    }
    if (values["AADHAR"] == undefined || values["AADHAR"] == null) {

      errors["AADHAR"] = "*This field is required"
    }
    if (values["DateOfBirth"] == undefined || values["DateOfBirth"] == null) {

      errors["DateOfBirth"] = "*This field is required"
    }
    if (values["Date_Of_Joining"] == undefined || values["Date_Of_Joining"] == null) {

      errors["Date_Of_Joining"] = "*This field is required"
    }
    if (values["Gender"] == undefined || values["Gender"] == null) {

      errors["Gender"] = "*This field is required"
    }
    if (values["FatherOrHusbandName"] == undefined || values["FatherOrHusbandName"] == null) {

      errors["FatherOrHusbandName"] = "*This field is required"
    }
    if (values["Relation"] == undefined || values["Relation"] == null) {

      errors["Relation"] = "*This field is required"
    }
    if (values["Marital_status"] == undefined || values["Marital_status"] == null) {

      errors["Marital_status"] = "*This field is required"
    }
    if (values["InternationalWorker"] == undefined || values["InternationalWorker"] == null) {

      errors["InternationalWorker"] = "*This field is required"
    }
    if (values["ContactNumber"] == undefined || values["ContactNumber"] == null) {

      errors["ContactNumber"] = "*This field is required"
    }
    if (values["Email"] == undefined || values["Email"] == null) {

      errors["Email"] = "*This field is required"
    }
    if (values["Nationality"] == undefined || values["Nationality"] == null) {

      errors["Nationality"] = "*This field is required"
    }
    if (values["Qualification"] == undefined || values["Qualification"] == null) {

      errors["Qualification"] = "*This field is required"
    }
    if (values["CountryOfOrigin"] == undefined || values["CountryOfOrigin"] == null) {

      errors["CountryOfOrigin"] = "*This field is required"
    }
    if (values["PhysicalHandicap"] == undefined || values["PhysicalHandicap"] == null) {

      errors["PhysicalHandicap"] = "*This field is required"
    }
    if (values["AccountNumber"] == undefined || values["AccountNumber"] == null) {

      errors["AccountNumber"] = "*This field is required"
    }
    if (values["IFSCcode"] == undefined || values["IFSCcode"] == null) {

      errors["IFSCcode"] = "*This field is required"
    }
    if (values["NameAsPerBank"] == undefined || values["NameAsPerBank"] == null) {

      errors["NameAsPerBank"] = "*This field is required"
    }
    if (values["PAN"] == undefined || values["PAN"] == null) {

      errors["PAN"] = "*This field is required"
    }
    if (values["NameAsPerPan"] == undefined || values["NameAsPerPan"] == null) {

      errors["NameAsPerPan"] = "*This field is required"
    }

    console.log(errors)
    return errors;
  };
  const toInputUppercase = e => {
    console.log(e)
    e.target.value = ("" + e.target.value)?.toUpperCase();
  };
  const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ]
  const marital = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' }
  ]
  const Relation = [
    { value: 'Husband', label: 'Husband' },
    { value: 'Father', label: 'Father' }

  ]
  return (
    <div>
                              <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
      <Card title="PF Details">
        <Form
          // {console.log(candidateinfodata)}
          keepDirtyOnReinitialize={true}
          onSubmit={(values: any) => {
            console.log(values)


            var datetemp = new Date(values.DateOfBirth)
            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
            values['strDateOfBirth'] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
            if (values.PassportValidFrom != null){
              var datetemp = new Date(values.PassportValidFrom)
              // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
              values['strPassportValidFrom'] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
            }else{
              values['strPassportValidFrom'] = null
            }
            // var datetemp = new Date(values.PassportValidTo)
            // // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
            // values.PassportValidTo = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
            if (values.PassportValidTill != null){
              var datetemp = new Date(values.PassportValidTill)
              // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
              values['strPassportValidTill'] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
            }else{
              values['strPassportValidTill'] = null 
            }
              var datetemp = new Date(values.Date_Of_Joining)
            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
            values['strDate_Of_Joining'] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
            console.log(values)
            values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
            if (edit) values["Id"] = pfdetailsdata.Id

            if (edit) {
              setShowspinner(true)
              pfdetails.updatepfdetails(values)
              .then((res) => {
                  console.log(res);
                  setShowspinner(false)
                  toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
              }).then((res) => { }
              ).then(() => setTimeout(() => {
                  // dispatch(bankdetailsgetaction({ "selectedcandidateid":candidateinfodata.Selected_Candidate_ID.toString()}));
                   navigate(-1); }, 2000))
              .catch((ex) => {
                  console.log(ex);
                  setShowspinner(false)
                  toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
              }) }
              else{
                  setShowspinner(true)
                  pfdetails.createpfdetails(values)
                  .then((res) => {
                      console.log(res);
                      setShowspinner(false)
                      toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
                  }).then((res) => { }
                  ).then(() => setTimeout(() => {
                      // dispatch(bankdetailsgetaction({ "selectedcandidateid":candidateinfodata.Selected_Candidate_ID.toString()}));
                       navigate(-1); }, 2000))
                  .catch((ex) => {
                      console.log(ex);
                      setShowspinner(false)
                      toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
                  }) }



            // edit ? dispatch(updatepfdetailsaction(values)) : dispatch(createpfdetailsaction(values))
            // navigate(-1)
            // dispatch(setnextcandidateinfotab())
          }}
          initialValues={edit ? {


            "PreviousCompanyUAN": pfdetailsdata.PreviousCompanyUAN,
            "PreviousMemberId": pfdetailsdata.PreviousMemberId,
            "MemberNameAsPerAadhar": pfdetailsdata.MemberNameAsPerAadhar,
            "AADHAR": pfdetailsdata.AADHAR,
            "DateOfBirth": new Date(pfdetailsdata.DateOfBirth),
            "Date_Of_Joining": new Date(pfdetailsdata.Date_Of_Joining),
            "Gender": pfdetailsdata.Gender,
            "FatherOrHusbandName": pfdetailsdata.FatherOrHusbandName,
            "Relation": pfdetailsdata.Relation,
            "Marital_status": pfdetailsdata.Marital_status,
            "InternationalWorker": pfdetailsdata.InternationalWorker,
            "ContactNumber": pfdetailsdata.ContactNumber,
            "Email": pfdetailsdata.Email,
            "Nationality": pfdetailsdata.Nationality,
            "wages": pfdetailsdata.wages,
            "Qualification": pfdetailsdata.Qualification,
            "CountryOfOrigin": pfdetailsdata.CountryOfOrigin,
            "PassportNumber": pfdetailsdata.PassportNumber,
            "PassportValidFrom": pfdetailsdata.PassportValidFrom?new Date(pfdetailsdata.PassportValidFrom):null,
            "PassportValidTill": pfdetailsdata.PassportValidTill?new Date(pfdetailsdata.PassportValidTill):null,
            "PhysicalHandicap": pfdetailsdata.PhysicalHandicap,
            "AccountNumber": pfdetailsdata.AccountNumber,
            "IFSCcode": pfdetailsdata.IFSCcode,
            "NameAsPerBank": pfdetailsdata.NameAsPerBank,
            "PAN": pfdetailsdata.PAN,
            "NameAsPerPan": pfdetailsdata.NameAsPerPan,
            "locomotive":pfdetailsdata.locomotive,
              "Hearing":pfdetailsdata.Hearing,
              "Visual":pfdetailsdata.Visual



          } : candidateinfodata.candidate ? {
            "PreviousCompanyUAN": null,
            "PreviousMemberId": null,
            "ContactNumber": personalsdetailsdata.ContactNumber,
            "Email": candidateinfodata.candidate.Email,
            "Qualification": candidateinfodata.candidate.Qualification,
            "MemberNameAsPerAadhar": personalsdetailsdata.Name,
            "AADHAR": personalsdetailsdata.AADHAR,
            "PAN": personalsdetailsdata.PAN,
            "Gender": personalsdetailsdata.Gender,
            "DateOfBirth": new Date(personalsdetailsdata.DateOfBirth),
            "Date_Of_Joining": new Date(candidateinfodata.DateOfJoining),
            "Marital_status": personalsdetailsdata.Marital_status,
            "PassportNumber": personalsdetailsdata.PassportNumber,
            "PassportValidFrom": personalsdetailsdata.PassportValidFrom ? new Date(personalsdetailsdata.PassportValidFrom) : null,
            "PassportValidTill": personalsdetailsdata.PassportValidTo ? new Date(personalsdetailsdata.PassportValidTo) : null,

            "IFSCcode": bankdetailsdata.IFSCcode,
            "AccountNumber": bankdetailsdata.AccountNumber,
            "locomotive":false,
              "Hearing":false,
              "Visual":false



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
              <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                  <Field
                    name="PreviousCompanyUAN"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="PreviousCompanyUAN">Previous Company UAN</label>
                        <span className="label">
                          <InputText id="PreviousCompanyUAN" {...input} maxLength={50} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <Field
                    name="PreviousMemberId"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="PreviousMemberId">Previous Member ID</label>
                        <span className="label">
                          <InputText id="PreviousMemberId" {...input} maxLength={50} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="MemberNameAsPerAadhar"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="MemberNameAsPerAadhar">Employee Name (As per Aadhar Card)*</label>
                        <span className="label">
                          <InputText id="MemberNameAsPerAadhar" {...input} maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                      <label htmlFor="AADHAR"> Aadhaar* </label>
                      <span className="label">
                        <InputText id="AADHAR" {...input} maxLength={12} onInput={toInputUppercase} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                /></div>
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
                    name="Date_Of_Joining"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="Date_Of_Joining ">Date Of Joining*</label>
                        <Calendar id="Date_Of_Joining" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                        <span className="label">
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                        <label htmlFor="Gender">Gender*</label>
                        <span className="p-float-label">
                          <Dropdown id="Gender" {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="FatherOrHusbandName"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="FatherOrHusbandName">Father Or Husband Name*</label>
                        <span className="label">
                          <InputText id="FatherOrHusbandName" {...input} maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <Field
                    name="Relation"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label htmlFor="Relation ">Relation*</label>
                        <span className="p-float-label">
                          <Dropdown id="Relation " {...input} options={Relation} placeholder="Select Relation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                    name="Marital_status"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label htmlFor="Experience Level">Marital Status*</label>
                        <span className="p-float-label">
                          <Dropdown id="Marital_status" {...input} options={marital} placeholder="Select Marital Status " className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="ContactNumber"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="ContactNumber">Contact Number*</label>
                        <span className="label">
                          {/* <InputNumber id="Employee Name " value={values.NoOfPositions} onChange={e=>values["ContactNumber"]=e.value} max={9999999999} {...input}  className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                          <InputMask  {...input} value={values["ContactNumber"]} onChange={(e) => values["ContactNumber"] = e.value} mask="99-9999999999" />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  /></div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="Email"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="Email">Email*</label>
                        <span className="label">
                          <InputText id="Email " {...input} maxLength={50} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                    name="Nationality"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="Nationality">Nationality*</label>
                        <span className="label">
                          <InputText id="Nationality " {...input} maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="Qualification"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label htmlFor="Qualification">Qualification*</label>
                        <span className="column">
                          <Dropdown id="Qualification"{...input} options={props.getallqualificationprop} optionLabel="label" placeholder="Select Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4">

                  <Field
                    name="CountryOfOrigin"
                    render={({ input, meta }) => (
                      <div className="field ">
                        <label htmlFor="CountryOfOrigin">Country Of Origin*</label>
                        <span className="label">
                          <InputText id="CountryOfOrigin " {...input}  maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  /></div>
                {/* <div className="field col-12 md:col-4">
                  <Field
                    name="wages"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="wages">Wages</label>
                        <span className="label">
                          <InputText id="wages" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  /></div> */}
              </div>
              <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                  <div className="p-fluid  grid">
                    <div className="field col-12 md:col-6">
                      <label>International Worker?* </label>
                    </div>
                    <div className="field col-12 md:col-3">
                      <Field name="InternationalWorker" render={({ input, meta }) => (<>
                        <RadioButton {...input} className='mb-1' inputId="InternationalWorker" name="InternationalWorker" value={true} checked={values.InternationalWorker == true} />
                      </>)} />

                      <label className="radio-inline ml-3"> Yes      </label>
                    </div>
                    <div className="field col-12 md:col-3">
                      <Field name="InternationalWorker" render={({ input, meta }) => (<>

                        <RadioButton {...input} className='mb-1' inputId="InternationalWorker" name="InternationalWorker" value={false} checked={values.InternationalWorker == false} />

                        <label className="radio-inline ml-3"> No
                        </label>
                        <div>
                          {getFormErrorMessage(meta)}
                        </div>
                      </>)} />
                    </div>

                  </div>
                </div>


                <div className="field col-12 md:col-4">
                  <div className="p-fluid  grid">
                    <div className="field col-12 md:col-6">
                      <label>Physically Handicap?*</label>
                    </div>
                    <div className="field col-12 md:col-3">
                      <Field name="PhysicalHandicap" render={({ input, meta }) => (<>
                        <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" name="PhysicalHandicap" value={true} checked={values.PhysicalHandicap == true} />
                      </>)} />

                      <label className="radio-inline ml-3"> Yes      </label>
                    </div>
                    <div className="field col-12 md:col-3">
                      <Field name="PhysicalHandicap" render={({ input, meta }) => (<>

                        <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" onChange={(e)=>{values["locomotive"] = false; values["Hearing"] = false; values["Visual"] = false; input.onChange(e);} } name="PhysicalHandicap" value={false} checked={values.PhysicalHandicap == false} />

                        <label className="radio-inline ml-3"> No
                        </label>
                        <div>
                          {getFormErrorMessage(meta)}
                        </div>
                      </>)} />
                    </div>

                  </div>
                </div>

                {values["PhysicalHandicap"] &&
                  <div className="field col-12 md:col-4">
                    <div className="p-fluid  grid">
                      <div className="field col-12 md:col-4">
                        <Field
                          name="locomotive"
                          type="checkbox"
                          render={({ input, meta }) => (
                            <div className="field-checkbox">
                              <Checkbox inputId={input.name} {...input} />
                              <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                {"locomotive"}
                              </label>
                            </div>)} />
                      </div>
                      <div className="field col-12 md:col-4">
                      <Field
                        name="Hearing"
                        type="checkbox"
                        render={({ input, meta }) => (
                          <div className="field-checkbox">
                            <Checkbox inputId={input.name} {...input} />
                            <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                              {"Hearing"}
                            </label>
                          </div>)} />
                      </div>
                      <div className="field col-12 md:col-4">
                        <Field
                          name="Visual"
                          type="checkbox"
                          render={({ input, meta }) => (
                            <div className="field-checkbox">
                              <Checkbox inputId={input.name} {...input} />
                              <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                {"Visual"}
                              </label>
                            </div>)} />
                      </div>
                    </div>
                  </div>}

              </div>


              <br></br>
              <Panel header="Passport Details:">

                <div className="p-fluid  grid">
                  <div className="field col-12 md:col-4">
                    <Field
                      name="PassportNumber"
                      render={({ input, meta }) => (
                        <div className="field " >
                          <label htmlFor="PassportNumber">Passport Number</label>
                          <span className="label">
                            <InputText id="PassportNumber " {...input} maxLength={20} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                            <Calendar maxDate={values["PassportValidTo"] ? new Date(values["PassportValidTo"]) : new Date()} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                          </span>
                          {getFormErrorMessage(meta)}
                        </div>
                      )}
                    />
                  </div>
                  <div className="field col-12 md:col-4"><Field
                    name="PassportValidTill"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="Employee Name">Valid to</label>
                        <span className="label">
                          <Calendar minDate={values["PassportValidFrom"] ? new Date(values["PassportValidFrom"]) : new Date()} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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

                {/* <div className="md:col-2">
    <label htmlFor="PhysicalHadicap">Physical Hadicap*</label>
    <br></br>
    <br></br>

    <Field
      name="PhysicalHadicap"
      type="checkbox"
      render={({ input, meta }) => (
        <div className="field-checkbox">
    <RadioButton
      {...input} className='ml-2' inputId="PhysicalHandicap" onChange={e => console.log(e.value, values["PhysicalHandicap"])} name="PhysicalHandicap" value={true} checked={values.PhysicalHandicap == true} />
    <span><label className="radio-inline me-3" htmlFor='PhysicalHadicap'><b>Yes</b>
    </label>
    </span>
        </div>)} />
    <br></br>
    <br></br>

    <Field
      name="PhysicalHadicap"
      type="checkbox"
      render={({ input, meta }) => (
        <div className="field-checkbox">
    <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" name="PhysicalHandicap" value={false} checked={values.PhysicalHandicap == false} />
    <span><label className="radio-inline me-3"><b>No</b>
      <br></br>
      <br></br>
    </label>
    </span>
        </div>)} />
  </div> */}


                <div className="field col-12 md:col-4">
                  <Field
                    name="AccountNumber"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="AccountNumber">Account Number* </label>
                        <span className="label">
                          <InputText onInput={toInputUppercase}  id="AccountNumber" {...input} maxLength={20} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <Field
                    name="IFSCcode"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="IFSCcode">IFSC code* </label>
                        <span className="label">
                          <InputText onInput={toInputUppercase} id="IFSCcode" {...input} maxLength={20} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-4">
                  <Field
                    name="NameAsPerBank"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="NameAsPerBank">Name (As per Bank)*</label>
                        <span className="label">
                          <InputText id="NameAsPerBank " {...input} maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                    name="PAN"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="PAN">PAN* </label>
                        <span className="label">
                          <InputText onInput={toInputUppercase} id="PAN" {...input} maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <Field
                    name="NameAsPerPan"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="NameAsPerPan">Name (As per Pan)*</label>
                        <span className="label">
                          <InputText id="NameAsPerPan " {...input} maxLength={100} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  /></div>
              </div>
              <div className="p-fluid  grid">


                <div className="field col-12 md:col-5 flex"></div>
                <div className="field col-12 md:col-5 flex"></div>
                <div className="field col-12 md:col-2 flex">
                  <Button type='button' className='mr-2' onClick={e => navigate(-1)}
                  // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                  >Cancel</Button>
                  <Button type='submit'
                  // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                  >Save</Button>
                </div>
              </div>

            </form>


          )}
        />
      </Card>
      </LoadingOverlay>

    </div>
  )
}
function mapStateToProps(state) {
  return {

    getallqualificationprop: getallqualification(state)
  };
}

export default connect(mapStateToProps)(PFDetails)
