import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Tweet from '../pages/Tweet';


const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Tweet" element={<Tweet />} />
      </Routes>
    </Router>
  
  
    )
}


export default PageRouter;