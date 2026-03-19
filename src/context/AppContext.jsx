import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications] = useState([
    { id: 1, type: 'lead', message: 'New lead assigned: Amit Sharma - Sharma & Associates', time: '2 min ago', read: false },
    { id: 2, type: 'invoice', message: 'Invoice INV-000003 is pending payment', time: '15 min ago', read: false },
    { id: 3, type: 'ticket', message: 'Ticket #2 updated by Priya Sharma', time: '1 hr ago', read: true },
    { id: 4, type: 'task', message: 'Task deadline today: Send Invoice INV-000003', time: '2 hr ago', read: true },
    { id: 5, type: 'payment', message: 'Payment received: PAY-003 - Rs 4,500', time: '3 hr ago', read: true },
  ])

  const [currentUser] = useState({
    name: 'Admin User',
    email: 'admin@bluverse.com',
    role: 'Administrator',
    avatar: 'AU'
  })

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, notifications, currentUser }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}