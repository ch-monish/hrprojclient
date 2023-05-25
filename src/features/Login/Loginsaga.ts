import {put,call,takeEvery} from 'redux-saga/effects'
import {Login} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* Loginsagaworker(payload){
    try{
        var res: Promise<any>=yield call(Login.login,payload.payload)
        console.log(res)
        yield put({type:"Login/setlogindetails",payload:res})
        
    }
    catch(err){
console.log(err)
yield put({type:"Login/setloginerror",payload:err})


    }
}




export function* watcherLogin(){
    yield takeEvery("Login/loginaction",Loginsagaworker)
    }