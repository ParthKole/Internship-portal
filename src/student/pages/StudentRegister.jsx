import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, User, Mail, Lock, Eye, EyeOff, Phone, MapPin,
  Calendar, BookOpen, Code, Briefcase, Upload, Globe, Award,
  ChevronRight, Loader2, AlertCircle, CheckCircle, X, Users,
  Building, Globe2, FileText, FolderGit2, Cpu, Database, 
  Cloud, Terminal, Layers, Plus, Award as AwardIcon, 
  Target, Star, Heart, PenTool, FileCheck, Trophy,
  Linkedin, Github, ExternalLink, Zap
} from 'lucide-react';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 8;

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    currentCity: '',
    permanentAddress: '',
    passportNumber: '',
    
    // Step 2: Academic Background
    university: '',
    universityType: 'public',
    collegeName: '',
    degree: '',
    specialization: '',
    currentYear: '3rd Year',
    graduationYear: '',
    currentSemester: '',
    cgpa: '',
    percentage: '',
    academicAchievements: '',
    
    // Step 3: Education History
    highSchool: {
      name: '',
      board: '',
      year: '',
      percentage: '',
      subjects: ''
    },
    intermediate: {
      name: '',
      board: '',
      year: '',
      percentage: '',
      stream: ''
    },
    
    // Step 4: Technical Skills
    programmingLanguages: ['JavaScript', 'Python'],
    frameworks: ['React', 'Node.js'],
    databases: ['MongoDB', 'MySQL'],
    cloudPlatforms: ['AWS'],
    devOpsTools: ['Docker', 'Git'],
    
    // Step 5: Projects
    projects: [{
      title: '',
      description: '',
      technologies: [],
      role: '',
      duration: '',
      githubLink: '',
      liveLink: ''
    }],
    
    // Step 6: Certifications
    certifications: [{
      title: '',
      issuer: '',
      date: '',
      credentialId: ''
    }],
    
    // Step 7: Preferences
    preferredJobTypes: ['Internship'],
    preferredLocations: ['Bangalore'],
    preferredIndustries: ['Technology'],
    expectedSalary: '',
    careerGoals: '',
    
    // Step 8: Account
    password: '',
    confirmPassword: '',
    profilePhoto: null,
    resume: null,
    linkedin: '',
    github: '',
    termsAccepted: false,
    privacyAccepted: false,
    receiveNotifications: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { ...template }]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (stepNum === 2) {
      if (!formData.university.trim()) newErrors.university = 'University is required';
      if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
      if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
    }

    if (stepNum === 8) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms and conditions';
      if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setLoading(true);
      
      setTimeout(() => {
        const studentProfile = {
          ...formData,
          id: Date.now(),
          registeredAt: new Date().toISOString(),
          profileComplete: 85,
          verificationStatus: 'pending'
        };
        
        localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
        localStorage.setItem('studentToken', 'student-token-' + Date.now());
        localStorage.setItem('isLoggedIn', 'true');
        
        setLoading(false);
        navigate('/student/dashboard');
      }, 2000);
    }
  };

  const StepProgress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 overflow-x-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              step === stepNum 
                ? 'bg-blue-600 text-white' 
                : step > stepNum 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step > stepNum ? <CheckCircle size={16} /> : stepNum}
            </div>
            {stepNum < 8 && (
              <div className={`w-12 h-1 mx-2 ${
                step > stepNum ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600 text-center">
        Step {step} of {totalSteps}: {
          step === 1 ? 'Personal Info' :
          step === 2 ? 'Academic Details' :
          step === 3 ? 'Education History' :
          step === 4 ? 'Technical Skills' :
          step === 5 ? 'Projects' :
          step === 6 ? 'Certifications' :
          step === 7 ? 'Preferences' :
          'Account Setup'
        }
      </div>
    </div>
  );

  const stepTitles = {
    1: 'Personal Information',
    2: 'Academic Background',
    3: 'Education History',
    4: 'Technical Skills',
    5: 'Projects',
    6: 'Certifications',
    7: 'Career Preferences',
    8: 'Account Setup'
  };

  const stepDescriptions = {
    1: 'Tell us about yourself',
    2: 'Your academic qualifications',
    3: 'Complete education history',
    4: 'Your technical expertise',
    5: 'Showcase your projects',
    6: 'Your certifications and achievements',
    7: 'Your career goals and preferences',
    8: 'Create your account'
  };

  const technicalCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="text-blue-500" />,
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'TypeScript'],
      field: 'programmingLanguages'
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Layers className="text-purple-500" />,
      skills: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django'],
      field: 'frameworks'
    },
    {
      title: 'Databases',
      icon: <Database className="text-green-500" />,
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
      field: 'databases'
    },
    {
      title: 'Cloud Platforms',
      icon: <Cloud className="text-orange-500" />,
      skills: ['AWS', 'Azure', 'Google Cloud', 'Firebase'],
      field: 'cloudPlatforms'
    },
    {
      title: 'DevOps Tools',
      icon: <Terminal className="text-red-500" />,
      skills: ['Docker', 'Git', 'Jenkins', 'Kubernetes'],
      field: 'devOpsTools'
    }
  ];

  const addSkill = (category, skill) => {
    if (!formData[category].includes(skill)) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], skill]
      }));
    }
  };

  const removeSkill = (category, skill) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter(s => s !== skill)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ChevronRight className="rotate-180 mr-2" size={16} />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
              <p className="text-gray-600 mt-1">Complete your profile in {totalSteps} detailed steps</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <StepProgress />
          
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{stepTitles[step]}</h2>
            <p className="text-gray-600">{stepDescriptions[step]}</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="john.doe@university.edu"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="Indian"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Background */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University/Institute *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.university ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Indian Institute of Technology Delhi"
                        />
                      </div>
                      {errors.university && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.university}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Level *
                      </label>
                      <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.degree ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Degree</option>
                        <option value="B.Tech">Bachelor of Technology</option>
                        <option value="B.E.">Bachelor of Engineering</option>
                        <option value="B.Sc.">Bachelor of Science</option>
                        <option value="M.Tech">Master of Technology</option>
                        <option value="M.Sc.">Master of Science</option>
                      </select>
                      {errors.degree && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.degree}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization/Major
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="Computer Science & Engineering"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Graduation Year *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="number"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          min="2024"
                          max="2030"
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.graduationYear ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="2025"
                        />
                      </div>
                      {errors.graduationYear && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.graduationYear}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Year
                      </label>
                      <select
                        name="currentYear"
                        value={formData.currentYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Final Year">Final Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CGPA/Percentage
                      </label>
                      <input
                        type="text"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="8.5/10 or 85%"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        College Name
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="Department of Computer Science"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Education History */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                      <BookOpen className="mr-2" size={18} />
                      10th Standard (High School)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School Name
                        </label>
                        <input
                          type="text"
                          value={formData.highSchool.name}
                          onChange={(e) => handleNestedChange('highSchool', 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="Delhi Public School"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Board
                        </label>
                        <input
                          type="text"
                          value={formData.highSchool.board}
                          onChange={(e) => handleNestedChange('highSchool', 'board', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="CBSE/ICSE/State Board"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year of Passing
                        </label>
                        <input
                          type="number"
                          value={formData.highSchool.year}
                          onChange={(e) => handleNestedChange('highSchool', 'year', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="2019"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Percentage/CGPA
                        </label>
                        <input
                          type="text"
                          value={formData.highSchool.percentage}
                          onChange={(e) => handleNestedChange('highSchool', 'percentage', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="92%"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                      <BookOpen className="mr-2" size={18} />
                      12th Standard (Intermediate)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School/College Name
                        </label>
                        <input
                          type="text"
                          value={formData.intermediate.name}
                          onChange={(e) => handleNestedChange('intermediate', 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="Delhi Public School"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Board
                        </label>
                        <input
                          type="text"
                          value={formData.intermediate.board}
                          onChange={(e) => handleNestedChange('intermediate', 'board', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="CBSE"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year of Passing
                        </label>
                        <input
                          type="number"
                          value={formData.intermediate.year}
                          onChange={(e) => handleNestedChange('intermediate', 'year', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="2021"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stream
                        </label>
                        <select
                          value={formData.intermediate.stream}
                          onChange={(e) => handleNestedChange('intermediate', 'stream', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Stream</option>
                          <option value="Science">Science (PCM/PCB)</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Arts">Arts/Humanities</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Technical Skills */}
              {step === 4 && (
                <div className="space-y-8">
                  {technicalCategories.map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.title}</h3>
                          <p className="text-sm text-gray-600">Select from popular skills</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData[category.field].map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(category.field, skill)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => addSkill(category.field, skill)}
                            disabled={formData[category.field].includes(skill)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                              formData[category.field].includes(skill)
                                ? 'bg-blue-600 text-white cursor-default'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 5: Projects */}
              {step === 5 && (
                <div className="space-y-6">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Project {index + 1}</h3>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('projects', index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="E-Commerce Platform"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Role
                          </label>
                          <input
                            type="text"
                            value={project.role}
                            onChange={(e) => handleArrayChange('projects', index, 'role', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="Full Stack Developer"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={project.description}
                            onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="Describe the project and your contributions..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={project.duration}
                            onChange={(e) => handleArrayChange('projects', index, 'duration', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="3 months"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub Link
                          </label>
                          <input
                            type="url"
                            value={project.githubLink}
                            onChange={(e) => handleArrayChange('projects', index, 'githubLink', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('projects', {
                      title: '',
                      description: '',
                      technologies: [],
                      role: '',
                      duration: '',
                      githubLink: '',
                      liveLink: ''
                    })}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center"
                  >
                    <Plus className="mr-2" size={18} />
                    Add Another Project
                  </button>
                </div>
              )}

              {/* Step 6: Certifications */}
              {step === 6 && (
                <div className="space-y-6">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Certification {index + 1}</h3>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('certifications', index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Certification Title
                          </label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => handleArrayChange('certifications', index, 'title', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="AWS Certified Cloud Practitioner"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Issuing Organization
                          </label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Issue Date
                          </label>
                          <input
                            type="month"
                            value={cert.date}
                            onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Credential ID
                          </label>
                          <input
                            type="text"
                            value={cert.credentialId}
                            onChange={(e) => handleArrayChange('certifications', index, 'credentialId', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                            placeholder="ABC123XYZ"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('certifications', {
                      title: '',
                      issuer: '',
                      date: '',
                      credentialId: ''
                    })}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center"
                  >
                    <Plus className="mr-2" size={18} />
                    Add Another Certification
                  </button>
                </div>
              )}

              {/* Step 7: Career Preferences */}
              {step === 7 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Preferred Job Types
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Internship', 'Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote', 'On-site', 'Hybrid'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={type}
                            checked={formData.preferredJobTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  preferredJobTypes: [...prev.preferredJobTypes, type]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  preferredJobTypes: prev.preferredJobTypes.filter(t => t !== type)
                                }));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Locations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Chennai', 'Remote', 'Any'].map((location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => {
                            if (formData.preferredLocations.includes(location)) {
                              setFormData(prev => ({
                                ...prev,
                                preferredLocations: prev.preferredLocations.filter(l => l !== location)
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                preferredLocations: [...prev.preferredLocations, location]
                              }));
                            }
                          }}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            formData.preferredLocations.includes(location)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Salary (₹ per annum)
                    </label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                      placeholder="e.g., 600000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Career Goals
                    </label>
                    <textarea
                      name="careerGoals"
                      value={formData.careerGoals}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                      placeholder="Describe your short-term and long-term career goals..."
                    />
                  </div>
                </div>
              )}

              {/* Step 8: Account Setup */}
              {step === 8 && (
                <div className="space-y-6">
                  {/* Social Profiles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub Profile
                      </label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Create Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
                        I agree to the Terms of Service and Code of Conduct
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.termsAccepted}
                      </p>
                    )}

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="privacyAccepted"
                        name="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="privacyAccepted" className="ml-2 text-sm text-gray-700">
                        I accept the Privacy Policy and consent to data processing
                      </label>
                    </div>
                    {errors.privacyAccepted && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.privacyAccepted}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-8 pb-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
                  >
                    ← Previous
                  </button>
                ) : (
                  <Link
                    to="/student/login"
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Already have an account?
                  </Link>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Continue → Step {step + 1}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Creating Profile...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle className="ml-2" size={20} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/student/login" 
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;