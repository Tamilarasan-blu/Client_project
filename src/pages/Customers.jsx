import { useState } from 'react';
import { Plus, Upload, Users, UserCheck, UserX } from 'lucide-react';
import { customers } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'company', label: 'Company', accessor: 'company', render: (v) => <span className="font-medium text-white">{v}</span> },
  { key: 'contact', label: 'Primary Contact', accessor: 'contact' },
  { key: 'email', label: 'Primary Email', accessor: 'email', render: (v) => <a href={`mailto:${v}`} className="text-primary-400 hover:underline">{v}</a> },
  { key: 'phone', label: 'Phone', accessor: 'phone' },
  { key: 'status', label: 'Status', accessor: 'status', render: (v) => (
    <span className={v === 'active' ? 'badge-green' : 'badge-red'}>{v}</span>
  )},
  { key: 'city', label: 'City', accessor: 'city' },
];

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ company: '', contact: '', email: '', phone: '', city: '', country: 'India' });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="Manage your customer accounts and contacts"
        actions={
          <>
            <FilterBar filters={[
              { key: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] },
              { key: 'city', label: 'City', type: 'text', placeholder: 'Filter by city' },
            ]} />
            <button className="btn-secondary text-sm">
              <Upload size={14} /> Import
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
              <Plus size={14} /> New Customer
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total Customers" value={totalCustomers} color="white" />
          <StatCard label="Active" value={activeCustomers} color="green" />
          <StatCard label="Inactive" value={inactiveCustomers} color="red" />
          <StatCard label="Active Contacts" value={totalCustomers} color="blue" />
          <StatCard label="Inactive Contacts" value={0} color="red" />
          <StatCard label="Logged In Today" value={0} color="purple" />
        </div>
      </PageHeader>

      <DataTable columns={columns} data={customers} />

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Customer">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Company Name *</label>
              <input className="input-field" placeholder="Company name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Primary Contact *</label>
              <input className="input-field" placeholder="Contact name" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email</label>
              <input className="input-field" type="email" placeholder="email@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Phone</label>
              <input className="input-field" placeholder="Phone number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">City</label>
              <input className="input-field" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Country</label>
              <input className="input-field" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Create Customer</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
