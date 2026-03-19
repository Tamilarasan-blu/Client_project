import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { expenses } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';

const columns = [
  { key: 'category', label: 'Category', accessor: 'category' },
  { key: 'amount', label: 'Amount', accessor: 'amount', render: (v) => <span className="font-semibold text-white">₹{v.toLocaleString()}</span> },
  { key: 'name', label: 'Name', accessor: 'name' },
  { key: 'receipt', label: 'Receipt', accessor: 'receipt', render: (v) => v ? <span className="badge-blue">View</span> : '—' },
  { key: 'date', label: 'Date', accessor: 'date' },
  { key: 'project', label: 'Project', accessor: 'project', render: (v) => v || '—' },
  { key: 'customer', label: 'Customer', accessor: 'customer', render: (v) => v || '—' },
  { key: 'billable', label: 'Billable', accessor: 'billable', render: (v) => v ? <span className="badge-green">Yes</span> : <span className="badge-gray">No</span> },
  { key: 'invoiced', label: 'Invoiced', accessor: 'invoiced', render: (v) => v ? <span className="badge-green">Yes</span> : <span className="badge-red">No</span> },
];

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const billable = expenses.filter(e => e.billable).reduce((sum, e) => sum + e.amount, 0);
  const nonBillable = expenses.filter(e => !e.billable).reduce((sum, e) => sum + e.amount, 0);
  const notInvoiced = expenses.filter(e => e.billable && !e.invoiced).reduce((sum, e) => sum + e.amount, 0);
  const billed = expenses.filter(e => e.invoiced).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <PageHeader
        title="Expenses"
        subtitle="Track and manage business expenses"
        actions={
          <>
            <FilterBar />
            <button className="btn-secondary text-sm">
              <Upload size={14} /> Import Expenses
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> Record Expense
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Total" value={`₹${total.toLocaleString()}`} color="white" />
          <StatCard label="Billable" value={`₹${billable.toLocaleString()}`} color="green" />
          <StatCard label="Non Billable" value={`₹${nonBillable.toLocaleString()}`} color="yellow" />
          <StatCard label="Not Invoiced" value={`₹${notInvoiced.toLocaleString()}`} color="red" />
          <StatCard label="Billed" value={`₹${billed.toLocaleString()}`} color="blue" />
        </div>
      </PageHeader>

      <DataTable columns={columns} data={expenses} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Record Expense">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Expense Name *</label>
              <input className="input-field" placeholder="Expense description" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Category *</label>
              <select className="input-field">
                <option>Software</option>
                <option>Travel</option>
                <option>Rent</option>
                <option>Utilities</option>
                <option>Marketing</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Amount (₹) *</label>
              <input className="input-field" type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Date *</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer</label>
              <select className="input-field">
                <option value="">None</option>
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
          <div className="flex items-center gap-3">
            <input type="checkbox" id="billable" className="rounded" />
            <label htmlFor="billable" className="text-sm text-slate-300">Billable to customer</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Record Expense</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
