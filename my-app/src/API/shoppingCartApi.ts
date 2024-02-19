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
        })
    })
})
export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } = shoppingCartApi
export default shoppingCartApi;