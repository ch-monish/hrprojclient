import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export  interface IQualification{
    QualificationId: Number
    Qualification: String
    Active:Boolean
}

const initialState:IQualification[]=[]
export const QualificationSlice=createSlice({
    name:'Qualifications',
    initialState,
    reducers:{
        qualificationdata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        qualificationaction:(state)=>{

        }
    }
})
export const{qualificationdata,qualificationaction}=QualificationSlice.actions
export default QualificationSlice.reducer