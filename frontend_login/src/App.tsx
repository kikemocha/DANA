import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from './HomePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
