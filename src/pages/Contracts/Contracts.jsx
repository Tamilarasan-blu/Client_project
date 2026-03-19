import React, { useState } from 'react'
import { contracts as contractsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Contracts() {
  const [showModal, setShowModal] = useState(false)
  const stats = [
    { label: 'Active', value: contractsData.filter(c => c.status === 'Active').length, color: 'text-green-600' },
    { label: 'Expired', value: contractsData.filter(c => c.status === 'Expired').length, color: 'text-red-500' },
    { label: 'About to Expire', value: 0, color: 'text-orange-500' },
    { label: 'Recently Added', value: contractsData.filter(c => c.status === 'Recently Added').length, color: 'text-teal-600' },
    { label: 'Trash', value: 0, color: 'text-gray-500' },
  ]
  const columns = [
    { key: 'id', label: '#' },
    { key: 'subject', label: 'Subject', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'customer', label: 'Customer' },
    { key: 'type', label: 'Contract Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'value', label: 'Value', render: v => '₹' + v.toLocaleString() },
    { key: 'status', label: 'Status', badge: true },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Contracts"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Contract</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stat-card mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Contracts by Type</h3>
        <div className="flex gap-4 flex-wrap">
          {['Service Agreement','Retainer','Consultation','Service'].map(type => {
            const count = contractsData.filter(c => c.type === type).length
            return count > 0 ? (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">{type}: <strong>{count}</strong></span>
              </div>
            ) : null
          })}
        </div>
      </div>
      <DataTable columns={columns} data={contractsData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Contract"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Subject','Customer','Contract Type','Start Date','End Date','Contract Value','Currency'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
          <div className="col-span-2 form-group">
            <label className="form-label">Contract Content</label>
            <textarea className="form-control" rows={4} placeholder="Enter contract details..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}