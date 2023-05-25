import {put,call,takeEvery, takeLatest} from 'redux-saga/effects'
import { userrolesdata,getuserrolesaction,createuserrolesaction,updateuserrolesaction,getadusersaction} from './userroleslice'
import {AdUsersapi,Rolesapi,userrolesapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
import {userroleoptionsSlice,userroleoptionsdata} from './userroleoptionsslice';
import {rolesoptionsSlice,rolesoptionsdata} from './rolesoptionsslice';
function* userrolesgetsagaworker(){
    try{
        var res: Promise<any>=yield call(userrolesapi.getalluserrolesdata)
        // console.log(res)
        yield put({type:userrolesdata,payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* adusersgetsagaworker(){
    try{
        // console.log("sagaadusers")
        var res: Promise<any>=yield call(AdUsersapi.getallAdUsersdata)
        // console.log(res)
        // var res=[{key:"abc",label:"abc",value:"abc"},{key:"mnb",label:"mnb",value:"mnb"},{key:"qwe",label:"qwe",value:"qwe"},]
        yield put({type:userroleoptionsdata,payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* rolesgetsagaworker(){
    try{
        // console.log("sagaadusers")
        var res: Promise<any>=yield call(Rolesapi.getallRolesdata)
        // console.log(res)
        // var res=[{key:"abc",label:"abc",value:"abc"},{key:"mnb",label:"mnb",value:"mnb"},{key:"qwe",label:"qwe",value:"qwe"},]
        yield put({type:rolesoptionsdata,payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* rolesoptionssagaworker(){
    try{
        console.log("sagaadusers")
        var res: Promise<any>=yield call(Rolesapi.getallRolesdata)
        // console.log(res)
        // var res=[{key:"abc",label:"abc",value:"abc"},{key:"mnb",label:"mnb",value:"mnb"},{key:"qwe",label:"qwe",value:"qwe"},]
        yield put({type:rolesoptionsdata,payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createuserrolessagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:userrolesapi.createuserroles,payload:payload})
        var res: Promise<any>=yield call(userrolesapi.createuserroles,payload.payload)
        console.log(res)
        // yield put({type:userrolesdata,payload:res})
        yield userrolesgetsagaworker()
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

    data:" User Name already exists",                                                       

    endpoint:err.config.url.toString()      

}))


    }
}
function* updateuserrolessagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:userrolesapi.createuserroles,payload:payload})
        var res: Promise<any>=yield call(userrolesapi.updateuserroles,payload.payload)
        // console.log(res)
        // yield put({type:userrolesdata,payload:res})
        yield userrolesgetsagaworker()
        yield put(createtoast({

            id:987878,

            status: "success",

            data: res.toString(),
            endpoint: "400"

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



export function* watcheruserroles(){
    yield takeEvery("userroles/getuserrolesaction",userrolesgetsagaworker)
    yield takeEvery("userroles/createuserrolesaction",createuserrolessagaworker)
    yield takeEvery("userroles/updateuserrolesaction",updateuserrolessagaworker)
    yield takeEvery("userroles/getadusersaction",adusersgetsagaworker)
    yield takeEvery("userroles/getrolesaction",rolesgetsagaworker)
    yield takeEvery("rolesoptions/rolesoptionsaction",rolesoptionssagaworker)
    
}