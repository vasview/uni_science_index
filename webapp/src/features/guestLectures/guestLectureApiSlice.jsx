import { apiSlice  } from "../../app/api/apiSlice";

export const guestLectureApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGuestLectures: builder.query({
      query: () => ({
        url: '/activities/guest_lectures/',
        method: 'GET'
      }),
      providesTags: ['GuestLectures'],
    }),
    addGuestLecture: builder.mutation({
      query: (guest_lecture) => ({
        url: '/activities/guest_lectures/',
        method: 'POST',
        body: guest_lecture
      }),
      invalidatesTags: ['GuestLectures'],
    }),
    updateGuestLecture: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/guest_lectures/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['GuestLectures'],
    }),
    deleteGuestLecture: builder.mutation({
      query: (id) => ({
        url: `/activities/guest_lectures/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['GuestLectures'],
    }),
  })
})

export const {
  useGetGuestLecturesQuery,
  useAddGuestLectureMutation,
  useDeleteGuestLectureMutation,
  useUpdateGuestLectureMutation,
} = guestLectureApiSlice