import {put,call,takeEvery} from 'redux-saga/effects'
import { servicelinedata,getservicelineaction,createservicelineaction,updateservicelineaction} from './ServiceLineSlice'
import {servicelineapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* servicelinegetsagaworker(){
    try{
        var res: Promise<any>=yield call(servicelineapi.getallservicelinedata)
        // console.log(res)
        yield put({type:"serviceline/servicelinedata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createservicelinesagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(servicelineapi.createserviceline,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield servicelinegetsagaworker()
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),

            endpoint:"400"

        }))
    }
    catch(err){
// console.log(err)
if(err.data!=undefined)

yield put(createtoast({

    id:34324,

    status:"error",

    data:err.data[0][0],                                    

    endpoint:err.config.url.toString()

}))




    }
}
function* updateservicelinesagaworker(payload){

    try{
        console.log(payload)
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(servicelineapi.updateserviceline,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield servicelinegetsagaworker()
        yield put(createtoast({

            id:987878,

            status:"success",

            data:res.toString(),


            endpoint:"400"

        }))
    }
    catch(err){
// console.log(err)
if(err.data!=undefined)
yield put(createtoast({
    id:987878,
    status:"error",
    data:err.data[0][0],                                 
    endpoint:err.config.url.toString()
}))


    }
}



export function* watcherserviceline(){
    yield takeEvery("serviceline/getservicelineaction",servicelinegetsagaworker)
    yield takeEvery("serviceline/createservicelineaction",createservicelinesagaworker)
    yield takeEvery("serviceline/updateservicelineaction",updateservicelinesagaworker)
   }