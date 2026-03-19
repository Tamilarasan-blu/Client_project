import React from 'react'
import { activityLog as logData } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

const typeColors = {
  lead: 'bg-blue-100 text-blue-700',
  invoice: 'bg-green-100 text-green-700',
  customer: 'bg-purple-100 text-purple-700',
  payment: 'bg-teal-100 text-teal-700',
}

export default function ActivityLog() {
  return (
    <div className="fade-in">
      <PageHeader title="Activity Log" subtitle="Track all system and user activities" />
      <div className="stat-card">
        <div className="space-y-4">
          {logData.map(log => (
            <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${typeColors[log.type] || 'bg-gray-100 text-gray-700'}`}>
                {log.user.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">{log.user}</span>
                  <span className="text-sm text-gray-600">{log.action}</span>
                  <span className="text-sm font-medium text-blue-600">{log.details}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}