import React, { useState } from 'react'
import PageHeader from '../../components/UI/PageHeader'

export default function Media() {
  const [files] = useState([
    { name: 'company-logo.png', type: 'image/png', size: '24 KB', uploaded: '2026-01-15' },
    { name: 'contract-template.pdf', type: 'application/pdf', size: '156 KB', uploaded: '2026-02-01' },
    { name: 'legal-docs.zip', type: 'application/zip', size: '2.3 MB', uploaded: '2026-02-20' },
  ])
  const typeIcon = t => t.includes('image') ? '🖼️' : t.includes('pdf') ? '📄' : t.includes('zip') ? '🗜️' : '📁'
  return (
    <div className="fade-in">
      <PageHeader title="Media Library"
        actions={<button className="btn-primary">⬆ Upload File</button>}
      />
      <div className="stat-card">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map(f => (
            <div key={f.name} className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group">
              <div className="text-3xl mb-2">{typeIcon(f.type)}</div>
              <div className="text-xs font-medium text-gray-700 truncate">{f.name}</div>
              <div className="text-xs text-gray-400 mt-1">{f.size}</div>
              <div className="hidden group-hover:flex gap-1 justify-center mt-2">
                <button className="text-xs text-blue-600 hover:underline">View</button>
                <span className="text-gray-300">|</span>
                <button className="text-xs text-red-500 hover:underline">Del</button>
              </div>
            </div>
          ))}
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-all">
            <div className="text-3xl mb-2 text-gray-400">+</div>
            <div className="text-xs text-gray-400">Upload File</div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}