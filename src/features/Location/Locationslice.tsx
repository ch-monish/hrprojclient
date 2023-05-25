import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
    LocationId: number;
    LocationName: string;
    Active: boolean;
}
const initialState: Location[] = [];
// console.log(Location)

export const LocationSlice = createSlice({
    name: "Location",
    initialState,
    reducers: {
        Locationdata: (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getLocationaction:(state)=>{
            // console.log(state)
        },
        createLocationaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateLocationaction:(state,payload:PayloadAction<any>)=>{
            // console.log(payload)


        }

    },
});
export const {Locationdata,getLocationaction,createLocationaction,updateLocationaction}=LocationSlice.actions
export default LocationSlice.reducer