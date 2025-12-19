// src/admin/pages/ManageInternships.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Search,
  Filter,
  Briefcase,
  Building,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Download
} from 'lucide-react';

const ManageInternships = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const internships = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      type: 'Paid',
      stipend: '₹45,000/month',
      duration: '6 months',
      applicants: 142,
      posted: '2024-10-15',
      deadline: '2024-11-15',
      status: 'active',
      skills: ['React', 'Node.js', 'Python']
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Microsoft',
      type: 'Paid',
      stipend: '₹40,000/month',
      duration: '5 months',
      applicants: 98,
      posted: '2024-10-18',
      deadline: '2024-11-20',
      status: 'active',
      skills: ['Python', 'ML', 'SQL']
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Amazon',
      type: 'Unpaid',
      stipend: 'Certificate Only',
      duration: '3 months',
      applicants: 56,
      posted: '2024-10-10',
      deadline: '2024-10-30',
      status: 'expired',
      skills: ['Marketing', 'Social Media', 'SEO']
    },
    {
      id: 4,
      title: 'DevOps Intern',
      company: 'TechNova',
      type: 'Paid',
      stipend: '₹35,000/month',
      duration: '4 months',
      applicants: 72,
      posted: '2024-10-22',
      deadline: '2024-11-25',
      status: 'active',
      skills: ['Docker', 'AWS', 'Kubernetes']
    },
    {
      id: 5,
      title: 'UI/UX Design Intern',
      company: 'Adobe',
      type: 'Paid',
      stipend: '₹38,000/month',
      duration: '6 months',
      applicants: 89,
      posted: '2024-10-05',
      deadline: '2024-11-10',
      status: 'active',
      skills: ['Figma', 'Sketch', 'Adobe XD']
    },
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(search.toLowerCase()) ||
                         internship.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || internship.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Internships', value: internships.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active', value: internships.filter(i => i.status === 'active').length, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Expired', value: internships.filter(i => i.status === 'expired').length, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Total Applicants', value: internships.reduce((acc, i) => acc + i.applicants, 0), color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Internships</h1>
        <p className="text-gray-600">Oversee all internship postings and applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <Briefcase size={24} className={stat.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
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
              placeholder="Search internships by title or company..."
              className="bg-transparent w-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Internships Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Internship Details</th>
                <th className="p-4 text-left font-semibold text-gray-700">Company</th>
                <th className="p-4 text-left font-semibold text-gray-700">Stipend</th>
                <th className="p-4 text-left font-semibold text-gray-700">Applicants</th>
                <th className="p-4 text-left font-semibold text-gray-700">Deadline</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInternships.map((internship) => (
                <tr key={internship.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                        <Briefcase size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{internship.title}</h3>
                        <p className="text-sm text-gray-600">{internship.duration}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {internship.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Building size={16} className="text-gray-400" />
                      <span className="font-medium">{internship.company}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className={internship.type === 'Paid' ? 'text-emerald-500' : 'text-gray-400'} />
                      <span className={internship.type === 'Paid' ? 'font-medium' : 'text-gray-600'}>
                        {internship.stipend}
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-blue-500" />
                      <div>
                        <div className="font-medium">{internship.applicants}</div>
                        <div className="text-xs text-gray-500">applicants</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">{internship.deadline}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      internship.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {internship.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#4F46E5]">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInternships.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No internships found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageInternships;