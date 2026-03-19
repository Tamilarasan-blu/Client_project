import { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import { contracts } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';

const statusColors = {
  'Active': 'badge-green',
  'Expired': 'badge-red',
  'About to Expire': 'badge-yellow',
  'Draft': 'badge-gray',
};

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'subject', label: 'Subject', accessor: 'subject', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'value', label: 'Value', accessor: 'value', render: (v) => <span className="text-emerald-400">₹{v.toLocaleString()}</span> },
  { key: 'startDate', label: 'Start Date', accessor: 'startDate' },
  { key: 'endDate', label: 'End Date', accessor: 'endDate' },
  { key: 'type', label: 'Type', accessor: 'type' },
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => <span className={statusColors[v] || 'badge-gray'}>{v}</span> },
];

export default function Contracts() {
  const [showModal, setShowModal] = useState(false);

  const active = contracts.filter(c => c.status === 'Active').length;
  const expired = contracts.filter(c => c.status === 'Expired').length;
  const aboutToExpire = contracts.filter(c => c.status === 'About to Expire').length;
  const recentlyAdded = contracts.length;
  const trash = 0;

  return (
    <div>
      <PageHeader
        title="Contracts"
        subtitle="Manage legal agreements and contracts"
        actions={
          <>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Contract
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Active" value={active} color="green" />
          <StatCard label="Expired" value={expired} color="red" />
          <StatCard label="About to Expire" value={aboutToExpire} color="yellow" />
          <StatCard label="Recently Added" value={recentlyAdded} color="blue" />
          <StatCard label="Trash" value={trash} color="gray" />
        </div>

        {/* Contracts by Type */}
        <div className="glass-card p-4 mt-4">
          <h3 className="text-sm font-semibold text-white mb-3">Contracts by Type</h3>
          <div className="flex gap-4 text-sm">
            {['Service', 'Retainer', 'License'].map(type => {
              const count = contracts.filter(c => c.type === type).length;
              return (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-slate-400">{type}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </PageHeader>

      <DataTable columns={columns} data={contracts} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Contract" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Contract Subject *</label>
            <input className="input-field" placeholder="Contract title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer *</label>
              <select className="input-field">
                <option value="">Select customer</option>
                <option>TechCorp Solutions</option>
                <option>Legal Associates</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Contract Type</label>
              <select className="input-field">
                <option>Service</option>
                <option>Retainer</option>
                <option>License</option>
                <option>Employment</option>
                <option>NDA</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Value (₹)</label>
              <input className="input-field" type="number" placeholder="0" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Start Date</label>
              <input className="input-field" type="date" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">End Date</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Contract Content</label>
            <textarea className="input-field" rows={5} placeholder="Write contract terms and conditions..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Contract</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
