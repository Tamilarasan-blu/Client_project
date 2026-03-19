import { payments } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';

const columns = [
  { key: 'id', label: 'Payment #', accessor: 'id' },
  { key: 'invoiceId', label: 'Invoice #', accessor: 'invoiceId' },
  { key: 'mode', label: 'Payment Mode', accessor: 'mode' },
  { key: 'transactionId', label: 'Transaction ID', accessor: 'transactionId' },
  { key: 'customer', label: 'Customer', accessor: 'customer' },
  { key: 'amount', label: 'Amount', accessor: 'amount', render: (v) => v ? `₹${v}` : '—' },
  { key: 'date', label: 'Date', accessor: 'date' },
];

export default function Payments() {
  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Track all payment transactions"
        actions={<FilterBar />}
      />
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
