import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { leadStatuses, leadSources } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

const COLORS = ['#3b5bdb','#10b981','#f59e0b','#ef4444','#8b5cf6','#64748b','#06b6d4']

export default function LeadsReport() {
  const total = leadStatuses.reduce((s, l) => s + l.count, 0)
  return (
    <div className="fade-in">
      <PageHeader title="Leads Report" subtitle="Analyze lead sources, conversion rates and pipeline" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Leads', value: total.toLocaleString(), color: 'text-gray-800' },
          { label: 'Converted', value: '180', color: 'text-green-600' },
          { label: 'Conversion Rate', value: '6.6%', color: 'text-blue-600' },
          { label: 'Pending', value: (total - 180).toLocaleString(), color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={leadStatuses} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" radius={[0,4,4,0]}>
                {leadStatuses.map((entry, i) => <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">Leads by Source</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={leadSources} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={100} label={({ source }) => source}>
                {leadSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}