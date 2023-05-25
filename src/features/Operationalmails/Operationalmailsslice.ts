import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Ioperationalmails{
    id: number;
    mailcategory:String;
    mailsent: boolean;
    mailsentat: boolean;
    mailssentto: boolean;
    selectedcandidateid: number;

}
const initialState:Ioperationalmails[]=[]
const OperationalmailsSlice=createSlice({
    name:"operationalmails",
    initialState,
    reducers:{
        operationalmailsdata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state;
        },
        operationalmailssendaction:(state,payload:PayloadAction<any>)=>{


        },
        operationalmailsgetaction:(state,payload:PayloadAction<any>)=>{

        }

    }

})
export const{operationalmailsdata,operationalmailssendaction,operationalmailsgetaction}= OperationalmailsSlice.actions
export default OperationalmailsSlice.reducer
