// src/admin/pages/Announcements.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Megaphone,
  Send,
  Clock,
  Users,
  Building,
  Bell,
  Calendar,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Google Drive Schedule Update',
      message: 'The Google campus drive originally scheduled for Nov 15 has been moved to Nov 18 due to unforeseen circumstances. Please update your calendars accordingly.',
      audience: 'students',
      type: 'urgent',
      date: '2024-10-28',
      time: '10:30 AM',
      status: 'published',
      readCount: 1240
    },
    {
      id: 2,
      title: 'Resume Submission Deadline',
      message: 'Last date for resume submission for Amazon internship drive is 10th November 2024. Students must submit their updated resumes through the portal.',
      audience: 'students',
      type: 'info',
      date: '2024-10-25',
      time: '2:00 PM',
      status: 'published',
      readCount: 1120
    },
    {
      id: 3,
      title: 'New Company Registration Open',
      message: 'We are pleased to announce that TechNova Pvt Ltd has been approved and is now accepting internship applications for Spring 2024.',
      audience: 'students',
      type: 'success',
      date: '2024-10-22',
      time: '11:00 AM',
      status: 'published',
      readCount: 980
    },
    {
      id: 4,
      title: 'Placement Training Workshop',
      message: 'A comprehensive placement training workshop will be conducted on 5th November. All final year students are required to attend.',
      audience: 'students',
      type: 'warning',
      date: '2024-10-20',
      time: '9:00 AM',
      status: 'draft',
      readCount: 0
    },
    {
      id: 5,
      title: 'Company Portal Maintenance',
      message: 'The company portal will undergo maintenance on 30th October from 10 PM to 2 AM. Please plan your activities accordingly.',
      audience: 'companies',
      type: 'info',
      date: '2024-10-18',
      time: '4:00 PM',
      status: 'published',
      readCount: 86
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    audience: 'students',
    type: 'info',
    scheduleDate: '',
    scheduleTime: '',
    immediate: true
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnn = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      audience: newAnnouncement.audience,
      type: newAnnouncement.type,
      date: newAnnouncement.immediate ? new Date().toISOString().split('T')[0] : newAnnouncement.scheduleDate,
      time: newAnnouncement.immediate ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : newAnnouncement.scheduleTime,
      status: 'published',
      readCount: 0
    };
    
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({
      title: '',
      message: '',
      audience: 'students',
      type: 'info',
      scheduleDate: '',
      scheduleTime: '',
      immediate: true
    });
    setShowForm(false);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'urgent': return <AlertCircle className="text-red-500" size={20} />;
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={20} />;
      default: return <Bell className="text-blue-500" size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-emerald-100 text-emerald-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Broadcast messages to students and companies</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-xl hover:opacity-90"
        >
          <Megaphone size={20} />
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Megaphone size={24} className="text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{announcements.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-emerald-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{announcements.filter(a => a.audience === 'students').length}</div>
              <div className="text-sm text-gray-600">For Students</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building size={24} className="text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{announcements.filter(a => a.audience === 'companies').length}</div>
              <div className="text-sm text-gray-600">For Companies</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-amber-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{announcements.filter(a => a.status === 'draft').length}</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </div>
          </div>
        </div>
      </div>

      {/* New Announcement Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Announcement</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                  placeholder="Type your announcement message here..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={newAnnouncement.audience}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, audience: e.target.value})}
                  >
                    <option value="students">Students Only</option>
                    <option value="companies">Companies Only</option>
                    <option value="both">Both Students & Companies</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                  >
                    <option value="info">Information</option>
                    <option value="urgent">Urgent</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAnnouncement.immediate}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, immediate: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">Send immediately</span>
                </label>
                
                {!newAnnouncement.immediate && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        value={newAnnouncement.scheduleDate}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduleDate: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                      <input
                        type="time"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        value={newAnnouncement.scheduleTime}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduleTime: e.target.value})}
                      />
                    </div>
                  </div>
                )}
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
                  {newAnnouncement.immediate ? 'Publish Now' : 'Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {getTypeIcon(ann.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{ann.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${getTypeColor(ann.type)}`}>
                      {ann.type.charAt(0).toUpperCase() + ann.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      ann.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ann.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ann.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{ann.date} at {ann.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {ann.audience === 'students' ? <Users size={14} /> :
                       ann.audience === 'companies' ? <Building size={14} /> :
                       <><Users size={14} /> <Building size={14} /></>}
                      <span>{ann.audience.charAt(0).toUpperCase() + ann.audience.slice(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{ann.readCount} views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Edit size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Trash2 size={18} />
                </button>
                {ann.status === 'draft' && (
                  <button className="px-3 py-1 bg-[#4F46E5] text-white text-sm rounded-lg hover:bg-[#4338CA]">
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Announcements;