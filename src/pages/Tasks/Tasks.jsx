import React, { useState } from 'react'
import { tasks as tasksData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Tasks() {
  const [showModal, setShowModal] = useState(false)
  const stats = [
    { label: 'Not Started', value: tasksData.filter(t => t.status === 'Not Started').length, color: 'text-gray-600' },
    { label: 'In Progress', value: tasksData.filter(t => t.status === 'In Progress').length, color: 'text-blue-600' },
    { label: 'Testing', value: tasksData.filter(t => t.status === 'Testing').length, color: 'text-purple-600' },
    { label: 'Awaiting Feedback', value: tasksData.filter(t => t.status === 'Awaiting Feedback').length, color: 'text-orange-500' },
    { label: 'Complete', value: tasksData.filter(t => t.status === 'Complete').length, color: 'text-green-600' },
  ]
  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Name', render: v => <span className="font-medium">{v}</span> },
    { key: 'status', label: 'Status', badge: true },
    { key: 'startDate', label: 'Start Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'assignedTo', label: 'Assigned to' },
    { key: 'tags', label: 'Tags', render: v => v.map(t => <span key={t} className="badge badge-info mr-1">{t}</span>) },
    { key: 'priority', label: 'Priority', badge: true },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Tasks"
        subtitle={<a href="#" className="text-blue-600 hover:underline text-sm">Tasks Overview →</a>}
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Task</button><button className="btn-secondary">⊞</button><button className="btn-secondary">▼ Filters</button></>}
      />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            <div className="text-xs text-gray-400">My Tasks: 0</div>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={tasksData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Task"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save</button></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {['Task Name','Assigned To','Start Date','Due Date','Priority','Status','Project','Tags'].map(f => (
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