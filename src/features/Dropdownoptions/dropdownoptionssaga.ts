import {put,call,takeEvery} from 'redux-saga/effects'
import {companyapi, employementtypeapis, qualificationapis} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* employementactionsagaworker(){
    try{
        var res: Promise<any>=yield call(employementtypeapis.getallemployementtypes)
        // console.log(res)
        
        yield put({type:"EmployemntType/employementdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* qualificationactionsagaworker(){
    try{
        var res: Promise<any>=yield call(qualificationapis.getallqualifications)
        // console.log(res)
        
        yield put({type:"Qualifications/qualificationdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}

export function* watcherdropdownoptions(){
    yield takeEvery("EmployemntType/employementaction",employementactionsagaworker)
    yield takeEvery("Qualifications/qualificationaction",qualificationactionsagaworker)
   }