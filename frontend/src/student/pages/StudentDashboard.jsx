import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Briefcase,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  ChevronRight,
  Download,
  Edit,
  MapPin,
  Building,
  DollarSign,
  BarChart3,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import api from '../../utils/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for dynamic data from backend
  const [stats, setStats] = useState({ applied: 0, shortlisted: 0, interviews: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [userName, setUserName] = useState('Student');
  const [loading, setLoading] = useState(true);

  // Static/Placeholder data for UI elements not yet in backend
  const schedule = [
    { time: '10:00 AM', title: 'Mock Interview', type: 'interview', with: 'Career Guidance Cell' },
    { time: '2:00 PM', title: 'DSA Workshop', type: 'workshop', with: 'CodeMaster Academy' },
  ];

  const weeklyGoals = [
    { goal: 'Apply to 5 companies', completed: 3, total: 5 },
    { goal: 'Solve 20 coding problems', completed: 12, total: 20 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/student/dashboard-stats');
        if (res.data) {
          setStats(res.data.stats);
          // Backend returns 'recentApplications'
          setRecentApps(res.data.recentApplications || []);
          setUserName(res.data.profileName || 'Student');
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        if (err.response?.status === 401) {
          navigate('/student/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statsDisplay = [
    { label: 'Applied', value: stats.applied, icon: Briefcase, color: 'text-[#4F46E5]', bg: 'bg-[#4F46E5]/10', change: 'Total' },
    { label: 'Shortlisted', value: stats.shortlisted, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-100', change: 'Accepted' },
    { label: 'Interviews', value: stats.interviews, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100', change: 'Scheduled' },
    { label: 'Profile Score', value: '87%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100', change: 'Good' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
       <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title="Dashboard" user={{ name: userName }} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {userName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}!</h1>
                    <p className="text-gray-600 mt-1">Ready to find your next opportunity?</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button onClick={() => navigate('/student/profile')} className="px-4 py-2 bg-white border border-[#4F46E5] text-[#4F46E5] rounded-lg font-medium hover:bg-[#4F46E5]/5 flex items-center transition-colors">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsDisplay.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{stat.change}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Applications */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                        <p className="text-gray-600 text-sm">Your latest internship applications</p>
                      </div>
                      <button 
                        onClick={() => navigate('/student/applications')}
                        className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA] flex items-center"
                      >
                        View All <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {recentApps.length > 0 ? (
                        recentApps.map((app, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-700">
                                        <Briefcase size={20} />
                                    </span>
                                </div>
                                <div>
                                    {/* Handle potentially deleted internships or missing data */}
                                    <h3 className="font-semibold text-gray-900">
                                      {app.internshipId?.title || 'Unknown Role'}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                      {/* Note: companyId is not deep populated in your backend, so we check for name or fallback */}
                                      {app.internshipId?.companyId?.name || app.internshipId?.location || 'Company'}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                      <span className="flex items-center">
                                          <DollarSign size={12} className="mr-1" />
                                          {app.internshipId?.stipend ? `₹${app.internshipId.stipend}` : 'Unpaid'}
                                      </span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                app.status === 'accepted' 
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : app.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No applications yet. Start applying to internships!
                        </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Schedule & Goals */}
              <div className="space-y-6">
                {/* Schedule (Static Placeholder) */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {schedule.map((event, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-xl">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <p className="text-sm text-gray-600">{event.with}</p>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {event.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Weekly Goals (Static Placeholder) */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                   <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Goals</h2>
                   <div className="space-y-4">
                      {weeklyGoals.map((goal, index) => (
                        <div key={index}>
                           <div className="flex justify-between text-sm mb-1">
                              <span>{goal.goal}</span>
                              <span className="text-gray-500">{goal.completed}/{goal.total}</span>
                           </div>
                           <div className="h-2 bg-gray-100 rounded-full">
                              <div className="h-2 bg-blue-600 rounded-full" style={{width: `${(goal.completed/goal.total)*100}%`}}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;