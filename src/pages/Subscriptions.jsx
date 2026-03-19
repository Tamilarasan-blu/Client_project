import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { subscriptions } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';

const statusColors = {
  'Active': 'badge-green',
  'Past Due': 'badge-red',
  'Unpaid': 'badge-yellow',
  'Canceled': 'badge-gray',
  'Future': 'badge-blue',
  'Incomplete': 'badge-orange',
  'Not Subscribed': 'badge-gray',
};

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'name', label: 'Subscription Name', accessor: 'name', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'project', label: 'Project', accessor: 'project', render: (v) => v || '—' },
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => <span className={statusColors[v] || 'badge-gray'}>{v}</span> },
  { key: 'nextBilling', label: 'Next Billing', accessor: 'nextBilling' },
  { key: 'amount', label: 'Amount', accessor: 'amount', render: (v) => <span className="text-emerald-400">₹{v.toLocaleString()}</span> },
  { key: 'cycle', label: 'Cycle', accessor: 'cycle' },
];

const summaryItems = [
  { key: 'Not Subscribed', color: 'text-slate-400' },
  { key: 'Active', color: 'text-emerald-400' },
  { key: 'Future', color: 'text-blue-400' },
  { key: 'Past Due', color: 'text-red-400' },
  { key: 'Unpaid', color: 'text-yellow-400' },
  { key: 'Incomplete', color: 'text-orange-400' },
  { key: 'Canceled', color: 'text-slate-400' },
  { key: 'Incomplete Expired', color: 'text-slate-400' },
];

export default function Subscriptions() {
  const [showModal, setShowModal] = useState(false);

  const countByStatus = (status) => subscriptions.filter(s => s.status === status).length;

  return (
    <div>
      <PageHeader
        title="Subscriptions"
        subtitle="Manage recurring billing subscriptions"
        actions={
          <>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Subscription
            </button>
          </>
        }
      >
        {/* Summary */}
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw size={14} className="text-slate-400" />
            <span className="text-sm font-semibold text-white">Subscriptions Summary</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {summaryItems.map(item => (
              <div key={item.key} className="text-center">
                <p className={`text-xl font-bold ${item.color}`}>{countByStatus(item.key)}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.key}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHeader>

      <DataTable columns={columns} data={subscriptions} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Subscription" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Subscription Name *</label>
            <input className="input-field" placeholder="Subscription name" />
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
              <label className="text-xs text-slate-400 mb-1 block">Project</label>
              <select className="input-field">
                <option value="">None</option>
                <option>Website Redesign</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Amount (₹) *</label>
              <input className="input-field" type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Billing Cycle</label>
              <select className="input-field">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Start Date</label>
            <input className="input-field" type="date" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Subscription</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
