import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { Button } from 'primereact/button'
import { operationalmailsgetaction, operationalmailssendaction } from '../../features/Operationalmails/Operationalmailsslice'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { selectedcandidatesaction } from '../../features/CandidateActions/selectedcandidatesslice'
import { getuserroles } from '../../features/Login/LoginSelector'
import { fulltimeselcandidatesgetaction } from '../../features/Acceptedcandidates/fulltimeselectedcanslice'
import { contractselcandidatesgetaction } from '../../features/Acceptedcandidates/contractselectedcanslice'
import { internselcandidatesgetaction } from '../../features/Acceptedcandidates/internselectedcanslice'
import { getbgvvendorsaction } from '../../features/Bgvvendors/Bgvvendorsslice'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';
import { getbgvoptions } from '../../features/Bgvvendors/BgvvendorsSelector'


function Candidateoperationsflow(props) {
  const {cancode}=useParams()
  const userdata=props.getuserrolesprop
  const [bgvselop,setBgvselop]=useState("")
  const [refresh,setRefresh]=useState(false)
  // console.log(cancode)
  const dispatch = useDispatch()
  // const candidateinfodata = useSelector((store: RootState) => store.candidateinfo)

  const operationalmailsdata = useSelector((store: RootState) => store.operationalmails)
  const fulltimeselcandidatesdata=useSelector((state:RootState)=>state.Fulltimeselcandidates)
  const contractselectedcandidatesdata=useSelector((state:RootState)=>state.Contractselectedcandidates)
  const internselectedcandidatesdata=useSelector((state:RootState)=>state.Internselectedcandidates)
  const Bgvvendorsdata=useSelector((state:RootState)=>state.Bgvvendors)
  const  [curcandata,setcurcandata]=useState<any>({})
  const navigate=useNavigate()
  // console.log(curcandata)
  useEffect(() => {
    // dispatch(selectedcandidatesaction({

    //   "RoleName": userdata.roles,

    //   "username": userdata.username

    // }))
    dispatch(fulltimeselcandidatesgetaction())
    dispatch(contractselcandidatesgetaction())
    dispatch(internselcandidatesgetaction())

    console.log(operationalmailsdata)
    var combieddata=[...fulltimeselcandidatesdata ,...contractselectedcandidatesdata,...internselectedcandidatesdata]
    console.log(combieddata)
    // curcandata=combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0]
    setcurcandata(combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0])
    console.log(curcandata)
  }, [refresh])
  useEffect(()=>{
    var combieddata=[...fulltimeselcandidatesdata ,...contractselectedcandidatesdata,...internselectedcandidatesdata]
    console.log(combieddata)
    setcurcandata(combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0])

  },[fulltimeselcandidatesdata,contractselectedcandidatesdata,internselectedcandidatesdata])
  useEffect(()=>{
    dispatch(getbgvvendorsaction())
    console.log(curcandata)
    console.log(Bgvvendorsdata)
if(!Object.is(curcandata?.Selected_Candidate_ID,undefined)){
    dispatch(operationalmailsgetaction({
        "selectedcandidateid": curcandata?.Selected_Candidate_ID

    }))
}

  },[curcandata,fulltimeselcandidatesdata,contractselectedcandidatesdata,internselectedcandidatesdata])
