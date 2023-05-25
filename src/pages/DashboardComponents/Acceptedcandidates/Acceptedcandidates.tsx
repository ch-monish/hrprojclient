import { Card } from 'primereact/card'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { setacceptedcandidateactivetab, setdashboardactivetab } from '../../../features/Misc/globalslice'
import Contractacceptedcantable from './Contractacceptedcantable'
import Fulltimeacceptedcantable from './Fulltimeacceptedcantable'
import Internacceptedcantable from './Internacceptedcantable'
import { fulltimeselcandidatesgetaction } from '../../../features/Acceptedcandidates/fulltimeselectedcanslice'
import { internselcandidatesgetaction } from '../../../features/Acceptedcandidates/internselectedcanslice'
import { contractselcandidatesgetaction } from '../../../features/Acceptedcandidates/contractselectedcanslice'


function Acceptedcandidates() {
    const dispatch = useDispatch()
    const globaldata = useSelector((state: RootState) => state.global);
    const Fulltimeselcandidatesdata = useSelector((state: RootState) => state.Fulltimeselcandidates);
    const Contractselectedcandidatesdata = useSelector((state: RootState) => state.Contractselectedcandidates);
    const Internselectedcandidatesdata = useSelector((state: RootState) => state.Internselectedcandidates);
    useEffect(()=>{
        dispatch(fulltimeselcandidatesgetaction())
              dispatch(internselcandidatesgetaction())
              dispatch(contractselcandidatesgetaction())

    },[])
    return (
        <div>

            <div className='grid justify-content-between  d-flex  flex-row align-items-stretch' style={{ gap: "40px" }}>
                <div className={"tabs"} style={{ flexGrow: 1, gap: "40px" }} onClick={e => dispatch(setacceptedcandidateactivetab("Full-Time"))}>

                    <div className={globaldata.acceptedcandidateactivetab == "Full-Time" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">Full-Time Candidates</span>
                                <div className="text-900 font-medium text-xl">{Fulltimeselcandidatesdata ? Fulltimeselcandidatesdata.length : 0}</div>
                                {/* <div className="text-900 font-medium text-xl">{myjobpostactions ? myjobpostactions.length : 0}</div> */}
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"tabs"} style={{ flexGrow: 1 }} onClick={e => dispatch(setacceptedcandidateactivetab("contract"))}>

                    <div className={globaldata.acceptedcandidateactivetab == "contract" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">Direct Contractors</span>
                                <div className="text-900 font-medium text-xl">{Contractselectedcandidatesdata ? Contractselectedcandidatesdata.length : 0}</div>
                                {/* <div className="text-900 font-medium text-xl">{mycandidateactions ? mycandidateactions.length : 0}</div> */}
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"tabs"} style={{ flexGrow: 1 }} onClick={e => dispatch(setacceptedcandidateactivetab("Intern"))}>

                    <div className={globaldata.acceptedcandidateactivetab == "Intern" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">Internship Candidates</span>
                                <div className="text-900 font-medium text-xl">{Internselectedcandidatesdata ? Internselectedcandidatesdata.length : 0}</div>
                                {/* <div className="text-900 font-medium text-xl">{mycandidateactions ? mycandidateactions.length : 0}</div> */}
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                <br />
            {/* <Card> */}



                <div className="card mb-0">
                    {/* <div className="flex justify-content-between"> */}
                        {globaldata.acceptedcandidateactivetab == "Full-Time" && <div style={{ width: "100%" }}> <Fulltimeacceptedcantable />    </div>}
                        {globaldata.acceptedcandidateactivetab == "contract" && <div style={{ width: "100%" }}><Contractacceptedcantable /></div>}
                        {globaldata.acceptedcandidateactivetab == "Intern" && <div style={{ width: "100%" }}><Internacceptedcantable /></div>}

                        {/* <div hidden={true}>d</div> */}


                    {/* </div> */}
                </div>

            {/* </Card> */}





        </div>
    )
}

export default Acceptedcandidates
