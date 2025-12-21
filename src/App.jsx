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
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import CompanyRequests from './admin/pages/CompanyRequests';
import ManageCompanies from './admin/pages/ManageCompanies';
import ManageStudents from './admin/pages/ManageStudents';
import ManageInternships from './admin/pages/ManageInternships';
import PlacementDrives from './admin/pages/PlacementDrives';
import Analytics from './admin/pages/Analytics';
import Announcements from './admin/pages/Announcements';
import Settings from './admin/pages/Settings';

// Company Pages
import CompanyLayout from './company/components/CompanyLayout';
import CompanyDashboard from './company/pages/CompanyDashboard';
import CompanyProfile from './company/pages/CompanyProfile';
import ApplicationsPage from './company/pages/ApplicationsPage';
import PostInternship from './company/pages/PostInternship';
import InternshipsPage from './company/pages/InternshipsPage';
import CandidatesPage from './company/pages/CandidatesPage';
import InterviewsPage from './company/pages/InterviewsPage';
import MessagesPage from './company/pages/MessagesPage';
import AnalyticsPage from './company/pages/AnalyticsPage';
import SettingsPage from './company/pages/SettingsPage';

// Protected Route Components
const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('studentToken');
  const userType = localStorage.getItem('userType');
  
  if (!token || userType !== 'student') {
    return <Navigate to="/student/login" />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const userType = localStorage.getItem('userType');
  
  if (!token || userType !== 'admin') {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

const CompanyProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('companyToken');
  const userType = localStorage.getItem('userType');
  
  if (!token || userType !== 'company') {
    return <Navigate to="/company/login" />;
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
          <StudentProtectedRoute>
            <StudentDashboard />
          </StudentProtectedRoute>
        } />
        
        <Route path="/student/internships" element={
          <StudentProtectedRoute>
            <InternshipsPage />
          </StudentProtectedRoute>
        } />
        
        <Route path="/student/applications" element={
          <StudentProtectedRoute>
            <ApplicationsPage />
          </StudentProtectedRoute>
        } />
        
        <Route path="/student/profile" element={
          <StudentProtectedRoute>
            <StudentProfile />
          </StudentProtectedRoute>
        } />
        
        <Route path="/student/settings" element={
          <StudentProtectedRoute>
            <SettingsPage />
          </StudentProtectedRoute>
        } />
        
        <Route path="/student/messages" element={
          <StudentProtectedRoute>
            <MessagesPage />
          </StudentProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Admin Register removed as per spec */}
        
        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/company-requests" element={
          <AdminProtectedRoute>
            <CompanyRequests />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/companies" element={
          <AdminProtectedRoute>
            <ManageCompanies />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/students" element={
          <AdminProtectedRoute>
            <ManageStudents />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/internships" element={
          <AdminProtectedRoute>
            <ManageInternships />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/drives" element={
          <AdminProtectedRoute>
            <PlacementDrives />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/analytics" element={
          <AdminProtectedRoute>
            <Analytics />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/announcements" element={
          <AdminProtectedRoute>
            <Announcements />
          </AdminProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <AdminProtectedRoute>
            <Settings />
          </AdminProtectedRoute>
        } />
        
        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        
       <Route path="/company" element={
  <CompanyProtectedRoute>
    <CompanyLayout />
  </CompanyProtectedRoute>
}>
  <Route index element={<Navigate to="dashboard" />} />
  <Route path="dashboard" element={<CompanyDashboard />} />
  <Route path="profile" element={<CompanyProfile />} />
  <Route path="post-internship" element={<PostInternship />} />
  <Route path="internships" element={<InternshipsPage />} />
  <Route path="applications" element={<ApplicationsPage />} />
  <Route path="candidates" element={<CandidatesPage />} />
  <Route path="interviews" element={<InterviewsPage />} />
  <Route path="messages" element={<MessagesPage />} />
  <Route path="analytics" element={<AnalyticsPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;