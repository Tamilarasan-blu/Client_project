import React, { useState } from 'react'
import Badge from './Badge'

export default function DataTable({ columns, data, searchable = true, pageSize = 25, onRowClick, emptyMessage = 'No entries found' }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [perPage, setPerPage] = useState(pageSize)

  const filtered = data.filter(row => {
    if (!search) return true
    return Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  })

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol]
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  }) : filtered

  const totalPages = Math.ceil(sorted.length / perPage)
  const paged = sorted.slice((page - 1) * perPage, page * perPage)

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <select value={perPage} onChange={e => { setPerPage(+e.target.value); setPage(1); }} className="form-control w-20">
            {[10,25,50,100].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <button className="btn-secondary text-sm">Export</button>
          <button className="btn-secondary text-sm">⟳</button>
        </div>
        {searchable && (
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="search-input"
            />
          </div>
        )}
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" /></th>
              {columns.map(col => (
                <th key={col.key} onClick={() => { setSortCol(col.key); setSortDir(sortCol === col.key && sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer select-none">
                  {col.label} {sortCol === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="text-center py-12 text-gray-400">{emptyMessage}</td></tr>
            ) : paged.map((row, idx) => (
              <tr key={row.id || idx} onClick={() => onRowClick && onRowClick(row)} className={onRowClick ? 'cursor-pointer' : ''}>
                <td><input type="checkbox" onClick={e => e.stopPropagation()} /></td>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : (
                      col.badge ? <Badge status={row[col.key]}>{row[col.key]}</Badge> : row[col.key] || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>Showing {paged.length > 0 ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, sorted.length)} of {sorted.length} entries</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">Previous</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded border ${page === p ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">Next</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages || totalPages === 0} className="px-2 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">»</button>
        </div>
      </div>
    </div>
  )
}