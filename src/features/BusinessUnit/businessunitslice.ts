import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BusinessUnit {
    [x: string]: any;
    BusinessUnitId: number;
    CompanyId : number;
    BusinessUnitName: string;
    BusinessUnitDesc: string;
    Active: boolean;
}


export interface IBusinessUnitoptions{
    key:number,
    label:string;
    value:number
}








const initialState: BusinessUnit[] = [];

export const businessunitSlice = createSlice({
    name: "businessunit",
    initialState,
    reducers: {
        businessunitsdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getbusinessunitsaction:(state)=>{
        },
        createbusinessunitaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatebusinessunitaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {businessunitsdata,getbusinessunitsaction,createbusinessunitaction,updatebusinessunitaction}=businessunitSlice.actions
export default businessunitSlice.reducer