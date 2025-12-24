// src/admin/components/AdminHeader.jsx
import React from 'react';
import { Bell, Calendar, ShieldAlert, Home, Users, Building, Briefcase, Target, BarChart3, Megaphone, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/company-requests')) return 'Company Approval Requests';
    if (path.includes('/companies')) return 'Manage Companies';
    if (path.includes('/students')) return 'Manage Students';
    if (path.includes('/internships')) return 'Manage Internships';
    if (path.includes('/drives')) return 'Placement Drives';
    if (path.includes('/analytics')) return 'Analytics Dashboard';
    if (path.includes('/announcements')) return 'Announcements';
    if (path.includes('/settings')) return 'Settings';
    return 'Admin Dashboard';
  };

  // Get icon based on current route
  const getPageIcon = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return <Home size={20} className="text-[#4F46E5]" />;
    if (path.includes('/company-requests')) return <Building size={20} className="text-[#4F46E5]" />;
    if (path.includes('/companies')) return <Building size={20} className="text-[#4F46E5]" />;
    if (path.includes('/students')) return <Users size={20} className="text-[#4F46E5]" />;
    if (path.includes('/internships')) return <Briefcase size={20} className="text-[#4F46E5]" />;
    if (path.includes('/drives')) return <Target size={20} className="text-[#4F46E5]" />;
    if (path.includes('/analytics')) return <BarChart3 size={20} className="text-[#4F46E5]" />;
    if (path.includes('/announcements')) return <Megaphone size={20} className="text-[#4F46E5]" />;
    if (path.includes('/settings')) return <Settings size={20} className="text-[#4F46E5]" />;
    return <Home size={20} className="text-[#4F46E5]" />;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left - Dynamic Title */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center">
            {getPageIcon()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar size={14} className="mr-2" />
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Alerts */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative">
            <ShieldAlert size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-900">College Admin</p>
              <p className="text-xs text-[#4F46E5] font-medium">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;