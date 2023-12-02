import React from 'react'
import { Container } from '@mui/material'
import './MyProfile.css'

const MyProfile = () => {
  return (
    <>
    <Container>
    <div class="main_block_section col-sm-6 mb-3">
    <h3 class="fs-4 col-sm-12 text-uppercase">Мой профиль</h3>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Фамилия</div>
        <div class="col_value col-sm-6">Егоров</div>
    </div>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Имя</div>
        <div class="col_value col-sm-6">Егор</div>
    </div>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Отчество</div>
        <div class="col_value col-sm-6">Егорович</div>
    </div>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Номер телефона</div>
        <div class="col_value col-sm-6"></div>
    </div>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Email</div>
        <div class="col_value col-sm-6">your_email@test.com</div>
    </div>
    <div class="row col-sm-12 mb-1">
        <div class="col_title col-sm-6">Пол</div>
        <div class="col_value col-sm-6">мой пол</div>
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
        <div class="d-flex justify-content-between">
            <a href="#" class="btn btn-primary col-4">Редактировать</a>
        </div>
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

export default MyProfile
