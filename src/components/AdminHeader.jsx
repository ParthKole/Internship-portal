import React from 'react';
import { Bell, Calendar, ShieldAlert } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar size={14} className="mr-1" />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
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
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
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
