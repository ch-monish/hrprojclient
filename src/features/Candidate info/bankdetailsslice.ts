import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ibankdetail { 
    Id:Number,
    BankName:string,
    files: any[],
    AccountNumber:string,
    BranchName:string, 
    IFSCcode:string, 
    BankPassbook:string,
    selectedcandidateid: Number

}

const initialState: Ibankdetail = {
    Id: 0,
    BankName: "",
    files: [],
    AccountNumber: "",
    BranchName: "",
    IFSCcode: "",
    BankPassbook: "",
    selectedcandidateid: 0
}

const bankdetailsSlice = createSlice({
    name: 'bankdetails',
    initialState,
    reducers: {
        bankdetailsdata: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            var temp = payload.payload
            state = temp

            return state;

        },



        bankdetailsgetaction: (state, payload: PayloadAction<any>) => {
console.log("abcd")
console.log(payload)
        },
        createbankdetailsaction: (state, payload: PayloadAction<any>) => {

        },
        updatebankdetailsaction: (state, payload: PayloadAction<any>) => {

        },
        deletebankdetailsaction: (state, payload: PayloadAction<any>) => {
console.log("delete employment")
        },



    },
})
export const { bankdetailsdata, bankdetailsgetaction, createbankdetailsaction ,updatebankdetailsaction, deletebankdetailsaction} = bankdetailsSlice.actions
export default bankdetailsSlice.reducer