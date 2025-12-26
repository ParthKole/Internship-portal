import React, { useState, useEffect } from 'react';
import { Edit, Save, MapPin, Mail, Phone, Globe, Loader2, Building, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

const CompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    headquarters: '',
    website: '',
    phone: '',
    userId: { email: '' }
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/company/profile');
        if (res.data.success) {
          setFormData(res.data.data);
        } else {
          // Profile doesn't exist in DB, start in edit mode to create it
          setIsEditing(true);
          setError('Please complete your company profile.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await api.put('/company/profile', formData);
      setIsEditing(false);
      setError('');
      alert('Profile saved successfully!');
    } catch (err) {
      alert('Failed to update');
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600" size={40}/></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className={`px-4 py-2 rounded-lg flex items-center ${isEditing ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}>
          {isEditing ? <><Save size={18} className="mr-2"/> Save Profile</> : <><Edit size={18} className="mr-2"/> Edit Profile</>}
        </button>
      </div>

      {error && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg flex items-center">
          <AlertCircle size={20} className="mr-2"/> {error}
        </div>
      )}

      <div className="bg-white rounded-xl border p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center"><Building size={32}/></div>
          <div className="flex-1">
            {isEditing ? (
              <input name="companyName" value={formData.companyName || ''} onChange={handleChange} placeholder="Company Name" className="text-2xl font-bold border rounded p-2 w-full mb-2"/>
            ) : (
              <h2 className="text-2xl font-bold">{formData.companyName || 'Company Name'}</h2>
            )}
            
            {isEditing ? (
              <input name="industry" value={formData.industry || ''} onChange={handleChange} placeholder="Industry" className="border rounded p-2 w-full"/>
            ) : (
              <p className="text-gray-600">{formData.industry || 'Industry'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="text-sm text-gray-500">Email</label><div className="flex items-center gap-2 py-2"><Mail size={16}/> {formData.userId?.email || 'N/A'}</div></div>
          
          <div>
            <label className="text-sm text-gray-500">Location</label>
            {isEditing ? <input name="headquarters" value={formData.headquarters || ''} onChange={handleChange} className="border rounded w-full p-2 mt-1"/> : <div className="flex items-center gap-2 py-2"><MapPin size={16}/> {formData.headquarters || 'Not set'}</div>}
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Website</label>
            {isEditing ? <input name="website" value={formData.website || ''} onChange={handleChange} className="border rounded w-full p-2 mt-1"/> : <div className="flex items-center gap-2 py-2"><Globe size={16}/> {formData.website || 'Not set'}</div>}
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            {isEditing ? <input name="phone" value={formData.phone || ''} onChange={handleChange} className="border rounded w-full p-2 mt-1"/> : <div className="flex items-center gap-2 py-2"><Phone size={16}/> {formData.phone || 'Not set'}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;