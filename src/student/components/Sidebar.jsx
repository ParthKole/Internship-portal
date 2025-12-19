// src/student/components/Sidebar.jsx - UPDATED VERSION
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  HelpCircle,
  Award
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: <Home size={20} /> },
    { label: 'My Profile', path: '/student/profile', icon: <User size={20} /> },
    { label: 'Internships', path: '/student/internships', icon: <Briefcase size={20} /> },
    { label: 'Applications', path: '/student/applications', icon: <BarChart3 size={20} /> },
    { label: 'Messages', path: '/student/messages', icon: <MessageSquare size={20} /> },
    { label: 'Settings', path: '/student/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    navigate('/student/login');
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <NavLink to="/student/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                <Briefcase size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InternPortal</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </NavLink>
          )}
          {isCollapsed && (
            <NavLink to="/student/dashboard" className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center mx-auto">
              <Briefcase size={22} className="text-white" />
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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/student/dashboard'}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-3'} rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-sm'
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

        {/* Quick Links */}
        {/* {!isCollapsed && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
              Quick Links
            </h3>
            <div className="space-y-1">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={16} className="mr-3" />
                Notifications
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Award size={16} className="mr-3" />
                Certifications
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <HelpCircle size={16} className="mr-3" />
                Help & Support
              </a>
            </div>
          </div>
        )} */}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
              RS
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Rahul Sharma</h3>
              <p className="text-xs text-gray-500">Computer Science Student</p>
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

export default Sidebar;