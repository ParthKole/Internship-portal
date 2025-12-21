// src/company/pages/ApplicationsPage.jsx
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Star,
  ChevronDown,
  MessageSquare,
  Calendar,
  Users,
  Award,
  Clock,
  XCircle,
  CheckCircle,
  Eye,
  FileText,
  ExternalLink,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      university: 'University of Mumbai',
      course: 'B.Tech Computer Science',
      year: '3rd Year',
      gpa: '9.2/10',
      skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Git', 'Tailwind'],
      appliedDate: '2024-10-25',
      status: 'shortlisted',
      statusText: 'Shortlisted',
      internship: 'Frontend Developer Intern',
      matchScore: 92,
      location: 'Mumbai, India',
      resume: true,
      portfolio: true,
      github: 'github.com/rahulsharma',
      linkedin: 'linkedin.com/in/rahulsharma',
      experience: [
        { company: 'Tech Startup', role: 'Web Dev Intern', duration: '3 months' }
      ],
      projects: 4,
      rating: 4.8,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 8765432109',
      university: 'IIT Delhi',
      course: 'B.Tech Information Technology',
      year: '4th Year',
      gpa: '9.5/10',
      skills: ['Python', 'Django', 'AWS', 'Machine Learning', 'Docker'],
      appliedDate: '2024-10-24',
      status: 'interview',
      statusText: 'Interview Scheduled',
      internship: 'Backend Developer Intern',
      matchScore: 88,
      location: 'Delhi, India',
      resume: true,
      portfolio: false,
      github: 'github.com/priyapatel',
      linkedin: 'linkedin.com/in/priyapatel',
      experience: [
        { company: 'Google', role: 'SWE Intern', duration: '6 months' }
      ],
      projects: 6,
      rating: 4.5,
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      phone: '+91 7654321098',
      university: 'NIT Trichy',
      course: 'B.Tech Computer Science',
      year: 'Final Year',
      gpa: '8.9/10',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Redis'],
      appliedDate: '2024-10-23',
      status: 'review',
      statusText: 'Under Review',
      internship: 'Backend Developer Intern',
      matchScore: 85,
      location: 'Chennai, India',
      resume: true,
      portfolio: true,
      github: 'github.com/amitkumar',
      linkedin: 'linkedin.com/in/amitkumar',
      experience: [],
      projects: 3,
      rating: 4.3,
      lastActive: '3 days ago'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      email: 'neha.gupta@example.com',
      phone: '+91 6543210987',
      university: 'VIT Vellore',
      course: 'B.Tech Computer Science',
      year: '3rd Year',
      gpa: '9.0/10',
      skills: ['React Native', 'Firebase', 'UI/UX', 'Redux', 'TypeScript'],
      appliedDate: '2024-10-22',
      status: 'applied',
      statusText: 'Applied',
      internship: 'Mobile Developer Intern',
      matchScore: 90,
      location: 'Bangalore, India',
      resume: true,
      portfolio: true,
      github: 'github.com/nehagupta',
      linkedin: 'linkedin.com/in/nehagupta',
      experience: [
        { company: 'Startup', role: 'Mobile Dev', duration: '4 months' }
      ],
      projects: 5,
      rating: 4.7,
      lastActive: 'Just now'
    },
    {
      id: 5,
      name: 'Sandeep Reddy',
      email: 'sandeep.reddy@example.com',
      phone: '+91 5432109876',
      university: 'IIIT Hyderabad',
      course: 'B.Tech CSE',
      year: '4th Year',
      gpa: '9.3/10',
      skills: ['C++', 'Algorithms', 'System Design', 'Linux', 'Networking'],
      appliedDate: '2024-10-20',
      status: 'rejected',
      statusText: 'Rejected',
      internship: 'SDE Intern',
      matchScore: 78,
      location: 'Hyderabad, India',
      resume: true,
      portfolio: false,
      github: 'github.com/sandeepreddy',
      linkedin: 'linkedin.com/in/sandeepreddy',
      experience: [],
      projects: 2,
      rating: 4.0,
      lastActive: '1 week ago'
    },
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    internship: 'all',
    date: 'all',
    search: ''
  });

  const [selectedApplications, setSelectedApplications] = useState([]);

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'bg-gray-100' },
    { value: 'applied', label: 'Applied', color: 'bg-gray-100' },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-emerald-100' },
    { value: 'interview', label: 'Interview', color: 'bg-blue-100' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100' },
    { value: 'hired', label: 'Hired', color: 'bg-purple-100' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      applied: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
      shortlisted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      interview: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      review: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      hired: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    };
    return colors[status] || colors.applied;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const toggleSelectApplication = (id) => {
    setSelectedApplications(prev =>
      prev.includes(id)
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const selectAllApplications = () => {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(applications.map(app => app.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Manage and review all candidate applications</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          {selectedApplications.length > 0 && (
            <button className="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center">
              <XCircle size={18} className="mr-2" />
              Reject Selected ({selectedApplications.length})
            </button>
          )}
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            <BarChart3 size={18} className="mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">156</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-emerald-600">42</div>
          <div className="text-sm text-gray-500">Shortlisted</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">26</div>
          <div className="text-sm text-gray-500">Interview</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-amber-600">18</div>
          <div className="text-sm text-gray-500">Review</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-red-600">8</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search candidates by name, skills, university..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select 
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.internship}
              onChange={(e) => handleFilterChange('internship', e.target.value)}
            >
              <option value="all">All Internships</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="mobile">Mobile Developer</option>
              <option value="data">Data Science</option>
            </select>

            <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === applications.length}
                  onChange={selectAllApplications}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {selectedApplications.length} selected
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Showing {applications.length} applications
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border-0 focus:ring-0">
                <option>Newest first</option>
                <option>Match score</option>
                <option>Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {applications.map((application) => {
            const statusColors = getStatusColor(application.status);
            const isSelected = selectedApplications.includes(application.id);
            
            return (
              <div 
                key={application.id} 
                className={`p-6 hover:bg-gray-50/50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  {/* Left Column - Candidate Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectApplication(application.id)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-5"
                      />
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-white flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-full ${
                            application.rating >= 4.5 ? 'bg-emerald-500' :
                            application.rating >= 4.0 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{application.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>
                          {application.statusText}
                        </span>
                        <div className="flex items-center text-sm">
                          <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                          <span className="font-medium">{application.rating}</span>
                          <span className="text-gray-500 ml-1">/5</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <GraduationCap size={14} className="mr-2" />
                            <span className="font-medium">{application.university}</span>
                            <span className="mx-2">•</span>
                            <span>{application.course}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Award size={14} className="mr-2" />
                            <span>CGPA: {application.gpa}</span>
                            <span className="mx-2">•</span>
                            <span>{application.year}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin size={14} className="mr-2" />
                            {application.location}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail size={14} className="mr-2" />
                            {application.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone size={14} className="mr-2" />
                            {application.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-2" />
                            Applied: {application.appliedDate}
                          </div>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <span>Skills</span>
                          <span className="mx-2">•</span>
                          <span className="text-blue-600">{application.skills.length} skills verified</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {application.skills.slice(0, 5).map((skill, index) => (
                            <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                              {skill}
                            </span>
                          ))}
                          {application.skills.length > 5 && (
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                              +{application.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Internship Info */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Briefcase size={16} className="text-gray-600" />
                            <span className="font-medium text-gray-900">{application.internship}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-600">{application.matchScore}%</div>
                            <div className="text-xs text-gray-500">Match Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2" />
                      {application.experience.length} experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText size={14} className="mr-2" />
                      {application.projects} projects
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2" />
                      Last active: {application.lastActive}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      <Eye size={16} className="mr-2" />
                      View Profile
                    </button>
                    <button className="px-4 py-2.5 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                      <MessageSquare size={16} className="mr-2" />
                      Message
                    </button>
                    <button className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedApplications.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-6">
          <div className="flex items-center">
            <CheckCircle size={18} className="mr-2" />
            <span className="font-medium">{selectedApplications.length} applications selected</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              Shortlist
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Interview
            </button>
            <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
              Reject
            </button>
            <button 
              onClick={() => setSelectedApplications([])}
              className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;