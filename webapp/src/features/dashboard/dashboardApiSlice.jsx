import { apiSlice  } from "../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDashboardIndicators: builder.query({
      query: () => ({
        url: '/kpis/my_dashboards/',
        method: 'GET'
      }),
      providesTags: ['DashboardIndicators'],
    })
  })
})

export const {
  useGetDashboardIndicatorsQuery
} = dashboardApiSlice