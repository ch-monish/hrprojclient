import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { quoteSlice } from "../Quotes/quoteslice";

export interface UserRoles {
   
    email : string;
    first_name : string;
    groups : number[];
    id : number;
    is_active : boolean;
    is_staff : boolean;
    is_superuser :boolean;
    last_login : string;
    last_name : string;
    user_permissions : [];
    username : string;

}
export interface IUserRolesoptions {
    key: number,
    label: string;
    value: number
}
const initialState: UserRoles[] = [];

export const userrolesSlice = createSlice({
    name: "userroles",
    initialState,
    reducers: {
        userrolesdata: (state, payload: any) => {
            var temp = payload.payload
            state = [...temp]

            console.log(state)
            return state;
        },




        //functions for sagas watching
        getuserrolesaction: (state) => {
        },
        getadusersaction: (state) => {
        },
        getrolesaction: (state) => {

        },

        createuserrolesaction: (state, payload: PayloadAction<any>) => {
            console.log(payload)
        },
        updateuserrolesaction: (state, payload: PayloadAction<any>) => {

        }

    },
});
export const { userrolesdata, getuserrolesaction, createuserrolesaction, updateuserrolesaction, getadusersaction, getrolesaction } = userrolesSlice.actions
export default userrolesSlice.reducer