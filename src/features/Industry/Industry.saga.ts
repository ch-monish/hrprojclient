import {put,call,takeEvery} from 'redux-saga/effects'
import { Industriesdata,getIndustriesaction,createIndustryaction,updateIndustryaction} from './Industryslice'
import { Industryapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* Industriesgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Industryapi.getallIndustrydata)
        // console.log(res)
        yield put({type:"Industry/Industriesdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createIndustrysagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:Industryapi.createIndustry,payload:payload})
        var res: Promise<any>=yield call(Industryapi.createIndustry,payload.payload)
        console.log(res)
        // yield put({type:Industriesdata,payload:res})
        yield Industriesgetsagaworker()
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),

            endpoint:"400"

        }))
    }
    catch(err){
        // console.log(err)
        //var temp:any=Object.values(err.data)[0]
//console.log(temp[0])
if(err.data!=undefined)

yield put(createtoast({

    id:34324,

    status:"error",

    data:err.data[0][0],                                       ///" Industry Name already exists",//

    endpoint:err.config.url.toString()

}))


    }
}
function* updateIndustrysagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:Industryapi.createIndustry,payload:payload})
        var res: Promise<any>=yield call(Industryapi.updateIndustry,payload.payload)
        // console.log(res)
        // yield put({type:Industriesdata,payload:res})
        yield Industriesgetsagaworker()
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



export function* watcherIndustry(){
    yield takeEvery("Industry/getIndustriesaction",Industriesgetsagaworker)
    yield takeEvery("Industry/createIndustryaction",createIndustrysagaworker)
    yield takeEvery("Industry/updateIndustryaction",updateIndustrysagaworker)
   }
