import {put,call,takeEvery} from 'redux-saga/effects'
import { ManageBilldata,getManageBillaction,createManageBillaction,updateManageBillaction} from './ManageBillRateslice'
import {AvgCTCapi} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* ManageBillgetsagaworker(){
    try{
        var res: Promise<any>=yield call(AvgCTCapi.getallManageBilldata)
        // console.log(res)
        yield put({type:"ManageBill/ManageBilldata",payload:res})
    }
    catch(err){
console.log(err)



    }
}
function* createManageBillsagaworker(payload){
    try{
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(AvgCTCapi.createManageBill,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield ManageBillgetsagaworker()
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
function* updateManageBillsagaworker(payload){

    try{
        console.log(payload)
        // var res: Promise<any>=yield call({type:companyapi.createcompany,payload:payload})
        var res: Promise<any>=yield call(AvgCTCapi.updateManageBill,payload.payload)
        // console.log(res)
        // yield put({type:companiesdata,payload:res})
        yield ManageBillgetsagaworker()
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



export function* watcherManageBill(){
    yield takeEvery("ManageBill/getManageBillaction",ManageBillgetsagaworker)
    yield takeEvery("ManageBill/createManageBillaction",createManageBillsagaworker)
    yield takeEvery("ManageBill/updateManageBillaction",updateManageBillsagaworker)
   }















//    "InsuranceAccidentLimitId": 1,
//    "BandID": null,
//    "InsuranceLimit": "1000000.00000",
//    "Accident_Limit": null,
//    "Active": true
// },
// {
//    "InsuranceAccidentLimitId": 2,
//    "BandID": null,
//    "InsuranceLimit": "500000.00000",
//    "Accident_Limit": null,
//    "Active": false
// },
// {
//    "InsuranceAccidentLimitId": 3,
//    "BandID": null,
//    "InsuranceLimit": "50000.00000",
//    "Accident_Limit": null,
//    "Active": false
// }
// ]