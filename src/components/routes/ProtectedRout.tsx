// import * as React from 'react';
// import {
//     Route,
//     Redirect,
//     RouteProps,
//     RouteComponentProps
// } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {
//     isAuthenticated: boolean;
// }

// export class PrivateRoute extends Route<PrivateRouteProps> {
//     render() {
//         return (
//             <Route render={(props: RouteComponentProps) => {
//                 if(!this.props.isAuthenticated) {
//                     return <Redirect to='/' />
//                 }

//                 if(this.props.component) {
//                     return React.createElement(this.props.component);
//                 }

//                 if(this.props.render) {
//                     return this.props.render(props);
//                 }
//             }} />
//         );
//     }
// }


// import React from "react";
// import { Route,Navigate, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated,component: Component, ...rest }) => {
//   //converts object to boolean ->false if null else true//
// //   const isAuthenticated = !!localStorage.getItem("token");
// //   const isAuthenticated = true;
//   const navigate = useNavigate();

//   if(!isAuthenticated) {
//     navigate("/login");
//   }

//   return (
//      <Route
//     path="*"
//     element={
//       isAuthenticated ? (
//         <Navigate to="/dashboard" />
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />
//   );
// };

// export default React.memo(ProtectedRoute);
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getuserroles } from "../../features/Login/LoginSelector";
interface Propofprotectedroute{
    isAllowed:boolean,
  redirectPath :String,
  children:any,
  prop:any
}
var propinitialstate:Propofprotectedroute={
    isAllowed:false,
    redirectPath : '/pagenotfound',
    children:null,
    prop: undefined
}
const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/pagenotfound',
    children,
  }) => {
    // var temproles=propinitialstate.getrolesprop.includes("Administrator")
useEffect(()=>{
  console.log(isAllowed)
//   temproles=propinitialstate.getrolesprop.includes("Administrator")
},[])

//   if (temproles.includes("Administrator") ){
//       return <Navigate to={propinitialstate.redirectPath} replace />;
//     }
    // if (!propinitialstate.isAllowed ||propinitialstate.getrolesprop.includes("Administrator")){
    if (!isAllowed ){
      console.log(propinitialstate)
    return <Navigate to={redirectPath}  />;
  }
else
    return children ?children : <Outlet />;
//   return propinitialstate.children ? propinitialstate.children : <Outlet />;
};
// function mapStateToProps(state) {
//     return {
//         getrolesprop: getuserroles(state),


//     };
// }
// export default connect(mapStateToProps)(ProtectedRoute);
export default ProtectedRoute
