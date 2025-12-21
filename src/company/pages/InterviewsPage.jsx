// src/company/pages/InterviewsPage.jsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Video,
  Phone,
  MapPin,
  ChevronRight,
  Plus,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  MessageSquare,
  Edit,
  Star,
  Zap,
  TrendingUp,
  Briefcase
} from 'lucide-react';

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidate: 'Priya Patel',
      role: 'Backend Developer Intern',
      time: 'Today, 2:00 PM',
      date: '2024-10-26',
      duration: '45 mins',
      type: 'Technical Round',
      mode: 'video',
      interviewer: 'John Doe (Tech Lead)',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      candidateEmail: 'priya.patel@example.com',
      candidatePhone: '+91 9876543210',
      notes: 'Focus on system design and algorithms',
      rating: 4.5
    },
    {
      id: 2,
      candidate: 'Rahul Sharma',
      role: 'Frontend Developer Intern',
      time: 'Tomorrow, 11:00 AM',
      date: '2024-10-27',
      duration: '60 mins',
      type: 'HR Round',
      mode: 'in-person',
      interviewer: 'Sarah Smith (HR Manager)',
      status: 'scheduled',
      location: 'Office - Conference Room A',
      candidateEmail: 'rahul.sharma@example.com',
      candidatePhone: '+91 8765432109',
      notes: 'Discuss cultural fit and career goals',
      rating: 4.8
    },
    {
      id: 3,
      candidate: 'Amit Kumar',
      role: 'Data Science Intern',
      time: 'Oct 28, 3:30 PM',
      date: '2024-10-28',
      duration: '60 mins',
      type: 'Technical Round',
      mode: 'phone',
      interviewer: 'David Lee (Data Scientist)',
      status: 'pending',
      candidatePhone: '+91 7654321098',
      notes: 'Focus on ML concepts and past projects',
      rating: 4.3
    },
    {
      id: 4,
      candidate: 'Neha Gupta',
      role: 'UX Design Intern',
      time: 'Oct 29, 10:00 AM',
      date: '2024-10-29',
      duration: '90 mins',
      type: 'Portfolio Review',
      mode: 'video',
      interviewer: 'Lisa Wang (Design Lead)',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/xyz-pqrs-tuv',
      candidateEmail: 'neha.gupta@example.com',
      candidatePhone: '+91 6543210987',
      notes: 'Review design portfolio and problem-solving approach',
      rating: 4.7
    },
    {
      id: 5,
      candidate: 'Sandeep Reddy',
      role: 'DevOps Intern',
      time: 'Oct 25, 1:00 PM',
      date: '2024-10-25',
      duration: '45 mins',
      type: 'Technical Round',
      mode: 'video',
      interviewer: 'Mike Johnson (DevOps Engineer)',
      status: 'completed',
      outcome: 'shortlisted',
      feedback: 'Strong technical skills, good cultural fit',
      rating: 4.2
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  const getStatusColor = (status) => {
    const colors = {
      confirmed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      scheduled: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      completed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
      cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    };
    return colors[status] || colors.scheduled;
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'video': return <Video size={16} className="text-blue-600" />;
      case 'in-person': return <MapPin size={16} className="text-emerald-600" />;
      case 'phone': return <Phone size={16} className="text-purple-600" />;
      default: return <Video size={16} className="text-gray-600" />;
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'shortlisted': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Schedule</h1>
          <p className="text-gray-600">Manage interviews and track candidate progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Download size={18} className="mr-2" />
            Export Schedule
          </button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            <Plus size={18} className="mr-2" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-emerald-600 mt-2">All confirmed</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">Scheduled</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">94%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-emerald-600 mt-2">+5% from last week</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.6</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Star className="text-amber-600" size={20} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">Interviewer feedback</div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search interviews by candidate name, role..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <select className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              More Filters
            </button>
            
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
            <Video size={14} className="mr-2" />
            8 Video Calls
          </span>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium flex items-center">
            <MapPin size={14} className="mr-2" />
            3 In-person
          </span>
          <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium flex items-center">
            <Phone size={14} className="mr-2" />
            1 Phone
          </span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium flex items-center">
            <Clock size={14} className="mr-2" />
            4.6 Avg Duration
          </span>
        </div>
      </div>

      {/* Interviews List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Interviews</h2>
            <div className="text-sm text-gray-600">
              {interviews.filter(i => i.status !== 'completed').length} interviews scheduled
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {interviews.map((interview) => {
            const statusColors = getStatusColor(interview.status);
            const isToday = interview.date === new Date().toISOString().split('T')[0];
            const isPast = new Date(interview.date) < new Date();
            
            return (
              <div key={interview.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column - Interview Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {interview.candidate.split(' ').map(n => n[0]).join('')}
                          </div>
                          {isToday && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              !
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{interview.candidate}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>
                              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                            </span>
                            {interview.outcome && (
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getOutcomeColor(interview.outcome)}`}>
                                {interview.outcome.charAt(0).toUpperCase() + interview.outcome.slice(1)}
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Briefcase size={14} className="mr-2" />
                              <span className="font-medium">{interview.role}</span>
                              <span className="mx-2">•</span>
                              <span>{interview.type}</span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-2" />
                                {interview.time}
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="mr-2" />
                                {interview.duration}
                              </div>
                              <div className="flex items-center">
                                {getModeIcon(interview.mode)}
                                <span className="ml-2 capitalize">{interview.mode}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Users size={14} className="mr-2" />
                              Interviewer: {interview.interviewer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes & Details */}
                    {interview.notes && (
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <span>Notes</span>
                        </div>
                        <p className="text-sm text-gray-600">{interview.notes}</p>
                      </div>
                    )}
                    
                    {interview.feedback && (
                      <div className="bg-emerald-50 p-4 rounded-lg mt-4 border border-emerald-200">
                        <div className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                          <CheckCircle size={14} className="mr-2" />
                          <span>Feedback</span>
                        </div>
                        <p className="text-sm text-emerald-700">{interview.feedback}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Column - Actions */}
                  <div className="lg:w-64 space-y-3">
                    <div className="flex flex-col space-y-2">
                      {interview.meetingLink && (
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <Video size={16} className="mr-2" />
                          Join Meeting
                        </a>
                      )}
                      
                      {interview.location && (
                        <div className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg flex items-center justify-center">
                          <MapPin size={16} className="mr-2" />
                          {interview.location}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                          <MessageSquare size={16} className="mr-2" />
                          Message
                        </button>
                        <button className="px-3 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                      </div>
                      
                      {interview.status === 'scheduled' && (
                        <div className="grid grid-cols-2 gap-2">
                          <button className="px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                            Confirm
                          </button>
                          <button className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Contact Info */}
                    <div className="text-xs text-gray-500 space-y-1">
                      {interview.candidateEmail && (
                        <div>Email: {interview.candidateEmail}</div>
                      )}
                      {interview.candidatePhone && (
                        <div>Phone: {interview.candidatePhone}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Zap size={20} className="text-blue-600 mr-3" />
          <h3 className="font-bold text-gray-900">Interview Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-900 mb-2">Before Interview</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Review candidate profile</li>
              <li>• Prepare specific questions</li>
              <li>• Test tech setup</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-900 mb-2">During Interview</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Take detailed notes</li>
              <li>• Use STAR method</li>
              <li>• Provide clear feedback</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-900 mb-2">After Interview</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Submit feedback within 24h</li>
              <li>• Update candidate status</li>
              <li>• Schedule next steps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;