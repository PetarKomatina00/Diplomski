import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi20231116043904.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderDetails) => ({
                url: "Order",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: orderDetails
            }),
        }),
    })
})
export const { useCreateOrderMutation } = orderApi
export default orderApi;