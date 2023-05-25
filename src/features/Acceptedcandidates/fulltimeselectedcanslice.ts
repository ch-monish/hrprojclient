import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifulltimeselcan{
candidate:any;
jobpost:any,
}
const initialState:Ifulltimeselcan[]=[]
export const Fulltimeselcandidates=createSlice({
    name:"Fulltimeselcandidates",
    initialState,
    reducers:{

        fulltimeselcandidatesdata:(state,payload)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        fulltimeselcandidatesgetaction:()=>{

        },
        updatefulltimeselectedcandidateaction:(state,payload:PayloadAction<any>)=>{
            
        }


    }



})
export const {fulltimeselcandidatesdata,fulltimeselcandidatesgetaction,updatefulltimeselectedcandidateaction}=Fulltimeselcandidates.actions
export default Fulltimeselcandidates.reducer