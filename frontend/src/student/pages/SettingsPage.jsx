// src/student/pages/SettingsPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Mail,
  Lock,
  Save,
  Upload,
  Eye,
  EyeOff,
  Calendar,
  Briefcase,
  GraduationCap,
  Download,
  LogOut,
  AlertTriangle,
  Smartphone,
  Globe,
  Trash2,
  Camera,
  SmartphoneIcon,
  Database
} from 'lucide-react';

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@college.edu',
    phone: '+91 98765 43210',
    bio: 'Final year Computer Science student passionate about web development and AI. Seeking internship opportunities in full-stack development.',
    location: 'Mumbai, India',
    website: 'https://rahulsharma.dev',
    headline: 'Computer Science Student | Full Stack Developer',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    cgpa: '8.7',
    skills: 'JavaScript, React, Node.js, Python, MongoDB',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      applicationUpdates: true,
      interviewReminders: true,
      newOpportunities: true,
      deadlineAlerts: true,
      weeklyDigest: true,
      systemAlerts: true,
    },
    push: {
      urgentAlerts: true,
      interviewReminders: true,
      newMatches: false,
    }
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'connections',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    dataSharing: true,
    searchIndexing: false,
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    theme: 'light',
    language: 'english',
    emailFrequency: 'daily',
    autoSaveResume: true,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      alert('Changes reset to previous values');
    }
  };

  const handleExportData = () => {
    const data = {
      profile: profileData,
      notifications: notificationSettings,
      privacy: privacySettings,
      security: securitySettings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internconnect-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Globe size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title="Settings" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
                  <p className="text-gray-600 mt-1">Manage your profile, security, and preferences</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-gray-100 text-gray-900 border border-gray-300'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}`}>
                          {tab.icon}
                        </div>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                  
                  {/* Additional Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleExportData}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      <Download size={18} />
                      Export Data
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                      <LogOut size={18} />
                      Logout All Devices
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-gray-200">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile Information</h2>
                        <p className="text-gray-600 text-sm">Update your personal and academic details</p>
                      </div>

                      <div className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                            <User size={32} className="text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2">
                              <h3 className="font-medium text-gray-900">Profile Picture</h3>
                              <p className="text-sm text-gray-600">Recommended: Square image, 400x400px</p>
                            </div>
                            <div className="flex gap-3">
                              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm">
                                <Upload size={16} className="inline mr-2" />
                                Upload Photo
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Professional Headline
                            </label>
                            <input
                              type="text"
                              value={profileData.headline}
                              onChange={(e) => setProfileData({...profileData, headline: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              placeholder="Computer Science Student | Full Stack Developer"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Branch
                            </label>
                            <input
                              type="text"
                              value={profileData.branch}
                              onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Academic Year
                            </label>
                            <input
                              type="text"
                              value={profileData.year}
                              onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CGPA
                            </label>
                            <input
                              type="text"
                              value={profileData.cgpa}
                              onChange={(e) => setProfileData({...profileData, cgpa: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={profileData.location}
                              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Skills
                            </label>
                            <input
                              type="text"
                              value={profileData.skills}
                              onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              placeholder="Separate skills with commas"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Website/Portfolio
                            </label>
                            <input
                              type="url"
                              value={profileData.website}
                              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              placeholder="https://yourportfolio.com"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bio / About
                            </label>
                            <textarea
                              rows={3}
                              value={profileData.bio}
                              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                              placeholder="Tell companies about your background, interests, and career goals..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h2>
                        <p className="text-gray-600 text-sm">Manage your password and account security</p>
                      </div>

                      <div className="space-y-6">
                        {/* Change Password */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showCurrentPassword ? "text" : "password"}
                                  value={securitySettings.currentPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                  placeholder="Enter current password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? "text" : "password"}
                                  value={securitySettings.newPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                  placeholder="Enter new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                              <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                <AlertTriangle size={12} />
                                Password must be at least 8 characters with uppercase, lowercase, and numbers
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={securitySettings.confirmPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                  placeholder="Confirm new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={securitySettings.twoFactorAuth}
                                onChange={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                          </div>
                          <div className="text-sm text-gray-600">
                            When enabled, you'll need to enter a verification code from your authenticator app when signing in.
                          </div>
                        </div>

                        {/* Session Management */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Current Session</div>
                                <div className="text-sm text-gray-600">Chrome • Windows • Last active: Just now</div>
                              </div>
                              <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                Active
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Mobile Device</div>
                                <div className="text-sm text-gray-600">Safari • iOS • Last active: 2 days ago</div>
                              </div>
                              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                Revoke
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h2>
                        <p className="text-gray-600 text-sm">Choose when and how you receive notifications</p>
                      </div>

                      <div className="space-y-6">
                        {/* Email Notifications */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <Mail size={20} className="text-gray-600" />
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          </div>
                          <div className="space-y-3">
                            {Object.entries(notificationSettings.email).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Receive email alerts
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => setNotificationSettings({
                                      ...notificationSettings,
                                      email: {...notificationSettings.email, [key]: !value}
                                    })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Push Notifications */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <Bell size={20} className="text-gray-600" />
                            <h3 className="font-medium text-gray-900">Push Notifications</h3>
                          </div>
                          <div className="space-y-3">
                            {Object.entries(notificationSettings.push).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Show push notifications
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => setNotificationSettings({
                                      ...notificationSettings,
                                      push: {...notificationSettings.push, [key]: !value}
                                    })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy Settings</h2>
                        <p className="text-gray-600 text-sm">Control your profile visibility and data sharing</p>
                      </div>

                      <div className="space-y-6">
                        {/* Profile Visibility */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <h3 className="font-medium text-gray-900 mb-4">Profile Visibility</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { value: 'public', label: 'Public', description: 'Visible to all companies and students' },
                              { value: 'connections', label: 'Companies Only', description: 'Visible only to registered companies' },
                              { value: 'private', label: 'Private', description: 'Only visible to you' }
                            ].map(option => (
                              <label
                                key={option.value}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  privacySettings.profileVisibility === option.value
                                    ? 'border-gray-900 bg-gray-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name="profileVisibility"
                                    value={option.value}
                                    checked={privacySettings.profileVisibility === option.value}
                                    onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                                    className="h-4 w-4 text-gray-900"
                                  />
                                  <div className="ml-3">
                                    <p className="font-medium text-gray-900">{option.label}</p>
                                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <h3 className="font-medium text-gray-900 mb-4">Contact Information</h3>
                          <div className="space-y-3">
                            {[
                              { key: 'showEmail', label: 'Show Email Address', description: 'Allow companies to see your email' },
                              { key: 'showPhone', label: 'Show Phone Number', description: 'Allow companies to see your phone number' },
                              { key: 'showLocation', label: 'Show Location', description: 'Show your current location' },
                              { key: 'dataSharing', label: 'Data Sharing for Matching', description: 'Allow us to use your data for better internship matching' },
                              { key: 'searchIndexing', label: 'Search Engine Indexing', description: 'Allow search engines to index your public profile' }
                            ].map(item => (
                              <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900">{item.label}</div>
                                  <div className="text-sm text-gray-600">{item.description}</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={privacySettings[item.key]}
                                    onChange={() => setPrivacySettings({...privacySettings, [item.key]: !privacySettings[item.key]})}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Data Management */}
                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-medium text-gray-900">Download Your Data</p>
                              <p className="text-sm text-gray-600 mt-1">Get a copy of all your data on InternConnect</p>
                            </div>
                            <button
                              onClick={handleExportData}
                              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                            >
                              Download Data
                            </button>
                          </div>
                          <div className="pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">Delete Account</p>
                                <p className="text-sm text-gray-600 mt-1">Permanently delete your account and all data</p>
                              </div>
                              <button className="px-4 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === 'preferences' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Preferences</h2>
                        <p className="text-gray-600 text-sm">Customize your InternConnect experience</p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Theme
                            </label>
                            <select
                              value={preferenceSettings.theme}
                              onChange={(e) => setPreferenceSettings({...preferenceSettings, theme: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                              <option value="system">System</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Language
                            </label>
                            <select
                              value={preferenceSettings.language}
                              onChange={(e) => setPreferenceSettings({...preferenceSettings, language: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            >
                              <option value="english">English</option>
                              <option value="hindi">Hindi</option>
                              <option value="spanish">Spanish</option>
                            </select>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <h3 className="font-medium text-gray-900 mb-4">Application Settings</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">Auto-save Resume</div>
                                <div className="text-sm text-gray-600">Automatically save resume changes</div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferenceSettings.autoSaveResume}
                                  onChange={() => setPreferenceSettings({...preferenceSettings, autoSaveResume: !preferenceSettings.autoSaveResume})}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;