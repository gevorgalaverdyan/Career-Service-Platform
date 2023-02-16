import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path={'/'} element={<Login/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
