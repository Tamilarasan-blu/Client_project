import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { salesReportData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

export default function ExpensesVsIncome() {
  const data = salesReportData.map(d => ({ ...d, profit: d.payments - d.expenses }))
  return (
    <div className="fade-in">
      <PageHeader title="Expenses vs Income" subtitle="Compare your revenue against expenses over time" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Income', value: '₹3,24,000', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Expenses', value: '₹94,000', color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Net Profit', value: '₹2,30,000', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(s => (
          <div key={s.label} className={`stat-card text-center p-5 ${s.bg}`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stat-card">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="invoices" fill="#3b5bdb" name="Income" radius={[4,4,0,0]} />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4,4,0,0]} />
            <Bar dataKey="profit" fill="#10b981" name="Profit" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}