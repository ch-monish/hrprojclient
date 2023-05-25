import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Field, Form } from 'react-final-form'
import { otherdocumentsgetaction } from '../../../features/Candidate info/otherdocumentsslice'
import { RootState } from '../../../app/store'
import { deleteedducationaldetailsaction } from '../../../features/Candidate info/educationdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction, verifydocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { RenderErrorBoundary } from 'react-router/dist/lib/hooks'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dialog } from 'primereact/dialog'
import { Tooltip } from 'primereact/tooltip'
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { getuserroles } from '../../../features/Login/LoginSelector'
function Documents(props) {
    const dispatch = useDispatch()
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const otherdocumentsdata = useSelector((state: RootState) => state.otherdocuments)
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const Logindata = useSelector((state: RootState) => state.Login);
    const roles = props.getuserrolesprop
    const [curid, setCurid] = useState(0)
    const [rejectdialog, setRejectdialog] = useState(false);
    const [reviewcomment, setReviewComment] = useState("")




    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        // var w: any = []
        // // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        // Logindata.groups.forEach((i) => setRoles(roles => [...roles, i["name"].toString()]))
        dispatch(otherdocumentsgetaction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
        }))
        console.log(otherdocumentsdata)
    }, [])

    const selectfileobject = (otherdocumentsdata, s) => {
        // console.log(otherdocumentsdata)
        return otherdocumentsdata.filter((i) => i.detailtype == s)

    }
    const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded ' };
    const Signedofferletterheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h5>
                        Signed Offer Letter<span style={{ color: "red" }}>*</span>
                    </h5>
                </span>
                <Tooltip target=".fileuplod2" content={`upload file`} />
                <FileUpload style={{}} disabled={selectfileobject(otherdocumentsdata, "Signedofferletter").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" chooseLabel='abc' auto onSelect={k => {


                    if (k.files.length > 0) {

                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Signedofferletter")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))





                    }
                    else {
                        console.log("no files uploaded yet")
                    }

                }} /></div>
        )

    }
    const photoheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <span className="flex" >
                    <h5 className="pt-2">
                        Photograph<span style={{ color: "red" }}>*</span>
                    </h5>
                    <Message  className="ml-3"severity="info" text={candidateinfodata.candidate.EmploymentType=="Full-Time"?"Please upload blue background passport size photo with valid image formats (PNG, JPG, JPEG..)":candidateinfodata.candidate.EmploymentType=="Internship"?"Please upload red background passport size photo with valid image formats (PNG, JPG, JPEG..)":"Please upload yellow background passport size photo with valid image formats (PNG, JPG, JPEG..)"} />
                    </span>
                </span>
                <FileUpload style={{}} disabled={selectfileobject(otherdocumentsdata, "Photograph").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" chooseLabel='abc' accept="image/*"  auto onSelect={k => {


                    if (k.files.length > 0) {

                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Photograph")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))





                    }
                    else {
                        console.log("no files uploaded yet")
                    }

                }} /></div>
        )

    }
    const passportheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                <span className="flex">
                    <h5 className="pt-2">

                        Passport
                    </h5>
                    <Message  className="ml-3"severity="info" text="Please upload valid pages of passport" />
                </span>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Passport").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 ' mode="basic" name="demo[]"  auto chooseLabel="upload File" onSelect={k => {

                    if (k.files.length > 0) {
                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Passport")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))

                    }
                    else {
                        console.log("no files uploaded yet")
                    }


                }} />

            </div>
        )

    }
    const panheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h5>
                        PAN<span style={{ color: "red" }}>*</span>
                    </h5>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Pan").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]"  auto chooseLabel="upload File" onSelect={k => {

                    if (k.files.length > 0) {
                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Pan")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))

                    }
                    else {
                        console.log("no files uploaded yet")
                    }


                }} />

            </div>
        )

    }
    const payslipsheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <span className="flex">
                    <h5 className="pt-2">
                        Payslips
                    </h5>
                       {/* <label> (Please upload past 3 Months Paysl )</label> */}
                       <Message  className="ml-3"severity="info" text="Please upload latest 3 months payslips" />
                       </span>
                </span>
                <FileUpload chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]"  auto chooseLabel="upload File" onSelect={k => {

                    if (k.files.length > 0) {
                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Payslips")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))

                    }
                    else {
                        console.log("no files uploaded yet")
                    }


                }} />

            </div>
        )

    }
    const Form16headertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                <span className="flex">
                    <h5 className="pt-2">
                        Form 16
                    </h5>
                    <Message  className="ml-3"severity="info" text="Please upload latest 2 years form16 documents" />
                </span>
                </span>
                <FileUpload chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]"  auto chooseLabel="upload File" onSelect={k => {

                    if (k.files.length > 0) {
                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Form16")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))

                    }
                    else {
                        console.log("no files uploaded yet")
                    }


                }} />

            </div>
        )

    }
    const aadharheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h5>
                        Aadhar<span style={{ color: "red" }}>*</span>
                    </h5>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Aadhar").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]"  auto chooseLabel="upload File" onSelect={k => {

                    if (k.files.length > 0) {
                        console.log(k.files[0])
                        const data = new FormData()
                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                        data.append("detailtypeId", "0")
                        data.append("detailtype", "Aadhar")
                        data.append("file", k.files[0])
                        data.append("verified", roles.includes("HR") ? "verified" : "")
                        dispatch(uploaddocumentaction(data))

                    }
                    else {
                        console.log("no files uploaded yet")
                    }


                }} />

            </div>
        )

    }
    return (
        <div>
            <Tooltip target=".pi-trash" content='delete file'/>
            <Tooltip target=".pi-download" content='download'/>
            <style>{`
            // .p-fluid .p-fileupload .p-button {
            //     width: 50px;
            // }


            #star {
                font-size:4px;
                color: red;
                /* Some sort of border */
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
              }

             .fileshow{
                justify-content: space-between;
                display:flex;
             }

            `}

            </style>
            <ConfirmDialog />

            <Dialog className='' style={{ width: "30%" }} header={<h5>
                Comments
            </h5>} visible={rejectdialog} onHide={() => setRejectdialog(false)}>


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
            <br>
            </br>
            <br></br>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={Signedofferletterheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Signedofferletter").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Signedofferletter").map(f => (
                                        // <div className="fileshow">
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>

                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>
                                        //     </div>
                                        // </div>

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
                                                <i data-pr-tooltip="download" className="pi pi-download mr-2 ml-2" onClick={() => {



                                                    dispatch(documentdownloadaction({
                                                        "file": f.file.toString().substring(1, f.file.length)
                                                    }))




                                                }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white", height: "25px" }}> </i>


                                                {((!Object.is(f.verified, "pending") && !Object.is(f.verified, "verified")) || roles.includes("HR")) ? <i className="pi pi-trash mr-2 "   style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white", height: "25px" }}
                                                    onClick={() => {
                                                        confirmDialog({
                                                            message: 'Do you want to delete this File?',
                                                            header: 'Delete Confirmation',
                                                            icon: 'pi pi-info-circle',
                                                            acceptClassName: 'p-button-danger',
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>





















                                        ))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={photoheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Photograph").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Photograph").map(f=> (
                                        // <div className="fileshow">
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>

                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>
                                        //     </div>
                                        // </div>

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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>




                                        ))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={passportheadertemplate}>

                        {
                            selectfileobject(otherdocumentsdata, "Passport").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Passport").map(f => (
                                        // <div className='fileshow'>

                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <span className=''>

                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>

                                        //     </span>
                                        // </div>
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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>


                                        ))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }

                    </Panel>
                </div>
            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={panheadertemplate}>

                        {
                            selectfileobject(otherdocumentsdata, "Pan").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Pan").map(f => (
                                        // <div className="fileshow">
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>
                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>
                                        //     </div>
                                        // </div>


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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>


                                        ))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>
                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={aadharheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Aadhar").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Aadhar").map(f=> (
                                        // <div className='fileshow'>
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>
                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i></div>
                                        // </div>
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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>

                                        ))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">

                </div>
            </div>

            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={payslipsheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Payslips").length > 0 ?
                                <div className="p-fluid ">

                                    {
                                        selectfileobject(otherdocumentsdata, "Payslips").map(f => (
                                        // <div className="field row-12 md:row-12 flex fileshow">
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>
                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>
                                        //         <br />
                                        //     </div>

                                        // </div>

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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>

                                        ))

                                    }

                                </div>
                                : <>
                                    No files Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={Form16headertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Form16").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Form16").map(f => (
                                        // <div className='field row-12 md:row-12 flex fileshow'>
                                        //     {i.file.split("/")[i.file.split("/").length - 1]}
                                        //     <div>
                                        //         <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                        //             dispatch(documentdownloadaction({
                                        //                 "file": i.file.toString().substring(1, i.file.length)
                                        //             }))
                                        //         }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                        //         <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                        //             onClick={() => dispatch(deletedocumentaction({
                                        //                 "fileid": i.id

                                        //             }))}
                                        //         > </i>
                                        //     </div>
                                        // </div>

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
                                                            accept: () =>     dispatch(deletedocumentaction({
                                                                "fileid": f.id
                                                            })),
                                                            reject: () => console.log("")
                                                        });





                                                    }}
                                                > </i> : <></>}

                                            </div>
                                        </div>


                                        ))

                                    }

                                </>
                                : <>
                                    No files Uploaded
                                </>


                        }
                    </Panel>
                </div>




                <div className="field col-12 md:col-6">
                </div>
            </div>




            <div className="p-fluid  grid " style={{justifyContent: "flex-end"}}>

                <div className="field col-12 md:col-4 flex">
                </div>
                <div className={"flex"}>
                </div>

                <div className={!(roles.includes("HR") || roles.includes("Adminstrator")) ?"field col-12 md:col-4 flex" :"flex pr-4"}>
                    <Button className=' mr-4'  onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    {!(roles.includes("HR") || roles.includes("Adminstrator")) ? <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button> : <></>}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {

        getuserrolesprop: getuserroles(state)
    };
}
export default connect(mapStateToProps)(Documents)
