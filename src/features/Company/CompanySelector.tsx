import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import { ICompanyoptions } from './companyslice';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getcompanydata=(state)=>state.company
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactivecompanyoptions=createSelector(
    [getcompanydata],
    (company) => { 
   var temp:ICompanyoptions[]  =[]
  //  console.clear()
   company.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.CompanyId,
        label:e.CompanyName,
        value:e.CompanyId
    
        })
    }
   })
console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallcompanyoptions=createSelector(
    getcompanydata,
    (company) => { 
        var temp:ICompanyoptions[]  =[]
        company.forEach((e)=>{
      //  console.log(e)
             temp.push({
                 
                     
        key:e.CompanyId,
        label:e.CompanyName,
        value:e.CompanyId
         
             })
         
        })
     
            //  console.log(temp)
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )