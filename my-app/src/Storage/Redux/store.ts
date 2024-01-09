import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { lekItemReducer } from "./LekSlice";
import lekItemApi from "../../API/LekItemApi";
import shoppingCartApi from "../../API/shoppingCartApi";
import { shoppingCartReducer } from "./shoppingCartSlice";
import AuthApi from "../../API/AuthApi";
import { userAuthReducer } from "./userAuthSlice";
import paymentApi from "../../API/paymentApi";
import orderApi from "../../API/orderApi";
const store = configureStore({
    reducer : {
        lekItemStore : lekItemReducer,
        shoppingCartStore : shoppingCartReducer,
        userAuthStore : userAuthReducer,
        [lekItemApi.reducerPath] : lekItemApi.reducer,
        [shoppingCartApi.reducerPath] : shoppingCartApi.reducer,
        [AuthApi.reducerPath] : AuthApi.reducer,
        [paymentApi.reducerPath] : paymentApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer
    },
    middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(lekItemApi.middleware)
    .concat(AuthApi.middleware)
    .concat(paymentApi.middleware)
    .concat(orderApi.middleware)
    .concat(shoppingCartApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;





export default store;