import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Insurance {
    InsuranceAccidentLimitId: number;
    BandID: string;
    InsuranceLimit: number;
    AccidentLimit: string;
    Active: boolean;
}
const initialState: Insurance[] = [];

export const InsuranceSlice = createSlice({
    name: "Insurance",
    initialState,
    reducers: {
        Insurancedata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getInsuranceaction:(state)=>{
          
            
        },
        createInsuranceaction:(state,payload:PayloadAction<any>)=>{
// console.log(payload)
        },
        updateInsuranceaction:(state,payload:PayloadAction<any>)=>{


        }

    },
});
export const {Insurancedata,getInsuranceaction,createInsuranceaction,updateInsuranceaction}=InsuranceSlice.actions
export default InsuranceSlice.reducer