// src/company/components/CompanySidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Building,
  Briefcase,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  Bell,
  HelpCircle,
  Calendar,
  UserCheck,
  Filter,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';

const CompanySidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const companyData = JSON.parse(localStorage.getItem('companyProfile') || '{}');

  const menuItems = [
    { label: 'Dashboard', path: '/company/dashboard', icon: <Home size={20} /> },
    { label: 'Company Profile', path: '/company/profile', icon: <Building size={20} /> },
    { label: 'Post Internship', path: '/company/post-internship', icon: <Briefcase size={20} /> },
    { label: 'My Internships', path: '/company/internships', icon: <FileText size={20} /> },
    { label: 'Applications', path: '/company/applications', icon: <Users size={20} /> },
    { label: 'Candidates Pool', path: '/company/candidates', icon: <UserCheck size={20} /> },
    { label: 'Interview Schedule', path: '/company/interviews', icon: <Calendar size={20} /> },
    { label: 'Messages', path: '/company/messages', icon: <MessageSquare size={20} /> },
    { label: 'Analytics', path: '/company/analytics', icon: <BarChart3 size={20} /> },
    { label: 'Settings', path: '/company/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('companyToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyProfile');
    navigate('/company/login');
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <NavLink to="/company/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <Building size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InternConnect</h1>
                <p className="text-xs text-gray-500">Company Portal</p>
              </div>
            </NavLink>
          )}
          {isCollapsed && (
            <NavLink to="/company/dashboard" className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto">
              <Building size={22} className="text-white" />
            </NavLink>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700">Verified</span>
              <Award size={12} className="text-blue-600" />
            </div>
            <div className="text-sm font-bold text-gray-900">{companyData.companyName?.substring(0, 20) || 'Company'}</div>
            <div className="text-xs text-gray-600 mt-1">
              {companyData.employeeCount ? `${companyData.employeeCount} employees` : 'Setup profile'}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/company/dashboard'}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-3'} rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-bold">
              {companyData.companyName?.charAt(0) || 'C'}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{companyData.contactPerson || 'Admin'}</h3>
              <p className="text-xs text-gray-500">{companyData.designation || 'Recruiter'}</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button
            onClick={handleLogout}
            className="w-full mt-4 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        )}
        
        {isCollapsed && (
          <button
            onClick={handleLogout}
            className="w-full mt-4 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanySidebar;