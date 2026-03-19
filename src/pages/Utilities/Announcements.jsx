import React, { useState } from 'react'
import { announcements as announcementsData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Modal from '../../components/UI/Modal'

export default function Announcements() {
  const [showModal, setShowModal] = useState(false)
  const columns = [
    { key: 'name', label: 'Name', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'date', label: 'Date' },
    { key: 'message', label: 'Message', render: v => <span className="text-sm text-gray-600 truncate block max-w-xs">{v}</span> },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Announcements"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">+ New Announcement</button>}
      />
      <DataTable columns={columns} data={announcementsData} />
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Announcement"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Publish</button></>}
      >
        <div className="space-y-4">
          <div className="form-group"><label className="form-label">Announcement Name</label><input className="form-control" /></div>
          <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-control" /></div>
          <div className="form-group"><label className="form-label">Message</label><textarea className="form-control" rows={4} /></div>
          <div className="form-group">
            <label className="form-label">Visible To</label>
            <select className="form-control"><option>All Staff</option><option>All Customers</option><option>Both</option></select>
          </div>
        </div>
      </Modal>
    </div>
  )
}