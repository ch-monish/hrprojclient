import React, { useEffect } from 'react'

function Annexure(props) {
    const data = props.annexure
    useEffect(() => {
        console.log(data)
    })
    return (
        <div>
            <table style={{ borderCollapse: "collapse", border: "1px solid #dddddd", width: "100%" }}>
                <tr>
                    <td style={{ border: "1px solid #dddddd", fontWeight: "bold" }}>Name</td>

                    <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }} colSpan={2}>{data.varName}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd", fontWeight: "bold" }}>Band   </td>

                    <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }} colSpan={2}>{data.varBand}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd", fontWeight: "bold" }}>Sub Band   </td>

                    <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }} colSpan={2}>{data.varSubBand}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd", fontWeight: "bold" }}>Designation   </td>

                    <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }} colSpan={2}>{data.varDesignation}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd", fontWeight: "bold" }}>Location   </td>

                    <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }} colSpan={2}>{data.varLocation}</td>
                </tr>

                {!data.iSVariablePay ? <>
                    <tr  style={{ backgroundColor: "#17375d"}}>
                    <td height={20} colSpan={3} style={{ border: "1px solid #dddddd", textAlign: "center" }}> </td>  
                    </tr>
                    <tr >
                        <td style={{ backgroundColor: "#17375d",fontWeight: "bold", color:"white"  }}>Total Gross Salary	:</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" }}></td>    
                        <td style={{ fontWeight: "bold",  border: "1px solid #dddddd",textAlign: "center" }}>{data.varTotalACTC}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#17375d"}}>
                        <th style={{ border: "1px solid #dddddd",  color:"white", textAlign: "left"  }}>Components</th>
                        <th style={{ border: "1px solid #dddddd", color:"white" }}>Per Month</th>
                        <th style={{ border: "1px solid #dddddd", color:"white" }}>Per Annum</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Basic</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varMBasic}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varABasic}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>HRA</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varMHRA}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varAHRA}</td>


                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Employer Provident Fund	</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varMPF}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varAPF}</td>
                    </tr>


                    {
                        data.iSBonus == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Statutory Bonus</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varMBonus}</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varABonus}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    {
                        data.iSShiftAllow == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Shift Allowance</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varMShiftAllow}</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varTotalFixedCTC}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Flexible Benefit  Plan </td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varMFBP}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center",fontWeight: "bold" }}>{data.varAFBP}</td>
                    </tr>



                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Total  </td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varTotalMCTC}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varTotalACTC}</td>
                    </tr>


                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Total CTC</td>
                        <td style={{ border: "1px solid #dddddd" }}></td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" ,fontWeight: "bold"}}>{data.varTotalACTC}</td>
                    </tr>



                </> : <>
                    <tr style={{backgroundColor: "#17375d"}}>
                        <th style={{ border: "1px solid #dddddd", color:"white" }}>Components</th>

                        <th style={{ border: "1px solid #dddddd" }} colSpan={2}></th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Fixed Compensation:</th>
                        <th style={{ border: "1px solid #dddddd", textAlign: "center" }}>{data.varFixedPayPerc}%</th>
                        <th style={{ border: "1px solid #dddddd", textAlign: "center" }}>{data.varTotalFixedCTC}</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #dddddd", backgroundColor: "#17375d" , fontWeight: "bold", color:"white"}}>A.Fixed Compensation:</th>
                        <th style={{ border: "1px solid #dddddd" }}>Per Month</th>
                        <th style={{ border: "1px solid #dddddd" }}>Per Annum</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Basic</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varMBasic}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varABasic}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>HRA</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varMHRA}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varAHRA}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Employer Provident Fund	</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varMPF}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varAPF}</td>
                    </tr>


                    {
                        data.iSBonus == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Statutory Bonus</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varMBonus}</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varABonus}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    {
                        data.iSShiftAllow == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Shift Allowance</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varMShiftAllow}</td>
                                <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varAShiftAllow}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Flexible Benefit  Plan </td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varMFBP}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varAFBP}</td>
                    </tr>



                    <tr>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Total (A) </td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varTotalMCTC}</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varTotalFixedCTC}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", backgroundColor: "#17375d", fontWeight: "bold", color:"white" }}>B. Variable Compensation </td>
                        <td colSpan={2} style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>Per annum</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", backgroundColor:"#808080", color:"white", textAlign: "left", fontWeight: "bold" }}>Individual Performance Linked Pay</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varVariablePayPerc}%</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", fontWeight: "bold" }}>{data.varVariablePay}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Total (B) </td>
                        <td style={{ border: "1px solid #dddddd" }}>{ }</td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varVariablePay}</td>
                    </tr>


                    <tr>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center", backgroundColor: "#17375d", fontWeight: "bold",color:"white" }}>Total Cash Compensation (A+B) (TCC)</td>
                        <td style={{ border: "1px solid #dddddd" }}></td>
                        <td style={{ border: "1px solid #dddddd", textAlign: "center" , fontWeight: "bold"}}>{data.varTotalACTC}</td>
                    </tr>

                </>}
            </table>



        </div>
    )
}

export default Annexure

const mystyle = {

}