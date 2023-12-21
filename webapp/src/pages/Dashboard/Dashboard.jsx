import React from 'react'
import { Container, Typography } from '@mui/material'
import { DashboardCardList } from '../../components/UI/DashboardCardList'
import { userLoadedSuccess, userLoadedFail } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../../features/auth/userApiSlice';

export const Dashboard = () => {
  const cards = [
    { id: 1, title: 'Гостевые лекции и стажировки', number: 1, link: '/my_guest_lectures'},
    { id: 2, title: 'Семинары и конференции', number: 3, link: ''},
    { id: 3, title: 'Рук-во докторантами, аспирантов', number: 2, link: ''},
    { id: 4, title: 'Защита диссертаций', number: 1, link: ''},
    { id: 5, title: 'Руководство НИРС', number: 5, link: ''},
    { id: 6, title: 'Научно исследовательская работа', number: 1, link: ''},
    { id: 7, title: 'Публикация по итокам НИРС', number: 1, link: ''},
    { id: 8, title: 'Публикация монографий', number: 1, link: ''},
    { id: 9, title: 'Получено авторских свидетельств', number: 2, link: ''},
    { id: 10, title: 'Заявки на изобретения', number: 9, link: ''},
    { id: 11, title: 'Патенты на изобретения', number: 3, link: ''},
  ]

  const dispatch = useDispatch();

  const { data: current_user, isSuccess, isError } = useGetUserQuery();
  console.log('dashboard user',current_user)
  { isSuccess ? dispatch(userLoadedSuccess(current_user)) : dispatch(userLoadedFail) }

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
}
