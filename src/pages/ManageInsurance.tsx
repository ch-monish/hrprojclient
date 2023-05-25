import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect,useRef,Fragment } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { InputNumber } from 'primereact/inputnumber';



import { Checkbox } from "primereact/checkbox";
// import { Dropdown } from 'primereact/dropdown';

import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

import {getInsuranceaction,createInsuranceaction,updateInsuranceaction} from "../features/ManageInsurance/ManageInsuranceslice";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
// import { classNames } from 'primereact/utils';
import { getBandaction,IBandoptions } from "../features/Band/Bandslice";
import {getactivebandoptions,getallbandoptions} from "../features/Band/BandSelector"

// import {store} from "../app/store"
// import '../../index.css';
const ManageInsurance = (props) => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [InsuranceAccidentLimitId, SetInsuranceAccidentLimitId] = useState(0);


    //drop down//
    const [BandID, SetBandID] = useState("");
    const [Insurance, SetInsurance] = useState("");
    const [Accident, SetAccident] = useState("");
    const [issave, setissave] = useState(false);
    const [valuers, setValuers] = useState<number>(0);
    // const [submitted, setSubmitted] = useState(false);
    // const [value1, setValue] = useState("000");



    const [InsuranceLimit, SetInsuranceLimit] = useState(2);
    const [AccidentLimit, SetAccidentLimit] = useState(2);


    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [Band, SetBand] = useState("");
    const [head, sethead] = useState(" ADD  Manage Insurance")


    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
// const selectbands=useSelector((state:RootState)=>state.Band)


// const getdropdownelems=()=>{
//     var bandoptions:IBandoptions[]  =[]
// selectbands.forEach(e => {

//     bandoptions.push({
//         key:e.BandId,
//         label:e.BandName,
//         value:e.BandId
//     })});

// return bandoptions
// }
// const getdropdownactiveelems=()=>{
//     var bandoptions:IBandoptions[]  =[]
// selectbands.forEach(e => {
//     if(e.Active==true){
//     bandoptions.push({
//         key:e.BandId,
//         label:e.BandName,
//         value:e.BandId
//     })}});

// return bandoptions
// }
    const servicelinedata= useSelector((state: RootState) => state.Insurance);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getInsuranceaction());

    }, []);
    useEffect(()=>{
        dispatch(getBandaction());

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
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Insurance</h2>


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
                        SetInsuranceLimit(0);
                        SetAccidentLimit(0);
                        setActive(true);
                        setProductDialog(true);
                    }}
                />
            </div>
        );
    };
    const bandtemplate=(data)=>{

var bandoptions=props.getallbandoptionsprop
        var bandid=data.BandId
        var bandstr=''
        bandoptions.forEach(e => {
            if(e.value==bandid)
            bandstr=e.label
        });
        return(
            <div>

                {bandstr}
            </div>
        )
    }
    // const getdropdownvalindialog=(BandID:string)=>{
    //     var bandoptions=getdropdownelems()
    //    bandoptions.forEach(e => {
    //     if(e.label==BandID)return "L"
    //    });
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
                        SetInsuranceAccidentLimitId(data.InsuranceAccidentLimitId)
                        SetBandID(data.BandId);
                        SetInsuranceLimit(data.InsuranceLimit);
                        SetAccidentLimit(data.AccidentLimit);
                        setActive(data.Active);
                        sethead("Edit Manage Insurance")
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
                    // console.log(companyname);
                    // console.log(companydesc);
                    // console.log(active);
                    var c = {
                        InsuranceAccidentLimitId:InsuranceAccidentLimitId,
                        BandId:BandID,
                        InsuranceLimit:InsuranceLimit,
                        AccidentLimit:AccidentLimit,
                        Active:active,

                    };
                    if(BandID!="")
                    {
                    if (editmode === false) {
                        dispatch(createInsuranceaction(c));
                    } else {
                        dispatch(updateInsuranceaction(c));
                    }
                    setProductDialog(false);}
                    // axios.post("http://10.154.155.135:8000/api/company");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );

    const actionAverageTemplate = (rowData:any) => {
        return formatCurrency1(rowData.InsuranceLimit);
      }

      const formatCurrency1 = (value:any) => {
      return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:2 });
      }



    const actionAverageTemplate1 = (rowData:any) => {
        return formatCurrency(rowData.AccidentLimit);
      }

      const formatCurrency = (value:any) => {
      return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:2 });
      }

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="Manage ServiceLine">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <DataTable value={servicelinedata}showGridlines={false}responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["BandID", "InsuranceLimit", "AccidentLimit","Active"]} filters={filters2} header={Headercomp}>

                        <Column field="BandID" header="Band Name" body={bandtemplate} sortable></Column>



                        <Column field="InsuranceLimit" header="Insurance Limit"    body={actionAverageTemplate} sortable  ></Column>
                        <Column field="AccidentLimit" header="Accident Limit"  body={actionAverageTemplate1} sortable ></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>




                    <div className="field">
                        <label htmlFor="BandID">Band Name</label>
                        {/* <InputText id="BandID" onChange={(e) => SetBandID(e.target.value)} value={BandID}></InputText> */}
                        <Dropdown className={ issave==true&&BandID==""?"p-invalid":"p-valid"} value={BandID} options={!editmode?props.getallbandoptionsprop:props.getactivebandoptionsprop}   id="BandID" onChange={(e) => SetBandID(e.value)}   placeholder="Select  Band Name"/>
           { issave==true&&BandID=="" && <small className="p-error">*Band Name  is Required.</small>}


                        <br />
                        <br />
                        <div className="field">
<label htmlFor="currency-india">Insurance Limit</label>
                        <InputNumber inputId="currency-india" value={InsuranceLimit} onValueChange={(e) => SetInsuranceLimit(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN"/>
                    </div>
                        <div className="field">

                        <label htmlFor="currency-india">Accident Limit</label>
                        <InputNumber inputId="currency-india" value={AccidentLimit} onValueChange={(e) => SetAccidentLimit(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN"/>
                        </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="Active"> Active</label>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
function mapStateToProps(state) {

    // const { todos } = state
    console.log(state)
    return {
        getallbandoptionsprop:getactivebandoptions(state),
        getactivebandoptionsprop:getallbandoptions(state)

    }
  }
// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo( connect(mapStateToProps)(ManageInsurance), comparisonFn);



export default connect(mapStateToProps)(ManageInsurance)






// ServiceLineId": 1,
//         "ServiceLineName": "abd",
//         "Acronym": "jap",
//         "ServiceLineDesc": "a",
//         "Active": true
