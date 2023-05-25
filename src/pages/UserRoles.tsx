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


import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import Counter from "./Counter";
import QuotesComp from "./QuotesComp";
import { getuserrolesaction, createuserrolesaction, updateuserrolesaction, UserRoles, getadusersaction, getrolesaction } from "../features/UserRoles/userroleslice";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { ICompanyoptions } from "../features/Company/companyslice";
import { userroleoptionsdata } from '../features/UserRoles/userroleoptionsslice';
import { Form, Field } from "react-final-form";
import { Checkbox } from 'primereact/checkbox';
import { getactiveuserroleoptions } from "../features/UserRoles/userroleoptionsselctor";
import { Card } from "primereact/card";
// import '../../index.css';
const UserRoleS = (props) => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [userrolesid, setUserRolesid] = useState(0);
    const [userrolesname, setUserRolesname] = useState("");
    const [userrolesemail, setUserRolesemail] = useState("");
    const [issave, setissave] = useState(false);
    const [UserRolesroles, setUserRolesroles] = useState("");
    const [data, Setdata] = useState([]);
    const [active, setActive] = useState<boolean>(true);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [selectedadusername, setselectedadusername] = useState("");
    const [selectedrolesname, setselectedrolesname] = useState("");
    const selectadusernames = useSelector((state: RootState) => state.userroleoptions)
    const rolesoptions = useSelector((state: RootState) => state.rolesoptions)
    const selectrolesnames = useSelector((state: RootState) => state.rolesoptions)
    console.log(selectadusernames)

    // const getdropdownelems=()=>{
    //     var aduseroptions:IAdUsersoptions[]  =[]
    // selectadusernames.forEach(e => {

    //     aduseroptions.push({
    //         key:e.CompanyId,
    //         label:e.CompanyName,
    //         value:e.CompanyId
    //     })});

    // return aduseroptions
    // }
    // const getdropdownactiveelems=()=>{
    //     var aduseroptions:IAdUseroptions[]  =[]
    // selectadusernames.forEach(e => {
    //     if(e.Active==true){
    //     aduseroptions.push({
    //         key:e.CompanyId,
    //         label:e.CompanyName,
    //         value:e.CompanyId
    //     })}});

    // return aduseroptions
    // }
    const SelectCompanyName = [];
    const [hiringmanager, sethiringmanager] = useState(false)
    const [HR, setHR] = useState(false)
    // const [candidate, setcandidate] = useState(false)
    const [administrator, setadministrator] = useState(false)
    const [businesshead, setbusinesshead] = useState(false)
    const [financecontroller, setfinancecontroller] = useState(false)
    const [generalmanager, setgeneralmanager] = useState(false)

    const userrolesdata = useSelector((state: RootState) => state.userroles);
    const adusersdata = useSelector((state: RootState) => state.userroleoptions);
    const rolesdata = useSelector((state: RootState) => state.rolesoptions);
    console.log(userrolesdata)
    console.log(rolesdata)

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getuserrolesaction());
        dispatch(getadusersaction())

        dispatch(getuserrolesaction())
        // dispatch(getadusersaction());\

    }, []);
    useEffect(() => {
        dispatch(getadusersaction());

    }, [])
    useEffect(() => {
        // dispatch(getuserrolesaction());
        dispatch(getrolesaction())
        // dispatch(getadusersaction());
    }, []);
    useEffect(() => {
        dispatch(getrolesaction());
        console.log(rolesoptions)
        // console.log(selectadusernames)
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
                <h2> User Roles</h2>
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
                        setUserRolesname("");
                        setUserRolesemail("");
                        setUserRolesroles("");


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
                        setUserRolesname("");
                        setUserRolesemail("");
                        setUserRolesroles("");


                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h2> User Roles</h2>
            </React.Fragment>
        );
    };

    // const companytemplate = (data) => {
    //     var companyoptions = getdropdownelems()
    //     var companyid = data.CompanyId
    //     var companystr = ''
    //     companyoptions.forEach(e => {
    //         if (e.value == companyid)
    //             companystr = e.label
    //     });
    //     return (
    //         <div>

    //             {companystr}
    //         </div>
    //     )
    // }
    const displaynametemplate = (data: any) => {

        var temp: string = ""
        temp = data.last_name + " " + data.first_name
        return (<span>{temp}</span>)
    }
    const rolestemplate = (data: any) => {
        // console.log(data.groups)
        var temparr = ""
        data.groups.forEach(e => {
            temparr = temparr + (rolesdata.filter((i) => i.id == e))[0]?.name + " , "
        });
        temparr = temparr.substring(0, temparr.length - 3)
        return (<span>{temparr}
        </span>



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
                        // console.log(rowdata)
                        setUserRolesid(data.id);
                        setUserRolesname(data.username);
                        setUserRolesemail(data.email);
                        console.log(data.email);
                        setUserRolesroles(data.groups);
                        setActive(data.is_active);

                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };


    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { is_active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.is_active ? "Yes" : "No"}</div>;
    };
    const editinitialvalues = () => {
        var returnvar: any = {}
        console.log(userrolesdata)
        returnvar.username = userrolesname
        if (userrolesemail != "") {
            var curuser = userrolesdata.filter((i) => i.email == userrolesemail)
            console.log(curuser)
            var temp = ""
            curuser[0].groups.forEach((i) => {
                console.log(i)
                temp = rolesdata.filter((j) => j.id == i)[0].name
                console.log(temp)
                // returnvar.temp = true
                returnvar[temp] = true
            }
            )
            returnvar["is_active"] =  curuser[0].is_active

            console.log(returnvar)
            // rolesdata.filter((j)=>j.id== userrolesdata.filter((i)=>{i.email==userrolesemail}).groups[0]).name

            return returnvar
        }
        else return
    }
    return (
        <div className="UserRoles">
            { }
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>

                <div>
                    <Card>
                    <DataTable value={userrolesdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10} globalFilterFields={["username", "last_name", "email", "groups", "is_active"]} filters={filters2} header={Headercomp}>
                        <Column field="username" header="User Name" sortable></Column>
                        <Column field="last_name" header="Display Name" body={displaynametemplate} sortable></Column>
                        <Column field="email" header="E-mail" sortable></Column>
                        <Column field="groups" header="Roles" body={rolestemplate} ></Column>
                        <Column field="is_active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                    </Card>

                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode ? "Edit User Roles Information " : "Add UserRoles Information "} modal className="p-fluid" onHide={hideDialog}>
                    <Form onSubmit={(values: any) => {
                        if (editmode) {
                            var temp: any = {}
                            // temp.username=values.username
                            var tempuser = values.username.toString()
                            temp.id = userrolesid
                            console.log(tempuser)
                            console.log(values)
                            // temp.username = tempuser.split("~")[0][0] + tempuser.split("~")[0].split(",")[1].trim()
                            temp.username = values.username.toString()

                            temp.first_name = userrolesdata.filter((i) => i.username == temp.username)[0].first_name

                            temp.last_name = userrolesdata.filter((i) => i.username == temp.username)[0].last_name
                            temp.email = userrolesdata.filter((i) => i.username == temp.username)[0].email


                            temp.groups = []
                            temp.is_active = values.is_active


                            for (var e in values) {
                                console.log(e)
                                if (e != "username" && e != "is_active" && values[e] == true) {
                                    console.log(e)

                                    temp.groups.push(rolesoptions.filter(i => i.name == e)[0].id)
                                }
                            }

                            console.log(temp)
                            dispatch(updateuserrolesaction(temp))
                            hideDialog()

                        }
                        else {

                            var temp: any = {}
                            // temp.username=values.username
                            var tempuser = values.username.toString()

                            console.log(tempuser)
                            // temp.username = tempuser.split("~")[0][0] + tempuser.split("~")[0].split(",")[1].trim()
                            temp.username = values.username.toString()
                            console.log(temp.username)
                            console.log(adusersdata)
                            temp.first_name = adusersdata.filter((i) => i.UserName == temp.username)[0].FirstName

                            temp.last_name = adusersdata.filter((i) => i.UserName == temp.username)[0].LastName
                            temp.email = adusersdata.filter((i) => i.UserName == temp.username)[0].Email


                            temp.groups = []
                            temp.is_active = values.is_active

                            for (var e in values) {
                                console.log(e)
                                if (e != "username" && e != "is_active" && values[e] == true) {
                                    console.log(e)

                                    temp.groups.push(rolesoptions.filter(i => i.name == e)[0].id)
                                }
                            }

                            console.log(temp)
                            dispatch(createuserrolesaction(temp))
                            setProductDialog(!productDialog)
                        }



                    }
                    }

                        initialValues={editmode?editinitialvalues():{
                            username: '',
                            is_active: true,


                        }}

                        keepDirtyOnReinitialize={true}


                        render={({ handleSubmit, values, submitting,

                            submitError,

                            invalid,

                            pristine,
                            initialValues,

                            dirtySinceLastSubmit, }) => (

                            <form onSubmit={handleSubmit} >
                                <Field
                                    name="username"
                                    render={({ input }) => (
                                        <div>
                                            <div className="field">
                                                <label >User Name</label>
                                                <span className="column">
                                                    {editmode ? <span>: {initialValues.username}</span> :

                                                        <Dropdown filter  {...input} options={props.getactiveuserroleoptionsprop} placeholder="Last Name, First Name" />
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                    )}
                                />
                                {

                                    rolesdata.map((item) => (
                                        <Field
                                            name={item.name}
                                            type="checkbox"
                                            render={({ input, meta }) => (
                                                <div className="field-checkbox">
                                                    <Checkbox inputId={input.name} {...input} />
                                                    <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                        {item.name}
                                                    </label>
                                                </div>)} />

                                    ))}
                                <div className="col-12">
                                    <Field
                                        name={"is_active"}
                                        type="checkbox"
                                        render={({ input, meta }) => (<>
                                            <Checkbox inputId="is_active" {...input} />
                                            <label htmlFor="binary"> Active</label>
                                        </>)} />
                                </div>

                                <React.Fragment>
                                    <div style={{ width: "100%" }}>
                                        {/* <span style={{width:"40%"}}></span> */}
                                        <Button type="button" style={{ width: "30%", marginLeft: "40%" }} label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                                        <Button style={{ width: "30%" }}
                                            type="submit"
                                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}

                                            loading={submitting}

                                            color="teal"

                                            label="Save"

                                        />
                                    </div>
                                </React.Fragment>


                            </form>)}


                    ></Form>


                </Dialog>
            </div>
        </div>
    );
};

// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(UserRoleS, comparisonFn);

function mapStateToProps(state) {
    return {
        getactiveuserroleoptionsprop: getactiveuserroleoptions(state),

    };
}
export default connect(mapStateToProps)(UserRoleS)
