import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit'

const loginroles=(state:RootState)=>state.Login.groups

export const  getuserroles=createSelector(
    [loginroles],(roles)=>{
var temp:any[]=[]
// console.log(roles)
if(Object.is(roles,undefined)){
return temp
} 
else{
    roles.forEach(e => {
        // console.log(e)
        temp.push(e.name.toString())
        
    });
    console.log(temp)
    return temp;
}

    })