import React, { useState } from 'react'
import { items } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Modal from '../../components/UI/Modal'

export default function Items() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'description', label: 'Description', render: v => <span className="font-medium">{v}</span> },
    { key: 'longDescription', label: 'Long Description' },
    { key: 'rate', label: 'Rate', render: v => '₹' + v.toLocaleString() },
    { key: 'tax1', label: 'Tax 1', render: v => v + '%' },
    { key: 'tax2', label: 'Tax 2', render: v => v + '%' },
    { key: 'unit', label: 'Unit' },
    { key: 'group', label: 'Group' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Items"
        subtitle={<a href="#" className="text-blue-600 hover:underline text-sm">Groups</a>}
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Item</button><button className="btn-secondary">⬆ Import Items</button><button className="btn-secondary">▼ Bulk Actions</button></>}
      />
      <DataTable columns={columns} data={items} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Item"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save Item</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Description','Long Description','Rate','Tax 1 (%)','Tax 2 (%)','Unit','Group'].map(f => (
            <div key={f} className={`form-group ${f === 'Long Description' ? 'col-span-2' : ''}`}>
              <label className="form-label">{f}</label>
              {f === 'Long Description' ? <textarea className="form-control" rows={2} /> : <input className="form-control" />}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}