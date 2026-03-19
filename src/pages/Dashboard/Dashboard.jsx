import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'
import { dashboardStats, salesReportData, leadStatuses, leadSources, tasks, tickets } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import Badge from '../../components/UI/Badge'

const COLORS = ['#3b5bdb','#10b981','#f59e0b','#ef4444','#8b5cf6','#64748b','#06b6d4']

export default function Dashboard() {
  const [year, setYear] = useState('2026')
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className="fade-in">
      <PageHeader
        title="Dashboard"
        actions={
          <select value={year} onChange={e => setYear(e.target.value)} className="form-control w-28">
            <option>2025</option>
            <option>2026</option>
          </select>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: 'Invoices Awaiting Payment', value: '0 / 84', icon: '📄', color: 'bg-blue-50 text-blue-700', link: '/sales/invoices' },
          { label: 'Converted Leads', value: '180 / 2720', icon: '🎯', color: 'bg-green-50 text-green-700', link: '/leads' },
          { label: 'Projects In Progress', value: '0 / 0', icon: '📁', color: 'bg-purple-50 text-purple-700', link: '/projects' },
          { label: 'Tasks Not Finished', value: '0 / 0', icon: '✅', color: 'bg-orange-50 text-orange-700', link: '/tasks' },
        ].map((kpi, i) => (
          <Link key={i} to={kpi.link} className="stat-card flex items-start gap-3 no-underline hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg md:text-xl flex-shrink-0 ${kpi.color}`}>{kpi.icon}</div>
            <div className="min-w-0">
              <div className="text-lg md:text-xl font-bold text-gray-800">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{kpi.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Invoice & Estimate Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">📄 Invoice Overview</h3>
          {[
            { label: 'Draft', value: '0', pct: '0.00%', color: 'text-gray-500' },
            { label: 'Not Sent', value: '0', pct: '0.00%', color: 'text-gray-500' },
            { label: 'Unpaid', value: '0', pct: '0.00%', color: 'text-red-500' },
            { label: 'Partially Paid', value: '0', pct: '0.00%', color: 'text-orange-500' },
            { label: 'Overdue', value: '0', pct: '0.00%', color: 'text-red-600' },
            { label: 'Paid', value: '84', pct: '100.00%', color: 'text-green-600' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
              <span className={`text-sm ${item.color}`}>{item.label}</span>
              <span className="text-xs text-gray-400">{item.pct}</span>
            </div>
          ))}
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">📋 Estimate Overview</h3>
          {[
            { label: 'Draft', value: 0, pct: '0%', color: 'text-gray-500' },
            { label: 'Not Sent', value: 0, pct: '0%', color: 'text-gray-500' },
            { label: 'Sent', value: 0, pct: '0%', color: 'text-blue-500' },
            { label: 'Expired', value: 0, pct: '0%', color: 'text-orange-500' },
            { label: 'Declined', value: 0, pct: '0%', color: 'text-red-500' },
            { label: 'Accepted', value: 0, pct: '0%', color: 'text-green-600' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
              <span className={`text-sm ${item.color}`}>{item.label}</span>
              <span className="text-xs text-gray-400">{item.pct}</span>
            </div>
          ))}
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">📊 Proposal Overview</h3>
          {[
            { label: 'Draft', pct: '0%', color: 'text-gray-500' },
            { label: 'Sent', pct: '0%', color: 'text-blue-500' },
            { label: 'Open', pct: '0%', color: 'text-blue-500' },
            { label: 'Revised', pct: '0%', color: 'text-purple-500' },
            { label: 'Declined', pct: '0%', color: 'text-red-500' },
            { label: 'Accepted', pct: '0%', color: 'text-green-600' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
              <span className={`text-sm ${item.color}`}>{item.label}</span>
              <span className="text-xs text-gray-400">{item.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart & Lead Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="lg:col-span-2 stat-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Revenue Overview</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-1.5 rounded bg-blue-500 inline-block"></span>Invoices</span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-3 h-1.5 rounded bg-green-500 inline-block"></span>Payments</span>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="text-center"><div className="text-sm text-gray-400">Outstanding</div><div className="font-bold text-red-500">₹0.00</div></div>
            <div className="text-center"><div className="text-sm text-gray-400">Past Due</div><div className="font-bold text-orange-500">₹0.00</div></div>
            <div className="text-center"><div className="text-sm text-gray-400">Paid</div><div className="font-bold text-green-600">₹0.00</div></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesReportData}>
              <defs>
                <linearGradient id="inv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b5bdb" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b5bdb" stopOpacity={0}/></linearGradient>
                <linearGradient id="pay" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="invoices" stroke="#3b5bdb" fill="url(#inv)" name="Invoices" />
              <Area type="monotone" dataKey="payments" stroke="#10b981" fill="url(#pay)" name="Payments" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">Lead Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={leadStatuses} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label={({ status }) => status}>
                {leadStatuses.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs: Tasks, Projects, Reminders, Tickets, Announcements */}
      <div className="stat-card mb-6">
        <div className="flex items-center gap-1 border-b border-gray-100 mb-4 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[
            { id: 'tasks', label: 'My Tasks' },
            { id: 'projects', label: 'My Projects' },
            { id: 'reminders', label: 'My Reminders' },
            { id: 'tickets', label: 'Tickets' },
            { id: 'announcements', label: 'Announcements' },
            { id: 'activity', label: 'Latest Activity' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            >{tab.label}</button>
          ))}
        </div>
        {activeTab === 'tasks' && (
          <div className="table-container">
            <table className="data-table">
              <thead><tr><th>#</th><th>Name</th><th>Status</th><th>Start Date</th><th>Tags</th><th>Priority</th></tr></thead>
              <tbody>
                {tasks.map((t,i) => (
                  <tr key={t.id}>
                    <td>{i+1}</td>
                    <td className="font-medium text-blue-600">{t.name}</td>
                    <td><Badge status={t.status} /></td>
                    <td>{t.startDate}</td>
                    <td>{t.tags.map(tag => <span key={tag} className="badge badge-info mr-1">{tag}</span>)}</td>
                    <td><Badge status={t.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'tickets' && (
          <div className="table-container">
            <table className="data-table">
              <thead><tr><th>#</th><th>Subject</th><th>Tags</th><th>Department</th><th>Contact</th><th>Status</th><th>Priority</th></tr></thead>
              <tbody>
                {tickets.map((t,i) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td className="font-medium">{t.subject}</td>
                    <td>{t.tags.map(tag => <span key={tag} className="badge badge-gray mr-1">{tag}</span>)}</td>
                    <td>{t.department}</td>
                    <td>{t.contact}</td>
                    <td><Badge status={t.status} /></td>
                    <td><Badge status={t.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {(activeTab === 'projects' || activeTab === 'reminders' || activeTab === 'announcements' || activeTab === 'activity') && (
          <div className="empty-state"><div className="empty-state-title">No entries found</div></div>
        )}
      </div>

      {/* Contracts Expiring & Staff Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-3">Contracts Expiring Soon</h3>
          <p className="text-sm text-gray-400 italic">No contracts expiring in the next 7 days.</p>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Staff Tickets Report</h3>
            <select className="form-control w-36 text-xs">
              <option>This Month</option><option>This Week</option><option>Last Month</option>
            </select>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead><tr><th>Staff Member</th><th>Total</th><th>Open</th><th>Closed</th><th>Replies</th></tr></thead>
              <tbody>
                {['contact 1','contact 2','contact 3','bluverse'].map(s => (
                  <tr key={s}><td>{s}</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}