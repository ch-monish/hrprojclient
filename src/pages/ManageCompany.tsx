import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment, useRef } from "react";
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
import { getcompaniesaction, createcompanyaction, updatecompanyaction, Company } from "../features/Company/companyslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { Card } from "primereact/card";

// import '../../index.css';
const ManageCompany = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [companyid, setCompanyid] = useState(0);
    const [companyname, setCompanyname] = useState("");
    const [companydesc, setCompanydesc] = useState("");
    const [issave, setissave] = useState(false);
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const companiesdata = useSelector((state: RootState) => state.company);
    const toastdata = useSelector((state: RootState) => state.toaster);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcompaniesaction());

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
                <h2>Manage Company</h2>
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
                        setCompanydesc("");
                        setCompanyname("");
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
                        setCompanydesc("");
                        setCompanyname("");
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
                <h2>Manage Company</h2>
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
                        setCompanyid(data.CompanyId);
                        setCompanydesc(data.CompanyDesc);
                        setCompanyname(data.CompanyName);
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
                    console.log(companyname);
                    console.log(companydesc);
                    console.log(active);
                    var c = {
                        CompanyId: companyid,
                        CompanyName: companyname,
                        CompanyDesc: companydesc,
                        Active: active,
                    };
                    if(companyname!="")
                    {
                    if (editmode === false) {
                        dispatch(createcompanyaction(c));
                    } else {
                        dispatch(updatecompanyaction(c));
                    }
                    // console.log(toastdata.status)
                    toastdata.status!="error"?
                    setProductDialog(false):console.log();
                }
                    // axios.post("http://10.154.155.135:8000/api/company");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        // return <div>{body.Active?.toString()}</div>;
        return <div>{body.Active ? "Yes" : "No"}</div>;
    };
    return (
        <div className="ManageCompany">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={companiesdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["CompanyName", "CompanyDesc", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="CompanyName" header="Company Name" sortable></Column>
                        <Column field="CompanyDesc" header="Company Desc" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} position="top"  keepInViewport={false}style={{ width: "450px" }} header={editmode?"Edit Companys Information ":"Add Companys Information " }footer={productDialogFooter} modal className="p-fluid"  onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="CompanyName<">Company Name</label>
                        <InputText className={ issave==true&&companyname==""?"p-invalid":"p-valid"} placeholder={companyname==""?"":""} id=" CompanyName" onChange={(e) => setCompanyname(e.target.value)} value={companyname}></InputText>
                        { issave==true&&companyname=="" && <small className="p-error">*Company Name is required.</small>}

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="CompanyDesc">Company Description</label>
                            <InputTextarea id="CompanyDesc" onChange={(e) => setCompanydesc(e.target.value)} value={companydesc}></InputTextarea>

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

// export default React.memo(ManageCompany, comparisonFn);


export default  ManageCompany




