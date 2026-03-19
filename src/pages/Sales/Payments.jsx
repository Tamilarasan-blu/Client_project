import React, { useState } from 'react'
import { payments as paymentsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Modal from '../../components/UI/Modal'

export default function Payments() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'number', label: 'Payment #', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'invoiceNum', label: 'Invoice #', render: v => <span className="text-blue-600">{v}</span> },
    { key: 'mode', label: 'Payment Mode' },
    { key: 'transactionId', label: 'Transaction ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', render: v => '₹' + v.toLocaleString() },
    { key: 'date', label: 'Date' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Payments"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ Record Payment</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <DataTable columns={columns} data={paymentsData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Record Payment"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Invoice','Amount','Date','Payment Mode','Transaction ID','Notes'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
        </div>
      </Modal>
    </div>
  )
}