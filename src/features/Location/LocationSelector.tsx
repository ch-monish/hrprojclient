import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import IOptions from '../../models/Ioptions';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getLocationdata=(state)=>state.Location
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactiveLocationoptions=createSelector(
    [getLocationdata],
    (location) => { 
   var temp:IOptions[]  =[]
   location.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.LocationId,
        label:e.LocationName,
        value:e.LocationId
    
        })
    }
   })
// console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallLocations=createSelector(
   getLocationdata,
    (location) => { 
        var temp:IOptions[]  =[]
        location.forEach((e)=>{
       
             temp.push({
                 
              key:e.LocationId,
              label:e.LocationName,
              value:e.LocationId
             })
         
        })
     
             
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )