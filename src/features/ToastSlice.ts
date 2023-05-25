import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "primereact/toast";

export interface Toaster {
    id: number,
    status: "success" | "error" | "info";
    data: string;
    endpoint: string;
}

var initialState = { id: 1, status: "", data: "", endpoint: "" };
const toast = null;
export const ToastSlice = createSlice({
    name: "Toaster",
    initialState,
    reducers: {
        createtoast: (state, payload: PayloadAction<Toaster>) => {
            // alert("toast")
            // console.log("toast")
            // console.log(payload)
            state.id = state.id + 1
            state.data = payload.payload.data
            state.endpoint = payload.payload.endpoint
            state.status = payload.payload.status
            // state=payload.payload
            // toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
            return state;
        },
        toastreset:(state)=>{
            state.id=1;
            return state
        }
    }
})


export const { createtoast,toastreset } = ToastSlice.actions
export default ToastSlice.reducer