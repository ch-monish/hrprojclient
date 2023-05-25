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
import { getexperiencelevelsaction, createexperiencelevelaction, updateexperiencelevelaction, ExperienceLevel } from "../features/ExperienceLevel/experiencelevelslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Slider } from 'primereact/slider';

import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
// import '../../index.css';
const ManageExperiencelevel = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [experiencelevelid, setexperiencelevelid] = useState(0);
    const [experiencelevel, setexperiencelevel] = useState("");
    const [experiencelevelrange, setexperiencelevelrange] = useState(0);
    const [issave, setissave] = useState(false)
    const [active, setActive] = useState<boolean>(true);
    const [rangeValues, setRangeValues] = useState([0,1]);
    const [head, sethead] = useState(" ADD Manage Experience Lvel");

    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const experiencelevelsdata = useSelector((state: RootState) => state.experiencelevel);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getexperiencelevelsaction());
        console.log("getexperiencelevelaction")

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
                <h3>Manage Experience Level</h3>
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
                        // setexperiencelevelrange(0);
                        setexperiencelevel("");
                        setActive(true);
                        setRangeValues([0,35])
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
                        // setexperiencelevelrange(0);
                        setRangeValues([0,35])
                        setexperiencelevel("");
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
                <h2>Manage experience level</h2>
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
                        setexperiencelevelid(data.ExperienceLevelId);
                        // setexperiencelevelrange(data.ExperienceRange);
                        setRangeValues([data.Min_Experience,data.Max_Experience])
                        // setRangeValues([0,35])
                        setexperiencelevel(data.ExperienceLevel);
                        setActive(data.Active);
                        sethead("Edit Manage Experience Level");

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
                    console.log(experiencelevel);
                    console.log(rangeValues);
                    console.log(active);
                    var temp = rangeValues
                    var c = {
                        ExperienceLevelId: experiencelevelid,
                        ExperienceLevel: experiencelevel,

                        Min_Experience: temp[0],

                        Max_Experience: temp[1],
                        Active: active,

                    };
                    if (experiencelevel != "") {
                    if (editmode === false) {
                        dispatch(createexperiencelevelaction(
                            {
                                ExperienceLevel: experiencelevel,

                                Min_Experience: temp[0],

                                Max_Experience: temp[1],
                                Active: active,

                            }
                        ));
                    } else {
                        dispatch(updateexperiencelevelaction(c));
                    }
                    setProductDialog(false);
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
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="ManageExperienceLevel">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <Card>
                    <DataTable value={experiencelevelsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["ExperienceLevel", "Minimum Experience", "Maximum Experience", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="ExperienceLevel" header="Experience Level " sortable></Column>
                        <Column field="Min_Experience" header="Minimum Experience " sortable dataType="number" body={e=><div>{e.Min_Experience}</div>}></Column>
                        <Column field="Max_Experience" header="Maximum Experience" sortable dataType="number" body={e=><div>{e.Max_Experience}</div>}></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Experience Levels Information ":"Add Experience Levels Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="ExperienceLevel<">Experience Level </label>
                        <InputText className={issave == true && experiencelevel == "" ? "p-invalid" : "p-valid"} placeholder={experiencelevel == "" ? "" : ""} id=" ExperienceLevel" onChange={(e) => setexperiencelevel(e.target.value)} value={experiencelevel}></InputText>
                        {issave == true && experiencelevel == "" && <small className="p-error">Experience Level is required.</small>}
                        <br />
                        <br />
                        <div className="field">
                        <label htmlFor="MinimumExperienceRange"> Experience Range</label>
                            {"["+rangeValues[0]+","+rangeValues[1]+"]"}
                            {/* <Slider value={sliderValue as number} onChange={(e) => setSliderValue(e.value as number)} /> */}
                            <Slider min={0} max={35} step={1} onChange={(e) => { setRangeValues(e.value) }} value={rangeValues}  range />
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

// export default React.memo(ManageExperiencelevel, comparisonFn);
export default ManageExperiencelevel
