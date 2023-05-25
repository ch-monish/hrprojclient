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
import { getsubbandsaction, createsubbandaction, updatesubbandaction, SubBand } from "../features/SubBand/subbandslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { getBandaction, IBandoptions } from "../features/Band/Bandslice";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

// import '../../index.css';
const ManageSubband = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [BandID, SetBandID] = useState("");
    const [subbandid, setsubbandid] = useState(0);
    const [subbandname, setsubbandname] = useState("");
    const [bandname, setbandname] = useState("");
    const [subbanddesc, setsubbanddesc] = useState("");
    const [issave, setissave] = useState(false);
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [Band, SetBand] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const selectbands = useSelector((state: RootState) => state.Band)


    const getdropdownelems = () => {
        var bandoptions: IBandoptions[] = []
        selectbands.forEach(e => {

            bandoptions.push({
                key: e.BandId,
                label: e.BandName,
                value: e.BandId
            })
        });

        return bandoptions
    }
    const getdropdownactiveelems = () => {
        var bandoptions: IBandoptions[] = []
        selectbands.forEach(e => {
            if (e.Active == true) {
                bandoptions.push({
                    key: e.BandId,
                    label: e.BandName,
                    value: e.BandId
                })
            }
        });
console.log(bandoptions)
        return bandoptions
    }
    const SelectBand = [
        { label: 's1', value: 's1' },
        { label: 's2', value: 's2' },
        { label: 's3', value: 's3' },
        { label: 's4', value: 's4' }
    ];



    const subbandsdata = useSelector((state: RootState) => state.subband);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getsubbandsaction());
    }, []);
    useEffect(() => {
        dispatch(getBandaction());
        getdropdownelems()
        getdropdownactiveelems()
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
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Sub Band</h2>
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
                        SetBandID("");
                        setsubbanddesc("");
                        setsubbandname("");
                        setbandname("");
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
                        setsubbanddesc("");
                        setsubbandname("");
                        setbandname("");
                        setActive(true);

                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };
    const bandtemplate = (data) => {
        var bandoptions = getdropdownelems()
        var bandid = data.BandId
        var bandstr = ''
        bandoptions.forEach(e => {
            if (e.value == bandid)
                bandstr = e.label
        });
        return (
            <div>

{bandstr}
            </div>
        )
    }
    const getdropdownvalindialog = (BandID: string) => {
        var bandoptions = getdropdownelems()
        bandoptions.forEach(e => {
            if (e.label == BandID) return "L"
        });
        return "notexist"
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h2>Manage Sub Band</h2>
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
                        console.log(data)
                        setsubbandid(data.SubBandId);
                        SetBandID(data.BandId);
                        setsubbanddesc(data.SubBandDesc);
                        setsubbandname(data.SubBandName);
                        setbandname(data.BandName);
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
                    console.log(subbandname);
                    console.log(bandname);
                    console.log(subbanddesc);
                    console.log(active);
                    console.log(subbandid);
                    console.log(BandID);
                    var c = {
                        SubBandId: subbandid,
                        BandName: bandname,
                        BandId:BandID,
                        SubBandName: subbandname,
                        SubBandDesc: subbanddesc,
                        Active: active,
                    };
                    if(subbandname!="")
                    {
                    if (editmode === false) {
                        dispatch(createsubbandaction(
                            {
                                BandId:BandID,
                            SubBandName: subbandname,
                            SubBandDesc: subbanddesc,
                            Active: active,
                        }));
                    } else {
                        dispatch(updatesubbandaction(c));
                    }
                    setProductDialog(false);
                    // axios.post("http://10.154.155.135:8000/api/company");
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
        <div className="ManageSubBand">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={subbandsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["SubBandName", "SubBandDesc", "Active"]} filters={filters2} header={Headercomp}>
                    <Column field="BandID" header="Band" body={bandtemplate} sortable></Column>

                        <Column field="SubBandName" header="Sub Band Name" sortable></Column>
                        {/* <Column field="BandName" header="Band Name" sortable></Column> */}
                        <Column field="SubBandDesc" header="Sub Band Description" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Sub Bands Information ":"Add Sub Bands Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                <label htmlFor="BandName">Band Name*</label>
                            {/* <InputText id=" BandName" onChange={(e) => setbandname(e.target.value)} value={bandname}></InputText> */}
{console.log(BandID)}
                            <Dropdown className={ issave==true&&BandID==""?"p-invalid":"p-valid"} value={BandID}  options={!editmode?getdropdownactiveelems():getdropdownelems()} optionValue="value"  optionLabel="label" id="BandID" onChange={(e) => SetBandID(e.value)}   placeholder="Select  Band Name"/>

                            { issave==true&&BandID=="" && <small className="p-error">*Band Name  is Required.</small>}
{/* <Dropdown value={BandID} options={!editmode?getdropdownactiveelems():getdropdownelems()} onChange={(e) => SetBandID(e.value)} placeholder="Select a Band"/> */}


                    <div className="field">
                    <label htmlFor="SubBandName<">Sub Band Name*</label>
                        {/* <InputText id=" SubBandName" onChange={(e) => setsubbandname(e.target.value)} value={subbandname}></InputText> */}
                        <InputText className={ issave==true&&subbandname==""?"p-invalid":"p-valid"} placeholder={subbandname==""?"":""} id=" SubBandName" onChange={(e) => setsubbandname(e.target.value)} value={subbandname}></InputText>
                        { issave==true&&subbandname=="" && <small className="p-error">*Sub Band Name is required.</small>}

                            <br />
                        <br />
                        <div className="field">
                            <label htmlFor="SubBandDesc">Sub Band Description</label>
                            <InputTextarea id="SubBandDesc" onChange={(e) => setsubbanddesc(e.target.value)} value={subbanddesc}></InputTextarea>
                              </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
                        </div>
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

// export default React.memo(ManageSubband, comparisonFn);
export default ManageSubband;
