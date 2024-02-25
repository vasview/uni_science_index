import React from 'react'
import { Container, Typography } from '@mui/material'
import { DashboardCardList } from '../../components/UI/Dashboard/DashboardCardList'
import { userLoadedSuccess, userLoadedFail } from '../../features/auth/authSlice';
import { Loading } from '../../components/UI/Loading'
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../../features/auth/userApiSlice';
import { useGetDashboardIndicatorsQuery } from '../../features/dashboard/dashboardApiSlice';

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: current_user, 
          isSuccess: userSuccess, 
          isFulfilled: userFulfilled,
          isError: userError
  } = useGetUserQuery();
  console.log('dashboard user', current_user)

  { userSuccess ? dispatch(userLoadedSuccess(current_user)) : dispatch(userLoadedFail) }

  const { data: cards, 
          isLoading: dashboardLoading,
          isFetching: dashboardFetching,
          isSuccess: dashboardSuccess, 
          isError: dashboardError 
  } = useGetDashboardIndicatorsQuery({ skip: !userFulfilled});

  if (dashboardLoading || dashboardFetching) {
    return ( 
    <div className='container pt-5 col-md-3'>
      <Loading />
    </div> 
    )
  }

  if (dashboardSuccess) 
    return (
      <Container sx={{ paddingTop: 2 }}>
        <Typography
          variant='h4'
          sx={{ mb: 2 }}
        >
          Мои показатели научной работы
        </Typography>
        <DashboardCardList cards={cards} />
      </Container>
    )
};
