import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import JobPostings from './pages/JobBoardPostings';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';

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
            <Route path={'/job-postings'} element={<JobPostings />} />
            <Route path={'/edit-profile'} element={<EditProfile />} />
            <Route path={'/user-profile'} element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
