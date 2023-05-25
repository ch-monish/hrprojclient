import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Navigate } from "react-router";
import { store } from "../../app/store";
export interface ILogin {
    username: string;
    first_name: string;
    last_name: boolean;
    email: string,
    groups: any,
    accesstoken :string,
    error:string
}
const initialState: ILogin = {
    username: "",
    first_name: "",
    last_name: false,
    email: "",
    groups: undefined,
    accesstoken :"",
    error:""
};


export const LoginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        setlogindetails: (state, payload: any) => {
            var temp = payload.payload
            // history.push('dashboard');
            // window.location.href='dashboard'
            // Navigate({to:'dashboard'})
            // window.location.hash("#/dashboard")
            // window.history.pushState({}, "null", '#/dashboard')
            state = temp
            if (state.username != null && state.username != "") {
                // alert(state.username)
            }
            console.log(state)
            return state;
        },

        logout: (state) => {
            console.log("logging out")
            localStorage.clear()
            localStorage.removeItem("persist:key")
            localStorage.removeItem("token")
            // store.dispatch(empty)
            window.location.href = '/HRWorkflowPortal/Login'
            state ={
                username: "",
                first_name: "",
                last_name: false,
                email: "",
                groups: undefined,
                accesstoken :"",
                error:""
            }
            return state


            //
        },
        sessionlogout: (state) => {
            console.log("logging out")
            localStorage.clear()
            // store.dispatch(empty)
            window.location.href = '/HRWorkflowPortal/Login'
            state ={
                username: "",
                first_name: "",
                last_name: false,
                email: "",
                groups: undefined,
                accesstoken :"",
                error:"Session Expired Please login again"
            }
            return state


            //
        },

        setloginerror:(state,payload:PayloadAction<any>)=>{
            console.log(payload.payload.data)
            // var temp=payload.payload
// state.error=payload.payload.data.toString()
var temp=state
temp.error=payload.payload.data
state=temp
return state;
        },


        //functions for sagas watching
        loginaction: (state, payload: PayloadAction<any>) => {
            // console.log(state)
        },


    },
});
export const { loginaction, setlogindetails, logout,sessionlogout } = LoginSlice.actions
export default LoginSlice.reducer
