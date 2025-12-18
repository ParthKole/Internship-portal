// src/student/pages/ApplicationsPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  CheckCircle, Clock, AlertCircle, XCircle, FileText,
  Calendar, Building, MapPin, DollarSign, TrendingUp,
  BarChart, Filter, Search, Eye, MessageSquare, Download,
  ChevronRight, Star, Users, Target, Award
} from 'lucide-react';

const ApplicationsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineering Intern',
      status: 'shortlisted',
      statusText: 'Shortlisted',
      date: '2024-12-15',
      interviewDate: '2024-12-20',
      location: 'Mountain View, CA',
      salary: '$8,500/month',
      match: 95,
      stage: 'Technical Interview',
      nextStep: 'Prepare for technical round',
      lastUpdate: '2 days ago'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'Product Manager Intern',
      status: 'interview',
      statusText: 'Interview',
      date: '2024-12-10',
      interviewDate: '2024-12-18',
      location: 'Redmond, WA',
      salary: '$7,800/month',
      match: 88,
      stage: 'HR Discussion',
      nextStep: 'Schedule interview',
      lastUpdate: '1 day ago'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE Intern',
      status: 'applied',
      statusText: 'Applied',
      date: '2024-12-05',
      interviewDate: null,
      location: 'Seattle, WA',
      salary: '$9,200/month',
      match: 92,
      stage: 'Under Review',
      nextStep: 'Wait for response',
      lastUpdate: '5 days ago'
    },
    {
      id: 4,
      company: 'Meta',
      role: 'Frontend Intern',
      status: 'rejected',
      statusText: 'Rejected',
      date: '2024-11-28',
      interviewDate: null,
      location: 'Remote',
      salary: '$8,000/month',
      match: 85,
      stage: 'Not Selected',
      nextStep: 'Apply to similar roles',
      lastUpdate: '1 week ago'
    },
    {
      id: 5,
      company: 'Goldman Sachs',
      role: 'Quantitative Analyst Intern',
      status: 'assessment',
      statusText: 'Assessment',
      date: '2024-12-12',
      interviewDate: null,
      location: 'New York, NY',
      salary: '$10,500/month',
      match: 78,
      stage: 'Online Test',
      nextStep: 'Complete assessment',
      lastUpdate: '3 days ago'
    },
    {
      id: 6,
      company: 'Apple',
      role: 'iOS Developer Intern',
      status: 'offer',
      statusText: 'Offer Received',
      date: '2024-12-01',
      interviewDate: '2024-12-05',
      location: 'Cupertino, CA',
      salary: '$8,800/month',
      match: 91,
      stage: 'Offer Stage',
      nextStep: 'Review offer letter',
      lastUpdate: 'Yesterday'
    }
  ];

  const statusCounts = {
    all: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    assessment: applications.filter(app => app.status === 'assessment').length,
    interview: applications.filter(app => app.status === 'interview').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    offer: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'offer': return <CheckCircle className="text-green-500" size={20} />;
      case 'shortlisted': return <Star className="text-blue-500" size={20} />;
      case 'interview': return <Calendar className="text-purple-500" size={20} />;
      case 'assessment': return <FileText className="text-amber-500" size={20} />;
      case 'applied': return <Clock className="text-gray-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      default: return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'offer': return 'bg-green-100 text-green-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-amber-100 text-amber-800';
      case 'applied': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab !== 'all' && app.status !== activeTab) return false;
    if (searchTerm && !app.company.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !app.role.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = [
    { label: 'Total Applications', value: '14', change: '+2', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Under Review', value: '5', change: '0', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Interviews', value: '3', change: '+1', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Success Rate', value: '35%', change: '+5%', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                  <p className="text-gray-600 mt-2">Track and manage your internship applications</p>
                </div>
                <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <FileText size={18} className="mr-2" />
                  Export Applications
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <BarChart className={stat.color} size={24} />
                      </div>
                    </div>
                    <div className={`text-xs font-medium mt-2 ${parseInt(stat.change) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {stat.change} this month
                    </div>
                  </div>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Sort by: Latest</option>
                      <option>Sort by: Match Score</option>
                      <option>Sort by: Company</option>
                    </select>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Filter size={18} className="mr-1" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() => setActiveTab(status)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                      activeTab === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {getStatusIcon(status)}
                    <span className="ml-2 capitalize">{status}</span>
                    <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === status
                        ? 'bg-blue-500/30 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Applications List */}
              <div className="lg:col-span-2">
                {/* Applications List */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Application Timeline</h2>
                      <span className="text-sm text-gray-600">
                        Showing {filteredApplications.length} applications
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {filteredApplications.map((app) => (
                      <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          {/* Company Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                              {app.company.charAt(0)}
                            </div>
                          </div>

                          {/* Application Details */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                              <div>
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                  <h3 className="text-lg font-bold text-gray-900">{app.company}</h3>
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                                    {app.statusText}
                                  </span>
                                </div>
                                <h4 className="text-md font-semibold text-gray-800 mb-2">{app.role}</h4>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <MapPin size={14} className="mr-1" />
                                    {app.location}
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign size={14} className="mr-1" />
                                    {app.salary}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar size={14} className="mr-1" />
                                    Applied: {new Date(app.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              {/* Match Score */}
                              <div className="text-right mb-4 md:mb-0">
                                <div className="text-2xl font-bold text-blue-600">{app.match}%</div>
                                <div className="text-sm text-gray-600">Match</div>
                              </div>
                            </div>

                            {/* Progress & Actions */}
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                  <span>Current Stage: <span className="font-semibold">{app.stage}</span></span>
                                  <span>Last updated: {app.lastUpdate}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      app.status === 'rejected' ? 'bg-red-500 w-1/4' :
                                      app.status === 'offer' ? 'bg-green-500 w-full' :
                                      app.status === 'interview' ? 'bg-purple-500 w-3/4' :
                                      app.status === 'shortlisted' ? 'bg-blue-500 w-2/3' :
                                      app.status === 'assessment' ? 'bg-amber-500 w-1/2' :
                                      'bg-gray-500 w-1/3'
                                    }`}
                                  ></div>
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Target size={14} className="mr-2" />
                                  Next step: {app.nextStep}
                                </div>
                                <div className="flex space-x-3">
                                  <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                                    <Eye size={16} className="mr-1" />
                                    View Details
                                  </button>
                                  <button className="flex items-center text-gray-600 hover:text-gray-700 text-sm">
                                    <MessageSquare size={16} className="mr-1" />
                                    Contact HR
                                  </button>
                                  <button className="flex items-center text-gray-600 hover:text-gray-700 text-sm">
                                    <Download size={16} className="mr-1" />
                                    Documents
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Interview Details */}
                            {app.interviewDate && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Calendar className="text-blue-600 mr-2" size={18} />
                                    <div>
                                      <div className="font-medium text-blue-800">Interview Scheduled</div>
                                      <div className="text-sm text-blue-700">
                                        {new Date(app.interviewDate).toLocaleString('en-US', {
                                          weekday: 'long',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
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
                        <FileText size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-600 mb-6">
                        {activeTab === 'all' 
                          ? "You haven't applied to any internships yet."
                          : `You don't have any ${activeTab} applications.`
                        }
                      </p>
                      <button 
                        onClick={() => {
                          setActiveTab('all');
                          setSearchTerm('');
                        }}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Browse Internships
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Statistics */}
              <div className="space-y-6">
                {/* Application Statistics */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Application Statistics</h3>
                  
                  {/* Success Rate */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">Success Rate</span>
                      <span className="text-lg font-bold text-emerald-600">35%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Stage Distribution */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Stage Distribution</h4>
                    <div className="space-y-4">
                      {[
                        { stage: 'Applied', count: 5, color: 'bg-gray-500' },
                        { stage: 'Under Review', count: 3, color: 'bg-blue-500' },
                        { stage: 'Interview', count: 3, color: 'bg-purple-500' },
                        { stage: 'Assessment', count: 2, color: 'bg-amber-500' },
                        { stage: 'Offer', count: 1, color: 'bg-green-500' }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.stage}</span>
                            <span className="font-medium">{item.count}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div 
                              className={`h-2 ${item.color} rounded-full`}
                              style={{ width: `${(item.count / applications.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <span>Prepare for Interviews</span>
                      <ChevronRight size={18} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <span>Update Resume</span>
                      <ChevronRight size={18} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <span>Track Follow-ups</span>
                      <ChevronRight size={18} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <span>Request Recommendations</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Upcoming Interviews */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Interviews</h3>
                  <div className="space-y-4">
                    {applications
                      .filter(app => app.interviewDate && new Date(app.interviewDate) > new Date())
                      .map((app, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{app.company}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(app.interviewDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{app.role}</p>
                          <div className="flex items-center text-sm text-purple-600">
                            <Clock size={14} className="mr-1" />
                            {new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                    {applications.filter(app => app.interviewDate && new Date(app.interviewDate) > new Date()).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No upcoming interviews</p>
                    )}
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