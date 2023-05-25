import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubBand {
    SubBandId: number;
    SubBandName: string;
    BandId:string|number;
    SubBandDesc: string;
    Active: boolean;
}
const initialState: SubBand[] = [];

export const subbandSlice = createSlice({
    name: "subband",
    initialState,
    reducers: {
        subbandsdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getsubbandsaction:(state)=>{
        },
        createsubbandaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatesubbandaction:(state,payload:PayloadAction<any>)=>{
            console.log(payload)
        }

    },
});
export const {subbandsdata,getsubbandsaction,createsubbandaction,updatesubbandaction}=subbandSlice.actions
export default subbandSlice.reducer