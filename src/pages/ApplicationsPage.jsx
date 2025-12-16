import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Briefcase, Filter, Search, Download } from 'lucide-react';

const ApplicationsPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar isCollapsed={false} toggleSidebar={() => {}} />
      
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        
        <div className="p-6 flex-1">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
              <p className="text-gray-600">View and manage all your internship applications</p>
            </div>
            
            {/* Coming Soon Message */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-[#4F46E5]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Applications Management</h2>
              <p className="text-gray-600 mb-4">
                This page is currently under development. You can view your active applications on the dashboard.
              </p>
              <div className="flex justify-center gap-3">
                <Link 
                  to="/"
                  className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA]"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;