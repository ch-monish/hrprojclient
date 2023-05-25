import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { acceptofferletteraction, getcandidateinfoclearanceaction } from '../../../features/Candidate info/candidateinfoslice'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Checkbox } from 'primereact/checkbox'
import { Toast } from "primereact/toast"
import LoadingOverlay from "react-loading-overlay"


import { companySlice } from '../../../features/Company/companyslice'
import { useNavigate } from 'react-router'
import { candidateinfo } from '../../../api/agent'
function Declaration() {
    const dispatch = useDispatch()
    const [declared, setdeclared] = useState(false)
    const [accept, setaccept] = useState(false)
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const clearancedata = useSelector((state: RootState) => state.candidateinfo.clearance)
    const msgs1 = useRef([]);
    const Logindata = useSelector((state: RootState) => state.Login);

    const [roles, setRoles] = useState<any>([]);

    const navigate = useNavigate()
    const [showspinner, setShowspinner] = useState(false)
    const toast = useRef(null);
    useEffect(() => {
        var w: any = []
        // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        Logindata.groups.forEach((i) => setRoles(roles => [...roles, i["name"].toString()]))
        dispatch(getcandidateinfoclearanceaction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

        }))
        console.log(clearancedata)
        console.log(msgs1)
    }, [])
    useEffect(() => {
        var arr: any = []
        clearancedata ? clearancedata.messages.map((i) => {
            console.log(i.toString())
            arr.push(

                { severity: 'info', summary: '', detail: i.toString(), sticky: true, closable: false },

            )
        }) : console.log("")
        console.log(msgs1)

        msgs1.current.clear()
        msgs1.current.show(arr)
    }, [candidateinfodata])
    const acceptoffer = () => {


        setShowspinner(true)
        candidateinfo.acceptofferletter({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
    
        })
        .then((res) => {
            console.log(res);
            setShowspinner(false)
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: res, life: 3000 })
        }).then((res) => { }   
        ).then(() => setTimeout(() => {  navigate("/acknowledgementpage"); }, 2000))
        .catch((ex) => {
            console.log(ex);
            setShowspinner(false)                                    
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: ex.data, life: 3000 });
        })        
        // candidateinfo.acceptofferletter

        // dispatch(acceptofferletteraction({
        //     "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

        // }));
       
    }
    const shouldbuttondisabled = () => {

        if ((accept == true || candidateinfodata.IsOfferAccepted) && declared == true && clearancedata.validation == true)
            return false
        return true
    }
    return (
        <div>
                                                      <LoadingOverlay
                active={showspinner}
                spinner
                text="Processing..."
            >

            <Toast ref={toast} position="bottom-left" />
            <br>
            </br>
            <br>
            </br>
            <Messages ref={msgs1} />

            <br>
            </br>
            <br>
            </br>
            {/* <input type="checkbox" id="accept"  style={{font:"30px"}}onClick={e => setaccept(!accept)}>
            </input> */}
            {!candidateinfodata.IsOfferAccepted&&<><Checkbox className='mr-2' checked={accept} inputId="accept" onChange={e => setaccept(!accept)} />
            <label htmlFor="accept" style={{ cursor: "pointer", fontSize: "1rem", fontWeight: 700 }}>

                Accept Offer Letter
            </label></>}
            <br />
            <br />

            <Checkbox className='mr-2' inputId="declare" checked={declared} onChange={e => setdeclared(!declared)} />
            <label htmlFor="declare" style={{ cursor: "pointer", fontSize: "1rem", fontWeight: 700 }}>

                I do hereby declare that the information furnished as above by me is true and correct to be the best of my knowledge and belief. If any information furnished by me is proved to be incorrect or false, management may take appropriate action against me which could even include termination of my services from the organization with immediate effect
            </label>


            <div style={{ height: "140px" }}>


            </div>

            <div className="p-fluid  grid">

                <div className="field col-12 md:col-4 flex">
                </div>
                <div className="field col-12 md:col-4 flex">
                </div>

                <div className="field col-12 md:col-4 flex gap-4">
                    <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button disabled={shouldbuttondisabled()} onClick={e => acceptoffer()}>Submit</Button>
                </div>
            </div>
            </LoadingOverlay>
        </div>
    )
}

export default Declaration
