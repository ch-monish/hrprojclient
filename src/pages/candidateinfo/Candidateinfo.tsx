import React, { useEffect, useRef, useState } from "react";
import { Steps } from "primereact/steps";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PersonalDetails from "./candidateinfocomponents/PersonalDetails";
import FamilyDetails from "./candidateinfocomponents/FamilyDetails";
import Education from "./candidateinfocomponents/Education";
import Employement from "./candidateinfocomponents/Employement";
import PFDetails from "./candidateinfocomponents/PFDetails";
import Documents from "./candidateinfocomponents/Documents";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { setcandidateinfotab } from "../../features/Misc/globalslice";
import Declaration from "./candidateinfocomponents/Declaration";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Insurance from "./candidateinfocomponents/Insurance";
import BankDetaiis from "./candidateinfocomponents/BankDetails";
import BankDetails from "./candidateinfocomponents/BankDetails";
import { personaldetailsaction } from "../../features/Candidate info/personaldetailsslice";
import { notifycandidatedocsbymailaction, shownotifycandidatebuttonaction, verifycandidateaction, verifycandidatefailure } from "../../features/Candidate info/candidateinfoslice";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import LoadingOverlay from "react-loading-overlay";
import { candidateinfo } from "../../api/agent";
function Candidateinfo() {
    // const [activeIndex, setActiveIndex] = useState(0);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);

    const activeIndex = useSelector((store: RootState) => store.global.candidateinfoactivetab);
    const Logindata = useSelector((state: RootState) => state.Login);
    const [roles, setRoles] = useState<any>([]);

    const dispatch = useDispatch();
    const [showspinner, setShowspinner] = useState(false);
    const toast = useRef(null);
    useEffect(()=>{
        if(!Object.is(candidateinfodata.candidateverified,null)){
            console.log(candidateinfodata.candidateverified)
            if(candidateinfodata.candidateverified=="Candidate verified"){
                navigate('/dashboard')
            }

        }

    },[candidateinfodata.candidateverified])
    useEffect(() => {
        dispatch(verifycandidatefailure())
        dispatch(shownotifycandidatebuttonaction({ selectedcandidateid: candidateinfodata.Selected_Candidate_ID }));
        var w: any = [];
        // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        Logindata.groups.forEach((i) => setRoles((roles) => [...roles, i["name"].toString()]));
        console.log(activeIndex);
        if (activeIndex == null) setcandidateinfotab(0);

        dispatch(personaldetailsaction({ selectedcandidateid: candidateinfodata.Selected_Candidate_ID }));
    }, [activeIndex]);
    const navigate = useNavigate();
    const wizardItems = [
        {
            label: "Personal Details",
            command: (e) => {
                dispatch(setcandidateinfotab(e.index));
            },
            Template: <>abcd</>,
        },
        {
            label: "Family Details",
            command: (e) => {
                dispatch(setcandidateinfotab(e.index));
            },
        },
        {
            label: "Education",
            command: (e) => {
                console.log(e);
                dispatch(setcandidateinfotab(e.index));
            },
        },
        { label: "Employement", command: (e) => dispatch(setcandidateinfotab(e.index)) },

        // { label: 'Insurance', command: (e) =>dispatch(setcandidateinfotab(e.index))},
        // { label: 'Bank Details', command: (e) =>dispatch(setcandidateinfotab(e.index))},
        // { label: 'PF Details', command: (e) =>dispatch(setcandidateinfotab(e.index))},
        { label: "Documents", command: (e) => dispatch(setcandidateinfotab(e.index)) },

        // (!(roles.includes("HR")||roles.includes("Recruiter")))?{ label: 'Declaration', command: (e) =>dispatch(setcandidateinfotab(e.index)) }:{}
    ];

    if (!(roles.includes("HR") || roles.includes("Recruiter"))) {
        wizardItems.push({ label: "Declaration", command: (e) => dispatch(setcandidateinfotab(e.index)) });
    }
    return (
        <div>
            <style>
                {`

        // .p-tooltip .p-tooltip-text {
        //   background: #ffffff;
        //   color:"#111111"
        // }


        `}
            </style>
            <LoadingOverlay active={showspinner} spinner text="Processing...">
                <Toast ref={toast} position="bottom-left" />
                <div className="col-12 md:col-12">
                    <Card title="Candidate Information">
                        {roles.includes("HR") && candidateinfodata.shownotifybutton == true && (
                            <Button
                                className=""
                                onClick={(e) => {
                                    // dispatch(notifycandidatedocsbymailaction({
                                    //   "selectedcandidateid":candidateinfodata.Selected_Candidate_ID
                                    // }))

                                    setShowspinner(true);
                                    candidateinfo
                                        .notifycandidatedocsbymail({
                                            selectedcandidateid: candidateinfodata.Selected_Candidate_ID,
                                        })
                                        .then((res) => {
                                            console.log(res);
                                            setShowspinner(false);
                                            toast.current.show({ severity: "success", summary: "Success Message", detail: res, life: 3000 });
                                        })
                                        .then((res) => {})
                                        .then(() =>
                                            setTimeout(() => {
                                                navigate(-2);
                                            }, 2000)
                                        )
                                        .catch((ex) => {
                                            console.log(ex);
                                            setShowspinner(false);
                                            toast.current.show({ severity: "error", summary: "Error Message", detail: ex.data, life: 3000 });
                                        });
                                }}
                            >
                                Click here to notify candidate
                            </Button>
                        )}

                       {  (roles.includes("HR")&&candidateinfodata.shownotifybutton!=true && candidateinfodata.VerificationStatus!="verified" )&&<Button
                            onClick={(e) => {
                                dispatch(
                                    verifycandidateaction({
                                        selectedcandidateid: candidateinfodata.Selected_Candidate_ID,
                                    })
                                );
                            }}
                        >
                            Click here to complete verification
                        </Button>}

                        <br />

                        <Tooltip target=".tooltip-button " className="validateoptionstooltip" autoHide={false} style={{ background: "" }}>
                            <div className="flex align-items-center" style={{ background: "" }}>
                                <div>
                                    {/* <InputTextarea style={{margin:"5px"}}></InputTextarea> */}
                                    <textarea></textarea>
                                </div>
                                <Button type="button" icon="pi pi-check" onClick={() => console.log("abc")} className="p-button-rounded p-button-success ml-2"></Button>
                                <Button type="button" icon="pi pi-minus-circle" onClick={() => console.log("def")} className="p-button-rounded p-button-danger ml-2"></Button>
                                <br />
                            </div>
                        </Tooltip>
                        <Steps model={wizardItems} activeIndex={activeIndex} onSelect={(e) => dispatch(setcandidateinfotab(e.index))} readOnly={false} />

                        <div>
                            <br></br>
                            {activeIndex == 0 && <PersonalDetails></PersonalDetails>}
                            {activeIndex == 1 && <FamilyDetails></FamilyDetails>}
                            {activeIndex == 2 && <Education></Education>}
                            {activeIndex == 3 && <Employement></Employement>}
                            {/* {
  activeIndex==4&&<Insurance></Insurance>
}
{
  activeIndex==5&&<BankDetails></BankDetails>
}
{
  activeIndex==6&&<PFDetails></PFDetails>
} */}
                            {activeIndex == 4 && <Documents></Documents>}
                            {activeIndex == 5 && <Declaration></Declaration>}
                        </div>
                    </Card>
                </div>
            </LoadingOverlay>
        </div>
    );
}

export default Candidateinfo;
