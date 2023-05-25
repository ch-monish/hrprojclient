import {put,call,takeEvery} from 'redux-saga/effects'
import { designationsdata,getdesignationsaction,createdesignationaction,updatedesignationaction} from './designationslice'
import {Designationapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* designationsgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Designationapi.getalldesignationsdata)
        // console.log(res)
        yield put({type:"designation/designationsdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createdesignationsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:designationapi.createdesignation,payload:payload})
        var res: Promise<any>=yield call(Designationapi.createdesignation,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield designationsgetsagaworker()
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
function* updatedesignationsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:designationapi.createdesignation,payload:payload})
        var res: Promise<any>=yield call(Designationapi.updatedesignation,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield designationsgetsagaworker()
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



export function* watcherdesignation(){
    yield takeEvery("designation/getdesignationsaction",designationsgetsagaworker)
    yield takeEvery("designation/createdesignationaction",createdesignationsagaworker)
    yield takeEvery("designation/updatedesignationaction",updatedesignationsagaworker)
   }