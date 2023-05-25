import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Industry {
    IndustryId: number;
    IndustryName: string;
    IndustryDesc: string;
    Active: boolean;
}
const initialState: Industry[] = [];

export const IndustrySlice = createSlice({
    name: "Industry",
    initialState,
    reducers: {
        Industriesdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getIndustriesaction:(state)=>{
        },
        createIndustryaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateIndustryaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {Industriesdata,getIndustriesaction,createIndustryaction,updateIndustryaction}=IndustrySlice.actions
export default IndustrySlice.reducer