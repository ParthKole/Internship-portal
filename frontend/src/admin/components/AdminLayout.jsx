// Option 2: Sticky sidebar version (AdminLayout.jsx)
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      {/* Sidebar - Sticky but not fixed */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sticky top-0 h-screen transition-all duration-300`}>
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;