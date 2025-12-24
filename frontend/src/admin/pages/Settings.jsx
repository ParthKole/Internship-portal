// src/admin/pages/Settings.jsx
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
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
  Building,
  Users,
  FileText,
  Database,
  Globe,
  LogOut,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@college.edu',
    phone: '+91 9876543210',
    department: 'Training & Placement',
    designation: 'Head of Placement Cell',
    college: 'Engineering College',
    bio: 'Responsible for managing the placement portal, coordinating with companies, and ensuring successful campus placements.'
  });
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notifications, setNotifications] = useState({
    email: {
      companyApprovals: true,
      studentApplications: true,
      driveReminders: true,
      weeklyReports: true,
      placementUpdates: true,
      systemAlerts: true,
    },
    push: {
      urgentAlerts: true,
      newCompanies: false,
      deadlineAlerts: true,
      applicationUpdates: true,
    }
  });
  
  const [placementSettings, setPlacementSettings] = useState({
    academicYear: '2024-2025',
    placementCycle: 'Annual',
    applicationDeadline: 7,
    maxApplicationsPerStudent: 10,
    minCGPA: 6.0,
    autoApproveCompanies: false,
    allowCompanyEdits: true,
    requireResume: true,
    enableReadinessScore: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    dataRetention: '3 years',
    backupFrequency: 'Weekly',
    enableAuditLog: true,
    maintenanceMode: false,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // Reset logic here
      alert('Changes reset to previous values');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'placement', label: 'Placement Settings', icon: <Building size={18} /> },
    { id: 'system', label: 'System', icon: <SettingsIcon size={18} /> },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and system configuration</p>
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
            
            {/* Danger Zone */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Danger Zone</h3>
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
                  <p className="text-gray-600 text-sm">Update your personal and professional details</p>
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
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
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
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={profile.designation}
                        onChange={(e) => setProfile({...profile, designation: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        value={profile.department}
                        onChange={(e) => setProfile({...profile, department: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio / Description
                      </label>
                      <textarea
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        placeholder="Brief description about your role and responsibilities..."
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
                            type={showPassword ? "text" : "password"}
                            value={security.currentPassword}
                            onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
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
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={security.newPassword}
                            onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            placeholder="Enter new password"
                          />
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
                            type={showPassword ? "text" : "password"}
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
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
                        <input type="checkbox" className="sr-only peer" defaultChecked={systemSettings.twoFactorAuth} />
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
                      {Object.entries(notifications.email).map(([key, value]) => (
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
                              onChange={() => setNotifications({
                                ...notifications,
                                email: {...notifications.email, [key]: !value}
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
                      {Object.entries(notifications.push).map(([key, value]) => (
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
                              onChange={() => setNotifications({
                                ...notifications,
                                push: {...notifications.push, [key]: !value}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification Schedule */}
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-4">Notification Schedule</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">Receive notifications between</div>
                        <div className="flex items-center gap-2">
                          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>9:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                          </select>
                          <span className="text-gray-500">to</span>
                          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>6:00 PM</option>
                            <option>7:00 PM</option>
                            <option>8:00 PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Notifications will be delivered only during working hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placement Settings Tab */}
            {activeTab === 'placement' && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Placement Settings</h2>
                  <p className="text-gray-600 text-sm">Configure placement process and rules</p>
                </div>

                <div className="space-y-6">
                  {/* Basic Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year *
                      </label>
                      <select
                        value={placementSettings.academicYear}
                        onChange={(e) => setPlacementSettings({...placementSettings, academicYear: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      >
                        <option>2024-2025</option>
                        <option>2023-2024</option>
                        <option>2022-2023</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Placement Cycle
                      </label>
                      <select
                        value={placementSettings.placementCycle}
                        onChange={(e) => setPlacementSettings({...placementSettings, placementCycle: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      >
                        <option>Annual</option>
                        <option>Semester</option>
                        <option>Quarterly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Application Deadline (days)
                      </label>
                      <input
                        type="number"
                        value={placementSettings.applicationDeadline}
                        onChange={(e) => setPlacementSettings({...placementSettings, applicationDeadline: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Applications per Student
                      </label>
                      <input
                        type="number"
                        value={placementSettings.maxApplicationsPerStudent}
                        onChange={(e) => setPlacementSettings({...placementSettings, maxApplicationsPerStudent: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum CGPA Required
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={placementSettings.minCGPA}
                        onChange={(e) => setPlacementSettings({...placementSettings, minCGPA: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-4">Feature Settings</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'autoApproveCompanies', label: 'Auto-approve Companies', description: 'Automatically approve verified companies without manual review' },
                        { key: 'allowCompanyEdits', label: 'Allow Company Edits', description: 'Allow companies to edit their posted opportunities' },
                        { key: 'requireResume', label: 'Require Resume', description: 'Students must upload resume before applying' },
                        { key: 'enableReadinessScore', label: 'Enable Readiness Score', description: 'Calculate and display student readiness scores' },
                      ].map((feature) => (
                        <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{feature.label}</div>
                            <div className="text-sm text-gray-600">{feature.description}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={placementSettings[feature.key]}
                              onChange={() => setPlacementSettings({...placementSettings, [feature.key]: !placementSettings[feature.key]})}
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

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h2>
                  <p className="text-gray-600 text-sm">Configure platform behavior and data management</p>
                </div>

                <div className="space-y-6">
                  {/* Data Management */}
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Database size={20} className="text-gray-600" />
                      <h3 className="font-medium text-gray-900">Data Management</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Retention Period
                        </label>
                        <select
                          value={systemSettings.dataRetention}
                          onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        >
                          <option>1 year</option>
                          <option>2 years</option>
                          <option>3 years</option>
                          <option>5 years</option>
                          <option>Permanent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        >
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* System Features */}
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-4">System Features</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'enableAuditLog', label: 'Enable Audit Log', description: 'Log all administrative actions for security review' },
                        { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Take system offline for maintenance' },
                        { key: 'twoFactorAuth', label: 'Require 2FA for Admin', description: 'Enforce two-factor authentication for all admin accounts' },
                      ].map((feature) => (
                        <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{feature.label}</div>
                            <div className="text-sm text-gray-600">{feature.description}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={systemSettings[feature.key]}
                              onChange={() => setSystemSettings({...systemSettings, [feature.key]: !systemSettings[feature.key]})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Information */}
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-4">System Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Platform Version</span>
                        <span className="font-medium text-gray-900">v2.4.1</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Last Backup</span>
                        <span className="font-medium text-gray-900">2024-01-15 02:00 AM</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Storage Usage</span>
                        <span className="font-medium text-gray-900">4.2 GB / 50 GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;