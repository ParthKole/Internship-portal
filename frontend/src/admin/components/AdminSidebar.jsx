// src/admin/components/AdminSidebar.jsx
import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Building,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Target,
  BarChart3,
  Megaphone,
  Settings,
  FileText,
  Calendar,
  Bell,
  LogOut
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed = false, toggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { label: 'Company Approvals', icon: <Building2 size={20} />, path: '/admin/company-requests' },
    { label: 'Manage Companies', icon: <Building size={20} />, path: '/admin/companies' },
    { label: 'Manage Students', icon: <Users size={20} />, path: '/admin/students' },
    { label: 'Manage Internships', icon: <Briefcase size={20} />, path: '/admin/internships' },
    { label: 'Placement Drives', icon: <Target size={20} />, path: '/admin/drives' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
    { label: 'Announcements', icon: <Megaphone size={20} />, path: '/admin/announcements' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userType');
    navigate('/admin/login');
  };

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          </div>
        )}

        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center mx-auto">
            <ShieldCheck size={22} className="text-white" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
            } rounded-lg cursor-pointer text-gray-700 hover:bg-[#4F46E5]/5 hover:text-[#4F46E5] transition-colors ${
              location.pathname === item.path ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : ''
            }`}
          >
            {item.icon}
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">college@admin.edu</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;