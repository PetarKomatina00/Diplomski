import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    endpoints: (builder) => ({
        initialPayment: builder.mutation({
            query: (userid) => ({
                url: "payment",
                method : "POST",
                params : {
                    userID : userid
                }
            }),
        }),
    })
})
export const {useInitialPaymentMutation} = paymentApi
export default paymentApi;