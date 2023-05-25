import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import { Ripple } from 'primereact/ripple'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { RootState } from '../../../app/store'
import { getCandidatefromapi } from "../../../features/CandidateActions/candidateactionsslice"
import { genpdf } from '../../../features/Downloadpdfs/pdfslice'
// import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../features/JobPostActions/jobpostactionsslice'
import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from '../../DashboardComponents/JobPostDetails'
import CandidateDetails from '../CandidateDetailsview'
import { PanelHeaderTemplateOptions } from 'primereact/panel';
import { FilterMatchMode } from 'primereact/api'
import { InputText } from 'primereact/inputtext'

function JobPostProfileUpload() {
    const jobsdata = useSelector((store: RootState) => store.JobPostAction)
    const Logindata = useSelector((store: RootState) => store.Login)
    const candidatesdata = useSelector((store: RootState) => store.Candidatesforjobpost)
    const billrate = useSelector((store: RootState) => store.ManageBill)

    const [submitted, setSubmitted] = useState(false);

    const { JobCode } = useParams()
    const [editmode, setEditmode] = useState(false);
    // console.log(JobCode)
    //     const [jobpostobject,setJobpostobject]=useState()
    // const jobpostdata=useSelector(store=>store.JobPostAction)
    //     console.log(jobcode)
    const [res, setres] = useState("")
    const [comments, setcomments] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [issave, setissave] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [jobdata, setjobdata] = useState<IJobPost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    useEffect(() => {
        // if (jobdata == null) {
            // console.log(jobdata)
            // console.log(Logindata.username)
            // dispatch(getJobPostActionfromapi({"":Logindata.username))
            // dispatch(getJobPostActionfromapi("sbatchu"))
        // }
        console.log(candidatesdata)
        setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
        dispatch(getCandidatefromapi({
            "jobpostID": jobdata.JobPostID
        }))
        // console.log(jobdata.AvgApprovedCTC)
       
// billrate.forEach((i)=>
// (i.BusinessUnitId==
//     )
        // console.log(billrate)
    }, [])
    const hideDialog = () => {
        setissave(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    // console.log(jobdata)
    // const onsubmithandle = () => {
    //     // console.log(res)
    //     // console.log(comments)



    //     var payloaddata: any = {}
    //     if (res) {

    //         payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
    //         payloaddata.JobPostId = jobdata.id
    //         payloaddata.ApprovalStatus = res
    //         payloaddata.ApprovalComments = comments
    //     }
    //     if (res) {
    //         if (!(res == "R" && comments == "")) {

    //             console.log(payloaddata)
    //             dispatch(jobpostactionssubmit(payloaddata))
    //         }
    //     }
    // }
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Candidates</h2>
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
    
    const actionBodyTemplate = (data) => {
        console.log(data.stage_name)
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    disabled = {data.stage_name== "Candidate Rejected"?false:!(data.stage_name == "Candidate Review Pending")?true:false}
                    onClick={(e) => {
                        navigate("/candidate/updatecandidateprofile",{state:{data, jobdata}})
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
                   
                }}
            />
        </React.Fragment>
    );
   
    const exptemplate=(rowdata)=>{
        return(
            <div>{rowdata.OverallExpYear +"."+rowdata.OverallExpMonth+" Years"}</div>
        )
    }
    const linktemplate=(rowdata) =>{
        return(
            <Link to="/candidate/candidatedetailsview" state={rowdata}>{rowdata.CandidateCode}</Link>
        )
    }
    const template = (options: PanelHeaderTemplateOptions) => {
      
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>
                 
                <span className={titleClassName}>
                    <h4>
                        Job Post Details
                        </h4>
                </span>
                <Button className='' style={{ }} onClick={e => {
                        dispatch(genpdf({ "JobPostId": jobdata.JobPostID,"filename":jobdata.JobTitle }))


                    }}>Generate JD</Button>            </div>
        )
    }
    const formatDate = (rowdata:any) => {
        return new Date(rowdata.ExpectedDOJ).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
      }
      const formatCurrency = (rowdata:any) => {
        return rowdata.CurrentCTC?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:0 });
      }
      const formatCurrencyectc = (rowdata:any) => {
        return rowdata.ExpectedCTC?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:0 });
      }
    return (
        <div>
            <Card>
            {/* <Panel headerTemplate={<div style={{width:"100%",height:"40px",backgroundColor:"#dee2e6" ,borderTopRightRadius:10,borderTopLeftRadius:10   }}><label style={{fontSize:"30px"}}>Job Post Details</label> <Button style={{float:"right",right:"80px",verticalAlign:"30px"}}>gen</Button> <span ></span></div>} > */}
<Panel headerTemplate={template} >
                <div style={{textAlign:"right",marginRight:"100px"}}>

                    {/* <Button className='' style={{ }} onClick={e => {
                        dispatch(genpdf({ "JobPostId": jobdata.JobPostID }))


                    }}>Generate jd</Button> */}

                </div>
                <br></br>
                <div>

                    <JobPostDetails JobData={jobdata}></JobPostDetails>
                </div>
                <div style={{textAlign:"center"}} >
<br></br>       
{jobdata.Stage != "Closed" &&
                <Button onClick={e => navigate("/candidate/createcandidateprofile",{state:{"jobdata":jobdata}})}>Add New Candidate</Button>
                 } </div>
                <br></br>
                <br></br>
                <DataTable value={candidatesdata} showGridlines={true} responsiveLayout="scroll" style={{}} paginator={true} rowsPerPageOptions={[10,20,50]} rows={10}
globalFilterFields={['CandidateCode', 'candidatefullname', 'overallexperience', 'ExpectedDOJ', "CurrentCTC",'ExpectedCTC', 'Email','stage_name']}filters={filters2} emptyMessage="No data found." header={Headercomp}>
                    <Column field="CandidateCode" header="Code" body={linktemplate} sortable></Column>
                    <Column field="candidatefullname" header="Name"  sortable></Column>
                    <Column field="overallexperience" header="Overall Experience (in years)"  sortable style={{ minWidth: '8rem', maxWidth : '8rem'}}></Column>
                    <Column field="ExpectedDOJ" header="Expected DOJ" body={formatDate}  sortable style={{ minWidth: '8rem', maxWidth : '8rem'}}  dataType={"date"}  ></Column>
                    <Column field="CurrentCTC" header="Current CTC" body={formatCurrency} sortable></Column>
                    <Column field="ExpectedCTC" header="Expected CTC" body={formatCurrencyectc} sortable></Column>
                    <Column field="Email" header="Email"  sortable></Column>
                    <Column field="stage_name" header="Status"  sortable></Column>
                    {/* <Column field="Action" header="Action" ></Column> */}
                    {jobdata.Stage != "Closed" &&
                    <Column field="Action" header="Edit" body={actionBodyTemplate} exportable={false} sortable></Column>
                    }

                </DataTable>
                <br></br>
                <div style={{float:"right"}}>

                <Button onClick={e=>navigate(-1)}> Cancel</Button>
                </div>
                <br></br>
                <br></br>
            </Panel>
            </Card>
        </div>
    )

}

export default JobPostProfileUpload