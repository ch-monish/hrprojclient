import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import { getCandidatefromapi } from '../../features/CandidateActions/candidateactionsslice'
import { downloadresume } from '../../features/Downloadpdfs/pdfslice'
import CandidateDetails from './CandidateDetails'
import JobPostDetails from './JobPostDetails'
function CandidateDetailsView(props) {
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const formatCurrency = (value: any) => {

        return value?value.toLocaleString('en-US', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }):'';


    }
    const formatDollar = (value: any) => {

        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    }
    const navigate=useNavigate()
    const location = useLocation()
    // const approversdata = useSelector((store: RootState) => store.approversdetails)

    const candidatedata = location.state
    useEffect(() => {
        // console.clear()
        console.log(location.state)
        // console.log(candidatedata?.Resume.split('/')[candidatedata?.Resume.split('/').length-1])
        console.log(candidatedata?.Resume)
    }, [])
    const nametemplate = (rowdata) => {
        return (
            <>{ rowdata.FirstName + ", " + rowdata.LastName}</>
        )
    }
    const dispatch = useDispatch()
    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                {/* <h2>Manage Candidate</h2> */}
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
    const statustemplate = (rowdata) => {
        return (
            <>
                {/* {rowdata.approvalStatus == "N" && <span>Pending</span>}
                {rowdata.approvalStatus == "A" && <span>Approved</span>}
                {rowdata.approvalStatus == "R" && <span>Rejected</span>} */}
               {rowdata.approvalStatus == "N" ? <span>Pending</span> : <span>{rowdata.approvalStatus}</span>}
            </>
        )
    }
    const datetemplate = (rowdata) => {
        var temp = rowdata.CreatedOn
        var tempstr;
        tempstr = new Date(temp).getFullYear().toString() + "/" + new Date(temp).getMonth().toString() + "/" + new Date(temp).getDate().toString()
        return (
            <>{tempstr}
            </>
        )
    }
    const formatDate = (rowdata: any) => {
        return new Date(rowdata.CreatedOn).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const rowClass = (data) => {
        console.log(candidatedata.Stage)
        console.log(data.approvalStatus.includes('Rejected'))
        var color
        if (data.approvalStatus.includes('Rejected')){
            console.log("into")
            return  {'bg-red-300' : true}
        }
        else if (data.approvalStatus != "N"){
            return  {'bg-green-300' : true}
        }
        else if (data.approvalStatus == "N" && data.Stage == candidatedata.Stage){
            return  {'bg-orange-300' : true}
        }
        // return {
        //     'bg-red-300' : data.approvalStatus.includes('Rejected'),
        //     'bg-green-300' : data.approvalStatus != "N" && !data.approvalStatus.includes('Rejected'),
        //     'bg-orange-300': data.approvalStatus == "N" && data.Stage == candidatedata.Stage,

            
        // };
    };
    
    return (
        <div>
            <style>
                {
                    `.bg-red-300{
                        background-color : #ff8980 !important
                    }`
                }
            </style>
            <Card>
                <Panel header="Candidate Details" style={{ width: '100%', marginBottom: '2em' }}>
                    {/* <div className="grid">
                        <div className="md:col-4">


                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>First Name  </span><span className="font-w400">: {candidatedata?.CanFirstName}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Overall Experience </span> <span className="font-w400">: {candidatedata?.OverallExpYear}.{candidatedata?.OverallExpMonth} years</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Organization  </span><span className="font-w400">: {candidatedata?.CurrentOrganization}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}> Email </span><span className="font-w400">: {candidatedata?.Email}</span></p>
                        </div>


                        <div className="md:col-4">
                            <p >
                                <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Last Name   </span> <span className="font-w400">: {candidatedata?.CanLastName}</span>

                            </p>

                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Relevant Experience  </span><span className="font-w400">: {candidatedata?.ReleventExpYear}.{candidatedata?.ReleventExpMonth} years</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Location  </span><span className="font-w400">: {candidatedata?.CurrentJobLocation}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Contact No  </span><span className="font-w400">: {candidatedata?.ContactNo}</span></p>
                        </div>


                        <div className="md:col-4">
                            <p ><span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification  </span><span style={{ fontWeight: "400" }}>: {candidatedata?.Qualification}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Skills  </span><span className="font-w400">: {candidatedata?.Skills}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected DOJ  </span><span className="font-w400">: {new Date(candidatedata?.ExpectedDOJ).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}</span></p>
                        </div>
                    </div>

                    <br></br>
                    <div className="grid">
                       
                        <div className="md:col-4">

                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.CurrentCTC)}</span></p>

                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Resume  </span><span className="font-w400">
                            
                                <Link to={''} state={location.state} onClick={
                                    e => {
                                        dispatch(downloadresume(
                                            {
                                                'Resume': candidatedata?.Resume.toString().substring(1, candidatedata?.Resume.toString().length)
                                            }
                                        )
                                        )
                                    }}> {candidatedata?.Resume.split('/')[candidatedata?.Resume.split('/').length - 1]}</Link>

                                
                            </span>
                            </p>
                        </div>
                        <div className="md:col-4">
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.ExpectedCTC)}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Average approved CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.AvgApprovedCTC)}</span></p>
                        </div>
                        <div className="md:col-4">

                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Negotiated CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.NegotiatedCTC)}</span></p>
                            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Avg Bill rate($) </span><span className="font-w400">: {formatDollar(candidatedata?.AvgBillRate)}</span></p>
                        </div>
                    </div> */}
                    <CandidateDetails data={candidatedata}></CandidateDetails>
                    <div>
                        <br></br>
                        <br></br>
                        <h5>Candidate Work Flow Details</h5>
                        <DataTable value={candidatedata.approversDetails} rowClassName={rowClass} showGridlines={true} responsiveLayout="scroll"
                            globalFilterFields={['approverName','FirstName', 'approvalStatus', 'CreatedOn', 'role_name', 'stage_name']} filters={filters2} emptyMessage="No ideas found."
                        // header={Headercomp}
                        >
                            <Column field="approverName" header="Action By" sortable></Column>
                            <Column field="FirstName" header="Name" body={nametemplate} sortable></Column>
                            <Column field="approvalStatus" header="Action Status" body={statustemplate} sortable></Column>
                            <Column field="CreatedOn" header="Date" body={formatDate} sortable></Column>
                            <Column field="role_name" header="Role Name" sortable></Column>
                            <Column field="stage_name" header="Stage" sortable></Column>

                        </DataTable>
                    </div>

                </Panel>
                <div style={{float:'right'}}>

                <Button onClick={e=>navigate(-1)}>Cancel</Button>
                </div>
                <br>
                </br>
                </Card>
        </div>

    )

}

export default CandidateDetailsView