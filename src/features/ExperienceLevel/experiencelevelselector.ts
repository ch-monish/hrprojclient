import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import { IExperienceLeveloptions } from './experiencelevelslice';
import { IBandoptions } from '../Band/Bandslice';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getexperiencelevel=(state)=>state.experiencelevel
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactiveexperienceleveloptions=createSelector(
    [getexperiencelevel],
    (experiencelevel) => { 
   var temp:IExperienceLeveloptions[]  =[]
   experiencelevel.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.ExperienceLevelId,
        label:e.ExperienceLevel,
        value:e.ExperienceLevelId
    
        })
    }
   })
// console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallIndustryoptions=createSelector(
    [getexperiencelevel],
    (experiencelevel) => { 
        var temp:IExperienceLeveloptions[]  =[]
        experiencelevel.forEach((e)=>{
       
             temp.push({
                 
             key:e.ExperienceLevelId,
             label:e.ExperienceLevel,
             value:e.ExperienceLevelId
         
             })
         
        })
     
             
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )