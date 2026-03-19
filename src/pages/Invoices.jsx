import { useState } from 'react';
import { Plus, CreditCard } from 'lucide-react';
import { invoices } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';

const statusColors = {
  'Paid': 'badge-green',
  'Unpaid': 'badge-red',
  'Partially Paid': 'badge-yellow',
  'Overdue': 'badge-red',
  'Draft': 'badge-gray',
};

const columns = [
  { key: 'id', label: 'Invoice #', accessor: 'id', render: (v) => <span className="font-mono text-primary-400 font-medium">{v}</span> },
  { key: 'amount', label: 'Amount', accessor: 'amount', render: (v) => <span className="font-semibold text-white">₹{v.toLocaleString()}</span> },
  { key: 'tax', label: 'Total Tax', accessor: 'tax', render: (v) => `₹${v.toLocaleString()}` },
  { key: 'date', label: 'Date', accessor: 'date' },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'project', label: 'Project', accessor: 'project', render: (v) => v || '—' },
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => <span className={statusColors[v] || 'badge-gray'}>{v}</span> },
  { key: 'dueDate', label: 'Due Date', accessor: 'dueDate' },
];

export default function Invoices() {
  const [showModal, setShowModal] = useState(false);
  const [year, setYear] = useState('2026');

  const paid = invoices.filter(i => i.status === 'Paid').length;
  const unpaid = invoices.filter(i => i.status === 'Unpaid').length;
  const partial = invoices.filter(i => i.status === 'Partially Paid').length;
  const overdue = invoices.filter(i => i.status === 'Overdue').length;
  const draft = invoices.filter(i => i.status === 'Draft').length;
  const total = invoices.length;

  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle="Manage billing and payments"
        actions={
          <>
            <select value={year} onChange={e => setYear(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none">
              {['2024','2025','2026'].map(y => <option key={y}>{y}</option>)}
            </select>
            <FilterBar />
            <button className="btn-secondary text-sm">
              <CreditCard size={14} /> Batch Payments
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> Create Invoice
            </button>
          </>
        }
      >
        <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-3">
          <span className="text-emerald-400">Paid Invoices ₹0.00</span>
          <span>|</span>
          <span className="text-red-400">Past Due ₹0.00</span>
          <span>|</span>
          <span className="text-yellow-400">Outstanding ₹0.00</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label={`Unpaid (0.00%)`} value={`${unpaid}/${total}`} color="red" />
          <StatCard label={`Paid (100%)`} value={`${paid}/${total}`} color="green" />
          <StatCard label={`Partially Paid (0.00%)`} value={`${partial}/${total}`} color="yellow" />
          <StatCard label={`Overdue (0.00%)`} value={`${overdue}/${total}`} color="orange" />
          <StatCard label={`Draft (0.00%)`} value={`${draft}/${total}`} color="gray" />
        </div>
      </PageHeader>

      <DataTable columns={columns} data={invoices} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create New Invoice" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer *</label>
              <select className="input-field">
                <option value="">Select customer</option>
                <option>TechCorp Solutions</option>
                <option>Legal Associates</option>
                <option>Finance Plus</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Invoice Date *</label>
              <input className="input-field" type="date" defaultValue="2026-03-18" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Due Date</label>
              <input className="input-field" type="date" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Project</label>
              <select className="input-field">
                <option value="">No Project</option>
                <option>Website Redesign</option>
                <option>Legal Document Review</option>
              </select>
            </div>
          </div>
          
          {/* Line Items */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block">Line Items</label>
            <div className="glass-card p-3">
              <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 mb-2 font-medium">
                <span>Item</span>
                <span>Qty</span>
                <span>Rate</span>
                <span>Amount</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <input className="input-field text-sm" placeholder="Description" />
                <input className="input-field text-sm" type="number" placeholder="1" />
                <input className="input-field text-sm" type="number" placeholder="0.00" />
                <input className="input-field text-sm" type="number" placeholder="0.00" readOnly />
              </div>
              <button className="text-primary-400 text-xs mt-2 hover:text-primary-300">+ Add Line Item</button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Note</label>
            <textarea className="input-field" rows={2} placeholder="Additional notes..." />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-secondary">Save as Draft</button>
            <button className="btn-primary">Create Invoice</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
