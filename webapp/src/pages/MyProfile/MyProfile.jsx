import React from 'react'
import { Grid, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading'
import { useGetUserProfileQuery } from '../../features/auth/userApiSlice' 
import { Gender } from '../../_helpers/Enums';

const MyProfile = () => {
  const navigate = useNavigate();

  const { data: myProfile, 
          isLoading, 
          isFetching,
          isSuccess, 
          isError,
         error: profileError 
    } = useGetUserProfileQuery();

  if (isLoading || isFetching) {
    return ( 
      <div className='container pt-5 col-md-3'>
        <Loading />
      </div> 
    )
  }
  
  if (isError) {
    return  <div className='container pt-5 col-md-3'>{JSON.stringify(profileError.data)}</div> 
  }

  const genderWord = ((value) => {
    if (value) {
      return Gender.find(item => item.value == value).label
    }
  })
  
  if (isSuccess) {
    return (
      <>
        <Container sx={{ paddingTop: 2 }} maxWidth={false}>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
        >
          <Grid item xs={10}>
            <Typography
              variant='h4'
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Мой профиль
            </Typography>
          </Grid>
        </Grid>
        <Grid 
          container 
          spacing={{ xs: 2, md: 1 }} 
        >
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right', paddingRight: 2 }}
            >
              Фамилия:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {myProfile[0].last_name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Имя:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {myProfile[0].first_name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Отчество:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {myProfile[0].middle_name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Номер телефона:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {myProfile[0].mobile}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Email:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {myProfile[0].user.email}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Пол:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
              {genderWord(myProfile[0].gender)}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Кафедра:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
 
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Ученое звание:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
 
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'right',paddingRight: 2 }}
            >
              Ученая степень:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'left' }}
            >
 
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              // size='small'
              onClick={ () => {navigate('/edit_profile/')} }
              sx={{ 
                fontSize: 14,
                flexGrow: 1
              }}
              className='text-center'
            >
              Редактировать
            </Button>
          </Grid>
        </Grid>
          {/* <div class="col-10 mb-2">
              <div class="d-flex justify-content-between">
                  <a href="{% url 'profiles:password_change' %}" class="btn btn-primary col-4">Сменить пароль</a>
              </div>
          </div> */}
        </Container>
      </>
    )
  }
}

export default MyProfile
