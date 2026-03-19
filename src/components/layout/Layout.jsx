import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Overlay — visible only on tablet/mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <TopBar onMenuToggle={toggleSidebar} />
        <div className="page-content" style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
