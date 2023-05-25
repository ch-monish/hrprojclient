import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IBgvvendors {
    ID: number;
    Email: string;
    Bgvvendor: string;

}

const initialState: IBgvvendors[] = [];

export const BgvvendorsSlice = createSlice({
    name: "Bgvvendors",
    initialState,
    reducers: {
        Bgvvendorsdata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]

            // console.log(state)
            return state;
        },




        //functions for sagas watching
        getbgvvendorsaction:(state)=>{
        },


    },
});
export const {Bgvvendorsdata,getbgvvendorsaction}=BgvvendorsSlice.actions
export default BgvvendorsSlice.reducer
