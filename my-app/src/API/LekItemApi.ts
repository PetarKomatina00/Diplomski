import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const lekItemApi = createApi({
    reducerPath: "lekItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi20231116043904.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token);
        }
    }),
    tagTypes: ["Lek"],
    endpoints: (builder) => ({
        getLekovi: builder.query({
            query: () => ({
                url: "Lek"
            }),
            providesTags: ["Lek"]
        }),
        getLekByID: builder.query({
            query: (id) => ({
                url: `Lek/${id}`
            }),
            //providesTags: ["Lek"]
        }),
        updateLek : builder.mutation({
            query : ({data, id}) => ({
                url : "Lek/" + id,
                method : "PUT",
                body : data
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
    useUpdateLekMutation,
    useAddLekMutation,
    useDeleteLekMutation} = lekItemApi
export default lekItemApi;