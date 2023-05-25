import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Designation {
    DesignationId: number;
    DesignationName: string;
    DesignationDesc: string;
    Active: boolean;
}
const initialState: Designation[] = [];

export const designationSlice = createSlice({
    name: "designation",
    initialState,
    reducers: {
        designationsdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getdesignationsaction:(state)=>{
        },
        createdesignationaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatedesignationaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {designationsdata,getdesignationsaction,createdesignationaction,updatedesignationaction}=designationSlice.actions
export default designationSlice.reducer