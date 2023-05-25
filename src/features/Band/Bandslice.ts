import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Band {
    BandId: number;
    BandName: string;
    BandDesc: string;
    Active: boolean;
}
export interface IBandoptions{
    key:number,
    label:string;
    value:number
}
const initialState: Band[] = [];

export const BandSlice = createSlice({
    name: "Band",
    initialState,
    reducers: {
        Banddata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getBandaction:(state)=>{
        },
        createBandaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateBandaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {Banddata,getBandaction,createBandaction,updateBandaction}=BandSlice.actions
export default BandSlice.reducer