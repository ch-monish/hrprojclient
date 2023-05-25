import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ieducationaldetail {
    id:Number,
        files: any[],
        Qualification: string,
        Specialization: string,
        Start_Date: Date,
        End_Date:Date,
        Institute:string,
        Percentage: string,
        selectedCandidateId: Number
}
const initialState: Ieducationaldetail[] = []

const EducationaldetailsSlice = createSlice({
    name: 'educationaldetails',
    initialState,
    reducers: {
        Educationaldetailsdata: (state, payload: PayloadAction<any>) => {
            // console.log(payload)
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;

        },



        educationaldetailsgetaction: (state, payload: PayloadAction<any>) => {

// console.log(payload)
        },
        createedducationaldetailsaction: (state, payload: PayloadAction<any>) => {

        },
        updateedducationaldetailsaction: (state, payload: PayloadAction<any>) => {

        },
        deleteedducationaldetailsaction: (state, payload: PayloadAction<any>) => {

        },



    },
})
export const { Educationaldetailsdata, educationaldetailsgetaction, createedducationaldetailsaction ,updateedducationaldetailsaction,deleteedducationaldetailsaction} = EducationaldetailsSlice.actions
export default EducationaldetailsSlice.reducer