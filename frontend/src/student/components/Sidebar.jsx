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
  LogOut
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar, user, studentProfile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all storage keys related to student session
    localStorage.removeItem('studentToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    
    // Redirect to login
    navigate('/student/login');
  };

  // Logic to determine display name and title
  const userName = user?.name || "Student";
  const userTitle = studentProfile?.academic?.degree 
    ? `${studentProfile.academic.degree}` 
    : "Engineering Student";
  
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const menuItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: <Home size={20} /> },
    { label: 'My Profile', path: '/student/profile', icon: <User size={20} /> },
    { label: 'Internships', path: '/student/internships', icon: <Briefcase size={20} /> },
    { label: 'Applications', path: '/student/applications', icon: <BarChart3 size={20} /> },
    { label: 'Messages', path: '/student/messages', icon: <MessageSquare size={20} /> },
    { label: 'Settings', path: '/student/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      {/* 1. Header / Logo Area */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/student/dashboard')}
            >
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center shadow-sm">
                <Briefcase size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">InternPortal</h1>
                <p className="text-xs text-gray-500 mt-1">Student Panel</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div 
              className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center mx-auto cursor-pointer shadow-sm"
              onClick={() => navigate('/student/dashboard')}
            >
              <Briefcase size={22} className="text-white" />
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* 2. Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/student/dashboard'}
            className={({ isActive }) =>
              `flex items-center ${
                isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-3'
              } rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            title={isCollapsed ? item.label : ""}
          >
            <div className={({ isActive }) => isActive ? "text-white" : "group-hover:text-[#4F46E5]"}>
               {item.icon}
            </div>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. User Profile Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {userInitials}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{userName}</h3>
              <p className="text-xs text-gray-500 truncate">{userTitle}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className={`mt-4 ${
            !isCollapsed ? 'w-full px-4 py-2.5' : 'w-full p-2'
          } bg-white border border-gray-200 text-red-500 font-medium rounded-lg hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center shadow-sm`}
          title="Logout"
        >
          <LogOut size={16} className={!isCollapsed ? "mr-2" : ""} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;