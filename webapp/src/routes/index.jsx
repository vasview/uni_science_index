import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from '../shared/Layout/BaseLayout';
import Home from '../pages/Home';
import RequireAuth from '../features/auth/RequireAuth';
import Login from '../pages/Login';
import MyProfile from '../pages/MyProfile/MyProfile';
import MyProfileEdit from '../pages/MyProfile/MyProfileEdit';
import Employees from '../pages/Employees/Employees';
import ScientificProfile from '../pages/ScientificProfile/ScientificProfile';
import ScientificProfileEdit from '../pages/ScientificProfile/ScientificProfileEdit';
import MyGestLectures from '../pages/MyGestLectures';
import MyConferences from '../pages/MyConferences';
import MyPatents from '../pages/MyPatents';
import MyInventions from '../pages/MyInventions';
import MyCopyrightCertificates from '../pages/MyCopyrightCertificates';
import MyMonographPublications from '../pages/MyMonographPublications';
import MyResearchPublications from '../pages/MyResearchPublications';
import MyGScholarPublications from '../pages/MyGScholarPublications';
import MyDissertations from '../pages/MyDissertations';
import MyPostgraduates from '../pages/MyPostgraduates';
import MyResearchManagement from '../pages/MyResearchManagement';
import MyResearchWorks from '../pages/MyResearchWorks';
import MyResearchSummary from '../pages/MyResearchSummary';
import Dashboard from '../pages/Dashboard';
import EmployeeCard from '../pages/EmployeeCard/EmployeeCard'

import ResetPassword from '../pages/ResetPassword';
import ResetPasswordConfirm from '../pages/ResetPasswordConfirm';

import NotFound from '../pages/NotFound';


const RouteTable = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="password/reset" element={<ResetPassword />} />
          <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

          {/* protecte routes */}
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees_card" element={<EmployeeCard />} />
            <Route path="my_profile" element={<MyProfile />} />
            <Route path="edit_profile/:id" element={<MyProfileEdit />} />
            <Route path="my_sci_profile" element={<ScientificProfile />} />
            <Route path="my_sci_profile/:id" element={<ScientificProfileEdit />} />
            <Route path="my_employees" element={<Employees />} />
            <Route path="my_guest_lectures" element={<MyGestLectures />} />
            <Route path="my_conferences" element={<MyConferences />} />
            <Route path="my_patents" element={<MyPatents />} />
            <Route path="my_inventions" element={<MyInventions />} />
            <Route path="my_copyright_certificates" element={<MyCopyrightCertificates />} />
            <Route path="my_monograph_publications" element={<MyMonographPublications />} />
            <Route path="my_research_publications" element={<MyResearchPublications />} />
            <Route path="my_gscholar_publications" element={<MyGScholarPublications />} />
            <Route path="my_dissertations" element={<MyDissertations />} />
            <Route path="my_postgraduates" element={<MyPostgraduates />} />
            <Route path="my_resarch_management" element={<MyResearchManagement />} />
            <Route path="my_resarch_works" element={<MyResearchWorks />} />
            <Route path="my_resarch_summary" element={<MyResearchSummary />} />
          </Route>
          <Route path="*" element={<NotFound />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default RouteTable;