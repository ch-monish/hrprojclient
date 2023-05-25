import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Imyjobpost {
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
    POReference: number,
    Stage: String,
    StageDesc: String,
    Industry: String,
    Company: String,
    BusinessUnit: String,
    ServiceLine:  String,
    Customer: String,
    Location: String,
    ExperienceLevel: String,
    approversDetails:any,
    Comments:String

}
const initialState: Imyjobpost[] = [];

const myjobpostSlice=createSlice({
    name: 'myjobposts',
    initialState,
    reducers:{
        myjobposts:(state,payload:PayloadAction<any>)=>{
            var temp=payload.payload
            state=[...temp]

            return state;

    },



    myjobpostsaction:(state,payload:PayloadAction<any>)=>{

    },
    jobpostcancelaction:(state,payload:PayloadAction<any>)=>{

    },
},
})
export const{myjobposts,myjobpostsaction,jobpostcancelaction}=myjobpostSlice.actions
export default myjobpostSlice.reducer
