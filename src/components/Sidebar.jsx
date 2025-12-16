import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { label: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { label: 'My Profile', path: '/profile', icon: <User size={20} /> },
    { label: 'Internships', path: '/internships', icon: <Briefcase size={20} /> },
    { label: 'Applications', path: '/applications', icon: <BarChart3 size={20} /> },
    { label: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 transition-all duration-300`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                <Briefcase size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">InternPortal</h1>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center mx-auto">
              <Briefcase size={22} className="text-white" />
            </div>
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
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
              MS
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Madhura S.</h3>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;