import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    lekItem: [],
    search : "",
};

export const LekSlice = createSlice({
    name : "LekSlice",
    initialState : initalState,
    reducers : {
        setLekItem : (state, action) => {
            state.lekItem = action.payload;
        },
        setSearchItem : (state, action) => {
            state.search = action.payload;
        },
    },
});
export const { setLekItem, setSearchItem } = LekSlice.actions;
export const lekItemReducer = LekSlice.reducer;