import React, { useState } from 'react'
import PageHeader from '../../components/UI/PageHeader'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Calendar() {
  const [date, setDate] = useState(new Date(2026, 2, 1))
  const [view, setView] = useState('month')
  const today = new Date(2026, 2, 18)

  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, current: false })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true })
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, current: false })

  const events = [
    { date: 18, label: 'Client Meeting - Anand', color: 'bg-blue-100 text-blue-700' },
    { date: 25, label: 'Holi - Office Closed', color: 'bg-orange-100 text-orange-700' },
  ]

  return (
    <div className="fade-in">
      <PageHeader title="Calendar"
        actions={
          <div className="flex gap-2">
            {['Month','Week','Day'].map(v => (
              <button key={v} onClick={() => setView(v.toLowerCase())} className={`btn-secondary ${view === v.toLowerCase() ? 'bg-blue-600 text-white border-blue-600' : ''}`}>{v}</button>
            ))}
            <button className="btn-secondary">Filter By</button>
          </div>
        }
      />
      <div className="stat-card">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setDate(new Date(year, month - 1, 1))} className="btn-secondary px-3">‹</button>
          <h2 className="text-xl font-bold text-gray-800">{MONTHS[month]} {year}</h2>
          <div className="flex gap-2">
            <button onClick={() => setDate(today)} className="btn-secondary">Today</button>
            <button onClick={() => setDate(new Date(year, month + 1, 1))} className="btn-secondary px-3">›</button>
          </div>
        </div>
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 border-t border-l border-gray-200">
          {cells.map((cell, idx) => {
            const isToday = cell.current && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const cellEvents = events.filter(e => e.date === cell.day && cell.current)
            return (
              <div key={idx} className={`border-b border-r border-gray-200 min-h-24 p-1 ${cell.current ? 'bg-white hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'}`}>
                <div className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : cell.current ? 'text-gray-700' : 'text-gray-300'}`}>
                  {cell.day}
                </div>
                {cellEvents.map((e, i) => (
                  <div key={i} className={`text-xs px-1 py-0.5 rounded mt-0.5 truncate ${e.color}`}>{e.label}</div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}