import React from 'react'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumb, actions, tabs, activeTab, onTabChange }) {
  return (
    <div className="mb-6">
      {breadcrumb && (
        <div className="breadcrumb mb-1">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-400">›</span>}
              {b.href ? <Link to={b.href}>{b.label}</Link> : <span className="text-gray-500">{b.label}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      {tabs && (
        <div className="tab-nav mt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange(tab.id)}
            >
              {tab.label}
              {tab.count !== undefined && <span className="count">{tab.count}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}