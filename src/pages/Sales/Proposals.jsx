import React, { useState } from 'react'
import { proposals as proposalsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Proposals() {
  const [showModal, setShowModal] = useState(false)
  const [view, setView] = useState('list')
  const columns = [
    { key: 'number', label: 'Proposal #', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'subject', label: 'Subject' },
    { key: 'to', label: 'To' },
    { key: 'total', label: 'Total', render: v => '₹' + v.toLocaleString() },
    { key: 'date', label: 'Date' },
    { key: 'openTill', label: 'Open Till' },
    { key: 'project', label: 'Project', render: v => v || '-' },
    { key: 'status', label: 'Status', badge: true },
  ]
  return (
    <div className="fade-in">
      <PageHeader
        title="Proposals"
        actions={
          <>
            <button onClick={() => setShowModal(true)} className="btn-primary">+ New Proposal</button>
            <button className={`btn-secondary ${view==='grid'?'bg-blue-50':''}`} onClick={() => setView('grid')}>⊞</button>
            <button className="btn-secondary" title="Import">📤</button>
            <button className="btn-secondary">▼ Filters</button>
          </>
        }
      />
      <DataTable columns={columns} data={proposalsData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Proposal"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Subject','To Customer','Date','Open Till','Project'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}