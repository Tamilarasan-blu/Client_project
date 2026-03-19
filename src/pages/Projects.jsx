import { useState } from 'react';
import { Plus, FolderKanban } from 'lucide-react';
import { projects } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';

const statusColors = {
  'Not Started': 'badge-gray',
  'In Progress': 'badge-blue',
  'On Hold': 'badge-yellow',
  'Cancelled': 'badge-red',
  'Finished': 'badge-green',
};

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'name', label: 'Project Name', accessor: 'name', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'tags', label: 'Tags', accessor: 'tags', render: (v) => (
    <div className="flex gap-1">
      {(v || []).map(t => <span key={t} className="badge-purple text-xs">{t}</span>)}
    </div>
  )},
  { key: 'startDate', label: 'Start Date', accessor: 'startDate' },
  { key: 'deadline', label: 'Deadline', accessor: 'deadline' },
  { key: 'members', label: 'Members', accessor: 'members', render: (v) => (
    <div className="flex -space-x-2">
      {(v || []).map((m, i) => (
        <div key={i} className="w-6 h-6 rounded-full bg-primary-500 border-2 border-dark-900 flex items-center justify-center text-xs text-white font-bold">
          {m[0]}
        </div>
      ))}
    </div>
  )},
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => <span className={statusColors[v] || 'badge-gray'}>{v}</span> },
];

export default function Projects() {
  const [showModal, setShowModal] = useState(false);

  const counts = {
    'Not Started': projects.filter(p => p.status === 'Not Started').length,
    'In Progress': projects.filter(p => p.status === 'In Progress').length,
    'On Hold': projects.filter(p => p.status === 'On Hold').length,
    'Cancelled': projects.filter(p => p.status === 'Cancelled').length,
    'Finished': projects.filter(p => p.status === 'Finished').length,
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Manage and track your projects"
        actions={
          <>
            <div className="flex flex-wrap gap-2">
              {Object.entries(counts).map(([status, count]) => (
                <span key={status} className={`${statusColors[status]} cursor-pointer text-xs px-2.5 py-1`}>
                  {count} {status}
                </span>
              ))}
            </div>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Project
            </button>
          </>
        }
      />

      <DataTable columns={columns} data={projects} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Project" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Project Name *</label>
            <input className="input-field" placeholder="Enter project name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer</label>
              <select className="input-field">
                <option value="">No Customer</option>
                <option>TechCorp Solutions</option>
                <option>Legal Associates</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Billing Type</label>
              <select className="input-field">
                <option>Fixed Rate</option>
                <option>Project Hours</option>
                <option>Task Hours</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Start Date</label>
              <input className="input-field" type="date" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Deadline</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Description</label>
            <textarea className="input-field" rows={3} placeholder="Project description..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Project</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
