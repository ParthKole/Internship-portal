import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, ArrowLeft, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // For demo: Always successful
    setTimeout(() => {
      localStorage.setItem('userType', 'company');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('companyToken', 'company-token-' + Date.now());
      navigate('/company/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Company Login</h1>
            <p className="text-blue-100 mt-2">Access your company dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <AlertCircle size={18} className="mr-2" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hr@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link to="/company/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Signing in...
                </>
              ) : (
                'Login to Company Dashboard'
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have a company account?{' '}
              <Link to="/company/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Register Company
              </Link>
            </div>
          </form>

          {/* Demo Note */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Demo: Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;