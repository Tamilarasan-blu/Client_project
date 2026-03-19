import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function TopBar({ onMenuToggle }) {
  const { notifications, currentUser } = useApp()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const navigate = useNavigate()
  const unread = notifications.filter(n => !n.read).length

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQ.trim()) {
      navigate('/leads?q=' + encodeURIComponent(searchQ))
      setShowMobileSearch(false)
    }
  }

  return (
    <>
      <header className="topbar flex items-center justify-between px-4 md:px-6">
        {/* Left side — hamburger (mobile/tablet) + search (desktop) */}
        <div className="flex items-center gap-3">
          {/* Hamburger — hidden on desktop */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>☰</span>
          </button>

          {/* Search — hidden on mobile, visible md+ */}
          <div className="relative hidden md:block topbar-search">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search customers, leads, invoices..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 lg:w-80 focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setShowMobileSearch(prev => !prev)}
            aria-label="Search"
          >
            🔍
          </button>

          {/* Settings — hidden on small mobile */}
          <a
            href="/setup"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ⚙️ <span className="hidden lg:inline">Settings</span>
          </a>

          {/* Icon buttons — hidden on smallest screens */}
          <button className="hidden sm:flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Share">↗️</button>
          <button className="hidden sm:flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Tasks">☑️</button>
          <button className="hidden md:flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Clock">⏱️</button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false) }}
              className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              🔔
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">{unread}</span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                style={{ width: 'min(320px, calc(100vw - 24px))' }}>
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Notifications</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-gray-700">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center text-xs text-blue-600 cursor-pointer hover:underline">View all notifications</div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false) }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{currentUser.avatar}</div>
              <span className="text-sm text-gray-700 font-medium hidden md:block">{currentUser.name.split(' ')[0]}</span>
              <span className="text-gray-400 text-xs hidden sm:block">▼</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">👤 My Profile</button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">⏱️ My Timesheets</button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">✏️ Edit Profile</button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">🚪 Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search bar — slides down when toggled */}
      {showMobileSearch && (
        <div className="md:hidden px-4 py-2 bg-white border-b border-gray-200">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search customers, leads, invoices..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>
      )}
    </>
  )
}
