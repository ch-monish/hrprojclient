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
import { getDepartmentsaction, updateDepartmentsaction } from "../features/Departments/Departmentsslice";
import { Card } from "primereact/card";

// import '../../index.css';
const ManageDepartment = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [Id, setId] = useState(0);
    const [departmentname, setdepartmentname] = useState("");
    const [email, setemail] = useState("");
    const [issave, setissave] = useState(false);
    // const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const departmentssdata = useSelector((state: RootState) => state.Departments);
    const toastdata = useSelector((state: RootState) => state.toaster);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartmentsaction());

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
                <h2>Manage Departments</h2>
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

                {/* <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setdepartmentname("")
                        setemail("")
                        setProductDialog(true);
                    }}
                /> */}
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
                        setdepartmentname("")
                        setemail("")

                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h2>Manage Departments</h2>
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
                        setId(data.Id)
                        setdepartmentname(data.Department)
                        setemail(data.Email)
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
                    console.log(departmentname);
                    console.log(email);
                    var c = {
                        Id: Id,
                        Department: departmentname,
                        Email: email
                    };
                    if(departmentname!="")
                    {
                    if (editmode === false) {
                        // dispatch(createcompanyaction(c));
                    } else {
                        dispatch(updateDepartmentsaction(c));
                    }
                    // console.log(toastdata.status)
                    toastdata.status!="error"?
                    setProductDialog(false):console.log();
                }
                    // axios.post("http://10.154.155.135:8000/api/yy");
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
        return <div>{body.Active?.toString()}</div>;
    };
    return (
        <div className="ManageDepartment">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={departmentssdata.filter((i)=>i.Department!="BGV")} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["Department", "Email"]} filters={filters2} header={Headercomp}>
                        <Column field="Department" header="Department" sortable></Column>
                        <Column field="Email" header="Email" sortable></Column>
                        {/* <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column> */}
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} position="top"  keepInViewport={false}style={{ width: "450px" }} header={editmode?"Edit Department Information ":"Add Department Information " }footer={productDialogFooter} modal className="p-fluid"  onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="CompanyName<">Department Name</label>
                        <InputText disabled className={ issave==true&&departmentname==""?"p-invalid":"p-valid"} placeholder={departmentname==""?"":""} id=" CompanyName" onChange={(e) => setdepartmentname(e.target.value)} value={departmentname}></InputText>
                        { issave==true&&departmentname=="" && <small className="p-error">*Department Name is required.</small>}

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="email">Email </label>
                            <InputText id="email" onChange={(e) => setemail(e.target.value)} value={email}></InputText>

                        </div>

                        {/* <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
                        </div> */}
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


export default  ManageDepartment




