import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { tickets } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import Badge from '../../components/UI/Badge'

export default function TicketDetail() {
  const { id } = useParams()
  const ticket = tickets.find(t => t.id === +id) || tickets[0]
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState([
    { id: 1, author: 'bluverse', message: 'We are looking into this issue. Please provide more details.', time: '2026-03-16 14:30', type: 'staff' },
    { id: 2, author: ticket.contact, message: 'I cannot download the invoice PDF from the portal.', time: '2026-03-15 10:00', type: 'client' },
  ])

  const submitReply = () => {
    if (reply.trim()) {
      setReplies(prev => [...prev, { id: Date.now(), author: 'bluverse', message: reply, time: new Date().toISOString().slice(0, 16).replace('T', ' '), type: 'staff' }])
      setReply('')
    }
  }

  return (
    <div className="fade-in">
      <PageHeader
        title={`Ticket #${ticket.id}: ${ticket.subject}`}
        breadcrumb={[{ label: 'Support', href: '/support' }, { label: '#' + ticket.id }]}
        actions={
          <>
            <Badge status={ticket.status} />
            <select className="form-control w-40">
              <option>Change Status</option>
              {['Open','In Progress','Answered','On Hold','Closed'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="btn-secondary">Edit</button>
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Conversation</h3>
            <div className="space-y-4">
              {replies.map(r => (
                <div key={r.id} className={`flex gap-3 ${r.type === 'staff' ? 'flex-row-reverse' : ''}`}>
                  <div className="avatar avatar-sm flex-shrink-0">{r.author.slice(0, 2).toUpperCase()}</div>
                  <div className={`max-w-md p-3 rounded-xl ${r.type === 'staff' ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-700">{r.author}</span>
                      <span className="text-xs text-gray-400">{r.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{r.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Reply</h4>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Type your reply..."
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <div className="flex gap-2 mt-3">
                <button onClick={submitReply} className="btn-primary">Send Reply</button>
                <button className="btn-secondary">Save as Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="stat-card">
            <h3 className="font-semibold mb-3">Ticket Details</h3>
            {[
              { label: 'Status', value: ticket.status, badge: true },
              { label: 'Priority', value: ticket.priority, badge: true },
              { label: 'Department', value: ticket.department },
              { label: 'Service', value: ticket.service },
              { label: 'Contact', value: ticket.contact },
              { label: 'Created', value: ticket.created },
              { label: 'Last Reply', value: ticket.lastReply },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                {item.badge ? <Badge status={item.value} /> : <span className="text-sm font-medium text-gray-700">{item.value}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}