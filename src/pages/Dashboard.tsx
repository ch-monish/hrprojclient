import React, { useEffect } from "react";
import { useState } from "react";
import ManageCompany from "./ManageCompany";
import MyJobPosts from "./DashboardComponents/MyJobPosts";
import JobPostActions from "./DashboardComponents/JobPostActionsHiringManager/JobPostActions";
import { connect, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { myjobpostsaction } from "../features/JobPostActions/myjobpostsslice";
import CandidateAction from "./DashboardComponents/CandidateActionHiringManager/CandidateAction";
import { candidateactionsdetailsaction } from "../features/CandidateActions/candidateactiondetailsslice";
import { setdashboardactivetab } from "../features/Misc/globalslice";
import SelectedCandidates from "./DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidates";
import { selectedcandidatesaction } from "../features/CandidateActions/selectedcandidatesslice";
import { getJobPostActionfromapi } from "../features/JobPostActions/jobpostactionsslice";
import { getuserroles } from "../features/Login/LoginSelector";
import CandidateDashboard from "./Candidate/CandidateDashboard";


const Dashboard = (props) => {
    const [openedtab, setOpenedtab] = useState("jobpostactions")
    const [nooftabs, setnooftabs] = useState(4)
    const myjobpostactions = useSelector((state: RootState) => state.JobPostAction);
    const mycandidateactions = useSelector((state: RootState) => state.Candidateactions);
    const myselectedcandidates = useSelector((state: RootState) => state.Selectedcandidates);
    const globaldata = useSelector((state: RootState) => state.global);
    const myJobPosts = useSelector((state: RootState) => state.myjobposts);
    const logindata = useSelector((state: RootState) => state.Login)
    const dispatch = useDispatch()
    const roles=props.getrolesprop
   
    
    // const rolesarr:any=[]
    const [rolesarr,setrolesarr]=useState<any>([])
    useEffect(() => {
        // logindata.groups.forEach((i)=>rolesarr.push(i["name"].toString()))   
        setrolesarr([])
        var w:any=[]
        logindata.groups.forEach((i)=>w.push(i["name"].toString()))
        logindata.groups.forEach((i)=>setrolesarr(rolesarr=>[...rolesarr,i["name"].toString()]))
        dispatch(getJobPostActionfromapi({
            "ApproverName":logindata.username
            // "ApproverName":"nkanagala"
        }))
        dispatch(myjobpostsaction({ "UserName": logindata.username }))
        dispatch(candidateactionsdetailsaction({

            "ApproverName": logindata.username

        }))

        dispatch(selectedcandidatesaction({

            "RoleName":w,
        
            "username":logindata.username
        
        }))
        console.log(rolesarr)
        // dispatch(myjobpostsaction({"UserName":logindata.username}))
        setTimeout(()=>{
            globaldata.dashboardactivetab==""?
            document.querySelector(".tabs")?.click():console.log()
            // console.log(document.getElementById("parentfortabs")?.children.length)
            setnooftabs(document.getElementById("parentfortabs")?.children.length.toString())
        },1000)
        // document.getElementsByClassName(".tabs").click()
        }, [])
    return (
        <div>
           {/* {!roles.includes("Candidate")? <div className="grid justify-content-between  d-flex  flex-row align-items-stretch" id="parentfortabs" style={{gap:"40px"}}>     */}
           <div className="grid justify-content-between  d-flex  flex-row align-items-stretch" id="parentfortabs" style={{gap:"40px"}}>    
                {/* <div className={"col-"+(12/nooftabs).toString()+" lg:col-"+(12/nooftabs).toString()+" xl:col-"+(12/nooftabs).toString()+" sm:col-6"} onClick={e=>setOpenedtab("candidateaction")}>

                    <div className={openedtab=="candidateaction"?"cardaction mb-0":"cardaction1 mb-0"}>     
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">Candidate Actions</span>
                                <div className="text-900 font-medium text-xl">3</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div> */}
                {/* {(rolesarr.includes("Recruiter")||rolesarr.includes("Business Head"))&&<div className={"col-" + (12 / nooftabs).toString() + " lg:col-" + (12 / nooftabs).toString() + " xl:col-" + (12 / nooftabs).toString() + " sm:col-6"} onClick={e => dispatch(setdashboardactivetab("jobpostactions"))}> */}
                {(rolesarr.includes("Recruiter")||rolesarr.includes("Business Head"))&&<div className={"tabs"} style={{flexGrow: 1,gap:"40px"}} onClick={e => dispatch(setdashboardactivetab("jobpostactions"))}>

                    <div className={globaldata.dashboardactivetab == "jobpostactions" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">My Job Post Actions</span>
                                <div className="text-900 font-medium text-xl">{myjobpostactions ? myjobpostactions.length : 0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>}
                {(rolesarr.includes("Hiring Manager")|| rolesarr.includes("Business Head")|| rolesarr.includes("HR")|| rolesarr.includes("Finance Controller")|| rolesarr.includes("General Manager"))&&<div className={"tabs"}  style={{flexGrow: 1}} onClick={e => dispatch(setdashboardactivetab("candidateactions"))}>

                    <div className={globaldata.dashboardactivetab == "candidateactions" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">My Candidate Actions</span>
                                <div className="text-900 font-medium text-xl">{mycandidateactions ? mycandidateactions.length : 0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-yellow-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>}
                {(rolesarr.includes("Hiring Manager"))&&<div className={""}  style={{flexGrow: 1}}  onClick={e => dispatch(setdashboardactivetab("myjobposts"))} >
                    <div className={globaldata.dashboardactivetab == "myjobposts" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">My Job Posts</span>
                                <div className="text-900 font-medium text-xl">{myJobPosts ? myJobPosts.length : 0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-file text-orange-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>}
                {(rolesarr.includes("Recruiter")|| rolesarr.includes("Business Head")|| rolesarr.includes("Hiring Manager")|| rolesarr.includes("HR"))&&<div className={"tabs"}   style={{flexGrow: 1}} onClick={e => dispatch(setdashboardactivetab("selectedcandidates"))}>

                    <div className={globaldata.dashboardactivetab == "selectedcandidates" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">Selected Candidates</span>
                                <div className="text-900 font-medium text-xl">{myselectedcandidates ? myselectedcandidates.length : 0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-users text-green-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>}

                {/* <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Comments</span>
                                <div className="text-900 font-medium text-xl">152 Unread</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-comment text-purple-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">85 </span>
                        <span className="text-500">responded</span>
                    </div>
                </div> */}
            </div>
            {/* :<div>
                <CandidateDashboard></CandidateDashboard>
                </div>
                } */}
            <br></br>
          {/* { !roles.includes("Candidate")&&  */}
          <div >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        {globaldata.dashboardactivetab == "jobpostactions" && <div style={{ width: "100%" }}> <JobPostActions />    </div>}
                        {globaldata.dashboardactivetab == "myjobposts" && <div style={{ width: "100%" }}><MyJobPosts /></div>}
                        {globaldata.dashboardactivetab == "selectedcandidates" && <div style={{ width: "100%" }}><SelectedCandidates /></div>}
                        {globaldata.dashboardactivetab == "candidateactions" && <div style={{ width: "100%" }}> <CandidateAction />    </div>}

                        {/* <div hidden={true}>d</div> */}


                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    );
};

// // export default Dashboard
// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(Dashboard, comparisonFn);
function mapStateToProps(state) {
    return {
        getrolesprop: getuserroles(state),
        
    };
}
export default connect(mapStateToProps)(Dashboard);
// export default Dashboard