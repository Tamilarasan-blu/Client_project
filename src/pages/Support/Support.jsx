import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tickets } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Support() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const statCounts = [
    { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: 'text-blue-600' },
    { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: 'text-green-600' },
    { label: 'Answered', value: tickets.filter(t => t.status === 'Answered').length, color: 'text-teal-600' },
    { label: 'On Hold', value: tickets.filter(t => t.status === 'On Hold').length, color: 'text-orange-500' },
    { label: 'Closed', value: tickets.filter(t => t.status === 'Closed').length, color: 'text-gray-500' },
  ]
  const columns = [
    { key: 'id', label: '#' },
    { key: 'subject', label: 'Subject', render: (v, row) => (
      <button onClick={() => navigate('/support/' + row.id)} className="font-medium text-blue-600 hover:underline text-left">{v}</button>
    )},
    { key: 'tags', label: 'Tags', render: v => v.map(t => <span key={t} className="badge badge-gray mr-1">{t}</span>) },
    { key: 'department', label: 'Department' },
    { key: 'service', label: 'Service' },
    { key: 'contact', label: 'Contact' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'priority', label: 'Priority', badge: true },
    { key: 'lastReply', label: 'Last Reply' },
    { key: 'created', label: 'Created' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Support Tickets"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Ticket</button><button className="btn-secondary">≡</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="flex flex-wrap gap-3 mb-6">
        {statCounts.map(s => (
          <div key={s.label} className="stat-card px-4 py-2 flex items-center gap-2 text-sm cursor-pointer">
            <span className={`font-bold ${s.color}`}>{s.value}</span>
            <span className="text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={tickets} onRowClick={row => navigate('/support/' + row.id)} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Support Ticket"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Subject','Customer/Contact','Department','Service','Priority','Tags'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
          <div className="col-span-2 form-group">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows={4} placeholder="Describe the issue..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}