import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Briefcase,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  ChevronRight,
  Download,
  Edit,
  MapPin,
  Building,
  DollarSign,
  Code,
  Cpu,
  BarChart3,
  AlertCircle,
  Database,
  Cloud,
  Users,
  Zap,
  MessageSquare
} from 'lucide-react';

const StudentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Applications data - ADDED 2 MORE COMPANIES
  const applications = [
    { 
      company: 'Barclays', 
      role: 'Technology Analyst Intern', 
      status: 'Shortlisted', 
      date: 'Oct 24',
      stage: 'shortlisted',
      location: 'London, UK',
      salary: '$8,500/mo',
      match: 92
    },
    { 
      company: 'Siemens', 
      role: 'Software Dev Intern', 
      status: 'Interview', 
      date: 'Tomorrow',
      stage: 'interview',
      location: 'Munich, DE',
      salary: '$9,200/mo',
      match: 88
    },
    { 
      company: 'Deloitte', 
      role: 'Business Analyst', 
      status: 'Applied', 
      date: 'Oct 18',
      stage: 'applied',
      location: 'New York, US',
      salary: '$7,800/mo',
      match: 85
    },
    { 
      company: 'Google', 
      role: 'SWE Intern', 
      status: 'Technical Round', 
      date: 'Oct 26',
      stage: 'interview',
      location: 'Mountain View, US',
      salary: '$9,500/mo',
      match: 91
    },
    // ADDED THESE 2 NEW COMPANIES
    { 
      company: 'Amazon', 
      role: 'SDE Intern', 
      status: 'Online Assessment', 
      date: 'Oct 25',
      stage: 'assessment',
      location: 'Seattle, US',
      salary: '$9,200/mo',
      match: 89
    },
    { 
      company: 'Microsoft', 
      role: 'Software Intern', 
      status: 'Under Review', 
      date: 'Oct 22',
      stage: 'review',
      location: 'Redmond, US',
      salary: '$9,500/mo',
      match: 90
    },
  ];

  const stats = [
    { label: 'Applied', value: '14', icon: Briefcase, color: 'text-[#4F46E5]', bg: 'bg-[#4F46E5]/10', change: '+2' },
    { label: 'Shortlisted', value: '5', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-100', change: '+1' },
    { label: 'Interviews', value: '3', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100', change: '0' },
    { label: 'Profile Score', value: '87%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100', change: '+5%' },
  ];

  const schedule = [
    { time: '10:00 AM', title: 'Siemens Interview', type: 'interview', with: 'John Smith, Tech Lead' },
    { time: '2:00 PM', title: 'DSA Workshop', type: 'workshop', with: 'CodeMaster Academy' },
    { time: '4:30 PM', title: 'Career Session', type: 'mentor', with: 'Sarah Johnson, Microsoft' },
  ];

  // **UPDATED: Informative Skill Analysis Data**
  const skillAnalysis = [
    { 
      name: 'Frontend Development', 
      level: 85, 
      trend: 'up', 
      gap: -7, // Negative means above market
      marketAvg: 78,
      icon: <Code size={18} />,
      improvement: 'Strong - Keep building projects'
    },
    { 
      name: 'Data Structures & Algorithms', 
      level: 78, 
      trend: 'up', 
      gap: 5,
      marketAvg: 83,
      icon: <Cpu size={18} />,
      improvement: 'Practice daily - Focus on DP & Graphs'
    },
    { 
      name: 'System Design', 
      level: 68, 
      trend: 'steady', 
      gap: 17,
      marketAvg: 85,
      icon: <Database size={18} />,
      improvement: 'Priority - Study scalability patterns'
    },
    { 
      name: 'Cloud & DevOps', 
      level: 72, 
      trend: 'up', 
      gap: 8,
      marketAvg: 80,
      icon: <Cloud size={18} />,
      improvement: 'Learn Docker & Kubernetes basics'
    },
    { 
      name: 'Communication', 
      level: 82, 
      trend: 'up', 
      gap: -2,
      marketAvg: 80,
      icon: <MessageSquare size={18} />,
      improvement: 'Strong - Continue networking'
    },
    { 
      name: 'Problem Solving', 
      level: 79, 
      trend: 'up', 
      gap: 4,
      marketAvg: 83,
      icon: <Zap size={18} />,
      improvement: 'Solve 3 problems daily'
    },
  ];

  // Calculate overall metrics
  const avgSkillLevel = Math.round(skillAnalysis.reduce((acc, skill) => acc + skill.level, 0) / skillAnalysis.length);
  const skillsAboveMarket = skillAnalysis.filter(skill => skill.gap <= 0).length;
  const prioritySkills = skillAnalysis.filter(skill => skill.gap > 10);

  const weeklyGoals = [
    { 
      goal: 'Apply to 5 companies', 
      completed: 3, 
      total: 5,
      category: 'Applications'
    },
    { 
      goal: 'Complete project milestone', 
      completed: 1, 
      total: 2,
      category: 'Projects'
    },
    { 
      goal: 'Solve 20 coding problems', 
      completed: 12, 
      total: 20,
      category: 'Technical'
    },
  ];

  const recommendedInternships = [
    { company: 'Deutsche Bank', role: 'Technology Analyst', deadline: '5 days', match: 94 },
    { company: 'JP Morgan', role: 'Software Engineer Intern', deadline: '7 days', match: 91 },
    { company: 'TCS Digital', role: 'Software Developer', deadline: '10 days', match: 87 },
  ];

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
            {/* Hero Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">MS</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3">
                      <h1 className="text-2xl font-bold text-gray-900">Madhura Sharma</h1>
                      <span className="px-3 py-1 bg-[#4F46E5] text-white text-sm font-medium rounded-full">
                        Open for Internship
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">3rd Year IT • University of Mumbai</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        Mumbai, India
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Building size={14} className="mr-1" />
                        Computer Science
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white border border-[#4F46E5] text-[#4F46E5] rounded-lg font-medium hover:bg-[#4F46E5]/5 flex items-center transition-colors">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-medium hover:bg-[#4338CA] flex items-center transition-colors">
                    <Download size={16} className="mr-2" />
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className={`text-xs font-medium mt-1 ${stat.change.includes('+') ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Applications - NOW WITH 6 COMPANIES */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Active Applications</h2>
                        <p className="text-gray-600 text-sm">Track your internship applications</p>
                      </div>
                      <button className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA] flex items-center">
                        View All <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {applications.map((app, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-gray-700">{app.company.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{app.company}</h3>
                                <p className="text-gray-600 text-sm">{app.role}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <MapPin size={12} className="mr-1" />
                                    {app.location}
                                  </span>
                                  <span className="flex items-center">
                                    <DollarSign size={12} className="mr-1" />
                                    {app.salary}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              app.stage === 'shortlisted' 
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.stage === 'interview'
                                ? 'bg-blue-100 text-blue-800'
                                : app.stage === 'assessment'
                                ? 'bg-orange-100 text-orange-800'
                                : app.stage === 'review'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">{app.date}</div>
                            <div className="text-xs text-[#4F46E5] font-medium mt-1">{app.match}% match</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* **UPDATED: Informative Skill Analysis - NO GAPS** */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <BarChart3 size={22} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Skill Analysis</h2>
                          <p className="text-gray-600 text-sm">Detailed skill assessment vs market demand</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{avgSkillLevel}%</div>
                          <div className="text-xs text-gray-500">Avg. Skill</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{skillsAboveMarket}/{skillAnalysis.length}</div>
                          <div className="text-xs text-gray-500">Above Market</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Skill Metrics Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-blue-700">{avgSkillLevel}%</div>
                            <div className="text-sm text-blue-600">Overall Proficiency</div>
                          </div>
                          <TrendingUp className="text-blue-500" size={20} />
                        </div>
                        <div className="text-xs text-blue-700 mt-2">
                          {avgSkillLevel >= 80 ? 'Strong profile' : 'Needs improvement'}
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">{skillsAboveMarket}</div>
                            <div className="text-sm text-emerald-600">Skills Above Market</div>
                          </div>
                          <Target className="text-emerald-500" size={20} />
                        </div>
                        <div className="text-xs text-emerald-700 mt-2">
                          {skillsAboveMarket >= 3 ? 'Competitive edge' : 'Below average'}
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-amber-700">{prioritySkills.length}</div>
                            <div className="text-sm text-amber-600">Priority Skills</div>
                          </div>
                          <AlertCircle className="text-amber-500" size={20} />
                        </div>
                        <div className="text-xs text-amber-700 mt-2">
                          {prioritySkills.length > 0 ? 'Needs attention' : 'All skills on track'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills List - Informative */}
                    <div className="space-y-6">
                      {skillAnalysis.map((skill, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="text-gray-700">
                                  {skill.icon}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{skill.name}</h3>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className={`px-2 py-0.5 text-xs rounded ${
                                    skill.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {skill.trend === 'up' ? '↑ Improving' : '→ Stable'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Market Avg: {skill.marketAvg}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                skill.gap <= 0 ? 'text-emerald-600' : 
                                skill.gap > 10 ? 'text-amber-600' : 'text-blue-600'
                              }`}>
                                {skill.level}%
                              </div>
                              <div className={`text-xs ${
                                skill.gap <= 0 ? 'text-emerald-600' : 'text-amber-600'
                              }`}>
                                {skill.gap <= 0 ? `+${Math.abs(skill.gap)}% above` : `${skill.gap}% below`}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Your proficiency</span>
                              <span>Market average: {skill.marketAvg}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                              <div className="w-1 h-4 bg-gray-400" style={{ marginLeft: `${skill.marketAvg}%` }} />
                            </div>
                            
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Improvement:</span> {skill.improvement}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* REMOVED: Priority Areas Section */}
                    
                  </div>
                </div>
              </div>
              
              {/* Right Column - 1/3 */}
              <div className="space-y-6">
                {/* Today's Schedule */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {schedule.length} events
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {schedule.map((event, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
                          <div className="flex items-start space-x-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              event.type === 'interview' ? 'bg-red-50 text-red-600' :
                              event.type === 'workshop' ? 'bg-blue-50 text-blue-600' :
                              'bg-green-50 text-green-600'
                            }`}>
                              <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{event.with}</p>
                                </div>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                  {event.time}
                                </span>
                              </div>
                              <div className="mt-3 flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)} session
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 py-3 border-2 border-gray-300 border-dashed rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center">
                      <Calendar size={18} className="mr-2" />
                      Add New Event
                    </button>
                  </div>
                </div>
                
                {/* Top Matches */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Top Matches</h2>
                        <p className="text-gray-600 text-sm">Based on your profile</p>
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                        AI Recommended
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {recommendedInternships.map((internship, index) => (
                        <div key={index} className="group p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-bold">
                                {internship.company.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{internship.company}</h3>
                                <p className="text-sm text-gray-600">{internship.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">{internship.match}%</div>
                              <div className="text-xs text-gray-500">Match</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              Apply within {internship.deadline}
                            </div>
                            <button className="px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
                              Quick Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 py-3 border border-[#4F46E5] text-[#4F46E5] font-medium rounded-xl hover:bg-[#4F46E5]/5 transition-colors">
                      View All Recommendations
                    </button>
                  </div>
                </div>
                
                {/* Weekly Goals */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900">Weekly Goals</h2>
                      <span className="text-sm text-gray-500">Week of Dec 15-21</span>
                    </div>
                    <p className="text-gray-600 text-sm">Track your progress for internship preparation</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-5">
                      {weeklyGoals.map((goal, index) => {
                        const progress = Math.round((goal.completed / goal.total) * 100);
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium text-gray-900 text-sm">{goal.goal}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {goal.completed} of {goal.total} completed
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  progress >= 80 ? 'bg-green-100 text-green-800' :
                                  progress >= 50 ? 'bg-blue-100 text-blue-800' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {progress}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-full rounded-full ${
                                  progress >= 80 ? 'bg-green-500' :
                                  progress >= 50 ? 'bg-blue-500' :
                                  'bg-amber-500'
                                }`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Tip:</span> Focus on 1-2 high-impact goals at a time
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Update Goals
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;