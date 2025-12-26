import React, { useState, useEffect } from 'react';
import { Mail, GraduationCap, Loader2, CheckCircle, XCircle, Check, X } from 'lucide-react';
import api from '../../utils/api';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await api.get('/company/applications');
      if (res.data.success) setApplications(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    setUpdating(appId);
    try {
      // Optimistic UI Update
      setApplications(prev => prev.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));

      // Call API
      const res = await api.patch(`/company/applications/${appId}/status`, { status: newStatus });
      
      if (res.data.success) {
        // Refresh to get latest data
        await fetchApps();
      }
    } catch (err) {
      console.error("Failed to update status", err);
      const errorMsg = err.response?.data?.message || 'Failed to update application status';
      alert(errorMsg);
      // Revert on error
      await fetchApps();
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={40}/></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications ({applications.length})</h1>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="divide-y">
          {applications.map((app) => (
            <div key={app._id} className="p-6 flex justify-between items-start hover:bg-gray-50">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                  {app.studentId?.name?.charAt(0) || 'S'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{app.studentId?.name || 'Unknown Student'}</h3>
                  <p className="text-sm text-blue-600 font-medium">{app.internshipId?.title}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center"><Mail size={14} className="mr-1"/> {app.studentId?.email}</span>
                    <span className="flex items-center"><GraduationCap size={14} className="mr-1"/> Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status}
                </span>
                {app.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(app._id, 'accepted')}
                      disabled={updating === app._id}
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:scale-105 transition-all disabled:opacity-50"
                      title="Accept Candidate"
                    >
                      <Check size={20} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      disabled={updating === app._id}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:scale-105 transition-all disabled:opacity-50"
                      title="Reject Candidate"
                    >
                      <X size={20} strokeWidth={2.5} />
                    </button>
                  </>
                )}
                {updating === app._id && (
                  <Loader2 className="animate-spin text-blue-600" size={16} />
                )}
              </div>
            </div>
          ))}
          {applications.length === 0 && <div className="p-12 text-center text-gray-500">No applications received yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;