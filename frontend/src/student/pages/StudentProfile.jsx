import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import api from '../../utils/api';
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Code,
  Briefcase,
  Download,
  Edit,
  Globe,
  FileText,
  ExternalLink,
  Star,
  CheckCircle,
  Users,
  Loader2,
  AlertCircle,
  Database,
  Terminal,
  Cpu
} from 'lucide-react';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 1. Fetch Profile Data
        const res = await api.get('/student/profile'); // Using api utility, not hardcoded localhost
        const profile = res.data;
        
        // 2. Fetch basic user info from local storage (fallback for email/name)
        const userDataStr = localStorage.getItem('userData');
        const userData = userDataStr ? JSON.parse(userDataStr) : {};

        // 3. TRANSFORM DATA: Backend Schema -> UI Format
        const formattedData = {
          personalInfo: {
            name: profile.personalInfo?.firstName 
              ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
              : userData.name || 'Student',
            title: profile.academic?.degree 
              ? `${profile.academic.degree} Student` 
              : 'Engineering Student',
            bio: profile.preferences?.careerGoals || 'No bio added yet.',
            email: userData.email || profile.userId?.email || 'N/A',
            phone: profile.personalInfo?.phone || 'N/A',
            location: profile.personalInfo?.currentCity || 'N/A',
            // Specific academic fields for display
            university: profile.academic?.university || 'N/A',
            degree: profile.academic?.degree || '',
            graduationYear: profile.academic?.graduationYear || '',
            gpa: profile.academic?.cgpa ? `${profile.academic.cgpa} CGPA` : 'N/A'
          },
          
          // Map backend arrays (strings) to UI objects (name + level)
          // Since DB doesn't store 'level', we simulate it for visual UI
          skills: {
            frontend: (profile.skills?.frameworks || []).map(skill => ({
              name: skill,
              level: 85 
            })),
            backend: [
              ...(profile.skills?.programmingLanguages || []),
              ...(profile.skills?.databases || [])
            ].map(skill => ({
              name: skill,
              level: Math.floor(Math.random() * (95 - 70) + 70) // Random visual level
            })),
            // Use devOps tools as "Other/Soft" or hardcode soft skills if not in DB
            softSkills: [
              'Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability',
              ...(profile.skills?.devOpsTools || [])
            ]
          },
          
          projects: (profile.projects || []).map(p => ({
            title: p.title,
            description: p.description,
            technologies: p.technologies || [],
            githubLink: p.githubLink,
            liveLink: p.liveLink,
            role: p.role,
            stars: 0, // Not in DB
            contributors: 1, // Default
            status: p.duration ? 'Completed' : 'In Progress'
          })),
          
          // Combine current academic + past history into one "Education" list
          education: [
            // 1. Current University
            ...(profile.academic ? [{
              institution: profile.academic.university,
              degree: `${profile.academic.degree} - ${profile.academic.specialization}`,
              year: `Graduating ${profile.academic.graduationYear}`,
              details: `CGPA: ${profile.academic.cgpa}`,
              achievements: ['Current Student']
            }] : []),
            // 2. Intermediate
            ...(profile.educationHistory?.intermediate ? [{
              institution: profile.educationHistory.intermediate.name,
              degree: `Intermediate (${profile.educationHistory.intermediate.stream})`,
              year: profile.educationHistory.intermediate.year,
              details: `Percentage: ${profile.educationHistory.intermediate.percentage}%`,
              achievements: [profile.educationHistory.intermediate.board]
            }] : []),
            // 3. High School
            ...(profile.educationHistory?.highSchool ? [{
              institution: profile.educationHistory.highSchool.name,
              degree: 'High School',
              year: profile.educationHistory.highSchool.year,
              details: `Percentage: ${profile.educationHistory.highSchool.percentage}%`,
              achievements: [profile.educationHistory.highSchool.board]
            }] : [])
          ],
          
          certifications: (profile.certifications || []).map(c => ({
            title: c.title,
            issuer: c.issuer,
            year: c.date ? new Date(c.date).getFullYear() : 'N/A',
            credentialId: c.credentialId
          })),
          
          socialProfiles: {
            linkedin: {
              url: profile.socialLinks?.linkedin,
              username: 'LinkedIn Profile',
              connections: '500+',
            },
            github: {
              url: profile.socialLinks?.github,
              username: 'GitHub Profile',
              repos: '10+',
            },
            portfolio: {
              url: profile.socialLinks?.website,
              username: 'Portfolio'
            }
          },
          
          // Resume Logic (Mock progress based on profile data existence)
          resume: {
            fileName: 'Resume.pdf', 
            completion: calculateProfileCompletion(profile), 
            lastUpdated: new Date().toLocaleDateString(),
            sections: [
              { name: 'Personal Info', completed: true, progress: 100 },
              { name: 'Education', completed: !!profile.academic, progress: 100 },
              { name: 'Projects', completed: (profile.projects?.length > 0), progress: 100 },
              { name: 'Skills', completed: (profile.skills?.programmingLanguages?.length > 0), progress: 100 },
              { name: 'Certifications', completed: (profile.certifications?.length > 0), progress: 100 }
            ]
          }
        };

        setStudentData(formattedData);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        if (err.response?.status === 404) {
             setError("Profile not found. Please complete your registration.");
        } else {
             setError("Failed to load profile data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Helper to calculate score
  const calculateProfileCompletion = (profile) => {
    let score = 0;
    if (profile.personalInfo) score += 20;
    if (profile.academic) score += 20;
    if (profile.skills?.programmingLanguages?.length > 0) score += 20;
    if (profile.projects?.length > 0) score += 20;
    if (profile.socialLinks?.linkedin) score += 20;
    return score;
  };

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // --- Render Error/Empty State ---
  if (error || !studentData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Unavailable</h2>
            <p className="text-gray-600 mb-6">{error || "Could not load profile data."}</p>
            <button 
                onClick={() => navigate('/student/register')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Create/Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Main Profile ---
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title="My Profile" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (Main Info) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Profile Summary Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {studentData.personalInfo.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{studentData.personalInfo.name}</h2>
                          <p className="text-gray-600 mt-1">{studentData.personalInfo.title}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Open to Internships
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{studentData.personalInfo.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Mail size={14} className="mr-2" /> Email
                          </div>
                          <p className="font-medium text-gray-900 truncate" title={studentData.personalInfo.email}>
                            {studentData.personalInfo.email}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Phone size={14} className="mr-2" /> Phone
                          </div>
                          <p className="font-medium text-gray-900">{studentData.personalInfo.phone}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <MapPin size={14} className="mr-2" /> Location
                          </div>
                          <p className="font-medium text-gray-900">{studentData.personalInfo.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/student/register')} // Reuse register page for editing
                    className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                {/* 2. Skills Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      + Add Skill
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Frontend (from Frameworks) */}
                    {studentData.skills.frontend.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <Terminal size={14} className="mr-2 text-purple-500"/> Frameworks
                        </h3>
                        <div className="space-y-3">
                          {studentData.skills.frontend.map((skill, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                <span className="text-xs text-gray-600">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Backend (from Languages/Databases) */}
                    {studentData.skills.backend.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                            <Database size={14} className="mr-2 text-green-500"/> Languages & Databases
                        </h3>
                        <div className="space-y-3">
                          {studentData.skills.backend.map((skill, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                <span className="text-xs text-gray-600">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full">
                                <div 
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Soft Skills */}
                    {studentData.skills.softSkills.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                            <Users size={14} className="mr-2 text-orange-500"/> Soft Skills & Tools
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {studentData.skills.softSkills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 3. Projects Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <Code className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                        <p className="text-sm text-gray-600">Showcasing my technical expertise</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      + Add Project
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {studentData.projects.length > 0 ? (
                      studentData.projects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
                              {project.role && <span className="text-xs text-gray-500 font-medium block mb-1">{project.role}</span>}
                              <div className="flex items-center space-x-3 mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800`}>
                                  {project.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {project.githubLink && (
                                <a 
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded"
                                >
                                  <Code size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users size={14} className="mr-1" />
                              {project.contributors} contributor
                            </div>
                            <div>
                              {project.liveLink ? (
                                <a 
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center"
                                >
                                  Live Demo
                                  <ExternalLink size={14} className="ml-1" />
                                </a>
                              ) : (
                                <span className="text-sm text-gray-400">No live link</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        No projects added yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column (Education, Resume, Social) */}
              <div className="lg:col-span-4 space-y-6">
                {/* 1. Education Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <GraduationCap className="text-blue-600" size={20} />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">Education</h2>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      + Add
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {studentData.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{edu.institution}</h3>
                        <p className="text-gray-600 text-xs mt-0.5">{edu.degree}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            {edu.year}
                          </div>
                        </div>
                        <div className="mt-2 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
                          {edu.details}
                        </div>
                      </div>
                    ))}
                    {studentData.education.length === 0 && (
                      <p className="text-sm text-gray-500">No education details added.</p>
                    )}
                  </div>
                </div>
                
                {/* 2. Resume Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="text-green-600" size={20} />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">Resume</h2>
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {studentData.resume.completion}%
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-600">Completion</span>
                      <span className="font-medium">{studentData.resume.completion}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${studentData.resume.completion}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {studentData.resume.sections.map((section, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-2.5 flex items-center justify-center ${section.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {section.completed ? (
                              <CheckCircle size={10} className="text-green-600" />
                            ) : (
                              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                            )}
                          </div>
                          <span className={`text-sm ${section.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {section.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm">
                      <Download size={16} className="mr-2" />
                      Download Resume (PDF)
                    </button>
                    
                    <button className="w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                      Update Resume
                    </button>
                  </div>
                </div>
                
                {/* 3. Social Profiles Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-2.5">
                        <Globe className="text-gray-600" size={16} />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">Social Profiles</h2>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    {/* LinkedIn */}
                    {studentData.socialProfiles.linkedin.url && (
                        <a 
                        href={studentData.socialProfiles.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                        <div className="flex items-center">
                            <Briefcase size={16} className="text-blue-600 mr-2" />
                            <span className="font-medium text-sm">LinkedIn</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400" />
                        </a>
                    )}
                    
                    {/* GitHub */}
                    {studentData.socialProfiles.github.url && (
                        <a 
                        href={studentData.socialProfiles.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                        <div className="flex items-center">
                            <Code size={16} className="text-gray-800 mr-2" />
                            <span className="font-medium text-sm">GitHub</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400" />
                        </a>
                    )}
                    
                    {/* Portfolio */}
                    {studentData.socialProfiles.portfolio.url && (
                        <a 
                        href={studentData.socialProfiles.portfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                        >
                        <div className="flex items-center">
                            <Globe size={16} className="text-purple-600 mr-2" />
                            <span className="font-medium text-sm">Portfolio</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400" />
                        </a>
                    )}

                    {!studentData.socialProfiles.linkedin.url && !studentData.socialProfiles.github.url && (
                        <div className="text-sm text-gray-400 italic text-center py-2">No social profiles added</div>
                    )}
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

export default StudentProfile;