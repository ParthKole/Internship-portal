import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, DollarSign, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const InternshipsPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await api.get('/company/internships');
        if (res.data.success) setInternships(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={40}/></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Internships</h1>
        <Link to="/company/post-internship" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"><Plus size={18} className="mr-2"/> Post New</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">{job.title}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">{job.status}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex items-center"><MapPin size={14} className="mr-2"/> {job.location}</div>
              <div className="flex items-center"><DollarSign size={14} className="mr-2"/> ₹{job.stipend}</div>
            </div>
          </div>
        ))}
        {internships.length === 0 && <p className="text-gray-500">No internships found.</p>}
      </div>
    </div>
  );
};

export default InternshipsPage;