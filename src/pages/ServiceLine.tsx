

import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect,useRef,Fragment } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
// import { classNames } from 'primereact/utils';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';


import { Checkbox } from "primereact/checkbox";

import { InputTextarea } from "primereact/inputtextarea";

import { RadioButton } from "primereact/radiobutton";

import {getservicelineaction,createservicelineaction,updateservicelineaction} from "../features/ServiceLine/ServiceLineSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {  getbusinessunitsaction,IBusinessUnitoptions} from "../features/BusinessUnit/businessunitslice";
import {   getcompaniesaction,ICompanyoptions} from "../features/Company/companyslice";
// import { Toast } from 'primereact/toast';
import { act } from "react-dom/test-utils";

import { FilterMatchMode } from "primereact/api";
import { setContext } from "redux-saga/effects";
import { Card } from "primereact/card";

// import '../../index.css';
const ServiceLine = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [ServiceId, SetServiceId] = useState(0);
    const [Servicename, SetServicename] = useState("");
    const [ServiceAcronym, SetServiceAcronym] = useState("");
    const [Servicedesc, SetServicedesc] = useState("");
    const [head, sethead] = useState("ADD ServiceLine Information")
    const [issave, setissave] = useState(false);
    const [issavee, setissavee] = useState(false);
    const [issaveee, setissaveee] = useState(false);
    const [issaveeee, setissaveeee] = useState(false);


    const [companyid, setCompanyid] = useState(0);
       const[BusinessUnitId,setBusinessUnitId]=useState("")
    // const toast = useRef();


    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const selectBusiness=useSelector((state:RootState)=>state.businessunit)
    const selectcompany=useSelector((state:RootState)=>state.company)

    const  getdropdownbusinesslems=()=>{
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


    const getdropdownelemns=()=>{
        var Companyoptions:  ICompanyoptions[]  =[]
        selectcompany.forEach(e => {

            Companyoptions.push({
            key:e.CompanyId,
            label:e.CompanyName,
            value:e.CompanyId
        })});

        return Companyoptions
    }



//"BusinessUnitId": 1,
//"CompanyId": 1,//

    const getdropdownactiveelemns=()=>{
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

    // const getdropdownactiveebusinesslems=()=>{
    //     var BusinessUnitoptions:  IBusinessUnitoptions[]  =[]
    //     selectBusiness.forEach(e => {
    //     if(e.Active==true){
    //         console.log(companyid)
    //         console.log(BusinessUnitId)
    //         BusinessUnitoptions.push({
    //             key:e. BusinessUnitId,
    //             label:e. BusinessUnitName,
    //             value:e. BusinessUnitId
    //         })}});


    // return  BusinessUnitoptions
    // }

    const getdropdownactiveebusinesslems=()=>{
        var BusinessUnitoptions:  IBusinessUnitoptions[]  =[],Companyoptions:  ICompanyoptions[]  =[]
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
























    const servicelinedata= useSelector((state: RootState) => state.serviceline);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getservicelineaction());

    }, []);

    useEffect(()=>{
        dispatch(getcompaniesaction());
        getdropdownelemns()
        getdropdownactiveelemns()
    },[])
    useEffect(()=>{
        dispatch(getbusinessunitsaction());
        getdropdownbusinesslems()
        //getdropdownactiveebusinesslems()
    },[])


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
        setissaveee(false)
        setissaveeee(false)


        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Serivce Line</h2>
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

                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setBusinessUnitId("");
                        setCompanyid(0);
                        SetServicename("");
                        SetServiceAcronym("");
                        SetServicedesc("");
                        setActive(true);
                        setProductDialog(true);
                    }}
                />
            </div>
        );
    };

    const businessunittemplate=(data)=>{
        var BusinessUnitoptions=getdropdownbusinesslems()
                var businessunitid=data.BusinessUnitId
                var businessunitstr=''
                BusinessUnitoptions.forEach(e => {
                    if(e.value== businessunitid)
                    businessunitstr=e.label
                });
                return(
                    <div>

                        {businessunitstr}
                    </div>
                )
            }
            // const getdropdownvalindialog=( BusinessUnitId:string)=>{
            //     var  BusinessUnitoptions=getdropdownelems()
            //     BusinessUnitoptions.forEach(e => {
            //     if(e.label== BusinessUnitId)return "L"
            //    });
            //     return "notexist"
            // }


            const companytemplate=(data)=>{
                var  Companyoptions=getdropdownelemns()
                        var companyid=data.CompanyId
                        var companystr=''
                        Companyoptions.forEach(e => {
                            if(e.value== companyid)
                            companystr=e.label
                        });
                        return(
                            <div>

                                {companystr}
                            </div>
                        )
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
                        SetServiceId(data.ServiceLineId)
                        setCompanyid(data.CompanyId)
                        setBusinessUnitId(data.BusinessUnitId)
                        SetServicename(data.ServiceLineName);
                        SetServiceAcronym(data.Acronym);
                        SetServicedesc(data.ServiceLineDesc);
                        setActive(data.Active);
                        sethead("Edit Service Line Information");
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
                    setissave (true);
                    setissavee (true);
                    setissaveee(true);
                    setissaveeee(true);
                    // console.log(companyname);
                    // console.log(companydesc);
                    // console.log(active);
                    var c = {
                        ServiceLineId:ServiceId,
                        CompanyId:companyid,
                        BusinessUnitId:BusinessUnitId,
                        Acronym:ServiceAcronym,
                        ServiceLineName: Servicename,
                        ServiceLineDesc: Servicedesc,
                        Active: active,
                        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    };
                    if(companyid!&&BusinessUnitId!&&Servicename!&&ServiceAcronym!="")
                    {
                    if (editmode === false){
                        dispatch(createservicelineaction(c));
                    } else {
                        dispatch(updateservicelineaction(c));
                    }
                    setProductDialog(false);}
                    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added Successfully', life: 3000 });
                    // axios.post("http://10.154.155.135:8000/api/company");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="Manage ServiceLine">
               {/* <Toast ref={toast} /> */}
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={servicelinedata}showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["ServiceLineName", "Acronym", "ServiceLineDesc","Active"]} filters={filters2} header={Headercomp}>
                    <Column field="CompanyId" header="Company Name" body={companytemplate} sortable></Column>

                    <Column field="BusinessUnitId" header="Businessunit Name " body={businessunittemplate} sortable></Column>


                        <Column field="ServiceLineName" header="Service Line Name" sortable></Column>
                        <Column field="Acronym" header="Acronym" sortable></Column>

                        <Column field="ServiceLineDesc" header="Service Line Description" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>


                <div className="field">
                <label htmlFor="companyname">Company Name</label>
                {/* <Dropdown value={companyid}   options={!editmode?getdropdownactiveelemns():getdropdownelemns()} onChange={(e) => setCompanyid(e.value)} placeholder="Select a Company"/> */}

                <Dropdown className={ issave==true&&companyid==0?"p-invalid":"p-valid"} value={companyid}  options={!editmode?getdropdownactiveelemns(): getdropdownelemns()}   id="companyid" onChange={(e) => {setCompanyid(e.value);   }}   placeholder="Select a Company"/>
           { issave==true&&companyid==0 && <small className="p-error">*Company Name  is Required.</small>}
                </div>


                <div className="field">
                <label htmlFor="">Businessunit Name</label>

                <Dropdown className={ issavee==true&&BusinessUnitId==""?"p-invalid":"p-valid"} value={BusinessUnitId}  options={!editmode? getdropdownactiveebusinesslems():getdropdownbusinesslems()}   id="BusinessUnitId" onChange={(e) => setBusinessUnitId(e.value)}   placeholder="Select a Businessunit"/>
           { issavee==true&&BusinessUnitId=="" && <small className="p-error">*Businessunit Name  is Required.</small>}
                </div>


                    <div className="field">
                        <label htmlFor="Servicename<">ServiceName</label>

