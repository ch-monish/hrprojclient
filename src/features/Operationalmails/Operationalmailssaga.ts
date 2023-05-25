import { call, put, takeEvery } from "redux-saga/effects";
import { mailoperationsapis } from "../../api/agent";
import { store } from "../../app/store";
import { createtoast } from "../ToastSlice";
import { operationalmailsdata } from "./Operationalmailsslice";

function* operationalmailsgetsagaworker(data){
    try{
        var res: Promise<any>=yield call(mailoperationsapis.getoperationalmails,data.payload)
        // console.log(res)
        yield put({type:"operationalmails/operationalmailsdata",payload:res})
        // store.dispatch(operationalmailsdata(res))
        // yield put(operationalmailsdata(res))
        // yield call(operationalmailsdata,res)
    }
    catch(err){
// console.log(err)



    }
}

function* operationalmailssendactionsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: any=yield call(mailoperationsapis.sendoperationalmail,payload.payload)
        console.log(res)
        if(!Object.is(res.data,null)){

            yield put({type:"operationalmails/operationalmailsdata",payload:res.data})
        }
        // yield put({type:companiesdata,payload:res})
        // yield operationalmailsgetsagaworker()
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.res.toString(),

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



 export function*  watcherOperationalmails(){
yield takeEvery("operationalmails/operationalmailsgetaction",operationalmailsgetsagaworker)
yield takeEvery("operationalmails/operationalmailssendaction",operationalmailssendactionsagaworker)
}
