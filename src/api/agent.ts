import axios, { AxiosResponse } from "axios";
import {Company} from "../features/Company/companyslice"
import {BusinessUnit} from "../features/BusinessUnit/businessunitslice"
import {Customer} from "../features/Customer/customerslice"
import {ExperienceLevel} from "../features/ExperienceLevel/experiencelevelslice"
import {Designation} from "../features/Designation/designationslice"
import {SubBand} from "../features/SubBand/subbandslice"
import {store} from '../app/store'

import { createtoast } from '../features/ToastSlice'
import {UserRoles} from "../features/UserRoles/userroleslice"
import { request } from "http";
import { logout, sessionlogout } from "../features/Login/Loginslice";




// import {Band} from ../features/Band/bandslice"
// axios.defaults.baseURL = 'http://10.154.155.171:8000/HRWorkflowServer/api/';//monish
// axios.defaults.baseURL = 'http://10.154.20.198:8000/HRWorkflowServer/api/'    // monish
// axios.defaults.baseURL = 'http://10.154.20.143:8000/HRWorkflowServer/api';//dwaraka
// axios.defaults.baseURL ='http://10.154.155.60:8000/HRWorkflowServer/api'     //dwaraka
axios.defaults.baseURL ='https://indiaportal.belcan.com/HRWorkflowServer/api/'  //iistest
// axios.defaults.baseURL = 'http://127.0.0.1:8000/HRWorkflowServer/api';

// axios.defaults.baseURL = 'http://10.154.155.123:8000/HRWorkflowServer/api';
// axios.defaults.baseURL = 'http://10.154.152.21:8000/HRWorkflowServer/api';

//  axios.defaults.baseURL = 'http://10.154.155.169:8000/HRWorkflowServer/api';

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Network error - make sure API is running!");
    // alert("error : "+error)
    store.dispatch(createtoast({

      id:34,

      status:"error",

      data:"Network error - make sure API is running!",

      endpoint:"400"

  }
  )
  )

  return
  }
  const { status, data, config } = error.response;
  if(error.response.data==undefined){console.log("Please Check Internet Connection")
  store.dispatch(createtoast({

    id:34,

    status:"info",

    data:"please check Internet Connection",

    endpoint:"400"

}))

  return
}

  if (status === 404) {
    console.log("404 errosr in API "+error.config.url+"  -->  "+error.response.data.message)
  }

  if (
    status === 400

  ) {
    // history.push("/notfound");
    console.log(error)
  }
  if (status === 500) {
    console.log("Server error - check the terminal for more info!");
  }
  if (status === 401) {
    console.log(status);
    console.log(data);
    if(data.code=="token_not_valid"){
        delete axios.defaults.headers.common["Authorization"];
        // alert("navigate to login")
        store.dispatch(createtoast({

            id:34,

            status:"info",

            data:"Your Session has Expired please login again",

            endpoint:"400"

        }))
        store.dispatch(sessionlogout())
    }
  }
  if(status>500)console.log("Server error - check the terminal for more info!");
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
  };


export const Login={
  login:(data)=>requests.post('/login',data)
}
export const companyapi={
  getallcompaniesdata:()=>requests.get(`/company`),
  createcompany:(data)=>requests.post("/company",data),
  updatecompany:(data)=>requests.put("/company",data)
}
export const businessunitapi={
  getallbusinessunitsdata:()=>requests.get(`/businessunit`),
  createbusinessunit:(data)=>requests.post("/businessunit",data),
  updatebusinessunit:(data)=>requests.put("/businessunit",data)
}
export const Customerapi={
  getallcustomersdata:()=>requests.get(`/Customer`),
  createcustomer:(data)=>requests.post("/Customer",data),
  updatecustomer:(data)=>requests.put("/Customer",data)
}
export const Experienceapi={
  getallexperiencelevelsdata:()=>requests.get(`/Experience`),
  createexperiencelevel:(data)=>requests.post("/Experience",data),
  updateexperiencelevel:(data)=>requests.put("/Experience",data)
}
export const Designationapi={
  getalldesignationsdata:()=>requests.get(`/Designation`),
  createdesignation:(data)=>requests.post("/Designation",data),
  updatedesignation:(data)=>requests.put("/Designation",data)
}
export const SubBandapi={
  getallsubbandsdata:()=>requests.get(`/SubBand`),
  createsubband:(data)=>requests.post("/SubBand",data),
  updatesubband:(data)=>requests.put("/SubBand",data)
}
export const servicelineapi={

  getallservicelinedata:()=>requests.get("/serviceline"),

  createserviceline:(data)=>requests.post("/serviceline",data),

  updateserviceline:(data)=>requests.put("/serviceline",data)

}

export const Locationapi={

  getallLocationdata:()=>requests.get("/Location"),

  createLocation:(data)=>requests.post("/Location",data),

  updateLocation:(data)=>requests.put("/Location",data)

}

