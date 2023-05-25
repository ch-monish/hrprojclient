import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICandidateactiondetails {
    
        id: Number
        CandidateApprovalID: Number,
        RoleName:  String,
        CandidateID: Number,
        CandidateCode: String,
        CandidateFirstName: String,
        Honorifics: String,
        CandidateLastName: String,
        CandidateName: String,
        ContactNo: String,
        CurrentCTC: Number,
        ExpectedCTC: Number,
        NegotiatedCTC: Number,
        Skills: String,
        CandidateResume: String,
        CurrentOrg: String,
        CurrentJobLocation: String,
        Email: String,
        ExpectedDOJ: String,
        CandidateReleventExp: String,
        CandidateOverallExp: String,
        HighestQualification: String,
        CandidateAvgApprovedCTC: Number,
        CandidateAvgBillRate: Number,
        JobPostID: Number,
        JobCode: String,
        UserName: String,
        HiringManager: String,
        ApproverName: String,
        ApproverDisplayName: String,
        ApproverEmail: String,
        JobTitle: String,
        JobDesc: String,
        EmploymentType: String,
        Duration: Number,
        NoOfPositions: Number,
        Qualification: String,
        OnBoardingDate: String,
        POReference: String,
        StageName: String,
        StageDesc: String,
        IndustryName: String,
        CompanyName: String,
        BusinessUnitName: String
        ServiceLineName: String,
        CustomerName: String,
        LocationName: String,
        ExperienceLevel: String,
        AvgApprovedCTC: Number,
        AvgBillRate: Number
    

}
const initialState: ICandidateactiondetails[] = [];

const candidateactiondetailsSlice=createSlice({
    name: 'Candidateactiondetails',
    initialState,
    reducers:{
        Candidates:(state,payload:PayloadAction<any>)=>{
            // console.log("setting candidate details")
            var temp=payload.payload
            state=[...temp]
          
            return state;

    },



    candidateactionsdetailsaction:(state,payload:PayloadAction<any>)=>{

    },
 
    candidateworkflowsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    businessheadapprovalsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    hiringmanagersubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    selectedcandidatesholdsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    selectedcandidateshrholdsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    financecontrollerapprovalsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    generalmanagerapprovalsubmitaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
    hrupdatecandidateaction:(state,payload:PayloadAction<any>)=>{
        console.log(payload)
    },
},
})
export const{Candidates,candidateactionsdetailsaction,candidateworkflowsubmitaction,businessheadapprovalsubmitaction, financecontrollerapprovalsubmitaction, generalmanagerapprovalsubmitaction, selectedcandidatesholdsubmitaction, selectedcandidateshrholdsubmitaction,hrupdatecandidateaction,hiringmanagersubmitaction }=candidateactiondetailsSlice.actions
export default candidateactiondetailsSlice.reducer