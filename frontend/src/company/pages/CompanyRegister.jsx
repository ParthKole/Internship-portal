import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building, User, Mail, Lock, Phone, MapPin, Globe, Briefcase,
  Users, Calendar, ArrowLeft, AlertCircle, Loader2,
  Eye, EyeOff, CheckCircle, FileText, DollarSign, Target
} from 'lucide-react';
import api from '../../utils/api';

const CompanyRegister = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const totalSteps = 3;

  const [formData, setFormData] = useState({
    companyName: '', companyType: '', industry: '', foundedYear: '',
    headquarters: '', website: '', about: '', contactPerson: '',
    designation: '', email: '', phone: '', alternatePhone: '',
    linkedin: '', password: '', confirmPassword: '',
    termsAccepted: false, privacyAccepted: false, receiveUpdates: true,
    employeeCount: '', annualRevenue: '', techStack: [], benefits: [],
    workCulture: '', role: 'company'
  });

  const companyTypes = ['Startup', 'MNC', 'SME', 'Government', 'NGO'];
  const industries = ['IT', 'Finance', 'Healthcare', 'E-commerce', 'Education'];
  const techStackOptions = ['React', 'Node.js', 'Python', 'Java', 'AWS'];
  const benefitsOptions = ['Health Insurance', 'Remote Work', 'Flexible Hours'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name.includes('techStack')) {
      const tech = name.replace('techStack-', '');
      setFormData(prev => ({
        ...prev,
        techStack: checked ? [...prev.techStack, tech] : prev.techStack.filter(t => t !== tech)
      }));
    } else if (type === 'checkbox' && name.includes('benefits')) {
      const benefit = name.replace('benefits-', '');
      setFormData(prev => ({
        ...prev,
        benefits: checked ? [...prev.benefits, benefit] : prev.benefits.filter(b => b !== benefit)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};
    if (stepNum === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
    }
    if (stepNum === 3) {
      if (!formData.password) newErrors.password = 'Required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mismatch';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setLoading(true);
      try {
        await api.post('/auth/register', formData);
        setLoading(false);
        navigate('/company/login', { state: { message: 'Success! Please login.' } });
      } catch (err) {
        setLoading(false);
        alert(err.response?.data?.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 mb-4"><ArrowLeft size={18} className="mr-2"/> Back</Link>
          <h1 className="text-3xl font-bold">Company Registration</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium mb-2">Company Name</label><input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-3 border rounded-xl" required /></div>
                    <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-xl" required /></div>
                  </div>
                  {/* Add more fields here as needed */}
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium mb-2">Contact Person</label><input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full p-3 border rounded-xl" /></div>
                    <div><label className="block text-sm font-medium mb-2">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-xl" /></div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div><label className="block text-sm font-medium mb-2">Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-xl" /></div>
                  <div><label className="block text-sm font-medium mb-2">Confirm Password</label><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-xl" /></div>
                </div>
              )}
            </div>

            <div className="px-8 pb-8 pt-6 border-t flex justify-between">
              {step > 1 ? <button type="button" onClick={prevStep} className="px-6 py-3 border rounded-xl">Previous</button> : <div></div>}
              {step < totalSteps ? <button type="button" onClick={nextStep} className="px-8 py-3 bg-blue-600 text-white rounded-xl">Next</button> : 
              <button type="submit" disabled={loading} className="px-8 py-3 bg-green-600 text-white rounded-xl">{loading ? 'Processing...' : 'Register'}</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;