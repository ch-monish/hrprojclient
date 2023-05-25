import React, { useDebugValue, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { downloadresume } from '../../features/Downloadpdfs/pdfslice'

function CandidateDetails(props: any) {
    const dispatch = useDispatch()

    const candidatedata = props.data
    useEffect(() => {
        console.log(props.data)
    }, [])
    const formatCurrency = (value: any) => {

        return value ? value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '';


    }
    const formatDollar = (value: any) => {

        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    }
    return (
        <>

            <div className="grid">
                <div className="md:col-4">


                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Prefix  </span><span className="font-w400">: {candidatedata?.Honorifics}</span></p>
                    <p ><span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification  </span><span style={{ fontWeight: "400" }}>: {candidatedata?.Qualification}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Overall Experience </span> <span className="font-w400">: {candidatedata?.OverallExpYear}.{candidatedata?.OverallExpMonth} years</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Organization  </span><span className="font-w400">: {candidatedata?.CurrentOrganization}</span></p>


                </div>


                <div className="md:col-4">
                    <p >
                        <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Last Name   </span> <span className="font-w400">: {candidatedata?.CanLastName}</span>

                    </p>

                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Relevant Experience  </span><span className="font-w400">: {candidatedata?.ReleventExpYear}.{candidatedata?.ReleventExpMonth} years</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Location  </span><span className="font-w400">: {candidatedata?.CurrentJobLocation}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}> Email </span><span className="font-w400">: {candidatedata?.Email}</span></p>

                </div>


                <div className="md:col-4">
                <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>First Name  </span><span className="font-w400">: {candidatedata?.CanFirstName}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Skills  </span><span className="font-w400">: {candidatedata?.Skills}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Location  </span><span className="font-w400">: {candidatedata?.CanJobLocation}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Contact No  </span><span className="font-w400">: {candidatedata?.ContactNo}</span></p>

                </div>
            </div>

            <br></br>
            <div className="grid">
                {/* {console.log(candidatedata?.Resume.split('/'))} */}
                <div className="md:col-4">
                <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.CurrentCTC)}</span></p>
                <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected DOJ  </span><span className="font-w400">: {new Date(candidatedata?.ExpectedDOJ).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })}</span></p>

                </div>
                <div className="md:col-4">
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.ExpectedCTC)}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Average approved CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.AvgApprovedCTC)}</span></p>
                </div>
                <div className="md:col-4">

                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Negotiated CTC  </span><span className="font-w400">: {formatCurrency(candidatedata?.NegotiatedCTC)}</span></p>
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Avg Bill rate($) </span><span className="font-w400">: {candidatedata?.AvgBillRate ? formatDollar(candidatedata?.AvgBillRate) : <></>}</span></p>
                </div>
            </div>
            <div className="grid">
            <div className="md:col-4">
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Employement Type  </span><span className="font-w400">: {candidatedata?.CanEmploymentType} {candidatedata?.CanDuration > 0 ? <>({candidatedata?.CanDuration} months)</> : <></>}</span></p>
            </div>   
                <div className="md:col-8">


                    {/* <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC : </span><span className="font-w400">{candidatedata?.ExpectedCTC}</span></p> */}
                    <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Resume  </span><span className="font-w400">

                        <a style={{ cursor: "pointer" }} onClick={
                            e => {
                                dispatch(downloadresume(
                                    {
                                        'Resume': candidatedata?.Resume.toString().substring(1, candidatedata?.Resume.toString().length)
                                    }
                                )
                                )
                            }} > {candidatedata?.Resume.split('/')[candidatedata?.Resume.split('/').length - 1]}</a>
                        {/* <link   onClick={
        e => {
            dispatch(downloadresume(
                {
                    'Resume': candidatedata?.Resume.toString().substring(1, candidatedata?.Resume.toString().length)
                }
            )
            )
        }}> {candidatedata?.Resume.split('/')[candidatedata?.Resume.split('/').length - 1]}</link> */}


                    </span>
                    </p>
                </div>

            </div>
        </>
    )
}

export default CandidateDetails
