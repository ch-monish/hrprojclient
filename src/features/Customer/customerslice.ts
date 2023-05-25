import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Customer {
    CustomerId: number;
    CustomerName: string;
    CustomerDesc: string;
    Acronym:string;
    Active: boolean;
}
const initialState: Customer[] = [];

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        customersdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getcustomersaction:(state)=>{
        },
        createcustomeraction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatecustomeraction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {customersdata,getcustomersaction,createcustomeraction,updatecustomeraction}=customerSlice.actions
export default customerSlice.reducer