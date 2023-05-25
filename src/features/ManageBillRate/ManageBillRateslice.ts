import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ManageBill {
    // ID:number,
    // ManageBillId: number;
    // ExperienceLevelId: number;
    // AvgApprovedCTC:  string;
    // AvgBillRate:  number;

    AvgApprovedCTC: number
    AvgBillRate: number
    BusinessUnitId: number
    CompanyId: number
    ExperienceLevelId: number
    Id: number
    ServiceLineId: number
}
const initialState: ManageBill[] = [];

export const ManageBillSlice = createSlice({
    name: "ManageBill",
    initialState,
    reducers: {
        ManageBilldata: (state, payload: any) => {
            var temp = payload.payload
            state = [...temp]

            // console.log(state)
            return state;
        },




        //functions for sagas watching
        getManageBillaction: (state) => {
            // console.log(state)

        },
        createManageBillaction: (state, payload: PayloadAction<any>) => {
            // console.log(payload)
        },
        updateManageBillaction: (state, payload: PayloadAction<any>) => {
            // console.log(payload)

        }

    },
});
export const { ManageBilldata, getManageBillaction, createManageBillaction, updateManageBillaction } = ManageBillSlice.actions
export default ManageBillSlice.reducer