import {createSlice,PayloadAction} from '@reduxjs/toolkit'

const initialState:any[]=[]
export const prevfeedbackSlice=createSlice({
    name:'prevfeedback',
    initialState,
    reducers:{
        prevfeedbackdata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        prevfeedbacksaction:(state,payload:PayloadAction<any>)=>{

        }
    }
})
export const{prevfeedbackdata,prevfeedbacksaction}=prevfeedbackSlice.actions
export default prevfeedbackSlice.reducer