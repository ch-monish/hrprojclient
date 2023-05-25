import React, { useState, useEffect, useRef ,lazy,Suspense, ReactElement} from 'react';
import classNames from 'classnames';
import { Route, useLocation, Routes, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';

import { Toast } from 'primereact/toast';

import { createtoast, Toaster, toastreset } from '../src/features/ToastSlice'
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { ILogin } from './features/Login/Loginslice';
import { ProgressSpinner } from "primereact/progressspinner";
import SelectedCandidateDetailsView from './pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidateDetailsView';
import ProtectedRoute from './components/routes/ProtectedRout';
import { getuserroles } from './features/Login/LoginSelector';
import Insurance from './pages/candidateinfo/candidateinfocomponents/Insurance';
import BankDetails from './pages/candidateinfo/candidateinfocomponents/BankDetails';
import PFDetails from './pages/candidateinfo/candidateinfocomponents/PFDetails';
import CandidateDashboard from './pages/Candidate/CandidateDashboard';
import axios from 'axios';
import LoginPage  from'./LoginPage'
const ManageDepartment =lazy(()=>import('./pages/ManageDepartment'));
const Candidateoperationsflow =lazy(()=>import('./pages/Candidate/Candidateoperationsflow'));
const Updatefultimecandidatedetails =lazy(()=>import("./pages/DashboardComponents/Acceptedcandidates/Updatefultimecandidatedetails"));
const Updatecontractorcandidatedetails =lazy(()=>import("./pages/DashboardComponents/Acceptedcandidates/Updatecontractorcandidatedetails"));
const Updateinterncandidatedetails =lazy(()=>import("./pages/DashboardComponents/Acceptedcandidates/Updateinterncandidatedetails"));
const Acceptedcandidates=lazy(()=>import('./pages/DashboardComponents/Acceptedcandidates/Acceptedcandidates'));
const Acknowledgementpage =lazy(()=>import( './pages/candidateinfo/candidateinfocomponents/Acknowledgementpage'));
// import AppTopbar  from './AppTopbar';
const AppTopbar =lazy(()=>import('./AppTopbar'))
const  ManageCompany=lazy(()=>import("./pages/ManageCompany")) ;
const Dashboard =lazy(()=>import("./pages/Dashboard"));
const ManageBusinessUnit =lazy(()=>import("./pages/ManageBusinessUnit"));
const ManageCustomer =lazy(()=>import("./pages/ManageCustomer"));
const ManageExperienceLevel =lazy(()=>import("./pages/ManageExperienceLevel"));
const ManageDesignation =lazy(()=>import("./pages/ManageDesignation"));
const ManageSubBand =lazy(()=>import("./pages/ManageSubBand"));
const  ServiceLine=lazy(()=>import("./pages/ServiceLine"));
const  Location=lazy(()=>import("./pages/Location"));
const  ManageBand=lazy(()=>import("./pages/ManageBand"))
const  ManageBill=lazy(()=>import("../src/pages/ManageBillrate"))
const  ManageInsurance=lazy(()=>import("./pages/ManageInsurance"));
const  Industry=lazy(()=>import("./pages/Industry"));
const  UserRoles =lazy(()=>import('./pages/UserRoles'));
// const LoginPage =lazy(()=>import('./LoginPage'));
const JobpostsactionApproval =lazy(()=>import('./pages/DashboardComponents/JobPostActionsHiringManager/JobpostsactionApproval'));
const CreateJobPost =lazy(()=>import('./pages/DashboardComponents/CreateJobPost'));
const Jobpostdetailedview =lazy(()=>import('./pages/DashboardComponents/Jobpostdetailedview'));
const CreateCandidateProfile =lazy(()=>import('./pages/Candidate/CreateCandidateProfile'))
const JobPostProfileUpload =lazy(()=>import("./pages/DashboardComponents/JobPostActionsHiringManager/JobPostsProfileUpload"))
const CandidateDetailsview =lazy(()=>import('./pages/DashboardComponents/CandidateDetailsview'));
const CandidateReview =lazy(()=>import('./pages/DashboardComponents/CandidateActionHiringManager/CandidateReview'));
const CandidateShortlist =lazy(()=>import('./pages/DashboardComponents/CandidateActionHiringManager/CandidateShortlist'));
const HiringmanagerInterview =lazy(()=>import('./pages/InterviewComponents/HiringmanagerInterview'));
const HiringManagerin2 =lazy(()=>import('./pages/InterviewComponents/HiringManagerin2'));
const HRInterview =lazy(()=>import('./pages/InterviewComponents/HRInterview'));
const BusinessHeadApproval =lazy(()=>import('./pages/DashboardComponents/BusinessHeadApproval'));
const HiringManagerApproval =lazy(()=>import('./pages/DashboardComponents/HiringManagerApproval'));
const GeneralManagerApproval =lazy(()=>import( './pages/DashboardComponents/GeneralManagerApproval'));
const FinanceControllerApproval=lazy(()=>import('./pages/DashboardComponents/FinanceControllerApproval'));
const SelectedCandidatesHold=lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHold'));
const SelectedCandidates =lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidates'));
const SelectedCandidatesHRHold =lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHRHold'));
const SelectedCandidateDetails=lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidateDetails'));
const Candidateinfo =lazy(()=>import('./pages/candidateinfo/Candidateinfo'));
const PersonalDetails =lazy(()=>import('./pages/candidateinfo/candidateinfocomponents/PersonalDetails'));
const Pagenotfound =lazy(()=>import('./Pagenotfound'));

const App = (props) => {
    const toastdata = useSelector((state: RootState) => state.toaster)
    const state = useSelector((state: RootState) => state)
    const logindata = useSelector((state: RootState) => state.Login)
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState<any>('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef<any>();
    const location = useLocation();
    const toast = useRef(null);
    const dispatch = useDispatch()
    PrimeReact.ripple = true;
    var Logindata: ILogin = useSelector((state: RootState) => state.Login);

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {

        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);
    useEffect(() => {

        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();

    }, [location]);

    useEffect(() => {
        // console.log(toastdata)
        if (toastdata.id != 1)
            if (toast.current ? toastdata.data != "" : false) {

                if (toastdata.status == "error")

                    toast.current.show({ severity: toastdata.status, summary: toastdata.status , detail: toastdata.data, life: 3000 });
                else if (toastdata.status == "info")
                    toast.current.show({ severity: toastdata.status, summary: toastdata.status , detail: <pre>{toastdata.data} </pre> , sticky:true ,position:"top-center"});
                else if (toastdata.status == "pending verification")
                    toast.current.show({ severity: "info", summary: "pending verification" , detail: <pre>{toastdata.data} </pre> , sticky:true ,position:"top-center",style:{width:"450px"} });

                else
                    toast.current.show({ severity: toastdata.status, summary: toastdata.status, detail: toastdata.data, life: 3000 });
                dispatch(toastreset())
            }

    }, [toastdata])


    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);
    useEffect(() => {
    //     var w: any = []
    //     // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
    //    Logindata.username!=""? Logindata.groups.forEach((i) => setRoles(roles => [...roles, i["name"].toString()])):console.log()
    //     console.log(roles)
    }, [])
    useEffect(()=>{
        let token=logindata.accesstoken
            if (token != "") {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            else{
                delete axios.defaults.headers.common["Authorization"];
         }
    },[])

    const onInputStyleChange = (inputStyle: React.SetStateAction<string>) => {
        setInputStyle(inputStyle);
    }

    const onRipple = () => {
        PrimeReact.ripple = !PrimeReact.ripple;
        setRipple(!PrimeReact.ripple)
    }

    const onLayoutModeChange = (mode: React.SetStateAction<string>) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode: React.SetStateAction<string>) => {
        setLayoutColorMode(mode.toString())
    }

    const onWrapperClick = (event: any) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }
    const onToggleMenuClick = (event: { preventDefault: () => void; }) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event: { preventDefault: () => void; }) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event: { preventDefault: () => void; }) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event: { item: { items: any; }; }) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const addClass = (element: HTMLElement, className: string) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element: HTMLElement, className: string) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    // if (Component.getLayout) {
    //     return (
    //         <LayoutProvider>
    //             {Component.getLayout(<Component {...pageProps} />)}
    //         </LayoutProvider>
    //     )
    // } else {
    function RequireAuth({ children, redirectTo }) {
        let isAuthenticated = true;
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }
    return (
        //         <Switch>
        // <HashRouter>
        //React protected router?


<Suspense fallback={  <ProgressSpinner
            style={{ width: "100px", height: "100px",left:"50%",top:"50%"   ,position:"absolute"}}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />}>

        <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />

            <Route
                path="*"
                element={Logindata.username != "" ?
                    // <RequireAuth  redirectTo="/login">
                    <div className={wrapperClass} style={{backgroundImage: "URL('/HRWorkflowPortal/bg1.jpg')",backgroundRepeat:"no-repeat",
                    backgroundAttachment : "fixed", backgroundSize: "cover" }} onClick={onWrapperClick}>
                        <div>

                            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
                            <Toast ref={toast} position="bottom-left" style={{marginRight:"115px",marginTop:"100px"}}/>
                            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                            {/* <div className="layout-sidebar mw-100" onClick={onSidebarClick}>
                                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                                </div> */}
                            <div className="layout-main-container">
                                <div className="layout-main">
<Suspense fallback={ <ProgressSpinner
            style={{ width: "100px", height: "100px",left:"50%",top:"50%"   ,position:"absolute"}}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />}>
                                    <Routes>
                                        <Route path="/dashboard" element={ <ProtectedRoute isAllowed={!props.getrolesprop.includes("Candidate")}> <Dashboard /></ProtectedRoute>} />
                                       {/* {roles.includes("HR")? <Route path="/" element={<Dashboard />} />:<Pagenotfound></Pagenotfound>} */}
                                        <Route path="/Industry" element={ <ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}>   <Industry /></ProtectedRoute>} />
                                        <Route path="/Managecompany" element={  <ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}>    <ManageCompany />  </ProtectedRoute>   } />
                                        <Route path="/ManageBusinessUnit" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageBusinessUnit /></ProtectedRoute>  } />
                                        <Route path="/serviceline" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ServiceLine /></ProtectedRoute>  } />
                                        <Route path="/Managecustomer" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageCustomer /></ProtectedRoute>  } />
                                        <Route path="/Location" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <Location /></ProtectedRoute>  } />
                                        <Route path="/ManageExperienceLevel" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageExperienceLevel /></ProtectedRoute>  } />
                                        <Route path="/AvgCTC" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageBill /></ProtectedRoute>  } />
                                        <Route path="/ManageDesignation" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageDesignation /></ProtectedRoute>  } />
                                        <Route path="/userroles" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <UserRoles /></ProtectedRoute>  } />
                                        <Route path="/Band" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageBand /></ProtectedRoute>  } />
                                        <Route path="/ManageSubBand" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageSubBand /></ProtectedRoute>  } />
                                        <Route path="/Insurance" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageInsurance /></ProtectedRoute>  } />
                                        <Route path="/ManageDepartment" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Administrator")}> <ManageDepartment /></ProtectedRoute>  } />


                                        <Route path="/acceptedcandidates" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}> <Acceptedcandidates /></ProtectedRoute>  } />{/*hr */}
                                        <Route path="/fulltimecandidateedit" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}> <Updatefultimecandidatedetails /></ProtectedRoute>  } />{/*hr */}
                                        <Route path="/contractcandidateedit" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}> <Updatecontractorcandidatedetails /></ProtectedRoute>  } />{/*hr */}
                                        <Route path="/interncandidateedit" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}> <Updateinterncandidatedetails /></ProtectedRoute>  } />{/*hr */}




                                        <Route path="/jobpostsprofileupload/:JobCode" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Recruiter")}> <JobPostProfileUpload /></ProtectedRoute>} />{/* recruiter */}
                                        <Route path="/jobpostsactionApproval/:JobCode" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Recruiter")||props.getrolesprop.includes("Business Head")}> <JobpostsactionApproval /></ProtectedRoute>} />{/*Business head,recruiter */}

                                        <Route path="/myjobposts/createjobpost" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}> <CreateJobPost /></ProtectedRoute>} />{/*hiring manager */}
                                        <Route path="/myjobposts/updatejobpost" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}> <CreateJobPost /></ProtectedRoute>} />{/*hiring manager */}
                                        <Route path='/jobpostdetailedview/:JobCode' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")|| props.getrolesprop.includes("Business Head")||props.getrolesprop.includes("HR") ||props.getrolesprop.includes("Recruiter")}> <Jobpostdetailedview /></ProtectedRoute>} />{/*hiring manager ,business head,hr,recruiter*/}
                                        <Route path="/candidate/createcandidateprofile" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Recruiter")}> <CreateCandidateProfile /></ProtectedRoute>} />{/*Recruiter,hr */}
                                        <Route path="/candidate/updatecandidateprofile" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Recruiter")}> <CreateCandidateProfile /></ProtectedRoute>} />{/*Recruiter,hr */}
                                        <Route path="/candidate/candidatedetailsview" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Recruiter")||props.getrolesprop.includes("Hiring Manager")}><CandidateDetailsview /></ProtectedRoute>} />{/*Recruiter */}
                                        <Route path="/candidatereview/:CandidateCode" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}> <CandidateReview /></ProtectedRoute>} />{/*Hiring manager */}
                                        <Route path="/candidatefeedback/:CandidateCode" element={<CandidateShortlist />} />{/* screen not in use reference screen */}

                                        <Route path="/Interview/Hiringmanagerinterview" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}><HiringmanagerInterview/></ProtectedRoute>} />{/*hiring manager  */}
                                        <Route path="/Interview/Hiringmanagerinterviewi2" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}><HiringManagerin2/></ProtectedRoute>} />{/*Hiring manager */}
                                        <Route path="/Interview/HRinterview" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}><HRInterview/></ProtectedRoute>} />{/*Hr */}
                                        <Route path="/BusinessHeadApproval" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Business Head")}><BusinessHeadApproval/></ProtectedRoute>} />{/*Business Head */}
                                        <Route path="/HiringManagerApproval" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}> <HiringManagerApproval/></ProtectedRoute>} />             {/*Hiringmanager */}
                                        <Route path="/GeneralManagerApproval" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("General Manager")}> <GeneralManagerApproval/></ProtectedRoute>} />{/*GM */}
                                        <Route path="/FinanceControllerApproval" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Finance Controller")}><FinanceControllerApproval/></ProtectedRoute>} />{/*Finance controller */}
                                        <Route path="/SelectedCandidatesHold" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")}><SelectedCandidatesHold/></ProtectedRoute>} />{/*hiring manager */}
                                        {/* <Route path="/SelectedCandidates" element={<SelectedCandidates></SelectedCandidates>} /> */}
                                        <Route path="/SelectedCandidatesHRHold" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}><SelectedCandidatesHRHold/></ProtectedRoute>} />{/*hr */}
                                        <Route path="/SelectedCandidatesdetails" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}><SelectedCandidateDetails/></ProtectedRoute>} />{/*hr */}
                                        <Route path='/acknowledgementpage' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")}><Acknowledgementpage/></ProtectedRoute>}></Route>{/*hr */}
                                        <Route path='/candidateinfo' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><Candidateinfo/></ProtectedRoute>}></Route>{/*hr ,candidate */}
                                        <Route path="/SelectedCandidatesdetailsview" element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Hiring Manager")||props.getrolesprop.includes("Business Head")||props.getrolesprop.includes("Recruiter")}><SelectedCandidateDetailsView/></ProtectedRoute>} />{/*hr candidate ////bug*/}
                                        <Route path='/candidateinfo/PersonalDetails' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><PersonalDetails/></ProtectedRoute>}></Route>{/*hr ,candidate */}
                                        <Route path='/candidateinsurance' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><Insurance/></ProtectedRoute>}></Route>{/*hr ,candidate*/}
                                        <Route path='/BankDetails' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><BankDetails/></ProtectedRoute>}></Route>{/*hr,candidate */}
                                        <Route path='/PFDetails' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><PFDetails/></ProtectedRoute>}></Route>{/*hr,candidate */}


                                        <Route path='/candidateoperationsflow/:cancode' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("HR")}><Candidateoperationsflow/></ProtectedRoute>}></Route>{/*hr */}


                                        <Route path='/candidatedashboard' element={<ProtectedRoute isAllowed={props.getrolesprop.includes("Candidate")||props.getrolesprop.includes("HR")}><CandidateDashboard/></ProtectedRoute>}></Route>{/*candidate and hr */}


                                        <Route path='/pagenotfound' element={<Pagenotfound/>}></Route>




                                    </Routes>
                                    </Suspense>
                                </div>


                            </div>

                            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                                <div className="layout-mask p-component-overlay"></div>
                            </CSSTransition>
                        </div>
                    {/* </div> : <LoginPage></LoginPage> */}
</div> :   <Navigate to="/Login" replace={true} />
                }
            />


        </Routes>
        </Suspense>

    );

}
function mapStateToProps(state) {
    return {
        getrolesprop: getuserroles(state),

    };
}
export default connect(mapStateToProps)(App);
