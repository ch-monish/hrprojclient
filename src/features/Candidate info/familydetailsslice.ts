import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ifamilydetail {

    id: number,
    selectedCandidateid: number,
    FullName: string,
    Date_Of_Birth: Date,
    Relationship_with_employee: string,
    Contact_Number: string,

}
const initialState: Ifamilydetail[] = []
const familydetailsSlice = createSlice({
    name: 'Familydetails',
    initialState,
    reducers: {
        familydetailsdata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state =[...temp]

            return state;

        },



        familydetailsaction: (state, payload: PayloadAction<any>) => {
            console.log("abcd")
            console.log(payload)
        },
        createfamilydetailsaction: (state, payload: PayloadAction<any>) => {
console.log("createfamily")
        },
        updatefamilydetailsaction: (state, payload: PayloadAction<any>) => {

        },
        deletefamilydetailsaction: (state, payload: PayloadAction<any>) => {
console.log(payload)
        },




    },
})
export const { familydetailsdata, familydetailsaction, createfamilydetailsaction, updatefamilydetailsaction, deletefamilydetailsaction } = familydetailsSlice.actions
export default familydetailsSlice.reducer