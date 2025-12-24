// src/company/pages/AnalyticsPage.jsx
import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  Target,
  Download,
  Filter,
  Calendar as CalendarIcon,
  PieChart,
  LineChart,
  BarChart,
  Activity,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = [
    { label: 'Total Applications', value: '1,248', change: '+24%', trend: 'up' },
    { label: 'Interview Rate', value: '21%', change: '+5%', trend: 'up' },
    { label: 'Hire Rate', value: '8%', change: '+2%', trend: 'up' },
    { label: 'Avg. Time to Hire', value: '12 days', change: '-3 days', trend: 'down' },
    { label: 'Cost per Hire', value: '₹8,500', change: '-12%', trend: 'down' },
    { label: 'Candidate NPS', value: '82', change: '+8', trend: 'up' },
  ];

  const topInternships = [
    { title: 'Frontend Developer', applications: 245, shortlisted: 42, hired: 8, conversion: 3.3 },
    { title: 'Backend Developer', applications: 187, shortlisted: 38, hired: 6, conversion: 3.2 },
    { title: 'Data Science', applications: 156, shortlisted: 32, hired: 5, conversion: 3.2 },
    { title: 'UX Design', applications: 98, shortlisted: 24, hired: 4, conversion: 4.1 },
    { title: 'DevOps', applications: 76, shortlisted: 18, hired: 3, conversion: 3.9 },
  ];

  const candidateSources = [
    { source: 'Platform', percentage: 45, candidates: 561 },
    { source: 'Campus', percentage: 28, candidates: 349 },
    { source: 'Referral', percentage: 15, candidates: 187 },
    { source: 'Social Media', percentage: 12, candidates: 151 },
  ];

  const timelineData = [
    { month: 'Jan', applications: 1200, hires: 8 },
    { month: 'Feb', applications: 1350, hires: 10 },
    { month: 'Mar', applications: 1420, hires: 12 },
    { month: 'Apr', applications: 1560, hires: 14 },
    { month: 'May', applications: 1650, hires: 16 },
    { month: 'Jun', applications: 1780, hires: 18 },
    { month: 'Jul', applications: 1920, hires: 20 },
    { month: 'Aug', applications: 2010, hires: 22 },
    { month: 'Sep', applications: 2150, hires: 24 },
    { month: 'Oct', applications: 2248, hires: 26 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Data-driven insights for your hiring process</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            <RefreshCw size={18} className="mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {['overview', 'applications', 'interviews', 'conversion', 'sources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium text-sm ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                index === 0 ? 'bg-blue-50' :
                index === 1 ? 'bg-emerald-50' :
                index === 2 ? 'bg-purple-50' :
                index === 3 ? 'bg-amber-50' :
                index === 4 ? 'bg-red-50' : 'bg-cyan-50'
              }`}>
                {index === 0 && <Users className="text-blue-600" size={20} />}
                {index === 1 && <Target className="text-emerald-600" size={20} />}
                {index === 2 && <Briefcase className="text-purple-600" size={20} />}
                {index === 3 && <Clock className="text-amber-600" size={20} />}
                {index === 4 && <DollarSign className="text-red-600" size={20} />}
                {index === 5 && <Award className="text-cyan-600" size={20} />}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                metric.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Timeline */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Applications Trend</h3>
              <p className="text-gray-600 text-sm">Monthly applications and hires</p>
            </div>
            <LineChart size={20} className="text-blue-600" />
          </div>
          
          <div className="h-64">
            <div className="flex items-end h-48 space-x-4">
              {timelineData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">{data.month}</div>
                  <div className="flex items-end space-x-1 w-full">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.applications / 2500) * 100}%` }}
                    ></div>
                    <div 
                      className="w-full bg-emerald-500 rounded-t"
                      style={{ height: `${(data.hires / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Hires</span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Sources */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Candidate Sources</h3>
              <p className="text-gray-600 text-sm">Where your candidates come from</p>
            </div>
            <PieChart size={20} className="text-purple-600" />
          </div>
          
          <div className="h-64 flex items-center">
            <div className="w-48 h-48 relative mx-auto">
              {/* Pie chart simulation */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
              <div className="absolute inset-0 rounded-full border-8 border-emerald-500" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'inset(50% 0 0 0)' }}></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,248</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            </div>
            
            <div className="ml-8 space-y-4">
              {candidateSources.map((source, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded mr-3 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-emerald-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-amber-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{source.source}</span>
                      <span className="text-gray-600">{source.percentage}%</span>
                    </div>
                    <div className="text-xs text-gray-500">{source.candidates} candidates</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Internships Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Top Performing Internships</h3>
              <p className="text-gray-600 text-sm">Conversion rates and performance metrics</p>
            </div>
            <BarChart size={20} className="text-blue-600" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internship Role</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shortlisted</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hired</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topInternships.map((internship, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{internship.title}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{internship.applications}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{internship.shortlisted}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{internship.hired}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${internship.conversion * 10}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-gray-900">{internship.conversion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Activity size={20} className="text-blue-600 mr-3" />
            <h3 className="font-bold text-gray-900">Performance Insights</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start text-sm text-gray-700">
              <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
              Your interview rate increased by 15% this month
            </li>
            <li className="flex items-start text-sm text-gray-700">
              <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
              Frontend roles have the highest application volume
            </li>
            <li className="flex items-start text-sm text-gray-700">
              <XCircle size={14} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              Campus hiring conversion rate needs improvement
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Target size={20} className="text-emerald-600 mr-3" />
            <h3 className="font-bold text-gray-900">Goals & Targets</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Monthly Hires Target</span>
                <span className="font-medium">18/30</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-3/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Time to Hire Target</span>
                <span className="font-medium">12 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <TrendingUp size={20} className="text-purple-600 mr-3" />
            <h3 className="font-bold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
              Optimize Job Descriptions
            </button>
            <button className="w-full px-4 py-2.5 bg-white text-purple-600 border border-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">
              Schedule Recruitment Drive
            </button>
            <button className="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;