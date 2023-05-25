import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ipersonaldetail {
    AADHAR: string
    Address: string
    BloodGroup: string
    ContactNumber: string
    DateOfBirth: string
    Email: string
    EmergencycontactName: string
    EmergencycontactNumber: string
    EmergencycontactRelation: string
    Gender: string
    Marital_status: string
    Name: string
    PAN: string
    PassportNumber: string
    PassportValidFrom: string
    PassportValidTo: string
    id: number
    selectedCandidateid: number
}
const initialState: Ipersonaldetail = {
    AADHAR: "",
    Address: "",
    BloodGroup: "",
    ContactNumber: "",
    DateOfBirth: "",
    Email: "",
    EmergencycontactName: "",
    EmergencycontactNumber: "",
    EmergencycontactRelation: "",
    Gender: "",
    Marital_status: "",
    Name: "",
    PAN: "",
    PassportNumber: "",
    PassportValidFrom: "",
    PassportValidTo: "",
    id: 0,
    selectedCandidateid: 0
};

const personaldetailsSlice = createSlice({
    name: 'Personaldetails',
    initialState,
    reducers: {
        Personaldetailsdata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state = temp

            return state;

        },



        personaldetailsaction: (state, payload: PayloadAction<any>) => {
console.log("abcd")
console.log(payload)
        },
        createpersonaldetailsaction: (state, payload: PayloadAction<any>) => {

        },
        updatepersonaldetailsaction: (state, payload: PayloadAction<any>) => {

        },



    },
})
export const { Personaldetailsdata, personaldetailsaction, createpersonaldetailsaction ,updatepersonaldetailsaction} = personaldetailsSlice.actions
export default personaldetailsSlice.reducer