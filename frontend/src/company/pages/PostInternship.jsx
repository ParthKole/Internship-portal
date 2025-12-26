import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Send, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const PostInternship = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', type: 'Remote', location: '', 
    duration: '3 months', stipend: '', deadline: '', skills: []
  });
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/company/internships', formData);
      navigate('/company/internships');
    } catch (err) {
      alert('Error posting internship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Post New Internship</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-6 max-w-3xl">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="w-full p-3 border rounded-lg" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} className="w-full p-3 border rounded-lg" required />
        
        <div className="grid grid-cols-2 gap-4">
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-3 border rounded-lg" required />
          <input name="stipend" value={formData.stipend} onChange={handleChange} placeholder="Stipend Amount" className="p-3 border rounded-lg" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <select name="type" value={formData.type} onChange={handleChange} className="p-3 border rounded-lg">
            <option>Remote</option><option>On-site</option><option>Hybrid</option>
          </select>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="p-3 border rounded-lg" required />
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add Skill" className="flex-1 p-2 border rounded" />
            <button type="button" onClick={handleAddSkill} className="px-4 bg-gray-200 rounded">Add</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.skills.map((s, i) => <span key={i} className="bg-blue-100 px-2 py-1 rounded text-sm">{s}</span>)}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center">
          {loading ? <Loader2 className="animate-spin" /> : <><Send className="mr-2" size={18}/> Publish</>}
        </button>
      </form>
    </div>
  );
};

export default PostInternship;