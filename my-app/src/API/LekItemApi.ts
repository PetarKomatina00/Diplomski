import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const lekItemApi = createApi({
    reducerPath: "lekItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7194/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["Lek"],
    endpoints: (builder) => ({
        getLekovi: builder.query({
            query: ([searchString = "", currentPage = 1, size = 2]) => ({
                url: "Lek/" + currentPage + "/" + size
            }),
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
            //invalidatesTags : ["Lek"]
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