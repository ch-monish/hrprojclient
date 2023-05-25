import {put,call,takeEvery} from 'redux-saga/effects'
import {companyapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
import { companiesdata } from './companyslice'
function* companiesgetsagaworker(){
    try{
        var res: Promise<any>=yield call(companyapi.getallcompaniesdata)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        // yield store.dispatch({type:"company/companiesdata",payload:res})
        // yield store.dispatch(companiesdata(res))
        // yield put(companiesdata(res))
        yield put({type:"company/companiesdata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createcompanysagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(companyapi.createcompany,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield companiesgetsagaworker()

        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch(err){
        console.log(err)
        //var temp:any=Object.values(err.data)[0]
//console.log(temp[0])
// yield put({type:"company/seterror",payload:err})
if(err.data!=undefined)

yield put(createtoast({

    id:34324,

    status:"error",

    data:err.data[0][0],                                                       //change this

    endpoint:err.config.url.toString()                                        //change this

}))


    }
}
function* updatecompanysagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(companyapi.updatecompany,payload.payload)
        console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield companiesgetsagaworker()
        yield put(createtoast({

            id:987878,

            status:"success",

            data:res.toString(),                                    //change this

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err.data[0][0])
if(err.data!=undefined)
yield put(createtoast({
    id:987878,
    status:"error",
    data:err.data[0][0],                                            //change this
    endpoint:err.config.url.toString()                             //change this
}))




    }
}



export function* watchercompany(){
    yield takeEvery("company/getcompaniesaction",companiesgetsagaworker)
    yield takeEvery("company/createcompanyaction",createcompanysagaworker)
    yield takeEvery("company/updatecompanyaction",updatecompanysagaworker)
   }