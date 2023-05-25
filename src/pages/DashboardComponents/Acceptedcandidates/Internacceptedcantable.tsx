import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../app/store'
import { internselcandidatesgetaction } from '../../../features/Acceptedcandidates/internselectedcanslice'

function Internacceptedcantable() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const [filters2, setFilters2] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const Internselectedcandidatesdata=useSelector((store:RootState)=>store.Internselectedcandidates)
  useEffect(()=>{
      dispatch(internselcandidatesgetaction())
console.log(Internselectedcandidatesdata)
  },[])

  const onGlobalFilterChange2 = (e: any) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
};


const Headercomp = () => {
  return (
      <div
          className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
      // className="flex justify-content-between"
      >
          <h5>Internship Candidates </h5>
          {/* <Toolbar
  //  className="mb-4"
   left={leftToolbarTemplate}
   right={rightToolbarTemplate}
 >
   {" "}
 </Toolbar> */}

          <span style={{ width: "30%" }}></span>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
          </span>


      </div>
  );
};
const datetemplate = (rowdata: any) => {

  return <>{formatDate(new Date(rowdata.candidate.ExpectedDOJ))}</>;


}
const formatDate = (value: any) => {
  return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  });
  // return value.toLocaleDateString('en-US');
}

const actionbodytemplate=(rowdata)=>{
  return(<div>
   <Button
                            icon="pi pi-inbox"
                            tooltip='Emails Workflow'
                            className="p-button-rounded p-button-warning"
                              // style={{ width: "30px", height: "30px",}}
                              onClick={(e) => {



                                      navigate("/candidateoperationsflow/"+rowdata.candidate.CandidateCode )
                              }}
                          />

  </div>)
  }
const linktemplate = (rowdata) => {
  // console.log(rowdata)
  return (
      <>
      <Link to={'/interncandidateedit'} state={rowdata}>{rowdata.candidate.CandidateCode}</Link>
      </>
  )
}
const Durationtemplate=(rowdata)=>{
    return (
        <div>
            {rowdata.Duration} Months
        </div>
    )
}
const formatCurrencyfinalctc = (rowdata) => {
    var value1 = rowdata.FinalCTC
    return (<>{
        //  (rowdata.candidate.NegotiatedCTC?.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
        value1 ? value1.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }) : ""
    }</>)
}
  return (
    <div>







<DataTable value={Internselectedcandidatesdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rowsPerPageOptions={[10,20,50]} rows={10}
            globalFilterFields={['candidate.CandidateCode','candidate.candidatefullname','jobpost.JobCode','jobpost.JobTitle','designation_name','DateOfJoining','EndDate','Duration','FinalCTC']} filters={filters2} header={Headercomp}>
               <Column field="candidate.CandidateCode" header="Candidate Code"  body={linktemplate} sortable style={{ minWidth: '13rem', maxWidth: '13rem' }} ></Column>
                <Column field="candidate.candidatefullname" header="Candidate Name" sortable></Column>
                <Column field="jobpost.JobCode" header="Job Code" sortable></Column>
                <Column field="jobpost.JobTitle" header="Job Title" sortable></Column>
                <Column field="designation_name" header="Designation" sortable></Column>

                <Column field="DateOfJoining" header="Start Date"  body={datetemplate} sortable></Column>

                <Column field="Duration" header="Duration" sortable body={Durationtemplate}></Column>
                <Column field="FinalCTC" header="Stipend(per Month)" sortable  body={formatCurrencyfinalctc}></Column>
                <Column  header="Action"  body={actionbodytemplate} sortable></Column>



                {/* <Column field="HiringManager" header="Hiring Manager" sortable></Column>
                <Column field="company_name" header="Company" sortable></Column>
                <Column field="businessunit_name" header="Business Unit" sortable></Column>
                <Column field="serviceline_name" header="Service Line" sortable></Column>
                <Column field="customer_name" header="Customer"sortable ></Column>
                <Column field="experience_range" header="Experience Range"sortable ></Column>
                <Column field="OnBoardingDate" header="Onboarding Date" sortable dataType="date" body={dateBodyTemplate}></Column>
                <Column field="NoOfPositions" header="No Positions" sortable dataType=''></Column>
                <Column field="Stage" header="Status" sortable></Column> */}

            </DataTable>
    </div>
  )
}

export default Internacceptedcantable
