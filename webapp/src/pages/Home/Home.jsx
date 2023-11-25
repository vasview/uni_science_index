import React from 'react'
import './homeStyle.css'
import WelcomeCard from '../../components/UI/WelcomeCard';

export default function home() {
  return (
    <>
      <div className='home_container'>
        {/* <h1>Home Page</h1> */}
        <div class="wlcm_cards_box__wrapper pt-5">
          <WelcomeCard  title='Преподаватель'
                        imgPath='/images/student.png' 
                        imgTitle='Преподаватель'
                        url='/login'
          />
          <WelcomeCard  title='Институт'
                        imgPath='/images/professor.png' 
                        imgTitle='Институт'
                        url='/login'
          />
          <WelcomeCard  title='Администрация'
                        imgPath='/images/manager.png' 
                        imgTitle='Администрация' 
                        url='/login'
          />
        </div>
      </div>
    </>
  );
}
