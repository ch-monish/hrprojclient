
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
import { getbusinessunitsaction, createbusinessunitaction, updatebusinessunitaction, } from "../features/BusinessUnit/businessunitslice";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { getcompaniesaction, Company, ICompanyoptions } from "../features/Company/companyslice";
import { Dropdown } from "primereact/dropdown";
import { getHRRoleUsers } from "../features/BusinessUnit/businessunitselector";
import { usersbyroles } from "../features/JobPostActions/usersbyrolesslice";
import { Card } from "primereact/card";

// import '../../index.css';
const ManageBusinessunit = (props) => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [businessunitid, setbusinessunitid] = useState(0);
    const [CompanyID, SetCompanyID] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [businessunitname, setbusinessunitname] = useState("");
    const [businessunitdesc, setbusinessunitdesc] = useState("");
    const [BusinessUnitAcronym, SetBusinessUnitAcronym] = useState("");

    const [issave, setissave] = useState(false);
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [issaveeee, setissaveeee] = useState(false);

    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const selectcompanynames = useSelector((state: RootState) => state.company)
    const toastdata = useSelector((state: RootState) => state.toaster);
    const [HR, SetHR] = useState("");

    const getdropdownelems = () => {
        var companyoptions: ICompanyoptions[] = []
        selectcompanynames.forEach(e => {

            companyoptions.push({
                key: e.CompanyId,
                label: e.CompanyName,
                value: e.CompanyId
            })
        });

        return companyoptions
    }
    const getdropdownactiveelems = () => {
        var companyoptions: ICompanyoptions[] = []
        selectcompanynames.forEach(e => {
            if (e.Active == true) {
                companyoptions.push({
                    key: e.CompanyId,
                    label: e.CompanyName,
                    value: e.CompanyId
                })
            }
        });

        return companyoptions
    }
    const SelectCompanyName = [];




    const businessunitsdata = useSelector((state: RootState) => state.businessunit);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getbusinessunitsaction());
    }, []);
    useEffect(() => {
        dispatch(getcompaniesaction());
        getdropdownelems()
        getdropdownactiveelems()
        dispatch(usersbyroles())
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
        setissaveeee(false);
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h2>Manage Business Unit</h2>
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
                        setbusinessunitdesc("");
                        setbusinessunitname("");
                        SetBusinessUnitAcronym("");
                        SetHR("");
                        SetCompanyID("");
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
                        setbusinessunitdesc("");
                        SetCompanyID("");
                        setbusinessunitname("");
                        SetHR("");
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
                <h2>Manage business Unit</h2>
            </React.Fragment>
        );
    };
    const companytemplate = (data) => {
        var companyoptions = getdropdownelems()
        var companyid = data.CompanyId
        var companystr = ''
        companyoptions.forEach(e => {
            if (e.value == companyid)
                companystr = e.label
        });
        return (
            <div>

                {companystr}
            </div>
        )
    }
    // const getdropdownvalindialog = (CompanyID: string) => {
    //     var companyoptions = getdropdownelems()
    //     companyoptions.forEach(e => {
    //         if (e.label == CompanyID) return "L"
    //     });
    //     return "notexist"
    // }
    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(true);
                        console.log(data)
                        setbusinessunitid(data.BusinessUnitId);
                        SetCompanyID(data.CompanyId)
                        SetBusinessUnitAcronym(data.Acronym);
                        props.getHRRoleUsers.some(i=>i.value==data.HR)?SetHR(data.HR):SetHR("")
                        // props.getHRRoleUsers.includes(data.HR)? SetHR(data.HR):SetHR("");
                        setbusinessunitdesc(data.BusinessUnitDesc);
                        setbusinessunitname(data.BusinessUnitName);
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
                    setissave(true);
                    console.log(businessunitname);
                    console.log(companyname);
                    console.log(businessunitdesc);
                    console.log(HR);
                    console.log(active);
                    var c = {
                        BusinessUnitId: businessunitid,
                        CompanyId: CompanyID,
                        Acronym: BusinessUnitAcronym,
                        HR : HR,
                        BusinessUnitName: businessunitname,
                        BusinessUnitDesc: businessunitdesc,
                        Active: active,
                    };
                    if (businessunitname!= "" && BusinessUnitAcronym != "" && CompanyID != "" && HR != "") {
                        if (editmode === false) {
                            dispatch(createbusinessunitaction(
                                {
                                    CompanyId: CompanyID,
                                    BusinessUnitName: businessunitname,
                                    BusinessUnitDesc: businessunitdesc,
                                    HR : HR,
                                    Acronym: BusinessUnitAcronym,
                                    Active: active,
                                }
                            ));
                        } else {
                            dispatch(updatebusinessunitaction(c));
                        }

                        toastdata.status != "error" ?
                            setProductDialog(false) : console.log();
                        // axios.post("http://10.154.155.135:8000/api/company");
                        // hideDialog();
                    }
                }
                } />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: any) => {
        return <div>{body.Active ? "Yes" : "No"}</div>;
    };
    return (
        <div className="ManageBusinessUnit">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={businessunitsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["CompanyName", "BusinessUnitName", "Acronym", "BusinessUnitDesc","hrname", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="CompanyId" header="Company Name" body={companytemplate} sortable></Column>
                        <Column field="BusinessUnitName" header="Business Unit Name" sortable></Column>
                        <Column field="Acronym" header="Acronym" sortable></Column>
                        <Column field="BusinessUnitDesc" header="Business Unit Description" sortable></Column>
                        <Column field="hrname" header="HR" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode ? "Edit Business Units Information" : "Add Business Units Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <div className="field">
                        <label htmlFor="CompanyName">Company Name *</label>
                        {/* <InputText id=" CompanyName" onChange={(e) => setCompanyname(e.target.value)} value={companyname}></InputText> */}

                        <Dropdown className={issave == true && CompanyID == "" ? "p-invalid" : "p-valid"} value={CompanyID}  options={!editmode ? getdropdownactiveelems() : getdropdownelems()} id="CompanyID" onChange={(e) => SetCompanyID(e.value)} placeholder="Select Company Name" />

                        {issave == true && CompanyID == "" && <small className="p-error">*Company Name is Required.</small>}
                        {/* <Dropdown value={"Belcan India"} options={!editmode?getdropdownactiveelems():getdropdownelems()} onChange={(e) => SetCompanyID(e.value)} placeholder="Select a Company Name"/> */}
                        <br />
                        <label htmlFor="BusinessUnitName<">Business Unit Name *</label>
                        {/* <InputText id=" BusinessUnitName" onChange={(e) => setbusinessunitname(e.target.value)} value={businessunitname}></InputText> */}
                        <InputText className={issave == true && businessunitname == "" ? "p-invalid" : "p-valid"} placeholder={businessunitname == "" ? "" : ""} id=" BusinessUnitName " onChange={(e) => setbusinessunitname(e.target.value)} value={businessunitname}></InputText>
                        {issave == true && businessunitname == "" && <small className="p-error">*Business Unit Name is required.</small>}
                        <br />
                        <br />

                        <div className="field">
                            <label htmlFor="BusinessUnitAcronym">BusinessUnit Acronym *</label>
                            <InputText className={issave == true && BusinessUnitAcronym == "" ? "p-invalid" : "p-valid"} maxLength={4} placeholder={BusinessUnitAcronym == "" ? "" : ""} id="Acronym" onChange={(e) => SetBusinessUnitAcronym(e.target.value)} value={BusinessUnitAcronym}></InputText>
                            {issave == true && BusinessUnitAcronym == "" && <small className="p-error">*BusinessUnit Acronym is Required.</small>}


                        </div>
                        <div className="field">
                            <label htmlFor="BusinessUnitDesc">Business Unit Description</label>
                            <InputTextarea id="BusinessUnitDesc" onChange={(e) => setbusinessunitdesc(e.target.value)} value={businessunitdesc}></InputTextarea>
                        </div>
                        <div className="field">
                            <label htmlFor="hr">HR *</label>
                            <Dropdown className={ issave==true&&HR==""?"p-invalid":"p-valid"}  id="hr" options={props.getHRRoleUsers} onChange={e=>SetHR(e.value)} value={HR} optionLabel="label" placeholder="Select HR" />

                            { issave==true&&HR=="" && <small className="p-error">*HR selection is Required.</small>}


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

// export default React.memo(ManageBusinessunit, comparisonFn);

function mapStateToProps(state) {
    return {

        getHRRoleUsers: getHRRoleUsers(state),

    };
}
export default connect(mapStateToProps)(ManageBusinessunit)
