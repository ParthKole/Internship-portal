import React, { useMemo, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import {
  Search,
  Eye,
  Ban,
  CheckCircle,
  Trash2
} from 'lucide-react';

// Status badge
const StatusBadge = ({ status }) => {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold';
  if (status === 'active')
    return <span className={`${base} bg-green-100 text-green-800`}>Active</span>;
  return <span className={`${base} bg-red-100 text-red-800`}>Disabled</span>;
};

// Dummy approved companies
const initialCompanies = [
  {
    id: 'cmp1',
    name: 'TechNova Pvt Ltd',
    email: 'hr@technova.com',
    location: 'Pune, India',
    industry: 'IT Services',
    website: 'https://technova.example.com',
    status: 'active'
  },
  {
    id: 'cmp2',
    name: 'GreenFoods Pvt Ltd',
    email: 'hello@greenfoods.com',
    location: 'Bengaluru, India',
    industry: 'FoodTech',
    website: 'https://greenfoods.example.com',
    status: 'active'
  },
  {
    id: 'cmp3',
    name: 'FinEdge Solutions',
    email: 'careers@finedge.com',
    location: 'Mumbai, India',
    industry: 'FinTech',
    website: 'https://finedge.example.com',
    status: 'disabled'
  }
];

const ManageCompanies = () => {
  const [isCollapsed] = useState(false);
  const [companies, setCompanies] = useState(initialCompanies);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return companies;
    const q = query.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
  }, [companies, query]);

  const toggleStatus = (id) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' }
          : c
      )
    );
  };

  const deleteCompany = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FA] overflow-x-hidden">
      {/* Admin Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => {}} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Companies
                </h1>
                <p className="text-gray-600 mt-1">
                  View, enable, disable or remove approved companies.
                </p>
              </div>

              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search companies..."
                  className="outline-none text-sm w-64"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Industry</th>
                    <th className="px-4 py-3 hidden md:table-cell">Location</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {c.name}
                      </td>
                      <td className="px-4 py-4">{c.email}</td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {c.industry}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        {c.location}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={c.status} />
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 border rounded-lg text-[#4F46E5] hover:bg-[#EEF2FF]">
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => toggleStatus(c.id)}
                            className={`p-2 rounded-lg text-white ${
                              c.status === 'active'
                                ? 'bg-red-500'
                                : 'bg-green-600'
                            }`}
                          >
                            {c.status === 'active' ? (
                              <Ban size={14} />
                            ) : (
                              <CheckCircle size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => deleteCompany(c.id)}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-gray-500"
                      >
                        No companies found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
