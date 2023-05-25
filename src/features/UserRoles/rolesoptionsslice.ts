import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IRolesoptions {
   id:number,
   name:string
}
const initialState: IRolesoptions[] = [];

export const rolesoptionsSlice = createSlice({
    name: "rolesoptions",
    initialState,
    reducers: {
        rolesoptionsdata: (state, payload: any) => {
            var temp = payload.payload
            // console.log(temp)
            var temparr:IRolesoptions[]=[]
            temp.forEach(e => {
                temparr.push({
                   id:e.id,
                   name:e.name
                })
            });
            // console.log(temparr)
            return temparr;
        },


rolesoptionsaction: () => {

}

    },
});


export const { rolesoptionsdata} = rolesoptionsSlice.actions
export default rolesoptionsSlice.reducer