import {put,call,takeEvery} from 'redux-saga/effects'
import {customersdata,getcustomersaction,createcustomeraction,updatecustomeraction} from './customerslice'
import {Customerapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* customersgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Customerapi.getallcustomersdata)
        // console.log(res)
        yield put({type:"customer/customersdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createcustomersagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:customerapi.createcustomer,payload:payload})
        var res: Promise<any>=yield call(Customerapi.createcustomer,payload.payload)
        // console.log(res)
        // yield put({type:customersdata,payload:res})
        yield customersgetsagaworker()
        yield put(createtoast({

            id:454,

            status:"success",

            data:"Added succesfully",

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)

yield put(createtoast({

    id:34324,

    status:"error",

    data:" Customer already exists",

    endpoint:"400"

}))



    }
}
function* updatecustomersagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:customerapi.createcustomer,payload:payload})
        var res: Promise<any>=yield call(Customerapi.updatecustomer,payload.payload)
        // console.log(res)
        // yield put({type:customersdata,payload:res})
        yield customersgetsagaworker()
        yield put(createtoast({

            id:987878,

            status:"success",

            data:"updated succesfully",

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)
yield put(createtoast({
    id:987878,
    status:"error",
    data:"failed to update",
    endpoint:"400"
}))


    }
}



export function* watchercustomer(){
    yield takeEvery("customer/getcustomersaction",customersgetsagaworker)
    yield takeEvery("customer/createcustomeraction",createcustomersagaworker)
    yield takeEvery("customer/updatecustomeraction",updatecustomersagaworker)
   }