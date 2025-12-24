import React, { useState, useMemo } from 'react';
import { Target, AlertCircle, BookOpen, ExternalLink, Zap, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const SkillGapAnalyzer = ({ internship, studentProfile }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 1. Flatten all student skills from the StudentProfile schema structure
  const userSkillsList = useMemo(() => {
    if (!studentProfile || !studentProfile.skills) return [];
    
    const { 
      programmingLanguages = [], 
      frameworks = [], 
      databases = [], 
      cloudPlatforms = [], 
      devOpsTools = [] 
    } = studentProfile.skills;

    // Combine arrays and normalize strings to lowercase/trimmed
    return [
      ...programmingLanguages, 
      ...frameworks, 
      ...databases, 
      ...cloudPlatforms, 
      ...devOpsTools
    ].map(s => s.toLowerCase().trim());
  }, [studentProfile]);

  // 2. Compare against Internship skillsRequired
  const analysis = useMemo(() => {
    // Handle cases where data might not be loaded yet
    if (!internship || !internship.skillsRequired) {
      return { matchPercentage: 0, missingSkills: [], matchedSkills: [] };
    }

    const required = internship.skillsRequired;
    if (required.length === 0) {
      return { matchPercentage: 100, missingSkills: [], matchedSkills: [] };
    }

    const matched = [];
    const missing = [];

    required.forEach(reqSkill => {
      // Check if normalized required skill exists in user's skill list
      if (userSkillsList.includes(reqSkill.toLowerCase().trim())) {
        matched.push(reqSkill);
      } else {
        missing.push(reqSkill);
      }
    });

    const matchPercentage = Math.round((matched.length / required.length) * 100);

    return { matchPercentage, missingSkills: missing, matchedSkills: matched };
  }, [internship, userSkillsList]);

  // Helper to generate mock learning resources for missing skills
  const getResourcesForSkill = (skill) => {
    return [
      { 
        title: `${skill} Official Documentation`, 
        link: `https://www.google.com/search?q=${skill}+documentation`,
        type: 'Docs'
      },
      { 
        title: `${skill} Crash Course (YouTube)`, 
        link: `https://www.youtube.com/results?search_query=${skill}+crash+course`,
        type: 'Video'
      },
      {
        title: `${skill} Interview Questions`,
        link: `https://www.google.com/search?q=top+${skill}+interview+questions`,
        type: 'Practice'
      }
    ];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h2>
            <p className="text-gray-600 mt-1">
              Readiness for <span className="font-semibold text-[#4F46E5]">{internship?.title || 'this Role'}</span>
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${analysis.matchPercentage >= 80 ? 'text-green-600' : 'text-[#4F46E5]'}`}>
              {analysis.matchPercentage}%
            </div>
            <div className="text-sm text-gray-600">Match Score</div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              analysis.matchPercentage >= 80 
                ? 'bg-green-500' 
                : 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]'
            }`}
            style={{ width: `${analysis.matchPercentage}%` }}
          ></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-xl flex items-center border border-red-100">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{analysis.missingSkills.length}</div>
              <div className="text-sm text-gray-600">Missing Skills</div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl flex items-center border border-green-100">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <Target className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{analysis.matchedSkills.length}</div>
              <div className="text-sm text-gray-600">Matched Skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
        
        {analysis.missingSkills.length > 0 ? (
          <div className="space-y-3">
            {analysis.missingSkills.map((skill, index) => (
              <div 
                key={index} 
                className={`border rounded-lg transition-all duration-200 ${
                  selectedSkill === skill ? 'border-[#4F46E5] bg-blue-50/30' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                >
                  <div className="flex items-center">
                    <Zap size={18} className="text-red-500 mr-3" />
                    <span className="font-medium text-gray-900">{skill}</span>
                  </div>
                  <div className="flex items-center text-sm text-[#4F46E5] font-medium">
                    {selectedSkill === skill ? 'Close Resources' : 'View Resources'}
                    {selectedSkill === skill ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                  </div>
                </div>
                
                {/* Expandable Resource Section */}
                {selectedSkill === skill && (
                  <div className="px-4 pb-4 pt-0 border-t border-gray-100 mt-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold py-3">Recommended Learning</p>
                    <div className="space-y-2">
                      {getResourcesForSkill(skill).map((res, idx) => (
                        <a 
                          key={idx} 
                          href={res.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#4F46E5] hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-center text-sm text-gray-700">
                            <BookOpen size={16} className="mr-3 text-gray-400 group-hover:text-[#4F46E5]" />
                            {res.title}
                          </div>
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-[#4F46E5]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-700">
             <CheckCircle className="mr-2" size={24} />
             <span className="font-medium">You have all the required skills! You are a great fit.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;