import { useState } from 'react';
import { Plus } from 'lucide-react';
import { estimates } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';

const columns = [
  { key: 'id', label: 'Estimate #', accessor: 'id' },
  { key: 'amount', label: 'Amount', accessor: 'amount' },
  { key: 'tax', label: 'Total Tax', accessor: 'tax' },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'project', label: 'Project', accessor: 'project' },
  { key: 'date', label: 'Date', accessor: 'date' },
  { key: 'expiry', label: 'Expiry', accessor: 'expiry' },
  { key: 'status', label: 'Status', accessor: 'status' },
];

export default function Estimates() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PageHeader
        title="Estimates"
        subtitle="Create and track client estimates"
        actions={
          <>
            <FilterBar />
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> Create Estimate
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Draft (0%)" value="0/0" color="gray" />
          <StatCard label="Sent (0%)" value="0/0" color="blue" />
          <StatCard label="Expired (0%)" value="0/0" color="orange" />
          <StatCard label="Declined (0%)" value="0/0" color="red" />
          <StatCard label="Accepted (0%)" value="0/0" color="green" />
        </div>
      </PageHeader>

      <DataTable columns={columns} data={estimates} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Estimate" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Customer *</label>
              <select className="input-field">
                <option value="">Select customer</option>
                <option>TechCorp Solutions</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Expiry Date</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Note</label>
            <textarea className="input-field" rows={3} placeholder="Estimate notes..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Estimate</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
