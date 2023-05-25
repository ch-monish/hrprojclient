import {put,call,takeEvery} from 'redux-saga/effects'
import { Banddata,getBandaction,createBandaction,updateBandaction} from './Bandslice'
import {Bandapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* Bandgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Bandapi.getallBanddata)
        console.log(res)
        yield put({type:"Band/Banddata",payload:res})
    }
    catch(err){
console.log(err)

    }
}
function* createBandsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:Bandapi.createBand,payload:payload})
        var res: Promise<any>=yield call(Bandapi.createBand,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Bandgetsagaworker()
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

yield put (createtoast({

    id:34324,

    status:"error",

    data:err.data[0][0],                                    

    endpoint:err.config.url.toString()


}))

    }
}
function* updateBandsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:Bandapi.createBand,payload:payload})
        var res: Promise<any>=yield call(Bandapi.updateBand,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Bandgetsagaworker()
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



export function* watcherBand(){
    yield takeEvery("Band/getBandaction",Bandgetsagaworker)
    yield takeEvery("Band/createBandaction",createBandsagaworker)
    yield takeEvery("Band/updateBandaction",updateBandsagaworker)
   }