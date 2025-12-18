import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building,
  Users,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Students" },
    { icon: Building, label: "Companies" },
    { icon: Briefcase, label: "Internships" },
    { icon: FileText, label: "Applications" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        {!isCollapsed ? (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center">
              <Building className="text-white" size={18} />
            </div>
            <span className="ml-3 font-bold text-gray-900">Admin Portal</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center mx-auto">
            <Building className="text-white" size={18} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <button className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${item.active ? 'bg-[#4F46E5] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <item.icon size={20} />
                {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100">
        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
        
        {/* Help & Logout */}
        <div className="mt-4 space-y-1">
          <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <HelpCircle size={18} />
            {!isCollapsed && <span className="ml-3 text-sm">Help Center</span>}
          </button>
          <button className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={18} />
            {!isCollapsed && <span className="ml-3 text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;