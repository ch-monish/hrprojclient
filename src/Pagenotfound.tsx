import React, { useEffect } from 'react'

function Pagenotfound() {
  useEffect(()=>{
    console.log("rendering")
  },[])
  return (
    <div>

<h1 style={{color:"white"}}>

       You do not have access to this page
</h1>
        {/* <img src="./dashboard/jobpostsactionApproval/assets/images/arya-blue.png"/> */}
        {/* <img src="assets/layout/images/themes/md-dark-deeppurple.svg"/> */}
    </div>
  )
}

export default Pagenotfound