import { createSlice, PayloadAction } from  "@reduxjs/toolkit" ;

export interface Iannexure {
    
        varDate : Date ,
        varName : string ,
        varDesignation :  string ,
        varBand :  string,
        varSubBand :  string ,
        varDOJ : string ,
        varSalary : Number,
        varSalaryWords :  string ,
        varLocation : string,
        varTotalFixedCTC : Number,
        varTotalACTC : Number,
        varTotalMCTC : Number,
        varABasic : Number,
        varMBasic :Number,
        varAHRA : Number,
        varMHRA : Number,
        varAPF : Number,
        varMPF : Number,
        iSBonus :  Boolean,
        varABonus : Number,
        varMBonus : Number,
        iSShiftAllow :  Boolean,
        varAShiftAllow : Number,
        varMShiftAllow :Number,
        varAFBP : Number,
        varMFBP : Number,
        varGMI : Number,
        varGPA :Number,
        iSMngtBonus :  Boolean,
        iSJoinBonus :  Boolean,
        iSMonthIncentive :  Boolean,
        iSVariablePay :  Boolean,
        varVariablePay : Number,
        varFixedPayPerc : Number,
        varVariablePayPerc : Number
    
       

}
const initialState: Iannexure={
    "varDate": new Date(),
    "varName": "Nimmana, Sudheer",
    "varDesignation": "Software Engineer",
    "varBand": "S",
    "varSubBand": "S1",
    "varDOJ": "2023-01-31T00:00:00.000Z",
    "varSalary": 0,
    "varSalaryWords": "Twenty Nine",
    "varLocation": "Hyderabad",
    "varTotalFixedCTC": 0,
    "varTotalACTC": 0,
    "varTotalMCTC": 0,
    "varABasic": 0,
    "varMBasic":0,
    "varAHRA": 0,
    "varMHRA": 0,
    "varAPF": 0,
    "varMPF": 0,
    "iSBonus": true,
    "varABonus":0,
    "varMBonus": 0,
    "iSShiftAllow": false,
    "varAShiftAllow": 0,
    "varMShiftAllow": 0,
    "varAFBP": 0,
    "varMFBP": 0,
    "varGMI": 0,
    "varGPA": 0,
    "iSMngtBonus": true,
    "iSJoinBonus": false,
    "iSMonthIncentive": true,
    "iSVariablePay": true,
    "varVariablePay": 0,
    "varFixedPayPerc": 0,
    "varVariablePayPerc": 0
}
 

const selectedcandidatesSlice=createSlice({
    name: 'annexure',
    initialState,
    reducers:{
        annexuredata:(state,payload:PayloadAction<any>)=>{
            console.log( "annexure details" )
            var temp=payload.payload
            state=temp
          
            return state;

    },



    // annexuregetaction:(state,payload:PayloadAction<any>)=>{

    // },
    
 
    
},
})
export const{annexuredata }=selectedcandidatesSlice.actions
export default selectedcandidatesSlice.reducer