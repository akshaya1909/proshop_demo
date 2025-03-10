import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Creates a new slice, productsApiSlice, which extends apiSlice by injecting new endpoints specific to products.
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // POST Api
        login: builder.mutation({

            // actual HTTP request configuration:
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),

logout: builder.mutation({
    query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
    })
}),

profile: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
    })
}),

getUsers: builder.query({
    query: () => ({
        url: `${USERS_URL}`
    }),
    providesTags: ['Users'],
    keepUnusedDataFor: 5
}),

deleteUser: builder.mutation({
    query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
    })
}),

getUserDetails: builder.query({
    query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
    }),
    keepUnusedDataFor: 5
}),

updateUser: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
    }),
    invalidatesTags: ['Users']
})
    }),
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation} = usersApiSlice;