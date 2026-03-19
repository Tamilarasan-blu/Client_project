export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getStatusBadge(status) {
  const map = {
    active: 'badge-green',
    inactive: 'badge-red',
    pending: 'badge-yellow',
    paid: 'badge-green',
    unpaid: 'badge-red',
    draft: 'badge-gray',
    overdue: 'badge-red',
    open: 'badge-blue',
    closed: 'badge-gray',
    'in progress': 'badge-blue',
    complete: 'badge-green',
    'not started': 'badge-gray',
  };
  return map[status?.toLowerCase()] || 'badge-gray';
}
