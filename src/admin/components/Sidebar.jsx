import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Building,
  FileText,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  // ONLY the items you want
  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home size={20} /> },
    { label: 'Students', path: '/admin/students', icon: <Users size={20} /> },
    { label: 'Companies', path: '/admin/companies', icon: <Building size={20} /> },
    { label: 'Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { label: 'Placements', path: '/admin/placements', icon: <UserCheck size={20} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-40 transition-all duration-300 shadow-sm`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <NavLink to="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Shield size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AdminPortal</h1>
            </NavLink>
          )}
          {isCollapsed && (
            <NavLink to="/admin/dashboard" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto">
              <Shield size={22} className="text-white" />
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

      {/* Navigation - ONLY the items you want */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-3'} rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Admin User</h3>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;