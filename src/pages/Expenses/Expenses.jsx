import React, { useState } from 'react'
import { expenses as expensesData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Expenses() {
  const [showModal, setShowModal] = useState(false)
  const totalExp = expensesData.reduce((s, e) => s + e.amount, 0)
  const billable = expensesData.filter(e => e.billable).reduce((s, e) => s + e.amount, 0)
  const nonBillable = expensesData.filter(e => !e.billable).reduce((s, e) => s + e.amount, 0)
  const notInvoiced = expensesData.filter(e => e.billable && !e.invoiced).reduce((s, e) => s + e.amount, 0)
  const billed = expensesData.filter(e => e.invoiced).reduce((s, e) => s + e.amount, 0)
  const statItems = [
    { label: 'Total', value: '₹' + totalExp.toLocaleString(), color: 'text-gray-700' },
    { label: 'Billable', value: '₹' + billable.toLocaleString(), color: 'text-green-600' },
    { label: 'Non Billable', value: '₹' + nonBillable.toLocaleString(), color: 'text-orange-500' },
    { label: 'Not Invoiced', value: '₹' + notInvoiced.toLocaleString(), color: 'text-red-500' },
    { label: 'Billed', value: '₹' + billed.toLocaleString(), color: 'text-blue-600' },
  ]
  const columns = [
    { key: 'category', label: 'Category', render: v => <span className="font-medium">{v}</span> },
    { key: 'amount', label: 'Amount', render: v => '₹' + v.toLocaleString() },
    { key: 'name', label: 'Name' },
    { key: 'receipt', label: 'Receipt', render: v => v ? <span className="text-blue-600 text-xs">📎 {v}</span> : '-' },
    { key: 'date', label: 'Date' },
    { key: 'project', label: 'Project', render: v => v || '-' },
    { key: 'customer', label: 'Customer' },
    { key: 'billable', label: 'Billable', render: v => <Badge status={v ? 'Yes' : 'No'} /> },
    { key: 'invoiced', label: 'Invoiced', render: v => <Badge status={v ? 'Yes' : 'No'} /> },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Expenses"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ Record Expense</button><button className="btn-secondary">⬆ Import Expenses</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {statItems.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={expensesData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Record Expense"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Category','Name','Amount','Date','Customer','Project','Note'].map(f => (
            <div key={f} className={`form-group ${f === 'Note' ? 'col-span-2' : ''}`}>
              <label className="form-label">{f}</label>
              {f === 'Note' ? <textarea className="form-control" rows={3} /> : <input className="form-control" />}
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Billable</label>
            <select className="form-control"><option>No</option><option>Yes</option></select>
          </div>
        </div>
      </Modal>
    </div>
  )
}