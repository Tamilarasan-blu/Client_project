import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { customers, invoices, contacts, tasks } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import Badge from '../../components/UI/Badge'

export default function CustomerDetail() {
  const { id } = useParams()
  const customer = customers.find(c => c.id === +id) || customers[0]
  const [tab, setTab] = useState('overview')

  return (
    <div className="fade-in">
      <PageHeader
        title={customer.company}
        breadcrumb={[{ label: 'Customers', href: '/customers' }, { label: customer.company }]}
        actions={
          <>
            <button className="btn-secondary">Edit</button>
            <button className="btn-secondary">+ New Invoice</button>
            <button className="btn-secondary">+ New Project</button>
          </>
        }
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'contacts', label: 'Contacts' },
          { id: 'invoices', label: 'Invoices' },
          { id: 'projects', label: 'Projects' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'activity', label: 'Activity' },
        ]}
        activeTab={tab}
        onTabChange={setTab}
      />
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="stat-card">
              <h3 className="font-semibold text-gray-700 mb-4">Customer Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Company', value: customer.company },
                  { label: 'Primary Contact', value: customer.contact },
                  { label: 'Email', value: customer.email },
                  { label: 'Phone', value: customer.phone },
                  { label: 'Country', value: customer.country },
                  { label: 'City', value: customer.city },
                  { label: 'Group', value: customer.group },
                  { label: 'Status', value: customer.active ? 'Active' : 'Inactive' },
                  { label: 'Date Created', value: customer.created },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                    <div className="text-sm text-gray-700 mt-0.5">{item.value || '-'}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="font-semibold text-gray-700 mb-3">Address</h3>
              <p className="text-sm text-gray-600">{customer.address || 'No address on file'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="font-semibold text-gray-700 mb-3">Financial Summary</h3>
              {[
                { label: 'Total Invoiced', value: '₹18,800.64', color: 'text-gray-800' },
                { label: 'Total Paid', value: '₹18,800.64', color: 'text-green-600' },
                { label: 'Outstanding', value: '₹0.00', color: 'text-red-500' },
                { label: 'Total Expenses', value: '₹0.00', color: 'text-orange-500' },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="stat-card">
              <h3 className="font-semibold text-gray-700 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {['+ New Invoice', '+ New Proposal', '+ New Estimate', '+ New Contract', '+ New Task', '+ New Ticket'].map(action => (
                  <button key={action} className="w-full btn-secondary text-left text-sm justify-start">{action}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'invoices' && (
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Invoice #</th><th>Amount</th><th>Date</th><th>Due Date</th><th>Status</th></tr></thead>
            <tbody>
              {invoices.filter(inv => inv.customer.toLowerCase().includes(customer.company.toLowerCase().slice(0, 6))).map(inv => (
                <tr key={inv.id}>
                  <td className="font-medium text-blue-600">{inv.number}</td>
                  <td>₹{inv.amount.toLocaleString()}</td>
                  <td>{inv.date}</td>
                  <td>{inv.dueDate}</td>
                  <td><Badge status={inv.status} /></td>
                </tr>
              ))}
              {invoices.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-400">No invoices found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}