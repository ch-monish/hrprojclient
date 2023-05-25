import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { getactivebandoptions } from '../../../features/Band/BandSelector'
import { getBandaction } from '../../../features/Band/Bandslice'
import { getactivedesignationoptions } from '../../../features/Designation/designationselector'
import { getdesignationsaction } from '../../../features/Designation/designationslice'
import { getasubbandactiveoptions } from '../../../features/SubBand/subbandselector'
import { getsubbandsaction } from '../../../features/SubBand/subbandslice'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { RadioButton } from 'primereact/radiobutton';
import { previewannexureaction, updateselcontractcandidateaction, updateselectedcandidatesaction, updateselinterncandidateaction } from '../../../features/CandidateActions/selectedcandidatesslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Accordion, AccordionTab } from 'primereact/accordion'
import Annexure from './Annexure'
import { Dialog } from 'primereact/dialog'
import { selectedcandidateactions } from '../../../api/agent'
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import LoadingOverlay from "react-loading-overlay";
import { InputTextarea } from 'primereact/inputtextarea'

function SelectedCandidateDetails(props) {
    const location = useLocation()
    const [data, setdata] = useState(location.state)
    const logindata = useSelector((state: RootState) => state.Login)
    const annexuredata = useSelector((state: RootState) => state.anexure)
    const toaststatus = useSelector((state: RootState) => state.toaster.status)
    const [mode, setmode] = useState(data.designation ? "true" : "false")
    const [candidatedata, setCandidatedata] = useState(data.candidate)
    const [jobpostdata, setjobpostdata] = useState(data.jobpost)
    const [doj, setDoj] = useState(data.DateOfJoining)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const toast = useRef(null);
    const [showspinner, setShowspinner] = useState(false)

    useEffect(() => {
        dispatch(getdesignationsaction())
        dispatch(getBandaction())
        dispatch(getsubbandsaction())
        console.log(location.state)
        console.log(data)
        console.log(annexuredata)

    }, [])
    useEffect(() => {
        console.log(annexuredata)
        console.log(jobpostdata)
        console.log(candidatedata)
    }, [annexuredata])
    const validate = (values) => {
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        var arr = [

            "designation", "band", "DateOfJoining"

        ]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        console.log(values.IsVariable)
        // if ( !( props.getactivebandoptionsprop.filter((i)=>i.value=="L").value!=values.band  &&!values.subband&&values.subband!=undefined )) {

            if (!values["subband"]) {

                if(props.getactivebandoptionsprop.length>0 &&props.getactivebandoptionsprop.filter((i)=>i.label=="L")[0].value==values?.band)
                {
                    // console.log("skipping validation for subband")
                    //skip validation for subband if band is L
                }
                else{

                    errors["subband"] = "*This field is required"
                }
        }
        if (values.IsVariable == null) {

            errors["IsVariable"] = "*This field is required"
        }
        if (!values["VariablePerc"] && values.IsVariable == true) {
            // console.log(values["Duration"])

            errors["VariablePerc"] = "*This field is required"
        }
        if (!values["FinalCTC"]) {
            // console.log(values["Duration"])

            errors["FinalCTC"] = "*This field is required"
        }
        if (values.IsVariable == true && !values["MQVariable"]) {
            // console.log(values["Duration"])

            errors["MQVariable"] = "*This field is required"
        }
        if (values.Is_Eligible_Joining_Bonus == true && !values["JoiningBonus"]) {
            // console.log(values["Duration"])

            errors["JoiningBonus"] = "*This field is required"
        }
        //   console.log(values["Duration"])
        if (jobpostdata.businessunit_name == "Workforce Solutions" && !values["ShiftAllowance"]) {
            errors["ShiftAllowance"] = "*This field is required"

        }
        console.log(errors)
        return errors;
    };
    const contractformvalidate = (values) => {
        var errors = []

        var arr = ["designation", "FinalCTC", "NoOfHours", "DateOfJoining", "endDate", "Duration", "Responsibilities"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        console.log(errors)
        return errors
    }
    const Internformvalidate = (values) => {
        var errors = []

        var arr = ["designation", "FinalCTC", "DateOfJoining", "Duration"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        console.log(errors)
        return errors
    }
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const filtersubband = (s: any) => {
        var temp: any = []
        props.getasubbandactiveoptionsprop.forEach((e) => {
            // console.log(s)
            if (e.BandId == s) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    BandId: e.BandId,
                    value: e.value

                })
            }
        })
        // console.log(temp)
        return temp
    }
    const shoulddisanleanexurebutton = (values) => {

        console.log(values)
        if (values.Is_Eligible_Joining_Bonus == true && !values["JoiningBonus"]) {
            // console.log(values["Duration"])

            return true
        }
        //   console.log(values["Duration"])
        if (jobpostdata.businessunit_name == "Workforce Solutions" && !values["ShiftAllowance"]) {
            return true

        }
        if (values.IsVariable == null) {
            return true
        }
        else {
            if (!values.IsVariable) {
                if (
                    values.designation > 0 &&
                    values.band > 0 &&
                    ((props.getactivebandoptionsprop.length>0 && props.getactivebandoptionsprop.filter(i=>(i.label=="L"))[0].value==values?.band) || values.subband > 0) &&
                    values.DateOfJoining &&
                    values.FinalCTC > 0
                )
                    return false
                else
                    return true
            }
            else {

                if (
                    values.designation > 0 &&
                    values.band > 0 &&
                    ((props.getactivebandoptionsprop.length>0 && props.getactivebandoptionsprop.filter(i=>(i.label=="L"))[0].value==values?.band) || values.subband > 0) &&
                    values.DateOfJoining &&
                    values.FinalCTC > 0 &&
                    values.MQVariable != "" &&
                    values.VariablePerc)
                    return false
                else
                    return true
            }
        }
    }
    const callpreviewannexure1 = async (values) => {

        console.log(values)
        values["FinalCTC"] = parseInt(values["FinalCTC"])
        values["VariablePerc"] = parseInt(values["VariablePerc"])
        if (values["ShiftAllowance"] != null)
            values["ShiftAllowance"] = parseInt(values["ShiftAllowance"])
        if (values["JoiningBonus"] != null)
            values["JoiningBonus"] = parseInt(values["JoiningBonus"])

        if (
            values.selectedcandidateid &&
            values.designation &&
            values.band &&
            ( (props.getactivebandoptionsprop.length>0 && props.getactivebandoptionsprop.filter(i=>(i.label=="L"))[0].value==values?.band) || values.subband) &&
            values.FinalCTC
        ) {

            var datetemp = new Date(values.DateOfJoining)
            values["doj"] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
            await dispatch(previewannexureaction(values))
            await setdata(values)
            await setmode("draft")
            setshow(true)
        }
    }
    const DialogFooter = () => {
        return (
            <>

                <Button onClick={e => { setshow(false) }}>Close</Button>
            </>
        )
    }
    return (
        <>
            <LoadingOverlay
                active={showspinner}
                spinner
                text="Generating documents..."
            >
                {/* {showspinner &&
            <ProgressSpinner  style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
            } */}
                <Toast ref={toast} position="bottom-left" />
                {console.log(mode)}
                {console.log(data)}
                <Card>
                    <Dialog visible={show} style={{ width: "50%" }} header="Annexure Information " modal className="p-fluid" footer={DialogFooter} onHide={() => setshow(false)}>

                        {/* <label htmlFor="BandName<">Annexure</label> */}

                        <Annexure annexure={annexuredata}></Annexure>

                    </Dialog>
                    <Panel header="Offer Generation">
                    <Panel header={"Candidate Details"}>
                        <CandidateDetails data={candidatedata}></CandidateDetails>
                    </Panel>
                    <br>
                    </br>
                    <Accordion>
                        <AccordionTab header={"JobPost Details"}>
                            <JobPostDetails JobData={jobpostdata}></JobPostDetails>
                        </AccordionTab>
                    </Accordion>
                    {/* <Panel header={"JobPost Details"}>
                    <JobPostDetails JobData={data.jobpost}></JobPostDetails>

                </Panel> */}
                    <br></br>
                    {Object.is(candidatedata.EmploymentType, "Full-Time") && <Form

                        onSubmit={async (values: any) => {
                            console.log(values)
                            if (values["Is_Eligible_Joining_Bonus"] == false) {
                                values["JoiningBonus"] = 0
                            }
                            values["FinalCTC"] = parseInt(values["FinalCTC"])
                            values["VariablePerc"] = parseInt(values["VariablePerc"])
                            values["JoiningBonus"] = parseInt(values["JoiningBonus"])
                            console.log(values.DateOfJoining)
                            // console.log(typeof values.DateOfJoining)
                            // var tempdate = values.DateOfJoining
                            var datetemp = new Date(values.DateOfJoining)

                            values["doj"] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                            console.log(values)
                            // await setdata(values)
                            // await setmode("draft")
                            // dispatch(updateselectedcandidatesaction(values))
                            try {
                                setShowspinner(true)
                                selectedcandidateactions.updateselectedcandidate(values)
                                    .then((res) => {
                                        console.log(res);
                                        setShowspinner(false)
                                        toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
                                    }).then((res) => { }
                                    ).then(() => setTimeout(() => { navigate(-1); }, 2000))
                                    .catch((ex) => {
                                        console.log(ex);
                                        setShowspinner(false)
                                        setdata(values); setmode('draft');
                                        toast.current.show({ severity: 'error', summary: 'Error Message', detail: "error", life: 3000 });
                                    })

                                // console.log(res)

                                // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})

                            }
                            catch (err) {
                                console.log(err)

                                setShowspinner(false)

                            }
                            // values.DateOfJoining = tempdate

                            // console.log(toaststatus)
                            // navigate(-1)
                            // console.log(values.OnBoardingDate)
                            // var datetemp = new Date(values.OnBoardingDate)
                            // console.log(datetemp.getMonth())
                            // console.log(datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate())
                            // values.OnBoardingDate = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                            // // alert("sub mit form")
                            // if (mode) {


                            //     dispatch(updatejobpost(values))
                            //     navigate(-1)
                            // }
                            // else {
                            //     dispatch(createnewjobpost(values))
                            //     navigate(-1)
                            // }
                        }
                        }
                        keepDirtyOnReinitialize={true}
                        initialValues={mode == "true" ? {
                            "selectedcandidateid": data.Selected_Candidate_ID,

                            "Modified_By": logindata.username,


                            "designation": data.designation,
                            "band": data.band,
                            "subband": data.subband,

                            "DateOfJoining": new Date(data.DateOfJoining),
                            "FinalCTC": data.FinalCTC,
                            "MQVariable": data.MQVariable,
                            "Is_Eligible_annu_Mgnt_Bonus": data.Is_Eligible_annu_Mgnt_Bonus,
                            "Is_Eligible_Joining_Bonus": data.Is_Eligible_Joining_Bonus,
                            "IS_Eligible_Monthly_Incentive": data.IS_Eligible_Monthly_Incentive,
                            "VariablePerc": data.VariablePerc,
                            "IsVariable": data.IsVariable,
                            "ShiftAllowance": data.ShiftAllowance ? data.ShiftAllowance : null,
                            "JoiningBonus": data.JoiningBonus ? data.JoiningBonus : null,


                        } : mode == "false" ? {

                            "selectedcandidateid": data.Selected_Candidate_ID,
                            "Is_Eligible_annu_Mgnt_Bonus": false,
                            "Is_Eligible_Joining_Bonus": false,
                            "IS_Eligible_Monthly_Incentive": false,
                            "Modified_By": logindata.username,
                            "MQVariable": null,
                            "FinalCTC": null,

                            "designation": null,
                            "band": null,
                            "subband": null,
                            "VariablePerc": null,
                            "DateOfJoining": null,
                            "IsVariable": null,
                            "ShiftAllowance": jobpostdata.businessunit_name == "Workforce Solutions"? 3000:null,
                            "JoiningBonus": null


                        } :
                            {
                                "selectedcandidateid": data.selectedcandidateid,
                                // "VariablePerc": 0,//will change after backend changes

                                "Modified_By": logindata.username,


                                "designation": data.designation,
                                "band": data.band,
                                "subband": data.subband,

                                "DateOfJoining": new Date(data.DateOfJoining),

                                "FinalCTC": data.FinalCTC,

                                "MQVariable": data.MQVariable,
                                "Is_Eligible_annu_Mgnt_Bonus": data.Is_Eligible_annu_Mgnt_Bonus,
                                "Is_Eligible_Joining_Bonus": data.Is_Eligible_Joining_Bonus,
                                "IS_Eligible_Monthly_Incentive": data.IS_Eligible_Monthly_Incentive,
                                "VariablePerc": data.VariablePerc,
                                "IsVariable": data.IsVariable,
                                "ShiftAllowance": data.ShiftAllowance ? data.ShiftAllowance : null,
                                "JoiningBonus": data.JoiningBonus ? data.JoiningBonus : null,
                            }

                        }

                        validate={validate}

                        render={({ handleSubmit, values, submitting,
                            submitError,
                            invalid,
                            pristine,
                            initialValues = {},
                            dirtySinceLastSubmit, }) => (
                            <form onSubmit={handleSubmit} >

                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-3"><Field
                                        name="designation"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="designation">Designation</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="designation"  {...input} options={props.getactivedesignationoptionsprop} optionLabel="label" filter placeholder="Select Designation"

                                                        className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />

                                    </div>
                                    <div className="field col-12 md:col-3"><Field
                                        name="band"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="band">Band</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="band" {...input} options={props.getactivebandoptionsprop} optionLabel="label" placeholder="Select Band"

                                                        className={classNames({ "p-invalid": isFormFieldValid(meta) })} onChange={e=>{values.subband=null;console.log(e);input.onChange(e);}} />
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />

                                    </div>
                                    <div className="field col-12 md:col-3"><Field
                                        name="subband"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="subband">Sub Band</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="subband" {...input} options={filtersubband(values["band"])} optionLabel="label" placeholder="Select sub band"

                                                        className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />

                                    </div>

                                    <div className="field col-12 md:col-3"><Field
                                        name="DateOfJoining"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="DateOfJoining">Date of joining</label>
                                                <span className="p-float-label">
                                                    <Calendar dateFormat='mm/dd/yy' showIcon={true} id="DateOfJoining" {...input} placeholder="Select Date of joining" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />

                                    </div>

                                </div>

                                <Panel header={"Cost To Company"}>
                                    <div className="p-fluid  grid">
                                        <div className="field col-12 md:col-3">
                                            <Field name="FinalCTC">
                                                {({ input, meta }) => (
                                                    <div>
                                                        <label>Final CTC </label>
                                                        <br></br>
                                                        <br></br>
                                                        {/* <input className='p-inputtext p-component' {...input} type="number" min={0} value={parseInt(values["FinalCTC"])} placeholder="Final CTC" /> */}
                                                        <InputNumber id="FinalCTC" value={values.FinalCTC} showButtons min={0} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <br></br>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            </Field>

                                        </div>
                                        {jobpostdata.businessunit_name == "Workforce Solutions" && <div className="field col-12 md:col-3">
                                            <Field name="ShiftAllowance">
                                                {({ input, meta }) => (
                                                    <div>
                                                        <label>Shift Allowance</label>
                                                        <br></br>
                                                        <br></br>
                                                        {/* <input className='p-inputtext p-component' {...input} type="number" min={0} value={parseInt(values["ShiftAllowance"])} placeholder="Enter Shift Allowance" /> */}
                                                        <InputNumber id="ShiftAllowance" value={values.ShiftAllowance} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <br></br>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>}

                                    </div>
                                    <div className="p-fluid  grid">
                                        <div className="field col-12 md:col-4">
                                            <label>Is candidate has variable pay? If 'Yes' enter variable pay and period of payment</label>
                                        </div>
                                        <div className="field col-12 md:col-2">
                                            <div className="field-radiobutton">
                                                <Field
                                                    name="IsVariable"
                                                    render={({ input, meta }) => (
                                                        <>
                                                            <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={true} checked={values.IsVariable == true} />

                                                        </>
                                                    )} />
                                                <label className="radio-inline me-3">Yes
                                                </label>

                                                <Field
                                                    name="IsVariable"
                                                    render={({ input, meta }) => (
                                                        <>
                                                            <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={false} checked={values.IsVariable == false} />

                                                        </>
                                                    )} />
                                                <label className="radio-inline me-3">No
                                                </label>
                                            </div>
                                            <br />
                                            <div className='col-12' style={{ marginTop: "-30px" }}>
                                                <Field
                                                    name="IsVariable"
                                                    render={({ input, meta }) => (
                                                        <>

                                                            {getFormErrorMessage(meta)}
                                                        </>
                                                    )} />
                                            </div>

                                        </div>

                                        <div hidden={values["IsVariable"] == true ? false : true} className="field col-12 md:col-3">
                                            <div className="p-fluid  grid">
                                                <div className="field col-12 md:col-6">
                                                    <label >Variable Pay (%) :
                                                    </label>
                                                </div>
                                                <div className="field col-12 md:col-6">
                                                    <Field name="VariablePerc">
                                                        {({ input, meta }) => (
                                                            <div>
                                                                {/* <input className='p-inputtext p-component' {...input} value={parseInt(values["VariablePerc"])} type="number" min={0} placeholder="variable pay percentage" /> */}
                                                                <InputNumber id="VariablePerc" value={values.VariablePerc} showButtons min={0} max ={100} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                                {getFormErrorMessage(meta)}
                                                            </div>
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div hidden={values["IsVariable"] == true ? false : true} className="field col-12 md:col-3">
                                            <div className="field-radiobutton">
                                                <Field
                                                    name="MQVariable"
                                                    render={({ input, meta }) => (
                                                        <RadioButton  {...input} className='ml-2' inputId="MQVariable" name="MQVariable" value="monthly" checked={values.MQVariable == "monthly"} />
                                                    )} />
                                                <label className="radio-inline me-3">Monthly
                                                </label>

                                                <Field
                                                    name="MQVariable"
                                                    render={({ input, meta }) => (
                                                        <RadioButton  {...input} className='ml-2' inputId="MQVariable" name="MQVariable" value="quaterly" checked={values.MQVariable == "quaterly"} />
                                                    )} />
                                                <label className="radio-inline me-3">Quaterly
                                                </label>

                                            </div>
                                            <br />
                                            <div className='col-12' style={{ marginTop: "-30px" }}>
                                                <Field
                                                    name="MQVariable"
                                                    render={({ input, meta }) => (
                                                        <>

                                                            {getFormErrorMessage(meta)}
                                                        </>
                                                    )} />
                                            </div>
                                        </div>

                                    </div>

                                </Panel>


                                <br />



                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Is_Eligible_annu_Mgnt_Bonus"
                                            type="checkbox"
                                            render={({ input, meta }) => (
                                                <div className="field-checkbox">
                                                    <Checkbox inputId={input.name} {...input} />
                                                    <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                        {"Eligible for Annual Mgnt Bonus"}
                                                    </label>
                                                </div>)} />
                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Is_Eligible_Joining_Bonus"
                                            type="checkbox"
                                            render={({ input, meta }) => (
                                                <div className="field-checkbox">
                                                    <Checkbox inputId={input.name} {...input} onClick={e => e.value == false ? values["JoiningBonus"] = 0 : console.log()} />
                                                    <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                        {"Eligible for Joining Bonus"}
                                                    </label>
                                                </div>)} />
                                        {values["Is_Eligible_Joining_Bonus"] && <div className="field col-12 md:col-4" style={{width:"80%"}}> <Field
                                            name="JoiningBonus"
                                            type="input"
                                            render={({ input, meta }) => (
                                                <div className="field-checkbox" style={{display:"block"}}>
                                                    {/* <input className='p-inputtext p-component' {...input} value={parseInt(values["JoiningBonus"])} type="number" min={0} placeholder="Enter Joining Bonus" /> */}
                                                    <InputNumber id="JoiningBonus" value={values.JoiningBonus} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <span>

                                                    {getFormErrorMessage(meta)}
                                                </span>
                                                </div>)} /></div>}
                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="IS_Eligible_Monthly_Incentive"
                                            type="checkbox"
                                            render={({ input, meta }) => (
                                                <div className="field-checkbox">
                                                    <Checkbox inputId={input.name} {...input} />
                                                    <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                        {"Eligible for Monthly Incentive"}
                                                    </label>
                                                </div>)} />
                                    </div>
                                </div>
                                <div className=" grid">
                                    {/* <div className="field col-12 md:col-6">Annexure
                                    <Annexure annexure={annexuredata}></Annexure>

                                </div> */}
                                    <div className="field col-12 md:col-6"></div>
                                    <div className="field col-12 md:col-6 flex" style={{justifyContent: "flex-end"}}>
                                        {/* <div style={{ height: "50px", width: "50px", backgroundColor: "red" }} onMouseLeave={() => callpreviewannexure1(values)}>calc</div> */}
                                        <Button className='mr-3' type="button" disabled={shoulddisanleanexurebutton(values)} onClick={e => {
                                            callpreviewannexure1(values);

                                        }}>Preview Annexure

                                        </Button>
                                        <Button className='mr-3' type="submit" onClick={e => handleSubmit}>Save & Generate Documents

                                        </Button>
                                        {/* <Button className='mr-3' type="button">Download/Preview Offer Letter
                                    </Button> */}
                                        <Button type="button" onClick={e => navigate(-1)}>Cancel
                                        </Button>
                                    </div>
                                </div>


                            </form>
                        )}


                    />

                    }
                    {
                        Object.is(candidatedata.EmploymentType, "Internship") && <Panel header="Internship Details">

                            <Form

                                onSubmit={async (values: any) => {
                                    console.log(values)


                                    var tempstartdate = values["DateOfJoining"]
                                    values["Duration"] = parseInt(values["Duration"])
                                    values["FinalCTC"] = parseInt(values["FinalCTC"])
                                    values.StartDate = tempstartdate.getFullYear() + "-" + (tempstartdate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempstartdate.getDate().toString().padStart(2, '0')

                                    console.log(values)
                                    // dispatch(updateselinterncandidateaction(values))

                                    try {
                                        setShowspinner(true)
                                        selectedcandidateactions.updateselinterncandidate(values)
                                            .then((res: string) => {
                                                console.log(res);
                                                setShowspinner(false)
                                                toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
                                            }).then((res) => {
                                                // var message = res?.toString()
                                                console.log(res)

                                            }
                                            ).then(() => setTimeout(() => { navigate(-1); }, 2000))
                                            .catch((ex) => {
                                                console.log(ex);
                                                setShowspinner(false)
                                                setdata(values); setmode('draft');
                                                toast.current.show({ severity: 'error', summary: 'Error Message', detail: "error", life: 3000 });
                                            })

                                        // console.log(res)

                                        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})

                                    }
                                    catch (err) {
                                        console.log(err)

                                        setShowspinner(false)

                                    }






                                }
                                }
                                initialValues={mode == "true" ? {


                                    "selectedcandidateid": data.Selected_Candidate_ID,

                                    "DateOfJoining": new Date(data.DateOfJoining),
                                    "designation": data.designation,
                                    "FinalCTC": data.FinalCTC,
                                    "Duration": data.Duration,
                                    "Modified_By": logindata.username

                                } : {
                                    "selectedcandidateid": data.Selected_Candidate_ID,

                                    // "StartDate": "2023-1-26",
                                    // "designation": 1,
                                    // "FinalCTC": 575000,
                                    // "Duration" : 1,
                                    "Modified_By": logindata.username
                                }

                                }

                                validate={Internformvalidate}
                                keepDirtyOnReinitialize={true}
                                render={({ handleSubmit, values, submitting,
                                    submitError,
                                    invalid,
                                    pristine,
                                    initialValues = {},
                                    dirtySinceLastSubmit, }) => (

                                    <form onSubmit={handleSubmit} >

                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-3">
                                                <Field
                                                    name="designation"
                                                    render={({ input, meta }) => (
                                                        <div className="field">
                                                            <label htmlFor="designation">Designation</label>
                                                            <span className="p-float-label">
                                                                <Dropdown id="designation"  {...input} options={props.getactivedesignationoptionsprop} filter optionLabel="label" placeholder="Select Designation"

                                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />

                                            </div>

                                            <div className="field col-12 md:col-3">
                                                <Field name="FinalCTC">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <label>Stipend (Per Month) </label>

                                                            <input className='p-inputtext p-component mt-2' {...input} type="number" min={0} value={parseInt(values["FinalCTC"])} placeholder="Stipend" />
                                                            <br></br>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>









                                            <div className="field col-12 md:col-3"><Field
                                                name="DateOfJoining"
                                                render={({ input, meta }) => (
                                                    <div className="field">
                                                        <label htmlFor="DateOfJoining">Start Date</label>
                                                        <span className="p-float-label">
                                                            <Calendar dateFormat='mm/dd/yy' {...input} showIcon={true} id="DateOfJoining" {...input} placeholder="Start Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            />
                                            </div>



                                            <div className="field col-12 md:col-3">
                                                <Field name="Duration">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <label>Duration (In Months)</label>


                                                            <input className='p-inputtext p-component mt-2' {...input} type="number" min={0} value={parseInt(values["Duration"])} placeholder="Duration" />
                                                            <br></br>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="grid">
                                            <div className="field col-12 md:col-4"></div>
                                            <div className="field col-12 md:col-4"></div>
                                            <div className="field col-12 md:col-4 flex" style={{justifyContent: "flex-end"}}>

                                                <Button className='mr-2' type="submit">
                                                    Save and Generate Internship Letter
                                                </Button>
                                                <Button type="button" onClick={e => navigate(-1)}>
                                                    Cancel
                                                </Button>

                                            </div>
                                        </div>


                                    </form>





                                )}

                            />


                        </Panel>
                    }
                    {
                        Object.is(candidatedata.EmploymentType, "Contract(direct)") &&
                        <Panel header="Contractor Details">


                            <Form

                                onSubmit={async (values: any) => {

                                    var tempstartdate = values["DateOfJoining"]
                                    var tempenddate = values["endDate"]
                                    values["Duration"] = parseInt(values["Duration"])
                                    values["FinalCTC"] = parseInt(values["FinalCTC"])
                                    values["StartDate"] = tempstartdate.getFullYear() + "-" + (tempstartdate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempstartdate.getDate().toString().padStart(2, '0')
                                    values["EndDate"] = tempenddate.getFullYear() + "-" + (tempenddate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempenddate.getDate().toString().padStart(2, '0')

                                    console.log(values)

                                    // dispatch(updateselcontractcandidateaction(values))

                                    try {
                                        setShowspinner(true)
                                        selectedcandidateactions.updateselcontractcandidate(values)
                                            .then((res) => {
                                                console.log(res);
                                                setShowspinner(false)
                                                toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
                                            }).then((res) => { }
                                            ).then(() => setTimeout(() => { navigate(-1); }, 2000))
                                            .catch((ex) => {
                                                console.log(ex);
                                                setShowspinner(false)
                                                setdata(values); setmode('draft');
                                                toast.current.show({ severity: 'error', summary: 'Error Message', detail: "error", life: 3000 });
                                            })

                                        // console.log(res)

                                        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})

                                    }
                                    catch (err) {
                                        console.log(err)

                                        setShowspinner(false)

                                    }



                                }
                                }
                                initialValues={mode == "true" ? {


                                    "selectedcandidateid": data.Selected_Candidate_ID,

                                    "DateOfJoining": data.DateOfJoining ? new Date(data.DateOfJoining) : null,
                                    "endDate": data.EndDate ? new Date(data.EndDate) : null,
                                    "designation": data.designation,
                                    "FinalCTC": data.FinalCTC,
                                    "NoOfHours": data.NoOfHours,
                                    "Duration": data.Duration,
                                    "Modified_By": logindata.username,
                                    "Responsibilities": data.Responsibilities
                                } : {
                                    "selectedcandidateid": data.Selected_Candidate_ID,
                                    "Modified_By": logindata.username,

                                }

                                }

                                validate={contractformvalidate}
                                keepDirtyOnReinitialize={true}
                                render={({ handleSubmit, values, submitting,
                                    submitError,
                                    invalid,
                                    pristine,
                                    initialValues = {},
                                    dirtySinceLastSubmit, }) => (

                                    <form onSubmit={handleSubmit} >

                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-4">
                                                <Field
                                                    name="designation"
                                                    render={({ input, meta }) => (
                                                        <div className="field">
                                                            <label htmlFor="designation">Designation</label>
                                                            <span className="p-float-label">
                                                                <Dropdown id="designation"  {...input} filter options={props.getactivedesignationoptionsprop} optionLabel="label" placeholder="Select Designation"

                                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />

                                            </div>

                                            <div className="field col-12 md:col-4">
                                                <Field name="FinalCTC">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <label>Remuneration (Per Month) </label>

                                                            <input className='p-inputtext p-component mt-2' {...input} type="number" min={0} value={parseInt(values["FinalCTC"])} placeholder="Enter Remuneration" />
                                                            <br></br>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>



                                            <div className="field col-12 md:col-4">
                                                <Field name="NoOfHours">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <label>No Of Hours (Per Month) </label>

                                                            <input className='p-inputtext p-component mt-2' {...input} type="number" min={0} value={parseInt(values["NoOfHours"])} placeholder="Enter No Of Hours" />
                                                            <br></br>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>




                                        </div>

                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-4"><Field
                                                name="DateOfJoining"
                                                render={({ input, meta }) => (
                                                    <div className="field">
                                                        <label htmlFor="DateOfJoining"> Start Date </label>
                                                        <span className="p-float-label">
                                                            <Calendar dateFormat='mm/dd/yy' showIcon={true} id="DateOfJoining" {...input} placeholder="Start Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            />

                                            </div>
                                            <div className="field col-12 md:col-4"><Field
                                                name="endDate"
                                                render={({ input, meta }) => (
                                                    <div className="field">
                                                        <label htmlFor="endDate">End Date</label>
                                                        <span className="p-float-label">
                                                            <Calendar dateFormat='mm/dd/yy' showIcon={true} id="endDate" {...input} placeholder="End Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            />

                                            </div>
                                            <div className="field col-12 md:col-4">
                                                <Field name="Duration">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <label>Duration(In Months) </label>

                                                            <input className='p-inputtext p-component mt-2' {...input} type="number" min={0} value={parseInt(values["Duration"])} placeholder="Duration" />
                                                            <br></br>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-12"><Field
                                                name="Responsibilities"
                                                render={({ input, meta }) => (
                                                    <div className="field">
                                                        <label htmlFor="DateOfJoining"> Responsibilities </label>
                                                        <span className="p-float-label">
                                                            {/* <Calendar dateFormat='mm/dd/yy' showIcon={true} id="DateOfJoining" {...input} placeholder="Start Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                            <InputTextarea  {...input} className='flex' cols={100} rows={8} >

                                                            </InputTextarea>
                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )}
                                            />
                                            </div>
                                        </div>

                                        <div className="grid">
                                            <div className="field col-12 md:col-4"></div>
                                            <div className="field col-12 md:col-4"></div>
                                            <div className="field col-12 md:col-4 flex" style={{justifyContent: "flex-end"}}>

                                                <Button className='mr-2' type="submit">
                                                    Save and Generate Contract Letter
                                                </Button>
                                                <Button type="button" onClick={e => navigate(-1)}>Cancel
                                                </Button>

                                            </div>
                                        </div>


                                    </form>





                                )}

                            />






                        </Panel>
                    }




</Panel>
                </Card>
            </LoadingOverlay>
        </>
    )
}


const mapStateToProps = (state) => {


    return {
        getactivedesignationoptionsprop: getactivedesignationoptions(state),
        getasubbandactiveoptionsprop: getasubbandactiveoptions(state),
        getactivebandoptionsprop: getactivebandoptions(state)
    }
}
export default connect(mapStateToProps)(SelectedCandidateDetails)
