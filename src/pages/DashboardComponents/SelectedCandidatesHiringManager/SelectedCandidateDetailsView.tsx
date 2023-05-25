import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { getactivebandoptions } from '../../../features/Band/BandSelector'
import { getBandaction } from '../../../features/Band/Bandslice'
import { getactivedesignationoptions } from '../../../features/Designation/designationselector'
import { getdesignationsaction } from '../../../features/Designation/designationslice'
import { getasubbandactiveoptions } from '../../../features/SubBand/subbandselector'
import { getsubbandsaction } from '../../../features/SubBand/subbandslice'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { RadioButton } from 'primereact/radiobutton';
import { previewannexureaction, updateselectedcandidatesaction } from '../../../features/CandidateActions/selectedcandidatesslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Accordion, AccordionTab } from 'primereact/accordion'
import Annexure from './Annexure'
import { Dialog } from 'primereact/dialog'

function SelectedCandidateDetailsView(props) {
    const location = useLocation()
    const [data, setdata] = useState(location.state)
    const logindata = useSelector((state: RootState) => state.Login)
    const annexuredata = useSelector((state: RootState) => state.anexure)
    // const [mode, setmode] = useState(data.designation ? "true" : "false")
    const [candidatedata, setCandidatedata] = useState(data.candidate)
    const [jobpostdata, setjobpostdata] = useState(data.jobpost)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    useEffect(() => {
        // dispatch(getdesignationsaction())
        // dispatch(getBandaction())
        // dispatch(getsubbandsaction())
        // console.log(location.state)
        console.log(data)
        console.log(annexuredata)

    }, [])
    useEffect(() => {
        console.log(annexuredata)
    }, [annexuredata])




    const callpreviewannexure1 = async (values) => {

        console.log(values)
        values["FixedCTC"] = parseInt(values["FixedCTC"])
        values["VariablePay"] = parseInt(values["VariablePay"])
        if (values["ShiftAllowance"] != null)
            values["ShiftAllowance"] = parseInt(values["ShiftAllowance"])
        if (values["JoiningBonus"] != null)
            values["JoiningBonus"] = parseInt(values["JoiningBonus"])
        values.selectedcandidateid = values.Selected_Candidate_ID

        // var datetemp = new Date(values.DateOfJoining)
        values["doj"] = values.DateOfJoining
        if (
            values.selectedcandidateid &&
            values.designation &&
            values.band &&
            (values.band_name == 'L' || values.subband) &&
            values.FixedCTC &&
            values.VariablePercentage &&
            values.MQVariable &&
            values.IS_Eligible_annu_Mgnt_Bonus &&
            values.IS_Eligible_Joining_Bonus &&
            values.IS_Eligible_Monthly_Incentive) {


        }
        // values.selectedcandidateid=data.Selected_Candidate_ID?data.Selected_Candidate_ID:values.selectedcandidateid
        {

            await dispatch(previewannexureaction(values))
            // await setdata(values)
            // await setmode("draft")
            setshow(true)
        }
    }
    const DialogFooter = () => {
        return (
            <>
                <Button onClick={e => { setshow(false); console.log(data) }}>Close</Button>
            </>
        )
    }
    const formatCurrency = (value: any) => {
        return value ? value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '';


    }

    const CTCData = (data: any) => {
        // data = data.data
        console.log(data)
        if (data.IsVariable == true && jobpostdata.businessunit_name == "Workforce Solutions") {
            return (
                <div className="grid">
                    <div className="md:col-1">
                        <b>Fixed CTC</b>
                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FixedCTC)}
                    </div>
                    <div className="md:col-1">
                        <b>Variable Pay</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.VariablePay)} ({data.VariablePerc}%)

                    </div>
                    <div className="md:col-1">
                        <b>Final CTC</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FinalCTC)}

                    </div>
                    <div className="md:col-1">
                        <b>Shift Allowance</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.ShiftAllowance)}

                    </div>
                </div>
            )
        } else if (data.IsVariable == true) {
            return (
                <div className="grid">
                    <div className="md:col-1">
                        <b>Fixed CTC</b>
                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FixedCTC)}
                    </div>
                    <div className="md:col-1">
                        <b>Variable Pay</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.VariablePay)} ({data.VariablePerc}%)

                    </div>
                    <div className="md:col-1">
                        <b>Final CTC</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FinalCTC)}

                    </div>

                </div>
            )

        } else if (data.IsVariable == false && jobpostdata.businessunit_name == "Workforce Solutions") {
            return (
                <div className="grid">
                    <div className="md:col-1">
                        <b>Fixed CTC</b>
                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FixedCTC)}
                    </div>

                    <div className="md:col-1">
                        <b>Final CTC</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FinalCTC)}

                    </div>
                    <div className="md:col-1">
                        <b>Shift Allowance</b>

                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.ShiftAllowance)}

                    </div>

                </div>
            )
        } else if (data.IsVariable == false) {
            return (
                <div className="grid">
                    <div className="md:col-1">
                        <b>Fixed CTC</b>
                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FixedCTC)}
                    </div>

                    <div className="md:col-1">
                        <b>Final CTC</b>
                    </div>
                    <div className="md:col-2">
                        : {formatCurrency(data?.FinalCTC)}
                    </div>

                </div>
            )
        } else {
            return <>cxcxc</>
        }
    }
    return (
        <>
            {/* {alert(mode)} */}

            <Card>
                <Dialog visible={show} style={{ width: "50%" }} header="Annexure Information " modal className="p-fluid" footer={DialogFooter} onHide={() => setshow(false)}>

                    {/* <label htmlFor="BandName<">Annexure</label> */}

                    <Annexure annexure={annexuredata}></Annexure>

                </Dialog>
                <Panel header={"Candidate Details"}>
                    <CandidateDetails data={candidatedata}></CandidateDetails>
                </Panel>
                <br>
                </br>
                <Accordion>
                    <AccordionTab header={"JobPost Details"}>
                        <JobPostDetails JobData={jobpostdata}></JobPostDetails>
                    </AccordionTab>
                </Accordion>
                {/* <Panel header={"JobPost Details"}>
                    <JobPostDetails JobData={data.jobpost}></JobPostDetails>

                </Panel> */}
                <br></br>
                <Panel header="Offer Details">
                    {console.log(data)}
                    {data.candidate.EmploymentType == "Full-Time" &&

                        <div>
                            <div className="grid">

                                <div className="md:col-1">
                                    <b> Designation</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.designation_name}
                                </div>
                                <div className="md:col-1">
                                    <b>Band</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.band_name}
                                </div>
                                <div className="md:col-1">
                                    <b>Sub Band</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.subband_name}
                                </div>
                                <div className="md:col-1">
                                    <b>Date of joining</b>
                                </div>
                                <div className="md:col-2">
                                    : {new Date(data?.DateOfJoining).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </div>
                            </div>
                            <br></br>
                            {/* {if (data.IsVariable == true && jobpostdata.businessunit_name == "Workforce Solutions"){
                               <div className="grid">

                                </div>
                               
                            }} */}
                            {/* 
                            <div className="grid">
                                <div className="md:col-6">
                                    {data.IsVariable == true ? (<> Fixed CTC: {formatCurrency(data?.FixedCTC)}



                                        <br></br>


                                        <br></br>
                                        <br />
                                    </>) : ""}
                                    Final CTC: {formatCurrency(data?.FinalCTC)}

                                </div>
                                <div className="md:col-6">
                                    Shift Allowance: {formatCurrency(data?.ShiftAllowance)}
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    {data.IsVariable == true ? (<> Variable Pay : {data.VariablePerc}%  <br></br>   {formatCurrency(data?.VariablePay)}
                                        ({data.IsVariable == true ? data.MQVariable : ""})</>) : " "}
                                </div>
                                <br></br>

                                <br></br>




                                <div className="md:col-2">
                                </div>

                            </div>




                            <br></br> */}
                            {/* <CTCData data = {data}></CTCData> */}
                            {CTCData(data)}
                            <br></br>
                            <div className="grid">
                                <div className="md:col-3">
                                    <b>Eligible for Annual Mgnt Bonus</b>
                                </div>
                                <div className="md:col-9">
                                    :{data.Is_Eligible_annu_Mgnt_Bonus == true ? (<> Yes</>) : " No"}
                                </div>
                            </div>
                            <div className="grid">
                                <div className="md:col-3">
                                    <b>Eligible for Joining Bonus</b>
                                </div>
                                <div className="md:col-9">
                                    :{data.Is_Eligible_Joining_Bonus == true ? (<> Yes</>) : " No"}

                                    {data.Is_Eligible_Joining_Bonus == true ? "(" + formatCurrency(data.JoiningBonus) + ')' : ""}
                                </div>
                            </div>
                            <div className="grid">
                                <div className="md:col-3">
                                    <b>Eligible for Monthly Incentive</b>
                                </div>
                                <div className="md:col-9">
                                    :{data.IS_Eligible_Monthly_Incentive == true ? (<> Yes</>) : " No"}
                                </div>




                            </div>

                            {/* <div className=" grid">

                                <div className="field col-12 md:col-9"></div>
                                <div className="field col-12 md:col-3 flex">
                                    <Button className='mr-3' type="button" onClick={e => {
                                        callpreviewannexure1(data);

                                    }}>Annexure Details

                                    </Button>

                                </div>
                            </div> */}
                        </div>

                    }
              


                    {(data.candidate.EmploymentType == "Contract(direct)" || data.candidate.EmploymentType == "Contract(vendor)") &&
                        <>
                            <div className="grid">

                                <div className="md:col-2">
                                    <b>Designation</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.designation_name}
                                </div>


                                <div className="md:col-2">
                                    <b>Remuneration(per month )</b>
                                </div>

                                <div className="md:col-2">
                                    : {formatCurrency(data?.FinalCTC)}
                                </div>
              
                                <div className="md:col-2">
                                <b>Number of hours (Per Month)</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.NoOfHours}
                                </div>
            
                            </div>
                    
                            <div className="grid">

                                <div className="md:col-2">
                                    <b>Start Date</b>
                                </div>
                                <div className="md:col-2">
                                    : {new Date(data?.DateOfJoining).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </div>
                                
                                <div className="md:col-2">
                                    <b>End Date</b>
                                </div>
                                <div className="md:col-2">
                                    : {new Date(data?.EndDate).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </div>
                                
                                <div className="md:col-2">
                                    <b>Duration (In months)</b>
                                </div>
                                <div className="md:col-2">
                                    : {data.Duration}
                                </div>
                             


                            </div>
          
                            <div className="grid">

                                <div className="md:col-2">
                                   
                                    <b>Responsibilities</b>
                                </div>

                                <div className="md:col-10">
                                   
                                    : {data.Responsibilities.split("\n").map((i) => <div>{i}</div>)}
                                </div>
                          

                            </div>
                        </>}
                    {data.candidate.EmploymentType == "Internship" &&
                        <>
                            <div className="grid">

                                <div className="md:col-2">
                                    <b>Designation</b>
                                </div>

                                <div className="md:col-1">
                                    : {data.designation_name}
                                </div>                 


                                <div className="md:col-2">
                                <b>Stifend</b>
                                </div>
                                <div className="md:col-1">
                                    : {formatCurrency(data?.FinalCTC)}
                                </div>                          


                                <div className="md:col-2">
                                <b> Duration (In months)</b>
                                </div>
                                <div className="md:col-1">
                                    : {data.Duration}
                                </div>
              
                                <div className="md:col-2">
                                <b>Start Date</b>
                                </div>
                                <div className="md:col-1">
                                   : {new Date(data?.DateOfJoining).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </div>

                            </div></>}










                </Panel>

                <br></br>
                <br></br>
                <div className=" grid">

                    <div className="field col-12 md:col-9"></div>
                    <div className="field col-12 md:col-3 flex">
                        {/* <Button className='mr-3' type="button" onClick={e => {
                            callpreviewannexure1(data);

                        }}>Annexure Details

                        </Button> */}

                        {data.candidate.EmploymentType == "Full-Time" &&
                            <Button className='mr-3' type="button" onClick={e => {
                                callpreviewannexure1(data);

                            }}>Annexure Details

                            </Button>
                        }
                        <Button type="button" onClick={e => navigate(-1)}>Cancel
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}



export default SelectedCandidateDetailsView