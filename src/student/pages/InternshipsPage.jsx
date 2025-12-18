// src/student/pages/InternshipsPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Search, Filter, MapPin, Building, DollarSign, Clock, 
  Calendar, Briefcase, ChevronRight, Bookmark, Eye,
  Users, CheckCircle, Target, Zap, TrendingUp
} from 'lucide-react';

const InternshipsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedInternships, setSavedInternships] = useState([1, 3]);
  const [activeFilter, setActiveFilter] = useState('all');

  const internships = [
    {
      id: 1,
      company: 'Barclays',
      role: 'Technology Analyst Intern',
      location: 'London, UK',
      salary: '$8,500/month',
      duration: '3 months',
      posted: '2 days ago',
      deadline: 'Dec 31, 2024',
      match: 92,
      skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
      type: 'On-site',
      description: 'Work on banking technology solutions and digital transformation projects.',
      applications: 850,
      isNew: true
    },
    {
      id: 2,
      company: 'Cognizant',
      role: 'Software Development Intern',
      location: 'Bangalore, India',
      salary: '$2,500/month',
      duration: '6 months',
      posted: '5 days ago',
      deadline: 'Dec 25, 2024',
      match: 88,
      skills: ['.NET', 'C#', 'Azure', 'Angular'],
      type: 'Hybrid',
      description: 'Develop enterprise software solutions for global clients.',
      applications: 1200,
      isNew: false
    },
    {
      id: 3,
      company: 'PhonePe',
      role: 'Backend Engineer Intern',
      location: 'Bengaluru, India',
      salary: '$3,200/month',
      duration: '6 months',
      posted: '1 week ago',
      deadline: 'Dec 20, 2024',
      match: 95,
      skills: ['Java', 'Kafka', 'PostgreSQL', 'Redis'],
      type: 'On-site',
      description: 'Build scalable payment systems for India\'s largest payments platform.',
      applications: 2100,
      isNew: true
    },
    {
      id: 4,
      company: 'Deutsche Bank',
      role: 'Quantitative Analyst Intern',
      location: 'Frankfurt, Germany',
      salary: '$9,500/month',
      duration: '4 months',
      posted: '1 day ago',
      deadline: 'Dec 15, 2024',
      match: 78,
      skills: ['Python', 'Statistics', 'Financial Modeling', 'R'],
      type: 'On-site',
      description: 'Develop quantitative models for investment banking operations.',
      applications: 650,
      isNew: true
    },
    {
      id: 5,
      company: 'Infosys',
      role: 'Full Stack Developer Intern',
      location: 'Pune, India',
      salary: '$2,200/month',
      duration: '5 months',
      posted: '4 days ago',
      deadline: 'Dec 22, 2024',
      match: 85,
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      type: 'Hybrid',
      description: 'Build web applications using modern full stack technologies.',
      applications: 1800,
      isNew: false
    },
    {
      id: 6,
      company: 'JPMorgan Chase',
      role: 'Software Engineer Intern',
      location: 'New York, USA',
      salary: '$10,500/month',
      duration: '3 months',
      posted: '3 days ago',
      deadline: 'Dec 28, 2024',
      match: 91,
      skills: ['Python', 'Django', 'React', 'Docker'],
      type: 'On-site',
      description: 'Develop financial technology solutions for investment banking.',
      applications: 1500,
      isNew: true
    }
  ];

  const stats = [
    { label: 'Total Internships', value: '24', change: '+4', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Applied', value: '14', change: '+2', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Shortlisted', value: '5', change: '+1', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Interviews', value: '3', change: '0', color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const filters = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'technology', label: 'Technology', count: 18 },
    { id: 'finance', label: 'Finance', count: 8 },
    { id: 'payments', label: 'Payments', count: 5 },
    { id: 'consulting', label: 'Consulting', count: 7 },
    { id: 'data', label: 'Data Science', count: 6 }
  ];

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

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header title="Internships" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
  <h2 className="text-2xl font-bold text-gray-900">Find opportunities matching your profile</h2>
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
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <Briefcase className={stat.color} size={24} />
                      </div>
                    </div>
                    <div className={`text-xs font-medium mt-2 ${parseInt(stat.change) > 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {stat.change} this week
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
                      placeholder="Search internships by role, company, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            </div>

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
                <div className="bg-white rounded-xl border border-gray-200">
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
                            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                              <span className="font-bold text-gray-800 text-lg">{internship.company.charAt(0)}</span>
                            </div>
                          </div>

                          {/* Internship Details */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                              <div className="mb-4 md:mb-0">
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                  <h3 className="text-xl font-bold text-gray-900">{internship.company}</h3>
                                  {internship.isNew && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                      New
                                    </span>
                                  )}
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                                    internship.type === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
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
                              </div>

                              {/* Match Score & Actions */}
                              <div className="flex flex-col items-end space-y-4">
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">{internship.match}%</div>
                                  <div className="text-sm text-gray-600">Match Score</div>
                                  <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-2">
                                    <div 
                                      className="h-1.5 bg-blue-500 rounded-full"
                                      style={{ width: `${internship.match}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => toggleSave(internship.id)}
                                    className={`p-2 rounded-lg ${savedInternships.includes(internship.id) ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                  >
                                    <Bookmark size={20} className={savedInternships.includes(internship.id) ? 'fill-red-500' : ''} />
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
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm">
                                  View Details
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
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Refine Search</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Clear all
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Stipend Range */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
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
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
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
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
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
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
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
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
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
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
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
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
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
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
                  
                  <button className="w-full mt-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Filters
                  </button>
                </div>

                {/* Application Tips */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                        <p className="text-xs text-gray-600 mt-1">Practice common technical and behavioral questions</p>
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

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Applied to Barclays</p>
                        <p className="text-xs text-gray-600">2 days ago</p>
                      </div>
                      <span className="text-sm font-medium text-emerald-600">Submitted</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">PhonePe Assessment</p>
                        <p className="text-xs text-gray-600">1 week ago</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">Completed</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Cognizant Interview</p>
                        <p className="text-xs text-gray-600">Scheduled for Dec 20</p>
                      </div>
                      <span className="text-sm font-medium text-amber-600">Upcoming</span>
                    </div>
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

export default InternshipsPage;