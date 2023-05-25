import { Button } from 'primereact/button'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { createedducationaldetailsaction, deleteedducationaldetailsaction, educationaldetailsgetaction, updateedducationaldetailsaction } from '../../../features/Candidate info/educationdetailsslice'
import { Card } from 'primereact/card'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction, verifydocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { SelectButton } from 'primereact/selectbutton';
import { PrimeIcons } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { getallqualification } from '../../../features/Dropdownoptions/qualificationselector'
import { qualificationaction } from '../../../features/Dropdownoptions/qualificationtypeslice'
import { InputTextarea } from 'primereact/inputtextarea'
import { getuserroles } from '../../../features/Login/LoginSelector'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Message } from 'primereact/message'
import { InputNumber } from 'primereact/inputnumber'

function Education(props) {
    const dispatch = useDispatch()
    const [modalDialog, setModaldialog] = useState(false);
    const [rejectdialog, setRejectdialog] = useState(false);
    const [gridview, setgridview] = useState("grid")
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [reviewcomment, setReviewComment] = useState("")

    const [curid, setCurid] = useState(0)
    const [editmode, setEditmode] = useState(false);
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const [tempdata, settempdata] = useState<any>({})
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const educationdetailsdata = useSelector((state: RootState) => state.Educationaldetails)
    const Logindata = useSelector((state: RootState) => state.Login);
    // const [roles, setRoles] = useState<any>([]);
    const roles = props.getuserrolesprop
    useEffect(() => {
        // var w: any = []
        // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        // Logindata.groups.forEach((i) => setRoles(roles => [...roles, i["name"].toString()]))
        dispatch(qualificationaction())
        dispatch(educationaldetailsgetaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))

        console.log(educationdetailsdata)
        console.log(props.getallqualificationprop)
    }, [])

    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (values) => {
        const arr = ["Qualification", "Specialization", "Start_Date", "End_Date", "Institute", "Percentage"]
        let errors = {};
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })

        console.log(errors)
        return errors
    }
    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >

                {/* <Toolbar
        //  className="mb-4"
         left={leftToolbarTemplate}
         right={rightToolbarTemplate}
       >
         {" "}
       </Toolbar> */}

                <span style={{ width: "30%" }}></span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>


            </div>
        );
    };
    const formatDate = (value: any) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        // return value.toLocaleDateString('en-US');
    }
    const gridviewoptions = ['grid', 'table'];
    const template = (options: PanelHeaderTemplateOptions) => {

        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                <span className="flex">
                    <h5 className="pt-2">

                    Education Details
                    </h5>
                    <Message  className="ml-3"severity="info" text="Please add your education details and corresponding supporting documents" />
                </span>

                </span>
                {/* <span className={titleClassName}>
                    <h6 style={}>
                        Please add education details and corresponding supporting documents
                    </h6>
                </span> */}
                {/* {roles.includes("HR") && <SelectButton value={gridview} options={gridviewoptions} onChange={(e) => setgridview(e.value)} />} */}
                <Button className='' style={{}} onClick={e => { setEditmode(false); setModaldialog(true) }}>Add </Button>            </div>
        )
    }
    const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success' };

    const emptytemplate = () => {
        return (
            <>abcd</>
        )


    }
    const percentageformat = (rowdata) => {
        return (
            <>{rowdata.Percentage > 10 ? rowdata.Percentage.toString() + "% " : rowdata.Percentage.toString() + "CGPA"}
            </>
        )
    }
    const formatstartDate = (rowdata: any) => {
        return new Date(rowdata.Start_Date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    const formatendDate = (rowdata: any) => {
        return new Date(rowdata.End_Date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    const actionBodyTemplate = (rowdata) => {
        return (
            <div className=" flex gap-2">
                <Button className="p-button-info editbutton mr-2" style={{ height: "40px", width: "4.4rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(rowdata); setModaldialog(true); }}></Button>


                <FileUpload emptyTemplate={emptytemplate} style={{}} chooseOptions={chooseOptions} className='p-success mr-2' mode="basic" name="demo[]" chooseLabel='abc'  auto onSelect={k => {



                    if (k.files.length > 0) {



                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", rowdata.id.toString())
                        data.append("detailtype", "Education")
                        data.append("file", k.files[0])
                        dispatch(uploaddocumentaction(data))





                    }
                    else {
                        console.log("no files uploaded yet")
                    }



                }} />
                <Button style={{ height: "40px", width: "4.4rem" }} icon="pi pi-trash" tooltip="delete"  className="p-button-danger" onClick={() => dispatch(deleteedducationaldetailsaction({
                    "id": rowdata.id

                }))} />

            </div>


        )
    }
    // const filestemplate = (rowdata) => {
    //     const rowfiles = rowdata.files
    //     const no: number = rowdata.files ? rowdata.files.length : 0
    //     if (no > 0)
    //         return (
    //             <div style={{ overflowY: "scroll", height: "70px" }}>{
    //                 rowdata.files.map((f) => (
    //                     <div className='field row-12 md:row-12 flex' onClick={() => console.log(f.file)} style={{ border: "2px solid blue", padding: "4px", margin: "4px", borderRadius: "10px", backgroundColor: "#C1C2F3", height: "30px" }}>

    //                         {f.file.split("/")[f.file.split("/").length - 1].toString().length < 20 ? f.file.split("/")[f.file.split("/").length - 1] : f.file.split("/")[f.file.split("/").length - 1]}
    //                         <i className="pi pi-download mr-2 ml-2" onClick={() => {
    //                             dispatch(documentdownloadaction({
    //                                 "file": f.file.toString().substring(1, f.file.length)
    //                             }))
    //                         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
    //                         <i className="pi pi-trash mr-2 ml-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
    //                             onClick={() => {

    //                                 confirmDialog({
    //                                     message: 'Are you sure you want to proceed?',
    //                                     header: 'Confirmation',
    //                                     icon: 'pi pi-exclamation-triangle',
    //                                     position: "top",
    //                                     accept: () => alert("success"),
    //                                     reject: () => alert("rej")
    //                                 });
    //                                 // dispatch(deletedocumentaction({
    //                                 //     "fileid": f.id
    //                                 // }))
    //                             }}
    //                         > </i>

    //                     </div>
    //                 ))
    //             }
    //             </div>
    //         )
    // }
    return (
        <div>

            <ConfirmDialog />
            <style>{`
            .card-header{
                text-align:center;
                width:100%;
                align-self:center;
                color: #7659E2  ;
                vertical-align:top;
            }
            .card-header.h3{
                // text-align:center
            }
            .card1content{
                border-radius: 5px;
                background: rgba(255,255,255,0.40);
            }
            .card-body{
                margin-left:5px;
            }
           .qualification{
            width:100%;
            // background: linear-gradient(180deg, #005bea 0%, #00c6fb 100%);

           }

           .card1 {
            background-color: var(--surface-card);
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-radius: 12px;
            box-shadow: 0px 3px 10px #a4dfd2, 0px 0px 10px #a4d7d4, 0px 1px 10px #abefe0 !important
            }
            .card1:hover{
                scale:1.05;
                transition:  1s;

            }

            .card-body.p{
                color:white
            }
            .filesarea{
                border:2px dashed #7b2cbf;
                overflow-y: scroll;
                height: 80px;

                background-color: #eeeeee;
            }
            .nofiles{
                display: flex;
                align-self: center;
                color:"gray"
            }
.fileuplod2{
    font:40px;
}
.p-fluid .p-fileupload .p-button {
    Height: 35px;
    width: 3.5rem;
    font-size:40px;
}

#contained-button-file{
    display: 'flex',
    margin: 'auto',
    width: 400,
    flexWrap: 'wrap',
    background:#ffeeee;
}
.p-card .p-card-content {
    padding:  0rem;
}
            `}</style>
            <Panel headerTemplate={template}>


                <Dialog position='top' visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Information " : "Add  Information "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

                    <Form
                        onSubmit={(values: any) => {

                            var datetempstart = new Date(values.Start_Date)
                            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                            values.Start_Date = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')
                            var datetempend = new Date(values.End_Date)
                            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                            values.End_Date = datetempend.getFullYear() + "-" + (datetempend.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempend.getDate().toString().padStart(2, '0')


                            values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
                            console.log(values)
                            if (!editmode) {
                                dispatch(createedducationaldetailsaction(values))
                                setModaldialog(false)
                            }
                            else {
                                dispatch(updateedducationaldetailsaction(values))
                                setEditmode(false)
                                settempdata(undefined)
                                setModaldialog(false)

                            }
                        }}
                        keepDirtyOnReinitialize={true}
                        initialValues={!editmode ? {} : {
                            id: tempdata.id,
                            Specialization: tempdata.Specialization,
                            Qualification: tempdata.Qualification,
                            Percentage: tempdata.Percentage,
                            Institute: tempdata.Institute,
                            Start_Date: tempdata.Start_Date,
                            End_Date: tempdata.End_Date,
                        }}


                        validate={validate}
                        render={({ handleSubmit, values, submitting,
                            submitError,
                            invalid,
                            pristine,
                            validating,
                            initialValues = {},
                            dirtySinceLastSubmit, }) => (
                            <form onSubmit={handleSubmit} >
                                <br></br>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-6">
                                        <Field
                                            name="Qualification"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Qualification">Degree*</label>
                                                    <span className="column">
                                                        <Dropdown id="Qualification"{...input} options={props.getallqualificationprop} optionLabel="label" placeholder="Select Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <Field
                                            name="Specialization"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Specialization">Specialization*</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="Specialization" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Specialization" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <Field
                                            name="Start_Date"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Start_Date">Date of Joining*</label>
                                                    <span className="field fluid">
                                                        <Calendar id="Start_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" maxDate={new Date(values["End_Date"])} showIcon placeholder="Select Date of Joining" value={new Date(values["Start_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">

                                        <Field
                                            name="End_Date"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="End_Date">Date Of Completion*</label>
                                                    <span className="field fluid">
                                                        <Calendar id="End_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" minDate={new Date(values["Start_Date"])} showIcon placeholder="Select Date Of Completion" value={new Date(values["End_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-11">
                                        <Field
                                            name="Institute"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Specialization">Institute/University*</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={100} id="Institute" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Institute" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <br>
                                        </br>
                                        <Field
                                            name="Percentage"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Percentage">Percentage/CGPA* </label>
                                                    <span className="field fluid">
                                                        <InputNumber id="Percentage" maxFractionDigits={2} value={values.Percentage} showButtons min={1} max={100}  onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        {/* <InputText maxLength={5} id="Percentage" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        <label htmlFor="Percentage" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />


                                    </div>
                                </div>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-6">

                                        <Button type='button' onClick={e => setModaldialog(false)}>Cancel</Button>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <Button type='submit'> Save</Button>
                                    </div>
                                </div>
                            </form>


                        )}
                    />
                </Dialog>
                <br></br>

                <div className='grid' style={gridview == "grid" ? { display: "flex" } : { display: "block" }}>
                    {gridview == "grid" && educationdetailsdata.length == 0 && <div className='flex text-align-center'> No Data</div>}

                    {gridview == "grid" ? educationdetailsdata.map((e) => <div className='lg:col-6 md:col-6 sm:col-2 gap-4' key={e.id.toString()}>
                        <Card className='card1 margin-auto'>

                                <div className="card-header">
                                    <h4 className="qualification">{e.Qualification}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"><b>Specialization</b></div>
                                    <div className="field col-12 md:col-8">: {e.Specialization}</div>
                                    </div>
                                    <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"><b>Duration</b></div>
                                    <div className="field col-12 md:col-8">: {formatDate(new Date(e.Start_Date))} - {formatDate(new Date(e.End_Date))}</div>
                                    </div>
                                    <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"><b>Institution/University</b></div>
                                    <div className="field col-12 md:col-8">: {e.Institute}</div>
                                    </div>
                                    <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"><b>Percentage/CGPA</b></div>
                                    <div className="field col-12 md:col-8">: {parseInt(e.Percentage) > 10 ?( (e.Percentage.replace("%","") + " %") ): e.Percentage.replace("CGPA","") + " CGPA"}</div>
                                    </div>
                                    {/* {/* <p className="date-range"> Duration : {formatDate(new Date(e.Start_Date))} to {formatDate(new Date(e.End_Date))}</p>
                                    <p className="specialization"> Specialization : {e.Specialization}</p>
                                    <p className="institution">Institution/University : {e.Institute}</p>
                                    <span className="percentage"> Percentage/CGPA : {parseInt(e.Percentage) > 10 ?( (e.Percentage.replace("%","") + " %") ): e.Percentage.replace("CGPA","") + " CGPA"}</span><br /><br /> */}

                                </div>

                                <br></br>



                            <Dialog className='' style={{ width: "30%" }} header={<h4>
                                Comments
                            </h4>} visible={rejectdialog} onHide={() => setRejectdialog(false)}>


                                <InputTextarea className='flex' cols={40} rows={5} onChange={e => { setReviewComment(e.target.value) }} maxLength={200} value={reviewcomment}>

                                </InputTextarea>
                                <span style={{color:"red"}}>* max 200 characters</span>

                                <br />
                                <br />
                                <div className="flex justify-content-end">

                                    <Button className='mr-2' onClick={e => setRejectdialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button disabled={reviewcomment?.length < 1} className='btn btn-danger' onClick={e => {

                                        console.log(reviewcomment)
                                        console.log(curid)
                                        dispatch(verifydocumentaction(
                                            {
                                                "fileid": curid,
                                                "verified": "rejected",
                                                "verificationcomments": reviewcomment


                                            }

                                        ))
                                        setRejectdialog(false)

                                    }}>
                                        Submit
                                    </Button>
                                </div>
                            </Dialog>
                            <div className="p-fluid  grid" style={{}}>



                                {e.files.length > 0 ?
                                    e.files.map((f) => (
                                        <div className='field col-12 md:col-12 flex' style={{ border: "0px solid blue", color:"blue",padding: "2px", marginTop: "4px", verticalAlign: "center",  backgroundColor: "#f8f9fa", justifyContent: "space-between" }}>
                                            <div className="fileleftdiv">
                                                {f.file.split("/")[f.file.split("/").length - 1].toString().length < 20 ? f.file.split("/")[f.file.split("/").length - 1] : f.file.split("/")[f.file.split("/").length - 1]}
                                                <br />
                                                {
                                                    (f.verificationcomments == "" || f.verificationcomments == null) ? <></> : <div className="pt-2" style={{color:"red"}}>{
                                                        "Comments : " + f.verificationcomments}</div>
                                                }
                                            </div>
                                            <div className='filerightdiv'>
                                                {
                                                    (roles.includes("HR") || roles.includes("Recruiter")) ?
                                                        <>
                                                            {/* "HR" or "Recruiter" */}
                                                            {Object.is(f.verified, null) ? <>

                                                                {/* something went wrong */}
                                                                <Tooltip target=".tt" />
                                                                <i className="pi pi-spin pi-spinner tt" data-pr-tooltip="Uploading In Progress" style={{ 'fontSize': '1em', width: "18px" }}></i>

                                                            </> : <>


                                                                {Object.is(f.verified, "verified") &&

                                                                    // "hr true"
                                                                    <>

                                                                        {/* <i style={{ cursor: "pointer", backgroundColor: "brown", padding: "4px", borderRadius: "4px", color: "white" }} onClick={() => {

                                                                            setRejectdialog(true)
                                                                            f.verificationcomments != "" ? setReviewComment(f.verificationcomments) : setReviewComment("")
                                                                            setCurid(f.id)

                                                                        }} className="pi pi-times ml-2 rejecttooltip"></i> */}
                                                                        <Tooltip target=".up" />
                                                                        <i className="pi pi-thumbs-up mr-2 ml-2 up" style={{ color: "green" }} data-pr-tooltip="Verified" ></i>
                                                                        <Tooltip target=".rejecttooltip" className='validateoptionstooltip' autoHide={false} style={{ background: "" }}>
                                                                            <div className="flex align-items-center" style={{ background: "" }}>reject</div>
                                                                        </Tooltip>
                                                                    </>}
                                                                {(Object.is(f["verified"], "pending")) &&

                                                                    // "hr false"
                                                                    <>
                                                                        <Tooltip target=".pending" />
                                                                        <i className="pi pi-history mr-2 ml-2 pending" style={{ color: "blue" }} data-pr-tooltip="verification Pending" ></i>
                                                                        <i style={{ cursor: "pointer", backgroundColor: "green", padding: "4px", borderRadius: "4px", color: "white" }} onClick={() =>
                                                                            dispatch(verifydocumentaction(
                                                                                {
                                                                                    "fileid": f.id,
                                                                                    "verified": "verified",
                                                                                    "verificationcomments": ""


                                                                                }
                                                                            ))


                                                                        } className="pi pi-check ml-2 accepttooltip"></i>
                                                                        <i style={{ cursor: "pointer", backgroundColor: "brown", padding: "4px", borderRadius: "4px", color: "white" }} onClick={() => {

                                                                            setRejectdialog(true)
                                                                            f.verificationcomments != "" ? setReviewComment(f.verificationcomments) : setReviewComment("")
                                                                            setCurid(f.id)

                                                                        }} className="pi pi-times ml-2 rejecttooltip"></i>
                                                                        <Tooltip target=".rejecttooltip" className='validateoptionstooltip' autoHide={false} style={{ background: "" }}>
                                                                            <div className="flex align-items-center" style={{ background: "" }}>reject</div>
                                                                        </Tooltip>
                                                                        <Tooltip target=".accepttooltip" className='validateoptionstooltip' autoHide={false} style={{ background: "" }}>
                                                                            <div className="flex align-items-center" style={{ background: "" }}>verify</div>
                                                                        </Tooltip>


                                                                    </>
                                                                }
                                                                {(Object.is(f["verified"], "rejected")) &&

                                                                    // "hr false"
                                                                    <>

                                                                        {/* <i style={{ cursor: "pointer", backgroundColor: "green", padding: "4px", borderRadius: "4px", color: "white" }} onClick={() =>
                                                                            dispatch(verifydocumentaction(
                                                                                {
                                                                                    "fileid": f.id,
                                                                                    "verified": "verified",
                                                                                    "verificationcomments": ""


                                                                                }
                                                                            ))


                                                                        } className="pi pi-check ml-2 accepttooltip"></i> */}
                                                                        <i className="pi pi-thumbs-down mr-2 ml-2 down" style={{ color: "red" }} data-pr-tooltip={"Rejected "} ></i>
                                                                        <Tooltip target=".down" ></Tooltip>
                                                                        <i style={{ cursor: "pointer", backgroundColor: "brown", padding: "4px", borderRadius: "4px", color: "white" }} onClick={() => {

                                                                            setRejectdialog(true)
                                                                            f.verificationcomments != "" ? setReviewComment(f.verificationcomments) : setReviewComment("")
                                                                            setCurid(f.id)

                                                                        }} className="pi pi-times ml-2 rejecttooltip"></i>
                                                                        <Tooltip target=".rejecttooltip" className='validateoptionstooltip' autoHide={false} style={{ background: "" }}>
                                                                            <div className="flex align-items-center" style={{ background: "" }}>reject</div>
                                                                        </Tooltip>
                                                                        <Tooltip target=".accepttooltip" className='validateoptionstooltip' autoHide={false} style={{ background: "" }}>
                                                                            <div className="flex align-items-center" style={{ background: "" }}>verify</div>
                                                                        </Tooltip>


                                                                    </>
                                                                }






                                                            </>

                                                            }
                                                        </>
                                                        : <>

                                                            {/* "employee" */}
                                                            {Object.is(f.verified, null) ? <>
                                                                {/* don't show anything to employee if null */}

                                                            </> :

                                                                <>
                                                                    {Object.is(f.verified, "verified") && <>
                                                                        <Tooltip target=".up" />
                                                                        <i className="pi pi-thumbs-up mr-2 ml-2 up" style={{ color: "green" }} data-pr-tooltip="Verified" ></i>
                                                                    </>
                                                                    }{Object.is(f.verified, "rejected") &&
                                                                        <>
                                                                            <i className="pi pi-thumbs-down mr-2 ml-2 down" style={{ color: "red" }} data-pr-tooltip={"Rejected "} ></i>
                                                                            <Tooltip target=".down" >
                                                                                {/* {f.verificationcomments} */}
                                                                                <div className="flex align-items-center" style={{ background: "red" }}>
                                                                                    <div>

                                                                                        {/* <InputTextarea style={{margin:"5px"}}></InputTextarea> */}
                                                                                        <textarea></textarea>
                                                                                    </div>
                                                                                    <Button type="button" icon="pi pi-check" onClick={() => console.log("abc")} className="p-button-rounded p-button-success ml-2"></Button>
                                                                                    <Button type="button" icon="pi pi-minus-circle" onClick={() => console.log("def")} className="p-button-rounded p-button-danger ml-2"></Button>
                                                                                    <br />
                                                                                </div>




                                                                            </Tooltip>
                                                                        </>
                                                                    }
                                                                    {Object.is(f.verified, "pending") && <>

                                                                        <Tooltip target=".up" />
                                                                        <i className="pi pi-history mr-2 ml-2 up" style={{ color: "blue" }} data-pr-tooltip="verification Pending" ></i>
                                                                    </>
                                                                    }



                                                                </>


                                                            }


                                                        </>
                                                }


                                                {/* </div> */}

                                                <i className="pi pi-download mr-2 ml-2" onClick={() => {



                                                    dispatch(documentdownloadaction({
                                                        "file": f.file.toString().substring(1, f.file.length)
                                                    }))




                                                }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white", height: "25px" }}> </i>
                                                {((!Object.is(f.verified, "pending") && !Object.is(f.verified, "verified")) || roles.includes("HR")) ? <i className="pi pi-trash mr-2 " style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white", height: "25px" }}
                                                    onClick={() => {
                                                        confirmDialog({
                                                            message: 'Do you want to delete this File?',
                                                            header: 'Delete Confirmation',
                                                            icon: 'pi pi-info-circle',
                                                            acceptClassName: 'p-button-danger',
                                                            accept: () =>
                                                            dispatch(deletedocumentaction({
                                                                "fileid": f.id

                                                            })),
                                                            reject: () => console.log()
                                                        })

                                                        // dispatch(deletedocumentaction({
                                                        //     "fileid": f.id
                                                        // }))



                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>
                                    )) :
                                    // <div className='nofiles' style={{}}
                                    <div className='field col-12 md:col-12 flex nofiles' style={{ border: "0px solid blue", padding: "2px", marginTop: "4px", verticalAlign: "center", alignContent:"center", borderRadius: "10px", backgroundColor: "#f8f9fa", justifyContent: "space-around" }}
                                        onDragOver={e => {
                                            e.preventDefault();

                                            e.stopPropagation(); console.log(e)
                                        }}
                                        onDrop={e => {

                                            e.preventDefault();

                                            e.stopPropagation(); console.log(e)
                                        }}>

                                        No Files Uploaded
                                    </div>



                                }


                            </div>
                            <br />
                            <div className="card-footer p-fluid grid ">
                                <div className="field col-12 md:col-5 flex">

                                </div>
                                <div className="field col-12 md:col-3 flex">


                                </div>
                                <div className="field col-12 md:col-4 flex gap-2">
                                    <Button className="p-button-info editbutton mr-2" tooltip="edit" style={{ height: "35px", width: "3.5rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}></Button>

                                    <Tooltip target=".fileuplod2" content={`upload file`} />
                                    <FileUpload   emptyTemplate={emptytemplate}   style={{}} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" chooseLabel='abc'  auto onSelect={k => {



                                        if (k.files.length > 0) {



                                            console.log(k.files[0])
                                            const data = new FormData()
                                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                                            data.append("detailtypeId", e.id.toString())
                                            data.append("detailtype", "Education")
                                            data.append("verificationcomments ", "")
                                            data.append("verified", roles.includes("HR") ? "verified" : "")
                                            data.append("file", k.files[0])
                                            dispatch(uploaddocumentaction(data))
                                        }
                                        else {
                                            console.log("no files uploaded yet")
                                        }


                                    }} />
                                    <Button style={{ height: "35px", width: "3.5rem" }} icon="pi pi-trash" tooltip="delete" className="p-button-danger" onClick={() =>
                                                                        confirmDialog({
                                                                            message: 'Do you want to delete this record?',
                                                                            header: 'Delete Confirmation',
                                                                            icon: 'pi pi-info-circle',
                                                                            acceptClassName: 'p-button-danger',
                                                                            accept: () =>
                                                                            dispatch(deleteedducationaldetailsaction({
                                                                                "id": e.id

                                                                            })),
                                                                            reject: () => console.log()
                                                                        })
                                    // dispatch(deleteedducationaldetailsaction({
                                    //     "id": e.id

                                    // }))

                                    } />

                                </div>




                            </div>

                        </Card>
                        <br></br>

                    </div>)

                        :


                        <DataTable className='dttable' value={educationdetailsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5}
                            globalFilterFields={['Qualification', 'Start_Date', 'End_Date', 'Specialization', 'Institute', 'Percentage', 'uploadedfiles']} filters={filters2} header={Headercomp}>

                            <Column field="Qualification" header="Qualification" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} ></Column>
                            <Column field="Start_Date" header="Start Date" body={formatstartDate} sortable></Column>
                            <Column field="End_Date" header="End Date" body={formatendDate} sortable></Column>
                            <Column field="Specialization" header="Specialization" sortable></Column>
                            <Column field="Institute" header="Institute" sortable ></Column>
                            <Column field="Percentage" header="Percentage " sortable body={percentageformat} > </Column>
                            {/* <Column field="" header="Uploaded Files " body={filestemplate} > </Column> */}

                            <Column field="action" header="Actions" body={actionBodyTemplate} exportable={false}></Column>
                        </DataTable>


                    }
                </div>
            </Panel>

            <br />
            <div className="p-fluid  grid">

                <div className="field col-12 md:col-4 flex">
                </div>
                <div className="field col-12 md:col-4 flex">
                </div>

                <div className="field col-12 md:col-4 flex gap-4">
                    <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {

        getallqualificationprop: getallqualification(state),
        getuserrolesprop: getuserroles(state)
    };
}
export default connect(mapStateToProps)(Education)
