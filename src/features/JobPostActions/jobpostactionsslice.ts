import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJobPost {
        id: number,
        JobPostApprovalID: number,
        JobPostID: number,
        JobCode: String,
        UserName: String,
        HiringManager:  String,
        ApproverName: String,
        ApproverDisplayName:String,
        ApproverEmail: String,
        JobTitle: String,
        JobDesc: String,
        EmploymentType:String,
        Duration: String,
        NoOfPositions: number,
        Qualification: String,
        OnBoardingDate: string,
        POReference: string,
        Stage: String,
        StageDesc: String,
        Industry: String,
        Company: String,
        BusinessUnit: String,
        ServiceLine:  String,
        Customer: String,
        Location: String,
        ExperienceLevel: String,
        AvgApprovedCTC:Number,
        AvgBillRate:Number


}
const initialState: IJobPost[] = [];

export const JobPostActionSlice = createSlice({
    name: 'JobPostAction',
    initialState,
    reducers: {
        JobPostActiondata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getJobPostActionfromapi:(state,payload:PayloadAction<any>)=>{
            // console.log(payload)
        },
        createnewjobpost:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatejobpost:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateIJobPostAction:(state,payload:PayloadAction<any>)=>{

        },
        jobpostactionssubmit:(state,payload:PayloadAction<any>)=>{

        },
        
       
       

    },
});
export const {JobPostActiondata,getJobPostActionfromapi,createnewjobpost,updatejobpost,updateIJobPostAction,jobpostactionssubmit}=JobPostActionSlice.actions
export default JobPostActionSlice.reducer