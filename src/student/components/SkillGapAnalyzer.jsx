// src/student/components/SkillGapAnalyzer.jsx
import React, { useState } from 'react';
import { 
  Target, TrendingUp, AlertCircle, CheckCircle, 
  BookOpen, Youtube, ExternalLink, ChevronRight,
  Clock, Award, Star, Zap
} from 'lucide-react';

const SkillGapAnalyzer = ({ internship, userSkills = {} }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Sample data - Barclays internship requirements vs user skills
  const analysisData = {
    internship: {
      title: "Technology Analyst Intern",
      company: "Barclays",
      requiredSkills: [
        { name: 'Java', level: 90, importance: 'high' },
        { name: 'Spring Boot', level: 85, importance: 'high' },
        { name: 'Microservices', level: 80, importance: 'medium' },
        { name: 'SQL', level: 85, importance: 'high' },
        { name: 'System Design', level: 75, importance: 'high' },
        { name: 'REST APIs', level: 70, importance: 'medium' },
        { name: 'Docker', level: 60, importance: 'low' },
        { name: 'AWS', level: 65, importance: 'medium' }
      ]
    },
    userSkills: {
      Java: 75,
      'Spring Boot': 40,
      Microservices: 30,
      SQL: 85,
      'System Design': 45,
      'REST APIs': 70,
      Docker: 25,
      AWS: 35
    },
    recommendations: {
      Java: [
        { 
          type: 'youtube', 
          title: 'Java Masterclass for Beginners', 
          duration: '12 hours', 
          link: 'https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
          free: true,
          level: 'beginner'
        },
        { 
          type: 'practice', 
          title: 'Java Practice Problems - LeetCode', 
          duration: '20 problems', 
          link: 'https://leetcode.com/studyplan/top-interview-150/',
          free: true,
          level: 'intermediate'
        }
      ],
      'Spring Boot': [
        { 
          type: 'course', 
          title: 'Spring Boot Complete Guide', 
          duration: '15 hours', 
          link: 'https://udemy.com/course/spring-boot-complete-guide',
          free: false,
          level: 'beginner'
        },
        { 
          type: 'youtube', 
          title: 'Spring Boot Tutorial for Beginners', 
          duration: '8 hours', 
          link: 'https://youtube.com/playlist?list=PLVz2XdJiJQxzndLc6mk5G_dkqgMAbFcQY',
          free: true,
          level: 'beginner'
        }
      ],
      'System Design': [
        { 
          type: 'book', 
          title: 'System Design Interview Guide', 
          duration: 'Read 2 chapters/week', 
          link: 'https://github.com/donnemartin/system-design-primer',
          free: true,
          level: 'intermediate'
        },
        { 
          type: 'youtube', 
          title: 'System Design Basics', 
          duration: '6 hours', 
          link: 'https://youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
          free: true,
          level: 'beginner'
        }
      ]
    }
  };

  const calculateMatch = () => {
    const required = analysisData.internship.requiredSkills;
    const user = analysisData.userSkills;
    
    let totalScore = 0;
    let maxScore = 0;
    
    required.forEach(skill => {
      const userSkillLevel = user[skill.name] || 0;
      const skillScore = Math.min(userSkillLevel, skill.level);
      totalScore += skillScore;
      maxScore += skill.level;
    });
    
    return Math.round((totalScore / maxScore) * 100);
  };

  const matchPercentage = calculateMatch();
  const gapPercentage = 100 - matchPercentage;

  const getSkillStatus = (requiredLevel, userLevel) => {
    const diff = requiredLevel - userLevel;
    if (diff <= 0) return { status: 'excellent', color: 'bg-[#059669]', text: 'Excellent match' };
    if (diff <= 20) return { status: 'good', color: 'bg-[#D97706]', text: 'Needs improvement' };
    return { status: 'poor', color: 'bg-[#DC2626]', text: 'Major gap' };
  };

  const prioritySkills = analysisData.internship.requiredSkills
    .filter(skill => {
      const userLevel = analysisData.userSkills[skill.name] || 0;
      return skill.level - userLevel > 20;
    })
    .sort((a, b) => {
      const gapA = a.level - (analysisData.userSkills[a.name] || 0);
      const gapB = b.level - (analysisData.userSkills[b.name] || 0);
      return gapB - gapA;
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h2>
            <p className="text-gray-600 mt-1">
              Your readiness for <span className="font-semibold text-[#4F46E5]">{analysisData.internship.title}</span> at {analysisData.internship.company}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{matchPercentage}%</div>
            <div className="text-sm text-gray-600">Overall Match</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Your capability: {matchPercentage}%</span>
            <span>Gap to close: {gapPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mr-3">
                <Target className="text-[#4F46E5]" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{prioritySkills.length}</div>
                <div className="text-sm text-gray-600">Priority Skills</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#059669]/10 rounded-lg flex items-center justify-center mr-3">
                <Clock className="text-[#059669]" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">4-6 weeks</div>
                <div className="text-sm text-gray-600">Estimated prep time</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#D97706]/10 rounded-lg flex items-center justify-center mr-3">
                <Zap className="text-[#D97706]" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-90">12</div>
                <div className="text-sm text-gray-600">Resources needed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Breakdown</h3>
        <div className="space-y-4">
          {analysisData.internship.requiredSkills.map((skill, index) => {
            const userLevel = analysisData.userSkills[skill.name] || 0;
            const status = getSkillStatus(skill.level, userLevel);
            const gap = skill.level - userLevel;
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      skill.importance === 'high' ? 'bg-[#DC2626]/10 text-[#DC2626]' :
                      skill.importance === 'medium' ? 'bg-[#D97706]/10 text-[#D97706]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {skill.importance} priority
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {userLevel}% vs {skill.level}% required
                    </div>
                    {gap > 0 && (
                      <div className="text-xs text-[#DC2626]">Gap: {gap}%</div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Your level</span>
                    <span>Required level</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-[#4F46E5] rounded-full"
                        style={{ width: `${userLevel}%` }}
                      ></div>
                    </div>
                    <div className="w-1 h-4 bg-gray-400" style={{ marginLeft: `${skill.level}%` }} />
                  </div>
                  
                  {/* Gap Indicator */}
                  {gap > 0 && (
                    <div className="flex items-center text-xs text-gray-600">
                      <AlertCircle size={12} className="mr-1" />
                      <span>Skill gap detected</span>
                      <button 
                        onClick={() => setSelectedSkill(skill.name)}
                        className="ml-auto text-[#4F46E5] hover:text-[#4338CA] font-medium"
                      >
                        View resources →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations Section */}
      {selectedSkill && analysisData.recommendations[selectedSkill] && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Resources for <span className="text-[#4F46E5]">{selectedSkill}</span>
            </h3>
            <button 
              onClick={() => setSelectedSkill(null)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
          
          <div className="space-y-3">
            {analysisData.recommendations[selectedSkill].map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#4F46E5] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      resource.type === 'youtube' ? 'bg-[#DC2626]/10' :
                      resource.type === 'course' ? 'bg-[#4F46E5]/10' :
                      'bg-[#059669]/10'
                    }`}>
                      {resource.type === 'youtube' ? (
                        <Youtube className="text-[#DC2626]" size={20} />
                      ) : resource.type === 'course' ? (
                        <BookOpen className="text-[#4F46E5]" size={20} />
                      ) : (
                        <Award className="text-[#059669]" size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-600 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {resource.duration}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          resource.level === 'beginner' ? 'bg-[#059669]/10 text-[#059669]' :
                          resource.level === 'intermediate' ? 'bg-[#D97706]/10 text-[#D97706]' :
                          'bg-[#DC2626]/10 text-[#DC2626]'
                        }`}>
                          {resource.level}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          resource.free ? 'bg-[#059669]/10 text-[#059669]' : 'bg-[#4F46E5]/10 text-[#4F46E5]'
                        }`}>
                          {resource.free ? 'Free' : 'Paid'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Action Plan */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Action Plan</h3>
        <div className="space-y-3">
          {prioritySkills.slice(0, 3).map((skill, index) => {
            const gap = skill.level - (analysisData.userSkills[skill.name] || 0);
            return (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mr-3">
                  <div className="text-sm font-bold text-[#4F46E5]">{index + 1}</div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{skill.name}</div>
                  <div className="text-sm text-gray-600">Close {gap}% gap</div>
                </div>
                <button 
                  onClick={() => setSelectedSkill(skill.name)}
                  className="px-3 py-1.5 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
                >
                  Learn Now
                </button>
              </div>
            );
          })}
        </div>
        
        <button className="w-full mt-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors flex items-center justify-center">
          <BookOpen size={18} className="mr-2" />
          Start Learning Journey
        </button>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;