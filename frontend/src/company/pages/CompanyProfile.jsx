// src/company/pages/CompanyProfile.jsx
import React, { useState } from "react";
import { Edit, Upload, Globe, MapPin, Phone, Mail, Users, Calendar, Award, CheckCircle } from 'lucide-react';

const CompanyProfile = () => {
  const companyData = JSON.parse(localStorage.getItem('companyProfile') || '{}');
  
  const [companyInfo, setCompanyInfo] = useState({
    name: companyData.companyName || "ABC Technologies",
    email: companyData.email || "abc@gmail.com",
    location: companyData.headquarters || "Pune, Maharashtra",
    industry: companyData.industry || "IT Services & Software Development",
    description: companyData.about || "We provide innovative software solutions and IT services to businesses worldwide.",
    founded: companyData.foundedYear || "2018",
    employees: companyData.employeeCount || "50-100",
    website: companyData.website || "www.abctech.com",
    phone: companyData.phone || "+91 9876543210",
    contactPerson: companyData.contactPerson || "John Doe",
    designation: companyData.designation || "HR Manager",
    workCulture: companyData.workCulture || "Innovative, Collaborative, Growth-oriented",
    techStack: companyData.techStack || ["React", "Node.js", "Python", "AWS"]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...companyInfo });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedCompany = { ...companyData, ...editForm };
    localStorage.setItem('companyProfile', JSON.stringify(updatedCompany));
    setCompanyInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...companyInfo });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and settings</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {companyInfo.name.substring(0, 3).toUpperCase()}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h2>
              )}
              <p className="text-gray-600">{companyInfo.industry}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium flex items-center">
                  <Award size={12} className="mr-1" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Mail size={14} className="mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <p className="text-gray-900">{companyInfo.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <MapPin size={14} className="mr-2" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <p className="text-gray-900">{companyInfo.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Calendar size={14} className="mr-2" />
                Founded Year
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="founded"
                  value={editForm.founded}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <p className="text-gray-900">{companyInfo.founded}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Globe size={14} className="mr-2" />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={editForm.website}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <a href={`https://${companyInfo.website}`} className="text-gray-900 hover:underline">
                  {companyInfo.website}
                </a>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Phone size={14} className="mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <p className="text-gray-900">{companyInfo.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Users size={14} className="mr-2" />
                Company Size
              </label>
              {isEditing ? (
                <select
                  name="employees"
                  value={editForm.employees}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              ) : (
                <p className="text-gray-900">{companyInfo.employees} employees</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Contact Person
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="contactPerson"
                  value={editForm.contactPerson}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <p className="text-gray-900">{companyInfo.contactPerson}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Profile Completion
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-900 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-500 mb-3">Technology Stack</label>
          <div className="flex flex-wrap gap-2">
            {companyInfo.techStack.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Company Description */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-500 mb-3">Company Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{companyInfo.description}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium">
          Update Information
        </button>
        <button className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
          <Upload size={18} className="mr-2" />
          Change Logo
        </button>
        <button className="px-6 py-3 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;