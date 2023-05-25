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
import { getBandaction, createBandaction, updateBandaction, Band } from "../features/Band/Bandslice";
import { useDispatch } from "react-redux";
// import { Toast } from 'primereact/toast';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { Card } from "primereact/card";
// import '../../index.css';
const ManageBand = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [Bandid, setBandid] = useState(0);
    const [Bandname, setBandname] = useState("");
    const [Banddesc, setBanddesc] = useState("");
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [head, sethead] = useState(" ADD Manage Band");
    const [issave, setissave] = useState(false);
    // const toast = useRef(null);
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const Banddata = useSelector((state: RootState) => state.Band);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBandaction());
        console.log("getbandaction")
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
                <h2>Manage Band</h2>
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
                        setBanddesc("");
                        setBandname("");
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
                        setBandid(data.BandId);
                        setBandname(data.BandName);
                        setBanddesc(data.BandDesc);
                        setActive(data.Active);
                        sethead("Edit Manage Band")
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
                    console.log(Bandname);
                    console.log(Banddesc);
                    console.log(active);
                    var c = {
                        BandId: Bandid,
                        BandName: Bandname,
                        BandDesc: Banddesc,
                        Active: active,
                    };
                    if(Bandname!="")
                    {
                    if (editmode === false) {
                        dispatch(createBandaction( {
                            BandName: Bandname,
                            BandDesc: Banddesc,
                            Active: active,
                        }));
                    } else {
                        dispatch(updateBandaction(c));
                    }
                    setProductDialog(false);}
                    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added Successfully', life: 3000 });
                    // axios.post("http://10.154.155.135:8000/api/Band");
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
        <div className="ManageBand">
             {/* <Toast ref={toast} /> */}
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={Banddata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["BandName", "BandDesc", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="BandName" header="Band Name" sortable></Column>
                        <Column field="BandDesc" header="Band Description" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="BandName<">Band Name</label>
                        <InputText className={ issave==true&&Bandname==""?"p-invalid":"p-valid"} placeholder={Bandname==""?"":""} id="BandName" onChange={(e) => setBandname(e.target.value)} value={Bandname}></InputText>
                        { issave==true&&Bandname=="" && <small className="p-error">*Band Name is Required.</small>}
                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="BandDesc">Band Description</label>
                            <InputTextarea id="BandDesc"  maxLength={10} onChange={(e) => setBanddesc(e.target.value)} value={Banddesc}></InputTextarea>
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

// export default React.memo(ManageBand, comparisonFn);
export default ManageBand;
