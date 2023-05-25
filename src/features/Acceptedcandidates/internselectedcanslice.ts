import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinternselectedcanslice{
    candidate:any;
    jobpost:any;
}
const initialState:Iinternselectedcanslice[]=[]
export const Internselectedcandidate=createSlice({
    name:"Internselectedcandidates",
    initialState,
    reducers:{

        internselcandidatesdata:(state,payload)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        internselcandidatesgetaction:()=>{

        },
        updateinterncandidateaction:(state,payload:PayloadAction<any>)=>{
            
        }

    }



})
export const {internselcandidatesdata,internselcandidatesgetaction,updateinterncandidateaction}=Internselectedcandidate.actions
export default Internselectedcandidate.reducer