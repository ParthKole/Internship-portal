// src/admin/pages/CompanyRequests.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Search,
  Filter,
  Building,
  Mail,
  MapPin,
  Calendar,
  Check,
  X,
  Eye,
  MoreVertical,
  AlertCircle,
  Clock,
  TrendingUp,
  Download,
  Users
} from 'lucide-react';

const CompanyRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const companyRequests = [
    {
      id: 'C001',
      name: 'TechNova Solutions',
      email: 'hr@technova.com',
      location: 'Bangalore, India',
      industry: 'IT Services',
      contactPerson: 'Amit Sharma',
      contactNumber: '+91 9876543210',
      website: 'www.technova.com',
      founded: '2018',
      employeeCount: '150',
      description: 'Leading provider of enterprise software solutions and cloud services.',
      documents: ['Certificate of Incorporation', 'GST Certificate', 'Company Profile'],
      submittedDate: '2024-03-15',
      status: 'pending',
      verificationScore: 85
    },
    {
      id: 'C002',
      name: 'FinEdge Technologies',
      email: 'careers@finedge.com',
      location: 'Mumbai, India',
      industry: 'FinTech',
      contactPerson: 'Priya Patel',
      contactNumber: '+91 8765432109',
      website: 'www.finedge.com',
      founded: '2020',
      employeeCount: '80',
      description: 'Innovative financial technology solutions for modern banking.',
      documents: ['Registration Certificate', 'PAN Card', 'Company Brochure'],
      submittedDate: '2024-03-14',
      status: 'pending',
      verificationScore: 78
    },
    {
      id: 'C003',
      name: 'GreenFoods Pvt Ltd',
      email: 'info@greenfoods.com',
      location: 'Pune, India',
      industry: 'FoodTech',
      contactPerson: 'Rahul Verma',
      contactNumber: '+91 7654321098',
      website: 'www.greenfoods.com',
      founded: '2019',
      employeeCount: '120',
      description: 'Sustainable food technology and organic products.',
      documents: ['FSSAI License', 'GST Certificate', 'Quality Certificates'],
      submittedDate: '2024-03-13',
      status: 'approved',
      verificationScore: 92
    },
    {
      id: 'C004',
      name: 'MediCare Innovations',
      email: 'hr@medicare.com',
      location: 'Hyderabad, India',
      industry: 'HealthTech',
      contactPerson: 'Dr. Sneha Reddy',
      contactNumber: '+91 6543210987',
      website: 'www.medicare.com',
      founded: '2021',
      employeeCount: '65',
      description: 'Healthcare technology and medical equipment solutions.',
      documents: ['Medical License', 'Company Registration', 'Product Catalog'],
      submittedDate: '2024-03-12',
      status: 'pending',
      verificationScore: 72
    },
    {
      id: 'C005',
      name: 'EduTech Masters',
      email: 'admin@edutech.com',
      location: 'Delhi, India',
      industry: 'EdTech',
      contactPerson: 'Ankit Kumar',
      contactNumber: '+91 5432109876',
      website: 'www.edutech.com',
      founded: '2017',
      employeeCount: '200',
      description: 'Online education platform and learning management systems.',
      documents: ['Certificate of Incorporation', 'GST', 'Quality Assurance'],
      submittedDate: '2024-03-11',
      status: 'rejected',
      verificationScore: 45,
      rejectionReason: 'Incomplete documentation and verification failed'
    },
    {
      id: 'C006',
      name: 'AutoMotive Systems',
      email: 'careers@automotive.com',
      location: 'Chennai, India',
      industry: 'Automotive',
      contactPerson: 'Vikram Singh',
      contactNumber: '+91 4321098765',
      website: 'www.automotive.com',
      founded: '2016',
      employeeCount: '300',
      description: 'Automotive software and IoT solutions for smart vehicles.',
      documents: ['ISO Certification', 'Company Registration', 'Product Portfolio'],
      submittedDate: '2024-03-10',
      status: 'pending',
      verificationScore: 88
    },
    {
      id: 'C007',
      name: 'RetailChain Pro',
      email: 'info@retailchain.com',
      location: 'Gurgaon, India',
      industry: 'Retail',
      contactPerson: 'Neha Gupta',
      contactNumber: '+91 3210987654',
      website: 'www.retailchain.com',
      founded: '2015',
      employeeCount: '450',
      description: 'Retail management solutions and supply chain optimization.',
      documents: ['Trade License', 'GST Registration', 'Annual Report'],
      submittedDate: '2024-03-09',
      status: 'approved',
      verificationScore: 95
    },
    {
      id: 'C008',
      name: 'CyberSecure Labs',
      email: 'security@cybersecure.com',
      location: 'Bengaluru, India',
      industry: 'Cybersecurity',
      contactPerson: 'Arjun Menon',
      contactNumber: '+91 2109876543',
      website: 'www.cybersecure.com',
      founded: '2022',
      employeeCount: '50',
      description: 'Cybersecurity solutions and threat intelligence services.',
      documents: ['Security Certification', 'Company Registration', 'Client List'],
      submittedDate: '2024-03-08',
      status: 'pending',
      verificationScore: 68
    }
  ];

  const stats = [
    { label: 'Total Requests', value: companyRequests.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pending', value: companyRequests.filter(c => c.status === 'pending').length, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Approved', value: companyRequests.filter(c => c.status === 'approved').length, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Rejected', value: companyRequests.filter(c => c.status === 'rejected').length, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  const filteredRequests = companyRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (id) => {
    alert(`Company ${id} approved successfully!`);
    // In real app, update status to 'approved'
  };

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      alert(`Company ${id} rejected. Reason: ${reason}`);
      // In real app, update status to 'rejected' with reason
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center gap-1"><Clock size={14} /> Pending</span>;
      case 'approved': return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium flex items-center gap-1"><Check size={14} /> Approved</span>;
      case 'rejected': return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center gap-1"><X size={14} /> Rejected</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Unknown</span>;
    }
  };

  const getVerificationScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const ViewDetailsModal = ({ request, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
            <p className="text-gray-600">Review company information and documents</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{request.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Building size={16} />
                        {request.industry}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <MapPin size={16} />
                        {request.location}
                      </span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl ${getVerificationScoreColor(request.verificationScore)}`}>
                    <div className="text-2xl font-bold">{request.verificationScore}%</div>
                    <div className="text-sm">Verification Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Company Description</h4>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">{request.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Contact Person</div>
                    <div className="font-medium">{request.contactPerson}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Contact Number</div>
                    <div className="font-medium">{request.contactNumber}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Founded</div>
                    <div className="font-medium">{request.founded}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Employees</div>
                    <div className="font-medium">{request.employeeCount}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Submitted Documents</h4>
                  <div className="space-y-2">
                    {request.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-medium">{doc}</span>
                        <button className="text-[#4F46E5] hover:text-[#4338CA] text-sm font-medium">
                          View Document
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Review Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Approve Company
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-medium flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Company
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${request.email}`, '_blank')}
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Send Email
                  </button>
                </div>

                {request.status === 'rejected' && request.rejectionReason && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 mb-2">
                      <AlertCircle size={18} />
                      <span className="font-medium">Rejection Reason</span>
                    </div>
                    <p className="text-red-600 text-sm">{request.rejectionReason}</p>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Company Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{request.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Website</span>
                    <a href={`https://${request.website}`} target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline">
                      {request.website}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Submitted On</span>
                    <span className="font-medium">{request.submittedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Status</span>
                    {getStatusBadge(request.status)}
                  </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Company Registration Requests</h1>
          <p className="text-gray-600">Review and approve new company registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                {index === 0 && <Building size={24} className={stat.color} />}
                {index === 1 && <Clock size={24} className={stat.color} />}
                {index === 2 && <Check size={24} className={stat.color} />}
                {index === 3 && <X size={24} className={stat.color} />}
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Company Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((company) => (
          <div key={company.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                  <Building size={24} className="text-blue-600" />
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(company.status)}
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{company.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{company.description.substring(0, 80)}...</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Verification Score</span>
                <div className={`px-2 py-1 rounded text-sm font-medium ${getVerificationScoreColor(company.verificationScore)}`}>
                  {company.verificationScore}%
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    company.verificationScore >= 80 ? 'bg-emerald-500' :
                    company.verificationScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${company.verificationScore}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  <span className="text-sm truncate">{company.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-3 text-gray-400" />
                  <span className="text-sm">{company.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-3 text-gray-400" />
                  <span className="text-sm">{company.industry}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-3 text-gray-400" />
                  <span className="text-sm">Submitted: {company.submittedDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedRequest(company)}
                  className="flex items-center gap-2 px-4 py-2 text-[#4F46E5] hover:bg-[#4F46E5]/5 rounded-xl font-medium"
                >
                  <Eye size={18} />
                  View Details
                </button>
                
                {company.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(company.id)}
                      className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleReject(company.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="Reject"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
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

      {/* View Details Modal */}
      {selectedRequest && (
        <ViewDetailsModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
        />
      )}
    </AdminLayout>
  );
};

export default CompanyRequests;