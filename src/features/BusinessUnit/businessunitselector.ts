import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import { IBandoptions } from '../Band/Bandslice';
import IOptions from '../../models/Ioptions';
import { getusersbyroles } from '../JobPostActions/usersbyrolesselector';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getbusinessunit=(state)=>state.businessunit
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactivebusinessunitoptions=createSelector(
    [getbusinessunit],
    (businessunit) => { 
   var temp:any[]  =[]
   businessunit.forEach((e)=>{
    // console.log(e)
    if(e.Active==true){
        temp.push({
            
        key:e.BusinessUnitId,
        label:e.BusinessUnitName,
        value:e.BusinessUnitId,
        companyid:e.CompanyId
    
        })
    }
   })
// console.log(temp)
        // console.log(temp)
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  
export const getactivebusinessunitoptionsfilterbycustomer=(s:string)=>createSelector(
  [getbusinessunit],
  (businessunit) => { 
 var temp:IOptions[]  =[]
 businessunit.forEach((e)=>{
  // console.log(e)
  if(e.Active==true){
      temp.push({
          
      key:e.BusinessUnitId,
      label:e.BusinessUnitName,
      value:e.BusinessUnitName
  
      })
  }
 })
// console.log(temp)
      // console.log(temp)
      return temp
// return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
  }
)
  export const getallbusinessunitoptions=createSelector(
    getbusinessunit,
    (businessunit) => { 
        var temp:IOptions[]  =[]
        businessunit.forEach((e)=>{
       
             temp.push({
                 
             key:e.BusinessUnitId,
             label:e.BusinessUnitName,
             value:e.BusinessUnitId
         
             })
         
        })
     
            //  console.log(temp)
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )

  export const getHRRoleUsers = createSelector(
    [getusersbyroles],
    (usersbyroles) => {
        var temp: any[] = []
        usersbyroles.forEach(element => {
            if (element.RoleName == "HR") {
                temp.push({
                    key: element.UserName,
                    label: element.FullName,
                    value: element.UserName,

                })
            }

        })
        console.log(temp)
        return temp;
    }
)