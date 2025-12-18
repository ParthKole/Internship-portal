import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const AdminSidebar = ({ isCollapsed = false, toggleSidebar = () => {} }) => {
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Company Approvals', icon: <Building2 size={20} /> },
    { label: 'Manage Internships', icon: <Briefcase size={20} /> },
    { label: 'Manage Students', icon: <Users size={20} /> },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 transition-all duration-300`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
        )}

        {isCollapsed && (
          <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center mx-auto">
            <ShieldCheck size={22} className="text-white" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
            } rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition`}
          >
            {item.icon}
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
            AD
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">College Authority</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
