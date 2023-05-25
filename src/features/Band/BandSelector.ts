import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import { IBandoptions,Band, Banddata, getBandaction } from './Bandslice';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getbanddata=(state)=>state.Band
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactivebandoptions=createSelector(
    [getbanddata],
    (getbanddata) => { 
   var temp:IBandoptions[]  =[]
   getbanddata.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.BandId,
        label:e.BandName,
        value:e.BandId
    
        })
    }
   })
// console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallbandoptions=createSelector(
   getbanddata,
    (band) => { 
        var temp:IBandoptions[]  =[]
        band.forEach((e)=>{
       
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