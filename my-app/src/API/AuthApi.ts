import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://diplomskiapi20231116043904.azurewebsites.net/api/"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "auth/Register",
                method: "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : userData,
            }),
        }),
        loginUser : builder.mutation({
            query : (userCredentials) => ({
                url : "auth/Login",
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : userCredentials
            })
        })
    })
})
export const { useRegisterUserMutation, useLoginUserMutation } = AuthApi
export default AuthApi;

//       userName: userInput.userName,
//       password: userInput.password,
//       name: userInput.name,
//       prezime: userInput.lastName,
//       role: userInput.role