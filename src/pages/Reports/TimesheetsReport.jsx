import React, { useState } from 'react'
import { staffTimesheets } from '../../data/mockData'
import PageHeader from '../../components/UI/PageHeader'

export default function TimesheetsReport() {
  const [view, setView] = useState('overview')
  return (
    <div className="fade-in">
      <PageHeader title="Timesheets Overview"
        actions={
          <select value={view} onChange={e => setView(e.target.value)} className="form-control w-36">
            <option value="overview">Overview</option>
            <option value="all">All Timesheets</option>
          </select>
        }
      />
      <div className="stat-card mb-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Hours', value: '80', color: 'text-blue-600' },
            { label: 'Billable Hours', value: '65', color: 'text-green-600' },
            { label: 'Non-Billable', value: '15', color: 'text-orange-500' },
            { label: 'Active Staff', value: '2', color: 'text-purple-600' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Staff Member</th><th>Total Hours</th><th>Billable Hours</th><th>Task</th><th>Date</th><th>Time</th><th>Note</th></tr></thead>
          <tbody>
            {staffTimesheets.map(t => (
              <tr key={t.id}>
                <td className="font-medium">{t.staff}</td>
                <td>{t.totalHours}h</td>
                <td className="text-green-600 font-medium">{t.billableHours}h</td>
                <td>{t.task}</td>
                <td>{t.date}</td>
                <td>{t.startTime} - {t.endTime}</td>
                <td className="text-gray-500 text-xs">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}