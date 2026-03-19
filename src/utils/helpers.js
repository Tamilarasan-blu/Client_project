export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
export const formatDate = (str) => {
  if (!str) return '--';
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};
export const truncate = (str, n = 40) => str && str.length > n ? str.slice(0, n) + '...' : str;
export const getInitials = (name) => !name ? '' : name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
export const classNames = (...classes) => classes.filter(Boolean).join(' ');
