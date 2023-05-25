import {put,call,takeEvery} from 'redux-saga/effects'
import { Insurancedata,getInsuranceaction,createInsuranceaction,updateInsuranceaction} from './ManageInsuranceslice'
import {insuranceapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* Insurancegetsagaworker(){
    try{
        // console.log("getting ............................")
        var res: Promise<any>=yield call(insuranceapi.getallInsurancedata)
        // console.log(res)
        yield put({type:"Insurance/Insurancedata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createInsurancesagaworker(payload){
    try{
        console.log(payload)
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(insuranceapi.createInsurance,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Insurancegetsagaworker()
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
function* updateInsurancesagaworker(payload){

    try{
        console.log(payload)
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(insuranceapi.updateInsurance,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Insurancegetsagaworker()
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



export function* watcherInsurance(){
    yield takeEvery("Insurance/getInsuranceaction",Insurancegetsagaworker)
    yield takeEvery("Insurance/createInsuranceaction",createInsurancesagaworker)
    yield takeEvery("Insurance/updateInsuranceaction",updateInsurancesagaworker)
   }