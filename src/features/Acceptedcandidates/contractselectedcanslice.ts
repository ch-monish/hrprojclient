import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Icontractselectedcansliceslice{
candidate:any;
jobpost:any;
}
const initialState:Icontractselectedcansliceslice[]=[]
export const Contractselectedcandidate=createSlice({
    name:"Contractselectedcandidates",
    initialState,
    reducers:{

        contractselcandidatesdata:(state,payload)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        contractselcandidatesgetaction:()=>{

        },
        updatecontractcandidateaction:(state,payload:PayloadAction<any>)=>{
            console.log("updatecontractslcie working")
        }

    }



})
export const {contractselcandidatesdata,contractselcandidatesgetaction,updatecontractcandidateaction}=Contractselectedcandidate.actions
export default Contractselectedcandidate.reducer
