import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Search, Filter, MapPin, DollarSign, Clock, 
  Calendar, Briefcase, ChevronRight, Bookmark, Eye,
  Users, CheckCircle, MessageSquare, Star
} from 'lucide-react';
import api from '../../utils/api';
import InterviewReviews from '../components/InterviewReviews';

const InternshipsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('internships');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  // Fetch Internships
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await api.get('/internships');
        
        // Ensure data exists before mapping
        const formattedData = Array.isArray(res.data) ? res.data.map(item => ({
            id: item._id,
            // Fallback for company name as backend might send ObjectId
            company: item.companyId?.name || 'Company',
            role: item.title,
            location: item.location,
            salary: item.stipend ? `₹${item.stipend}/month` : 'Unpaid',
            duration: 'Flexible', 
            posted: new Date(item.createdAt).toLocaleDateString(),
            deadline: 'Open',
            match: 85, // Placeholder match score
            skills: item.skillsRequired || [],
            type: 'On-site',
            description: item.description,
            applications: 0,
            reviewsCount: 0,
            avgRating: 0
        })) : [];

        setInternships(formattedData);
      } catch (err) {
        console.error("Failed to fetch internships", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  // Handle Apply Action - Matches backend route /student/apply/:id
  const handleApply = async (internshipId) => {
    setApplying(internshipId);
    try {
        const response = await api.post(`/student/apply/${internshipId}`);
        // Backend returns: { message: 'Application submitted successfully' }
        alert(response.data.message || 'Application submitted successfully!');
    } catch (err) {
        // Backend returns: status 400 { message: 'Already applied' } or 500 { error: ... }
        const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to apply';
        alert(msg);
    } finally {
        setApplying(null);
    }
  };

  const filteredInternships = internships.filter(internship => {
    if (searchTerm) {
      return internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
             internship.role.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

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
              </div>
              
              {/* Search */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search internships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('internships')}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === 'internships'
                      ? 'border-[#4F46E5] text-[#4F46E5]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Internships
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-[#4F46E5] text-[#4F46E5]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Interview Experiences
                </button>
              </div>
            </div>

            {activeTab === 'internships' ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {loading ? (
                   <div className="p-12 text-center text-gray-500">Loading opportunities...</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredInternships.map(internship => (
                      <div key={internship.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{internship.company}</h3>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">{internship.role}</h2>
                                <p className="text-gray-600 text-sm mb-4">{internship.description}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin size={14} className="mr-2 text-gray-400" />
                                    {internship.location}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <DollarSign size={14} className="mr-2 text-gray-400" />
                                    {internship.salary}
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {internship.skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">{skill}</span>
                                    ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2">
                                <button 
                                  onClick={() => handleApply(internship.id)}
                                  disabled={applying === internship.id}
                                  className="px-6 py-2 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors text-sm flex items-center justify-center disabled:opacity-70"
                                >
                                  {applying === internship.id ? 'Applying...' : 'Apply Now'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredInternships.length === 0 && (
                        <div className="p-12 text-center text-gray-500">No internships found matching your criteria.</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
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