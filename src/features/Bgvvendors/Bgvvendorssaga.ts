import {put,call,takeEvery} from 'redux-saga/effects'
import {Bandapi, bgvvendorsapis} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
function* getbgvvendorssagaworker(){
    try{
        var res: Promise<any>=yield call(bgvvendorsapis.getfulltimeselectedcandidates)
        console.log(res)
        yield put({type:"Bgvvendors/Bgvvendorsdata",payload:res})
    }
    catch(err){
console.log(err)

    }
}


export function* watcherBgvvendors(){
    yield takeEvery("Bgvvendors/getbgvvendorsaction",getbgvvendorssagaworker)
     }
