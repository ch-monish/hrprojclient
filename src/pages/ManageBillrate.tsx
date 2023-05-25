import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { InputNumber } from 'primereact/inputnumber';

import { getManageBillaction, createManageBillaction, updateManageBillaction } from "../features/ManageBillRate/ManageBillRateslice";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { getservicelineaction, IServiceLineoptions } from "../features/ServiceLine/ServiceLineSlice";
import { getexperiencelevelsaction, IExperienceLeveloptions } from "../features/ExperienceLevel/experiencelevelslice";
import { Dropdown } from 'primereact/dropdown';
import { getbusinessunitsaction, IBusinessUnitoptions } from "../features/BusinessUnit/businessunitslice";
import { getcompaniesaction, ICompanyoptions } from "../features/Company/companyslice";
import { getallservielineoptions } from "../features/ServiceLine/ServiceLineSelectors";
import { Card } from "primereact/card";

// import '../../index.css';
const ManageBill = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [Id, SetId] = useState(0);
    // const [ExperienceLevelId, SetExperienceLevelId] = useState("");
    const [AvgApprovedCTC, SetAvgApprovedCTC] = useState(2);
    const [AvgBillRate, SetAvgBillRate] = useState(2);
    const [head, sethead] = useState("ADD  Average CTC Bill Rate Information")

    //drop down//
    const [companyid, setCompanyid] = useState(0);
    const[BusinessUnitId,setBusinessUnitId]=useState(0)
    const [ServiceLineId, setServiceLineId] = useState(0);

    const [ExperienceLevelId, setExperienceLevelId] = useState("");
    const [issave, setissave] = useState(false);
    const [issavee, setissavee] = useState(false);

    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    // const toast = useRef();
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const selectBusiness=useSelector((state:RootState)=>state.businessunit)
    const selectcompany=useSelector((state:RootState)=>state.company)
    const selectserviceline = useSelector((state: RootState) => state.serviceline)
    const selectexperiencelevel = useSelector((state: RootState) => state.experiencelevel)


    const  getdropdownbusinesslems=(companyid)=>{
        var BusinessUnitoptions:  IBusinessUnitoptions[]  =[]
        selectBusiness.forEach(e => {
            console.log(e)
            if (companyid == e.CompanyId){
                BusinessUnitoptions.push({
                key:e.BusinessUnitId,
                label:e.BusinessUnitName,
                value:e.BusinessUnitId
        })}});

        return BusinessUnitoptions
    }

    const  getdropdownbusinesslemsinitial=()=>{
        var BusinessUnitoptions:  IBusinessUnitoptions[]  =[]
        selectBusiness.forEach(e => {
            console.log(e)

                BusinessUnitoptions.push({
                key:e.BusinessUnitId,
                label:e.BusinessUnitName,
                value:e.BusinessUnitId
        })});

        return BusinessUnitoptions
    }

    const getdropdowncomapanyelemns=()=>{
        var Companyoptions:  ICompanyoptions[]  =[]
        selectcompany.forEach(e => {

            Companyoptions.push({
            key:e.CompanyId,
            label:e.CompanyName,
            value:e.CompanyId
        })});

        return Companyoptions
    }




    const getdropdowncomapanyactiveelemns=()=>{
        var Companyoptions:  ICompanyoptions[]  =[]
        selectcompany.forEach(e => {
        if(e.Active==true){

            // console.log(BusinessUnitId)
            Companyoptions.push({
                key:e.CompanyId,
                label:e.CompanyName,
                value:e.CompanyId
            })}});

    return  Companyoptions
    }



    const getdropdownactiveebusinesslems=()=>{
        var BusinessUnitoptions:  IBusinessUnitoptions[]  =[],Companyoptions:  ICompanyoptions[]  =[]
        // setBusinessUnitId(0)
        selectBusiness.forEach(e => {
        if(e.Active==true){
            console.log(companyid)
            console.log(e.CompanyId)
            console.log(BusinessUnitId)
            if (companyid == e.CompanyId){
            BusinessUnitoptions.push({
                key:e.BusinessUnitId,
                label:e.BusinessUnitName,
                value:e.BusinessUnitId
            })}}});


    return  BusinessUnitoptions
    }

    const getdropdownelems = (companyid, BusinessUnitId) => {
        var ServiceLineoptions: IServiceLineoptions[] = []
        selectserviceline.forEach(e => {
            if (companyid == e.CompanyId && BusinessUnitId == e.BusinessUnitId){
                ServiceLineoptions.push({
                    key: e.ServiceLineId,
                    label: e.ServiceLineName,
                    value: e.ServiceLineId
                })
            }
        });

        return ServiceLineoptions
    }

    const getdropdownelemsinitial = () => {
        var ServiceLineoptions: IServiceLineoptions[] = []
        selectserviceline.forEach(e => {

                ServiceLineoptions.push({
                    key: e.ServiceLineId,
                    label: e.ServiceLineName,
                    value: e.ServiceLineId
                })

        });

        return ServiceLineoptions
    }

    const getdropdownelemns = () => {
        var ExperienceLeveloptions: IExperienceLeveloptions[] = []
        selectexperiencelevel.forEach(e => {

            ExperienceLeveloptions.push({
                key: e.ExperienceLevelId,
                label: e.ExperienceLevel,
                value: e.ExperienceLevelId
            })
        });

        return ExperienceLeveloptions
    }



    const getdropdownactiveelems = () => {
        var bandoptions: IServiceLineoptions[] = [], Companyoptions:  ICompanyoptions[]  =[], BusinessUnitoptions:  IBusinessUnitoptions[]  =[]
        selectserviceline.forEach(e => {
            if (e.Active == true) {
                if (companyid == e.CompanyId && BusinessUnitId == e.BusinessUnitId){
                    bandoptions.push({
                        key: e.ServiceLineId,
                        label: e.ServiceLineName,
                        value: e.ServiceLineId
                    })
                }
            }
        });

        return bandoptions
    }

    const getdropdownactiveelemns = () => {
        var ExperienceLeveloptions: IServiceLineoptions[] = []
        selectexperiencelevel.forEach(e => {
            if (e.Active == true) {
                ExperienceLeveloptions.push({
                    key: e.ExperienceLevelId,
                    label: e.ExperienceLevel,
                    value: e.ExperienceLevelId
                })
            }
        });

        return ExperienceLeveloptions;
    }


    const ManageBilldata = useSelector((state: RootState) => state.ManageBill);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getManageBillaction());

    }, []);

    useEffect(() => {
        dispatch(getcompaniesaction());
        getdropdowncomapanyelemns()
        getdropdowncomapanyactiveelemns()
    }, [])

    useEffect(() => {
        dispatch(getbusinessunitsaction());
        getdropdownbusinesslemsinitial()
        getdropdownactiveebusinesslems()
    }, [])

    useEffect(() => {
        dispatch(getservicelineaction());
        getdropdownelemsinitial()
        getdropdownactiveelems()
    }, [])
    useEffect(() => {
        dispatch(getexperiencelevelsaction());
        getdropdownelemns()
        getdropdownactiveelemns()
    }, [])

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setissave(false)
        setissavee(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h2>Average CTC Bill Rate</h2>


                <span style={{ width: "30%" }}></span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>

                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setCompanyid(0);
                        setBusinessUnitId(0);
                        setServiceLineId(0);
                        setExperienceLevelId("");
                        SetAvgApprovedCTC(0);
                        SetAvgBillRate(0);
                        setProductDialog(true);
                    }}
                />
            </div>
        );
    };

    const comapnytemplate = (data) => {
        var Comapnanyoptions = getdropdowncomapanyelemns()
        var companyId = data.CompanyId
        var companystr = ''
        Comapnanyoptions.forEach(e => {
            if (e.value == companyId)
                companystr = e.label
        });
        return (
            <div>

                {companystr}
            </div>
        )
    }

    const businessunittemplate = (data) => {
        var BusinessUnitoptions = getdropdownbusinesslems(data.CompanyId)
        var BusinessUnitId = data.BusinessUnitId
        var BusinessUnitstr = ''
        BusinessUnitoptions.forEach(e => {
            if (e.value == BusinessUnitId)
                BusinessUnitstr = e.label
        });
        return (
            <div>

                {BusinessUnitstr}
            </div>
        )
    }

    const servicelinetemplate = (data) => {
        var ServiceLineoptions = getdropdownelems(data.CompanyId, data.BusinessUnitId)
        var servicelineid = data.ServiceLineId
        var servicelinestr = ''
        ServiceLineoptions.forEach(e => {
            if (e.value == servicelineid)
                servicelinestr = e.label
        });
        return (
            <div>

                {servicelinestr}
            </div>
        )
    }


    const experienceleveltemplate = (data) => {
        var ExperienceLeveloptions = getdropdownelemns()
        var experiencelevelid = data.ExperienceLevelId
        var experiencelevelstr = ''
        ExperienceLeveloptions.forEach(e => {
            if (e.value == experiencelevelid)
                experiencelevelstr = e.label
        });
        return (
            <div>

                {experiencelevelstr}
            </div>
        )
    }

    const actionAverageTemplate = (rowData: any) => {
        return formatCurrency(rowData.AvgApprovedCTC);
    }

    const formatCurrency = (value: any) => {
        return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
    }

    const actionAverageTemplate1 = (rowData: any) => {
        return formatCurrency2(rowData.AvgBillRate);
    }

    const formatCurrency1 = (value: any) => {
        return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
    }
    const formatCurrency2 = (value: any) => {
        return value.toLocaleString('en-IN', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
    }


    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(true);
                        console.log(data)
                        SetId(data.Id)
                        setCompanyid(data.CompanyId);
                        setBusinessUnitId(data.BusinessUnitId);
                        setServiceLineId(data.ServiceLineId);
                        setExperienceLevelId(data.ExperienceLevelId);
                        SetAvgApprovedCTC(data.AvgApprovedCTC);
                        SetAvgBillRate(data.AvgBillRate)
                        sethead("Edit Average CTC Bill Rate Information")
                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    setissave(true);
                    setissavee(true);
                    console.log(BusinessUnitId);
                    // console.log(companydesc);
                    // console.log(active);
                    var c = {
                        Id: Id,
                        CompanyId : companyid,
                        BusinessUnitId :BusinessUnitId,
                        ServiceLineId: ServiceLineId,
                        ExperienceLevelId: ExperienceLevelId,
                        AvgApprovedCTC: AvgApprovedCTC,
                        AvgBillRate: AvgBillRate,
                    };
                    if (ServiceLineId! &&BusinessUnitId! && companyid! && ExperienceLevelId != "") {
                        if (editmode === false) {
                            dispatch(createManageBillaction(c));
                        } else {
                            dispatch(updateManageBillaction(c));
                        }
                        setProductDialog(false);
                    }
                }}
            />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    return (
        <div className="Manage ServiceLine">

            <div>
                <div>
                    <Card>
                    <DataTable value={ManageBilldata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["ServiceLineId", "ExperienceLevelId", "AvgApprovedCTC", "AvgBillRate"]} filters={filters2} header={Headercomp}>
                        <Column field="CompanyId" header=" Company Name" body={comapnytemplate} sortable></Column>
                        <Column field="BusinessUnitId" header=" Business Unit Name" body={businessunittemplate} sortable></Column>
                        <Column field="ServiceLineId" header=" ServiceLine Name" body={servicelinetemplate} sortable></Column>
                        <Column field="ExperienceLevelId" header="Experience Level " body={experienceleveltemplate} sortable></Column>

                        <Column field="AvgApprovedCTC" header="Average Approved CTC" body={actionAverageTemplate} sortable></Column>
                        <Column field="AvgBillRate" header="Average Bill Rate" body={actionAverageTemplate1} sortable></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <div className="field">
                        <label htmlFor="companyname">Company Name</label>
                        {/* <Dropdown value={companyid}   options={!editmode?getdropdownactiveelemns():getdropdownelemns()} onChange={(e) => setCompanyid(e.value)} placeholder="Select a Company"/> */}

                        <Dropdown className={issave == true && companyid == 0 ? "p-invalid" : "p-valid"} value={companyid}  options={!editmode ? getdropdowncomapanyactiveelemns() : getdropdowncomapanyelemns()} id="companyid" onChange={(e) => { setCompanyid(e.value); setBusinessUnitId(0); setServiceLineId(0);}} placeholder="Select Company" />
                        {issave == true && companyid == 0 && <small className="p-error">*Company Name  is Required.</small>}
                    </div>


                    <div className="field">
                        <label htmlFor="">Businessunit Name</label>

                        <Dropdown className={issavee == true && BusinessUnitId == 0 ? "p-invalid" : "p-valid"}   value={BusinessUnitId} options={!editmode ? getdropdownactiveebusinesslems() : getdropdownbusinesslems(companyid)} id="BusinessUnitId" onChange={(e) => {setBusinessUnitId(e.value); setServiceLineId(0);}} placeholder="Select Businessunit" />
                        {issavee == true && BusinessUnitId == 0 && <small className="p-error">*Businessunit Name  is Required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="ServiceLineId<">ServiceLine Name</label>
                        {/* <InputText id=" ServiceLineId" onChange={(e) => SetServiceLineId(e.target.value)} value={ServiceLineId}></InputText>
                         */}
                        <Dropdown className={issave == true && ServiceLineId == 0 ? "p-invalid" : "p-valid"} value={ServiceLineId} options={!editmode ? getdropdownactiveelems() : getdropdownelems(companyid, BusinessUnitId)} id="ServiceLineId" onChange={(e) => setServiceLineId(e.value)} placeholder="Select ServiceLine Name" />
                        {issave == true && ServiceLineId == 0 && <small className="p-error">*ServiceLine Name  is Required.</small>}

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="ExperienceLevelId">Experience Level</label>
                            <Dropdown className={issavee == true && ExperienceLevelId == "" ? "p-invalid" : "p-valid"} value={ExperienceLevelId}  options={!editmode ? getdropdownactiveelemns() : getdropdownelemns()} id="ExperienceLevelId" onChange={(e) => setExperienceLevelId(e.value)} placeholder="Select Experience Level" />
                            {issavee == true && ExperienceLevelId == "" && <small className="p-error">*Experience Level  is Required.</small>}

                        </div>


                        <div className="field">

                            <label htmlFor="currency-india">Average Approved CTC</label>
                            <InputNumber inputId="currency-india" value={AvgApprovedCTC} onValueChange={(e) => SetAvgApprovedCTC(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" minFractionDigits={2} />
                            {/* <InputNumber value={AvgApprovedCTC} onValueChange={(e) => SetAvgApprovedCTC(e.value)}/> */}
                        </div>

                        <div className="col-12">
                            <label htmlFor="currency-india">Average Bill Rate</label>
                            <InputNumber inputId="currency-india" value={AvgBillRate} onValueChange={(e) => SetAvgBillRate(e.value)} mode="currency" currency="USD" currencyDisplay="code" locale="en-IN" minFractionDigits={2} />
                            {/* <InputNumber value={AvgBillRate} onValueChange={(e) => SetAvgApprovedCTC(e.value)}/> */}
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(ManageBill, comparisonFn);
// function mapStateToProps(state) {
//     return {
//         getallservielineoptionsprop: getallservielineoptions(state),

//     };
// }
// export default connect(mapStateToProps)(ManageBill)
export default ManageBill








// ServiceLineId": 1,
//         "ServiceLineName": "abd",
//         "Acronym": "jap",
//         "ServiceLineDesc": "a",
//         "Active": true
















// "Id": 1,
// "ServiceLineId": 2,
// "ExperienceLevelId": 303,
// "AvgApprovedCTC": "9000.00000",
// "AvgBillRate": "564.0000"
// },
// {
// "Id": 2,
// "ServiceLineId": 2,
// "ExperienceLevelId": 303,
// "AvgApprovedCTC": "90000.00000",
// "AvgBillRate": "564.0000"
// }
