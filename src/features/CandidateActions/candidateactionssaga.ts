import { call, put, takeEvery } from "redux-saga/effects"
import { candidateactions, selectedcandidateactions } from "../../api/agent"
import { store } from "../../app/store"
import { createtoast } from "../ToastSlice"
import { selectedcandidatesaction } from "./selectedcandidatesslice"


function* createnewcandidatesagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.createcandidate, data.payload)
        // console.log(res)
        // yield Candidatedatasagaworker(data.payload={"jobpostID":data.payload.jobpostID})
        // yield call({type:"getCandidatefromapi"})
        yield put({ type: "Candidatesforjobpost/getCandidatefromapi", payload: { "jobpostID": data.payload.get("Job_Post_ID") } })
        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        yield put(createtoast({

            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))




    }
}
function* updatecandidatesagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(candidateactions.updatecandidate, data.payload)
        yield put({ type: "Candidatesforjobpost/getCandidatefromapi", payload: { "jobpostID": data.payload.get("Job_Post_ID") } })
        // console.log(res)


        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        yield put(createtoast({

            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))




    }
}
function* Candidatedatasagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.getallcandidatedata, data.payload)
        // console.log(res)
        yield put({ type: "Candidatesforjobpost/Candidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* candidateactionsdetailsactionsagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.candidateactiondetails, data.payload)
        // console.log(res)
        // Candidatedatasagaworker(res)
        yield put({ type: "Candidateactiondetails/Candidates", payload: res })

        //toast
    }
    catch (err) {
        console.log(err)



    }
}
// function* getcandiatessagaworker(data) {
//     try { 

//         var res: Promise<any> = yield call(candidateactions.candidateactiondetails,data.payload)
//         // console.log(res)
//         yield put({ type: "Candidates/Candidates", payload: res })

//         //toast
//     }
//     catch (err) {
//         console.log(err)



//     }
// }
function* candidateworkflowsubmitactionsagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.candidateworkflowsubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
        // yield put(   )




    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}
