import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../app/store";
import { IUserRolesoptions } from './userroleslice';

export const getuserroleoptions=(state:RootState)=>state.userroleoptions

export const getactiveuserroleoptions=createSelector(
[getuserroleoptions],
(userroleoptions)=>{
    var temp:any[]=[]
    userroleoptions.forEach((e)=>{
        if(e.Active==true){
            temp.push(e)
        }
    })

    return temp
}


)

export const getalluserrolesoptions=createSelector(
    [getuserroleoptions],
    (userroleoptions)=>{
        var temp:any[]=[]
        userroleoptions.forEach((e)=>
        temp.push(e)
        )
    }
)