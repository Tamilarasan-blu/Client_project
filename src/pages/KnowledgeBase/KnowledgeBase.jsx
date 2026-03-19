import React, { useState } from 'react'
import { knowledgeBase as kbData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'
import DataTable from '../../components/UI/DataTable'
import Badge from '../../components/UI/Badge'
import Modal from '../../components/UI/Modal'

export default function KnowledgeBase() {
  const [showModal, setShowModal] = useState(false)
  const [view, setView] = useState('list')
  const columns = [
    { key: 'title', label: 'Article Name', render: v => <span className="font-medium text-blue-600">{v}</span> },
    { key: 'group', label: 'Group' },
    { key: 'datePublished', label: 'Date Published' },
    { key: 'views', label: 'Views', render: v => <span className="font-semibold">{v}</span> },
    { key: 'status', label: 'Status', badge: true },
  ]
  return (
    <div className="fade-in">
      <PageHeader title="Knowledge Base"
        subtitle={
          <div className="flex gap-3 text-sm mt-1">
            <a href="#" className="text-blue-600 hover:underline">Groups →</a>
            <button onClick={() => setView(view === 'list' ? 'kanban' : 'list')} className="text-blue-600 hover:underline">
              {view === 'list' ? 'View Kanban' : 'View List'}
            </button>
          </div>
        }
        actions={<><button onClick={() => setShowModal(true)} className="btn-primary">+ New Article</button><button className="btn-secondary">▼ Filters</button></>}
      />
      {view === 'kanban' ? (
        <div className="kanban-board">
          {['Company Law','GST','IP Law','Tax','Startups'].map(group => (
            <div key={group} className="kanban-col">
              <div className="kanban-col-header">
                <span>{group}</span>
                <span className="badge badge-info">{kbData.filter(a => a.group === group).length}</span>
              </div>
              <div className="kanban-cards">
                {kbData.filter(a => a.group === group).map(article => (
                  <div key={article.id} className="kanban-card">
                    <div className="font-medium text-sm text-gray-800 mb-2">{article.title}</div>
                    <div className="flex justify-between items-center">
                      <Badge status={article.status} />
                      <span className="text-xs text-gray-400">👁 {article.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable columns={columns} data={kbData} />
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Article"
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary">Save Article</button></>}
      >
        <div className="space-y-4">
          <div className="form-group"><label className="form-label">Article Title</label><input className="form-control" placeholder="Enter article title" /></div>
          <div className="form-group"><label className="form-label">Group</label><select className="form-control"><option>Company Law</option><option>GST</option><option>IP Law</option><option>Tax</option><option>Startups</option></select></div>
          <div className="form-group"><label className="form-label">Status</label><select className="form-control"><option>Draft</option><option>Published</option></select></div>
          <div className="form-group"><label className="form-label">Article Content</label><textarea className="form-control" rows={8} placeholder="Write your article content here..." /></div>
        </div>
      </Modal>
    </div>
  )
}