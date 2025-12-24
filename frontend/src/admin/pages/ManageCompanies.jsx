// src/admin/pages/ManageCompanies.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Search,
  Filter,
  Building,
  Mail,
  MapPin,
  Users,
  Globe,
  Phone,
  Edit,
  Trash2,
  Eye,
  Shield,
  Ban,
  CheckCircle,
  TrendingUp,
  Briefcase,
  Calendar,
  Download,
  MoreVertical,
  AlertCircle,
  Star,
  ExternalLink
} from 'lucide-react';

const ManageCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const companies = [
    {
      id: 'C001',
      name: 'Microsoft',
      email: 'careers@microsoft.com',
      phone: '+1 425-882-8080',
      location: 'Redmond, Washington, USA',
      industry: 'Technology',
      website: 'microsoft.com',
      founded: '1975',
      employees: '221,000',
      internshipsPosted: 28,
      studentsHired: 156,
      avgPackage: '₹12.5 LPA',
      status: 'active',
      verified: true,
      rating: 4.8,
      contactPerson: 'Satya Nadella',
      joinedDate: '2022-01-15',
      lastActive: '2 hours ago',
      description: 'Global technology company known for Windows, Office, Azure, and enterprise solutions.'
    },
    {
      id: 'C002',
      name: 'Google',
      email: 'internships@google.com',
      phone: '+1 650-253-0000',
      location: 'Mountain View, California, USA',
      industry: 'Technology',
      website: 'google.com',
      founded: '1998',
      employees: '190,234',
      internshipsPosted: 24,
      studentsHired: 142,
      avgPackage: '₹14.2 LPA',
      status: 'active',
      verified: true,
      rating: 4.9,
      contactPerson: 'Sundar Pichai',
      joinedDate: '2021-11-20',
      lastActive: 'Today',
      description: 'Multinational technology company focusing on search engine, cloud computing, and AI.'
    },
    {
      id: 'C003',
      name: 'Amazon',
      email: 'university@amazon.com',
      phone: '+1 206-266-1000',
      location: 'Seattle, Washington, USA',
      industry: 'E-commerce & Cloud',
      website: 'amazon.com',
      founded: '1994',
      employees: '1,608,000',
      internshipsPosted: 32,
      studentsHired: 189,
      avgPackage: '₹11.8 LPA',
      status: 'active',
      verified: true,
      rating: 4.7,
      contactPerson: 'Andy Jassy',
      joinedDate: '2022-03-10',
      lastActive: '1 day ago',
      description: 'Multinational technology company focusing on e-commerce, cloud computing, and AI.'
    },
    {
      id: 'C004',
      name: 'TechNova Solutions',
      email: 'hr@technova.com',
      phone: '+91 80 1234 5678',
      location: 'Bangalore, India',
      industry: 'IT Services',
      website: 'technova.com',
      founded: '2018',
      employees: '850',
      internshipsPosted: 12,
      studentsHired: 45,
      avgPackage: '₹6.8 LPA',
      status: 'active',
      verified: true,
      rating: 4.3,
      contactPerson: 'Rajesh Kumar',
      joinedDate: '2023-05-22',
      lastActive: '3 days ago',
      description: 'Enterprise software solutions and cloud services provider.'
    },
    {
      id: 'C005',
      name: 'FinEdge Technologies',
      email: 'careers@finedge.com',
      phone: '+91 22 8765 4321',
      location: 'Mumbai, India',
      industry: 'FinTech',
      website: 'finedge.com',
      founded: '2020',
      employees: '320',
      internshipsPosted: 8,
      studentsHired: 28,
      avgPackage: '₹8.2 LPA',
      status: 'active',
      verified: true,
      rating: 4.5,
      contactPerson: 'Priya Sharma',
      joinedDate: '2023-08-14',
      lastActive: '1 week ago',
      description: 'Financial technology solutions for digital banking and payments.'
    },
    {
      id: 'C006',
      name: 'MediCare Innovations',
      email: 'info@medicare.com',
      phone: '+91 40 5678 1234',
      location: 'Hyderabad, India',
      industry: 'HealthTech',
      website: 'medicare.com',
      founded: '2019',
      employees: '560',
      internshipsPosted: 6,
      studentsHired: 18,
      avgPackage: '₹7.5 LPA',
      status: 'inactive',
      verified: false,
      rating: 4.1,
      contactPerson: 'Dr. Arjun Reddy',
      joinedDate: '2023-02-28',
      lastActive: '2 weeks ago',
      description: 'Healthcare technology and medical equipment manufacturer.'
    },
    {
      id: 'C007',
      name: 'AutoMotive Systems',
      email: 'careers@automotive.com',
      phone: '+91 44 9876 5432',
      location: 'Chennai, India',
      industry: 'Automotive',
      website: 'automotive.com',
      founded: '2016',
      employees: '1,200',
      internshipsPosted: 10,
      studentsHired: 32,
      avgPackage: '₹6.5 LPA',
      status: 'active',
      verified: true,
      rating: 4.2,
      contactPerson: 'Vikram Singh',
      joinedDate: '2022-09-05',
      lastActive: '5 days ago',
      description: 'Automotive software and IoT solutions for smart vehicles.'
    },
    {
      id: 'C008',
      name: 'GreenFoods Pvt Ltd',
      email: 'hello@greenfoods.com',
      phone: '+91 20 3456 7890',
      location: 'Pune, India',
      industry: 'FoodTech',
      website: 'greenfoods.com',
      founded: '2017',
      employees: '420',
      internshipsPosted: 5,
      studentsHired: 15,
      avgPackage: '₹5.8 LPA',
      status: 'suspended',
      verified: false,
      rating: 3.9,
      contactPerson: 'Neha Verma',
      joinedDate: '2023-01-10',
      lastActive: '1 month ago',
      description: 'Sustainable food technology and organic products company.'
    },
    {
      id: 'C009',
      name: 'CyberSecure Labs',
      email: 'security@cybersecure.com',
      phone: '+91 80 2345 6789',
      location: 'Bengaluru, India',
      industry: 'Cybersecurity',
      website: 'cybersecure.com',
      founded: '2021',
      employees: '180',
      internshipsPosted: 4,
      studentsHired: 12,
      avgPackage: '₹9.2 LPA',
      status: 'active',
      verified: true,
      rating: 4.6,
      contactPerson: 'Amit Patel',
      joinedDate: '2023-11-30',
      lastActive: 'Today',
      description: 'Cybersecurity solutions and threat intelligence services.'
    }
  ];

  const stats = [
    { 
      label: 'Total Companies', 
      value: companies.length, 
      change: '+12%', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      icon: <Building size={24} />
    },
    { 
      label: 'Active', 
      value: companies.filter(c => c.status === 'active').length, 
      change: '+8%', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100',
      icon: <CheckCircle size={24} />
    },
    { 
      label: 'Verified', 
      value: companies.filter(c => c.verified).length, 
      change: '+15%', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100',
      icon: <Shield size={24} />
    },
    { 
      label: 'Avg. Students Hired', 
      value: Math.round(companies.reduce((acc, c) => acc + c.studentsHired, 0) / companies.length), 
      change: '+23%', 
      color: 'text-amber-600', 
      bg: 'bg-amber-100',
      icon: <Users size={24} />
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id) => {
    const company = companies.find(c => c.id === id);
    if (company) {
      const newStatus = company.status === 'active' ? 'inactive' : 'active';
      alert(`Company ${company.name} status changed to ${newStatus}`);
      // In real app: update company status
    }
  };

  const handleDelete = (id) => {
    setCompanyToDelete(companies.find(c => c.id === id));
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      alert(`Company ${companyToDelete.name} deleted successfully!`);
      // In real app: delete company
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  const getStatusBadge = (status, verified) => {
    if (status === 'active') {
      return (
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium flex items-center gap-1">
          {verified && <Shield size={12} />}
          {verified ? 'Verified Active' : 'Active'}
        </span>
      );
    } else if (status === 'inactive') {
      return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Inactive</span>;
    } else if (status === 'suspended') {
      return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Suspended</span>;
    }
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star size={14} className="text-amber-500 fill-amber-500" />
        <span className="font-medium">{rating}</span>
        <span className="text-gray-500 text-sm">/5</span>
      </div>
    );
  };

  const CompanyDetailsModal = ({ company, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <Building size={28} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
              <p className="text-gray-600">{company.industry}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Ban size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Company Overview</h3>
                    <p className="text-gray-600">Complete company profile and statistics</p>
                  </div>
                  {getStatusBadge(company.status, company.verified)}
                </div>
                <p className="text-gray-700">{company.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Internships Posted</div>
                  <div className="text-2xl font-bold text-gray-900">{company.internshipsPosted}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Students Hired</div>
                  <div className="text-2xl font-bold text-gray-900">{company.studentsHired}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Avg. Package</div>
                  <div className="text-2xl font-bold text-gray-900">{company.avgPackage}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Rating</div>
                  {getRatingStars(company.rating)}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{company.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{company.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{company.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a 
                        href={`https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-[#4F46E5] hover:underline flex items-center gap-1"
                      >
                        {company.website} <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Company Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium">{company.founded}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Employees</span>
                    <span className="font-medium">{company.employees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Contact Person</span>
                    <span className="font-medium">{company.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Joined Date</span>
                    <span className="font-medium">{company.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Active</span>
                    <span className="font-medium">{company.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] font-medium">
                    View Posted Internships
                  </button>
                  <button className="w-full py-3 border border-[#4F46E5] text-[#4F46E5] rounded-xl hover:bg-[#4F46E5]/5 font-medium">
                    Send Message
                  </button>
                  <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
                    View Analytics
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Danger Zone</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      toggleStatus(company.id);
                      onClose();
                    }}
                    className={`w-full py-3 rounded-xl font-medium ${
                      company.status === 'active'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    {company.status === 'active' ? 'Deactivate Company' : 'Activate Company'}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      handleDelete(company.id);
                    }}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium"
                  >
                    Delete Company
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Companies</h1>
          <p className="text-gray-600">Oversee all registered companies and their activities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
            <Download size={18} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA]">
            <Briefcase size={18} />
            Add Company
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center justify-end">
                  <TrendingUp size={12} className="mr-1" />
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 flex-1 max-w-lg">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search companies by name, industry, or location..."
              className="bg-transparent w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent">
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="FinTech">FinTech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="Automotive">Automotive</option>
              <option value="FoodTech">FoodTech</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Company</th>
                <th className="p-4 text-left font-semibold text-gray-700">Industry</th>
                <th className="p-4 text-left font-semibold text-gray-700">Location</th>
                <th className="p-4 text-left font-semibold text-gray-700">Internships</th>
                <th className="p-4 text-left font-semibold text-gray-700">Hired</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left font-semibold text-gray-700">Rating</th>
                <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                        <Building size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          {company.verified && (
                            <Shield size={14} className="text-emerald-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{company.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {company.industry}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-sm">{company.location.split(',')[0]}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-medium">{company.internshipsPosted}</div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-medium text-emerald-600">{company.studentsHired}</div>
                  </td>
                  
                  <td className="p-4">
                    {getStatusBadge(company.status, company.verified)}
                  </td>
                  
                  <td className="p-4">
                    {getRatingStars(company.rating)}
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCompany(company)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => toggleStatus(company.id)}
                        className={`p-2 rounded-lg ${
                          company.status === 'active'
                            ? 'hover:bg-red-100 text-red-600'
                            : 'hover:bg-emerald-100 text-emerald-600'
                        }`}
                        title={company.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {company.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="px-6 py-3 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal 
          company={selectedCompany} 
          onClose={() => setSelectedCompany(null)} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && companyToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Delete Company</h2>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700">
                Are you sure you want to delete <span className="font-bold">{companyToDelete.name}</span>? 
                All associated internships and data will be permanently removed.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCompanyToDelete(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-medium"
              >
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageCompanies;