import { apiSlice  } from "../../app/api/apiSlice";

export const monographAplApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMonographs: builder.query({
      query: () => ({
        url: '/publications/monographs/',
        method: 'GET'
      }),
      providesTags: ['MonographPubs'],
    }),
    addMonograph: builder.mutation({
      query: (monograph) => ({
        url: '/publications/monographs/',
        method: 'POST',
        body: monograph
      }),
      invalidatesTags: ['MonographPubs'],
    }),
    updateMonograph: builder.mutation({
      query: ({id, formData}) => ({
        url: `/publications/monographs/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['MonographPubs'],
    }),
    deleteMonograph: builder.mutation({
      query: (id) => ({
        url: `/publications/monographs/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MonographPubs'],
    }),
  })
})

export const {
  useGetMonographsQuery,
  useAddMonographMutation,
  useDeleteMonographMutation,
  useUpdateMonographMutation,
} = monographAplApiSlice