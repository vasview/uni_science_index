import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: 'include',
  prepareHeaders: ( headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 401) {
    console.log('sending refresh token')
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/jwt/refresh/', api, extraOptions)
    console.log(refreshResult)
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['SciProfiles', 'CopyrightCerts', 'InventionApls',
            'InventionPatents', 'Conferences', 'GuestLectures', 
            'MonographPubs', 'DoctoralWorks', 'StudentWorks',
            'ResearchProjects'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})