import { createSelector } from '@reduxjs/toolkit'
import { RootState  } from "../../app/store";
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getbgvs=(state:RootState)=>state.Bgvvendors
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getbgvoptions=createSelector(
    [getbgvs],
    (bgvs) => {
   var temp:any[]  =[]
   bgvs.forEach((e)=>{
    // console.log(e)
        temp.push({

        key:e.ID,
        label:e.Bgvvendor,
        value:e.Email

        })

   })
// console.log(temp)

        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
