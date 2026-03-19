import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { leads } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import Badge from '../../components/UI/Badge'

export default function LeadDetail() {
  const { id } = useParams()
  const lead = leads.find(l => l.id === +id) || leads[0]
  const [tab, setTab] = useState('details')
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  return (
    <div className="fade-in">
      <PageHeader
        title={lead.name}
        breadcrumb={[{ label: 'Leads', href: '/leads' }, { label: lead.name }]}
        actions={
          <>
            <Badge status={lead.status} />
            <button className="btn-secondary">Edit</button>
            <button className="btn-primary">Convert to Customer</button>
          </>
        }
        tabs={[
          { id: 'details', label: 'Details' },
          { id: 'notes', label: 'Notes' },
          { id: 'calls', label: 'Calls' },
          { id: 'emails', label: 'Emails' },
          { id: 'activity', label: 'Activity' },
        ]}
        activeTab={tab}
        onTabChange={setTab}
      />
      {tab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="stat-card">
              <h3 className="font-semibold mb-4">Lead Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: lead.name },
                  { label: 'Company', value: lead.company || '-' },
                  { label: 'Email', value: lead.email },
                  { label: 'Phone', value: lead.phone },
                  { label: 'Source', value: lead.source },
                  { label: 'Status', value: lead.status },
                  { label: 'Assigned To', value: lead.assigned },
                  { label: 'Created', value: lead.created },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                    <div className="text-sm text-gray-700 mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
              {lead.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400 font-medium mb-1">Notes</div>
                  <p className="text-sm text-gray-700">{lead.notes}</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {['+ Log Call','+ Send Email','+ Add Note','Convert to Customer','Delete Lead'].map(a => (
                  <button key={a} className={`w-full text-left text-sm px-3 py-2 rounded-lg border ${a.includes('Delete') ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{a}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'notes' && (
        <div className="stat-card">
          <h3 className="font-semibold mb-4">Notes</h3>
          <div className="space-y-3 mb-4">
            {notes.length === 0 && <p className="text-sm text-gray-400 italic">No notes yet. Add the first note below.</p>}
            {notes.map((note, i) => (
              <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">{note.text}</p>
                <p className="text-xs text-gray-400 mt-1">{note.time}</p>
              </div>
            ))}
          </div>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Add a note..."
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          />
          <button onClick={() => {
            if (newNote.trim()) { setNotes(prev => [...prev, { text: newNote, time: new Date().toLocaleString() }]); setNewNote('') }
          }} className="btn-primary mt-3">Add Note</button>
        </div>
      )}
    </div>
  )
}