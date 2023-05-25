import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import { IBandoptions } from '../Band/Bandslice';
import { IServiceLineoptions } from './ServiceLineSlice';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getservieline=(state)=>state.serviceline
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactiveservicelineoptions=createSelector(
    [getservieline],
    (serviceline) => { 
   var temp:any[]  =[]
   serviceline.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.ServiceLineId,
        label:e.ServiceLineName,
        value:e.ServiceLineName,
        businessunitid:e.BusinessUnitId,
        companyid:e.CompanyId
    
        })
    }
   })
// console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallservielineoptions=createSelector(
    getservieline,
    (serviceline) => { 
        var temp:IServiceLineoptions[]  =[]
        serviceline.forEach((e)=>{
       
             temp.push({
                 
             key:e.BandId,
             label:e.BandName,
             value:e.BandId
         
             })
         
        })
     
             
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )