import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import IOptions from '../../models/Ioptions';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getcustomer=(state)=>state.customer
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactivecustomeroptions=createSelector(
    [getcustomer],
    (customer) => { 
   var temp:IOptions[]  =[]
   customer.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.CustomerId,
        label:e.CustomerName,
        value:e.CustomerId
    
        })
    }
   })
// console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallcustomer=createSelector(
    getcustomer,
    (customer) => { 
        var temp:IOptions[]  =[]
        customer.forEach((e)=>{
       
             temp.push({
                 
              key:e.CustomerId,
              label:e.CustomerName,
              value:e.CustomerId
             })
         
        })
     
             
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )