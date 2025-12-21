// src/company/pages/CompanyDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  FileCheck,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  Award,
  Clock,
  Star,
  Filter,
  MessageSquare,
  BarChart3,
  Download,
  Eye,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Plus,
  Search,
  TrendingDown,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';

const CompanyDashboard = () => {
  const [stats, setStats] = useState([
    { 
      title: 'Active Internships', 
      value: '8', 
      icon: <Briefcase size={24} />, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: '+2 this month',
      trend: 'up'
    },
    { 
      title: 'Applications', 
      value: '156', 
      icon: <Users size={24} />, 
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      change: '+24% from last month',
      trend: 'up'
    },
    { 
      title: 'Shortlisted', 
      value: '42', 
      icon: <FileCheck size={24} />, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      change: '18 pending review',
      trend: 'steady'
    },
    { 
      title: 'Interviews', 
      value: '26', 
      icon: <TrendingUp size={24} />, 
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      change: '5 today',
      trend: 'up'
    },
  ]);

  const [recentApplications, setRecentApplications] = useState([
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      role: 'Frontend Developer Intern', 
      status: 'shortlisted',
      statusText: 'Shortlisted',
      date: 'Today, 10:30 AM',
      location: 'Mumbai, India',
      experience: '3rd Year CSE',
      match: 92,
      skills: ['React', 'JavaScript', 'Tailwind', 'Git'],
      avatar: 'RS',
      rating: 4.8,
      appliedDays: 1
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      role: 'Backend Developer Intern', 
      status: 'interview',
      statusText: 'Interview',
      date: 'Tomorrow, 2:00 PM',
      location: 'Bangalore, India',
      experience: '4th Year IT',
      match: 88,
      skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
      avatar: 'PP',
      rating: 4.5,
      appliedDays: 2
    },
    { 
      id: 3, 
      name: 'Amit Kumar', 
      role: 'Data Science Intern', 
      status: 'review',
      statusText: 'Under Review',
      date: 'Oct 28, 2024',
      location: 'Delhi, India',
      experience: 'Final Year CSE',
      match: 85,
      skills: ['Python', 'ML', 'TensorFlow', 'SQL'],
      avatar: 'AK',
      rating: 4.3,
      appliedDays: 3
    },
    { 
      id: 4, 
      name: 'Neha Gupta', 
      role: 'UX Design Intern', 
      status: 'applied',
      statusText: 'Applied',
      date: 'Oct 25, 2024',
      location: 'Hyderabad, India',
      experience: '3rd Year Design',
      match: 90,
      skills: ['Figma', 'UI/UX', 'Prototyping', 'Research'],
      avatar: 'NG',
      rating: 4.7,
      appliedDays: 5
    },
    { 
      id: 5, 
      name: 'Sandeep Reddy', 
      role: 'DevOps Intern', 
      status: 'rejected',
      statusText: 'Rejected',
      date: 'Oct 22, 2024',
      location: 'Chennai, India',
      experience: '4th Year CSE',
      match: 78,
      skills: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
      avatar: 'SR',
      rating: 4.0,
      appliedDays: 8
    },
  ]);

  const [activeInternships, setActiveInternships] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      type: 'Remote',
      duration: '3 months',
      applications: 45,
      deadline: '2024-11-15',
      status: 'Active',
      stipend: '₹15,000/month',
      location: 'Remote',
      skills: ['React', 'JavaScript', 'CSS'],
      postedDate: '2024-10-15'
    },
    {
      id: 2,
      title: 'Backend Developer Intern',
      type: 'On-site',
      duration: '6 months',
      applications: 32,
      deadline: '2024-11-30',
      status: 'Active',
      stipend: '₹20,000/month',
      location: 'Bangalore',
      skills: ['Node.js', 'Python', 'MongoDB'],
      postedDate: '2024-10-10'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      type: 'Hybrid',
      duration: '4 months',
      applications: 28,
      deadline: '2024-11-10',
      status: 'Active',
      stipend: '₹18,000/month',
      location: 'Mumbai',
      skills: ['Python', 'ML', 'Statistics'],
      postedDate: '2024-10-05'
    },
  ]);

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      candidate: 'Priya Patel',
      role: 'Backend Developer Intern',
      time: 'Today, 2:00 PM',
      duration: '45 mins',
      type: 'Technical Round',
      interviewer: 'John Doe (Tech Lead)',
      status: 'confirmed'
    },
    {
      id: 2,
      candidate: 'Rahul Sharma',
      role: 'Frontend Developer Intern',
      time: 'Tomorrow, 11:00 AM',
      duration: '60 mins',
      type: 'HR Round',
      interviewer: 'Sarah Smith (HR Manager)',
      status: 'scheduled'
    },
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState([
    { label: 'Response Rate', value: '94%', change: '+5%', trend: 'up' },
    { label: 'Time to Hire', value: '12 days', change: '-2 days', trend: 'down' },
    { label: 'Offer Acceptance', value: '78%', change: '+8%', trend: 'up' },
    { label: 'Candidate NPS', value: '82', change: '+12', trend: 'up' },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      shortlisted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      interview: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      review: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      applied: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
      rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    };
    return colors[status] || colors.applied;
  };

  const companyData = JSON.parse(localStorage.getItem('companyProfile') || '{}');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {companyData.contactPerson || 'Team'}! 👋</h1>
              <p className="text-blue-100 max-w-2xl">Here's what's happening with your hiring process today. You have {upcomingInterviews.length} interviews scheduled.</p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Award size={18} className="text-yellow-300" />
                  <span className="text-sm">Company Rating: 4.8/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={18} className="text-blue-200" />
                  <span className="text-sm">156 Active Candidates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target size={18} className="text-emerald-300" />
                  <span className="text-sm">8 Open Positions</span>
                </div>
              </div>
            </div>
            <Link 
              to="/company/post-internship"
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              + Post New Internship
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <div className="flex items-end space-x-2 mt-2">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 
                    stat.trend === 'down' ? 'bg-red-50 text-red-700' : 
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <div className={`${stat.iconColor}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                {stat.trend === 'up' ? (
                  <TrendingUpIcon size={16} className="text-emerald-500 mr-2" />
                ) : stat.trend === 'down' ? (
                  <TrendingDown size={16} className="text-red-500 mr-2" />
                ) : (
                  <ClockIcon size={16} className="text-amber-500 mr-2" />
                )}
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                  <p className="text-gray-600 text-sm mt-1">Latest candidate applications for review</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                  <Link 
                    to="/company/applications"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentApplications.map((app) => {
                const statusColors = getStatusColor(app.status);
                return (
                  <div key={app.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {app.avatar}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="font-bold text-gray-900">{app.name}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} ${statusColors.border} border`}>
                              {app.statusText}
                            </span>
                          </div>
                          <p className="text-gray-700 font-medium text-sm mt-1">{app.role}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <MapPin size={12} className="mr-1.5" />
                              {app.location}
                            </span>
                            <span className="flex items-center">
                              <Users size={12} className="mr-1.5" />
                              {app.experience}
                            </span>
                            <span className="flex items-center">
                              <Star size={12} className="mr-1.5 text-amber-500" />
                              {app.rating}/5
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {app.skills.map((skill, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">{app.match}%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                        <div className="text-xs text-gray-500 mt-2">{app.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        Applied {app.appliedDays} day{app.appliedDays !== 1 ? 's' : ''} ago
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                          <Eye size={16} className="mr-2" />
                          View Profile
                        </button>
                        <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Internships */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Active Internships</h2>
                <p className="text-gray-600 text-sm mt-1">Your currently open internship positions</p>
              </div>
              <Link 
                to="/company/internships"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
              >
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeInternships.map((internship) => (
                <div key={internship.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{internship.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">
                          {internship.type}
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          {internship.duration}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      {internship.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Applications</span>
                      <span className="font-bold text-gray-900">{internship.applications}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stipend</span>
                      <span className="font-bold text-emerald-600 flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {internship.stipend}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium text-gray-900">{internship.deadline}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      View Apps
                    </button>
                    <button className="flex-1 px-3 py-2 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/company/post-internship"
                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm flex items-center justify-center group"
              >
                <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                Post New Internship
              </Link>
              
              <Link 
                to="/company/interviews"
                className="block w-full px-4 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Calendar size={18} className="mr-2" />
                Schedule Interviews
              </Link>
              
              <button className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Download size={18} className="mr-2" />
                Export Reports
              </button>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Upcoming Interviews</h3>
                <p className="text-gray-600 text-sm mt-1">{upcomingInterviews.length} scheduled today</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {upcomingInterviews.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{interview.candidate}</h4>
                      <p className="text-sm text-gray-600">{interview.role}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      interview.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {interview.status === 'confirmed' ? 'Confirmed' : 'Scheduled'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      {interview.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={14} className="mr-2" />
                      {interview.duration} • {interview.type}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={14} className="mr-2" />
                      {interview.interviewer}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Join Call
                    </button>
                    <button className="flex-1 px-3 py-2 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/company/interviews"
              className="block w-full mt-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors text-center font-medium"
            >
              + Schedule New Interview
            </Link>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Performance Metrics</h3>
                <p className="text-gray-600 text-sm mt-1">Your hiring efficiency</p>
              </div>
              <BarChart3 size={20} className="text-blue-600" />
            </div>
            
            <div className="space-y-5">
              {performanceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <div className="flex items-center">
                      <span className="font-bold text-gray-900 text-lg mr-2">{metric.value}</span>
                      <span className={`flex items-center text-xs font-medium px-2 py-1 rounded ${
                        metric.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon size={12} className="mr-1" />
                        ) : (
                          <TrendingDown size={12} className="mr-1" />
                        )}
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-600' :
                        index === 1 ? 'bg-purple-600' :
                        index === 2 ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${85 - (index * 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Zap size={20} className="text-emerald-600 mr-3" />
              <h3 className="font-bold text-gray-900">Quick Tips</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-700">
                <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                Review applications within 48 hours for better candidate experience
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                Use our AI matching to shortlist top 5% candidates
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                Complete your company profile to attract 3x more applicants
              </li>
            </ul>
            <button className="w-full mt-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              View All Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;