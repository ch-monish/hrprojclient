import {put,call,takeEvery} from 'redux-saga/effects'
import { subbandsdata,getsubbandsaction,createsubbandaction,updatesubbandaction} from './subbandslice'
import {SubBandapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* subbandsgetsagaworker(){
    try{
        var res: Promise<any>=yield call(SubBandapi.getallsubbandsdata)
        // console.log(res)
        yield put({type:"subband/subbandsdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createsubbandsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:subbandapi.createsubband,payload:payload})
        var res: Promise<any>=yield call(SubBandapi.createsubband,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield subbandsgetsagaworker()
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

    data:" Company Name already exists",

    endpoint:"400"

}))


    }
}
function* updatesubbandsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:subbandapi.createsubband,payload:payload})
        var res: Promise<any>=yield call(SubBandapi.updatesubband,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield subbandsgetsagaworker()
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



export function* watchersubband(){
    yield takeEvery("subband/getsubbandsaction",subbandsgetsagaworker)
    yield takeEvery("subband/createsubbandaction",createsubbandsagaworker)
    yield takeEvery("subband/updatesubbandaction",updatesubbandsagaworker)
   }