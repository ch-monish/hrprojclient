import { createSlice, PayloadAction} from "@reduxjs/toolkit"
export interface Iglobalstore{
    dashboardactivetab:String,
    acceptedcandidateactivetab:String,
    candidateinfoactivetab:number
}
const initialState:Iglobalstore={
    dashboardactivetab: "",
    candidateinfoactivetab: 0,
    acceptedcandidateactivetab: "Full-Time"
}


export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setdashboardactivetab:(state,payload)=>{
            state.dashboardactivetab=payload.payload

            return state
        },
        setacceptedcandidateactivetab:(state,payload)=>{
            state.acceptedcandidateactivetab=payload.payload

            return state
        },
        setnextcandidateinfotab:(state)=>{
            console.log("+1")
            state.candidateinfoactivetab+=1
            return state
        },
        setprevcandidateinfotab:(state)=>{
            console.log("-1")
            state.candidateinfoactivetab-=1
            return state
        },
        setcandidateinfotab:(state,payload:PayloadAction<any>)=>{
            console.log(payload.payload)
            state.candidateinfoactivetab=payload.payload
            return state
        }

    }

})
export const {setdashboardactivetab,setnextcandidateinfotab,setprevcandidateinfotab,setcandidateinfotab,setacceptedcandidateactivetab}=globalSlice.actions
export default globalSlice.reducer
