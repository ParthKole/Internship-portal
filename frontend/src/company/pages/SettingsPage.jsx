// src/company/pages/SettingsPage.jsx
import React, { useState } from 'react';
import {
  Save,
  Bell,
  Shield,
  Users,
  Globe,
  CreditCard,
  Download,
  Upload,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Lock,
  LogOut,
  Trash2
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [companyData, setCompanyData] = useState({
    companyName: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    phone: '+91 9876543210',
    website: 'www.techcorp.com',
    location: 'Bangalore, India',
    industry: 'Information Technology',
    founded: '2018',
    size: '51-200',
    description: 'We provide innovative software solutions and IT services.',
    contactPerson: 'John Doe',
    designation: 'HR Manager'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    applicationAlerts: true,
    interviewReminders: true,
    weeklyReports: true,
    marketingEmails: false,
    candidateMessages: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelist: [],
    loginAlerts: true
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@techcorp.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@techcorp.com', role: 'Recruiter', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@techcorp.com', role: 'Viewer', status: 'pending' },
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: <Building size={18} /> },
    { id: 'team', label: 'Team Members', icon: <Users size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'billing', label: 'Billing & Plan', icon: <CreditCard size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <Globe size={18} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your company settings and preferences</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center">
          <Save size={18} className="mr-2" />
          Save Changes
        </button>
      </div>

      {/* Settings Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Tabs */}
          <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="p-6">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Danger Zone */}
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Danger Zone</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
                  <Trash2 size={16} className="mr-2" />
                  Delete Company Account
                </button>
                <button className="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <LogOut size={16} className="mr-2" />
                  Logout All Devices
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Company Profile</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyData.companyName}
                        onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <select
                        value={companyData.industry}
                        onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>Information Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>E-commerce</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={companyData.location}
                        onChange={(e) => setCompanyData({...companyData, location: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description
                    </label>
                    <textarea
                      value={companyData.description}
                      onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Contact Person */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Primary Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        value={companyData.contactPerson}
                        onChange={(e) => setCompanyData({...companyData, contactPerson: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={companyData.designation}
                        onChange={(e) => setCompanyData({...companyData, designation: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Settings */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Team Members</h2>
                    <p className="text-gray-600 text-sm">Manage who can access your company account</p>
                  </div>
                  <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    + Invite Team Member
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Role</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {teamMembers.map((member) => (
                          <tr key={member.id}>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-medium text-gray-900">{member.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{member.email}</td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                member.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                                member.role === 'Recruiter' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {member.role}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                member.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button className="text-sm text-blue-600 hover:text-blue-700">
                                  Edit
                                </button>
                                <button className="text-sm text-red-600 hover:text-red-700">
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-medium text-blue-900 mb-2">Roles & Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-2">Admin</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Full access</li>
                        <li>• Manage team</li>
                        <li>• Billing access</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-2">Recruiter</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Post internships</li>
                        <li>• Review applications</li>
                        <li>• Schedule interviews</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-2">Viewer</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• View applications</li>
                        <li>• Read-only access</li>
                        <li>• No edits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                  <p className="text-gray-600 text-sm">Choose what notifications you want to receive</p>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <div className="font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {key.includes('email') ? 'Receive email notifications' : 
                           key.includes('application') ? 'Get alerts for new applications' :
                           key.includes('interview') ? 'Reminders for scheduled interviews' :
                           key.includes('weekly') ? 'Weekly summary reports' :
                           key.includes('marketing') ? 'Promotional emails and updates' :
                           'Notifications for candidate messages'}
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications({...notifications, [key]: !value})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-amber-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900">Notification Delivery</h4>
                      <p className="text-amber-800 text-sm mt-1">
                        Critical notifications (application alerts, interview reminders) are delivered immediately via email. 
                        You can also configure SMS notifications for urgent alerts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                  <p className="text-gray-600 text-sm">Manage your account security and access</p>
                </div>
                
                {/* Password Change */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password.current}
                          onChange={(e) => setPassword({...password, current: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={password.new}
                        onChange={(e) => setPassword({...password, new: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={password.confirm}
                        onChange={(e) => setPassword({...password, confirm: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>
                
                {/* Two-Factor Authentication */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-gray-600 text-sm mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setSecurity({...security, twoFactorAuth: !security.twoFactorAuth})}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        security.twoFactorAuth
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {security.twoFactorAuth ? 'Enabled' : 'Enable 2FA'}
                    </button>
                  </div>
                  
                  {security.twoFactorAuth && (
                    <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center text-emerald-700">
                        <CheckCircle size={16} className="mr-2" />
                        <span className="font-medium">Two-factor authentication is enabled</span>
                      </div>
                      <p className="text-sm text-emerald-700 mt-1">
                        You'll be required to enter a verification code from your authenticator app when signing in.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Session Management */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <select
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                        className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Login Alerts</div>
                        <div className="text-sm text-gray-600">Get notified of new sign-ins</div>
                      </div>
                      <button
                        onClick={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          security.loginAlerts ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Billing & Plan</h2>
                  <p className="text-gray-600 text-sm">Manage your subscription and billing information</p>
                </div>
                
                {/* Current Plan */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                          <CreditCard size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Business Plan</h3>
                          <p className="text-blue-100">Active until Dec 31, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-3xl font-bold">₹9,999<span className="text-lg font-normal">/month</span></div>
                        <p className="text-blue-100">Billed annually</p>
                      </div>
                    </div>
                    <button className="mt-6 md:mt-0 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
                
                {/* Plan Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Current Plan Includes</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle size={16} className="text-emerald-500 mr-3 flex-shrink-0" />
                        Unlimited Internship Postings
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle size={16} className="text-emerald-500 mr-3 flex-shrink-0" />
                        5 Team Members
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle size={16} className="text-emerald-500 mr-3 flex-shrink-0" />
                        Advanced Analytics
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle size={16} className="text-emerald-500 mr-3 flex-shrink-0" />
                        Priority Support
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Usage This Month</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Internship Posts</span>
                          <span className="font-medium">8/Unlimited</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Team Members</span>
                          <span className="font-medium">3/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full w-3/5"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Applications</span>
                          <span className="font-medium">156/Unlimited</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full w-1/10"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Billing History</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Oct 2024</span>
                        <span className="font-medium text-gray-900">₹9,999</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Sep 2024</span>
                        <span className="font-medium text-gray-900">₹9,999</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Aug 2024</span>
                        <span className="font-medium text-gray-900">₹9,999</span>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                      View All Invoices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Settings */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Integrations</h2>
                  <p className="text-gray-600 text-sm">Connect with other tools and services</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                        <Globe className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Google Calendar</h4>
                        <p className="text-gray-600 text-sm">Sync interviews with calendar</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                        <Mail className="text-emerald-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Gmail/Outlook</h4>
                        <p className="text-gray-600 text-sm">Email integration</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-white text-emerald-600 border border-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-50">
                      Configure
                    </button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                        <Download className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Zapier</h4>
                        <p className="text-gray-600 text-sm">Automation workflows</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
                      Connect
                    </button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                        <Users className="text-amber-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Slack</h4>
                        <p className="text-gray-600 text-sm">Team notifications</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;