import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {};

const candidateinfoSlice = createSlice({
    name: 'candidateinfo',
    initialState,
    reducers: {
        Candidateinfodata: (state, payload: PayloadAction<any>) => {
            // console.log("setting candidate details")
            var temp = payload.payload
            state = temp

            return state;

        },
        candidateinfogetaction: (state, payload: PayloadAction<any>) => {

        },
        documentdownloadaction: (state, payload: PayloadAction<any>) => {

        },
        deletedocumentaction: (state, payload: PayloadAction<any>) => {

        },
        uploaddocumentaction: (state, payload: PayloadAction<any>) => {

        },
        getcandidateinfoclearanceaction: (state, payload: PayloadAction<any>) => {

        },
        shownotifycandidatebuttonaction: (state, payload: PayloadAction<any>) => {

        },
        acceptofferletteraction: (state, payload: PayloadAction<any>) => {

        },
        notifycandidatedocsbymailaction: (state, payload: PayloadAction<any>) => {

        },
        addtostatecandidateinfoclearanceaction: (state, payload: PayloadAction<any>) => {
            console.log(payload.payload)
            var clearance = payload.payload
            state = { ...state, clearance }

            return state;
        },
        addtostatecandidateinfoshownotifybutton: (state, payload: PayloadAction<any>) => {
            console.log(payload)
            console.log(payload.payload)
            var shownotifybutton = payload.payload.shownotifybutton
            state = { ...state, shownotifybutton }

            return state;
        },
        verifycandidatesuccess:(state,payload:PayloadAction<any>)=>{
            console.log(payload)
            console.log(payload.payload)
            var candidateverified = payload.payload.message
            state = { ...state, candidateverified }

            return state;
        },
        verifycandidatefailure:(state)=>{
            var candidateverified = ""
            state = { ...state, candidateverified }

            return state;
        },


        verifydocumentaction: (state, payload: PayloadAction<any>) => {
            console.log("working")
            console.log(payload.payload)
        },
        verifycandidateaction: (state, payload: PayloadAction<any>) => {
            console.log("working")
            console.log(payload.payload)
        }
    }
})
export const { verifycandidatesuccess,verifycandidatefailure,Candidateinfodata, candidateinfogetaction, documentdownloadaction, shownotifycandidatebuttonaction,notifycandidatedocsbymailaction,addtostatecandidateinfoshownotifybutton,deletedocumentaction, uploaddocumentaction, getcandidateinfoclearanceaction, acceptofferletteraction, verifydocumentaction,verifycandidateaction } = candidateinfoSlice.actions
export default candidateinfoSlice.reducer
