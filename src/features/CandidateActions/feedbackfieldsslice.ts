import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export  interface IFeedbackfield{
    FeedbackCategoryID: number,
    InterviewType:String,
    FeedbackCategory: String
}

const initialState:IFeedbackfield[]=[]
export const feedbackfieldSlice=createSlice({
    name:'feedbackfield',
    initialState,
    reducers:{
        feedbackfielddata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        feedbackfieldaction:(state,payload:PayloadAction<any>)=>{

        },
  
    }
})
export const{feedbackfielddata,feedbackfieldaction}=feedbackfieldSlice.actions
export default feedbackfieldSlice.reducer