<InputText className={ issaveee==true&&Servicename==""?"p-invalid":"p-valid"} maxLength={50} placeholder={Servicename==""?"":""} id=" CompanyName" onChange={(e) =>  SetServicename(e.target.value)} value={Servicename}></InputText>
                        { issaveee==true&&Servicename=="" && <small className="p-error">*ServiceName is Required.</small>}
                        <br/>
                        <br />
                        <div className="field">
                            <label htmlFor="ServiceAcronym">Service Acronym</label>
                            <InputText className={ issaveeee==true&&ServiceAcronym==""?"p-invalid":"p-valid"} maxLength={4} placeholder={ServiceAcronym==""?"":""} id="ServiceAcronym" onChange={(e) =>  SetServiceAcronym(e.target.value)} value={ServiceAcronym}></InputText>
                        { issaveeee==true&&ServiceAcronym=="" && <small className="p-error">*ServiceAcronym is Required.</small>}


                        </div>



                        <div className="field">
                            <label htmlFor="Servicedesc">Service Description</label>
                            <InputTextarea id="Servicedesc"  maxLength={500} onChange={(e) => SetServicedesc(e.target.value)} value={Servicedesc}></InputTextarea>
                        </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
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

// export default React.memo(ServiceLine, comparisonFn);
export default React.memo(ServiceLine)
