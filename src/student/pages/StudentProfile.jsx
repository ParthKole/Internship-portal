import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Code,
  Award,
  Briefcase,
  Download,
  Edit,
  Globe,
  FileText,
  ExternalLink,
  Star,
  CheckCircle,
  Users
} from 'lucide-react';

const StudentProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Profile Data
  const studentData = {
    personalInfo: {
      name: 'Rahul Sharma',
      title: 'Computer Science Student',
      bio: 'Passionate Computer Science student with a strong foundation in web development and software engineering. I thrive on solving complex problems and building scalable applications. Currently seeking internship opportunities to apply my technical skills in a real-world environment and contribute to innovative projects.',
      email: 'rahul.sharma@iitd.ac.in',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      university: 'Indian Institute of Technology Delhi',
      degree: 'Bachelor of Technology in Computer Science',
      graduationYear: '2025',
      gpa: '3.8/4.0'
    },
    
    skills: {
      frontend: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 88 },
        { name: 'TypeScript', level: 82 },
        { name: 'Tailwind CSS', level: 85 }
      ],
      backend: [
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 85 },
        { name: 'SQL', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'Firebase', level: 75 }
      ],
      softSkills: [
        'Problem Solving', 'Team Collaboration', 'Communication', 
        'Leadership', 'Adaptability', 'Creativity'
      ]
    },
    
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce website with user authentication, payment gateway, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubLink: 'https://github.com/rahulsharma/ecommerce',
        liveLink: 'https://ecommerce-demo.com',
        stars: 42,
        contributors: 3,
        status: 'Live'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management app with real-time updates and team features.',
        technologies: ['React', 'Firebase', 'Tailwind CSS'],
        githubLink: 'https://github.com/rahulsharma/task-manager',
        liveLink: null,
        stars: 28,
        contributors: 2,
        status: 'In Progress'
      }
    ],
    
    education: [
      {
        institution: 'Indian Institute of Technology Delhi',
        degree: 'B.Tech in Computer Science',
        year: '2021 - 2025',
        details: 'CGPA: 3.8/4.0',
        achievements: ['Dean\'s List (2022, 2023)', 'CS Department Scholarship']
      },
      {
        institution: 'Delhi Public School, RK Puram',
        degree: 'Senior Secondary (XII) - Science',
        year: '2020 - 2021',
        details: 'Percentage: 96.2%',
        achievements: ['School Topper in Computer Science', 'Science Olympiad Gold Medalist']
      },
      {
        institution: 'Delhi Public School, RK Puram',
        degree: 'Secondary (X)',
        year: '2018 - 2019',
        details: 'Percentage: 94.8%',
        achievements: ['Perfect Score in Mathematics', 'Science Fair Winner']
      }
    ],
    
    certifications: [
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        year: '2024',
        credentialId: 'AWS-CCP-2024-12345'
      },
      {
        title: 'Full Stack Web Development',
        issuer: 'Coursera (JHU)',
        year: '2023',
        credentialId: 'FSWD-JHU-2023'
      },
      {
        title: 'Python for Data Science',
        issuer: 'DataCamp',
        year: '2023',
        credentialId: 'PY-DS-2023-7890'
      },
      {
        title: 'React Frontend Developer',
        issuer: 'Meta',
        year: '2022',
        credentialId: 'REACT-META-2022'
      }
    ],
    
    socialProfiles: {
      linkedin: {
        url: 'https://linkedin.com/in/rahulsharma',
        username: 'rahulsharma',
        connections: 500,
        followers: 1200
      },
      github: {
        url: 'https://github.com/rahulsharma',
        username: 'rahulsharma',
        repos: 24,
        stars: 85
      },
      portfolio: {
        url: 'https://rahulsharma.dev',
        username: 'rahulsharma.dev'
      }
    },
    
    resume: {
      fileName: 'Rahul_Sharma_Resume_2024.pdf',
      completion: 87,
      lastUpdated: 'December 10, 2024',
      sections: [
        { name: 'Personal Info', completed: true, progress: 100 },
        { name: 'Education', completed: true, progress: 100 },
        { name: 'Projects', completed: true, progress: 100 },
        { name: 'Skills', completed: true, progress: 100 },
        { name: 'Experience', completed: false, progress: 60 },
        { name: 'Certifications', completed: true, progress: 100 }
      ]
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header title = "My Profile" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Two Column Layout - Left (8/12) and Right (4/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8/12 - 67%) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Profile Summary Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      RS
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
                          <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            Available Immediately
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{studentData.personalInfo.bio}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Mail size={14} className="mr-2" />
                            Email
                          </div>
                          <p className="font-medium text-gray-900">{studentData.personalInfo.email}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Phone size={14} className="mr-2" />
                            Phone
                          </div>
                          <p className="font-medium text-gray-900">{studentData.personalInfo.phone}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <MapPin size={14} className="mr-2" />
                            Location
                          </div>
                          <p className="font-medium text-gray-900">{studentData.personalInfo.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                {/* Skills Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      + Add Skill
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Frontend & Backend Skills - Side by Side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Frontend</h3>
                        <div className="space-y-2">
                          {studentData.skills.frontend.map((skill, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-900">{skill.name}</span>
                                <span className="text-xs text-gray-600">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full">
                                <div 
                                  className="h-1.5 bg-blue-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Backend</h3>
                        <div className="space-y-2">
                          {studentData.skills.backend.map((skill, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-900">{skill.name}</span>
                                <span className="text-xs text-gray-600">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full">
                                <div 
                                  className="h-1.5 bg-green-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Soft Skills */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Soft Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {studentData.skills.softSkills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-md border border-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Projects Card - Vertical List with 2 projects */}
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
                    {studentData.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Live' ? 'bg-green-100 text-green-800' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                {project.status}
                              </span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Star size={14} className="mr-1 text-amber-500" />
                                {project.stars}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {project.githubLink && (
                              <a 
                                href={project.githubLink}
                                className="text-gray-500 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded"
                                title="View on GitHub"
                              >
                                <Code size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        
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
                            {project.contributors} contributor{project.contributors > 1 ? 's' : ''}
                          </div>
                          <div>
                            {project.liveLink ? (
                              <a 
                                href={project.liveLink}
                                className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center"
                              >
                                Live Demo
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            ) : (
                              <span className="text-sm text-gray-500">View Details</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column (4/12 - 33%) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Education Card */}
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
                          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {edu.details}
                          </span>
                        </div>
                        <div className="mt-1.5">
                          {edu.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600 mt-1">
                              <CheckCircle size={10} className="text-green-500 mr-1.5" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Resume Card */}
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
                        <span className={`text-xs px-2 py-0.5 rounded ${section.completed ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {section.completed ? '✓' : `${section.progress}%`}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm">
                      <Download size={16} className="mr-2" />
                      Download Resume (PDF)
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                        Update Resume
                      </button>
                      <button className="py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500">
                      Last updated: {studentData.resume.lastUpdated}
                    </p>
                  </div>
                </div>
                
                {/* Social Profiles Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-2.5">
                        <Globe className="text-gray-600" size={16} />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">Social Profiles</h2>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      + Add
                    </button>
                  </div>
                  
                  <div className="space-y-2.5">
                    {/* LinkedIn */}
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
                      <span className="text-xs text-gray-600">{studentData.socialProfiles.linkedin.connections}+</span>
                    </a>
                    
                    {/* GitHub */}
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
                      <span className="text-xs text-gray-600">{studentData.socialProfiles.github.repos} repos</span>
                    </a>
                    
                    {/* Portfolio */}
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
                      <span className="text-xs text-blue-600">Visit</span>
                    </a>
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