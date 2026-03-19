import { creditNotes } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import { Plus } from 'lucide-react';

const columns = [
  { key: 'id', label: 'Credit Note #', accessor: 'id' },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'amount', label: 'Amount', accessor: 'amount', render: (v) => v ? `₹${v}` : '—' },
  { key: 'date', label: 'Date', accessor: 'date' },
  { key: 'status', label: 'Status', accessor: 'status' },
];

export default function CreditNotes() {
  return (
    <div>
      <PageHeader
        title="Credit Notes"
        subtitle="Manage credit notes and refunds"
        actions={
          <button className="btn-primary text-sm">
            <Plus size={14} /> New Credit Note
          </button>
        }
      />
      <DataTable columns={columns} data={creditNotes} />
    </div>
  );
}
