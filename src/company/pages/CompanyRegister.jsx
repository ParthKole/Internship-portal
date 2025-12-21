import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building, User, Mail, Lock, Phone, MapPin, Globe, Briefcase,
  Users, Calendar, Upload, ArrowLeft, AlertCircle, Loader2,
  Eye, EyeOff, CheckCircle, FileText, DollarSign, Target
} from 'lucide-react';

const CompanyRegister = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const totalSteps = 3;

  const [formData, setFormData] = useState({
    // Step 1: Company Details
    companyName: '',
    companyType: '', // Startup, MNC, SME, etc.
    industry: '', // IT, Finance, Healthcare, etc.
    foundedYear: '',
    headquarters: '',
    website: '',
    about: '',
    mission: '',
    vision: '',
    
    // Step 2: Contact & HR Details
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    linkedin: '',
    
    // Step 3: Account Setup
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    receiveUpdates: true,
    
    // Additional
    employeeCount: '',
    annualRevenue: '',
    hiringCapacity: '',
    techStack: [],
    benefits: [],
    workCulture: '',
    
    // Files
    logo: null,
    companyProfile: null
  });

  const companyTypes = [
    'Startup', 'MNC (Multinational)', 'SME (Small & Medium)',
    'Government', 'NGO', 'Educational', 'Research', 'Other'
  ];

  const industries = [
    'Information Technology', 'Finance & Banking', 'Healthcare',
    'E-commerce', 'Manufacturing', 'Education', 'Retail',
    'Telecommunications', 'Automotive', 'Energy', 'Media & Entertainment',
    'Consulting', 'Real Estate', 'Logistics', 'Agriculture', 'Other'
  ];

  const benefitsOptions = [
    'Health Insurance', 'Work From Home', 'Flexible Hours',
    'Learning Budget', 'Stock Options', 'Free Food', 'Gym Membership',
    'Paid Time Off', 'Parental Leave', 'Employee Wellness',
    'Transport Allowance', 'Performance Bonus'
  ];

  const techStackOptions = [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
    '.NET', 'PHP', 'Ruby', 'Go', 'AWS', 'Azure', 'Google Cloud',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI', 'Blockchain',
    'Mobile Development', 'DevOps'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox' && name.includes('techStack')) {
      // Handle tech stack checkboxes
      const tech = name.replace('techStack-', '');
      if (checked) {
        if (!formData.techStack.includes(tech)) {
          setFormData(prev => ({
            ...prev,
            techStack: [...prev.techStack, tech]
          }));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          techStack: prev.techStack.filter(item => item !== tech)
        }));
      }
    } else if (type === 'checkbox' && name.includes('benefits')) {
      // Handle benefits checkboxes
      const benefit = name.replace('benefits-', '');
      if (checked) {
        if (!formData.benefits.includes(benefit)) {
          setFormData(prev => ({
            ...prev,
            benefits: [...prev.benefits, benefit]
          }));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          benefits: prev.benefits.filter(item => item !== benefit)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companyType) newErrors.companyType = 'Company type is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.foundedYear) newErrors.foundedYear = 'Founded year is required';
      if (!formData.headquarters) newErrors.headquarters = 'Headquarters location is required';
      if (!formData.website) newErrors.website = 'Website is required';
    }

    if (stepNum === 2) {
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
      if (!formData.designation) newErrors.designation = 'Designation is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (stepNum === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase and number';
      }
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
        // Store company data
        const companyProfile = {
          ...formData,
          id: Date.now(),
          registeredAt: new Date().toISOString(),
          verificationStatus: 'pending',
          activeInternships: 0,
          totalHired: 0,
          rating: 0
        };
        
        localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
        localStorage.setItem('companyToken', 'company-token-' + Date.now());
        
        setLoading(false);
        navigate('/company/dashboard');
      }, 2000);
    }
  };

  const StepProgress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((stepNum) => (
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
            {stepNum < 3 && (
              <div className={`w-12 h-1 mx-2 ${
                step > stepNum ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600 text-center">
        Step {step} of {totalSteps}: {
          step === 1 ? 'Company Details' :
          step === 2 ? 'Contact Information' :
          'Account Setup'
        }
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4">
              <Building className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Registration</h1>
              <p className="text-gray-600 mt-1">Register your company to hire top talent</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <StepProgress />
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {/* Step 1: Company Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.companyName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="TechCorp Solutions Pvt Ltd"
                        />
                      </div>
                      {errors.companyName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Type *
                      </label>
                      <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.companyType ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Type</option>
                        {companyTypes.map((type, idx) => (
                          <option key={idx} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.companyType && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.companyType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                          errors.industry ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Industry</option>
                        {industries.map((industry, idx) => (
                          <option key={idx} value={industry}>{industry}</option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.industry}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Founded *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="number"
                          name="foundedYear"
                          value={formData.foundedYear}
                          onChange={handleChange}
                          min="1900"
                          max="2024"
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.foundedYear ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="2015"
                        />
                      </div>
                      {errors.foundedYear && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.foundedYear}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Headquarters Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="headquarters"
                          value={formData.headquarters}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.headquarters ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Bangalore, India"
                        />
                      </div>
                      {errors.headquarters && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.headquarters}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Website *
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.website ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="https://www.yourcompany.com"
                        />
                      </div>
                      {errors.website && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.website}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Company
                    </label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="Brief description of your company, products/services, achievements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee Count
                      </label>
                      <select
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      >
                        <option value="">Select Range</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Revenue (Optional)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                          name="annualRevenue"
                          value={formData.annualRevenue}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        >
                          <option value="">Select Range</option>
                          <option value="<1M">Less than $1M</option>
                          <option value="1M-10M">$1M - $10M</option>
                          <option value="10M-50M">$10M - $50M</option>
                          <option value="50M-100M">$50M - $100M</option>
                          <option value="100M-500M">$100M - $500M</option>
                          <option value="500M-1B">$500M - $1B</option>
                          <option value="1B+">$1B+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technology Stack (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {techStackOptions.map((tech, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`techStack-${tech}`}
                            name={`techStack-${tech}`}
                            checked={formData.techStack.includes(tech)}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`techStack-${tech}`} className="ml-2 text-sm text-gray-700">
                            {tech}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.contactPerson ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John Smith"
                        />
                      </div>
                      {errors.contactPerson && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.contactPerson}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation/Role *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                            errors.designation ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="HR Manager / Talent Acquisition"
                        />
                      </div>
                      {errors.designation && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Official Email *
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
                          placeholder="hr@company.com"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alternate Phone (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="alternatePhone"
                          value={formData.alternatePhone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="+91 98765 43211"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile (Optional)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employee Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Benefits (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {benefitsOptions.map((benefit, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`benefits-${benefit}`}
                            name={`benefits-${benefit}`}
                            checked={formData.benefits.includes(benefit)}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`benefits-${benefit}`} className="ml-2 text-sm text-gray-700">
                            {benefit}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Culture Description
                    </label>
                    <textarea
                      name="workCulture"
                      value={formData.workCulture}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="Describe your company culture, values, work environment..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Account Setup */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Company Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                        <Building className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          name="logo"
                          onChange={handleChange}
                          accept="image/*"
                          className="hidden"
                          id="company-logo"
                        />
                        <label
                          htmlFor="company-logo"
                          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                          Upload Logo
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG up to 2MB. Square logo recommended.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Company Profile Document */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Profile Document (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      <FileText className="mx-auto text-gray-400 mb-3" size={32} />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload company brochure, profile PDF, or presentation
                      </p>
                      <input
                        type="file"
                        name="companyProfile"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx,.ppt"
                        className="hidden"
                        id="company-profile"
                      />
                      <label
                        htmlFor="company-profile"
                        className="inline-block px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 cursor-pointer"
                      >
                        Upload Document
                      </label>
                      <p className="text-xs text-gray-500 mt-3">
                        PDF, DOC, PPT up to 10MB
                      </p>
                    </div>
                  </div>

                  {/* Password Fields */}
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
                          className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
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
                          className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
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
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Company Agreement
                        </a>
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
                        I have read and accept the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </a>{' '}
                        and consent to data processing for hiring purposes
                      </label>
                    </div>
                    {errors.privacyAccepted && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.privacyAccepted}
                      </p>
                    )}

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="receiveUpdates"
                        name="receiveUpdates"
                        checked={formData.receiveUpdates}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="receiveUpdates" className="ml-2 text-sm text-gray-700">
                        I want to receive student applications, platform updates, and hiring insights
                      </label>
                    </div>
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
                    to="/company/login"
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
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Registering Company...
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

              <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <Target className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Get access to top talent</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Verified student profiles • AI-powered matching • Streamlined hiring process • 
                      Direct communication with candidates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have a company account?{' '}
            <Link 
              to="/company/login" 
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

export default CompanyRegister;