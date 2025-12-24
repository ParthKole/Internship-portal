// src/admin/pages/ManageStudents.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Users,
  GraduationCap,
  Ban,
  AlertTriangle,
  Activity,
  Mail,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  TrendingUp,
  FileText,
  MessageSquare,
  Calendar,
  BookOpen,
  ChevronDown,
  Shield,
  Award,
  X,
  Plus,
  BarChart3,
  Send,
  RefreshCw,
  MoreVertical,
  CheckCircle
} from 'lucide-react';

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: "Madhura Sharma", email: "madhura.sharma@college.edu", branch: "IT", year: "3rd", cgpa: 8.9, applications: 14, offers: 1, status: "Active", readiness: 82 },
    { id: 2, name: "Rahul Verma", email: "rahul.verma@college.edu", branch: "CSE", year: "4th", cgpa: 9.2, applications: 18, offers: 2, status: "Active", readiness: 90 },
    { id: 3, name: "Sneha Patil", email: "sneha.patil@college.edu", branch: "ENTC", year: "2nd", cgpa: 6.1, applications: 4, offers: 0, status: "Inactive", readiness: 45 },
    { id: 4, name: "Amit Joshi", email: "amit.joshi@college.edu", branch: "IT", year: "3rd", cgpa: 7.4, applications: 9, offers: 0, status: "Active", readiness: 60 },
    { id: 5, name: "Rohan Mehta", email: "rohan.mehta@college.edu", branch: "CSE", year: "4th", cgpa: 5.9, applications: 2, offers: 0, status: "Inactive", readiness: 38 },
    { id: 6, name: "Neha Kulkarni", email: "neha.kulkarni@college.edu", branch: "ENTC", year: "3rd", cgpa: 7.8, applications: 11, offers: 1, status: "Active", readiness: 72 },
    { id: 7, name: "Vishal Patil", email: "vishal.patil@college.edu", branch: "IT", year: "4th", cgpa: 6.4, applications: 5, offers: 0, status: "Inactive", readiness: 50 },
    { id: 8, name: "Kunal Deshpande", email: "kunal.deshpande@college.edu", branch: "CSE", year: "3rd", cgpa: 8.1, applications: 10, offers: 1, status: "Active", readiness: 78 },
    { id: 9, name: "Pooja Nair", email: "pooja.nair@college.edu", branch: "IT", year: "2nd", cgpa: 8.5, applications: 6, offers: 0, status: "Active", readiness: 70 },
    { id: 10, name: "Aditya Kulkarni", email: "aditya.kulkarni@college.edu", branch: "Mechanical", year: "4th", cgpa: 6.8, applications: 3, offers: 0, status: "Inactive", readiness: 48 },
    { id: 11, name: "Sakshi Jain", email: "sakshi.jain@college.edu", branch: "CSE", year: "3rd", cgpa: 9.0, applications: 16, offers: 2, status: "Active", readiness: 88 },
    { id: 12, name: "Omkar Patil", email: "omkar.patil@college.edu", branch: "ENTC", year: "4th", cgpa: 7.2, applications: 7, offers: 0, status: "Active", readiness: 65 },
  ];

  const branches = [
    { name: "Computer Science", count: 450, color: "from-blue-500 to-blue-600" },
    { name: "Information Technology", count: 380, color: "from-indigo-500 to-indigo-600" },
    { name: "Electronics", count: 280, color: "from-cyan-500 to-cyan-600" },
    { name: "Mechanical", count: 190, color: "from-slate-600 to-slate-700" },
  ];

  const atRisk = students.filter(s => s.readiness < 60);

  const recentActivity = [
    { id: 1, text: "Madhura Sharma updated her resume", time: "2 hours ago", icon: <FileText size={14} /> },
    { id: 2, text: "Rahul Verma received offer from Amazon", time: "4 hours ago", icon: <Award size={14} /> },
    { id: 3, text: "Sneha Patil marked as inactive", time: "1 day ago", icon: <Ban size={14} /> },
    { id: 4, text: "Amit Joshi missed assessment deadline", time: "1 day ago", icon: <AlertTriangle size={14} /> },
    { id: 5, text: "Sakshi Jain shortlisted by Google", time: "2 days ago", icon: <CheckCircle size={14} /> },
  ];

  const stats = [
    { 
      label: "Total Students", 
      value: students.length, 
      change: "+8%", 
      color: "text-blue-700", 
      bg: "bg-blue-50",
      icon: <Users size={22} />
    },
    { 
      label: "Active Students", 
      value: students.filter(s => s.status === "Active").length, 
      change: "+12%", 
      color: "text-emerald-700", 
      bg: "bg-emerald-50",
      icon: <GraduationCap size={22} />
    },
    { 
      label: "Inactive Students", 
      value: students.filter(s => s.status === "Inactive").length, 
      change: "-5%", 
      color: "text-rose-700", 
      bg: "bg-rose-50",
      icon: <Ban size={22} />
    },
    { 
      label: "At Risk", 
      value: atRisk.length, 
      change: "-3%", 
      color: "text-amber-700", 
      bg: "bg-amber-50",
      icon: <AlertTriangle size={22} />
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesBranch = filterBranch === 'all' || student.branch === filterBranch;
    
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const StudentDetailsModal = ({ student, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
              <span className="font-bold text-blue-700 text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
              <p className="text-gray-600 text-sm">{student.email}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Branch</label>
                <div className="font-medium text-gray-900">{student.branch}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Year</label>
                <div className="font-medium text-gray-900">{student.year}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">CGPA</label>
                <div className={`font-bold ${student.cgpa >= 8 ? 'text-emerald-700' : student.cgpa >= 7 ? 'text-blue-700' : 'text-amber-700'}`}>
                  {student.cgpa}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Applications</label>
                <div className="font-medium text-gray-900">{student.applications} total</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Offers</label>
                <div className="font-medium text-emerald-700">{student.offers} received</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Readiness Score</label>
                <div className="font-medium text-gray-900">{student.readiness}%</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm">
              View Full Profile
            </button>
            <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Management</h1>
            <p className="text-gray-600 mt-1">Monitor student activity, readiness and placement performance</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
              <Download size={18} />
              Export Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                <div className={`text-xs font-medium mt-2 ${
                  stat.change.includes('+') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.change} from last month
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-5 mb-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 flex-1 max-w-lg border border-gray-200">
            <Search size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search students by name, email, or branch..."
              className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-gray-700 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-gray-700 bg-white"
            >
              <option value="all">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ENTC">ENTC</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - Student Table */}
        <div className="lg:col-span-2">
          {/* STUDENT TABLE */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Student List</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Showing {filteredStudents.length} of {students.length} students
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm">
                  Sorted by: <span className="font-medium text-gray-900">Readiness Score</span>
                </span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CGPA</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applications</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Readiness</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                            <span className="font-bold text-blue-700 text-sm">
                              {s.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{s.name}</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                              <Mail size={12} />
                              {s.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {s.branch}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="font-medium">{s.year}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className={`font-bold text-base ${
                          s.cgpa >= 8.5 ? 'text-emerald-700' :
                          s.cgpa >= 7.0 ? 'text-blue-700' :
                          s.cgpa >= 6.0 ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {s.cgpa}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium text-gray-900">{s.applications}</div>
                            <div className="text-xs text-gray-500">{s.offers} offers</div>
                          </div>
                          {s.offers > 0 && (
                            <Award size={16} className="text-amber-500" />
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{s.readiness}%</span>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                              s.readiness >= 80 ? 'bg-emerald-100 text-emerald-800' :
                              s.readiness >= 60 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {s.readiness >= 80 ? 'High' : s.readiness >= 60 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                s.readiness >= 80 ? 'bg-emerald-500' :
                                s.readiness >= 60 ? 'bg-blue-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${s.readiness}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          s.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
                            title="Edit Student"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className={`p-1.5 rounded ${
                              s.status === 'Active'
                                ? 'hover:bg-rose-50 text-rose-600 hover:text-rose-700'
                                : 'hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700'
                            }`}
                            title={s.status === 'Active' ? 'Deactivate' : 'Activate'}
                          >
                            {s.status === 'Active' ? <Ban size={18} /> : <Shield size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterBranch('all');
                  }}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    Showing <span className="font-medium">1-{filteredStudents.length}</span> of{' '}
                    <span className="font-medium">{students.length}</span> students
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 font-medium">
                      Previous
                    </button>
                    <button className="px-3 py-1.5 bg-gray-900 text-white rounded font-medium">
                      1
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 font-medium">
                      2
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 font-medium">
                      3
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 font-medium">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - Sidebar Widgets */}
        <div className="space-y-6">
          {/* BRANCH DISTRIBUTION */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Branch Distribution</h2>
              <BookOpen size={18} className="text-gray-600" />
            </div>
            <div className="space-y-4">
              {branches.map(b => {
                const totalStudents = branches.reduce((acc, branch) => acc + branch.count, 0);
                const percentage = Math.round((b.count / totalStudents) * 100);
                
                return (
                  <div key={b.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{b.name}</span>
                      <span className="text-gray-600">{b.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${b.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{branches.reduce((acc, b) => acc + b.count, 0)}</span> total students across all branches
              </div>
            </div>
          </div>

          {/* AT RISK */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Students At Risk</h2>
              <AlertTriangle size={18} className="text-amber-600" />
            </div>
            <div className="space-y-3">
              {atRisk.slice(0, 3).map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{s.name}</h3>
                    <p className="text-sm text-gray-600">{s.branch} • {s.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-700">{s.readiness}%</div>
                    <div className="text-xs text-gray-500">Readiness</div>
                  </div>
                </div>
              ))}
            </div>
            {atRisk.length > 3 && (
              <button className="w-full mt-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                View All ({atRisk.length}) At-Risk Students
              </button>
            )}
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Activity size={18} className="text-gray-600" />
            </div>
            <ul className="space-y-3">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-0.5">
                    <div className="text-gray-600">
                      {activity.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <span className="text-xs text-gray-500 mt-0.5">{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              View All Activity
            </button>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-colors group">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                  <FileText size={16} className="text-blue-600" />
                </div>
                <span className="font-medium">Generate Report</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-colors group">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100">
                  <Send size={16} className="text-emerald-600" />
                </div>
                <span className="font-medium">Send Bulk Message</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-colors group">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100">
                  <RefreshCw size={16} className="text-amber-600" />
                </div>
                <span className="font-medium">Update Readiness Scores</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-colors group">
                <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100">
                  <BarChart3 size={16} className="text-purple-600" />
                </div>
                <span className="font-medium">View Analytics Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentDetailsModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </AdminLayout>
  );
};

export default ManageStudents;