// src/company/pages/MessagesPage.jsx
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Mail,
  Clock,
  CheckCircle,
  Check,
  User,
  XCircle,
  Star,
  MessageSquare,
  Calendar,
  Briefcase,
  MapPin
} from 'lucide-react';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      candidate: 'Rahul Sharma',
      avatar: 'RS',
      role: 'Frontend Developer Intern',
      lastMessage: 'Looking forward to the interview tomorrow!',
      time: '10:30 AM',
      unread: 2,
      status: 'online',
      messages: [
        { id: 1, sender: 'candidate', text: 'Hi, I have submitted my application for the Frontend role', time: 'Yesterday, 2:30 PM' },
        { id: 2, sender: 'company', text: 'Great! We have scheduled your interview for tomorrow at 3 PM', time: 'Yesterday, 3:15 PM' },
        { id: 3, sender: 'candidate', text: 'Looking forward to the interview tomorrow!', time: 'Today, 10:30 AM' },
      ]
    },
    {
      id: 2,
      candidate: 'Priya Patel',
      avatar: 'PP',
      role: 'Backend Developer Intern',
      lastMessage: 'Thank you for the feedback!',
      time: 'Yesterday',
      unread: 0,
      status: 'offline',
      messages: [
        { id: 1, sender: 'company', text: 'Congratulations on passing the technical round!', time: '2 days ago' },
        { id: 2, sender: 'candidate', text: 'Thank you for the feedback!', time: 'Yesterday' },
      ]
    },
    // Add more conversations...
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: activeConversation.messages.length + 1,
      sender: 'company',
      text: newMessage,
      time: 'Just now'
    };
    
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: newMessage
    }));
    
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        {/* Left Sidebar - Conversations */}
        <div className="w-96 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeConversation.id === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {conversation.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      conversation.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{conversation.candidate}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{conversation.role}</span>
                      {conversation.unread > 0 && (
                        <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Chat */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {activeConversation.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{activeConversation.candidate}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{activeConversation.role}</span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      Last seen: 2 hours ago
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Phone size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="space-y-6">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'company' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xl ${message.sender === 'company' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl p-4`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-sm ${message.sender === 'company' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.sender === 'company' ? 'You' : activeConversation.candidate}
                      </span>
                      <span className={`text-xs ${message.sender === 'company' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {message.time}
                      </span>
                    </div>
                    <p className={message.sender === 'company' ? 'text-white' : 'text-gray-800'}>
                      {message.text}
                    </p>
                    {message.sender === 'company' && (
                      <div className="flex justify-end mt-2">
                        <Check size={14} className="text-blue-300" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-end space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile size={20} className="text-gray-600" />
              </button>
              
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send size={18} className="mr-2" />
                Send
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div>
                Press <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-200 rounded">Shift + Enter</kbd> for new line
              </div>
              <div>
                <CheckCircle size={14} className="inline mr-1 text-emerald-500" />
                Messages are end-to-end encrypted
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Candidate Info */}
        <div className="w-80 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              {activeConversation.avatar}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{activeConversation.candidate}</h3>
            <p className="text-gray-600 mb-4">{activeConversation.role}</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                Available
              </span>
              <div className="flex items-center">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span className="ml-1 font-medium">4.8</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-3 text-gray-400" />
                  rahul.sharma@example.com
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-3 text-gray-400" />
                  +91 9876543210
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-3 text-gray-400" />
                  Mumbai, India
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Application Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Stage</span>
                  <span className="font-medium text-blue-600">Interview Scheduled</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Match Score</span>
                  <span className="font-bold text-emerald-600">92%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applied Date</span>
                  <span className="font-medium">Oct 25, 2024</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  View Full Profile
                </button>
                <button className="w-full px-4 py-2.5 bg-white text-blue-600 border border-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Schedule Interview
                </button>
                <button className="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;