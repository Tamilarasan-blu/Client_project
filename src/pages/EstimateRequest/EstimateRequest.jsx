import React, { useState } from 'react'
import { estimateRequests } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function EstimateRequest() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'id', label: '#' },
    { key: 'email', label: 'Email' },
    { key: 'tags', label: 'Tags', render: v => v.map(t => <span key={t} className="badge badge-info mr-1">{t}</span>) },
    { key: 'assigned', label: 'Assigned' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'created', label: 'Created' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Estimate Requests"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Form</button></>}
      />
      <DataTable columns={columns} data={estimateRequests} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Estimate Request Form"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Create Form</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Form Name','Assigned To','Tags','Status'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}