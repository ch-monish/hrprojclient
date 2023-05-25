import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IDepartments {
    ID: number;
    Email: string;
    Department: string;

}

const initialState: IDepartments[] = [];

export const DepartmentSlice = createSlice({
    name: "Departments",
    initialState,
    reducers: {
        Departmentsdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]

            // console.log(state)
            return state;
        },




        //functions for sagas watching
        getDepartmentsaction:(state)=>{
        },
        // createDepartmentsaction:(state,payload:PayloadAction<any>)=>{
        // },
        updateDepartmentsaction:(state,payload:PayloadAction<any>)=>{
        },


    },
});
export const {Departmentsdata,getDepartmentsaction,updateDepartmentsaction}=DepartmentSlice.actions
export default DepartmentSlice.reducer
