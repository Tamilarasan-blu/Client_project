import React, { useState } from 'react'
import { estimates as estimatesData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Estimates() {
  const [showModal, setShowModal] = useState(false)
  const stats = [
    { label: 'Draft', value: 1, color: 'text-gray-500' },
    { label: 'Sent', value: 1, color: 'text-blue-500' },
    { label: 'Expired', value: 0, color: 'text-orange-500' },
    { label: 'Declined', value: 0, color: 'text-red-500' },
    { label: 'Accepted', value: 1, color: 'text-green-600' },
  ]
  const columns = [
    { key: 'number', label: 'Estimate #', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'amount', label: 'Amount', render: v => '₹' + v.toLocaleString() },
    { key: 'tax', label: 'Total Tax', render: v => '₹' + v.toLocaleString() },
    { key: 'customer', label: 'Customer' },
    { key: 'project', label: 'Project', render: v => v || '-' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', badge: true },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Estimates" subtitle={<a href="/reports/sales" className="text-blue-600 hover:underline text-sm">View Financial Stats</a>}
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ Create New Estimate</button><button className="btn-secondary">⊞</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.value} / 3</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={estimatesData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Estimate"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Customer','Date','Expiry Date','Project','Currency','Discount Type'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}