import React, { useState } from 'react'
import { subscriptions as subsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Subscriptions() {
  const [showModal, setShowModal] = useState(false)
  const summaryStats = [
    { label: 'Not Subscribed', value: 0, color: 'text-gray-500' },
    { label: 'Active', value: 2, color: 'text-green-600' },
    { label: 'Future', value: 0, color: 'text-purple-600' },
    { label: 'Past Due', value: 1, color: 'text-orange-500' },
    { label: 'Unpaid', value: 0, color: 'text-red-500' },
    { label: 'Incomplete', value: 0, color: 'text-gray-400' },
    { label: 'Canceled', value: 0, color: 'text-gray-500' },
    { label: 'Incomplete Expired', value: 0, color: 'text-red-600' },
  ]
  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Subscription Name', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'customer', label: 'Customer' },
    { key: 'project', label: 'Project', render: v => v || '-' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'nextBillingCycle', label: 'Next Billing Cycle' },
    { key: 'amount', label: 'Amount', render: v => '₹' + v.toLocaleString() },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Subscriptions"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Subscription</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="stat-card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-bold text-purple-600">stripe</span>
          <span className="font-semibold text-gray-700">Subscriptions Summary</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {summaryStats.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={subsData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Subscription"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Subscription Name','Customer','Project','Plan','Billing Cycle','Start Date'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}