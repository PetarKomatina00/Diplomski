import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const shoppingCartApi = createApi({
    reducerPath: "shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) => ({
        getShoppingCart: builder.query({
            query: (userid) => ({
                //url: `shoppingcart/${userID}`
                url: `shoppingcart`,
                params: {
                    userID: userid
                }
            }),
            providesTags: ["ShoppingCarts"]
        }),
        updateShoppingCart: builder.mutation({
            query: ({ lekID, quantity, userID }) => ({
                url: `shoppingcart`,
                method: "POST",
                params: {
                    lekID,
                    quantity,
                    userID,
                },
            }),
            invalidatesTags : ["ShoppingCarts"]
        }),
        deleteShoppingCart : builder.mutation({
            query : (id) => ({
                url : "ShoppingCart/" + id,
                method : "DELETE",
            }),
        })
    })
})
export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation, useDeleteShoppingCartMutation } = shoppingCartApi
export default shoppingCartApi;