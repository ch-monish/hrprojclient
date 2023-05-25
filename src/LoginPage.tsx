import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
// import backgroundImage from "../src/assets/demo/images/belcan_logo.png";
import belcanlogo from "../src/assets/demo/images/belcan_logo.png";
import backgroundImage from "../src/assets/demo/images/recruitmentboard.png";
import interviewImage from "../src/assets/demo/images/interview3.png";
import backgroundImage1 from "../src/assets/demo/images/3.jpg";
import { useEffect } from "react";
import { AppConfig } from "./AppConfig";
import { ILogin, loginaction } from "./features/Login/Loginslice";
import { connect, useDispatch, useSelector } from "react-redux";
import "../src/assets/layout/sass/App.scss";
import { RootState } from "./app/store";
import ErrorMessage from "../src/components/form/ErrorMessage";
import { useNavigate } from "react-router";
import { Message } from "primereact/message";
import { candidateinfogetaction } from "./features/Candidate info/candidateinfoslice";
import { personaldetailsaction } from "./features/Candidate info/personaldetailsslice";
import axios from "axios";
import { setdashboardactivetab } from "./features/Misc/globalslice";
import { Button } from "primereact/button";

function LoginPage() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo);

    const [hidep, sethidep] = useState(true);
    const dispatch = useDispatch();
    const Logindata: ILogin = useSelector((state: RootState) => state.Login);

    const setAuthToken = (token) => {
        if (token != "") {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else delete axios.defaults.headers.common["Authorization"];
    };
    const navigate = useNavigate();

    localStorage.removeItem("persist:key");
    // useEffect(()=>{

    //     console.log("login page")
    //     console.log(Logindata.groups)
    //     var w:any=[]
    //     Logindata.groups != undefined?Logindata.groups.forEach((i)=>w.push(i["name"].toString())):console.log("")
    //     if (w.includes("Candidate")){
    //        dispatch(candidateinfogetaction({

    //             "email": Logindata.email

    //         }))

    //     }
    //     else if (Logindata.username!="") {
    //         navigate("/dashboard")
    //     }
    // },[Logindata.username])

    // useEffect(()=>{

    // setTimeout(()=>{

    // // navigate("login")
    // console.log(candidateinfodata.VerificationStatus)
    // if(candidateinfodata.VerificationStatus !="verified")
    //     navigate("/candidateinfo")
    // else
    //     navigate("/candidatedashboard")
    // }
    // ,1000)

    // },[candidateinfodata.VerificationStatus])

    useEffect(() => {
        dispatch(setdashboardactivetab(""));
        localStorage.removeItem("persist:key");
        console.log("login page");
        var w: any = [];
        Logindata.groups != undefined ? Logindata.groups.forEach((i) => w.push(i["name"].toString())) : console.log("");
        var accesstoken = Logindata.accesstoken != "" ? Logindata.accesstoken : "";

        localStorage.setItem("token", accesstoken)
        setAuthToken(accesstoken)
        if (w.includes("Candidate")){
           dispatch(candidateinfogetaction({

                "username": Logindata.username


            }))
setTimeout(()=>{

    // navigate("login")
    console.log(candidateinfodata.VerificationStatus)
    if(candidateinfodata.VerificationStatus !="verified" && candidateinfodata.VerificationStatus !="pending")
        navigate("/candidateinfo")
    else
        navigate("/candidatedashboard")
}
,1000)
        }
        else if (Logindata.username != "") {

                  navigate("/dashboard");

                }
    }, [Logindata.username, candidateinfodata.VerificationStatus]);
    async function handlesubmit() {
        console.log(username);
        console.log(password);

        await dispatch(loginaction({ User_name: username, password }));

    }
    // useEffect(()=>{
    //     // alert("login page")
    //     if( Logindata.username!="")
    //     history.push("/dashboard")},[Logindata.username])
    return (
        <div className="login-body">
            <style>
                {`
                .login-form{
                    margin-top:10%;
                    background: rgba(238,238,245,0.77);
                    border-radius: 20px;
                    // position:absolute;
                    // bottom:200px;
                    height:360px;
                }
                .login-body{
                    display:flex;
                }

.loginsidepane{
    background: white;
    width:30vw;
    height:100vh;

}
.imagepane{
    background: linear-gradient(117deg, rgba(22,234,180) 0%, #416acf 100%);
  background-blend;
width:100vw;
height:100vh;
}
.navimage{
    margin-top:30px;
    margin-left:20px;
    right:20px;
width:90%;
    height:70px;

}
.belcanimgcontainer{
    height:50px;
}
.interviewimgcontainer{
width:90%;
}
.login-form{
    // position:absolute;
    // right:60px;
    padding:20px;
}
h2{
    color:##5f5f5f;

}
                `}
            </style>
            {/* <div className="login-wrapper">
                <div className="login-panel">
                    <img src={backgroundImage} alt="Belcan" />
                    <div className="login-form">
                        <h2>Welcome, please use the Credientials to sign-in</h2>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"></i>
                                <input id="email" name="email" className="p-inputtext p-component" value={username} onChange={(e) => setusername(e.target.value)} />
                                <label className="">Email*</label>
                            </span>
                        </div>
                        <div style={{ height: "20px" }}></div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-eye" style={{ cursor: "pointer" }} onClick={(e) => sethidep(!hidep)}></i>
                                <input type={!hidep ? "text" : "password"} name="password" className="p-inputtext p-component" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <label className="">Password*</label>
                            </span>
                        </div>


                        <h4>{Logindata.error ? <Message severity="error" text={Logindata.error.toString()} /> : <></>}</h4>

                        <button aria-label="Submit" type="submit" onClick={(e) => handlesubmit()} className="p-button p-component">
                            <span className="p-button-label p-c">Submit</span>
                            <span role="presentation" className="p-ink"></span>
                        </button>
                    </div>
                </div>

                <div className="login-image">
                    <img style={{ width: "100%", height: "100%" }} src={backgroundImage1} alt="Belcan" />
                </div>
            </div> */}

            {/* <div className="loginsidepane"></div> */}
            <div className="imagepane grid" style={{ display: "flex" }}>
                <div className="imagecontainer col-9 md:col-7 sm:col-7" >
                    <div className="navimage">
                        <img src={belcanlogo} className="belcanimgcontainer"></img>
                    </div>
                    <img src={interviewImage} className="interviewimgcontainer"></img>
                </div>

                {/* <h2>HR Portal</h2> */}
                <div className="login-form col-3 md:col-4 sm:col-5">
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ color: "#5f5f5f" }}>HR Portal</h1>
                    </div>
                    <h2 style={{ textAlign: "center" }}>Please use the credentials to sign-in</h2>

                    <div className="field">
                        <span className=" p-input-icon-right">
                            <i style={{ fontSize: 18 }} className="pi pi-user mt-1"></i>
                            <label className="mb-2" style={{ fontSize: 16 }}>
                                User Name*
                            </label>
                            <br />
                            <InputText id="email" name="email" className="p-inputtext p-component p-inputtext-lg block mt-2" value={username} onChange={(e) => setusername(e.target.value)} />
                        </span>
                    </div>
                    <div style={{ height: "20px" }}></div>
                    <div className="field">
                        <span className="p-input-icon-right">
                            <i className="pi pi-eye mt-1" style={{ cursor: "pointer", fontSize: 18 }} onClick={(e) => sethidep(!hidep)}></i>
                            <label className="mb:2" style={{ fontSize: 16 }}>
                                Password*
                            </label>
                            <br />
                            <InputText type={!hidep ? "text" : "password"} name="password" className=" p-inputtext-lg block p-inputtext p-component mt-2" value={password} onChange={(e) => setpassword(e.target.value)} />
                        </span>
                    </div>

                    <h4 style={{textAlign:"center"}}>{Logindata.error ? <Message severity="error" text={Logindata.error.toString()} /> : <></>}</h4>
                    <div style={{ textAlign: "center" }}>
                        <Button disabled={!(username!="" && password!="")} aria-label="Submit" type="submit" onClick={(e) => handlesubmit()} className="p-button-lg p-component">
                            <span className="p-button-label p-c">Log in</span>
                            <span role="presentation" className="p-ink"></span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// LoginPage.getLayout = function getLayout(page) {
//     return (
//         <React.Fragment>
//             {page}
//             <AppConfig simple />
//         </React.Fragment>
//     );
// };
export default LoginPage;
