// src/admin/pages/PlacementDrives.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PlacementDrives = () => {
  const [drives, setDrives] = useState([
    {
      id: 1,
      title: 'Google Campus Drive 2024',
      company: 'Google',
      date: '2024-11-15',
      time: '10:00 AM',
      venue: 'Main Auditorium',
      type: 'FTE',
      registered: 245,
      capacity: 300,
      status: 'upcoming',
      coordinator: 'Prof. Sharma'
    },
    {
      id: 2,
      title: 'Amazon Internship Drive',
      company: 'Amazon',
      date: '2024-11-20',
      time: '2:00 PM',
      venue: 'Room 101',
      type: 'Internship',
      registered: 189,
      capacity: 200,
      status: 'upcoming',
      coordinator: 'Prof. Verma'
    },
    {
      id: 3,
      title: 'Microsoft Hiring Drive',
      company: 'Microsoft',
      date: '2024-11-05',
      time: '9:00 AM',
      venue: 'Tech Park',
      type: 'FTE',
      registered: 156,
      capacity: 150,
      status: 'ongoing',
      coordinator: 'Prof. Singh'
    },
    {
      id: 4,
      title: 'TCS Recruitment 2024',
      company: 'TCS',
      date: '2024-10-28',
      time: '11:00 AM',
      venue: 'Seminar Hall',
      type: 'Both',
      registered: 320,
      capacity: 350,
      status: 'completed',
      coordinator: 'Prof. Patel'
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date: '',
    time: '',
    venue: '',
    type: 'FTE',
    capacity: '',
    coordinator: ''
  });

  const handleAddDrive = (e) => {
    e.preventDefault();
    const newDrive = {
      id: drives.length + 1,
      ...formData,
      registered: 0,
      status: 'upcoming'
    };
    setDrives([...drives, newDrive]);
    setFormData({
      title: '',
      company: '',
      date: '',
      time: '',
      venue: '',
      type: 'FTE',
      capacity: '',
      coordinator: ''
    });
    setShowForm(false);
  };

  const stats = [
    { label: 'Total Drives', value: drives.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Upcoming', value: drives.filter(d => d.status === 'upcoming').length, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Ongoing', value: drives.filter(d => d.status === 'ongoing').length, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Total Registrations', value: drives.reduce((acc, d) => acc + d.registered, 0), color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Placement Drives</h1>
          <p className="text-gray-600">Manage campus placement drives and schedules</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Schedule Drive
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <Target size={24} className={stat.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Drive Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Schedule New Drive</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddDrive} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drive Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="FTE">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA]"
                >
                  Schedule Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drives.map((drive) => (
          <div key={drive.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{drive.title}</h3>
                <p className="text-gray-600 text-sm">by {drive.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(drive.status)}`}>
                {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-3 text-gray-400" />
                <span className="text-sm">{drive.date} at {drive.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-3 text-gray-400" />
                <span className="text-sm">{drive.venue}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users size={16} className="mr-3 text-gray-400" />
                <div>
                  <span className="text-sm font-medium">{drive.registered} / {drive.capacity} registered</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-[#4F46E5] h-2 rounded-full"
                      style={{ width: `${(drive.registered / drive.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-3 text-gray-400" />
                <span className="text-sm">Coordinator: {drive.coordinator}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Eye size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Edit size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  drive.type === 'FTE' ? 'bg-blue-100 text-blue-800' :
                  drive.type === 'Internship' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {drive.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default PlacementDrives;