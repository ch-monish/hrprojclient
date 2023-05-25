import {createSelector} from 'reselect'
import IOptions from '../../models/Ioptions'
import { RootState } from '../../app/store'

const getqualification=(store:RootState)=>store.qualification
// console.log(getqualification)
export const getactivequalification=createSelector(
    getqualification,(qualification)=>{
        var temp:any[]=[]

        qualification.forEach(e=>{
            if(e.Active==true){
temp.push({
    key: e.QualificationId,
    label: e.Qualification,
    value: e.Qualification
})

            }
        })
        console.log(temp)
        return temp
    }
)
export const getallqualification=createSelector(
    getqualification,(qualification)=>{
        var temp:any[]=[]

        qualification.forEach(e=>{
temp.push({
    key: e.QualificationId,
    label: e.Qualification,
    value: e.Qualification
})


        })
        // console.log(temp)
        return temp
    }
)
