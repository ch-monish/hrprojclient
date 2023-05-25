import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Iemployementdetail {
    id: Number,
    files: any[],
    PreviousCompanyName: string,
    PreviousCompanyAddress: string,
    Start_Date: string,
    End_Date:string,
    Designationonjoining: string,
    Designationonleaving: string,
    selectedCandidateId: Number
}
const initialState: Iemployementdetail[] = []

const employementdetailsSlice = createSlice({
    name: 'employementdetails',
    initialState,
    reducers: {
        employementdetailsdata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state = temp

            return state;

        },



        employementdetailsgetaction: (state, payload: PayloadAction<any>) => {
console.log("abcd")
console.log(payload)
        },
        createemployementdetailsaction: (state, payload: PayloadAction<any>) => {

        },
        updateemployementdetailsaction: (state, payload: PayloadAction<any>) => {

        },
        deleteemployementdetailsaction: (state, payload: PayloadAction<any>) => {
console.log("delete employment")
        },



    },
})
export const { employementdetailsdata, employementdetailsgetaction, createemployementdetailsaction ,updateemployementdetailsaction, deleteemployementdetailsaction} = employementdetailsSlice.actions
export default employementdetailsSlice.reducer