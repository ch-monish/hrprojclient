import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import classNames from 'classnames'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { RootState } from '../../../app/store'
import { createinsuranceaction, deleteinsuranceaction, insuranceaction, updateinsuranceaction } from '../../../features/Candidate info/insuranceslice'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { SelectButton } from 'primereact/selectbutton'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { useNavigate } from 'react-router'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
// import { createfamilydetailsaction, familydetailsaction, updatefamilydetailsaction } from '../../../features/Candidateinfo/familydetailsslice'

function Insurance() {
    const insurancedata = useSelector((state: RootState) => state.CandidateInsurance);
    const [tempdata, settempdata] = useState<any>({})
    const [gridview, setgridview] = useState("table")
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const navigate = useNavigate()
    const [editmode, setEditmode] = useState(false);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const [modalDialog, setModaldialog] = useState(false);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(insuranceaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log(insurancedata)
    }, [])
    const options = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ]

    const validate = (values) => {
        values["CurrentCTC"] = values["CurrentCTC"]
        let errors = {};

        var arr = ["Name", "DateOfBirth", "Relationship", "Gender"]
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



        if (values["Relationship"] == undefined || values["Relationship"] == null) {

            errors["Relationship"] = "*This field is required"
        }


        if (values["Gender"] == undefined || values["Gender"] == null) {

            errors["Gender"] = "*This field is required"
        }
        console.log(errors)
        return errors;
    };


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const Relation = [
        { value: 'Self', label: 'Self' },
        // { value: 'father', label: 'Father' },
        // { value: 'mother', label: 'Mother' },
        // { value: 'fatherinlaw', label: 'Father in Law' },
        // { value: 'motherinlaw', label: 'Mother in Law' },
        // { value: 'Child', label: 'Child' },
        // { value: 'others', label: 'Others' },
        // { value: 'Father/ In law', label: 'Father/ In law' },
        { value: 'Father', label: 'Father' },
        { value: 'Mother', label: 'Mother' },
        // { value: 'Father in law', label: 'Father in law' },
        // { value: 'Mother In Law', label: 'Mother In Law' },
        { value: 'Spouse', label: 'Spouse' },
        { value: 'Son', label: 'Son' },
        { value: 'Daughter', label: 'Daughter' },

    ]
    const gridviewoptions = ['grid', 'table'];
    const template = (options: PanelHeaderTemplateOptions) => {

        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Manage Insurance Details
                    </h4>
                </span>
                {/* <SelectButton value={gridview} options={gridviewoptions} onChange={(e) => setgridview(e.value)} /> */}
                <Button className='' style={{}} onClick={e => { setEditmode(false); setModaldialog(true) }}>Add </Button>            </div>
        )
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

            > <span style={{ width: "30%" }}></span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>


            </div>
        );
    };
    const actionBodyTemplate = (rowdata) => {
        return (
            <div className=" flex gap-2">
                <Button className="p-button-info editbutton mr-2" style={{ height: "40px", width: "4.4rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(rowdata); setModaldialog(true); }}></Button>

                <Button style={{ height: "40px", width: "4.4rem" }} icon="pi pi-trash" className="p-button-danger" onClick={() =>
                                                    confirmDialog({
                                                        message: 'Do you want to delete the member?',
                                                        header: 'Delete Confirmation',
                                                        icon: 'pi pi-info-circle',
                                                        acceptClassName: 'p-button-danger',
                                                        accept: () =>
                                                        dispatch(deleteinsuranceaction({
                                                            "Id": rowdata.Id

                                                        })),
                                                        reject: () => console.log()
                                                    })

            } />

            </div>


        )
    }


    const formatDate = (value: any) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        // return value.toLocaleDateString('en-US');
    }
    const formatdob = (rowdata: any) => {

        return new Date(rowdata.DateOfBirth).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });


    }
    return (
        <div>
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

            .card1{


                // background: linear-gradient(-52deg, #155dce 0%, #2de3b0 100%);
                // background:  linear-gradient(-50deg, #155dce 0%, #2de3b0 100%);
                background:  #c1c2f3;;
                    background-blend-mode: normal;
                    border-radius:8px;
                    // width:300px

               color:white;
            }
            .card1:hover{
                scale:1.1;
                transition:  1s;

            }

            .card-body.p{
                color:white
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
            <ConfirmDialog/>
            <Panel headerTemplate={template}>
                <Dialog visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Member " : "Add  Member "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

                    <Form
                        onSubmit={(values: any) => {
                            var datetempstart = new Date(values.DateOfBirth
                            )
                            console.log(datetempstart)
                            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                            values.DateOfBirth = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')


                            values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
                            console.log(values)
                            if (!editmode) {
                                dispatch(createinsuranceaction(values))
                                setModaldialog(false)
                            }
                            else {
                                values["Id"] = tempdata.Id
                                dispatch(updateinsuranceaction(values))
                                setEditmode(false)
                                settempdata(undefined)
                                setModaldialog(false)

                            }
                        }}
                        initialValues={!editmode ? {
                            Contact_Number: "",
                        } : {
                            Id: tempdata.Id,
                            Name: tempdata.Name,
                            DateOfBirth: new Date(tempdata.DateOfBirth).toString(),
                            Relationship: tempdata.Relationship,
                            Gender: tempdata.Gender,
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
                                <br></br>
                                <div className="p-fluid  grid">


                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="Name"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Name">Complete Name*</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="Name" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Name" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="DateOfBirth"
                                            render={({ input, meta }) => (
                                                <div className="field " >
                                                    <label htmlFor="DateOfBirth ">Date Of Birth*</label>
                                                    <Calendar id="DateOfBirth" onChange={e => { values["DateOfBirth"] = e.value }} value={new Date(values["DateOfBirth"])} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                    <span className="label">
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-10">

                                        <Field
                                            name="Relationship"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Relationship ">Relationship*</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Relationship " {...input} options={Relation} placeholder="Select Relation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="Gender"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Gender ">Gender*</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Gender " {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <br>
                                        </br>



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
                <div style={{color:"orange"}}>
                    *Note: The Dependents selection should be followed with below criteria. <br /><br />

                    {/* 1. Either Father or Father In Law can be a dependent<br />
                    2. Either Mother or Mother In Law can be a dependant.<br /> */}
                    1. Spouse can be a dependant if you were married .<br />
                    2. Maximum of two childrens can be added as dependants.<br />
                    </div>
                    <br></br>
                <div className='grid' style={gridview == "grid" ? { display: "flex" } : { display: "block" }}>
                    {/* {gridview == "grid" && insurancedata.length == 0 && <div className='flex text-align-center'> No Data</div>}

                    {gridview == "grid" ? insurancedata.map((e) => <div className='lg:col-3 md:col-6 sm:col-2 gap-4' key={e.Id.toString()}>
                        <Card className='card1 margin-auto'>
                            <div className="p-fluid  grid card1content">

                                <div className="card-body">
                                    <p className="Name">Name : {e.Name}</p>
                                    <p className="DateOfBirth"> Date Of Birth : {formatDate(new Date(e.DateOfBirth))}</p>
                                    <p className="Relationship"> Relationship : {e.Relationship}</p>
                                    <p className="Gender">Gender : {e.Gender}</p>


                                </div>

                                <br></br>


                            </div>

                            <br />
                            <div className="card-footer p-fluid grid ">
                                <div className="field col-12 md:col-4 flex">

                                </div>
                                <div className="field col-12 md:col-3 flex">


                                </div>
                                <div className="field col-12 md:col-5 flex gap-2">
                                    <Button className="p-button-info editbutton mr-2" style={{ height: "35px", width: "3.5rem" }} label="" icon="pi pi-pencil" onClick={() => { console.log(e); setEditmode(true); settempdata(e); setModaldialog(true); }}></Button>



                                    <Button style={{ height: "35px", width: "3.5rem" }} icon="pi pi-trash" className="p-button-danger" onClick={() => dispatch(deleteinsuranceaction({
                                        "Id": e.Id

                                    }))} />

                                </div>




                            </div>

                        </Card>
                        <br></br>

                    </div>)

                        : */}

                    <Card>
                        <DataTable className='dttable' value={insurancedata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10}
                            globalFilterFields={['Name', 'DateOfBirth', 'Relationship', 'Gender', 'Age']} filters={filters2} header={Headercomp}>

                            <Column field="Name" header="Name" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} ></Column>
                            <Column field="DateOfBirth" header="Date Of Birth" body={formatdob} sortable></Column>
                            <Column field="Relationship" header="Relationship" sortable></Column>
                            <Column field="Gender" header="Gender" sortable></Column>
                            <Column field="Age" header="Age" sortable></Column>

                            <Column field="action" header="Actions" body={actionBodyTemplate} exportable={false}></Column>
                        </DataTable>
                        </Card>


                    {/* } */}
                </div>




            <br />
            <div className="p-fluid  grid">

                <div className="field col-12 md:col-5 flex">
                </div>
                <div className="field col-12 md:col-6 flex">
                </div>

                {/* <div className="field col-12 md:col-4 flex gap-4">
                    <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                </div> */}
                <div className='field col-12 md:col-1 flex'>
                    <Button onClick={e => navigate(-1)}>Cancel</Button>
                </div>
            </div>
                </Panel>
        </div>
    )
}

export default Insurance
