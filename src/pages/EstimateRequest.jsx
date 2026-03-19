import { useState } from 'react';
import { FileQuestion, Plus } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';

const estimateRequests = [
  { id: 1, name: 'John Smith', email: 'john@example.com', company: 'ABC Corp', service: 'Legal Consultation', status: 'Pending', created: '2026-03-15' },
  { id: 2, name: 'Sarah Jones', email: 'sarah@xyz.com', company: 'XYZ Ltd', service: 'Contract Review', status: 'Reviewed', created: '2026-03-12' },
];

const columns = [
  { key: 'id', label: '#', accessor: 'id' },
  { key: 'name', label: 'Name', accessor: 'name', render: v => <span className="font-medium text-white">{v}</span> },
  { key: 'email', label: 'Email', accessor: 'email', render: v => <a href={`mailto:${v}`} className="text-primary-400 hover:underline">{v}</a> },
  { key: 'company', label: 'Company', accessor: 'company' },
  { key: 'service', label: 'Service', accessor: 'service' },
  { key: 'status', label: 'Status', accessor: 'status', render: v => <span className={v === 'Pending' ? 'badge-yellow' : 'badge-green'}>{v}</span> },
  { key: 'created', label: 'Date', accessor: 'created' },
];

export default function EstimateRequest() {
  return (
    <div>
      <PageHeader
        title="Estimate Requests"
        subtitle="Review and respond to estimate requests"
        actions={
          <button className="btn-primary text-sm">
            <Plus size={14} /> Create Form
          </button>
        }
      />
      <DataTable columns={columns} data={estimateRequests} />
    </div>
  );
}
