import { connect, useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { getactivebusinessunitoptions } from '../../features/BusinessUnit/businessunitselector';
import { getactivecompanyoptions } from '../../features/Company/CompanySelector';
import { getactivecustomeroptions } from '../../features/Customer/customerselector';
import { getactiveexperienceleveloptions } from '../../features/ExperienceLevel/experiencelevelselector';
import { getactiveIndustryoptions } from '../../features/Industry/industryselector';
import { getactiveLocationoptions } from '../../features/Location/LocationSelector';
import { getactiveservicelineoptions } from '../../features/ServiceLine/ServiceLineSelectors';
import { getcompaniesaction, ICompanyoptions } from "../../features/Company/companyslice";
import { getservicelineaction } from "../../features/ServiceLine/ServiceLineSlice";
import { getcustomersaction } from "../../features/Customer/customerslice";
import { getbusinessunitsaction } from "../../features/BusinessUnit/businessunitslice";
import { getIndustriesaction } from "../../features/Industry/Industryslice";
import { getLocationaction } from "../../features/Location/Locationslice";
import { getexperiencelevelsaction } from "../../features/ExperienceLevel/experiencelevelslice";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { RootState } from "../../app/store";
import { Card } from 'primereact/card';
import { usersbyroles } from "../../features/JobPostActions/usersbyrolesslice";
import { getBusinessHeads,  getRecruiters } from "../../features/JobPostActions/usersbyrolesselector";
import { Button } from "primereact/button";
import { createnewjobpost, updatejobpost } from "../../features/JobPostActions/jobpostactionsslice";
import { useLocation, useNavigate } from "react-router-dom";
import { employementaction } from "../../features/Dropdownoptions/employementtypeslice";
import { qualificationaction } from "../../features/Dropdownoptions/qualificationtypeslice";
import { getemplyementtypes } from "../../features/Dropdownoptions/Employementtypeselector";
import { getallqualification } from "../../features/Dropdownoptions/qualificationselector";
import LoadingOverlay from "react-loading-overlay";
import { Toast } from "primereact/toast";
import { jobpostactions } from "../../api/agent";


function CreateJobPost(props) {
    const selectcompany = useSelector((state: RootState) => state.company);
    const logindata = useSelector((state: RootState) => state.Login);
    const dispatch = useDispatch();
    const location = useLocation();
    const [editmode, setEditmode] = useState(!!location.state)
    const [datafromprops, setdatafromprops] = useState<any>();
    const navigate = useNavigate()
    const [showspinner, setShowspinner] = useState(false)
    const toast = useRef(null);

    useEffect(() => {
        console.log(location)
        if (location.pathname == "/myjobposts/updatejobpost" && !editmode) {
            navigate("/dashboard")
        }
        console.log(editmode)
        console.log(location.state)
        if (editmode) {
            setdatafromprops(location.state.data)
        }
        //dispatch(getcompaniesaction());
        dispatch(getcompaniesaction());
        dispatch(getbusinessunitsaction());
        dispatch(getservicelineaction());
        dispatch(getLocationaction());
        dispatch(getcustomersaction())
        dispatch(getIndustriesaction())
        dispatch(getexperiencelevelsaction())
        dispatch(usersbyroles())
        dispatch(employementaction())
        dispatch(qualificationaction())

        // console.log(data11.data);
        //setcompany(data11;
        //fetch('./jobpostdata.json').then(res => {res.json(); console.log(res);}).then(d => setcompany(d.data));
    }, []);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const validate = (values) => {
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        var arr = ["Company", "BusinessUnit", "ServiceLine", "Industry", "Customer",
            "Location", "EmploymentType", "JobTitle", "JobDesc",
            "Qualification", "NoOfPositions", 'MaximumCTC',
            "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        //   console.log(values["Duration"])
        if (values["MinimumExperiance"] == undefined || values["MinimumExperiance"] == null) {

            errors["MinimumExperiance"] = "*This field is required"
        }
        if (values["MaximumExperiance"] == undefined || values["MaximumExperiance"] == null) {

            errors["MaximumExperiance"] = "*This field is required"
        }
        if (!values["Duration"] && values.EmploymentType != "Full-Time") {
            // console.log(values["Duration"])

            errors["Duration"] = "*This field is required"
        }
        // console.log(errors)
        return errors;
    };
    const filterbusinessunit = (i: any, s: any) => {
        // console.log(i)
        // console.log(s)
        var temp: any = []
        i.forEach((e) => {
            // console.log(e)
            if (e.companyid == s) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    value: e.value

                })
            }
        })
        //    console.log(temp)
        return temp
    }
    const filterserviceline = (i: any, c: any, b: any) => {
        // console.log(i)
        // console.log(c)
        // console.log(b)

        var temp: any = []
        i.forEach((e) => {
            // console.log(e)
            if (e.companyid == c && e.businessunitid == b) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    value: e.key

                })
            }
        })
        // console.log(temp)
        return temp
    }


    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);





    return (
        <>

            <div  >
            <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
                <Card title={editmode ? "Edit Job Post" : "Create Job Post    "}>

                    <Form
                        onSubmit={(values: any) => {
                            console.log(values)
                            console.log(values.OnBoardingDate)
                            var datetemp = new Date(values.OnBoardingDate)
                            console.log(datetemp.getMonth())
                            console.log(datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate())
                            values["strOnboardingDate"] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                            // alert("sub mit form")

                            try {

                            if (editmode) {
                                setShowspinner(true)
                                jobpostactions.updatejobpost(values)
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
                                // dispatch(updatejobpost(values))
                                // navigate(-1)
                            }
                            else {
                                setShowspinner(true)
                                jobpostactions.createjobpost(values)
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
                                // dispatch(createnewjobpost(values))
                                // navigate(-1)
                            }
                            }catch (err) {
                                console.log(err)

                                setShowspinner(false)

                            }
                        }}
                        initialValues={editmode ? {
                            "JobPostId": datafromprops?.JobPostId,
                            "UserName": datafromprops?.UserName,
                            //   "FirstName": datafromprops?.FirstName,
                            //   "LastName": datafromprops?.LastName,
                            //   "Email": datafromprops?.Email,
                            "EmploymentType": datafromprops?.EmploymentType,
                            "Duration": datafromprops?.Duration,
                            "JobTitle": datafromprops?.JobTitle,
                            "JobDesc": datafromprops?.JobDesc,
                            "NoOfPositions": datafromprops?.NoOfPositions,
                            "MinimumExperiance": datafromprops?.MinimumExperiance,
                            "MaximumExperiance": datafromprops?.MaximumExperiance,
                            "MaximumCTC": datafromprops?.MaximumCTC,


                            "Qualification": datafromprops?.Qualification,
                            "OnBoardingDate": new Date(datafromprops?.OnBoardingDate),
                            "POReference": datafromprops?.POReference,
                            "CreatedBy": datafromprops?.CreatedBy,
                            //   "ModifiedBy" :datafromprops?.ModifiedBy,
                            "Stage_id": datafromprops?.Stage_id,
                            "Industry": datafromprops?.Industry,
                            "Company": datafromprops?.Company,
                            "BusinessUnit": datafromprops?.BusinessUnit,
                            "ServiceLine": datafromprops?.ServiceLine,
                            "Customer": datafromprops?.Customer,
                            "Location": datafromprops?.Location,
                            "ExperianceLevel": datafromprops?.ExperianceLevel,
                            "BH_User_Name": datafromprops?.approversDetails.filter((i) => i.role_name == "Business Head")[0].approverName,
                            "HR_User_Name": datafromprops?.approversDetails.filter((i) => i.role_name == "Recruiter")[0].approverName,
                            "ModifiedBy": logindata.username
                        } : { UserName: logindata.username, Duration: null, ModifiedBy: null, POReference: null }}
                        // initialValues={{
                        //     "UserName": "sbatchu",
                        //       "FirstName": "Siva",
                        //       "LastName": "Batchu",
                        //       "Email": "sbatchu@belcan.com",
                        //       "EmploymentType": "Full Time",
                        //       "Duration" : null,
                        //       "JobTitle": "Test",
                        //       "JobDesc": "TestDesc",
                        //       "NoOfPositions": 2,
                        //       "Qualification": "BE",
                        //       "OnBoardingDate": "2022-12-16",
                        //       "POReference": "100000022",
                        //       "CreatedBy": "sbatchu",
                        //       "ModifiedBy" : "sbatchu",
                        //       "Stage_id" : 1,
                        //       "Industry_id" :7,
                        //       "Company_id" :1012,
                        //     //   "BusinessUnit_id" : 12,
                        //     //   "Serviceline_id" : 19,
                        //       "Customer_id" : 1,
                        //       "Location_id" : 1,
                        //       "ExperianceLevel_id" : 11,
                        //       "BH_User_Name" : "sbatchu",
                        //       "HR_User_Name" : "sbatchu"
                        //   }}
                        validate={validate}
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
                                            name="Company"
                                            render={({ input, meta }) => (
                                                <div>
                                                    <div className="field">
                                                        <label htmlFor="Company">Company Name</label>
                                                        <span className="p-float-label">
                                                            <Dropdown id="Company" {...input}  autoFocus options={props.getactivecompanyoptionsprop} placeholder="Select Company" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>

                                                        </span>
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                </div>

                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="BusinessUnit"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Business unit">Business unit</label>
                                                    <span className="column">
                                                        <Dropdown id="Business unit" {...input}   options={filterbusinessunit(props.getactivebusinessunitoptionsprop, values.Company)}  filterBy="label" placeholder="Select Business unit" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="ServiceLine"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="service Line">Service Line</label>
                                                    <span className="column">
                                                        <Dropdown id="service Line" {...input} options={filterserviceline(props.getactiveservicelineoptionsprop, values.Company, values.BusinessUnit)} optionLabel="label" placeholder="Select Service Line" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Industry"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Industry">Industry</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Industry" {...input} options={props.getactiveIndustryoptionsprop} optionLabel="label" placeholder=" select Industry" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>



                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Customer"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="customer">Customer</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="customer" {...input} filter options={props.getactivecustomeroptionsprop} optionLabel="label" placeholder="Select Customer" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>


                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Location"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Location">Location</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Location" {...input} options={props.getactiveLocationoptionsprop} optionLabel="label" placeholder="Select Location" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="EmploymentType"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Employement Type">Employement Type</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Employement Type" {...input} options={props.getemplyementtypesprop} optionLabel="label" placeholder="Select Employement Type" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

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
                                                <div className="field">
                                                    <label htmlFor="Duration">Duration( in Months)</label>
                                                    <span className="p-float-label">
                                                        {/* <InputNumber id="Duration" value={values.OverallExpYear} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={60} /> */}

                                                        <InputNumber id="Duration" value={values.Duration} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Duration" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>


                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="JobTitle"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Job Title">Job Title</label>
                                                    <span className="p-float-label">
                                                        <InputText id="Job Title" maxLength={100} {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="p-fluid formgrid grid">






                                    <div className="field col-12 ">
                                        <Field
                                            name="JobDesc"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="JobDescription">Job Description</label>
                                                    <span className="p-float-label">
                                                        <InputTextarea rows={10} maxLength={1000} id="JobDescription" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid">
                                    {/* <div className="field col-12 md:col-4">
                                        <Field
                                            name="ExperianceLevel"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Experience Level">Experience Level</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Experience Level" {...input} options={props.getactiveexperienceleveloptionsprop} optionLabel="label" placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div> */}
                                    <div className="field col-12 md:col-4">

                                        <Field
                                            name="Qualification"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Highest Qualification">Minimum Education  Qualification</label>
                                                    <span className="field fluid">
                                                        <Dropdown id="Highest Qualification" {...input} options={props.getallqualificationprop} optionLabel="label" placeholder="Select Min Education Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>


                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="NoOfPositions"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="No of openings">No Of Openings</label>
                                                    <span className="p-float-label">
                                                        {/* <InputNumber id="No of openings" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        {/* <InputNumber inputId="integeronly" value={value1} onValueChange={(e) => setValue1(e.value)} /> */}
                                                        <InputNumber id="noofopenings" value={values.NoOfPositions} showButtons min={1} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                        <label htmlFor="No of openings" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="MinimumExperiance"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="MinimumExperiance">Minimum Experience(in Years)</label>
                                                    <span className="p-float-label">
                                                        <InputNumber id="MinimumExperiance" value={values.MinimumExperiance} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                        <label htmlFor="MinimumExperiance" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-4">

                                        <Field
                                            name="MaximumExperiance"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="MaximumExperiance">Maximum Experience(in Years)</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="MaximumExperiance" value={values.MaximumExperiance} showButtons min={0} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                        <label htmlFor="MaximumExperiance" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>


                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="MaximumCTC"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="MaximumCTC">Maximum CTC</label>
                                                    <span className="p-float-label">
                                                        {/* <InputNumber id="No of openings" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        {/* <InputNumber inputId="integeronly" value={value1} onValueChange={(e) => setValue1(e.value)} /> */}
                                                        <InputNumber id="MaximumCTC" min={0} value={values.MaximumCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                        <label htmlFor="MaximumCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="OnBoardingDate"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="date">Expected Onboarding Date</label>
                                                    <span className="field fluid">
                                                        <Calendar id="date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select On-Boarding Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="POReference"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Po Reference">PO/Opportunity Reference</label>
                                                    <span className="field fluid">
                                                        <InputText id="Po Reference" {...input} maxLength={20} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Po Reference" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>


                                    <div className="field col-12 md:col-4">

                                        <Field
                                            name="HR_User_Name"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Talent">Recruiter Name</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Talent" {...input} options={props.getRecruitersprop} optionLabel="label" placeholder="Select Recruiter Name" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>


                                </div>

                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="BH_User_Name"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Business Head">Business Unit Head</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Business Head" {...input} options={props.getBusinessHeadsprop} optionLabel="label" placeholder="Select  Business Unit Head" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-4">

                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <div className="grid">
                                            <div className="col-6"> <Button label="Submit" type="submit" onClick={e => values} style={{ marginTop: "30px" }} /></div>
                                            <div className="col-6"> <Button label="Cancel" type="button" onClick={e => navigate(-1)} style={{ marginTop: "30px" }} /></div>
                                        </div>
                                        {/* <Button label="Submit" type="submit" onClick={e=>values} className="mt-2 ml-2" />
                               <Button label="cancel"  type="button" onClick={e=>navigate(-1)} className="mt-2 ml-2" /> */}
                                    </div>
                                </div>
                                {/* <Button type="submit">save</Button> */}
                                {/* <Button label="Back" onClick={e=>navigate(-1)} className="mt-2" /> */}
                                <span> </span>

                            </form>
                        )
                        }
                    />

                </Card> </LoadingOverlay> </div>

        </>
    )
}

function mapStateToProps(state) {
    return {
        getactivecompanyoptionsprop: getactivecompanyoptions(state),
        getactivebusinessunitoptionsprop: getactivebusinessunitoptions(state),
        getactiveLocationoptionsprop: getactiveLocationoptions(state),
        getactiveservicelineoptionsprop: getactiveservicelineoptions(state),
        getactivecustomeroptionsprop: getactivecustomeroptions(state),
        getactiveIndustryoptionsprop: getactiveIndustryoptions(state),
        getactiveexperienceleveloptionsprop: getactiveexperienceleveloptions(state),
        getRecruitersprop: getRecruiters(state),
        getBusinessHeadsprop: getBusinessHeads(state),
        getemplyementtypesprop:getemplyementtypes(state),
        getallqualificationprop:getallqualification(state)
    };
}

export default connect(mapStateToProps)(CreateJobPost)

