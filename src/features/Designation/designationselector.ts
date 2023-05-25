import  {createSelector} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import IOptions from '../../models/Ioptions'

export const getdesignations=(state:RootState)=>state.designation

export const getactivedesignationoptions=createSelector(
    [getdesignations],
    (designation)=>{
        var temp:IOptions[]=[]
// alert("asdfg")
// console.log(designation)
        designation.forEach((e)=>{
            if(e.Active==true)
            // console.log(e)
            temp.push({
                key:e.DesignationId,
                label:e.DesignationName,
                value:e.DesignationId
            })
        })
// console.log(temp)
return temp
    }
)


export const getalldesignationoptions=createSelector(

    [getdesignations],
    (designation)=>{
        var temp:IOptions[]=[]
        designation.forEach(e => {
            temp.push({
                key:e.DesignationId,
                label:e.DesignationName,
                value:e.DesignationId
            })
        });

        return temp
    }
)
