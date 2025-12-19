// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Common Pages
import HomePage from './common/pages/pages/HomePage';

// Student Pages
import StudentLogin from './student/pages/StudentLogin';
import StudentRegister from './student/pages/StudentRegister';
import StudentDashboard from './student/pages/StudentDashboard';
import InternshipsPage from './student/pages/InternshipsPage';
import ApplicationsPage from './student/pages/ApplicationsPage';
import StudentProfile from './student/pages/StudentProfile';
import SettingsPage from './student/pages/SettingsPage';
import MessagesPage from './student/pages/MessagesPage';

// Admin Pages
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminLogin from './admin/pages/AdminLogin';
import AdminRegister from './admin/pages/AdminRegister';

// Company Pages
import CompanyLogin from './company/pages/CompanyLogin';
import CompanyRegister from './company/pages/CompanyRegister';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('studentToken');
  if (!token) {
    return <Navigate to="/student/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        
        {/* Protected Student Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/student/internships" element={
          <ProtectedRoute>
            <InternshipsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/student/applications" element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/student/profile" element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        } />
        
        <Route path="/student/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/student/messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;