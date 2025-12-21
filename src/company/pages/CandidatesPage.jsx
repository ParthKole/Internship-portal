// src/company/pages/CandidatesPage.jsx
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
  MessageSquare,
  Calendar,
  Users,
  Award,
  Clock,
  Eye,
  FileText,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  Target,
  Zap,
  Briefcase
} from 'lucide-react';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([
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
      location: 'Mumbai, India',
      status: 'available',
      statusText: 'Available',
      matchScore: 92,
      experience: [
        { company: 'Tech Startup', role: 'Web Dev Intern', duration: '3 months' },
        { company: 'Freelance', role: 'Frontend Developer', duration: '6 months' }
      ],
      projects: 4,
      rating: 4.8,
      lastActive: '2 hours ago',
      preferredRoles: ['Frontend Developer', 'Full Stack Developer'],
      expectedStipend: '₹15,000 - ₹20,000',
      noticePeriod: 'Immediate',
      saved: true
    },
    // Add more candidates similar to above...
  ]);

  const [filters, setFilters] = useState({
    skills: [],
    location: '',
    university: '',
    minGPA: '',
    availability: 'all'
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates Pool</h1>
          <p className="text-gray-600">Browse and discover talented students for your internships</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
            >
              List
            </button>
          </div>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            <Filter size={18} className="mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* AI Recommendations Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI-Powered Candidate Matching</h3>
              <p className="text-blue-100 text-sm">Our AI has found 12 candidates that perfectly match your requirements</p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            View Matches
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Filter Candidates</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Clear All Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              placeholder="React, Python, etc."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Location</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="delhi">Delhi</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any University</option>
              <option value="iit">IITs</option>
              <option value="nit">NITs</option>
              <option value="private">Private Universities</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum GPA</label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any GPA</option>
              <option value="9">9.0+</option>
              <option value="8.5">8.5+</option>
              <option value="8">8.0+</option>
              <option value="7.5">7.5+</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
            React
            <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
            Node.js
            <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
            Mumbai
            <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
            GPA 8.5+
            <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
          </span>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-gray-700">
          Showing <span className="font-bold text-gray-900">1,248</span> candidates
          <span className="mx-2">•</span>
          <span className="text-emerald-600 font-medium">42 new this week</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm text-gray-600">
            <Target size={14} className="mr-2" />
            Sort by:
          </div>
          <select className="text-sm border-0 focus:ring-0 font-medium">
            <option>Best Match</option>
            <option>Highest GPA</option>
            <option>Most Experience</option>
            <option>Recently Active</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-white flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full ${
                          candidate.rating >= 4.5 ? 'bg-emerald-500' :
                          candidate.rating >= 4.0 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{candidate.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap size={12} className="mr-1" />
                        {candidate.university}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    {candidate.saved ? (
                      <BookmarkCheck size={18} className="text-blue-600 fill-blue-600" />
                    ) : (
                      <Bookmark size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Status & Match */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    candidate.status === 'available' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {candidate.statusText}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">{candidate.matchScore}%</div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award size={14} className="mr-2" />
                    CGPA: {candidate.gpa} • {candidate.year}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase size={14} className="mr-2" />
                    {candidate.experience.length} experiences • {candidate.projects} projects
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-2" />
                    Active: {candidate.lastActive}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Eye size={16} className="mr-2" />
                    View Profile
                  </button>
                  <button className="px-4 py-2.5 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <MessageSquare size={16} className="mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View would go here
        <div>List view content...</div>
      )}

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
          Load More Candidates
        </button>
      </div>

      {/* No Results State */}
      {candidates.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search terms to find more candidates.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;