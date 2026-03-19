import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { leads as leadsData, leadStatuses } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Leads() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Name', render: (v, row) => (
      <button onClick={() => navigate('/leads/' + row.id)} className="font-medium text-blue-600 hover:underline text-left">{v}</button>
    )},
    { key: 'company', label: 'Company', render: v => v || '-' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'source', label: 'Source' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'created', label: 'Created' },
  ]

  return (
    <div className="fade-in">
      <PageHeader title="Leads"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Lead</button><button className="btn-secondary">⊞</button><button className="btn-secondary">⬆ Import Leads</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="flex gap-2 flex-wrap mb-4 p-3 bg-white rounded-xl border border-gray-200 overflow-x-auto">
        {leadStatuses.map(s => (
          <button key={s.status} className={`text-sm px-3 py-1.5 rounded-full font-medium border transition-all ${activeTab === s.status ? 'text-white' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            style={activeTab === s.status ? { background: s.color, borderColor: s.color } : {}}
            onClick={() => setActiveTab(s.status)}
          >
            {s.count} {s.status}
          </button>
        ))}
        <button
          className={`text-sm px-3 py-1.5 rounded-full font-medium border ${activeTab === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('all')}
        >All Leads</button>
      </div>
      <DataTable
        columns={columns}
        data={activeTab === 'all' ? leadsData : leadsData.filter(l => l.status === activeTab)}
        onRowClick={row => navigate('/leads/' + row.id)}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Lead"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save Lead</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['First Name','Last Name','Company','Email','Phone','Source','Assigned To','Status','Tags'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
          <div className="col-span-2 form-group">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows={3} />
          </div>
        </div>
      </Modal>
    </div>
  )
}