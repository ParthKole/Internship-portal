// src/student/components/Header.jsx - UPDATED VERSION
import React, { useState } from 'react';
import { Search, Bell, Calendar, ChevronDown, Settings, HelpCircle } from 'lucide-react';

const Header = ({ title = "Dashboard" }) => {
  const [notifications] = useState([
    { id: 1, text: 'Interview scheduled with Google', time: '2 hours ago', read: false },
    { id: 2, text: 'New internship matching your profile', time: '5 hours ago', read: false },
    { id: 3, text: 'Profile completion reminder', time: '1 day ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Title and Breadcrumb */}
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
            <span>Student Portal</span>
            <ChevronDown size={12} className="transform -rotate-90" />
            <span className="text-gray-700 font-medium">{title}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar size={14} className="mr-1" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Right: Search and Profile */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search applications, companies..."
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Help Button */}
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <HelpCircle size={20} />
            </button>

            {/* Settings Button */}
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <Settings size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown (Optional) */}
              {/* <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 hidden">
                {/* Dropdown content */}
              {/* </div> */}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Rahul Sharma</p>
                <p className="text-xs text-[#4F46E5] font-medium">Profile: 87%</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
                  RS
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;