import { apiSlice  } from "../../app/api/apiSlice";

export const inventionAplApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInventionApls: builder.query({
      query: () => ({
        url: '/activities/invention_applications/',
        method: 'GET'
      }),
      providesTags: ['InventionApls'],
      // providesTags: (result) => result
      //   ? [...result.map(({ id }) => ({ type: 'InventionApls', id })), 'InventionApls']
      //   : ['InventionApls'],
    }),
    addInventionApl: builder.mutation({
      query: (invention_apl) => ({
        url: '/activities/invention_applications/',
        method: 'POST',
        body: invention_apl
      }),
      invalidatesTags: ['InventionApls'],
    }),
    updateInventionApl: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/invention_applications/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['InventionApls'],
    }),
    deleteInventionApl: builder.mutation({
      query: (id) => ({
        url: `/activities/invention_applications/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['InventionApls'],
    }),
  })
})

export const {
  useGetInventionAplsQuery,
  useAddInventionAplMutation,
  useDeleteInventionAplMutation,
  useUpdateInventionAplMutation,
} = inventionAplApiSlice