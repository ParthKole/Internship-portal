// src/student/pages/ApplicationsPage.jsx - CORRECTED THEME COLORS
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  CheckCircle, Clock, AlertCircle, XCircle, FileText,
  Calendar, Building, MapPin, DollarSign, TrendingUp,
  BarChart, Filter, Search, Eye, MessageSquare, Download,
  ChevronRight, Star, Users, Target, Award, Briefcase,
  ChevronDown, ExternalLink, PieChart, Activity
} from 'lucide-react';

const ApplicationsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    {
      id: 1,
      company: 'Barclays',
      logo: 'B',
      role: 'Technology Analyst Intern',
      status: 'shortlisted',
      statusText: 'Shortlisted',
      appliedDate: 'Dec 15, 2024',
      interviewDate: 'Dec 20, 2024',
      location: 'London, UK',
      salary: '₹85,000/month',
      match: 95,
      stage: 'Technical Interview',
      nextStep: 'Prepare for technical round - DSA & System Design',
      lastUpdate: '2 days ago',
      companyType: 'Investment Banking',
      timeline: [
        { stage: 'Applied', date: 'Dec 15', completed: true },
        { stage: 'Online Test', date: 'Dec 18', completed: true },
        { stage: 'Technical Interview', date: 'Dec 20', upcoming: true },
        { stage: 'HR Interview', date: 'TBD', upcoming: false },
        { stage: 'Offer', date: 'TBD', upcoming: false }
      ]
    },
    {
      id: 2,
      company: 'PhonePe',
      logo: 'P',
      role: 'Backend Engineer Intern',
      status: 'assessment',
      statusText: 'Assessment',
      appliedDate: 'Dec 12, 2024',
      interviewDate: null,
      location: 'Bengaluru, India',
      salary: '₹65,000/month',
      match: 92,
      stage: 'Online Assessment',
      nextStep: 'Complete coding challenge by Dec 20',
      lastUpdate: '1 day ago',
      companyType: 'FinTech',
      timeline: [
        { stage: 'Applied', date: 'Dec 12', completed: true },
        { stage: 'Online Assessment', date: 'Dec 20', upcoming: true },
        { stage: 'Technical Interview', date: 'TBD', upcoming: false },
        { stage: 'Managerial Round', date: 'TBD', upcoming: false },
        { stage: 'Offer', date: 'TBD', upcoming: false }
      ]
    },
    {
      id: 3,
      company: 'BNY Mellon',
      logo: 'BNY',
      role: 'Software Development Intern',
      status: 'interview',
      statusText: 'Interview',
      appliedDate: 'Dec 10, 2024',
      interviewDate: 'Dec 18, 2024',
      location: 'Pune, India',
      salary: '₹55,000/month',
      match: 88,
      stage: 'HR Discussion',
      nextStep: 'Final round with team lead',
      lastUpdate: '3 hours ago',
      companyType: 'Financial Services',
      timeline: [
        { stage: 'Applied', date: 'Dec 10', completed: true },
        { stage: 'Online Test', date: 'Dec 12', completed: true },
        { stage: 'Technical Interview', date: 'Dec 15', completed: true },
        { stage: 'HR Discussion', date: 'Dec 18', upcoming: true },
        { stage: 'Offer', date: 'TBD', upcoming: false }
      ]
    },
    {
      id: 4,
      company: 'Goldman Sachs',
      logo: 'GS',
      role: 'Quantitative Analyst Intern',
      status: 'rejected',
      statusText: 'Rejected',
      appliedDate: 'Nov 28, 2024',
      interviewDate: null,
      location: 'Mumbai, India',
      salary: '₹90,000/month',
      match: 85,
      stage: 'Not Selected',
      nextStep: 'Review feedback and apply to similar roles',
      lastUpdate: '1 week ago',
      companyType: 'Investment Banking',
      timeline: [
        { stage: 'Applied', date: 'Nov 28', completed: true },
        { stage: 'Online Test', date: 'Dec 5', completed: true },
        { stage: 'Technical Interview', date: 'Dec 10', completed: true },
        { stage: 'Rejected', date: 'Dec 12', completed: true }
      ]
    },
    {
      id: 5,
      company: 'Amazon',
      logo: 'A',
      role: 'SDE Intern',
      status: 'offer',
      statusText: 'Offer Received',
      appliedDate: 'Dec 1, 2024',
      interviewDate: 'Dec 5, 2024',
      location: 'Bengaluru, India',
      salary: '₹70,000/month',
      match: 91,
      stage: 'Offer Stage',
      nextStep: 'Review and accept offer by Dec 25',
      lastUpdate: 'Yesterday',
      companyType: 'E-commerce',
      timeline: [
        { stage: 'Applied', date: 'Dec 1', completed: true },
        { stage: 'Online Assessment', date: 'Dec 3', completed: true },
        { stage: 'Interview 1', date: 'Dec 5', completed: true },
        { stage: 'Interview 2', date: 'Dec 8', completed: true },
        { stage: 'Offer', date: 'Dec 10', completed: true }
      ]
    },
    {
      id: 6,
      company: 'Deutsche Bank',
      logo: 'DB',
      role: 'Technology Analyst Intern',
      status: 'applied',
      statusText: 'Applied',
      appliedDate: 'Dec 14, 2024',
      interviewDate: null,
      location: 'Pune, India',
      salary: '₹60,000/month',
      match: 87,
      stage: 'Under Review',
      nextStep: 'Wait for response - expected in 3-5 days',
      lastUpdate: '5 days ago',
      companyType: 'Banking',
      timeline: [
        { stage: 'Applied', date: 'Dec 14', completed: true },
        { stage: 'Under Review', date: 'Dec 15', completed: true },
        { stage: 'Next Steps', date: 'TBD', upcoming: false }
      ]
    }
  ];

  const stats = [
    { label: 'Total Applications', value: applications.length, change: '+3', color: 'text-[#4F46E5]', bg: 'bg-[#4F46E5]/10' },
    { label: 'Under Review', value: 3, change: '+1', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
    { label: 'Interview Stages', value: 2, change: '0', color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
    { label: 'Success Rate', value: '28%', change: '+3%', color: 'text-[#D97706]', bg: 'bg-[#D97706]/10' }
  ];

  const statusFilters = [
    { id: 'all', label: 'All', count: applications.length, color: 'bg-gray-500' },
    { id: 'shortlisted', label: 'Shortlisted', count: 1, color: 'bg-[#4F46E5]' },
    { id: 'interview', label: 'Interview', count: 1, color: 'bg-[#7C3AED]' },
    { id: 'assessment', label: 'Assessment', count: 1, color: 'bg-[#D97706]' },
    { id: 'applied', label: 'Applied', count: 1, color: 'bg-gray-400' },
    { id: 'offer', label: 'Offer', count: 1, color: 'bg-[#059669]' },
    { id: 'rejected', label: 'Rejected', count: 1, color: 'bg-[#DC2626]' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'offer': return 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20';
      case 'shortlisted': return 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20';
      case 'interview': return 'bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20';
      case 'assessment': return 'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20';
      case 'applied': return 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'rejected': return 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab !== 'all' && app.status !== activeTab) return false;
    if (searchTerm && !app.company.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !app.role.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title="Applications" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-gray-600 mb-2">Track and manage your applications</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Activity size={16} className="mr-2" />
                      {filteredApplications.length} active applications
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download size={18} className="mr-2" />
                  Export
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <TrendingUp className={stat.color} size={24} />
                      </div>
                    </div>
                    <div className={`text-xs font-medium mt-2 ${parseInt(stat.change) > 0 ? 'text-[#059669]' : 'text-gray-500'}`}>
                      {stat.change} this month
                    </div>
                  </div>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by company, role, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                        <option>Sort by: Latest</option>
                        <option>Sort by: Match Score</option>
                        <option>Sort by: Deadline</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button className="flex items-center px-4 py-2.5 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                      <Filter size={16} className="mr-2" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {statusFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTab(filter.id)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                      activeTab === filter.id
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="capitalize">{filter.label}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      activeTab === filter.id
                        ? 'bg-[#4338CA] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Applications List */}
              <div className="lg:col-span-2">
                {/* Applications List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Application Timeline</h2>
                      <span className="text-sm text-gray-600">
                        Showing {filteredApplications.length} of {applications.length} applications
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {filteredApplications.map((app) => (
                      <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          {/* Company Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {app.logo}
                            </div>
                          </div>

                          {/* Application Details */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                              <div className="mb-4 md:mb-0">
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                  <h3 className="text-lg font-bold text-gray-900">{app.company}</h3>
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                                    {app.statusText}
                                  </span>
                                </div>
                                <h4 className="text-md font-semibold text-gray-800 mb-2">{app.role}</h4>
                                
                                {/* Quick Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                  <div className="flex items-center">
                                    <Building size={14} className="mr-2 text-gray-400" />
                                    {app.companyType}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin size={14} className="mr-2 text-gray-400" />
                                    {app.location}
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign size={14} className="mr-2 text-gray-400" />
                                    {app.salary}
                                  </div>
                                </div>

                                {/* Timeline Progress */}
                                <div className="mb-4">
                                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>Current Stage: <span className="font-semibold">{app.stage}</span></span>
                                    <span className="text-xs">Applied: {app.appliedDate}</span>
                                  </div>
                                  <div className="flex items-center justify-between mb-2">
                                    {app.timeline.map((step, index) => (
                                      <div key={index} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                          step.completed 
                                            ? 'bg-[#059669]/20 text-[#059669] border-2 border-[#059669]/30' 
                                            : step.upcoming
                                            ? 'bg-[#4F46E5]/20 text-[#4F46E5] border-2 border-[#4F46E5]/30'
                                            : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                                        }`}>
                                          {step.completed ? '✓' : index + 1}
                                        </div>
                                        <span className="text-xs text-gray-600 mt-1">{step.stage}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Match Score */}
                              <div className="text-right">
                                <div className="inline-flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xl font-bold text-[#4F46E5]">{app.match}%</div>
                                  <div className="text-xs text-gray-600">Match Score</div>
                                  <div className="w-20 h-1 bg-gray-200 rounded-full mt-2">
                                    <div 
                                      className="h-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
                                      style={{ width: `${app.match}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Actions and Next Step */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                              <div className="flex-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Target size={14} className="mr-2 flex-shrink-0" />
                                  <span className="font-medium">Next:</span> {app.nextStep}
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                                  <Eye size={16} className="mr-2" />
                                  View Details
                                </button>
                                <button className="px-4 py-2 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors text-sm flex items-center">
                                  <MessageSquare size={16} className="mr-2" />
                                  Contact
                                </button>
                              </div>
                            </div>

                            {/* Interview Details */}
                            {app.interviewDate && (
                              <div className="mt-4 p-4 bg-[#4F46E5]/5 rounded-lg border border-[#4F46E5]/20">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Calendar className="text-[#4F46E5] mr-3" size={20} />
                                    <div>
                                      <div className="font-medium text-[#4F46E5]">Interview Scheduled</div>
                                      <div className="text-sm text-[#4F46E5]/80">
                                        {new Date(app.interviewDate).toLocaleDateString('en-US', {
                                          weekday: 'long',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                  <button className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                                    Join Interview
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* No Applications */}
                  {filteredApplications.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-600 mb-6">
                        {activeTab === 'all' 
                          ? "You haven't applied to any internships yet."
                          : `You don't have any ${activeTab} applications.`
                        }
                      </p>
                      <button className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                        Browse Internships
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Statistics */}
              <div className="space-y-6">
                {/* Application Statistics */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <PieChart size={20} className="mr-2 text-[#4F46E5]" />
                    Application Statistics
                  </h3>
                  
                  {/* Success Rate */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">Success Rate</span>
                      <span className="text-lg font-bold text-[#059669]">28%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Industry Avg: 15%</span>
                      <span>Above Average</span>
                    </div>
                  </div>

                  {/* Stage Distribution */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Stage Distribution</h4>
                    <div className="space-y-4">
                      {[
                        { stage: 'Applied', count: 1, color: 'bg-gray-400', percent: 17 },
                        { stage: 'Assessment', count: 1, color: 'bg-[#D97706]', percent: 17 },
                        { stage: 'Interview', count: 1, color: 'bg-[#7C3AED]', percent: 17 },
                        { stage: 'Shortlisted', count: 1, color: 'bg-[#4F46E5]', percent: 17 },
                        { stage: 'Offer', count: 1, color: 'bg-[#059669]', percent: 17 },
                        { stage: 'Rejected', count: 1, color: 'bg-[#DC2626]', percent: 17 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.stage}</span>
                            <span className="font-medium">{item.count} ({item.percent}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full">
                            <div 
                              className={`h-1.5 ${item.color} rounded-full`}
                              style={{ width: `${item.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar size={14} className="text-[#4F46E5]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Interview scheduled with Barclays</p>
                        <p className="text-xs text-gray-600 mt-1">Technical round on Dec 20, 2024</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#D97706]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FileText size={14} className="text-[#D97706]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Assessment submitted for PhonePe</p>
                        <p className="text-xs text-gray-600 mt-1">Coding challenge completed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#059669]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Award size={14} className="text-[#059669]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Offer received from Amazon</p>
                        <p className="text-xs text-gray-600 mt-1">Review offer by Dec 25</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {applications
                      .filter(app => app.interviewDate)
                      .map((app, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900">{app.company}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(app.interviewDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{app.role}</p>
                          <div className="flex items-center text-xs text-[#4F46E5]">
                            <Clock size={12} className="mr-1" />
                            {new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

export default ApplicationsPage;