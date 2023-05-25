import { put, call, takeEvery } from 'redux-saga/effects'
import { JobPostActiondata, getJobPostActionfromapi, createnewjobpost, updateIJobPostAction } from './jobpostactionsslice'
import { jobpostactions } from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store } from "../../app/store"
function* JobPostActiondatasagaworker(data) {
    try {
        var res: Promise<any> = yield call(jobpostactions.getalljobpostactiondata,data.payload)
        // console.log(res)
        yield put({ type: "JobPostAction/JobPostActiondata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* JobPostjobpostactionssubmitsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(jobpostactions.jobpostactionssubmit,data.payload)
        // console.log(res)
        // yield put({ type: "JobPostAction/JobPostActiondata", payload: res })

        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({

            id:34324,

            status:"error",

            data:err.data[0][0],                                                       //change this

            endpoint:err.config.url.toString()                                        //change this

        }))


    }
}
function* usersbyrolessagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(jobpostactions.usersbyroles,data.payload)
        // console.log(res)
        yield put({ type: "usersbyroles/usersbyrolesdata", payload: res })

        //toast
    }
    catch (err) {
        console.log(err)



    }
}
function* createnewjobpostsagaworker(data) {
    try {
        console.log(data.payload)
        var res: Promise<any> = yield call(jobpostactions.createjobpost,data.payload)
        console.log(res)
        // yield put({ type: "JobPostAction/getJobPostActionfromapi", payload: res })

        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)
        yield put(createtoast({

            id:34324,

            status:"error",

            data:err.data[0][0],                                                       //change this

            endpoint:err.config.url.toString()                                        //change this

        }))


    }
}
function* updatejobpostsagaworker(data) {
    try {
        console.log(data.payload)
        var res: Promise<any> = yield call(jobpostactions.updatejobpost,data.payload)
        console.log(res)
        // yield put({ type: "JobPostAction/getJobPostActionfromapi", payload: res })

        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({

            id:34324,

            status:"error",

            data:err.data[0][0],                                                       //change this

            endpoint:err.config.url.toString()                                        //change this

        }))

    }
}
function* getmyjobpostssagaworker(data) {
    try {

        var res: Promise<any> = yield call(jobpostactions.myjobposts,data.payload)
        // console.log(res)
        yield put({ type: "myjobposts/myjobposts", payload: res })

        //toast

    }
    catch (err) {
        console.log(err)



    }
}
function* jobpostcancelsagaworker(data) {
    try {

        var res: Promise<any> = yield call(jobpostactions.jobpostcancel,data.payload)
        // console.log(res)
        yield put({ type: "myjobposts/myjobpostsaction", payload: { "UserName": store.getState().Login.username } })

        //toast
        yield put(createtoast({

            id:454,

            status:"success",

            data:res.toString(),                                                //change this

            endpoint:"400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({

            id:34324,

            status:"error",

            data:err.data[0][0],                                                       //change this

            endpoint:err.config.url.toString()                                        //change this

        }))

    }
}
// function* getcandiatessagaworker(data) {
//     try {

//         var res: Promise<any> = yield call(jobpostactions.candidates,data.payload)
//         // console.log(res)
//         yield put({ type: "Candidates/Candidates", payload: res })

//         //toast
//     }
//     catch (err) {
//         console.log(err)



//     }
// }

export function* watcherJobPostAction() {
    yield takeEvery("JobPostAction/getJobPostActionfromapi", JobPostActiondatasagaworker)
    yield takeEvery("JobPostAction/jobpostactionssubmit", JobPostjobpostactionssubmitsagaworker)
    yield takeEvery("usersbyroles/usersbyroles", usersbyrolessagaworker)
    yield takeEvery("JobPostAction/createnewjobpost", createnewjobpostsagaworker)
    yield takeEvery("JobPostAction/updatejobpost", updatejobpostsagaworker)
    yield takeEvery("myjobposts/myjobpostsaction", getmyjobpostssagaworker)
    yield takeEvery("myjobposts/jobpostcancelaction",jobpostcancelsagaworker)
    // yield takeEvery("Candidates/candidateaction", getcandiatessagaworker)

    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
}
