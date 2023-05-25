import { call, put, takeEvery } from 'redux-saga/effects'
import { acceptedcandidatesapis, Bandapi, updateacceptedcandidatesapis } from "../../api/agent"
import { createtoast } from '../ToastSlice'
import { store } from "../../app/store"
function* fulltimeselcandidatesgetsagaworker() {
    try {
        var res: Promise<any> = yield call(acceptedcandidatesapis.getfulltimeselectedcandidates)


        // console.log(res)
        yield put({ type: "Fulltimeselcandidates/fulltimeselcandidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* updatefulltimeselectedcandidatesagaworker(payload) {
    try {
        var res: Promise<any> = yield call(updateacceptedcandidatesapis.updatefulltimeselectedcandidate, payload.payload)
yield put({type:"Fulltimeselcandidates/fulltimeselcandidatesgetaction"})
        yield put(createtoast({

            id: 987878,

            status: "success",

            data: res.toString(),

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({
            id: 987878,
            status: "error",
            data: err.data[0][0],
            endpoint: err.config.url.toString()
        }))




    }
}
function* updatecontractcandidatesagaworker(payload) {
    try {
        console.log("sagaworking")
        var res: Promise<any> = yield call(updateacceptedcandidatesapis.updatecontractcandidate, payload.payload)
        yield put({type:"Contractselectedcandidates/contractselcandidatesgetaction"})

        yield put(createtoast({

            id: 987878,

            status: "success",

            data: res.toString(),

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({
            id: 987878,
            status: "error",
            data: err.data[0][0],
            endpoint: err.config.url.toString()
        }))




    }
}
function* updateinterncandidatesagaworker(payload) {
    try {
        var res: Promise<any> = yield call(updateacceptedcandidatesapis.updateinterncandidate, payload.payload)
        yield put({type:"Internselectedcandidates/internselcandidatesgetaction"})
        yield put(createtoast({

            id: 987878,

            status: "success",

            data: res.toString(),

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({
            id: 987878,
            status: "error",
            data: err.data[0][0],
            endpoint: err.config.url.toString()
        }))




    }
}
function* internselcandidatesgetsagaworker() {
    try {
        var res: Promise<any> = yield call(acceptedcandidatesapis.getinternselectedcandidates)
        // console.log(res)
        yield put({ type: "Internselectedcandidates/internselcandidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* contractselcandidatesgetsagaworker() {
    try {
        var res: Promise<any> = yield call(acceptedcandidatesapis.getcontractselectedcandidates)
        // console.log(res)
        yield put({ type: "Contractselectedcandidates/contractselcandidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}

export function* watcheracceptedcandidates() {
    yield takeEvery("Fulltimeselcandidates/fulltimeselcandidatesgetaction", fulltimeselcandidatesgetsagaworker)
    yield takeEvery("Fulltimeselcandidates/updatefulltimeselectedcandidateaction", updatefulltimeselectedcandidatesagaworker)
    yield takeEvery("Internselectedcandidates/internselcandidatesgetaction", internselcandidatesgetsagaworker)
    yield takeEvery("Contractselectedcandidates/updatecontractcandidateaction", updatecontractcandidatesagaworker)
    yield takeEvery("Contractselectedcandidates/contractselcandidatesgetaction", contractselcandidatesgetsagaworker)
    yield takeEvery("Internselectedcandidates/updateinterncandidateaction", updateinterncandidatesagaworker)
}
