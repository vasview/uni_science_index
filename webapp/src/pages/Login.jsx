import React, { useRef, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';

import { Loading } from '../components/UI/Loading';

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
      navigate('/dashboard')
    } catch (err) {
      if (!err?.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  };

  const content = isLoading ? 
    ( <div className='container pt-5 col-md-3'>
        <Loading />
      </div> 
    )
    : (
    <div className='container pt-5 col-md-3'>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
      <h1>Вход в приложение</h1>
      <p className='fs-5'>Войдите в свой аккаунт</p>
      <form onSubmit={HandleSubmit}>
        <div className='form-group mb-3'>
          <input 
            className='form-control fs-4'
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
            className='form-control fs-4'
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
        <button className='btn btn-primary btn-lg w-100 fs-4' type='submit'>
          Войти
        </button>
      </form>
      <p className='mt-3 fs-5'>
        Забыли пароль? <Link to='/password/reset'>Сброс пароля</Link>
      </p>
    </div>
  )

return content
};

export default Login;
