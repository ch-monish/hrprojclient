import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iusersbyroles {
    RoleName: String,
    UserName: String,
    FullName: String
}
const initialState: Iusersbyroles[] = [];

export const usersbyrolesSlice = createSlice({
    name: 'usersbyroles',
    initialState,
    reducers: {
        usersbyrolesdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
       
        usersbyroles:(state)=>{

        },
       

    },
});
export const {usersbyroles}=usersbyrolesSlice.actions
export default usersbyrolesSlice.reducer