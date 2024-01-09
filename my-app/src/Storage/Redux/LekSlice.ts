import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    lekItem: [],
};

export const LekSlice = createSlice({
    name : "LekSlice",
    initialState : initalState,
    reducers : {
        setLekItem : (state, action) => {
            state.lekItem = action.payload;
        },
    },
});
export const { setLekItem } = LekSlice.actions;
export const lekItemReducer = LekSlice.reducer;