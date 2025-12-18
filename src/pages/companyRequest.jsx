// src/pages/CompanyRequests.jsx
import React, { useMemo, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

import {
  Check,
  X,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

// helper to format date
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

// status badge
const StatusBadge = ({ status }) => {
  const base =
    'px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center';

  if (status === 'pending')
    return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
  if (status === 'approved')
    return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
  return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
};

const initialRequests = [
  {
    id: 'c1',
    name: 'TechNova Pvt Ltd',
    email: 'hr@technova.com',
    location: 'Pune, India',
    industry: 'IT Services',
    date: '2025-12-02',
    website: 'https://technova.example.com',
    about:
      'TechNova builds enterprise solutions and hires enthusiastic interns for frontend and backend roles.',
    status: 'pending'
  },
  {
    id: 'c2',
    name: 'FinEdge Solutions',
    email: 'careers@finedge.com',
    location: 'Mumbai, India',
    industry: 'FinTech',
    date: '2025-11-28',
    website: 'https://finedge.example.com',
    about:
      'FinEdge is a FinTech startup focusing on payments and risk analytics.',
    status: 'pending'
  },
  {
    id: 'c3',
    name: 'GreenFoods Pvt Ltd',
    email: 'hello@greenfoods.com',
    location: 'Bengaluru, India',
    industry: 'FoodTech',
    date: '2025-11-20',
    website: 'https://greenfoods.example.com',
    about:
      'GreenFoods is an agritech startup building sustainable food platforms.',
    status: 'approved'
  }
];

const CompanyRequests = () => {
  const [isCollapsed] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    if (!query) return requests;
    const q = query.toLowerCase();
    return requests.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.industry.toLowerCase().includes(q)
    );
  }, [requests, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FA] overflow-x-hidden">
      {/* ADMIN SIDEBAR */}
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => {}} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* ADMIN HEADER */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="mb-6 flex justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Company Approval Requests
                </h1>
                <p className="text-gray-600 mt-1">
                  Approve or reject companies before they post internships.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search companies..."
                    className="outline-none text-sm w-64"
                  />
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {filtered.length} requests
                  </span>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Location</th>
                    <th className="px-4 py-3 hidden md:table-cell">Industry</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {visible.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {c.name}
                      </td>
                      <td className="px-4 py-4">{c.email}</td>
                      <td className="px-4 py-4 hidden sm:table-cell">{c.location}</td>
                      <td className="px-4 py-4 hidden md:table-cell">{c.industry}</td>
                      <td className="px-4 py-4">{formatDate(c.date)}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        {c.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => updateStatus(c.id, 'approved')}
                              className="p-2 bg-green-600 text-white rounded-lg"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => updateStatus(c.id, 'rejected')}
                              className="p-2 bg-red-500 text-white rounded-lg"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="p-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Page {page} of {pages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="p-2 border rounded-lg disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="p-2 border rounded-lg disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRequests;
