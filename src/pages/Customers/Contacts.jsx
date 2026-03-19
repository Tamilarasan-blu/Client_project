import React, { useState } from 'react'
import { contacts } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Contacts() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'name', label: 'Name', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    { key: 'position', label: 'Position' },
    { key: 'active', label: 'Active', render: v => <Badge status={v ? 'Yes' : 'No'} /> },
  ]
  return (
    <div className="fade-in">
      <PageHeader
        title="Contacts"
        breadcrumb={[{ label: 'Customers', href: '/customers' }, { label: 'Contacts' }]}
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">+ New Contact</button>}
      />
      <DataTable columns={columns} data={contacts} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Contact"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['First Name','Last Name','Email','Phone','Company','Position'].map(f => (
            <div key={f} className="form-group">
              <label className="form-label">{f}</label>
              <input className="form-control" placeholder={`Enter ${f}`} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}