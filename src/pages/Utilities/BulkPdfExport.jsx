import React, { useState } from 'react'
import PageHeader from '../../components/UI/PageHeader'

export default function BulkPdfExport() {
  const [type, setType] = useState('invoices')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  return (
    <div className="fade-in">
      <PageHeader title="Bulk PDF Export" subtitle="Export multiple records as PDF files" />
      <div className="stat-card max-w-lg">
        <h3 className="font-semibold text-gray-700 mb-4">Export Settings</h3>
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">Export Type</label>
            <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
              {['Invoices','Estimates','Proposals','Credit Notes','Payments'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label">Date From</label><input type="date" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Date To</label><input type="date" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Customer (Optional)</label><select className="form-control"><option value="">All Customers</option></select></div>
          <button className="btn-primary w-full">📥 Export PDF</button>
        </div>
      </div>
    </div>
  )
}