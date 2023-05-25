import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IUserRolesoptions {


    Id: 1
    UserName: string
    Email: string
    FirstName: string
    LastName: string
    Active: true,
    key: number,
    label: string,
    value: string,
    // is_active : boolean;

}
const initialState: IUserRolesoptions[] = [];

export const userroleoptionsSlice = createSlice({
    name: "userroleoptions",
    initialState,
    reducers: {
        userroleoptionsdata: (state, payload: any) => {
            var temp = payload.payload
            // console.log(temp)
            var temparr: IUserRolesoptions[] = []
            temp.forEach(e => {
                // console.log(e)
                temparr.push({
                    Id: e.Id,
                    UserName: e.UserName,
                    Email: e.Email,
                    FirstName: e.FirstName,
                    LastName: e.LastName,
                    Active: e.Active,
                    key: e.Id,
                    label: e.LastName + ',' + e.FirstName,
                    value: e.UserName,
                    // is_active : e.is_active,

                })
            });
            // console.log(temp)
            state = [...temparr]
            return state;
        },




    },
});


export const { userroleoptionsdata } = userroleoptionsSlice.actions
export default userroleoptionsSlice.reducer
