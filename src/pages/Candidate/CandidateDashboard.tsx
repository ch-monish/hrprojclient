import React, { useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { downloadresume } from '../../features/Downloadpdfs/pdfslice';
import { useDispatch } from 'react-redux';
import { candidateinfogetaction, documentdownloadaction } from '../../features/Candidate info/candidateinfoslice';
import { TabView, TabPanel } from 'primereact/tabview';
import { getuserroles } from '../../features/Login/LoginSelector';
function CandidateDashboard(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
  const logindata = useSelector((state: RootState) => state.Login)
  const noofdaysremaining = (value) => {
    var dt = new Date(value)
    var dnow = new Date()
    return (dt.getTime()<dnow.getTime())?  "--":(Math.ceil(Math.abs(dnow.valueOf() - dt.valueOf()) / (1000 * 60 * 60 * 24)))
  }
  const roles = props.getuserrolesprop;
  const location = useLocation();
  const candidateusername = location.state;

  useEffect(() => {
    console.log(candidateusername)
    dispatch(candidateinfogetaction(
      {

        "username": candidateusername ? candidateusername : logindata.username


      }
    ))

  }, [])

  return (
    <div style={{ backgroundImage: "url('https://belcan.sharepoint.com/Presentations/Approved%20Stock%20Imagery/Forms/Thumbnails.aspx#')" }}>

      <div className="grid">
        <div className="md:col-3">
          <Card title="Date of Joining"
            style={{
              marginBottom: '1em', textAlign: "center", color: "black",
              background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
              boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
              borderradius: "6px"
            }}  >
            <p className="m-0" style={{ font: "bold", textAlign: "center", fontSize: "1.5rem", lineHeight: '2' }}>{candidateinfodata.dojformated}</p>
          </Card>
        </div>
        <div className="md:col-3">
          <Card title="Reporting Time"
            style={{
              marginBottom: '1em', textAlign: "center", color: "black",
              background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
              boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
              borderradius: "6px"
            }}  >

            <p className="m-0" style={{ font: "bold", textAlign: "center", fontSize: "1.5rem", lineHeight: '2' }}>09:00 AM</p>
          </Card>
        </div>
        <div className="md:col-3">
          <Card title="Days Remaining"
            style={{
              marginBottom: '1em', textAlign: "center", color: "black",
              background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
              boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
              borderradius: "6px"
            }}  >

            <p className="m-0" style={{ font: "bold", textAlign: "center", fontSize: "1.5rem", lineHeight: '2' }}>{noofdaysremaining(candidateinfodata.DateOfJoining)}</p>
          </Card>

        </div>
        <div className='md:col-3'>
          <Card title="Downloads"
            style={{
              marginBottom: '1em', textAlign: "center", color: "black",
              background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
              boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
              borderradius: "6px"
            }}  >
            <div className="m-0" style={{ font: "bold", fontSize: "1.3rem" }}>

              <a style={{ cursor: "pointer", textDecoration: "underline" }} className="mr-4" onClick={(e) => {

                dispatch(documentdownloadaction(
                  {
                    'file': candidateinfodata.OfferLetter.toString().substring(1, candidateinfodata.OfferLetter.length).replace("docx", "pdf")
                  }
                ))
              }}  > Offer Letter
                {/* {
                  candidateinfodata.OfferLetter.toString().split("/")[candidateinfodata.OfferLetter.toString().split("/").length - 1].replace("docx","pdf")
                }  */}
              </a>
              <span></span>
            </div>
            <div style={{ font: "bold", fontSize: "1.3rem" }}>
              {candidateinfodata.JoiningBonusLetter &&

                <a style={{ cursor: "pointer", textDecoration: "underline" }} onClick={(e) => {

                  dispatch(documentdownloadaction(
                    {
                      'file': candidateinfodata.JoiningBonusLetter.toString().substring(1, candidateinfodata.JoiningBonusLetter.length).replace("docx", "pdf")
                    }
                  ))
                }}  >    Joining Bonus Letter
                  {/* {
                  candidateinfodata.JoiningBonusLetter.toString().split("/")[candidateinfodata.JoiningBonusLetter.toString().split("/").length - 1].replace("docx","pdf")
                }  */}
                </a>
              }
            </div>

          </Card>
        </div>
      </div>


      <div className="grid d-flex  flex-row">

        {((candidateinfodata.VerificationStatus != "pending" && candidateinfodata.VerificationStatus != "verified") || (roles.includes("HR"))) &&
          <div className="md:col-4">
            <Card title={<div>Manage Personal Details  {roles.includes("HR")&& <label className='ml-4' style={{fontSize:"14px",color:"blue",fontWeight:'lighter'}}>{ candidateinfodata.VerificationStatus}</label>}</div>}
              style={{
                textAlign: "center", color: "black",
                background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
                boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
                borderradius: "6px"
              }}  >
                {/* {roles.includes("HR")&& <label>{ candidateinfodata.VerificationStatus}</label>} */}
              <Link to={'/candidateinfo'}>
                <div className="flex row" style={{ textDecoration: "underline", font: "bold", textAlign: "center", fontSize: "1.2rem" }} >
                  <div className="flex align-items-center justify-content-center bg-blue-100 border-round mb-3 mr-2" style={{ width: "2.5rem", height: "2.5rem" }}>

                    <i className="pi pi-user-edit text-blue-500 text-xl"> </i>

                  </div>
                  <div  className="mt-2 mr-2">
                    Personal Details and Documents
                  </div>
                </div>

              </Link>

            </Card>
          </div>
        }



        {candidateinfodata.BGVStatus != null &&
          <div className="md:col-4">
            <Card title="BGV Status"
              style={{
                marginBottom: '2em', textAlign: "center", color: "black",
                background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
                boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
                borderradius: "6px"
              }}  >
              <p className="m-0" style={{ font: "bold", textAlign: "center", fontSize: "1.5rem", lineHeight: '2' }}>{candidateinfodata.BGVStatus}</p>
            </Card>
          </div>
        }
        {candidateinfodata.Medicalteststatus != null &&
          <div className="md:col-4">
            <Card title="Medical & Drug Test Status"
              style={{
                marginBottom: '2em', textAlign: "center", color: "black",
                background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
                boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
                borderradius: "6px"
              }}  >
              <p className="m-0" style={{ font: "bold", textAlign: "center", fontSize: "1.5rem", lineHeight: '2' }}>{candidateinfodata.Medicalteststatus}</p>
            </Card>
          </div>
        }

        {candidateinfodata.IsJoined == true &&
          <div className="md:col-4">
            <Card title="Manage On-borading Information"
              style={{
                marginBottom: '2em', textAlign: "center", color: "black",
                background: "linear-gradient(90deg, #cff5f3 0%, #ffffff 50%, #d6f9f6 100%)",
                boxshadow: "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
                borderradius: "6px"
              }}  >
                <div className="flex row" style={{ textDecoration: "underline", font: "bold", textAlign: "center", fontSize: "1.2rem" }}>
                <div  className="mt-2 mr-4">
                <Link to={'/BankDetails'}><i className="pi pi-pencil"> </i> Bank Details</Link>
                  </div>
                  <div  className="mt-2 mr-2">
                  {/* <Link to={'/candidateinsurance'}><i className="pi pi-pencil"> </i> Insurance Details</Link> */}
                  <Link to={'/PFDetails'}><i className="pi pi-pencil"> </i> PF Details</Link>
                  </div>
                  </div>
              {/* <Link to={'/BankDetails'}><i className="pi pi-pencil"> </i> Bank Detials</Link><br /><br />
              <Link to={'/candidateinsurance'}><i className="pi pi-pencil"> </i> Insurance Detials</Link><br /><br />
              <Link to={'/PFDetails'}><i className="pi pi-pencil"> </i> PF Detials</Link><br /><br /> */}
              {/* <div className="flex row" style={{ textDecoration: "underline", font: "bold", textAlign: "center", fontSize: "1.2rem" }}>
              <div  className="mt-2 mr-2">
              <Link to={'/PFDetails'}><i className="pi pi-pencil"> </i> PF Details</Link>
                  </div>
              </div> */}

            </Card>
          </div>
        }
      </div>



    </div>

  )
}

function mapStateToProps(state) {
  return {
    getuserrolesprop: getuserroles(state)
  };
}
export default connect(mapStateToProps)(CandidateDashboard)
