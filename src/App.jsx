import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Pages
import HomePage from './common/pages/pages/HomePage';

// Student Pages
import StudentLogin from './student/pages/StudentLogin';
import StudentRegister from './student/pages/StudentRegister';
import InternshipsPage from './student/pages/InternshipsPage';

// Admin Pages
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminLogin from './admin/pages/AdminLogin';
import AdminRegister from './admin/pages/AdminRegister';

// Company Pages
import CompanyLogin from './company/pages/CompanyLogin';
import CompanyRegister from './company/pages/CompanyRegister';

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/dashboard" element={<InternshipsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;