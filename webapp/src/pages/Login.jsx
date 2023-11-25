import React, { useRef, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';

const Login = () => {
  const emailRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    //loin(email, password)
    try {
      const userData = await login({ email, password }).unwrap()
      console.log(userData)
      // dispatch(setCredentials({ ...userData, user }))
      dispatch(setCredentials({ ...userData }))
      setEmail('')
      setPassword('')
      // is the user authentiated? redirect to home page
      navigate('/home')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className='container mt-5 col-md-4'>
      <h1>Вход в приложение</h1>
      <p>Войдите в свой аккаунт</p>
      <form onSubmit={HandleSubmit}>
        <div className='form-group mb-1'>
          <input 
            className='form-control'
            type="email"
            id='email'
            placeholder='Ваш email'
            ref={emailRef}
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <input 
            className='form-control'
            type="password"
            id='password'
            name='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary btn-lg w-100' type='submit'>
          Войти
        </button>
      </form>
      <p className='mt-3'>
        Забыли пароль? <Link to='/password/reset'>Сброс пароля</Link>
      </p>
    </div>
  );
};

export default Login;
