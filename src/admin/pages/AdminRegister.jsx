import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.adminCode !== 'ADMIN2024') newErrors.adminCode = 'Invalid admin registration code';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('adminToken', 'admin-token-' + Date.now());
      setLoading(false);
      alert('Admin registration successful! Please login.');
      navigate('/admin/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Admin Registration</h1>
            <p className="text-gray-300 mt-2">Request administrative access</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1" /> {errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="admin@college.edu"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1" /> {errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Create a strong password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1" /> {errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1" /> {errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Registration Code</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg ${errors.adminCode ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter admin code"
                />
              </div>
              {errors.adminCode && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1" /> {errors.adminCode}</p>}
              <p className="text-xs text-gray-500 mt-1">Demo code: ADMIN2024</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg font-medium hover:from-gray-900 hover:to-black transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <><Loader2 className="animate-spin mr-2" size={20} /> Processing...</> : 'Request Admin Access'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have admin access?{' '}
              <Link to="/admin/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;