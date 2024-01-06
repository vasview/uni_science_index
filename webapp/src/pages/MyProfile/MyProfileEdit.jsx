import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material';
import { Loading } from '../../components/UI/Loading'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useGetUserProfileQuery } from '../../features/auth/userApiSlice' 

const MyProfileEdit = () => {
  const navigate = useNavigate();

  const { data: myProfile, 
          isLoading: loadingProfile, 
          isSuccess, 
          isError,
          error: profileError 
    } = useGetUserProfileQuery();

  if (loadingProfile) {
    return ( 
      <div className='container pt-5 col-md-3'>
        <Loading />
      </div> 
    )
  }

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
        <Grid xs={2}>
          <Button
            variant='outlined'
            size='small'
            color='primary'
            onClick={() => navigate(-1)}
            sx={{ 
              fontSize: 14,
              flexGrow: 1
            }}
          >
            <KeyboardBackspaceIcon 
              sx={{marginRight: 2}}
            />
            Назад
          </Button>
        </Grid>
        <Grid xs={8}>
          <Typography
            variant='h4'
            sx={{ mb: 2 }}
          >
          Редактирование моего профиля:
          </Typography>
        </Grid>
      </Grid>
      {/* <form action="">

      </form> */}
    </Container>
  )
}

export default MyProfileEdit