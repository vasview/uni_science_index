import { apiSlice  } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => ({
        url: '/auth/users/me/',
        method: 'GET'
      })
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: '/accounts/user/profile/',
        method: 'GET'        
      }),
      providesTags: ['MyProfile'],
    }),
    updateUserProfile: builder.mutation({
      query: ({id, formData}) => ({
        url: `/accounts/user/profile/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['MyProfile'],
    }),
    getSciProfiles: builder.query({
      query: () => ({
        url: '/accounts/user/scientific_profiles/',
        method: 'GET'        
      }),
      providesTags: (result) => result
        ? [...result.map(({ id }) => ({ type: 'SciProfiles', id })), 'SciProfiles']
        : ['SciProfiles'],
    }),
    addSciProfile: builder.mutation({
      query: (sci_profile) => ({
        url: '/accounts/user/scientific_profiles/',
        method: 'POST',
        body: sci_profile
      }),
      invalidatesTags: ['SciProfiles'],
    }),
    updateSciProfile: builder.mutation({
      query: ({id, sci_profile}) => ({
        url: `/accounts/user/scientific_profiles/${id}/`,
        method: 'PATCH',
        body: sci_profile
      })
    }),
    deleteSciProfile: builder.mutation({
      query: (id) => ({
        url: `/accounts/user/scientific_profiles/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['SciProfiles'],
    }),
  })
})

export const {
  useGetUserQuery, 
  useGetUserProfileQuery, 
  useUpdateUserProfileMutation,
  useGetSciProfilesQuery, 
  useAddSciProfileMutation,
  useUpdateSciProfileMutation,
  useDeleteSciProfileMutation,
} = userApiSlice