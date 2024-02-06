import React, { useState } from 'react'
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

  const [formData, setFormData] = useState([''])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {

  }

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
        <Grid xs={8}>
            <form className='w-100 mx-1 my-1'>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="first_name" 
                  className='form-label fs-3 w-30'
                >
                  Имя:
                </label>
                <input 
                  name='first_name' 
                  className='form-control fs-3 w-50 float-end' 
                  value={formData.first_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="middle_name" 
                  className='form-label fs-3 w-30'
                >
                  Отчество:
                </label>
                <input 
                  name='middle_name' 
                  className='form-control fs-3 w-50 float-end' 
                  value={formData.middle_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="last_name"
                  className='form-label fs-3 w-30'
                >
                  Фамилия:
                </label>
                <input 
                  name='last_name' 
                  className='form-control fs-3 w-50 float-end' 
                  value={formData.last_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="mobile" 
                  className='form-label fs-3 w-30'
                >
                  Номер мобильного:
                </label>
                <input 
                  name='mobile' 
                  className='form-control fs-3 w-50 float-end' 
                  value={formData.mobile} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button 
                  variant='contained'
                  size='small'
                  onClick={handleSubmit} 
                  sx={{ 
                    fontSize: 14,
                    flexGrow: 1,
                  }}
                  className='w-50 text-center'
                >
                  Сохранить
                </Button>
                </div>
            </form>
          </Grid>
        </Grid>
    </Container>
  )
}

export default MyProfileEdit