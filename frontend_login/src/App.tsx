import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from './HomePage';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
