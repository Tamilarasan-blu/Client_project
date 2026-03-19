import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects as projectsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Projects() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const statuses = ['Not Started','In Progress','On Hold','Cancelled','Finished']
  const counts = statuses.map(s => ({ label: s, value: projectsData.filter(p => p.status === s).length }))
  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Project Name', render: (v, row) => (
      <button onClick={() => navigate('/projects/' + row.id)} className="font-medium text-blue-600 hover:underline text-left">{v}</button>
    )},
    { key: 'customer', label: 'Customer' },
    { key: 'tags', label: 'Tags', render: v => v.map(t => <span key={t} className="badge badge-info mr-1">{t}</span>) },
    { key: 'startDate', label: 'Start Date' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'progress', label: 'Progress', render: v => (
      <div className="flex items-center gap-2">
        <div className="progress-bar flex-1 w-24"><div className="progress-fill bg-blue-500" style={{ width: v + '%' }}></div></div>
        <span className="text-xs text-gray-500">{v}%</span>
      </div>
    )},
    { key: 'status', label: 'Status', badge: true },
    { key: 'members', label: 'Members', render: v => (
      <div className="flex -space-x-1">
        {v.map((m, i) => <div key={i} className="avatar avatar-sm border-2 border-white">{m}</div>)}
      </div>
    )},
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Projects"
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Project</button><button className="btn-secondary">≡</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="flex gap-3 mb-6 flex-wrap">
        {counts.map(s => (
          <div key={s.label} className="stat-card px-4 py-2 flex items-center gap-2 text-sm">
            <span className="font-bold text-gray-800">{s.value}</span>
            <span className="text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={projectsData} onRowClick={row => navigate('/projects/' + row.id)} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Project"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Project Name','Customer','Start Date','Deadline','Billing Type','Status'].map(f => (
            <div key={f} className="form-group"><label className="form-label">{f}</label><input className="form-control" /></div>
          ))}
          <div className="col-span-2 form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} />
          </div>
        </div>
      </Modal>
    </div>
  )
}