import {put,call,takeEvery} from 'redux-saga/effects'
import {Bandapi, Departmentsapis} from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store} from "../../app/store"
import { getDepartmentsaction } from './Departmentsslice'
function* getDepartmentssagaworker(){
    try{
        var res: Promise<any>=yield call(Departmentsapis.getdepartments)
        console.log(res)
        yield put({type:"Departments/Departmentsdata",payload:res})

    }
    catch(err){
console.log(err)


    }
}
// function* createDepartmentssagaworker(){
//     try{
//         var res: Promise<any>=yield call(Departmentsapis.getdepartments)
//     // store.dispatch()
//     }
//     catch(err){
// console.log(err)

//     }
// }
function* updateDepartmentssagaworker(payload){
    try{
        var res: Promise<any>=yield call(Departmentsapis.updatedepartments,payload.payload)
        store.dispatch(getDepartmentsaction())
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),

            endpoint:"400"

        }))
    }
    catch(err){
console.log(err)
yield put(createtoast({

    id:34324,

    status:"error",

    data:err.data[0][0],                                       ///" Industry Name already exists",//

    endpoint:err.config.url.toString()

}))
    }
}

export function* watcherDepartments(){
    yield takeEvery("Departments/getDepartmentsaction",getDepartmentssagaworker)
    // yield takeEvery("Departments/createDepartmentsaction",createDepartmentssagaworker)
    yield takeEvery("Departments/updateDepartmentsaction",updateDepartmentssagaworker)
   }
