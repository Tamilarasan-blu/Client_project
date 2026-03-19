import { useState } from 'react';
import { Plus } from 'lucide-react';
import { items } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'description', label: 'Description', accessor: 'description', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'unit', label: 'Unit', accessor: 'unit' },
  { key: 'rate', label: 'Rate', accessor: 'rate', render: (v) => `₹${v.toLocaleString()}` },
  { key: 'tax', label: 'Tax', accessor: 'tax' },
  { key: 'category', label: 'Category', accessor: 'category' },
];

export default function Items() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PageHeader
        title="Items"
        subtitle="Manage products and services catalog"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
            <Plus size={14} /> Add Item
          </button>
        }
      />
      <DataTable columns={columns} data={items} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Item">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Description *</label>
            <input className="input-field" placeholder="Item description" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Unit</label>
              <input className="input-field" placeholder="Hour/Unit/Day" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Rate (₹)</label>
              <input className="input-field" type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Tax</label>
              <select className="input-field">
                <option>None</option>
                <option>18%</option>
                <option>12%</option>
                <option>5%</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Category</label>
            <input className="input-field" placeholder="Item category" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Add Item</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
