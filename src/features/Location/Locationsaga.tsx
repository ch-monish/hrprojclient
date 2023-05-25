import {put,call,takeEvery} from 'redux-saga/effects'
import { Locationdata,getLocationaction,createLocationaction,updateLocationaction} from './Locationslice'
import {Locationapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* Locationgetsagaworker(){
    try{
        var res: Promise<any>=yield call(Locationapi.getallLocationdata)
        // console.log(res)
        yield put({type:"Location/Locationdata",payload:res})
    }
    catch(err){
// console.log(err)



    }
}
function* createLocationsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(Locationapi.createLocation,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Locationgetsagaworker()
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
function* updateLocationsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(Locationapi.updateLocation,payload.payload)
    //    console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield Locationgetsagaworker()
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



export function* watcherLocation(){
    yield takeEvery("Location/getLocationaction",Locationgetsagaworker)
    yield takeEvery("Location/createLocationaction",createLocationsagaworker)
    yield takeEvery("Location/updateLocationaction",updateLocationsagaworker)
   }