function* businessheadapprovalsubmitactionsagaworker(data) {
    try {
        console.log("buhapp seb")
        var res: Promise<any> = yield call(candidateactions.businessheadapprovalsubmit, data.payload)
        // console.log(res)
        yield put({ type: "Candidateactiondetails/Candidates", payload: {"ApproverName": store.getState().Login.username} })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}
function* hiringmanagersubmitactionsagaworker(data) {
    try {
        console.log("buhapp seb")
        var res: Promise<any> = yield call(candidateactions.hiringmanagersubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })
        yield put({ type: "Candidateactiondetails/Candidates", payload: {"ApproverName": store.getState().Login.username} })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* selectedcandidatesholdsubmitactionsagaworker(data) {
    try {
        console.log("buhapp seb")
        var res: Promise<any> = yield call(candidateactions.selectedcandidatesholdsubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}
function* selectedcandidateshrholdsubmitactionsagaworker(data) {
    try {
        console.log("buhapp seb")
        var res: Promise<any> = yield call(candidateactions.selectedcandidateshrholdsubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })
        yield put({ type: "Candidateactiondetails/Candidates", payload: {"ApproverName": store.getState().Login.username} })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* financecontrollerapprovalsubmitactionsagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.financecontrollerapprovalsubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })
        yield put({ type: "Candidateactiondetails/Candidates", payload: {"ApproverName": store.getState().Login.username} })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* generalmanagerapprovalsubmitactionsagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.generalmanagerapprovalsubmit, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })
        yield put({ type: "Candidateactiondetails/Candidates", payload: {"ApproverName": store.getState().Login.username} })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* hrupdatecandidatesagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateactions.hrupdatecandidate, data.payload)
        // console.log(res)
        // yield put({ type: "Candidateactiondetails/Candidates", payload: res })

        //toast
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)
        //toast

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* feedbackfieldactionsagaworker(data) {
    try {
        var res: Promise<any> = yield call(candidateactions.getfeedbackfields, data.payload)
        // console.log(res)

        yield put({ type: "feedbackfield/feedbackfielddata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}

function* prevfeedbacksactionsagaworker(data) {
    try {
        var res: Promise<any> = yield call(candidateactions.getprevfeedbacks, data.payload)
        // console.log(res)

        yield put({ type: "prevfeedback/prevfeedbackdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* selectedcandidatesactionsagaworker(data) {
    try {
        var res: Promise<any> = yield call(candidateactions.selectedcandidates, data.payload)
        // console.log(res)

        yield put({ type: "selectedcandidates/selectedandidatesdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* previewannexuresagaworker(data) {
    try {
        var res: Promise<any> = yield call(candidateactions.annexure, data.payload)
        // console.log(res)

        yield put({ type: "annexure/annexuredata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}

function* sendofferletteractionsagaworker(data) {
    try {
        var res: Promise<any> = yield call(selectedcandidateactions.sendOfferLetter, data.payload)
        const logindata = store.getState().Login
        var w: any = []
        logindata.groups.forEach((i) => w.push(i["name"].toString()))
        console.log(logindata)
        yield put(selectedcandidatesaction({

            "RoleName": w,

            "username": logindata.username

        }))
        // console.log(res)

        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}

function* updateselectedcandidatesactionsagaworker(data) {
    try {
        var res: Promise<any> = yield call(selectedcandidateactions.updateselectedcandidate, data.payload)
        const logindata = store.getState().Login
        var w: any = []
        logindata.groups.forEach((i) => w.push(i["name"].toString()))
        console.log(logindata)
        yield put(selectedcandidatesaction({

            "RoleName": w,

            "username": logindata.username

        }))
        // console.log(res)

        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}
function* updateselinterncandidatesagaworker(data) {
    try {
        var res: Promise<any> = yield call(selectedcandidateactions.updateselinterncandidate, data.payload)
        const logindata = store.getState().Login
        var w: any = []
        logindata.groups.forEach((i) => w.push(i["name"].toString()))
        console.log(logindata)
        yield put(selectedcandidatesaction({

            "RoleName": w,

            "username": logindata.username

        }))
        // console.log(res)

        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}
function* updateselcontractcandidatesagaworker(data) {
    try {
        var res: Promise<any> = yield call(selectedcandidateactions.updateselcontractcandidate, data.payload)
        const logindata = store.getState().Login
        var w: any = []
        logindata.groups.forEach((i) => w.push(i["name"].toString()))
        console.log(logindata)
        yield put(selectedcandidatesaction({

            "RoleName": w,

            "username": logindata.username

        }))
        // console.log(res)

        // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))
    }
    catch (err) {
        console.log(err)

        yield put(createtoast({


            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))



    }
}


export function* watcherCandidateAction() {

    yield takeEvery("Candidatesforjobpost/createnewcandidate", createnewcandidatesagaworker)
    yield takeEvery("Candidatesforjobpost/updatecandidate", updatecandidatesagaworker)
    yield takeEvery("Candidatesforjobpost/getCandidatefromapi", Candidatedatasagaworker)
    yield takeEvery("Candidateactiondetails/candidateworkflowsubmitaction", candidateworkflowsubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/businessheadapprovalsubmitaction", businessheadapprovalsubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/hiringmanagersubmitaction", hiringmanagersubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/selectedcandidatesholdsubmitaction", selectedcandidatesholdsubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/selectedcandidateshrholdsubmitaction", selectedcandidateshrholdsubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/generalmanagerapprovalsubmitaction", generalmanagerapprovalsubmitactionsagaworker)
    yield takeEvery("Candidateactiondetails/hrupdatecandidateaction", hrupdatecandidatesagaworker)
    yield takeEvery("Candidateactiondetails/financecontrollerapprovalsubmitaction", financecontrollerapprovalsubmitactionsagaworker)
    yield takeEvery("selectedcandidates/selectedcandidatesaction", selectedcandidatesactionsagaworker)
    yield takeEvery("selectedcandidates/previewannexureaction", previewannexuresagaworker)
    yield takeEvery("selectedcandidates/updateselectedcandidatesaction", updateselectedcandidatesactionsagaworker)
    yield takeEvery("selectedcandidates/updateselinterncandidateaction", updateselinterncandidatesagaworker)
    yield takeEvery("selectedcandidates/updateselcontractcandidateaction", updateselcontractcandidatesagaworker)
    yield takeEvery("selectedcandidates/sendofferletteraction", sendofferletteractionsagaworker)
    // yield takeEvery("Candidateactiondetails/candidateactiondetails", getcandiatessagaworker)
    yield takeEvery("Candidateactiondetails/candidateactionsdetailsaction", candidateactionsdetailsactionsagaworker)
    // yield takeEvery("Industry/createIndustryaction", createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction", updateIndustrysagaworker)
    yield takeEvery("feedbackfield/feedbackfieldaction", feedbackfieldactionsagaworker)
    yield takeEvery("prevfeedback/prevfeedbacksaction", prevfeedbacksactionsagaworker)

}