// src/common/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, GraduationCap, Users, Search, Target, Zap, CheckCircle, 
  TrendingUp, Shield, Globe, Sparkles, ArrowRight, Star, Award,
  MessageSquare, Clock, Users as UsersIcon, BarChart
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Search className="text-blue-500" size={24} />,
      title: "Smart Match",
      description: "AI-powered internship matching based on your skills and preferences",
      color: "bg-blue-50"
    },
    {
      icon: <Zap className="text-purple-500" size={24} />,
      title: "Quick Apply",
      description: "One-click application with auto-filled profiles",
      color: "bg-purple-50"
    },
    {
      icon: <Target className="text-green-500" size={24} />,
      title: "Real-time Tracking",
      description: "Track application status with detailed insights",
      color: "bg-green-50"
    },
    {
      icon: <BarChart className="text-amber-500" size={24} />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights for companies and students",
      color: "bg-amber-50"
    }
  ];

  const stats = [
    { number: "1,500+", label: "Active Internships", icon: <Briefcase size={20} /> },
    { number: "500+", label: "Top Companies", icon: <Users size={20} /> },
    { number: "10,000+", label: "Students Placed", icon: <GraduationCap size={20} /> },
    { number: "94%", label: "Satisfaction Rate", icon: <Star size={20} /> }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Intern at Google",
      quote: "Got my dream internship in 2 weeks! The platform made applying so easy.",
      avatar: "RS"
    },
    {
      name: "TechCorp Solutions",
      role: "Hiring Manager",
      quote: "Found 5 perfect interns in one month. The quality of candidates is exceptional.",
      avatar: "TC"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="text-white" size={24} />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  InternConnect
                </span>
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full ml-2">
                  PRO
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link to="/student/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                  Student Login
                </Link>
                <Link to="/company/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                  Company Login
                </Link>
                <Link to="/admin/login" className="text-gray-700 hover:text-purple-600 font-medium text-sm">
                  Admin Login
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Link 
                  to="/student/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  Join as Student
                </Link>
                <Link 
                  to="/company/register"
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-medium rounded-lg hover:from-gray-900 hover:to-black transition-all shadow-sm"
                >
                  Join as Company
                </Link>
                <Link 
                  to="/admin/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8">
              <Sparkles size={16} className="text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">
                Trusted by 500+ companies & 10,000+ students
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Gateway to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Internships
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Connect with top companies or discover brilliant talent. Our intelligent platform 
              matches skills with opportunities for both students and companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/student/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <GraduationCap size={20} className="mr-3" />
                Start as Student
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/company/register"
                className="group px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Users size={20} className="mr-3" />
                Hire as Company
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/admin/register"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Shield size={20} className="mr-3" />
                Admin Portal
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-purple-50' : index === 2 ? 'bg-green-50' : 'bg-amber-50'} rounded-xl flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-blue-600">InternConnect</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine cutting-edge technology with human-centered design to deliver exceptional experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Student Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-200 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                      <GraduationCap className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
                      <p className="text-blue-600 font-medium">Find Your Dream Internship</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Browse 1500+ curated internships",
                      "AI-powered job matching",
                      "One-click application process",
                      "Real-time application tracking",
                      "Skill assessment & recommendations"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle size={18} className="text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/student/register"
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    <span>Start Free</span>
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Company Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-50/50 border border-gray-200 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mr-4">
                      <Users className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">For Companies</h3>
                      <p className="text-gray-600 font-medium">Hire Top Talent</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Post internships in 5 minutes",
                      "Access verified student profiles",
                      "AI-powered candidate matching",
                      "Streamlined application management",
                      "Advanced analytics dashboard"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle size={18} className="text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/company/register"
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Students & Companies
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See what our community has to say about their experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 p-12 text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Career or Hiring?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students and companies already experiencing the future of internships
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/student/register"
                  className="group px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  <GraduationCap size={20} className="mr-3" />
                  Start Free as Student
                </Link>
                
                <Link 
                  to="/company/register"
                  className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all flex items-center justify-center"
                >
                  <Users size={20} className="mr-3" />
                  Join as Company
                </Link>
                
                <Link 
                  to="/admin/register"
                  className="group px-8 py-4 bg-purple-800 text-white font-semibold rounded-xl hover:bg-purple-900 transition-all flex items-center justify-center"
                >
                  <Shield size={20} className="mr-3" />
                  Admin Access
                </Link>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                No credit card required • Free forever for students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">InternConnect</span>
              </div>
              <p className="text-gray-400 text-sm">
                Bridging the gap between talent and opportunity since 2024.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/student/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/student/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/student/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/" className="hover:text-white">Browse Internships</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/company/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/company/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/" className="hover:text-white">Post Internship</Link></li>
                <li><Link to="/" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Admin</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/admin/login" className="hover:text-white">Admin Login</Link></li>
                <li><Link to="/admin/register" className="hover:text-white">Register Admin</Link></li>
                <li><Link to="/admin/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 InternConnect. All rights reserved.</p>
            <p className="text-sm mt-2">Made with ❤️ for students and companies worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;