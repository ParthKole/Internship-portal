// src/admin/pages/Analytics.jsx
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Download,
  TrendingDown,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Building,
  GraduationCap,
  Clock,
  Award
} from 'lucide-react';

const Analytics = () => {
  // Placement data for the year
  const placementData = [
    { month: 'Jan', placed: 45, total: 120, growth: 12 },
    { month: 'Feb', placed: 52, total: 120, growth: 15 },
    { month: 'Mar', placed: 68, total: 120, growth: 31 },
    { month: 'Apr', placed: 72, total: 120, growth: 6 },
    { month: 'May', placed: 85, total: 120, growth: 18 },
    { month: 'Jun', placed: 92, total: 120, growth: 8 },
    { month: 'Jul', placed: 105, total: 120, growth: 14 },
    { month: 'Aug', placed: 98, total: 120, growth: -7 },
    { month: 'Sep', placed: 112, total: 120, growth: 14 },
    { month: 'Oct', placed: 125, total: 120, growth: 12 },
    { month: 'Nov', placed: 130, total: 120, growth: 4 },
    { month: 'Dec', placed: 135, total: 120, growth: 4 },
  ];

  // Top recruiters data
  const topRecruiters = [
    { name: 'Microsoft', hired: 28, avgPackage: '₹12.5 LPA', offers: 32, trend: 15 },
    { name: 'Amazon', hired: 24, avgPackage: '₹11.8 LPA', offers: 28, trend: 12 },
    { name: 'Google', hired: 22, avgPackage: '₹14.2 LPA', offers: 25, trend: 18 },
    { name: 'TCS', hired: 45, avgPackage: '₹6.5 LPA', offers: 52, trend: 3 },
    { name: 'Infosys', hired: 38, avgPackage: '₹6.8 LPA', offers: 45, trend: -2 },
    { name: 'Accenture', hired: 32, avgPackage: '₹7.2 LPA', offers: 38, trend: 8 },
  ];

  // Branch-wise placement
  const branchPlacement = [
    { branch: 'Computer Science', placed: 92, total: 105, avgPackage: '₹9.8 LPA', trend: 8 },
    { branch: 'Information Technology', placed: 78, total: 92, avgPackage: '₹8.5 LPA', trend: 12 },
    { branch: 'Electronics & Telecomm', placed: 72, total: 88, avgPackage: '₹7.2 LPA', trend: 5 },
    { branch: 'Mechanical', placed: 65, total: 85, avgPackage: '₹6.5 LPA', trend: -3 },
    { branch: 'Civil', placed: 58, total: 80, avgPackage: '₹5.8 LPA', trend: 2 },
  ];

  // Current year stats
  const currentYear = {
    totalStudents: 450,
    placedStudents: 394,
    avgPackage: '₹8.9 LPA',
    highestPackage: '₹14.2 LPA',
    placementRate: 87.5,
    companiesVisited: 86,
    internshipOffers: 320,
    avgPlacementTime: 45,
  };

  // Previous year comparison
  const previousYear = {
    placementRate: 82.3,
    avgPackage: '₹7.9 LPA',
    companiesVisited: 68,
    placedStudents: 370,
  };

  // Key metrics
  const keyMetrics = [
    { 
      title: 'Placement Rate', 
      value: `${currentYear.placementRate}%`, 
      change: `${(currentYear.placementRate - previousYear.placementRate).toFixed(1)}%`,
      trend: currentYear.placementRate > previousYear.placementRate ? 'up' : 'down',
      icon: <CheckCircle size={20} />,
      description: 'Students placed vs total eligible',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    { 
      title: 'Average Package', 
      value: currentYear.avgPackage, 
      change: `${((parseFloat(currentYear.avgPackage.replace('₹', '').replace(' LPA', '')) - parseFloat(previousYear.avgPackage.replace('₹', '').replace(' LPA', ''))) / parseFloat(previousYear.avgPackage.replace('₹', '').replace(' LPA', '')) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: <DollarSign size={20} />,
      description: 'Average annual CTC',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    { 
      title: 'Companies Visited', 
      value: currentYear.companiesVisited, 
      change: `+${currentYear.companiesVisited - previousYear.companiesVisited}`,
      trend: 'up',
      icon: <Building size={20} />,
      description: 'Total recruiting companies',
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    { 
      title: 'Students Placed', 
      value: currentYear.placedStudents, 
      change: `+${currentYear.placedStudents - previousYear.placedStudents}`,
      trend: currentYear.placedStudents > previousYear.placedStudents ? 'up' : 'down',
      icon: <GraduationCap size={20} />,
      description: 'Total placement offers',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Placement Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics for academic year 2023-24</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300">
              <option>2023-24</option>
              <option>2022-23</option>
              <option>2021-22</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {keyMetrics.map((metric, index) => (
          <div key={index} className={`bg-white rounded-xl p-5 border ${metric.border} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.bg} rounded-lg flex items-center justify-center`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm font-medium text-gray-700 mb-1">{metric.title}</div>
            <div className="text-xs text-gray-500">{metric.description}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Placement Trends Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Monthly Placement Trends</h2>
              <p className="text-gray-600 text-sm mt-1">Students placed throughout academic year</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Placed</span>
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {placementData.map((data, index) => {
              const placementRate = (data.placed / data.total) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-8">{data.month}</span>
                      <span className="text-xs text-gray-500">{data.total} eligible</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium ${data.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {data.growth >= 0 ? '+' : ''}{data.growth}%
                      </span>
                      <span className="text-sm font-medium text-gray-900">{data.placed} placed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            placementRate >= 85 ? 'bg-emerald-500' :
                            placementRate >= 70 ? 'bg-blue-500' :
                            placementRate >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${placementRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-700 min-w-[40px] text-right">
                      {Math.round(placementRate)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Top Recruiting Companies</h2>
              <p className="text-gray-600 text-sm mt-1">Based on total offers made</p>
            </div>
            <Briefcase size={20} className="text-gray-600" />
          </div>
          
          <div className="space-y-4">
            {topRecruiters.map((recruiter, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-gray-700 text-sm">{recruiter.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{recruiter.name}</h3>
                      <p className="text-xs text-gray-500">Avg: {recruiter.avgPackage}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{recruiter.hired} hired</div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${recruiter.trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {recruiter.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {recruiter.trend >= 0 ? '+' : ''}{recruiter.trend}% growth
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>{recruiter.offers} offers made</span>
                  <span>Acceptance rate: {Math.round((recruiter.hired / recruiter.offers) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branch Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Branch-wise Performance</h2>
            <p className="text-gray-600 text-sm mt-1">Placement statistics across departments</p>
          </div>
          <GraduationCap size={20} className="text-gray-600" />
        </div>
        
        <div className="space-y-4">
          {branchPlacement.map((branch, index) => {
            const placementRate = (branch.placed / branch.total) * 100;
            
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{branch.branch}</span>
                    <span className="text-sm text-gray-600">{branch.avgPackage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${branch.trend >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {branch.trend >= 0 ? '+' : ''}{branch.trend}% vs last year
                    </span>
                    <span className="font-bold text-gray-900">{Math.round(placementRate)}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress: {branch.placed}/{branch.total} students</span>
                    <span className="text-gray-700 font-medium">{Math.round(placementRate)}% placed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        placementRate >= 85 ? 'bg-emerald-500' :
                        placementRate >= 75 ? 'bg-blue-500' :
                        placementRate >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${placementRate}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Award size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Highest Package</div>
              <div className="text-xl font-bold text-gray-900">{currentYear.highestPackage}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Google • Computer Science • 2023-24</div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Target size={18} className="text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Internship Conversion</div>
              <div className="text-xl font-bold text-gray-900">92%</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Permanent offers from {currentYear.internshipOffers} internships</div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg. Placement Time</div>
              <div className="text-xl font-bold text-gray-900">{currentYear.avgPlacementTime} days</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">From application to offer letter</div>
        </div>
      </div>

      {/* Year Comparison */}
      <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-over-Year Comparison</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Placement Rate</div>
            <div className="flex items-baseline gap-2">
              <div className="text-lg font-bold text-gray-900">{currentYear.placementRate}%</div>
              <div className={`text-xs ${currentYear.placementRate > previousYear.placementRate ? 'text-emerald-600' : 'text-rose-600'}`}>
                {currentYear.placementRate > previousYear.placementRate ? '▲' : '▼'} {Math.abs(currentYear.placementRate - previousYear.placementRate).toFixed(1)}%
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs {previousYear.placementRate}% last year</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Avg. Package</div>
            <div className="flex items-baseline gap-2">
              <div className="text-lg font-bold text-gray-900">{currentYear.avgPackage}</div>
              <div className="text-xs text-emerald-600">▲ 12.6%</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs {previousYear.avgPackage} last year</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Companies</div>
            <div className="flex items-baseline gap-2">
              <div className="text-lg font-bold text-gray-900">{currentYear.companiesVisited}</div>
              <div className="text-xs text-emerald-600">▲ 26.5%</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs {previousYear.companiesVisited} last year</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Students Placed</div>
            <div className="flex items-baseline gap-2">
              <div className="text-lg font-bold text-gray-900">{currentYear.placedStudents}</div>
              <div className="text-xs text-emerald-600">▲ 6.5%</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">vs {previousYear.placedStudents} last year</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;