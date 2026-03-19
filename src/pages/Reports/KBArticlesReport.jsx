import React from 'react'
import { knowledgeBase } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

export default function KBArticlesReport() {
  const totalViews = knowledgeBase.reduce((s, a) => s + a.views, 0)
  const published = knowledgeBase.filter(a => a.status === 'Published').length
  return (
    <div className="fade-in">
      <PageHeader title="Knowledge Base Articles Report" subtitle="Analytics for knowledge base articles" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Articles', value: knowledgeBase.length, color: 'text-gray-800' },
          { label: 'Published', value: published, color: 'text-green-600' },
          { label: 'Drafts', value: knowledgeBase.length - published, color: 'text-orange-500' },
          { label: 'Total Views', value: totalViews.toLocaleString(), color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Article</th><th>Group</th><th>Status</th><th>Published</th><th>Views</th><th>Popularity</th></tr></thead>
          <tbody>
            {knowledgeBase.sort((a, b) => b.views - a.views).map(article => (
              <tr key={article.id}>
                <td className="font-medium">{article.title}</td>
                <td>{article.group}</td>
                <td><span className={`badge ${article.status === 'Published' ? 'badge-success' : 'badge-gray'}`}>{article.status}</span></td>
                <td>{article.datePublished}</td>
                <td className="font-semibold">{article.views}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar w-24"><div className="progress-fill bg-blue-500" style={{ width: (article.views / Math.max(...knowledgeBase.map(a => a.views)) * 100) + '%' }}></div></div>
                    <span className="text-xs text-gray-500">{(article.views / Math.max(...knowledgeBase.map(a => a.views)) * 100).toFixed(0)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}