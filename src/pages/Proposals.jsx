import { useState } from 'react';
import { Plus, Grid, List } from 'lucide-react';
import { proposals } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';

const columns = [
  { key: 'id', label: 'Proposal #', accessor: 'id', render: (v) => <span className="font-mono text-primary-400">{v}</span> },
  { key: 'subject', label: 'Subject', accessor: 'subject' },
  { key: 'to', label: 'To', accessor: 'to' },
  { key: 'total', label: 'Total', accessor: 'total', render: (v) => v ? `₹${v}` : '—' },
  { key: 'date', label: 'Date', accessor: 'date' },
  { key: 'openTill', label: 'Open Till', accessor: 'openTill' },
  { key: 'status', label: 'Status', accessor: 'status' },
];

export default function Proposals() {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  return (
    <div>
      <PageHeader
        title="Proposals"
        subtitle="Create and manage client proposals"
        actions={
          <>
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              <button onClick={() => setViewMode('table')} className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white/10 text-white' : 'text-slate-500'}`}><List size={14} /></button>
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500'}`}><Grid size={14} /></button>
            </div>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Proposal
            </button>
          </>
        }
      />

      <DataTable columns={columns} data={proposals} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Proposal" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Subject *</label>
            <input className="input-field" placeholder="Proposal subject" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">To (Customer)</label>
              <select className="input-field">
                <option value="">Select customer</option>
                <option>TechCorp Solutions</option>
                <option>Legal Associates</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Open Till</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Proposal Content</label>
            <textarea className="input-field" rows={5} placeholder="Write your proposal content..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Proposal</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
