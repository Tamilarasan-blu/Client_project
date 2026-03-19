import React, { useState } from 'react'
import { invoices as invoicesData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Invoices() {
  const [showModal, setShowModal] = useState(false)
  const [year, setYear] = useState('2026')

  const stats = [
    { label: 'Unpaid', count: 1, total: 6, color: 'text-red-500' },
    { label: 'Paid', count: 84, total: 84, color: 'text-green-600' },
    { label: 'Partially Paid', count: 1, total: 6, color: 'text-orange-500' },
    { label: 'Overdue', count: 1, total: 6, color: 'text-red-600' },
    { label: 'Draft', count: 1, total: 6, color: 'text-gray-500' },
  ]

  const columns = [
    { key: 'number', label: 'Invoice #', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'amount', label: 'Amount', render: v => '₹' + v.toLocaleString() },
    { key: 'tax', label: 'Total Tax', render: v => '₹' + v.toLocaleString() },
    { key: 'date', label: 'Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'project', label: 'Project', render: v => v || '-' },
    { key: 'tags', label: 'Tags', render: v => v.length ? v.map(t => <span key={t} className="badge badge-info mr-1">{t}</span>) : '-' },
    { key: 'status', label: 'Status', badge: true },
  ]

  return (
    <div className="fade-in">
      <PageHeader
        title="Invoices"
        subtitle={<a href="/sales/recurring-invoices" className="text-blue-600 hover:underline text-sm">Recurring Invoices →</a>}
        actions={
          <>
            <select value={year} onChange={e => setYear(e.target.value)} className="form-control w-24">
              <option>2025</option><option>2026</option>
            </select>
            <button onClick={() => setShowModal(true)} className="btn-primary">+ Create New Invoice</button>
            <button className="btn-secondary">+ Batch Payments</button>
            <button className="btn-secondary">📤</button>
            <button className="btn-secondary">▼ Filters</button>
          </>
        }
      />
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="stat-card px-4 py-2 text-sm"><span className="text-green-600 font-semibold">Paid Invoices</span> ₹0.00</div>
        <div className="stat-card px-4 py-2 text-sm"><span className="text-red-500 font-semibold">Past Due Invoices</span> ₹0.00</div>
        <div className="stat-card px-4 py-2 text-sm"><span className="text-orange-500 font-semibold">Outstanding Invoices</span> ₹0.00</div>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.count} / {s.total}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={invoicesData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Invoice" size="lg"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save Invoice</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Customer','Date','Due Date','Project','Currency','Discount Type','Discount Amount','Recurring'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-3">Line Items</h4>
          <div className="table-container">
            <table className="data-table">
              <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Tax</th><th>Amount</th><th></th></tr></thead>
              <tbody>
                <tr>
                  <td><input className="form-control" placeholder="Item description" /></td>
                  <td><input className="form-control w-16" defaultValue={1} /></td>
                  <td><input className="form-control w-24" placeholder="0.00" /></td>
                  <td><input className="form-control w-20" placeholder="0%" /></td>
                  <td className="font-medium">₹0.00</td>
                  <td><button className="text-red-500">🗑</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="btn-secondary mt-3 text-sm">+ Add Item</button>
        </div>
      </Modal>
    </div>
  )
}