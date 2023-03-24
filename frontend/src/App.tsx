import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import JobBoardPostings from './pages/JobBoardPostings';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';
import JobPosting from './pages/JobPosting';
import PrivateRoute from './components/PrivateRoute';
import CreatePostings from './pages/CreatePostings';
import UserApplications from './pages/UserApplications';
import JobApplicants from './pages/JobApplicants';
import NotFound from './pages/NotFound';
import EmployeeJobPostings from './pages/EmployeeJobPostings';
import ManagePostings from './pages/ManagePostings';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/job-postings'} element={<PrivateRoute />}>
              {/*Maybe StudentRoute, AdminRoute, CompanyRoute?*/}
              <Route path={'/job-postings'} element={<JobBoardPostings />} />
            </Route>

            <Route path={'/edit-profile'} element={<PrivateRoute />}>
              {/*Maybe StudentRoute, AdminRoute, CompanyRoute?*/}
              <Route path={'/edit-profile'} element={<EditProfile />} />
            </Route>

            <Route path={'/user-profile'} element={<PrivateRoute />}>
              {/*Maybe StudentRoute, AdminRoute, CompanyRoute?*/}
              <Route path={'/user-profile'} element={<UserProfile />} />
            </Route>

            <Route path={'/posting/:jobId'} element={<PrivateRoute />}>
              <Route path={'/posting/:jobId'} element={<JobPosting />} />
            </Route>

            <Route path={'/create-postings'} element={<PrivateRoute />}>
              <Route path={'/create-postings'} element={<CreatePostings />} />
            </Route>

            {/*
              Students can view their applications
            */}

            <Route path={'/manage-posting'} element={<PrivateRoute />}>
              <Route path={'/manage-posting/:jobId'} element={<ManagePostings />} />
            </Route>

            <Route path={'/user-applications'} element={<PrivateRoute />}>
              <Route
                path={'/user-applications'}
                element={<UserApplications />}
              />
            </Route>

            {/*
              View Applicants for a Job
            */}
            <Route path={'/job-applicants/:jobId'} element={<PrivateRoute />}>
              <Route
                path={'/job-applicants/:jobId'}
                element={<JobApplicants />}
              />
            </Route>

            <Route path='/*' element={<NotFound />} />

            <Route path={'/employee-job-postings'} element={<PrivateRoute />}>
              <Route path={'/employee-job-postings'} element={<EmployeeJobPostings />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
