import  {createSelector} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import IOptions from '../../models/Ioptions'

export const getsubbands=(state:RootState)=>state.subband

export const getasubbandactiveoptions=createSelector(
    [getsubbands],
    (subband)=>{
        var temp:any[]=[]
// alert("asdfg")
// console.log(designation)
subband.forEach((e)=>{
            if(e.Active==true)
            // console.log(e)
            temp.push({
                key:e.SubBandId,
                BandId:e.BandId,
                label:e.SubBandName,
                value:e.SubBandId
            })
        })
// console.log(temp)
return temp
    }
)


export const getalldesignationoptions=createSelector(

    [getsubbands],
    (subband)=>{
        var temp:IOptions[]=[]
        subband.forEach(e => {
            temp.push({
                key:e.SubBandId,
                label:e.SubBandName,
                value:e.SubBandId
            })
        });

        return temp
    }
)
