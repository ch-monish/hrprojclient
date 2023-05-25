import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Card } from 'primereact/card'
import { createbankdetailsaction, deletebankdetailsaction, bankdetailsgetaction, updatebankdetailsaction, Ibankdetail } from '../../../features/Candidate info/bankdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { FilterMatchMode } from 'primereact/api'
import { SelectButton } from 'primereact/selectbutton'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputTextarea } from 'primereact/inputtextarea'
import { useNavigate } from 'react-router'

import LoadingOverlay from "react-loading-overlay";
import { Toast } from 'primereact/toast'
import { bankdetailsapis } from '../../../api/agent'


function BankDetails() {
    const dispatch = useDispatch()
    const [modalDialog, setModaldialog] = useState(false);
    const [gridview, setgridview] = useState("grid")
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filechange, setFilechange] = useState(false)

    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const [tempdata, settempdata] = useState<any>({})
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const bankdetailsdata: Ibankdetail = useSelector((state: RootState) => state.bankdetails)
    const [edit, setEdit] = useState(bankdetailsdata.BankName == "" ? false : true);
    const [showspinner, setShowspinner] = useState(false)
    const toast = useRef(null);
    const navigate=useNavigate()
    useEffect(() => {
        dispatch(bankdetailsgetaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log("bankdetailsdata ")
        console.log(edit)
    }, [])

    // const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (values) => {
        const arr = ["BankName", "AccountNumber", "BranchName", "IFSCcode"]
        let errors = {};
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })
        if (!edit && !values["BankPassbook"]) {
            errors["BankPassbook"] = "*File is required";
        }

        console.log(errors)
        return errors
    }






    return (
        <div>
                        <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
            <Card title="Manage Bank Details">

            <Form
                // {console.log(candidateinfodata)}
                onSubmit={(values: any) => {
                    console.log(values)

                    values.selectedCandidateid = candidateinfodata.Selected_Candidate_ID
                    var data = new FormData()
                    edit && data.append("Id", edit ? bankdetailsdata.Id.toString() : "")
                    data.append("BankName", values.BankName)
                    data.append("AccountNumber", values.AccountNumber)
                    data.append("BranchName", values.BranchName)
                    data.append("selectedcandidateid", candidateinfodata.Selected_Candidate_ID.toString())
                    data.append("IFSCcode", values.IFSCcode)
                    console.log(values["BankPassbook"])
                    // values.BankPassbook.file?data.append("BankPassbook", values.BankPassbook.file[0]):data.append("BankPassbook", "")
                    data.append("BankPassbook",typeof values.BankPassbook=='string' ?'': values.BankPassbook )
                    // dispatch(uploaddocumentaction(data))


                    if (edit) {
                    setShowspinner(true)
                    bankdetailsapis.updatebankdetails(data)
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
                        bankdetailsapis.createbankdetail(data)
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
                    


// navigate(-1)
                    // dispatch(setnextcandidateinfotab())
                }}
                keepDirtyOnReinitialize={true}
                initialValues={edit ? {
                    // "Id": bankdetailsdata.Id,
                    "BankName": bankdetailsdata.BankName,
                    "AccountNumber": bankdetailsdata.AccountNumber,

                    "BranchName": bankdetailsdata.BranchName,

                    "IFSCcode": bankdetailsdata.IFSCcode,

                    "BankPassbook": bankdetailsdata.BankPassbook,





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
                                    name="BankName"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="BankName">Bank Name*</label>
                                            <span className="label">
                                                <InputText id="BankName" {...input} maxLength={100} placeholder="Enter Bank Name" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="AccountNumber"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="AccountNumber">Account Number*</label>
                                            <span className="label">
                                                <InputText id="AccountNumber " {...input} maxLength={100} placeholder="Enter Account Number" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BranchName"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="BranchName">Branch Name*</label>
                                            <span className="label">
                                                <InputText id="BranchName " {...input}  maxLength={100} placeholder="Enter Branch Name" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                    name="IFSCcode"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="IFSCcode">IFSC Code*</label>
                                            <span className="label">
                                                <InputText id="IFSCcode " {...input} maxLength={100} placeholder="Enter IFSC Code" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BankPassbook"
                                    render={({ input, meta }) => (
                                        <div  className="field ">

                                            <label htmlFor="BankPassbook">Passbook/Cancelled Cheque*</label>

                                            <span>
                                                <FileUpload style={{}} className='p-success mr-2'  mode="basic" name="BankPassbook"   onSelect={k => {
                                                    if (k.files.length > 0) {
                                                        console.log(k.files[0])
                                                        values["BankPassbook"] = k.files[0]
                                                        !edit && setFilechange(!filechange)
                                                    }
                                                    else {
                                                        console.log("no files uploaded yet")
                                                    }
                                                }} />

                                            </span>

                                            {edit ? <span>
                                                {(typeof(bankdetailsdata.BankPassbook) ==='string') && <>Uploaded File: <a style={{ cursor: "pointer" }} onClick={e =>
                                                    dispatch(documentdownloadaction(
                                                        {
                                                            'file': bankdetailsdata.BankPassbook.toString().substring(1, bankdetailsdata.BankPassbook.toString().length)
                                                        }
                                                    )
                                                    )

                                                }  >
                                                    {bankdetailsdata.BankPassbook?.split("/")[bankdetailsdata.BankPassbook.split("/").length - 1]}
                                                    {/* {bankdetailsdata.BankPassbook} */}

                                                </a>
                                                    <br></br>

                                                </>}


                                            </span> : <></>}
                                            {getFormErrorMessage(meta)}


                                        </div>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="p-fluid  grid">





                        </div>


                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="p-fluid  grid">


                            <div className="field col-12 md:col-5 flex"></div>
                            <div className="field col-12 md:col-5 flex"></div>
                            <div className="field col-12 md:col-2 flex ">
                            <Button type='button'   className='mr-2' onClick={e=>navigate(-1)}
                // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                >Cancel</Button>
                                <Button type='submit'
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

export default BankDetails
