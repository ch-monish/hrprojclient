import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
// import {  getJobPostActionfromapi, JobPostActiondata } from '../../../features/JobPostActions/jobpostactionsslice';
import { generatepdf } from "../../../api/agent"
import { candidateactionsdetailsaction } from '../../../features/CandidateActions/candidateactiondetailsslice';
const CandidateAction = () => {


    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [companyid, setCompanyid] = useState(0);
    const [companyname, setCompanyname] = useState("");
    const [companydesc, setCompanydesc] = useState("");
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [company, setcompany] = useState();

    const candidateactionsdata = useSelector((state: RootState) => state.Candidateactions);
    const Logindata = useSelector((state: RootState) => state.Login);

    // const navigate=useNavigate()
    // // const useRedirect=
    const dispatch = useDispatch();

    //     useEffect(() => {
    // // alert("rerendering")
    //         dispatch(getJobPostActionfromapi({
    //             "ApproverName":Logindata.username
    //             // "ApproverName":"nkanagala"
    //         }))
    //         // console.log(jobpostactionsdata)
    //         //dispatch(getcompaniesaction());

    //         // console.log(data11.data);
    //         //setcompany(data11;
    //         //fetch('./jobpostdata.json').then(res => {res.json(); console.log(res);}).then(d => setcompany(d.data));
    //     }, []);
    useEffect(() => {
        dispatch(candidateactionsdetailsaction({

            "ApproverName": Logindata.username

        }))
        // console.log("working")
        console.log(candidateactionsdata)

    }, [])
    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
    const handleredirect = (s: string) => {
        console.log(s)
        // Redirect()
    }
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h5>Candidate Actions</h5>
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


            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h4>My Job Posts</h4>
            </React.Fragment>
        );
    };



    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.Active?.toString()}</div>;
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const nametemplate = (rowdata) => {
        return (
            <>{rowdata.Honorifics + ", " + rowdata.CanFirstName + ", " + rowdata.CanLastName}</>
        )
    }


    const exptemplate = (rowdata) => {
        return (
            <div>{rowdata.OverallExpYear + "." + rowdata.OverallExpMonth + " Years"}</div>
        )
    }
    const linktemplate = (rowdata) => {
        var temp: String = rowdata.stage_name.toString()
        return (
            <>
                {temp == "Candidate Review" &&
                    <Link to={"/candidatereview/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>}

                {/* {emp == "Candidate Interview" &&<Link to={"/candidatefeedback/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }                      */}
                {temp == "Candidate Interview" && <Link to={"/Interview/Hiringmanagerinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                } {temp == "Further Review" && <Link to={"/Interview/Hiringmanagerinterviewi2"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                } {temp == "HR Interview" && <Link to={"/Interview/HRinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "HM Hold" && <Link to={"/SelectedCandidatesHold"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "HR Hold" && <Link to={"/SelectedCandidatesHRHold"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "BH Candidate Approval" && <Link to={"/BusinessHeadApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "HM Candidate Approval" && <Link to={"/HiringManagerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "FC Approval" && <Link to={"/FinanceControllerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }
                {temp == "GM Approval" && <Link to={"/GeneralManagerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
                }

            </>
        )
    }
    const datetemplate = (rowdata: any) => {

        return <>{formatDate(new Date(rowdata.OnBoardingDate))}</>;


    }
    const formatDate = (value: any) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        // return value.toLocaleDateString('en-US');
    }
    const formatCurrency=(rowdata)=>{
        var  value1=rowdata.ExpectedCTC
        // console.log(  (rowdata.candidate.CurrentCTC.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }))
return(<>{
    value1? value1.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }):""
    }</>)
    }
    return (
        <div>

            <DataTable value={candidateactionsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10}
                globalFilterFields={['Honorifics','CandidateCode', 'CanFirstName', 'JobCode', 'JobTitle', 'OverallExpYear', 'ExpectedCTC', 'OnBoardingDate', 'stage_name']} filters={filters2} header={Headercomp}>

                <Column field="CandidateCode" header="Candidate Code" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} body={linktemplate}></Column>
                <Column field="CandidateName"  header="Candidate Name" sortable></Column>
                <Column field="JobCode" header="Job Code" sortable></Column>
                <Column field="JobTitle" header="Job Title" sortable></Column>
                <Column field="OverallExpYear" body={exptemplate} header="Experience" sortable ></Column>
                <Column field="ExpectedCTC" header="Expected CTC"  body={formatCurrency}sortable></Column>
                <Column field="OnBoardingDate" header="Expected DOJ" body={datetemplate} sortable></Column>
                <Column field="stage_name" header="Status" sortable></Column>

            </DataTable>


        </div>
    );



}

export default CandidateAction