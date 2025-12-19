// src/student/pages/SettingsPage.jsx - WITH CORRECT THEME COLORS
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Settings as SettingsIcon, Bell, Shield, User, Mail,
  Lock, Globe, Eye, EyeOff, Smartphone, CreditCard,
  Download, Upload, Trash2, Save, X, Check,
  AlertCircle, Moon, Sun, Volume2, Users, HelpCircle,
  LogOut, Database, Cloud, Key, Wifi, Camera
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
    bio: 'Computer Science student passionate about web development and AI.',
    location: 'Mumbai, India',
    website: 'https://rahulsharma.dev',
    headline: 'Computer Science Student | Full Stack Developer'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    interviewReminders: true,
    newOpportunities: true,
    newsletter: true,
    marketingEmails: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordExpiry: 90,
    sessionTimeout: 30
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    dataSharing: true,
    searchEngineIndexing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'account', label: 'Account', icon: <SettingsIcon size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Globe size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon size={18} /> }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePrivacyToggle = (field) => {
    setPrivacySettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
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
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6 shadow-sm">
                  <nav className="space-y-1">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <button
                      onClick={handleExportData}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Download size={18} className="mr-3" />
                      Export Data
                    </button>
                    <button className="w-full flex items-center px-4 py-3 text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors mt-2">
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:w-3/4">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                        <p className="text-gray-600 mt-1">Update your personal details and profile information</p>
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2.5 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors flex items-center"
                      >
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </button>
                    </div>

                    {/* Profile Photo */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Profile Photo
                      </label>
                      <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          RS
                        </div>
                        <div className="space-y-3">
                          <button className="flex items-center px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]">
                            <Camera size={18} className="mr-2" />
                            Upload New Photo
                          </button>
                          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-red-300 hover:text-red-600">
                            <Trash2 size={18} className="mr-2" />
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Headline
                      </label>
                      <input
                        type="text"
                        value={profileData.headline}
                        onChange={(e) => handleInputChange('headline', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        placeholder="e.g., Computer Science Student | Full Stack Developer"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Personal Website/Blog
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio/About
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8">Security Settings</h2>
                    
                    {/* Change Password */}
                    <div className="mb-10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Key size={20} className="mr-2" />
                        Change Password
                      </h3>
                      <div className="space-y-6 max-w-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:bg-white transition-all"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-xl hover:bg-[#4338CA] transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
                          <p className="text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-3">
                            {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              securitySettings.twoFactorAuth ? 'bg-[#059669]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                      {!securitySettings.twoFactorAuth && (
                        <div className="bg-[#D97706]/10 border border-[#D97706]/20 rounded-xl p-4">
                          <div className="flex">
                            <AlertCircle className="text-[#D97706] mr-2" size={20} />
                            <div>
                              <p className="text-sm text-[#D97706]">
                                Two-factor authentication is currently disabled. Enable it for enhanced security.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Session Management */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Session Management</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium text-gray-900">Active Sessions</p>
                            <p className="text-sm text-gray-600">Currently logged in on 2 devices</p>
                          </div>
                          <button className="text-sm text-[#DC2626] hover:text-[#B91C1C]">
                            Logout All Sessions
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mr-3">
                                <Smartphone className="text-[#4F46E5]" size={16} />
                              </div>
                              <div>
                                <p className="font-medium">iPhone 13 Pro</p>
                                <p className="text-xs text-gray-600">Currently active • Mumbai, India</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-[#059669] rounded-full mr-2"></div>
                              <span className="text-sm text-gray-600">Active now</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                <Database className="text-gray-600" size={16} />
                              </div>
                              <div>
                                <p className="font-medium">Windows Chrome</p>
                                <p className="text-xs text-gray-600">Last active: 2 hours ago</p>
                              </div>
                            </div>
                            <button className="text-sm text-[#DC2626] hover:text-[#B91C1C]">
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8">Notification Preferences</h2>
                    
                    <div className="space-y-8">
                      {/* Application Updates */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Updates</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'applicationUpdates', label: 'Application Status Changes', description: 'Get notified when your application status changes' },
                            { id: 'interviewReminders', label: 'Interview Reminders', description: 'Reminders for scheduled interviews' },
                            { id: 'newOpportunities', label: 'New Opportunities', description: 'Get notified about internships matching your profile' }
                          ].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                              <div>
                                <p className="font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                              <button
                                onClick={() => handleNotificationToggle(item.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                  notificationSettings[item.id] ? 'bg-[#4F46E5]' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  notificationSettings[item.id] ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Email Preferences */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preferences</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
                            { id: 'newsletter', label: 'Weekly Newsletter', description: 'Get career tips and industry insights' },
                            { id: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional offers and partnership updates' }
                          ].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                              <div>
                                <p className="font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                              <button
                                onClick={() => handleNotificationToggle(item.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                  notificationSettings[item.id] ? 'bg-[#4F46E5]' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  notificationSettings[item.id] ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Push Notifications */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
                            <p className="text-gray-600">Receive notifications on your device</p>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle('pushNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              notificationSettings.pushNotifications ? 'bg-[#4F46E5]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        {notificationSettings.pushNotifications && (
                          <div className="bg-[#4F46E5]/5 p-4 rounded-xl border border-[#4F46E5]/20">
                            <p className="text-sm text-[#4F46E5]">
                              Push notifications are enabled. You'll receive real-time updates about your applications.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8">Privacy Settings</h2>
                    
                    <div className="space-y-8">
                      {/* Profile Visibility */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { value: 'public', label: 'Public', description: 'Visible to everyone' },
                            { value: 'connections', label: 'Connections Only', description: 'Visible to your connections' },
                            { value: 'private', label: 'Private', description: 'Only visible to you' }
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                                privacySettings.profileVisibility === option.value
                                  ? 'border-[#4F46E5] bg-[#4F46E5]/5'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name="profileVisibility"
                                  value={option.value}
                                  checked={privacySettings.profileVisibility === option.value}
                                  onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                                  className="h-4 w-4 text-[#4F46E5]"
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
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'showEmail', label: 'Show Email Address', description: 'Allow companies to see your email' },
                            { id: 'showPhone', label: 'Show Phone Number', description: 'Allow companies to see your phone number' },
                            { id: 'showLocation', label: 'Show Location', description: 'Show your current location' }
                          ].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                              <div>
                                <p className="font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                              <button
                                onClick={() => handlePrivacyToggle(item.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                  privacySettings[item.id] ? 'bg-[#4F46E5]' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  privacySettings[item.id] ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Data Sharing */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Sharing</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'dataSharing', label: 'Data Sharing for Matching', description: 'Allow us to use your data for better internship matching' },
                            { id: 'searchEngineIndexing', label: 'Search Engine Indexing', description: 'Allow search engines to index your public profile' }
                          ].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                              <div>
                                <p className="font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                              <button
                                onClick={() => handlePrivacyToggle(item.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                  privacySettings[item.id] ? 'bg-[#4F46E5]' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  privacySettings[item.id] ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Data Management */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="font-medium text-gray-900">Download Your Data</p>
                              <p className="text-sm text-gray-600 mt-1">Get a copy of all your data on InternConnect</p>
                            </div>
                            <button
                              onClick={handleExportData}
                              className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors"
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
                              <button className="px-4 py-2 border border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-red-50 transition-colors">
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;