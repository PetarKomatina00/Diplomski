import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const lekItemApi = createApi({
    reducerPath: "lekItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["Lek"],
    endpoints: (builder) => ({
        getLekovi: builder.query({
            query: ({currentPage, pageSize, bestSellers}) => ({
                url: "Lek/",
                params : {
                    ...(currentPage && {currentPage}),
                    ...(pageSize && {pageSize}),
                    ...(bestSellers && {bestSellers})
                },
            }),
            transformResponse(apiResponse : {result : any}, meta : any){
                return {
                    apiResponse,
                    totalRecords : meta.response.headers.get("X-Pagination")
                }
            },
            providesTags: ["Lek"]
        }),
        getLekByID: builder.query({
            query: (id) => ({
                url: `Lek/${id}`
            }),
            //providesTags: ["Lek"]
        }),
        getBestSellers : builder.query({
            query : () => ({
                url : "/Lek/GetBestSellers"
            }),
        }),
        updateLek : builder.mutation({
            query : ({data, id}) => ({
                url : "Lek/" + id,
                method : "PUT",
                body : data
            }),
            invalidatesTags : ["Lek"]
        }),
        updateTimesBought : builder.mutation({
            query : ({data}) => ({
                url : "Lek/UpdateTimesBought",
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data)
            }),
            invalidatesTags : ["Lek"]
        }),
        addLek : builder.mutation({
            query : (data) => ({
                url : "Lek/Add",
                method : "POST",
                body : data,
            }),
            invalidatesTags : ["Lek"]
        }),
        deleteLek : builder.mutation({
            query : (id) => ({
                url : "Lek/" + id,
                method : "DELETE",
            }),
            invalidatesTags : ["Lek"]
        })
    })
})
export const {
    useGetLekoviQuery, 
    useGetLekByIDQuery,
    useGetBestSellersQuery, 
    useUpdateLekMutation,
    useUpdateTimesBoughtMutation,
    useAddLekMutation,
    useDeleteLekMutation} = lekItemApi
export default lekItemApi;