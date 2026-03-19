import React from 'react'
import PageHeader from '../../components/UI/PageHeader'

export default function TicketPipeLog() {
  const logs = [
    { id: 1, date: '2026-03-18 10:30', subject: 'Invoice Download Issue', email: 'akash@example.com', status: 'Created', ip: '192.168.1.1' },
    { id: 2, date: '2026-03-17 14:20', subject: 'Cannot access portal', email: 'aarti@example.com', status: 'Created', ip: '192.168.1.2' },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Ticket Pipe Log" subtitle="Email-to-ticket pipe activity log" />
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>#</th><th>Date</th><th>Subject</th><th>Email</th><th>Status</th><th>IP</th></tr></thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}><td>{l.id}</td><td>{l.date}</td><td>{l.subject}</td><td>{l.email}</td><td><span className="badge badge-success">{l.status}</span></td><td>{l.ip}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}