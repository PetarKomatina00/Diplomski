import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../interfaces/shoppingCartModel";

const initalState : shoppingCartModel= {
    cartItems: [],
};

export const shoppingCartSlice = createSlice({
    name : "cartItems",
    initialState : initalState,
    reducers : {
        setShoppingCart : (state, action) => {
            state.cartItems = action.payload;
        },
        updateQuantity : (state, action) => {
            state.cartItems = state.cartItems?.map((item) => {
                if(item.lekID === action.payload.cartItem.lek.lekID){
                    item.kolicina = action.payload.quantity
                }
                return item;
            })
        },
        removeFromCart : (state, action) => {
            state.cartItems = state.cartItems?.filter((item) => {
                if(item.lekID === action.payload.cartItem.lek.lekID){
                    return null;
                }
                return item;
            })
        }
    },
});
export const { setShoppingCart, updateQuantity, removeFromCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;