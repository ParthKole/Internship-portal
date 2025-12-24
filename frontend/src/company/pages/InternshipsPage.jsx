// src/company/pages/InternshipsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  ChevronRight,
  MoreVertical,
  Download,
  BarChart3,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  TrendingUp,
  Globe,
  Briefcase
} from 'lucide-react';

const InternshipsPage = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      status: "active",
      statusText: "Active",
      applications: 45,
      shortlisted: 12,
      interviewed: 8,
      hired: 3,
      postedDate: "2024-10-15",
      deadline: "2024-11-15",
      type: "Remote",
      stipend: "₹15,000/month",
      duration: "3 months",
      location: "Remote",
      skills: ["React", "JavaScript", "Tailwind CSS", "Git"],
      description: "Work on cutting-edge frontend projects using modern web technologies.",
      company: "TechCorp Solutions",
      views: 1245,
      matchRate: 85
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      status: "active",
      statusText: "Active",
      applications: 32,
      shortlisted: 8,
      interviewed: 5,
      hired: 2,
      postedDate: "2024-10-10",
      deadline: "2024-11-30",
      type: "On-site",
      stipend: "₹20,000/month",
      duration: "6 months",
      location: "Bangalore, India",
      skills: ["Node.js", "Python", "MongoDB", "AWS"],
      description: "Build scalable backend systems and APIs for enterprise applications.",
      company: "TechCorp Solutions",
      views: 987,
      matchRate: 78
    },
    {
      id: 3,
      title: "Data Science Intern",
      status: "active",
      statusText: "Active",
      applications: 28,
      shortlisted: 6,
      interviewed: 4,
      hired: 1,
      postedDate: "2024-10-05",
      deadline: "2024-11-10",
      type: "Hybrid",
      stipend: "₹18,000/month",
      duration: "4 months",
      location: "Mumbai, India",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      description: "Work on real-world data science problems and predictive models.",
      company: "TechCorp Solutions",
      views: 756,
      matchRate: 82
    },
    {
      id: 4,
      title: "UX Design Intern",
      status: "draft",
      statusText: "Draft",
      applications: 0,
      shortlisted: 0,
      interviewed: 0,
      hired: 0,
      postedDate: "2024-10-25",
      deadline: "2024-12-01",
      type: "Remote",
      stipend: "₹12,000/month",
      duration: "3 months",
      location: "Remote",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
      description: "Design beautiful user interfaces and improve user experiences.",
      company: "TechCorp Solutions",
      views: 0,
      matchRate: 0
    },
    {
      id: 5,
      title: "DevOps Intern",
      status: "closed",
      statusText: "Closed",
      applications: 18,
      shortlisted: 5,
      interviewed: 3,
      hired: 1,
      postedDate: "2024-09-15",
      deadline: "2024-10-15",
      type: "On-site",
      stipend: "₹16,000/month",
      duration: "5 months",
      location: "Delhi, India",
      skills: ["Docker", "Kubernetes", "AWS", "Linux"],
      description: "Manage infrastructure and deployment pipelines.",
      company: "TechCorp Solutions",
      views: 432,
      matchRate: 75
    },
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    sort: 'newest'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      case 'draft': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'closed': return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Remote': return 'bg-blue-100 text-blue-700';
      case 'On-site': return 'bg-purple-100 text-purple-700';
      case 'Hybrid': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internships</h1>
          <p className="text-gray-600">Manage and track your internship postings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <Link 
            to="/company/post-internship"
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Post New Internship
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Posted</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Briefcase className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-center text-sm text-emerald-600 mt-2">
            <TrendingUp size={14} className="mr-1" />
            +2 this month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="text-emerald-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">Live now</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3,420</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Eye className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="flex items-center text-sm text-emerald-600 mt-2">
            <TrendingUp size={14} className="mr-1" />
            +24% from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Match Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">84%</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <BarChart3 className="text-amber-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">Candidate quality</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search internships by title, skills, or description..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>

            <select 
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="all">All Types</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {internships.map((internship) => {
          const statusColors = getStatusColor(internship.status);
          return (
            <div key={internship.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{internship.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>
                        {internship.statusText}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{internship.description}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getTypeColor(internship.type)}`}>
                    {internship.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                    {internship.duration}
                  </span>
                  {internship.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{internship.applications}</div>
                    <div className="text-xs text-gray-500">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-emerald-600">{internship.shortlisted}</div>
                    <div className="text-xs text-gray-500">Shortlisted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{internship.interviewed}</div>
                    <div className="text-xs text-gray-500">Interviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{internship.hired}</div>
                    <div className="text-xs text-gray-500">Hired</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      Posted: {internship.postedDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2" />
                      Deadline: {internship.deadline}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign size={14} className="mr-2" />
                      {internship.stipend}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link 
                      to={`/company/internships/${internship.id}`}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Link>
                    <button className="px-4 py-2.5 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for No Internships */}
      {internships.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No internships posted yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start by posting your first internship to attract talented students and build your talent pipeline.
          </p>
          <Link 
            to="/company/post-internship"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <Plus size={18} className="mr-2" />
            Post Your First Internship
          </Link>
        </div>
      )}
    </div>
  );
};

export default InternshipsPage;