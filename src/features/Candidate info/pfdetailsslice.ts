import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ipfdetail {
    PreviousCompanyUAN:string
    PreviousMemberId:string
    MemberNameAsPerAadhar:string
    AADHAR:string
    DateOfBirth:string
    Date_Of_Joining:string 
    Gender:string
    FatherOrHusbandName:string
    Relation:string
    Marital_status:string
    InternationalWorker:string
    ContactNumber:string
    Email:string
    Nationality:string
    wages:string
    Qualification:string
    CountryOfOrigin:string
    PassportNumber:string
    PassportValidFrom:string
    PassportValidTill:string
    PhysicalHandicap:string
    AccountNumber:string
    IFSCcode:string
    NameAsPerBank:string    
    PAN:string
    NameAsPerPan:string    
    selectedCandidateid: number
    Id: number
      locomotive:boolean
              Hearing:boolean
              Visual:boolean
}
const initialState: Ipfdetail = {
    PreviousCompanyUAN: "",
    PreviousMemberId: "",
    MemberNameAsPerAadhar: "",
    AADHAR: "",
    DateOfBirth: "",
    Date_Of_Joining: "",
    Gender: "",
    FatherOrHusbandName: "",
    Relation: "",
    Marital_status: "",
    InternationalWorker: "",
    ContactNumber: "",
    Email: "",
    Nationality: "",
    wages: "",
    Qualification: "",
    CountryOfOrigin: "",
    PassportNumber: "",
    PassportValidFrom: "",
    PassportValidTill: "",
    PhysicalHandicap: "",
    AccountNumber: "",
    IFSCcode: "",
    NameAsPerBank: "",
    PAN: "",
    NameAsPerPan: "",
    Id: 0,
    selectedCandidateid: 0,
    locomotive: false,
    Hearing: false,
    Visual: false
};

const  pfdetailsSlice = createSlice({
    name: 'Pfdetails',
    initialState,
    reducers: {
        pfdetailsdata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state = temp

            return state;

        },



        pfdetailsaction: (state, payload: PayloadAction<any>) => {
            console.log("abcd")
            console.log(payload)
        },
        createpfdetailsaction: (state, payload: PayloadAction<any>) => {

        },
        updatepfdetailsaction: (state, payload: PayloadAction<any>) => {

        },



    },
})
export const {  pfdetailsdata,  pfdetailsaction, createpfdetailsaction, updatepfdetailsaction } =  pfdetailsSlice.actions
export default  pfdetailsSlice.reducer