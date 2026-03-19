import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customers as customersData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function Customers() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ company: '', contact: '', email: '', phone: '', group: '', country: 'India', city: '', address: '' })

  const stats = [
    { label: 'Total Customers', value: 80, color: 'text-gray-800' },
    { label: 'Active Customers', value: 80, color: 'text-green-600' },
    { label: 'Inactive Customers', value: 0, color: 'text-red-500' },
    { label: 'Active Contacts', value: 80, color: 'text-green-600' },
    { label: 'Inactive Contacts', value: 0, color: 'text-red-500' },
    { label: 'Contacts Logged In Today', value: 0, color: 'text-blue-600' },
  ]

  const columns = [
    { key: 'id', label: '#' },
    { key: 'company', label: 'Company', render: (v, row) => (
      <button onClick={() => navigate('/customers/' + row.id)} className="font-medium text-blue-600 hover:underline text-left">{v}</button>
    )},
    { key: 'contact', label: 'Primary Contact' },
    { key: 'email', label: 'Primary Email', render: v => <a href={'mailto:' + v} className="text-blue-600 hover:underline">{v}</a> },
    { key: 'phone', label: 'Phone' },
    { key: 'active', label: 'Active', render: v => <Badge status={v ? 'Yes' : 'No'} /> },
    { key: 'group', label: 'Groups' },
    { key: 'created', label: 'Date Created' },
    { key: 'id', label: 'Actions', render: (v, row) => (
      <div className="actions">
        <button onClick={() => navigate('/customers/' + row.id)} className="text-blue-600 hover:underline text-sm">View</button>
        <button className="text-blue-600 hover:underline text-sm">Contacts</button>
        <button className="text-red-500 hover:underline text-sm">Delete</button>
      </div>
    )},
  ]

  return (
    <div className="fade-in">
      <PageHeader
        title="Customers"
        subtitle={<a href="/contacts" className="text-blue-600 hover:underline text-sm">Contacts →</a>}
        actions={
          <>
            <button onClick={() => setShowModal(true)} className="btn-primary">+ New Customer</button>
            <button className="btn-secondary">⬆ Import Customers</button>
            <button className="btn-secondary">▼ Filters</button>
          </>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card text-center p-3">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={customersData}
        onRowClick={row => navigate('/customers/' + row.id)}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Customer"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => setShowModal(false)}>Save Customer</button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Company Name', key: 'company' },
            { label: 'Primary Contact', key: 'contact' },
            { label: 'Email Address', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Group', key: 'group' },
            { label: 'Country', key: 'country' },
            { label: 'City', key: 'city' },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-control" value={form[f.key] || ''} onChange={e => setForm({...form, [f.key]: e.target.value})} placeholder={`Enter ${f.label}`} />
            </div>
          ))}
          <div className="col-span-2 form-group">
            <label className="form-label">Address</label>
            <textarea className="form-control" rows={3} value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Enter address" />
          </div>
        </div>
      </Modal>
    </div>
  )
}