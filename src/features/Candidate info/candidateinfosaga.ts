import { call, put, takeEvery } from "redux-saga/effects"
import { candidateinfo, educationaldetailsapis, employementdetailsapis, otherdocumentsapis, personaldetails, familydetails, insurance, bankdetailsapis, pfdetails } from "../../api/agent"
import { RootState, store } from "../../app/store"
import { createtoast } from "../ToastSlice"
import { Educationaldetailsdata } from "./educationdetailsslice"
import { verifycandidatesuccess } from "./candidateinfoslice"


export const candidateinfodata = (state: RootState) => state.candidateinfo
function* createnewpersonalsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(personaldetails.createpersonaldetails, data.payload)
        yield put({type:"Personaldetails/personaldetailsaction", payload:{"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID}})
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
function* createnewpfsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(pfdetails.createpfdetails, data.payload)

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
function* createedducationaldetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(educationaldetailsapis.createeducationdetail,data.payload)
        yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID}})

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
function* createemployementdetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(employementdetailsapis.createemployementdetail, data.payload)
        yield put({ type: "employementdetails/employementdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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
function* createbankdetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(bankdetailsapis.createbankdetail, data.payload)
        yield put({ type: "bankdetails/bankdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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

function* updatepersonalsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(personaldetails.updatepersonaldetails, data.payload)
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

function* updatepfsagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(pfdetails.updatepfdetails, data.payload)
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
function* updateedducationaldetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(educationaldetailsapis.updateeducationdetails, data.payload)
        yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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
function* updateemployementdetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(employementdetailsapis.updateemployementdetails, data.payload)
        yield put({ type: "employementdetails/employementdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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
function* updatebankdetailssagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(bankdetailsapis.updatebankdetails, data.payload)
        yield put({ type: "bankdetails/bankdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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
function* Personaldatasagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(personaldetails.getpersonaldetailsdata, data.payload)
        // console.log(res)
        yield put({ type: "Personaldetails/Personaldetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* Pfdatasagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(pfdetails.getpfdetailsdata, data.payload)
        // console.log(res)
        yield put({ type: "Pfdetails/pfdetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* deleteedducationaldetailssagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(educationaldetailsapis.deleteeducationdetails, data.payload)
        // console.log(res)
        yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
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
function* deleteemploymentdetailssagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(employementdetailsapis.deleteemployementdetails, data.payload)
        // console.log(res)
        yield put({ type: "employementdetails/employementdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })
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
function* deletebankdetailssagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(bankdetailsapis.deletebankdetails, data.payload)
        // console.log(res)
        yield put({ type: "bankdetails/bankdetailsgetaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })
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
function* deletefamilydetailssagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(familydetails.deletefamilydetails, data.payload)
        // console.log(res)
        yield put({ type: "Familydetails/familydetailsaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })
        yield put(createtoast({

            id: 454,

            status: "success",

            data: res.toString(),                                                //change this

            endpoint: "400"

        }))

    }
    catch (err) {
        console.log(err)

        store.dispatch(createtoast({

            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))

    }
}

function* deleteinsurancesagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(insurance.deleteinsurance, data.payload)
        // console.log(res)
        yield put({ type: "insurance/insuranceaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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

function* educationaldetailsgetsagaworker(data) {
    try {
        //    console.log(data)
        var res: Promise<any> = yield call(educationaldetailsapis.geteducationaldetailsdata, data.payload)
        // console.log(res)
        yield put({ type: "educationaldetails/Educationaldetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* employementdetailsgetsagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(employementdetailsapis.getemployementdetails, data.payload)
        // console.log(res)
        yield put({ type: "employementdetails/employementdetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}
function* bankdetailsgetsagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(bankdetailsapis.getbankdetails, data.payload)
        // console.log(res)
        yield put({ type: "bankdetails/bankdetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)



    }
}




function* createnewfamilysagaworker(data) {
    try {
        console.log(data.payload)
        var res: Promise<any> = yield call(familydetails.createfamilydetails, data.payload)
        // console.log(res)
        // yield Candidatedatasagaworker(data.payload={"jobpostID":data.payload.jobpostID})
         yield put({ type: "Familydetails/familydetailsaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

        // yield call({type:"getCandidatefromapi"})
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

            endpoint: err.config.url.toString()                                         //change this

        }))




    }
}
function* createnewinsurancesagaworker(data) {
    try {
        console.log(data.payload)
        var res: Promise<any> = yield call(insurance.createinsurance, data.payload)
        // console.log(res)
        // yield Candidatedatasagaworker(data.payload={"jobpostID":data.payload.jobpostID})
        yield put({ type: "insurance/insuranceaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

        // yield call({type:"getCandidatefromapi"})
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
        store.dispatch(createtoast({

            id: 34324,

            status: "error",

            data: err.data[0][0],                                                       //change this

            endpoint: err.config.url.toString()                                        //change this

        }))




    }
}
function* updatefamilysagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(familydetails.updatefamilydetails, data.payload)

        // console.log(res)
        yield put({ type: "Familydetails/familydetailsaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })


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
function* updateinsurancesagaworker(data) {
    try {
        // console.log(data.payload)
        var res: Promise<any> = yield call(insurance.updateinsurance, data.payload)

        // console.log(res)

        yield put({ type: "insurance/insuranceaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })

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
function* Familydatasagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(familydetails.getfamilydetails, data.payload)
        // console.log(res)
        yield put({ type: "Familydetails/familydetailsdata", payload: res })
    }
    catch (err) {
        console.log(err)
    }
}

function* Insurancedatasagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(insurance.getinsurance, data.payload)
        // console.log(res)
        yield put({type:'insurance/insurancedata',payload:res})
    }
    catch (err) {
        console.log(err)
    }
}

function* candidateinfogetactionsagaworker(data) {
    try {

        var res: Promise<any> = yield call(candidateinfo.getcandidateinfo, data.payload)
        // console.log(res)
        yield put({ type: "candidateinfo/Candidateinfodata", payload: res })
        console.log(res["Selected_Candidate_ID"])
        yield put({ type: "Personaldetails/personaldetailsaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })
        yield put({ type: "Pfdetails/pfdetailsaction", payload: { "selectedcandidateid": store.getState().candidateinfo.Selected_Candidate_ID } })
        yield put({ type: "bankdetails/bankdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
        // yield put()
    }
    catch (err) {
        console.log(err)



    }
}


function* documentdownloadsagaworker(payload) {
    try {

        console.log(payload)
        var filename = payload.payload.file
        console.log(filename)
        var res = yield call(candidateinfo.downloaddetaildocument, payload.payload)
        console.log(res)
        const byteCharacters = atob(res.toString('base64'));
        // const byteCharacters = Buffer.from(res, 'base64');
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        //for download
        const blob = new Blob([byteArray]);
        //for opening in new tab
        // const blob = new Blob([byteArray], { type: "application/pdf" });

        console.log(blob);
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        //for download
        // a.download = "pdffile.pdf";
        a.download = filename.substring(filename.lastIndexOf("/") + 1, filename.toString().length)
        a.click();

        //for opening in new tab
        // const pdfWindow = window.open();
        // pdfWindow.location.href = a.href;


        console.log(res)


    }
    catch (err) {
        console.log("error while converting to file")
    }
}

function* deletedocumentactionsagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.deletedetaildocument, data.payload)
    var res1: Promise<any> = yield call(candidateinfo.shownotifycandidatebutton, {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} )

    yield put({ type: "candidateinfo/addtostatecandidateinfoshownotifybutton",  payload: {"shownotifybutton":res1 }})
    yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "employementdetails/employementdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    // yield put({ type: "bankdetails/bankdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "otherdocuments/otherdocumentsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put(createtoast({

        id:454,

        status:"success",

        data:res.toString(),                                                //change this

        endpoint:"400"

    }))
    }
    catch (err) {

        yield put(createtoast({

            id:34324,

            status:"error",

            data:err.data[0][0],                                                       //change this

            endpoint:err.config.url.toString()                                        //change this

        }))
    }
}


function* verifydocumentsagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.verifydocument, data.payload)
    var res1: Promise<any> = yield call(candidateinfo.shownotifycandidatebutton, {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} )

    yield put({ type: "candidateinfo/addtostatecandidateinfoshownotifybutton",  payload: {"shownotifybutton":res1 }})

    yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "employementdetails/employementdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "otherdocuments/otherdocumentsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put(createtoast({

        id:454,

        status:"success",

        data:res.toString(),                                                //change this

        endpoint:"400"

    }))
}
catch(err) {
    yield put(createtoast({

        id:34324,

        status:"error",

        data:err.data[0][0],                                                       //change this

        endpoint:err.config.url.toString()                                        //change this

    }))
}
}
function* verifycandidatesagaworker(data){
try{
    console.log(data)
    var res: any = yield call(candidateinfo.verifycandidate, data.payload)
    console.log(res)
   var totalstr=""
if(res.message=="still some documents need to verify"){

    for(var e of res.errors){
        // yield put(createtoast({

        //     id:454,

        //     status:"info",

        //     data:e.toString(),                                                //change this

        //     endpoint:"400"

        // }))

        totalstr+=e+"\r\n";
    }
    yield put(createtoast({

        id:454,

        status:"pending verification",

        // data:totalstr,                                                //change this
        data:totalstr,                                                //change this

        endpoint:"400"

    }))
}
else{


      yield put(createtoast({

        id:454,

        status:"success",

        data:res.message.toString(),                                                //change this

        endpoint:"400"

    }))
    store.dispatch(verifycandidatesuccess(res))
}
}
catch(err) {
    yield put(createtoast({

        id:34324,

        status:"error",

        data:err.data[0][0],                                                       //change this

        endpoint:err.config.url.toString()                                        //change this

    }))
}
}
function* uploaddocumentsagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.uploaddetaildocument, data.payload)
    var res1: Promise<any> = yield call(candidateinfo.shownotifycandidatebutton, {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} )

    yield put({ type: "candidateinfo/addtostatecandidateinfoshownotifybutton",  payload: {"shownotifybutton":res1 }})
    yield put({ type: "educationaldetails/educationaldetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "employementdetails/employementdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    // yield put({ type: "bankdetails/bankdetailsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })
    yield put({ type: "otherdocuments/otherdocumentsgetaction", payload: {"selectedcandidateid":store.getState().candidateinfo.Selected_Candidate_ID} })

    yield put(createtoast({

        id:454,

        status:"success",

        data:res.toString(),                                                //change this

        endpoint:"400"

    }))
}
catch(err) {

    yield put(createtoast({

        id:34324,

        status:"error",

        data:err.data[0][0],                                                       //change this

        endpoint:err.config.url.toString()                                        //change this

    }))
    }
}
function* otherdocumentsgetsagaworker(data) {
    try {
        console.log(data)
        var res: Promise<any> = yield call(otherdocumentsapis.otherdocumentsget, data.payload)
        yield put({ type: "otherdocuments/otherdocumentsdata", payload: res })
    }
    catch (err) {

    }
}

function* getcandidateinfoclearancesagaworker(data){
try{
    console.log(data)
    yield put({type:"candidateinfo/addtostatecandidateinfoclearanceaction",payload:{
        "validation": false,
        "messages": [

        ]
    }})
    var res: Promise<any> = yield call(candidateinfo.getcandidateinfoclearance, data.payload)
    yield put({type:"candidateinfo/addtostatecandidateinfoclearanceaction",payload:res})
}
catch(err) {

}
}
function* shownotifycandidatebuttonsagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.shownotifycandidatebutton, data.payload)
    yield put({type:"candidateinfo/addtostatecandidateinfoshownotifybutton", payload: {"shownotifybutton":res }})
}
catch(err) {
}
}
function* acceptofferlettersagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.acceptofferletter, data.payload)
    yield put(createtoast({

        id:454,

        status:"success",

        data:res.toString(),                                                 //change this

        endpoint:"400"

    }))
}
catch(err) {

   yield put (createtoast({

        id:34324,

        status:"error",

        data:err.data[0][0],                                                       //change this

        endpoint:err.config.url.toString()                                        //change this

    }))
}
}
function* notifycandidatedocsbymailsagaworker(data){
try{
    console.log(data)
    var res: Promise<any> = yield call(candidateinfo.notifycandidatedocsbymail, data.payload)
    yield put(createtoast({

        id:454,

        status:"success",

        data:res.toString(),                                                 //change this

        endpoint:"400"

    }))
}
catch(err) {

   yield put (createtoast({

        id:34324,

        status:"error",

        data:err.data[0][0],                                                       //change this

        endpoint:err.config.url.toString()                                        //change this

    }))
}
}








export function* watcherpersonaldetails() {

    yield takeEvery("Personaldetails/createpersonaldetailsaction", createnewpersonalsagaworker)
    yield takeEvery("Pfdetails/createpfdetailsaction", createnewpfsagaworker)
    yield takeEvery("educationaldetails/createedducationaldetailsaction", createedducationaldetailssagaworker)
    yield takeEvery("employementdetails/createemployementdetailsaction", createemployementdetailssagaworker)
    yield takeEvery("bankdetails/createbankdetailsaction", createbankdetailssagaworker)
    yield takeEvery("Personaldetails/updatepersonaldetailsaction", updatepersonalsagaworker)
    yield takeEvery("Pfdetails/updatepfdetailsaction", updatepfsagaworker)
    yield takeEvery("educationaldetails/updateedducationaldetailsaction", updateedducationaldetailssagaworker)
    yield takeEvery("employementdetails/updateemployementdetailsaction", updateemployementdetailssagaworker)
    yield takeEvery("bankdetails/updatebankdetailsaction", updatebankdetailssagaworker)
    yield takeEvery("Personaldetails/personaldetailsaction", Personaldatasagaworker)
    yield takeEvery("Pfdetails/pfdetailsaction", Pfdatasagaworker)
    yield takeEvery("educationaldetails/educationaldetailsgetaction", educationaldetailsgetsagaworker)
    yield takeEvery("employementdetails/employementdetailsgetaction", employementdetailsgetsagaworker)
    yield takeEvery("bankdetails/bankdetailsgetaction", bankdetailsgetsagaworker)
    yield takeEvery("Familydetails/createfamilydetailsaction", createnewfamilysagaworker)
    yield takeEvery("Familydetails/updatefamilydetailsaction", updatefamilysagaworker)
    yield takeEvery("insurance/insuranceaction", Insurancedatasagaworker)
    yield takeEvery("insurance/createinsuranceaction", createnewinsurancesagaworker)
    yield takeEvery("insurance/updateinsuranceaction", updateinsurancesagaworker)
    yield takeEvery("Familydetails/familydetailsaction", Familydatasagaworker)
    yield takeEvery("candidateinfo/candidateinfogetaction", candidateinfogetactionsagaworker)
    yield takeEvery("candidateinfo/documentdownloadaction", documentdownloadsagaworker)
    yield takeEvery("candidateinfo/deletedocumentaction", deletedocumentactionsagaworker)
    yield takeEvery("educationaldetails/deleteedducationaldetailsaction", deleteedducationaldetailssagaworker)
    yield takeEvery("employementdetails/deleteemployementdetailsaction", deleteemploymentdetailssagaworker)
    yield takeEvery("bankdetails/deletebankdetailsaction", deletebankdetailssagaworker)
    yield takeEvery("Familydetails/deletefamilydetailsaction", deletefamilydetailssagaworker)
    yield takeEvery("insurance/deleteinsuranceaction", deleteinsurancesagaworker)
    yield takeEvery("candidateinfo/uploaddocumentaction", uploaddocumentsagaworker)
    yield takeEvery("candidateinfo/verifydocumentaction", verifydocumentsagaworker)
    yield takeEvery("candidateinfo/verifycandidateaction",verifycandidatesagaworker)
    yield takeEvery("candidateinfo/getcandidateinfoclearanceaction", getcandidateinfoclearancesagaworker)
    yield takeEvery("candidateinfo/shownotifycandidatebuttonaction", shownotifycandidatebuttonsagaworker)
    yield takeEvery("candidateinfo/acceptofferletteraction",acceptofferlettersagaworker)
    yield takeEvery("candidateinfo/notifycandidatedocsbymailaction",notifycandidatedocsbymailsagaworker)
    yield takeEvery("otherdocuments/otherdocumentsgetaction", otherdocumentsgetsagaworker)


}
