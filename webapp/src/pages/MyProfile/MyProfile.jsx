import React from 'react'
import { Container } from '@mui/material'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UI/Loading'
import { useGetUserProfileQuery } from '../../features/auth/userApiSlice' 
import './MyProfile.css'

const MyProfile = () => {
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
  
  if (isSuccess) {
    return (
      <>
        <Container>
          <div class="main_block_section col-sm-6 mb-3">
              <h3 class="fs-4 col-sm-12 text-uppercase">Мой профиль</h3>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Фамилия</div>
                  <div class="col_value col-sm-6">{myProfile[0].last_name}</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Имя</div>
                  <div class="col_value col-sm-6">{myProfile[0].first_name}</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Отчество</div>
                  <div class="col_value col-sm-6">{myProfile[0].middle_name}</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Номер телефона</div>
                  <div class="col_value col-sm-6">{myProfile[0].mobile}</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Email</div>
                  <div class="col_value col-sm-6">your_email@test.com</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Пол</div>
                  <div class="col_value col-sm-6">{myProfile[0].gender}</div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Кафедра</div>
                  <div class="col_value col-sm-6"></div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Ученое звание</div>
                  <div class="col_value col-sm-6"></div>
              </div>
              <div class="row col-sm-12 mb-1">
                  <div class="col_title col-sm-6">Ученая степень</div>
                  <div class="col_value col-sm-6"></div>
              </div>
              <div class="col-10 mb-2">
                <Button
                  variant='contained'
                  size='small'
                  component={Link}
                  to={'/edit_profile/`{myProfile[0].id}`'}
                  sx={{ 
                    fontSize: 14,
                    flexGrow: 1
                  }}
                >
                  Редактировать
                </Button>
              </div>
          </div>
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
