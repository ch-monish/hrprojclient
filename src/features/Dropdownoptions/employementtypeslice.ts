import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export  interface IEmployement{
    EmployementTypeId: Number
    EmployementType: String
    Active:Boolean
}

const initialState:IEmployement[]=[]
export const EmployementSlice=createSlice({
    name:'EmployemntType',
    initialState,
    reducers:{
        employementdata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        },
        employementaction:(state)=>{

        }
    }
})
export const{employementdata,employementaction}=EmployementSlice.actions
export default EmployementSlice.reducer