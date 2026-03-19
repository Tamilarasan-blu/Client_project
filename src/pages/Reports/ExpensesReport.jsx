import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import PageHeader from '../../components/UI/PageHeader'
import { expenses } from '../../data/mockData'

const COLORS = ['#3b5bdb','#10b981','#f59e0b','#ef4444','#8b5cf6']
const byCategory = expenses.reduce((acc, e) => {
  acc[e.category] = (acc[e.category] || 0) + e.amount
  return acc
}, {})
const categoryData = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

export default function ExpensesReport() {
  return (
    <div className="fade-in">
      <PageHeader title="Expenses Report" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => name + ' ' + (percent * 100).toFixed(0) + '%'}>
              {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-gray-700 mb-4">Filter & Generate Report</h3>
          <div className="space-y-4">
            <div className="form-group"><label className="form-label">Date From</label><input type="date" className="form-control" /></div>
            <div className="form-group"><label className="form-label">Date To</label><input type="date" className="form-control" /></div>
            <div className="form-group"><label className="form-label">Category</label><select className="form-control"><option>All Categories</option>{Object.keys(byCategory).map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Customer</label><select className="form-control"><option>All Customers</option></select></div>
            <button className="btn-primary w-full">Generate Report</button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Category</th><th>Name</th><th>Amount</th><th>Date</th><th>Customer</th><th>Billable</th></tr></thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.category}</td>
                <td className="font-medium">{e.name}</td>
                <td className="font-semibold">₹{e.amount.toLocaleString()}</td>
                <td>{e.date}</td>
                <td>{e.customer}</td>
                <td><span className={`badge ${e.billable ? 'badge-success' : 'badge-gray'}`}>{e.billable ? 'Yes' : 'No'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}