import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect,useRef } from "react";
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
import { getLocationaction, createLocationaction, updateLocationaction, Location } from "../features/Location/Locationslice";
import { useDispatch } from "react-redux";
// import { Toast } from 'primereact/toast';
import { useSelector } from "react-redux";

import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from 'primereact/dropdown';
import { Card } from "primereact/card";

// import '../../index.css';
const ManageLocation = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [LocationId, setLocationId] = useState(0);
    const [LocationName, setLocationName] = useState("");
    const [Active, setActive] = useState<boolean>(true);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [head, sethead] = useState("ADD Location")
    const [issave, setissave] = useState(false);


    // const toast = useRef();
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const Locationsdata = useSelector((state: RootState) => state.Location);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationaction());
        // console.log(getLocationaction())
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
                <h2>Location Information</h2>
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
                        setLocationName("");
                        setActive(true);
                        setProductDialog(true);
                    }}
                />
            </div>
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
                        setLocationId(data.LocationId);
                        setLocationName(data.LocationName);
                        setActive(data.Active);
                        sethead("Edit Location")
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
                    // console.log(companyname);
                    // console.log(companydesc);
                    // console.log(active);
                    var c = {
                        LocationId:LocationId,
                        LocationName:LocationName,
                        Active:Active,
                    };
                    if(LocationName!="")
                    {
                    if (editmode === false) {
                        dispatch(createLocationaction(c));
                    } else {
                        dispatch(updateLocationaction(c));
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
        <div className="Location">
            {/* <Toast ref={toast} /> */}
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={Locationsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["LocationName", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="LocationName" header="Location Name" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="LocationName<">Location Name</label>
                        {/* <InputText id="LocationName"  maxLength={50} onChange={(e) => setLocationName(e.target.value)} value={LocationName}></InputText> */}
                        <InputText className={ issave==true&&LocationName==""?"p-invalid":"p-valid"}   maxLength={50} placeholder={LocationName==""?"":""} id=" LocationName " onChange={(e) => setLocationName(e.target.value)} value={LocationName}></InputText>
                        { issave==true&&LocationName=="" && <small className="p-error">*Location Name is Required.</small>}

                        <br />
                        <br />
                        <br />
                        <div className="col-12">
                            <Checkbox inputId="Active" checked={Active} onChange={(e) => setActive(!Active)} />
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

// export default React.memo(ManageLocation, comparisonFn);
export default ManageLocation;