const getupdateddata=()=>{
    dispatch(fulltimeselcandidatesgetaction())
    dispatch(contractselcandidatesgetaction())
    dispatch(internselcandidatesgetaction())

    console.log(operationalmailsdata)
    var combieddata=[...fulltimeselcandidatesdata ,...contractselectedcandidatesdata,...internselectedcandidatesdata]
    console.log(combieddata)
    // curcandata=combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0]
    setcurcandata(combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0])
}




  const shouldbuttonvisible = (r) => {
    // console.log(r)
    console.log(curcandata)
    var disabled = true
    if (r.mailsent == false) {

      disabled = false
    }
    if (r.mailsent == true) {
      return true
    }

    else {
      // console.log("" + r.mailcategory)
      if (r.mailcategory == "BGV") {
        console.log(bgvselop)

        if ( bgvselop!="") {
          return false
        }
        else
          return true
      }
      if (r.mailcategory == "Account Creation") {
        console.log(curcandata.BGVStatus)

        if ( (curcandata.BGVStatus == "In Process" || curcandata.BGVStatus == "Completed")&&(!Object.is(curcandata.Reportingmanager,null)) && (curcandata.Medicalteststatus == "In Process" || curcandata.Medicalteststatus == "Completed")) {
          return false
        }
        else
          return true
      }
      if (r.mailcategory == "IT") {

        if ( !Object.is(curcandata.EmployeeID, null)&& !Object.is(curcandata.HRCID, null)&& !Object.is(curcandata.OfficialMailId, null)&& !Object.is(curcandata.OfficialMailId, "")           ) {

          return false
        }
        else
        return true

      }
      if (r.mailcategory == "Admin") {

        if ( !Object.is(curcandata.EmployeeID, null)&& !Object.is(curcandata.HRCID, null) && !Object.is(curcandata.OfficialMailId, null)&& !Object.is(curcandata.OfficialMailId, "")            ) {

          return false
        }
        else
        return true

      }
      if (r.mailcategory == "Insurance") {

        if ( !Object.is(curcandata.EmployeeID, null)&& !Object.is(curcandata.HRCID, null)&&curcandata.IsJoined==true        ) {

          return false
        }
        else
        return true

      }
      if (r.mailcategory == "Welcome Mail") {

        if ( !Object.is(curcandata.EmployeeID, null)&& !Object.is(curcandata.HRCID, null)&&curcandata.IsJoined==true&& !Object.is(curcandata.Brief_Description, null)&& !Object.is(curcandata.Brief_Description, "")         ) {

          return false
        }
        else
        return true

      }


    }
    return disabled
  }
  const sendmailactionstemplate = (rowdata) => {
      let tempid=rowdata.id
    return (
      <div>


        <Button
          tooltip={"send "+rowdata.mailcategory +" Mail"}
          disabled={shouldbuttonvisible(rowdata)}
          icon="pi pi-send"
          className="p-button-rounded p-button-success"
          // disabled = {data.IsOfferAccepted}
          onClick={(e) => {
            console.log("into click")
            console.log(tempid)
            confirmDialog({

              message: 'Are you sure you want to proceed?',
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',

              accept: () => {
                if(operationalmailsdata.filter((i)=>i.mailcategory=="BGV")[0].id==tempid){
                    dispatch(operationalmailssendaction(
                        {
                          'id': operationalmailsdata.filter((i)=>i.mailcategory=="BGV")[0].id,
                          "Bgvvendor":bgvselop
                        }
                      ))
                    //   getupdateddata()
                    //   var combieddata=[...fulltimeselcandidatesdata ,...contractselectedcandidatesdata,...internselectedcandidatesdata]
                    //   console.log(combieddata)
                    //   setcurcandata(combieddata.filter(i=>(i.candidate.CandidateCode   ==cancode))[0])

                }
                else{

                    dispatch(operationalmailssendaction(
                        {
                            'id': rowdata.id
                        }
                        ))
                    }
setTimeout(()=>{

    setRefresh(!refresh)
},2000 )

              ////shoud this be removed because reducer is called in saga which returns updated response
            //   setTimeout(()=>{



            //     dispatch(operationalmailsgetaction({
            //       "selectedcandidateid": curcandata.Selected_Candidate_ID

            //     }))
            //   },3000)
            },
              reject: () => console.log()
            });

          }}
        />
      </div>
    )
  }

  const mailsenttemplate = (rowdata) =>{
    if (rowdata.mailsent == true)
      return ( <div> Yes </div>);
    else
      return ( <div> No </div>);
    // rowdata.mailsent == true? <div> Yes </div>:<div> Yes </div>
  }

  const datetemplate = (rowdata: any) => {

    return <>{rowdata.mailsentat?formatDate(new Date(rowdata.mailsentat)):""}</>;


}
const formatDate = (value: any) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    // return value.toLocaleDateString('en-US');
}
const gettooltipformailcategory=(d)=>{


    if(d=="Account Creation"){

        return "Enables onces BGV and medical test are under process or completed and reporting Manager is Assigned"
    }
    if(d=="IT"){

        return "Enables onces Employee ID, HRC ID and Official MailId are updated"
    }
    if(d=="Admin"){

        return "Enables onces Employee ID, HRC ID and Official MailId are updated"
    }
    if(d=="Insurance"){

        return "Enables once candidate joining information is updated"
    }
    if(d=="Welcome Mail"){

        return "Enables once candidate joining information is updated"
    }
}
const mailcategorybody=(rowdata)=>{
    if(rowdata.mailcategory=="BGV")
    return(
    <div>

{!operationalmailsdata.filter((i)=>i.mailcategory=="BGV")[0].mailsent&&<Dropdown className="mr-2" options={props.getbgvoptionsprop} value={bgvselop} placeholder='Select Vendor'  onChange={e=>setBgvselop(e.value)}></Dropdown>}
        {rowdata.mailcategory}</div>
    )
    else
    return(
       <div >

            {rowdata.mailcategory}

             {!(rowdata.mailcategory.includes("BGV")||rowdata.mailcategory.includes("Medical Test"))&& <i className="custom-target-label pi pi-info-circle p-text-secondary p-overlay-badge ml-2" data-pr-tooltip={gettooltipformailcategory(rowdata.mailcategory)} data-pr-position="right" style={{ cursor: 'pointer',borderRadius:"8px",background:"skyblue",padding:"4px" }}>




                </i>}

          </div>
        // <div >
        //     {rowdata.mailcategory}
        //        {!(rowdata.mailcategory.includes("BGV")||rowdata.mailcategory.includes("Medical Test"))&& <i className="custom-target-icon pi pi-info-circle p-text-secondary p-overlay-badge" data-pr-tooltip={gettooltipformailcategory(rowdata.mailcategory)} data-pr-position="right"  style={{  cursor: 'pointer',borderRadius:"20px",background:"sky-blue",padding:"10px" }}>

        //             </i>}
        // </div>
    )
}
const rowClass = (data) => {
    return {
        'datatablerowcolorred': data.mailcategory === 'BGV'
    }

}
  return (
    <div>
        <style>
        {`

.datatable-style-demo .datatablerowcolorred{
            background: red;
            background-color:red
        }


        `

        }

        </style>

      <ConfirmDialog />
      <Tooltip target=".custom-target-icon" />
      <Tooltip target=".custom-target-label" />

<div className='datatable-style-demo '>
<Card  title="Emails Workflow">

      <DataTable value={operationalmailsdata} rowClassName={rowClass} showGridlines={false}>
        <Column field="mailcategory" header="Operations" body={mailcategorybody} ></Column>
        <Column field="mailsent" header="Email Sent" body={mailsenttemplate}></Column>
        <Column field="mailssentto" header="Email Sent To"></Column>
        <Column field="mailsentat" body={datetemplate} header="Email Sent Date"></Column>
        <Column field="send Mail" header="Action" body={sendmailactionstemplate}></Column>


      </DataTable>
      <div className="mt-3 mr-5" style={{width:"100%",textAlign:"end"}}>
        <Button onClick={e=>navigate(-1)}>
            Cancel
        </Button>
      </div>
</Card>

</div>


    </div>
  )
}
function mapStateToProps(state) {
  return {
      getuserrolesprop: getuserroles(state),
      getbgvoptionsprop:getbgvoptions(state)
    };
  }
export default connect(mapStateToProps)(Candidateoperationsflow)

