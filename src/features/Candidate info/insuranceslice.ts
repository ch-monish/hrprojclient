import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Iinsurance {
       
    Id :number,
    Name: string,
    DateOfBirth: Date,
    Relationship: string,
    Gender: string,
    selectedCandidateid: number,
   
}

const initialState: Iinsurance[] = []
const insuranceSlice = createSlice({
    name: 'insurance',
    initialState,
    reducers: {
        insurancedata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state = [...temp]

            return state;

        },



        insuranceaction: (state, payload: PayloadAction<any>) => {
            console.log("abcd")
            console.log(payload)
        },
        createinsuranceaction: (state, payload: PayloadAction<any>) => {
            console.log("createinsurance")
        },
        updateinsuranceaction: (state, payload: PayloadAction<any>) => {

        },
        deleteinsuranceaction: (state, payload: PayloadAction<any>) => {
            console.log(payload)
        },




    },
})
export const { insurancedata, insuranceaction, createinsuranceaction, updateinsuranceaction, deleteinsuranceaction } = insuranceSlice.actions
export default insuranceSlice.reducer