import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";

import axios from "axios";

import { Checkbox } from "primereact/checkbox";

import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import Counter from "./Counter";
import QuotesComp from "./QuotesComp";
import { getcustomersaction, createcustomeraction, updatecustomeraction, Customer } from "../features/Customer/customerslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { Card } from "primereact/card";

// import { Toast } from 'primereact/toast';
// import '../../index.css';
const ManageCustomer = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [customerid, setCustomerid] = useState(0);
    const [customername, setCustomername] = useState("");
    const [customerdesc, setCustomerdesc] = useState("");
    const [acronym, setAcronym] = useState("");
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [issave, setissave] = useState(false);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    // const toast = useRef();
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const customersdata = useSelector((state: RootState) => state.customer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcustomersaction());
    }, []);

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setissave(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Customer</h2>
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
                        setCustomerdesc("");
                        setCustomername("");
                        setAcronym("");
                        setActive(true);

                        setProductDialog(true);
                    }}
                />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Headercomp />
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setCustomerdesc("");
                        setCustomername("");
                        setAcronym("");
                        setActive(true);

                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h2>Manage Customer</h2>
            </React.Fragment>
        );
    };
    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(true);
                        // console.log(rowdata)
                        setCustomerid(data.CustomerId);
                        setCustomerdesc(data.CustomerDesc);
                        setCustomername(data.CustomerName);
                        setAcronym(data.Acronym);
                        setActive(data.Active);
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
                    console.log(customername);
                    console.log(customerdesc);
                    console.log(acronym);
                    console.log(active);
                    var c = {
                        CustomerId: customerid,
                        CustomerName: customername,
                        CustomerDesc: customerdesc,
                        Acronym: acronym,
                        Active: active,
                    };
                    if(customername!="" && acronym != "")
                    {
                    if (editmode === false) {
                        dispatch(createcustomeraction(c));
                    } else {
                        dispatch(updatecustomeraction(c));
                    }
                    setProductDialog(false);
                    // axios.post("http://10.154.155.135:8000/api/customer");
                    // hideDialog();
                }}
                }/>
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="ManageCustomer">

            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={customersdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["CustomerName", "CustomerDesc", "Acronym", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="CustomerName" header="Customer Name" sortable></Column>
                        <Column field="CustomerDesc" header="Customer Description" sortable></Column>
                        <Column field="Acronym" header="Acronym" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Customers Information ":"Add Customers Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                    <label htmlFor="CustomerName<">Customer Name*</label>
                        {/* <InputText id=" CustomerName" onChange={(e) => setCustomername(e.target.value)} value={customername}></InputText> */}
                        <InputText className={ issave==true&&customername==""?"p-invalid":"p-valid"} placeholder={customername==""?"":""} id=" CustomerName" onChange={(e) => setCustomername(e.target.value)} value={customername}></InputText>
                        { issave==true&&customername=="" && <small className="p-error">Customer Name is required*</small>}
                         <br />
                        <br />
                        <div className="field">
                            <label htmlFor="CustomerDesc">Customer Description</label>
                            <InputTextarea id="CustomerDesc"  maxLength={500} onChange={(e) => setCustomerdesc(e.target.value)} value={customerdesc}></InputTextarea>
                        </div>
                        <div className="field">
                            <label htmlFor="Acronym">Acronym</label>
                            <InputText id="Acronym" className={ issave==true&&acronym==""?"p-invalid":"p-valid"}  maxLength={4} onChange={(e) => setAcronym(e.target.value)} value={acronym}></InputText>
                            { issave==true&&acronym=="" && <small className="p-error">Acronym is required*</small>}
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

// export default React.memo(ManageCustomer, comparisonFn);
export default ManageCustomer;
