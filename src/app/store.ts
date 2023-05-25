import { applyMiddleware, configureStore,combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import { rootSaga } from './saga'
import companyReducer from '../features/Company/companyslice'
import businessunitReducer from '../features/BusinessUnit/businessunitslice'
import customerReducer from '../features/Customer/customerslice'
import experiencelevelReducer from '../features/ExperienceLevel/experiencelevelslice'
import designationReducer from '../features/Designation/designationslice';
import subbandReducer from '../features/SubBand/subbandslice';
import toastReducer from '../features/ToastSlice'
import servicelineReducer from '../features/ServiceLine/ServiceLineSlice';
import LocationReducer from '../features/Location/Locationslice'
import BandReducer from '../features/Band/Bandslice'
import ManageBillReducer from '../features/ManageBillRate/ManageBillRateslice'
import InsuranceReducer from '../features/ManageInsurance/ManageInsuranceslice'
import IndustryReducer from '../features/Industry/Industryslice'
// import bandReducer from '../features/Band/bandslice';
import UserRolesReducer from '../features/UserRoles/userroleslice';
import userroleoptions from '../features/UserRoles/userroleoptionsslice';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginReducer from '../features/Login/Loginslice';
import jobpostactionsReducer from '../features/JobPostActions/jobpostactionsslice';
import usersbyrolesReducer from '../features/JobPostActions/usersbyrolesslice'
import {persistStore,persistReducer} from 'redux-persist'
import storage  from 'redux-persist/lib/storage'
import rolesoptions from '../features/UserRoles/rolesoptionsslice';
import myjobpostsReducer from '../features/JobPostActions/myjobpostsslice'
import CandidatesforjobpostReducer from '../features/CandidateActions/candidateactionsslice';
import CandidateactiondetailsReducer from '../features/CandidateActions/candidateactiondetailsslice';
import qualificationReducer from '../features/Dropdownoptions/qualificationtypeslice';
import employementtypeReducer from '../features/Dropdownoptions/employementtypeslice';
import feedbackfieldsReducer from '../features/CandidateActions/feedbackfieldsslice';
import  prevfeedbackReducer from "../features/CandidateActions/prevfeedbacks"
import  globalReducer from "../features/Misc/globalslice"
import  selectedcandidatesReducer from "../features/CandidateActions/selectedcandidatesslice"
import  anexureReducer from "../features/CandidateActions/annexureslice"
import PersonaldetailsReducer from "../features/Candidate info/personaldetailsslice"
import EducationaldetailsReducer from "../features/Candidate info/educationdetailsslice"
import employementdetailsReducer from "../features/Candidate info/employementdetailsslice"
import candidateinfoReducer from "../features/Candidate info/candidateinfoslice"
import otherdocumentsReducer from "../features/Candidate info/otherdocumentsslice"
import FamilydetailsReducer from "../features/Candidate info/familydetailsslice"
import insuranceReducer from "../features/Candidate info/insuranceslice"
import bankdetailsReducer from "../features/Candidate info/bankdetailsslice"
import PfdetailsReducer from '../features/Candidate info/pfdetailsslice';
import FulltimeselcandidatesReducer from '../features/Acceptedcandidates/fulltimeselectedcanslice';
import ContractselectedcandidateReducer from '../features/Acceptedcandidates/contractselectedcanslice';
import InternselectedcandidateReducer from '../features/Acceptedcandidates/internselectedcanslice';
import OperationalmailsReducer from '../features/Operationalmails/Operationalmailsslice';
import BgvvendorsSliceReducer from '../features/Bgvvendors/Bgvvendorsslice';
import DepartmentReducer from '../features/Departments/Departmentsslice';
// export function useReduxStore() {
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

// const enhancers = applyMiddleware(logger, sagaMiddleware);
// }
const persistconfig={
  key:"key",
  storage
}

const rootreducer = combineReducers({

  company: companyReducer,
  businessunit: businessunitReducer,
  customer: customerReducer,
  experiencelevel: experiencelevelReducer,
  designation: designationReducer,
  subband: subbandReducer,
  toaster: toastReducer,
  serviceline: servicelineReducer,
  Location: LocationReducer,
  Band: BandReducer,
  ManageBill: ManageBillReducer,
  Insurance: InsuranceReducer,
  Industry: IndustryReducer,
  userroles: UserRolesReducer,
  userroleoptions: userroleoptions,
  myjobposts:myjobpostsReducer,
  Candidatesforjobpost:CandidatesforjobpostReducer,
Login:LoginReducer,
JobPostAction:jobpostactionsReducer,
rolesoptions:rolesoptions,
usersbyroles:usersbyrolesReducer,
Candidateactions:CandidateactiondetailsReducer,
Selectedcandidates:selectedcandidatesReducer,
qualification:qualificationReducer,
employementtype:employementtypeReducer,
feedbackfields:feedbackfieldsReducer,
prevfeedback:prevfeedbackReducer,
global:globalReducer,
CandidatePersonaldetails:PersonaldetailsReducer,
CandidatePfdetails:PfdetailsReducer,
CandidateFamilydetails:FamilydetailsReducer,
CandidateInsurance:insuranceReducer,
candidateinfo:candidateinfoReducer,
Educationaldetails:EducationaldetailsReducer,
employementdetails:employementdetailsReducer,
bankdetails:bankdetailsReducer,
anexure:anexureReducer,
otherdocuments:otherdocumentsReducer,
Fulltimeselcandidates:FulltimeselcandidatesReducer,
Contractselectedcandidates:ContractselectedcandidateReducer,
Internselectedcandidates:InternselectedcandidateReducer,
operationalmails:OperationalmailsReducer,
Bgvvendors:BgvvendorsSliceReducer,
Departments:DepartmentReducer
// CandidateAction :CandidateActionReducer,

  // band: bandReducer,

})
//check if we can find url == /login if so dont allow to persist
const persistedReducer=persistReducer(persistconfig,rootreducer)
// const middlewares = [sagaMiddleware]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const enhancers = [middlewareEnhancer]
// const composedEnhancers = composeWithDevTools(...enhancers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  // enhancers: [composedEnhancers]
})

export const persistor=persistStore(store)
sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// export type RootReducer=ReturnType<typeof rootreducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// function createLogger() {
//   throw new Error('Function not implemented.');
// }
