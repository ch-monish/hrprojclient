import React from 'react'
import { Card } from 'primereact/card'

function Acknowledgementpage() {
  return (
    <div>

        {/* Acknowledgement */}
        <br />
        {/* <img className="image-1"> */}
{/* </img> */}
        <Card subTitle={()=>{return (<div style={{textAlign:"center"}}><h3>💼Thank you for submitting your details and response has been Recorded </h3></div>)}}>
          

        </Card>



    </div>
  )
}

export default Acknowledgementpage