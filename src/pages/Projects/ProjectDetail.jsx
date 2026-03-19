import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects, tasks } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import Badge from '../../components/UI/Badge'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === +id) || projects[0]
  const [tab, setTab] = useState('overview')
  const projectTasks = tasks.slice(0, 3)

  return (
    <div className="fade-in">
      <PageHeader
        title={project.name}
        breadcrumb={[{ label: 'Projects', href: '/projects' }, { label: project.name }]}
        actions={
          <>
            <button className="btn-secondary">Edit</button>
            <button className="btn-secondary">+ Add Task</button>
            <button className="btn-secondary">+ New Invoice</button>
          </>
        }
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'timesheets', label: 'Timesheets' },
          { id: 'activity', label: 'Activity' },
          { id: 'notes', label: 'Notes' },
          { id: 'files', label: 'Files' },
        ]}
        activeTab={tab}
        onTabChange={setTab}
      />
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="stat-card">
              <h3 className="font-semibold mb-4">Project Progress</h3>
              <div className="flex items-center gap-4 mb-2">
                <div className="progress-bar flex-1 h-3">
                  <div className="progress-fill bg-blue-500" style={{ width: project.progress + '%' }}></div>
                </div>
                <span className="font-bold text-blue-600">{project.progress}%</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { label: 'Status', value: project.status },
                  { label: 'Customer', value: project.customer },
                  { label: 'Start Date', value: project.startDate },
                  { label: 'Deadline', value: project.deadline },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="text-sm font-medium text-gray-700 mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="font-semibold mb-3">Tasks Overview</h3>
              <div className="grid grid-cols-5 gap-2">
                {['Not Started','In Progress','Testing','Awaiting Feedback','Complete'].map(s => (
                  <div key={s} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">0</div>
                    <div className="text-xs text-gray-500 mt-1">{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="font-semibold mb-3">Team Members</h3>
              {project.members.map((m, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="avatar avatar-sm">{m}</div>
                  <span className="text-sm text-gray-700">Member {i + 1}</span>
                </div>
              ))}
            </div>
            <div className="stat-card">
              <h3 className="font-semibold mb-3">Billing</h3>
              <div className="text-sm text-gray-500">No billing type set</div>
            </div>
          </div>
        </div>
      )}
      {tab === 'tasks' && (
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>#</th><th>Name</th><th>Status</th><th>Assigned To</th><th>Due Date</th><th>Priority</th></tr></thead>
            <tbody>
              {projectTasks.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td className="font-medium">{t.name}</td>
                  <td><Badge status={t.status} /></td>
                  <td>{t.assignedTo}</td>
                  <td>{t.dueDate}</td>
                  <td><Badge status={t.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}