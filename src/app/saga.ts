import { all, call, fork, spawn } from "redux-saga/effects";

import { watcherbusinessunit } from "../features/BusinessUnit/businessunitsaga";

import { watchercompany } from "../features/Company/companysaga";

import { watchercustomer } from "../features/Customer/customersaga";

import { watcherexperiencelevel } from "../features/ExperienceLevel/experiencelevelsaga";

import { watcherdesignation } from "../features/Designation/designationsaga";

import { watchersubband } from "../features/SubBand/subbandsaga";

// import { watcherband } from "../features/Band/bandsaga";

import { watcherserviceline } from "../features/ServiceLine/ServiceLineSaga"



import { watcherLocation } from "../features/Location/Locationsaga";



import { watcherBand } from "../features/Band/Bandsaga";



import { watcherManageBill } from "../features/ManageBillRate/ManageBillRatesaga";



import { watcherInsurance } from "../features/ManageInsurance/ManageInsurancesaga"



import { watcherIndustry } from "../features/Industry/Industry.saga";

import { watcheruserroles } from "../features/UserRoles/userrolesaga";

import { watcherLogin } from "../features/Login/Loginsaga";

import { watcherJobPostAction } from "../features/JobPostActions/jobpostactionssaga";

import { watcherCandidateAction } from "../features/CandidateActions/candidateactionssaga";
import { watcherpdfdownload } from '../features/Downloadpdfs/downloadsaga'
import { watcherdropdownoptions } from "../features/Dropdownoptions/dropdownoptionssaga";
import { watcherpersonaldetails } from "../features/Candidate info/candidateinfosaga";
import { watcheracceptedcandidates } from "../features/Acceptedcandidates/acceptedcandidatessaga";
import { watcherOperationalmails } from "../features/Operationalmails/Operationalmailssaga";
import { watcherBgvvendors } from "../features/Bgvvendors/Bgvvendorssaga";
import { watcherDepartments } from "../features/Departments/Departmentsaga";
// import { watcherfeedback } from "../features/Feedback/feedbacksaga";


function* helloSaga() {
  yield console.log("sagas started");
  yield "Hello Sagas";
}

export function* rootSaga() {
  // yield all([helloSaga(), watchercounter(),watcherquote(),watchercompany(),
  // watcherbusinessunit(),watchercustomer(),watcherexperiencelevel(),watcherdesignation(),watchersubband()3]);
  // yield all([helloSaga(), watchercounter(),watcherquote(),watcherbusinessunit()]);
  // yield all([helloSaga(), watchercounter(),watcherquote(),watchercustomer()]);
  // yield spawn(helloSaga)
  // yield spawn(watchercompany)
  // yield spawn(watcherbusinessunit)
  // yield spawn(watchercustomer)
  // yield spawn(watcherexperiencelevel)
  // yield spawn(watcherdesignation)
  // // yiespawnork(watcherband)
  // yield spawn(watchersubband)
  // yield spawn(watcherserviceline)
  // yield spawn(watcherLocation)
  // yield spawn(watcherBand)
  // yield spawn(watcherManageBill)
  // yield spawn(watcherInsurance)
  // yield spawn(watcherIndustry)
  // yield spawn(watcherLogin)
  // yield spawn(watcherJobPostAction)
  // yield spawn(watcheruserroles)
  // yield spawn(watcherpdfdownload)
  // yield spawn(watcherCandidateAction)

  const sagas = [
    helloSaga,
    watchercompany,
    watcherbusinessunit,
    watchercustomer,
    watcherexperiencelevel,
    watcherdesignation,
    watchersubband,
    watcherserviceline,
    watcherLocation,
    watcherBand,
    watcherManageBill,
    watcherInsurance,
    watcherIndustry,
    watcherLogin,
    watcherJobPostAction,
    watcheruserroles,
    watcherpdfdownload,
    watcherCandidateAction,
    watcherdropdownoptions,
    watcherpersonaldetails,
    watcheracceptedcandidates,
    watcherOperationalmails,
    watcherBgvvendors,
    watcherDepartments

    // watcherfeedback

  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
          console.log("sagas restarting")
        }
      }
    }))
  );
}
