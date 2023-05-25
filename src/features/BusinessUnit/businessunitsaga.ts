import {put,call,takeEvery} from 'redux-saga/effects'
import { businessunitsdata,getbusinessunitsaction,createbusinessunitaction,updatebusinessunitaction} from './businessunitslice'
import {businessunitapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* businessunitsgetsagaworker(){
    try{
        var res: Promise<any>=yield call(businessunitapi.getallbusinessunitsdata)
        // console.log(res)
        yield put({type:"businessunit/businessunitsdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createbusinessunitsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:businessunitapi.createbusinessunit,payload:payload})
        var res: Promise<any>=yield call(businessunitapi.createbusinessunit,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield businessunitsgetsagaworker()
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)

yield put(createtoast({

    id:34324,

    status:"error",

   
    data:err.data[0][0],                                    

    endpoint:err.config.url.toString()
}))


    }
}
function* updatebusinessunitsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:businessunitapi.createbusinessunit,payload:payload})
        var res: Promise<any>=yield call(businessunitapi.updatebusinessunit,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield businessunitsgetsagaworker()
        yield put(createtoast({

            id:987878,

            status:"success",

            data:res.toString(),

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
if(err.data!=undefined)
yield put(createtoast({
    id:987878,
    status:"error",
    data:err.data[0][0],                                 
    endpoint:err.config.url.toString()
}))


    }
}



export function* watcherbusinessunit(){
    yield takeEvery("businessunit/getbusinessunitsaction",businessunitsgetsagaworker)
    yield takeEvery("businessunit/createbusinessunitaction",createbusinessunitsagaworker)
    yield takeEvery("businessunit/updatebusinessunitaction",updatebusinessunitsagaworker)
   }