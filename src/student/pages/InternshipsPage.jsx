// src/student/pages/InternshipsPage.jsx - UPDATED WITH REVIEWS TAB
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Search, Filter, MapPin, Building, DollarSign, Clock, 
  Calendar, Briefcase, ChevronRight, Bookmark, Eye,
  Users, CheckCircle, Target, Zap, TrendingUp,
  MessageSquare, Star, Award
} from 'lucide-react';

import InterviewReviews from '../components/InterviewReviews';
import SkillGapAnalyzer from '../components/SkillGapAnalyzer';

const InternshipsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedInternships, setSavedInternships] = useState([1, 3]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('internships'); // 'internships' or 'reviews'
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [showSkillAnalyzer, setShowSkillAnalyzer] = useState(false);
  const [selectedInternshipForAnalysis, setSelectedInternshipForAnalysis] = useState(null);

  const internships = [
    {
      id: 1,
      company: 'Barclays',
      role: 'Technology Analyst Intern',
      location: 'London, UK',
      salary: '₹85,000/month',
      duration: '3 months',
      posted: '2 days ago',
      deadline: 'Dec 31, 2024',
      match: 92,
      skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
      type: 'On-site',
      description: 'Work on banking technology solutions and digital transformation projects.',
      applications: 850,
      isNew: true,
      reviewsCount: 24,
      avgRating: 4.2
    },
    {
      id: 2,
      company: 'PhonePe',
      role: 'Backend Engineer Intern',
      location: 'Bengaluru, India',
      salary: '₹65,000/month',
      duration: '6 months',
      posted: '1 week ago',
      deadline: 'Dec 20, 2024',
      match: 95,
      skills: ['Java', 'Kafka', 'PostgreSQL', 'Redis'],
      type: 'On-site',
      description: 'Build scalable payment systems for India\'s largest payments platform.',
      applications: 2100,
      isNew: true,
      reviewsCount: 18,
      avgRating: 4.4
    },
    {
      id: 3,
      company: 'BNY Mellon',
      role: 'Software Development Intern',
      location: 'Pune, India',
      salary: '₹55,000/month',
      duration: '6 months',
      posted: '4 days ago',
      deadline: 'Dec 22, 2024',
      match: 88,
      skills: ['.NET', 'C#', 'Azure', 'Angular'],
      type: 'Hybrid',
      description: 'Develop enterprise software solutions for global clients.',
      applications: 1200,
      isNew: false,
      reviewsCount: 12,
      avgRating: 3.8
    },
    {
      id: 4,
      company: 'Goldman Sachs',
      role: 'Quantitative Analyst Intern',
      location: 'Mumbai, India',
      salary: '₹90,000/month',
      duration: '4 months',
      posted: '1 day ago',
      deadline: 'Dec 15, 2024',
      match: 78,
      skills: ['Python', 'Statistics', 'Financial Modeling', 'R'],
      type: 'On-site',
      description: 'Develop quantitative models for investment banking operations.',
      applications: 650,
      isNew: true,
      reviewsCount: 32,
      avgRating: 4.5
    },
    {
      id: 5,
      company: 'Amazon',
      role: 'SDE Intern',
      location: 'Bengaluru, India',
      salary: '₹70,000/month',
      duration: '6 months',
      posted: '3 days ago',
      deadline: 'Dec 28, 2024',
      match: 91,
      skills: ['Python', 'Django', 'React', 'Docker'],
      type: 'On-site',
      description: 'Develop financial technology solutions for investment banking.',
      applications: 1500,
      isNew: true,
      reviewsCount: 45,
      avgRating: 4.3
    },
    {
      id: 6,
      company: 'Deutsche Bank',
      role: 'Technology Analyst Intern',
      location: 'Pune, India',
      salary: '₹60,000/month',
      duration: '6 months',
      posted: '5 days ago',
      deadline: 'Dec 25, 2024',
      match: 87,
      skills: ['Java', 'Spring', 'SQL', 'Kafka'],
      type: 'On-site',
      description: 'Work on core banking systems and financial technology.',
      applications: 980,
      isNew: false,
      reviewsCount: 16,
      avgRating: 3.9
    }
  ];

  const stats = [
    { label: 'Total Internships', value: '24', change: '+4', color: 'text-[#4F46E5]', bg: 'bg-[#4F46E5]/10' },
    { label: 'Applied', value: '14', change: '+2', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
    { label: 'Shortlisted', value: '5', change: '+1', color: 'text-[#059669]', bg: 'bg-[#059669]/10' },
    { label: 'Interviews', value: '3', change: '0', color: 'text-[#D97706]', bg: 'bg-[#D97706]/10' }
  ];

  const filters = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'technology', label: 'Technology', count: 18 },
    { id: 'finance', label: 'Finance', count: 8 },
    { id: 'payments', label: 'Payments', count: 5 },
    { id: 'consulting', label: 'Consulting', count: 7 },
    { id: 'data', label: 'Data Science', count: 6 }
  ];

  const handleAnalyzeSkills = (internship) => {
    setSelectedInternshipForAnalysis(internship);
    setShowSkillAnalyzer(true);
  };
  
  const toggleSave = (id) => {
    setSavedInternships(prev => 
      prev.includes(id) 
        ? prev.filter(internshipId => internshipId !== id)
        : [...prev, id]
    );
  };

  const filteredInternships = internships.filter(internship => {
    if (searchTerm) {
      return internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
             internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
             internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return true;
  });

  const handleViewReviews = (company, role) => {
    setSelectedCompany({ company, role });
    setActiveTab('reviews');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title="Internships" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Find Internships</h1>
                  <p className="text-gray-600 mt-2">Discover opportunities and learn from experiences</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    {filteredInternships.length} opportunities
                  </span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <Briefcase className={stat.color} size={24} />
                      </div>
                    </div>
                    <div className={`text-xs font-medium mt-2 ${parseInt(stat.change) > 0 ? 'text-[#059669]' : 'text-gray-500'}`}>
                      {stat.change} this week
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
                      placeholder="Search internships by role, company, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                      <option>Sort by: Relevance</option>
                      <option>Sort by: Salary</option>
                      <option>Sort by: Deadline</option>
                      <option>Sort by: Match Score</option>
                    </select>
                    <button className="flex items-center px-4 py-2.5 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                      <Filter size={16} className="mr-2" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('internships')}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === 'internships'
                      ? 'border-[#4F46E5] text-[#4F46E5]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <Briefcase size={18} className="mr-2" />
                    Internships
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-[#4F46E5] text-[#4F46E5]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    Interview Experiences
                    <span className="ml-2 px-2 py-0.5 bg-[#4F46E5]/10 text-[#4F46E5] text-xs rounded">
                      {internships.reduce((sum, i) => sum + i.reviewsCount, 0)}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'internships' ? (
              <>
                {/* Filters */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                          activeFilter === filter.id
                            ? 'bg-[#4F46E5] text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {filter.label}
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                          activeFilter === filter.id
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
                  {/* Left Column - Internships List */}
                  <div className="lg:col-span-2">
                    {/* Internships List */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-gray-900">Available Internships</h2>
                          <span className="text-sm text-gray-600">
                            Sorted by: Match Score
                          </span>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {filteredInternships.map(internship => (
                          <div key={internship.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                              {/* Company Logo */}
                              <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center text-white font-bold">
                                  {internship.company.charAt(0)}
                                </div>
                              </div>

                              {/* Internship Details */}
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                  <div className="mb-4 md:mb-0">
                                    <div className="flex items-center flex-wrap gap-2 mb-2">
                                      <h3 className="text-xl font-bold text-gray-900">{internship.company}</h3>
                                      {internship.isNew && (
                                        <span className="px-2 py-1 bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-medium rounded">
                                          New
                                        </span>
                                      )}
                                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        internship.type === 'Remote' ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20' :
                                        internship.type === 'Hybrid' ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20' :
                                        'bg-gray-100 text-gray-800 border border-gray-200'
                                      }`}>
                                        {internship.type}
                                      </span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">{internship.role}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{internship.description}</p>
                                    
                                    {/* Details */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                      <div className="flex items-center text-sm text-gray-600">
                                        <MapPin size={14} className="mr-2 text-gray-400" />
                                        {internship.location}
                                      </div>
                                      <div className="flex items-center text-sm text-gray-600">
                                        <DollarSign size={14} className="mr-2 text-gray-400" />
                                        {internship.salary}
                                      </div>
                                      <div className="flex items-center text-sm text-gray-600">
                                        <Clock size={14} className="mr-2 text-gray-400" />
                                        {internship.duration}
                                      </div>
                                      <div className="flex items-center text-sm text-gray-600">
                                        <Calendar size={14} className="mr-2 text-gray-400" />
                                        {internship.deadline}
                                      </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                      <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                                      <div className="flex flex-wrap gap-2">
                                        {internship.skills.map((skill, index) => (
                                          <span 
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Reviews Preview */}
                                    <div className="flex items-center text-sm text-gray-600">
                                      <MessageSquare size={14} className="mr-2" />
                                      <button 
                                        onClick={() => handleViewReviews(internship.company, internship.role)}
                                        className="text-[#4F46E5] hover:text-[#4338CA] font-medium"
                                      >
                                        {internship.reviewsCount} interview experiences
                                      </button>
                                      <span className="mx-2">•</span>
                                      <Star size={14} className="text-amber-400 mr-1" />
                                      {internship.avgRating}/5
                                    </div>
                                  </div>

                                  {/* Match Score & Actions */}
                                  <div className="flex flex-col items-end space-y-4">
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-gray-900">{internship.match}%</div>
                                      <div className="text-sm text-gray-600">Match Score</div>
                                      <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div 
                                          className="h-1.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
                                          style={{ width: `${internship.match}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                      <button 
                                        onClick={() => toggleSave(internship.id)}
                                        className={`p-2 rounded-lg ${savedInternships.includes(internship.id) ? 'text-[#DC2626] hover:bg-[#DC2626]/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                      >
                                        <Bookmark size={20} className={savedInternships.includes(internship.id) ? 'fill-[#DC2626]' : ''} />
                                      </button>
                                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                                        <Eye size={20} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Users size={14} className="mr-2" />
                                    {internship.applications.toLocaleString()} applicants
                                  </div>
                                  <div className="flex space-x-3">
                                    <button 
                                      onClick={() => handleViewReviews(internship.company, internship.role)}
                                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors text-sm flex items-center"
                                    >
                                      <MessageSquare size={16} className="mr-2" />
                                      View Experiences
                                    </button>
                                    <button className="px-4 py-2 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors text-sm flex items-center">
                                      <CheckCircle size={16} className="mr-2" />
                                      Apply Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* No Results */}
                      {filteredInternships.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
                          <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Load More */}
                    {filteredInternships.length > 0 && (
                      <div className="text-center mt-8">
                        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center mx-auto">
                          Load More Internships
                          <ChevronRight size={20} className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Side Panels */}
                  <div className="space-y-6">
                    {/* Refine Search Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Refine Search</h3>
                        <button className="text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium">
                          Clear all
                        </button>
                      </div>
                      
                      <div className="space-y-8">
                        {/* Stipend Range */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-[#4F46E5] rounded-full mr-2"></span>
                            Monthly Stipend
                          </h4>
                          <div className="space-y-2">
                            {[
                              { label: 'All stipends', count: 140 },
                              { label: '₹5,000 - ₹10,000', count: 45 },
                              { label: '₹10,000 - ₹20,000', count: 68 },
                              { label: '₹20,000 - ₹30,000', count: 32 },
                              { label: '₹30,000+', count: 15 }
                            ].map((item, index) => (
                              <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                                <div className="flex items-center">
                                  <input 
                                    type="radio" 
                                    name="stipend"
                                    className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5]"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Location */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>
                            Locations
                          </h4>
                          <div className="space-y-2">
                            {[
                              { label: 'Remote / Work from Home', count: 67 },
                              { label: 'Bangalore', count: 45 },
                              { label: 'Mumbai', count: 32 },
                              { label: 'Delhi NCR', count: 28 },
                              { label: 'Pune', count: 22 },
                              { label: 'Hyderabad', count: 18 },
                              { label: 'Chennai', count: 15 }
                            ].map((item, index) => (
                              <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                                <div className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="h-4 w-4 text-[#4F46E5] rounded border-gray-300 focus:ring-[#4F46E5]"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Duration */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-[#7C3AED] rounded-full mr-2"></span>
                            Internship Duration
                          </h4>
                          <div className="space-y-2">
                            {[
                              { label: 'All durations', count: 140 },
                              { label: '1 month', count: 12 },
                              { label: '2 months', count: 18 },
                              { label: '3 months', count: 45 },
                              { label: '6 months', count: 68 },
                              { label: '12 months', count: 25 }
                            ].map((item, index) => (
                              <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                                <div className="flex items-center">
                                  <input 
                                    type="radio" 
                                    name="duration"
                                    className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5]"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Job Type */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-[#D97706] rounded-full mr-2"></span>
                            Job Type
                          </h4>
                          <div className="space-y-2">
                            {[
                              { label: 'On-site', count: 68 },
                              { label: 'Remote', count: 42 },
                              { label: 'Hybrid', count: 30 }
                            ].map((item, index) => (
                              <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                                <div className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="h-4 w-4 text-[#4F46E5] rounded border-gray-300 focus:ring-[#4F46E5]"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Skills */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-[#DC2626] rounded-full mr-2"></span>
                            Skills Required
                          </h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {[
                              { label: 'React', count: 85 },
                              { label: 'JavaScript', count: 92 },
                              { label: 'Python', count: 78 },
                              { label: 'Java', count: 65 },
                              { label: 'UI/UX Design', count: 42 },
                              { label: 'Data Analysis', count: 58 },
                              { label: 'Node.js', count: 48 },
                              { label: 'Cloud Computing', count: 35 }
                            ].map((item, index) => (
                              <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                                <div className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="h-4 w-4 text-[#4F46E5] rounded border-gray-300 focus:ring-[#4F46E5]"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full mt-6 py-2.5 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                        Apply Filters
                      </button>
                    </div>

                    {/* Application Tips */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Application Tips</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <Target size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Target Your Applications</p>
                            <p className="text-xs text-gray-600 mt-1">Apply to roles that match 80%+ of your skills</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <Zap size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Prepare for Interviews</p>
                            <p className="text-xs text-gray-600 mt-1">Read interview experiences before applying</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <TrendingUp size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Track Progress</p>
                            <p className="text-xs text-gray-600 mt-1">Monitor application status regularly</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Interview Reviews Tab */
              <InterviewReviews 
                company={selectedCompany?.company || "Barclays"} 
                role={selectedCompany?.role || "Technology Analyst Intern"} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternshipsPage;