import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { salesReportData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

export default function SalesReport() {
  const [expandedSections, setExpandedSections] = useState({})
  const toggle = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  const reportSections = [
    { key: 'invoices', label: 'Invoices Report', desc: 'View all invoices filtered by date, customer and status' },
    { key: 'items', label: 'Items Report', desc: 'Summary of items billed to customers' },
    { key: 'payments', label: 'Payments Received', desc: 'Track all payments received' },
    { key: 'creditNotes', label: 'Credit Notes Report', desc: 'View all credit notes issued' },
    { key: 'proposals', label: 'Proposals Report', desc: 'Proposal conversion and status report' },
    { key: 'estimates', label: 'Estimates Report', desc: 'Estimates by status and customer' },
    { key: 'customers', label: 'Customers Report', desc: 'Customer activity and billing summary' },
  ]
  const chartSections = [
    { key: 'totalIncome', label: 'Total Income', desc: 'Income over time (chart)' },
    { key: 'paymentModes', label: 'Payment Modes (Transactions)', desc: 'Breakdown by payment method' },
    { key: 'customerGroups', label: 'Total Value By Customer Groups', desc: 'Revenue by customer segment' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Sales Reports" subtitle="Comprehensive sales analytics and reporting" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="stat-card">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesReportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="invoices" fill="#3b5bdb" name="Invoices" radius={[4,4,0,0]} />
              <Bar dataKey="payments" fill="#10b981" name="Payments" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 text-center mt-2">Monthly Invoice vs Payment Comparison</p>
        </div>
        <div className="stat-card">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Invoiced (2026)', value: '₹2,86,000', color: 'text-blue-600' },
              { label: 'Total Collected', value: '₹2,65,000', color: 'text-green-600' },
              { label: 'Outstanding', value: '₹21,000', color: 'text-red-500' },
              { label: 'Average Invoice', value: '₹3,404', color: 'text-purple-600' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">📄 Sales Report</h3>
          <div className="space-y-2">
            {reportSections.map(s => (
              <div key={s.key}>
                <button onClick={() => toggle(s.key)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <span className={`text-gray-400 text-xs transition-transform ${expandedSections[s.key] ? 'rotate-90' : ''}`}>▶</span>
                  <div>
                    <div className="font-medium text-gray-700">{s.label}</div>
                    {expandedSections[s.key] && <div className="text-xs text-gray-400 mt-1">{s.desc}</div>}
                  </div>
                </button>
                {expandedSections[s.key] && (
                  <div className="ml-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex gap-4 mb-3 flex-wrap">
                      <input type="date" className="form-control w-36" placeholder="From" />
                      <input type="date" className="form-control w-36" placeholder="To" />
                      <select className="form-control w-40"><option>All Customers</option></select>
                      <button className="btn-primary">Generate</button>
                    </div>
                    <div className="table-container">
                      <table className="data-table"><thead><tr><th>Period</th><th>Count</th><th>Amount</th></tr></thead>
                      <tbody><tr><td colSpan={3} className="text-center py-4 text-gray-400">No data for selected period</td></tr></tbody></table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">📊 Charts Based Report</h3>
          <div className="space-y-2">
            {chartSections.map(s => (
              <div key={s.key}>
                <button onClick={() => toggle(s.key)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <span className={`text-gray-400 text-xs transition-transform ${expandedSections[s.key] ? 'rotate-90' : ''}`}>▶</span>
                  <div className="font-medium text-gray-700">{s.label}</div>
                </button>
                {expandedSections[s.key] && (
                  <div className="ml-8 p-4 bg-gray-50 rounded-lg">
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={salesReportData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="payments" stroke="#3b5bdb" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}