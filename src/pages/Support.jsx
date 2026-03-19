import { useState } from 'react';
import { Plus, List } from 'lucide-react';
import { tickets } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';

const statusColors = {
  'Open': 'badge-blue',
  'In Progress': 'badge-yellow',
  'Answered': 'badge-green',
  'On Hold': 'badge-purple',
  'Closed': 'badge-gray',
};

const priorityColors = {
  'High': 'badge-red',
  'Medium': 'badge-yellow',
  'Low': 'badge-green',
};

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'subject', label: 'Subject', accessor: 'subject', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'tags', label: 'Tags', accessor: 'tags', render: (v) => (
    <div className="flex gap-1">
      {(v || []).map(t => <span key={t} className="badge-purple text-xs">{t}</span>)}
    </div>
  )},
  { key: 'department', label: 'Department', accessor: 'department' },
  { key: 'service', label: 'Service', accessor: 'service' },
  { key: 'contact', label: 'Contact', accessor: 'contact' },
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => <span className={statusColors[v] || 'badge-gray'}>{v}</span> },
  { key: 'priority', label: 'Priority', accessor: 'priority', render: (v) => <span className={priorityColors[v] || 'badge-gray'}>{v}</span> },
  { key: 'lastReply', label: 'Last Reply', accessor: 'lastReply' },
  { key: 'created', label: 'Created', accessor: 'created' },
];

export default function Support() {
  const [showModal, setShowModal] = useState(false);

  const countByStatus = (status) => tickets.filter(t => t.status === status).length;

  return (
    <div>
      <PageHeader
        title="Support Tickets"
        subtitle="Manage customer support requests"
        actions={
          <>
            <div className="flex flex-wrap gap-2">
              {['Open', 'In Progress', 'Answered', 'On Hold', 'Closed'].map(status => (
                <span key={status} className={`${statusColors[status]} text-xs cursor-pointer px-2.5 py-1`}>
                  {countByStatus(status)} {status}
                </span>
              ))}
            </div>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Ticket
            </button>
          </>
        }
      />

      <DataTable columns={columns} data={tickets} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Support Ticket" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Subject *</label>
            <input className="input-field" placeholder="Ticket subject" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer</label>
              <select className="input-field">
                <option value="">Select customer</option>
                <option>TechCorp Solutions</option>
                <option>Legal Associates</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Department</label>
              <select className="input-field">
                <option>IT</option>
                <option>Finance</option>
                <option>Legal</option>
                <option>General</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Priority</label>
              <select className="input-field">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Service</label>
              <input className="input-field" placeholder="Service type" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Description *</label>
            <textarea className="input-field" rows={4} placeholder="Describe the issue..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Ticket</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