export const Bandapi={

  getallBanddata:()=>requests.get("/Band"),

  createBand:(data)=>requests.post("/Band",data),

  updateBand:(data)=>requests.put("/Band",data)

}
export const AvgCTCapi={

  getallManageBilldata:()=>requests.get("/AvgCTC"),

  createManageBill:(data)=>requests.post("/AvgCTC",data),

  updateManageBill:(data)=>requests.put("/AvgCTC",data)

}



export const insuranceapi={

  getallInsurancedata:()=>requests.get("/Insurance"),

  createInsurance:(data)=>requests.post("/Insurance",data),

  updateInsurance:(data)=>requests.put("/Insurance",data)

}
export const userrolesapi={
  getalluserrolesdata:()=>requests.get(`/UserRoles`),
  createuserroles:(data)=>requests.post("/UserRoles",data),
  updateuserroles:(data)=>requests.put("/UserRoles",data)
}
export const Rolesapi={
  getallRolesdata:()=>requests.get(`/Roles`),


}
export const AdUsersapi={

  getallAdUsersdata:()=>requests.get("/AdUsers"),

  createAdUsers:(data)=>requests.post("/AdUsers",data),

  updateAdUsers:(data)=>requests.put("/AdUsers",data)

}


export const Industryapi={

  getallIndustrydata:()=>requests.get("/Industry"),

  createIndustry:(data)=>requests.post("/Industry",data),

  updateIndustry:(data)=>requests.put("/Industry",data)

}

export const jobpostactions={
  getalljobpostactiondata:(data)=>requests.post("jobpost/jobpostactionsdetails",data),
  jobpostactionssubmit:(data)=>requests.post("jobpost/jobpostactionssubmit",data),
  usersbyroles:(data)=>requests.post("jobpost/usersbyrole",data),
  createjobpost:(data)=>requests.post("jobpost/addjobpost",data),
  updatejobpost:(data)=>requests.put("jobpost/addjobpost",data),
  myjobposts:(data)=>requests.post("jobpost/myjobposts",data),
  jobpostcancel:(data)=>requests.post("jobpost/jobpostcancel",data),


}

export const generatepdf={
  downloadpdf:(data)=>requests.post("/pdf/jdpdf",data),
}
export const downloadpdf={
  downloadpdf:(data)=>requests.post("/candidate/downloadresume",data),
}
export const candidateactions = {
  getallcandidatedata:(data)=>requests.post("candidate/gridcandidates",data),
  createcandidate:(data)=>requests.post("candidate/addcandidate",data),
  updatecandidate:(data)=>requests.put("candidate/addcandidate",data),
  candidateactiondetails:(data)=>requests.post("candidate/candidateactionsdetails",data),
  candidateworkflowsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  businessheadapprovalsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  hiringmanagersubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  selectedcandidatesholdsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  selectedcandidateshrholdsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  financecontrollerapprovalsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  generalmanagerapprovalsubmit:(data)=>requests.post("candidate/candidateworkflowsubmit",data),
  getfeedbackfields:(data)=>requests.post("candidate/getfeedbackfields",data),
  getprevfeedbacks:(data)=>requests.post("candidate/getcandidatefeedbacks",data),
  selectedcandidates:(data)=>requests.post("candidate/getselectedcandidates",data),
  annexure:(data)=>requests.post("candidate/getAnnexureDetails",data),
  hrupdatecandidate:(data)=>requests.post("candidate/hrupdatecandidate",data)
}
export const personaldetails = {
  createpersonaldetails:(data)=>requests.post("selectedcandidate/createpersonaldetails",data),
  updatepersonaldetails:(data)=>requests.post("selectedcandidate/updatepersonaldetails",data),
  getpersonaldetailsdata:(data)=>requests.post("selectedcandidate/getpersonaldetailsdata",data),

}
export const pfdetails = {
  createpfdetails:(data)=>requests.post("selectedcandidate/createPFdetail",data),
  updatepfdetails:(data)=>requests.post("selectedcandidate/updatePFdetail",data),
  getpfdetailsdata:(data)=>requests.post("selectedcandidate/getPFdetails",data),

}
export const familydetails = {
  createfamilydetails:(data)=>requests.post("selectedcandidate/createfamilydetail",data),
  updatefamilydetails:(data)=>requests.post("selectedcandidate/updatefamilydetails",data),
  getfamilydetails:(data)=>requests.post("selectedcandidate/getfamilydetails",data),
  deletefamilydetails:(data)=>requests.post("selectedcandidate/deletefamilydetail",data),
}
export const insurance = {
  createinsurance:(data)=>requests.post("selectedcandidate/createinsurancedetail",data),
  updateinsurance:(data)=>requests.post("selectedcandidate/updateinsurancedetail",data),
  getinsurance:(data)=>requests.post("selectedcandidate/getinsurancedetails",data),
  deleteinsurance:(data)=>requests.post("selectedcandidate/deleteinsurancedetail",data),
}
export const candidateinfo = {
  getcandidateinfo:(data)=>requests.post("selectedcandidate/selectedcandidatedetailsbyusername",data),
  uploaddetaildocument:(data)=>requests.post("selectedcandidate/uploaddetaildocument",data),
  downloaddetaildocument:(data)=>requests.post("selectedcandidate/downloaddetaildocuments",data),
  deletedetaildocument:(data)=>requests.post("selectedcandidate/deletedocument",data),
  getcandidateinfoclearance:(data)=>requests.post("selectedcandidate/getcandidateinfoclearance",data),
  acceptofferletter:(data)=>requests.post("selectedcandidate/acceptofferletter",data),
  verifydocument:(data)=>requests.post("selectedcandidate/verifydocument",data),
  verifycandidate:(data)=>requests.post("selectedcandidate/verifycandidate",data),
  shownotifycandidatebutton:(data)=>requests.post("selectedcandidate/shownotifycandidatebutton",data),
  notifycandidatedocsbymail:(data)=>requests.post("selectedcandidate/notifycandidatedocsbymail",data),

}
export const selectedcandidateactions = {
  // getallselectedcandidatedata:(data)=>requests.post("candidate/gridcandidates",data),
  // createselectedcandidate:(data)=>requests.post("candidate/addcandidate",data),//not used by any slice api not there ?
  updateselectedcandidate:(data)=>requests.post("candidate/updateselectedcandidate",data),
  updateselinterncandidate:(data)=>requests.post("candidate/updateselinterncandidate",data),
  updateselcontractcandidate:(data)=>requests.post("candidate/updateselcontractcandidate",data),
  sendOfferLetter:(data)=>requests.post("candidate/sendOfferLetter",data),
  // selectedcandidatedetails:(data)=>requests.post("candidate/candidateactionsdetails",data),

}
export const employementtypeapis={
  getallemployementtypes:()=>requests.get("Employementtype"),
}


