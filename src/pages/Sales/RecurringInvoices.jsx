import React, { useState } from 'react'
import PageHeader from '../../components/UI/PageHeader'

export default function RecurringInvoices() {
  return (
    <div className="fade-in">
      <PageHeader title="Recurring Invoices" breadcrumb={[{ label: 'Sales', href: '/sales/invoices' }, { label: 'Recurring Invoices' }]}
        actions={<button className="btn-primary">+ New Recurring Invoice</button>}
      />
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>#</th><th>Customer</th><th>Cycles</th><th>Next Billing</th><th>Billing Cycle</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody><tr><td colSpan={7} className="text-center py-12 text-gray-400">No recurring invoices found</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}