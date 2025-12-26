import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Users, FileCheck, TrendingUp, Calendar, 
  MapPin, ChevronRight, Award, Eye, Loader2, Check, X 
} from 'lucide-react';
import api from '../../utils/api';

const CompanyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/company/dashboard-stats');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // New function to handle Approve/Reject
  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      // Optimistic UI Update (Update screen before API responds for speed)
      setData(prev => ({
        ...prev,
        recentApplications: prev.recentApplications.map(app => 
          app.id === appId ? { ...app, status: newStatus } : app
        )
      }));

      // Call API
      const res = await api.patch(`/company/applications/${appId}/status`, { status: newStatus });
      
      if (res.data.success) {
        // Refresh data to ensure consistency
        await fetchData();
      }
    } catch (err) {
      console.error("Failed to update status", err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Failed to update application status';
      alert(errorMsg);
      // Revert on error
      await fetchData();
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!data) return <div className="p-6">Failed to load data</div>;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {data.contactPerson}!</h1>
        <p className="text-blue-100">You have {data.stats.totalApplications} total applications pending review.</p>
        <Link to="/company/post-internship" className="mt-4 inline-flex items-center px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
          + Post New Internship
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Active Internships</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{data.stats.activeInternships}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Total Applications</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{data.stats.totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Shortlisted</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{data.stats.shortlisted}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Pending Review</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {data.recentApplications.filter(a => a.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Recent Applications</h2>
        <div className="divide-y divide-gray-100">
          {data.recentApplications.map(app => (
            <div key={app.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 rounded-lg px-2 transition-colors">
              
              {/* Candidate Info */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {app.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.role}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex-1 md:text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {app.status === 'pending' ? (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'accepted')}
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:scale-105 transition-all"
                      title="Accept Candidate"
                    >
                      <Check size={20} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'rejected')}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:scale-105 transition-all"
                      title="Reject Candidate"
                    >
                      <X size={20} strokeWidth={2.5} />
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-400 italic px-2">
                    {app.status === 'accepted' ? 'Approved' : 'Rejected'}
                  </span>
                )}
                
                <Link to={`/company/application/${app.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
          
          {data.recentApplications.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applications found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;