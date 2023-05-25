import {createSelector} from 'reselect'
import IOptions from '../../models/Ioptions'

const getEmployementtype=(store)=>store.employementtype

export const getactiveemplyementtypes=createSelector(
    getEmployementtype,(employement)=>{
        var temp:IOptions[]=[]

        employement.forEach(e=>{
            if(e.Active==true){
temp.push({
    key: e.EmployementTypeId,
    label: e.EmployementType,
    value: e.EmployementType
})

            }
        })
        return temp
    }
) 
export const getemplyementtypes=createSelector(
    getEmployementtype,(employement)=>{
        var temp:IOptions[]=[]

        employement.forEach(e=>{
temp.push({
    key: e.EmployementTypeId,
    label: e.EmployementType,
    value: e.EmployementType
})

            
        })
        return temp
    }
) 