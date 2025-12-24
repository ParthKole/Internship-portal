import React, { useState, useEffect } from 'react';
import { Search, Bell, Calendar, ChevronDown, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title = "Dashboard", user, studentProfile }) => {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate profile completion based on StudentProfile schema fields
  useEffect(() => {
    if (!studentProfile) {
      setCompletionPercentage(0);
      return;
    }

    // specific fields from your StudentProfile schema
    const fieldsToCheck = [
      studentProfile.personalInfo?.firstName,
      studentProfile.personalInfo?.lastName,
      studentProfile.personalInfo?.phone,
      studentProfile.academic?.university,
      studentProfile.academic?.degree,
      studentProfile.skills?.programmingLanguages?.length > 0,
      studentProfile.projects?.length > 0,
      studentProfile.socialLinks?.linkedin
    ];

    const filledFields = fieldsToCheck.filter(Boolean).length;
    const totalFields = fieldsToCheck.length;
    setCompletionPercentage(Math.round((filledFields / totalFields) * 100));
  }, [studentProfile]);

  // Fallback display name logic
  const displayName = user?.name || 
    (studentProfile?.personalInfo?.firstName 
      ? `${studentProfile.personalInfo.firstName} ${studentProfile.personalInfo.lastName}` 
      : "Student");
      
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section: Title & Date */}
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
            <span>Student Portal</span>
            <ChevronDown size={12} className="transform -rotate-90" />
            <span className="text-gray-700 font-medium">{title}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
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

        {/* Right Section: Search & Profile */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>

          {/* Icons & User Info */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={20} />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
              <Settings size={20} />
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                <p className={`text-xs font-medium ${
                  completionPercentage === 100 ? 'text-green-600' : 'text-[#4F46E5]'
                }`}>
                  Profile: {completionPercentage}%
                </p>
              </div>
              
              <div 
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/student/profile')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                  {initials}
                </div>
                {/* Online Indicator */}
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