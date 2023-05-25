import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = [];

const otherdocumentsSlice = createSlice({
    name: 'otherdocuments',
    initialState,
    reducers: {
        otherdocumentsdata: (state, payload: PayloadAction<any>) => {
            // console.log("setting candidate details")
            var temp = payload.payload
            state =[...temp]

            return state;

        },
        otherdocumentsgetaction: (state, payload: PayloadAction<any>) => {
            
        },






    },
})
export const { otherdocumentsdata, otherdocumentsgetaction} = otherdocumentsSlice.actions
export default otherdocumentsSlice.reducer