import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-final-form";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";

// import {  getJobPostActionfromapi, JobPostActiondata } from '../../../features/JobPostActions/jobpostactionsslice';
import { downloadpdf, generatepdf, selectedcandidateactions } from "../../../api/agent";
import { candidateactionsdetailsaction } from "../../../features/CandidateActions/candidateactiondetailsslice";
import { selectedcandidatesaction, sendofferletteraction } from "../../../features/CandidateActions/selectedcandidatesslice";
import { downloadresume } from "../../../features/Downloadpdfs/pdfslice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { candidateinfogetaction } from "../../../features/Candidate info/candidateinfoslice";
import { getuserroles } from "../../../features/Login/LoginSelector";
import { Toast } from "primereact/toast";

import LoadingOverlay from "react-loading-overlay";
import { setcandidateinfotab } from "../../../features/Misc/globalslice";
const SelectedCandidates = (props) => {
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

    const selectedcandidatesdata = useSelector((state: RootState) => state.Selectedcandidates);
    const Logindata = useSelector((state: RootState) => state.Login);
    const roles = props.getuserrolesprop;
    const [showspinner, setShowspinner] = useState(false);
    const toast = useRef(null);

    // const navigate=useNavigate()
    // // const useRedirect=
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        // var w: any = []
        // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        // Logindata.groups.forEach((i)=>setRoles(roles=>[...roles,i["name"].toString()]))
        // console.log(roles)
        dispatch(
            selectedcandidatesaction({
                RoleName: roles,

                username: Logindata.username,
            })
        );
        // console.log("working")
        console.log(selectedcandidatesdata);
    }, []);
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
        console.log(s);
        // Redirect()
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h5>Selected Candidates </h5>
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

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <h4>My Job Posts</h4>
    //         </React.Fragment>
    //     );
    // };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.Active?.toString()}</div>;
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const exptemplate = (rowdata) => {
        return <div>{rowdata.candidate.OverallExpYear + "." + rowdata.candidate.OverallExpMonth + " Years"}</div>;
    };
    // const linktemplate = (rowdata) => {
    //     var temp: String = rowdata.stage_name.toString()
    //     return (
    //         <>
    //             {temp == "Candidate Review" &&
    //                 <Link to={"/candidatereview/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>}

    //             {/* {emp == "Candidate Interview" &&<Link to={"/candidatefeedback/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }                      */}
    //             {temp == "Candidate Interview" && <Link to={"/Interview/Hiringmanagerinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             } {temp == "Further Review" && <Link to={"/Interview/Hiringmanagerinterviewi2"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             } {temp == "HR Interview" && <Link to={"/Interview/HRinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "HM Hold" && <Link to={"/SelectedCandidatesHold"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "BH Candidate Approval" && <Link to={"/BusinessHeadApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "FC Approval" && <Link to={"/FinanceControllerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "GM Approval" && <Link to={"/GeneralManagerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }

    //         </>
    //     )
    // }
    const formatCurrencycctc = (rowdata) => {
        var value1 = rowdata.candidate.CurrentCTC;
        // console.log(  (rowdata.candidate.CurrentCTC.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }))
        return <>{value1 ? value1.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }) : ""}</>;
    };
    const formatCurrencyEctc = (rowdata) => {
        var value1 = rowdata.candidate.ExpectedCTC;
        return <>{value1 ? value1.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }) : ""}</>;
    };
    const formatCurrencyNctc = (rowdata) => {
        var value1 = rowdata.candidate.NegotiatedCTC;
        return (
            <>
                {
                    //  (rowdata.candidate.NegotiatedCTC?.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
                    value1 ? value1.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }) : ""
                }
            </>
        );
    };
    const formatCurrency = (value: any) => {
        return value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });
    };
    const datetemplate = (rowdata: any) => {
        return <>{formatDate(new Date(rowdata.candidate.ExpectedDOJ))}</>;
    };
    const formatDate = (value: any) => {
        return value.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        // return value.toLocaleDateString('en-US');
    };
    const linktemplate = (rowdata) => {
        // console.log(rowdata)
        return (
            <>
                {roles.includes("HR") && rowdata.candidate.EmploymentType != "Contract(vendor)" ? (
                    <Link to={"/SelectedCandidatesdetails"} state={rowdata}>
                        {rowdata.candidate.CandidateCode}
                    </Link>
                ) : rowdata.designation ? (
                    <Link to={"/SelectedCandidatesdetailsview"} state={rowdata}>
                        {rowdata.candidate.CandidateCode}
                    </Link>
                ) : (
                    <div>{rowdata.candidate.CandidateCode}</div>
                )}
            </>
        );
    };

    const downloadfile = (res, filename) => {
        const byteCharacters = atob(res.toString("base64"));
        // const byteCharacters = Buffer.from(res, 'base64');
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        //for download
        const blob = new Blob([byteArray]);
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        //for download
        a.download = "pdffile.pdf";
        a.download = filename.substring(filename.lastIndexOf("/") + 1, filename.toString().length);
        a.click();
    };

    const actionBodyTemplate = (data) => {
        var pdftooltip = "";
        if (data.candidate.EmploymentType == "Internship") pdftooltip = "Internship Letter";
        else if (data.candidate.EmploymentType == "Contract(direct)") pdftooltip = "Contract Letter";
        else if (data.candidate.EmploymentType == "Full-Time") pdftooltip = "Offer Letter";
        return (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {data.candidate.EmploymentType != "Contract(vendor)" && (
                    <>
                        {data.OfferLetter && (
                            <>
                                {/* <Button
                            icon="pi pi-download"
                            tooltip={"Download "+pdftooltip}
                            className="p-button-rounded p-button-warning"
                            // style={{ width: "30px", height: "30px",}}
                            onClick={(e) => {

                                setShowspinner(true)
                                downloadpdf.downloadpdf( {
                                    'Resume': data?.OfferLetter?.toString().substring(1, data?.OfferLetter?.toString().length)
                                }).then((res) => {
                                    downloadfile(res, data?.OfferLetter?.toString().substring(1, data?.OfferLetter?.toString().length));
                                    setShowspinner(false)
                                    toast.current.show({ severity: 'success', summary: 'Success Message', detail: "downloaded successfully", life: 3000 })
                                }).then(() =>{

                                }).catch((ex) =>{
                                    setShowspinner(false)
                                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
                                })

                                // dispatch(downloadresume(
                                //     {
                                //         'Resume': data?.OfferLetter?.toString().substring(1, data?.OfferLetter?.toString().length)
                                //     }
                                // ))
                            }}
                        /> */}
                                <Button
                                    icon="pi pi-file-pdf"
                                    tooltip={"Download " + pdftooltip}
                                    className="p-button-rounded p-button-Primary"
                                    // style={{ width: "30px", height: "30px",}}
                                    onClick={(e) => {
                                        var strdoc = data?.OfferLetter?.toString().substring(1, data?.OfferLetter?.toString().length);

                                        var re = /.docx/gi;

                                        // Use of String replace() Method
                                        var strdoc = strdoc.replace(re, ".pdf");
                                        setShowspinner(true);
                                        downloadpdf
                                            .downloadpdf({
                                                Resume: strdoc,
                                            })
                                            .then((res) => {
                                                downloadfile(res, strdoc);
                                                setShowspinner(false);
                                                toast.current.show({ severity: "success", summary: "Success Message", detail: "downloaded successfully", life: 3000 });
                                            })
                                            .then(() => {})
                                            .catch((ex) => {
                                                setShowspinner(false);
                                                toast.current.show({ severity: "error", summary: "Error Message", detail: ex.data, life: 3000 });
                                            });
                                        // dispatch(downloadresume(
                                        //     {
                                        //         'Resume': strdoc
                                        //     }
                                        // ))
                                    }}
                                />
                            </>
                        )}

                        {data.JoiningBonusLetter && (
                            <Button
                                icon="pi pi-file-pdf"
                                tooltip={"Download JoiningBonus Letter"}
                                className="p-button-rounded p-button-help"
                                // style={{ width: "30px", height: "30px",}}
                                onClick={(e) => {
                                    var strdoc = data?.JoiningBonusLetter?.toString().substring(1, data?.JoiningBonusLetter?.toString().length);

                                    var re = /.docx/gi;

                                    // Use of String replace() Method
                                    var strdoc = strdoc.replace(re, ".pdf");

                                    setShowspinner(true);
                                    downloadpdf
                                        .downloadpdf({
                                            Resume: strdoc,
                                        })
                                        .then((res) => {
                                            downloadfile(res, strdoc);
                                            setShowspinner(false);
                                            toast.current.show({ severity: "success", summary: "Success Message", detail: "downloaded successfully", life: 3000 });
                                        })
                                        .then(() => {})
                                        .catch((ex) => {
                                            setShowspinner(false);
                                            toast.current.show({ severity: "error", summary: "Error Message", detail: ex.data, life: 3000 });
                                        });

                                    // dispatch(downloadresume(
                                    //     {
                                    //         'Resume': strdoc
                                    //     }
                                    // ))
                                }}
                            />
                        )}
                        {data.OfferLetter && (
                            <Button
                                icon="pi pi-share-alt"
                                tooltip={"Send " + pdftooltip}
                                className="p-button-rounded p-button-success"
                                disabled={data.OfferLetterSent ? (data.OfferLetterSent == true ? true : false) : false}
                                onClick={(e) => {
                                    console.log("into click");
                                    confirmDialog({
                                        message: "Are you sure you want to proceed?",
                                        header: "Confirmation",
                                        icon: "pi pi-exclamation-triangle",
                                        accept: () => {
                                            setShowspinner(true);
                                            selectedcandidateactions
                                                .sendOfferLetter({
                                                    selectedcandidateid: data?.Selected_Candidate_ID,
                                                })
                                                .then((res) => {
                                                    console.log(res);
                                                    dispatch(
                                                        selectedcandidatesaction({
                                                            RoleName: roles,

                                                            username: Logindata.username,
                                                        })
                                                    );
                                                    setShowspinner(false);
                                                    toast.current.show({ severity: "success", summary: "Success Message", detail: res, life: 3000 });
                                                })
                                                .catch((ex) => {
                                                    console.log(ex);
                                                    setShowspinner(false);
                                                    toast.current.show({ severity: "error", summary: "Error Message", detail: ex.data, life: 3000 });
                                                });
                                        },
                                        // dispatch(sendofferletteraction(
                                        //     {
                                        //         'selectedcandidateid': data?.Selected_Candidate_ID
                                        //     }
                                        // )),
                                        reject: () => console.log(),
                                    });
                                }}
                            />
                        )}

                        {data.IsOfferAccepted && (
                            <Button
                                icon="pi pi-external-link"
                                tooltip="Candidate Dashboard"
                                tooltipOptions={{position : "left"}}
                                className="p-button-rounded p-button-danger"
                                // style={{ width: "30px", height: "30px",}}
                                onClick={(e) => {
                                    dispatch(
                                        candidateinfogetaction({
                                            username: data.username,
                                        })
                                    );
                                    dispatch(setcandidateinfotab(0));
                                    setTimeout(() => {
                                        navigate("/candidatedashboard", { state: data.username });
                                    }, 1000);
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        );
    };
    return (
        <div>
            <LoadingOverlay active={showspinner} spinner text="Processing...">
                <Toast ref={toast} position="bottom-left" />
                <ConfirmDialog />
                <DataTable
                    value={selectedcandidatesdata}
                    showGridlines={false}
                    responsiveLayout="scroll"
                    paginator={true}
                    rowsPerPageOptions={[10, 20, 50]}
                    rows={10}
                    globalFilterFields={[
                        "candidate.candidatefullname",
                        "candidate.CanFirstName",
                        "candidate.Jobpost.JobCode",
                        "candidate.EmploymentType",
                        "candidate.Jobpost.JobTitle",
                        "candidate.OverallExpYear",
                        "candidate.CurrentCTC",
                        "candidate.ExpectedCTC",
                        "Jobpost.NegotiatedCTC",
                        "candidate.ExpectedDOJ",
                    ]}
                    filters={filters2}
                    header={Headercomp}
                >
                    <Column field="candidate.CandidateCode" header="Candidate Code" sortable style={{ minWidth: "13rem", maxWidth: "13rem" }} body={linktemplate}></Column>
                    <Column field="candidate.candidatefullname" header="Candidate Name" sortable></Column>
                    <Column field="jobpost.JobCode" header="Job Code" sortable></Column>
                    <Column field="jobpost.JobTitle" header="Job Title" sortable></Column>
                    <Column field="candidate.OverallExpYear" body={exptemplate} header="Experience" sortable></Column>
                    <Column field="candidate.EmploymentType" header="Employment Type" sortable></Column>
                    <Column field="candidate.CurrentCTC" header="CurrentCTC " body={formatCurrencycctc} sortable>
                        {" "}
                    </Column>
                    <Column field="candidate.ExpectedCTC" header="Expected CTC" body={formatCurrencyEctc} sortable></Column>
                    <Column field="candidate.NegotiatedCTC" header="Negotiated CTC" body={formatCurrencyNctc} sortable></Column>
                    <Column field="candidate.ExpectedDOJ" header="Expected DOJ" body={datetemplate} sortable></Column>
                    {roles.includes("HR") && <Column field="action" header="Action" style={{ minWidth: "11rem", maxWidth: "11rem" }} body={actionBodyTemplate} exportable={false}></Column>}
                </DataTable>
            </LoadingOverlay>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        getuserrolesprop: getuserroles(state),
    };
}
export default connect(mapStateToProps)(SelectedCandidates);
