import { apiSlice  } from "../../app/api/apiSlice";

export const copyrightCertApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCopyrightCerts: builder.query({
      query: () => ({
        url: '/activities/copyright_certificates/',
        method: 'GET'
      }),
      providesTags: ['CopyrightCerts'],
        // (result) => result
        // ? [...result.map(({ id }) => ({ type: 'copyrightCerts', id })), 'copyrightCerts']
        // : ['copyrightCerts'],
    }),
    addCopyrightCert: builder.mutation({
      query: (copyright_cert) => ({
        url: '/activities/copyright_certificates/',
        method: 'POST',
        body: copyright_cert
      }),
      invalidatesTags: ['CopyrightCerts'],
    }),
    updateCopyrightCert: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/activities/copyright_certificates/${id}/`,
        method: 'PATCH',
        body: { ...formData },
      }),
      invalidatesTags: ['CopyrightCerts'],
    }),
    deleteCopyrightCert: builder.mutation({
      query: (id) => ({
        url: `/activities/copyright_certificates/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['CopyrightCerts'],
    }),
  })
})

export const {
  useGetCopyrightCertsQuery,
  useAddCopyrightCertMutation,
  useDeleteCopyrightCertMutation,
  useUpdateCopyrightCertMutation,
} = copyrightCertApiSlice