export const qualificationapis={
  getallqualifications:()=>requests.get("Qualification"),



}

export const educationaldetailsapis = {
  geteducationaldetailsdata:(data)=>requests.post("selectedcandidate/geteducationdetails",data),
  createeducationdetail:(data)=>requests.post("selectedcandidate/createeducationdetail",data),
  updateeducationdetails:(data)=>requests.post("selectedcandidate/updateeducationdetails",data),
  deleteeducationdetails:(data)=>requests.post("selectedcandidate/deleteeducationdetail",data),

}


export const employementdetailsapis = {
  getemployementdetails:(data)=>requests.post("selectedcandidate/getemployementdetails",data),
  createemployementdetail:(data)=>requests.post("selectedcandidate/createemployementdetail",data),
  updateemployementdetails:(data)=>requests.post("selectedcandidate/updateemployementdetails",data),
  deleteemployementdetails:(data)=>requests.post("selectedcandidate/deleteemployementdetail",data),

}
export const bankdetailsapis = {
  getbankdetails:(data)=>requests.post("selectedcandidate/getbankdetails",data),
  createbankdetail:(data)=>requests.post("selectedcandidate/createbankdetail",data),
  updatebankdetails:(data)=>requests.post("selectedcandidate/updatebankdetail",data),
  deletebankdetails:(data)=>requests.post("selectedcandidate/deletebankdetail",data),

}

export const otherdocumentsapis={
  otherdocumentsget:(data)=>requests.post('selectedcandidate/getotherdocuments',data),
}

export const acceptedcandidatesapis={
  getfulltimeselectedcandidates:()=>requests.get('selectedcandidate/getfulltimeselectedcandidates'),
  getcontractselectedcandidates:()=>requests.get('selectedcandidate/getcontractselectedcandidates'),
  getinternselectedcandidates:()=>requests.get('selectedcandidate/getinternselectedcandidates'),

}

export const updateacceptedcandidatesapis={
  updatefulltimeselectedcandidate:(data)=>requests.post("selectedcandidate/updatefulltimeselectedcandidate",data),
  updatecontractcandidate:(data)=>requests.post("selectedcandidate/updatecontractselcandidate",data),
  updateinterncandidate:(data)=>requests.post("selectedcandidate/updateinternselcandidate",data),
}
export const mailoperationsapis={
  getoperationalmails:(data)=>requests.post("operationalmails/getoperationalmails",data),
  sendoperationalmail:(data)=>requests.post("operationalmails/sendoperationalmail",data),

}

export const bgvvendorsapis={
    getfulltimeselectedcandidates:()=>requests.get('info/bgvvendors'),

}
export const Departmentsapis={
    getdepartments:()=>requests.get('info'),
    updatedepartments:(data)=>requests.put('info',data),

}
