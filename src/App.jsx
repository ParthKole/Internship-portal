// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Common Pages
import HomePage from './common/pages/pages/HomePage';

// ================= STUDENT PAGES =================
import StudentLogin from './student/pages/StudentLogin';
import StudentRegister from './student/pages/StudentRegister';
import StudentDashboard from './student/pages/StudentDashboard';
import StudentInternshipsPage from './student/pages/InternshipsPage';
import StudentApplicationsPage from './student/pages/ApplicationsPage';
import StudentProfile from './student/pages/StudentProfile';
import StudentSettingsPage from './student/pages/SettingsPage';
import StudentMessagesPage from './student/pages/MessagesPage';

// ================= ADMIN PAGES =================
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import CompanyRequests from './admin/pages/CompanyRequests';
import ManageCompanies from './admin/pages/ManageCompanies';
import ManageStudents from './admin/pages/ManageStudents';
import ManageInternships from './admin/pages/ManageInternships';
import PlacementDrives from './admin/pages/PlacementDrives';
import Analytics from './admin/pages/Analytics';
import Announcements from './admin/pages/Announcements';
import AdminSettings from './admin/pages/Settings';

// ================= COMPANY PAGES =================
import CompanyLogin from './company/pages/CompanyLogin';
import CompanyRegister from './company/pages/CompanyRegister';
import CompanyLayout from './company/components/CompanyLayout';
import CompanyDashboard from "./company/pages/CompanyDashboard";
import CompanyProfile from './company/pages/CompanyProfile';
import CompanyInternshipsPage from './company/pages/InternshipsPage';
import CompanyApplicationsPage from './company/pages/ApplicationsPage';
import PostInternship from './company/pages/PostInternship';
import CandidatesPage from './company/pages/CandidatesPage';
import InterviewsPage from './company/pages/InterviewsPage';
import CompanyMessagesPage from './company/pages/MessagesPage';
import AnalyticsPage from './company/pages/AnalyticsPage';
import CompanySettingsPage from './company/pages/SettingsPage';

// ================= PROTECTED ROUTES =================
const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('studentToken');
  const userType = localStorage.getItem('userType');
  return token && userType === 'student'
    ? children
    : <Navigate to="/student/login" />;
};

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const userType = localStorage.getItem('userType');
  return token && userType === 'admin'
    ? children
    : <Navigate to="/admin/login" />;
};

const CompanyProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('companyToken');
  const userType = localStorage.getItem('userType');
  return token && userType === 'company'
    ? children
    : <Navigate to="/company/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Common */}
        <Route path="/" element={<HomePage />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        <Route path="/student/dashboard" element={
          <StudentProtectedRoute>
            <StudentDashboard />
          </StudentProtectedRoute>
        } />

        <Route path="/student/internships" element={
          <StudentProtectedRoute>
            <StudentInternshipsPage />
          </StudentProtectedRoute>
        } />

        <Route path="/student/applications" element={
          <StudentProtectedRoute>
            <StudentApplicationsPage />
          </StudentProtectedRoute>
        } />

        <Route path="/student/profile" element={
          <StudentProtectedRoute>
            <StudentProfile />
          </StudentProtectedRoute>
        } />

        <Route path="/student/settings" element={
          <StudentProtectedRoute>
            <StudentSettingsPage />
          </StudentProtectedRoute>
        } />

        <Route path="/student/messages" element={
          <StudentProtectedRoute>
            <StudentMessagesPage />
          </StudentProtectedRoute>
        } />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />

        <Route path="/admin/company-requests" element={<AdminProtectedRoute><CompanyRequests /></AdminProtectedRoute>} />
        <Route path="/admin/companies" element={<AdminProtectedRoute><ManageCompanies /></AdminProtectedRoute>} />
        <Route path="/admin/students" element={<AdminProtectedRoute><ManageStudents /></AdminProtectedRoute>} />
        <Route path="/admin/internships" element={<AdminProtectedRoute><ManageInternships /></AdminProtectedRoute>} />
        <Route path="/admin/drives" element={<AdminProtectedRoute><PlacementDrives /></AdminProtectedRoute>} />
        <Route path="/admin/analytics" element={<AdminProtectedRoute><Analytics /></AdminProtectedRoute>} />
        <Route path="/admin/announcements" element={<AdminProtectedRoute><Announcements /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />

        {/* ================= COMPANY ================= */}
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
          <Route path="internships" element={<CompanyInternshipsPage />} />
          <Route path="applications" element={<CompanyApplicationsPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="messages" element={<CompanyMessagesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<CompanySettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
