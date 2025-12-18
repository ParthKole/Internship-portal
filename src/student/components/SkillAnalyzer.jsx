import React, { useState } from 'react';
import { TrendingUp, Target, Zap, ChevronRight, BarChart3, Clock, Award } from 'lucide-react';

const SkillAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const skills = [
    { 
      name: "React.js", 
      level: 85, 
      demand: 92, 
      trend: 'up',
      category: 'Frontend',
      lastUpdated: '2 days ago'
    },
    { 
      name: "Python & ML", 
      level: 90, 
      demand: 95, 
      trend: 'up',
      category: 'Backend/AI',
      lastUpdated: '1 week ago'
    },
    { 
      name: "DSA", 
      level: 78, 
      demand: 88, 
      trend: 'up',
      category: 'Core CS',
      lastUpdated: '3 days ago'
    },
    { 
      name: "Node.js", 
      level: 65, 
      demand: 78, 
      trend: 'steady',
      category: 'Backend',
      lastUpdated: '1 week ago'
    },
    { 
      name: "System Design", 
      level: 55, 
      demand: 85, 
      trend: 'up',
      category: 'Architecture',
      lastUpdated: '2 weeks ago'
    },
    { 
      name: "UI/UX Design", 
      level: 72, 
      demand: 68, 
      trend: 'steady',
      category: 'Design',
      lastUpdated: '4 days ago'
    },
  ];

  const marketInsights = [
    {
      title: "High Demand Alert",
      description: "React + Node.js full stack developers are seeing 40% higher response rates",
      icon: <Zap size={16} />,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Growth Opportunity",
      description: "Your ML skills are in top 10% of applicants. Consider applying to AI research roles",
      icon: <TrendingUp size={16} />,
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      title: "Improvement Area",
      description: "System Design scores below market average. Complete the suggested learning path",
      icon: <Target size={16} />,
      color: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
      
      {/* Header with Tabs */}
      <div className="border-b border-gray-200/50">
        <div className="flex justify-between items-center p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={22} className="text-blue-500" />
              Skill Intelligence Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Real-time analysis of your skills vs market demand
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
              Updated 5 min ago
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200/50 px-6">
          {['skills', 'trends', 'recommendations', 'comparison'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Skills */}
          <div className="col-span-2 space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="group p-4 rounded-xl border border-gray-200/50 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        skill.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                        skill.trend === 'down' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Target size={14} />
                        Your score: <span className="font-bold text-gray-900">{skill.level}%</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        Market demand: <span className="font-bold text-gray-900">{skill.demand}%</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {skill.lastUpdated}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      skill.level >= skill.demand ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {skill.level >= skill.demand ? '+ ' : '- '}
                      {Math.abs(skill.level - skill.demand)}%
                    </div>
                    <div className="text-xs text-gray-500">vs market</div>
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Your proficiency</span>
                    <span>Market demand</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Insights & Actions */}
          <div className="space-y-6">
            {/* Market Insights */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                AI-Powered Insights
              </h3>
              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-lg ${insight.color}`}>
                    <div className="flex items-start gap-2">
                      {insight.icon}
                      <div>
                        <p className="font-medium text-sm">{insight.title}</p>
                        <p className="text-xs opacity-90 mt-1">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {[
                  "Complete System Design course (est. 12 hrs)",
                  "Build 2 full-stack projects with React + Node",
                  "Practice 30 DSA problems this week",
                  "Attend ML workshop on Saturday"
                ].map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">{action}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                Generate Learning Plan
              </button>
            </div>

            {/* Skill Score */}
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-5">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">87/100</h3>
                <p className="text-emerald-600 font-medium mt-1">Competitive Score</p>
                <p className="text-sm text-gray-500 mt-2">
                  You're in the top 15% of internship applicants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalyzer;