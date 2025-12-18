// src/student/pages/MessagesPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  MessageSquare, Search, Send, Paperclip, Smile, Image,
  Video, File, MoreVertical, Check, CheckCheck, Clock,
  Phone, VideoIcon, Info, Archive, Trash2, Star,
  User, Building, Calendar, MapPin, Briefcase
} from 'lucide-react';

const MessagesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Google HR Team',
      role: 'Recruitment Specialist',
      company: 'Google',
      avatar: 'G',
      lastMessage: 'Great! Your interview is scheduled for Dec 20th at 3 PM PST.',
      time: '10:30 AM',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'google', text: 'Hi! We reviewed your application for the SWE Intern role', time: 'Dec 10, 9:00 AM' },
        { id: 2, sender: 'google', text: 'We were impressed with your profile and would like to schedule an interview', time: 'Dec 10, 9:01 AM' },
        { id: 3, sender: 'user', text: 'Thank you! I\'m very interested. What dates work for you?', time: 'Dec 10, 10:15 AM' },
        { id: 4, sender: 'google', text: 'Great! Your interview is scheduled for Dec 20th at 3 PM PST.', time: 'Dec 10, 10:30 AM' },
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Tech Lead, Microsoft',
      company: 'Microsoft',
      avatar: 'S',
      lastMessage: 'Looking forward to discussing your project in detail.',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'microsoft', text: 'Hello! I saw your project on GitHub, impressive work!', time: 'Dec 9, 2:30 PM' },
        { id: 2, sender: 'user', text: 'Thank you Sarah! I\'m glad you liked it.', time: 'Dec 9, 3:15 PM' },
        { id: 3, sender: 'microsoft', text: 'Looking forward to discussing your project in detail.', time: 'Dec 9, 4:00 PM' },
      ]
    },
    {
      id: 3,
      name: 'Amazon Recruitment',
      role: 'Hiring Team',
      company: 'Amazon',
      avatar: 'A',
      lastMessage: 'Please complete the online assessment by Friday.',
      time: '2 days ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, sender: 'amazon', text: 'Your application for SDE Intern has moved to the next stage.', time: 'Dec 8, 11:00 AM' },
        { id: 2, sender: 'amazon', text: 'Please complete the online assessment by Friday.', time: 'Dec 8, 11:05 AM' },
      ]
    },
    {
      id: 4,
      name: 'John Smith',
      role: 'Senior Engineer, Meta',
      company: 'Meta',
      avatar: 'J',
      lastMessage: 'The team feedback was very positive.',
      time: '3 days ago',
      unread: 1,
      online: false,
      messages: [
        { id: 1, sender: 'meta', text: 'Hi! Following up on your technical interview.', time: 'Dec 7, 4:30 PM' },
        { id: 2, sender: 'meta', text: 'The team feedback was very positive.', time: 'Dec 7, 4:45 PM' },
      ]
    },
    {
      id: 5,
      name: 'Goldman Sachs HR',
      role: 'Campus Recruitment',
      company: 'Goldman Sachs',
      avatar: 'GS',
      lastMessage: 'We\'ll send the offer letter by tomorrow.',
      time: '1 week ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'goldman', text: 'Congratulations! We\'re pleased to extend an offer.', time: 'Dec 1, 10:00 AM' },
        { id: 2, sender: 'goldman', text: 'We\'ll send the offer letter by tomorrow.', time: 'Dec 1, 10:15 AM' },
      ]
    }
  ];

  const activeConversation = conversations.find(chat => chat.id === activeChat);

  const sendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send to backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-2">Communicate with recruiters and interviewers</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
              {/* Conversations List */}
              <div className="lg:w-1/3 flex flex-col">
                {/* Search */}
                <div className="relative mb-4">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Conversations */}
                <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-gray-900">Conversations</h2>
                      <span className="text-sm text-gray-600">
                        {conversations.filter(c => c.unread > 0).length} unread
                      </span>
                    </div>
                  </div>

                  <div className="overflow-y-auto h-[calc(100%-5rem)]">
                    {filteredConversations.map(conversation => (
                      <div
                        key={conversation.id}
                        onClick={() => setActiveChat(conversation.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          activeChat === conversation.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {conversation.avatar}
                            </div>
                            {conversation.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-bold text-gray-900">{conversation.name}</h3>
                                <p className="text-sm text-gray-600">{conversation.role}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-500">{conversation.time}</span>
                                {conversation.unread > 0 && (
                                  <span className="mt-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                    {conversation.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:w-2/3 flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="bg-white rounded-t-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {activeConversation.avatar}
                            </div>
                            {activeConversation.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-900">{activeConversation.name}</h2>
                            <p className="text-sm text-gray-600">{activeConversation.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Phone size={20} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <VideoIcon size={20} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Info size={20} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-white border-x border-gray-200 p-6 overflow-y-auto">
                      <div className="space-y-6">
                        {activeConversation.messages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                              <div className={`rounded-2xl p-4 ${
                                message.sender === 'user'
                                  ? 'bg-blue-600 text-white rounded-br-none'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                              }`}>
                                <p>{message.text}</p>
                              </div>
                              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right text-gray-500' : 'text-gray-500'}`}>
                                {message.time}
                                {message.sender === 'user' && (
                                  <span className="ml-2 inline-flex items-center">
                                    <CheckCheck size={12} className="text-blue-500" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-white rounded-b-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Paperclip size={20} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Image size={20} />
                        </button>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <Smile size={20} />
                          </button>
                        </div>
                        <button
                          onClick={sendMessage}
                          className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
                    <p className="text-gray-600 text-center mb-6">
                      Select a conversation from the list to start messaging
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        New Message
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-400">
                        Archive All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;