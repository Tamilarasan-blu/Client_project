import React from 'react'

export default function StatCard({ label, value, color = 'blue', subtitle, onClick }) {
  const colorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-500',
    purple: 'text-purple-600',
    gray: 'text-gray-600',
    teal: 'text-teal-600',
  }
  return (
    <div
      className={`stat-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`text-2xl font-bold ${colorMap[color] || colorMap.blue}`}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
    </div>
  )
}