import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Container, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from 'react-select';
import Link from '@mui/material';
import { Loading } from '../../components/UI/Loading'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useGetUserProfileQuery } from '../../features/auth/userApiSlice' 
import { Gender } from '../../_helpers/Enums';
import { useUpdateUserProfileMutation } from '../../features/auth/userApiSlice';

const MyProfileEdit = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState('');

  const [formData, setFormData] = useState({
      first_name: '',
      middle_name: '',
      last_name: ''
    })

  const { data: myProfile, 
      isLoading, 
      isFetching,
      isSuccess, 
      isError,
    error: profileError 
  } = useGetUserProfileQuery();

  const [updateProfile, {isError: updateProfileError}] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (!isSuccess) return;

    setFormData({
      first_name: myProfile[0].first_name,
      middle_name: myProfile[0].middle_name,
      last_name: myProfile[0].last_name,
      mobile: myProfile[0].mobile
    })
  }, [isSuccess]);

  if (isLoading || isFetching) {
    return ( 
    <div className='container pt-5 col-md-3'>
      <Loading />
    </div> 
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
      const id = myProfile[0].id
      try {
        const updatedProfile = await updateProfile({ id, formData }).unwrap()
        // setFormData({
        //   first_name: '',
        //   middle_name: '',
        //   last_name: ''
        // })
        navigate('/my_profile/')
      } catch (err) {
        console.log('update_profile_error', err)
        setErrors(err.data.detail)
      }
  }

  if (isSuccess) {
    return (
      <Container sx={{ paddingTop: 2 }}>
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={2}>
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
          <Grid item xs={8}>
            <Typography
              variant='h4'
              sx={{ mb: 2 }}
            >
            Редактирование моего профиля:
            </Typography>
          </Grid>
          <Grid item xs={8}>
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
}

export default MyProfileEdit