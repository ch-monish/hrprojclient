import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ServiceLine {
    ServiceLineId: number;
    CompanyId:number,
    BusinessUnitId: number;
    ServiceLineName: string;
    Acronym: string;
    ServiceLineDesc: string;
    Active: boolean;
}



export interface IServiceLineoptions{
    key:number,
    label:string,
    value:number
}
const initialState: ServiceLine[] = [];

export const servicelineSlice = createSlice({
    name: "serviceline",
    initialState,
    reducers: {
        servicelinedata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getservicelineaction:(state)=>{
            // console.log(state)
            
        },
        createservicelineaction:(state,payload:PayloadAction<any>)=>{
// console.log(payload)
        },
        updateservicelineaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)

        }

    },
});
export const {servicelinedata,getservicelineaction,createservicelineaction,updateservicelineaction}=servicelineSlice.actions
export default servicelineSlice.reducer