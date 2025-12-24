// src/company/components/CompanyLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';

const CompanyLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <CompanySidebar
        isCollapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <CompanyHeader />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;