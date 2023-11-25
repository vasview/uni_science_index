import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordConfirm from '../pages/ResetPasswordConfirm';

import history from '../_helpers/history';
import NotFound from '../pages/NotFound';

const RouteTable = () => {
  return (
    <Router history={history}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="password/reset" element={<ResetPassword />} />
      <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
      
      <Route path="*" element={<NotFound />} /> 

      </Routes>
    </Router>
  );
};

export default RouteTable;