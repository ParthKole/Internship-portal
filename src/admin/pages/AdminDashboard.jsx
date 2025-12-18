import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import {
  Users,
  Building,
  Briefcase,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Calendar,
  Clock,
  BarChart3,
  Target
} from "lucide-react"

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = [
    { label: "Total Students", value: "1240", icon: Users, bg: "bg-blue-100", color: "text-blue-600" },
    { label: "Companies", value: "86", icon: Building, bg: "bg-purple-100", color: "text-purple-600" },
    { label: "Active Internships", value: "47", icon: Briefcase, bg: "bg-emerald-100", color: "text-emerald-600" },
    { label: "Pending Requests", value: "12", icon: AlertCircle, bg: "bg-amber-100", color: "text-amber-600" },
  ]

  const pendingCompanies = [
    { name: "TechNova Pvt Ltd", industry: "IT Services", date: "Oct 24" },
    { name: "InnoCore Labs", industry: "Startup", date: "Oct 23" },
    { name: "FinEdge Solutions", industry: "FinTech", date: "Oct 22" },
    { name: "CloudSync Systems", industry: "Cloud", date: "Oct 21" },
  ]

  const placementAnalytics = [
    { label: "Highest Package", value: "₹12.5 LPA", color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Average Package", value: "₹6.2 LPA", color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Students Placed", value: "68%", color: "text-purple-700", bg: "bg-purple-50" },
    { label: "Active Drives", value: "42", color: "text-amber-700", bg: "bg-amber-50" },
  ]

  const upcomingDrives = [
    { company: "Google", date: "Oct 28", type: "Internship" },
    { company: "Amazon", date: "Oct 30", type: "FTE" },
    { company: "Deloitte", date: "Nov 02", type: "Internship" },
  ]

  const topRecruiters = [
    { company: "Microsoft", hired: 28, avg: "₹9.5 LPA" },
    { company: "Amazon", hired: 24, avg: "₹8.8 LPA" },
    { company: "Barclays", hired: 18, avg: "₹7.9 LPA" },
  ]

  const placementTargets = [
    { goal: "Students Placed", completed: 680, total: 1000 },
    { goal: "Company Onboarding", completed: 72, total: 100 },
    { goal: "Internship Conversion", completed: 40, total: 60 },
  ]

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">

            {/* HERO CARD */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Training & Placement Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Central overview of placements, companies and internships
              </p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon size={24} className={stat.color} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">

                {/* Pending Companies */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-6 border-b border-gray-100 flex justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Pending Company Requests</h2>
                      <p className="text-gray-600 text-sm">Awaiting approval</p>
                    </div>
                    <button className="text-[#4F46E5] text-sm font-medium flex items-center">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="divide-y">
                    {pendingCompanies.map((c, i) => (
                      <div key={i} className="p-4 flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{c.name}</h3>
                          <p className="text-sm text-gray-600">{c.industry}</p>
                        </div>
                        <span className="text-sm text-gray-500">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placement Analytics */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                    <BarChart3 size={22} className="text-blue-600" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Placement Analytics</h2>
                      <p className="text-gray-600 text-sm">Current placement performance</p>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-2 gap-4">
                    {placementAnalytics.map((item, i) => (
                      <div key={i} className={`${item.bg} p-4 rounded-xl`}>
                        <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                        <div className="text-sm text-gray-600">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">

                {/* Upcoming Drives */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Drives</h2>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {upcomingDrives.length} drives
                    </span>
                  </div>

                  <div className="space-y-4">
                    {upcomingDrives.map((d, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Calendar size={18} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{d.company}</h3>
                          <p className="text-sm text-gray-600">{d.type}</p>
                        </div>
                        <span className="text-xs text-gray-500">{d.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Recruiters */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Top Recruiters</h2>
                  <div className="space-y-4">
                    {topRecruiters.map((r, i) => (
                      <div key={i} className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{r.company}</h3>
                          <p className="text-sm text-gray-600">{r.hired} students hired</p>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{r.avg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placement Targets */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Placement Targets</h2>
                  <div className="space-y-5">
                    {placementTargets.map((t, i) => {
                      const progress = Math.round((t.completed / t.total) * 100)
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t.goal}</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard