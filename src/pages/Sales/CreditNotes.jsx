import React, { useState } from 'react'
import { creditNotes as creditNotesData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function CreditNotes() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'number', label: 'Credit Note #', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'date', label: 'Credit Note Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'reference', label: 'Reference #' },
    { key: 'amount', label: 'Amount', render: v => '₹' + v },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Credit Notes"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Credit Note</button><button className="btn-secondary">📤</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <DataTable columns={columns} data={creditNotesData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Credit Note"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Customer','Date','Reference Invoice','Amount','Currency'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}