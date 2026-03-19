import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { path: '/customers', label: 'Customers', icon: '👥' },
  {
    label: 'Sales', icon: '⚡', children: [
      { path: '/sales/proposals', label: 'Proposals' },
      { path: '/sales/estimates', label: 'Estimates' },
      { path: '/sales/invoices', label: 'Invoices' },
      { path: '/sales/recurring-invoices', label: 'Recurring Invoices' },
      { path: '/sales/payments', label: 'Payments' },
      { path: '/sales/credit-notes', label: 'Credit Notes' },
      { path: '/sales/items', label: 'Items' },
    ]
  },
  { path: '/subscriptions', label: 'Subscriptions', icon: '🔄' },
  { path: '/expenses', label: 'Expenses', icon: '💰' },
  { path: '/contracts', label: 'Contracts', icon: '📋' },
  { path: '/projects', label: 'Projects', icon: '📁' },
  { path: '/tasks', label: 'Tasks', icon: '✅' },
  { path: '/support', label: 'Support', icon: '🎯' },
  { path: '/leads', label: 'Leads', icon: '⭐' },
  { path: '/estimate-request', label: 'Estimate Request', icon: '📝' },
  { path: '/knowledge-base', label: 'Knowledge Base', icon: '❓' },
  {
    label: 'Utilities', icon: '🔧', children: [
      { path: '/utilities/media', label: 'Media' },
      { path: '/utilities/bulk-pdf', label: 'Bulk PDF Export' },
      { path: '/utilities/calendar', label: 'Calendar' },
      { path: '/utilities/announcements', label: 'Announcements' },
      { path: '/utilities/activity-log', label: 'Activity Log' },
      { path: '/utilities/ticket-pipe-log', label: 'Ticket Pipe Log' },
    ]
  },
  {
    label: 'Reports', icon: '📊', children: [
      { path: '/reports/sales', label: 'Sales' },
      { path: '/reports/expenses', label: 'Expenses' },
      { path: '/reports/expenses-vs-income', label: 'Expenses vs Income' },
      { path: '/reports/leads', label: 'Leads' },
      { path: '/reports/timesheets', label: 'Timesheets Overview' },
      { path: '/reports/kb-articles', label: 'KB Articles' },
    ]
  },
  { path: '/setup', label: 'Setup', icon: '⚙️' },
]

// Styles as plain objects — no template literals, no conditional class bugs
const styles = {
  aside: {
    background: '#1c2333',
    width: '240px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  },
  logoArea: {
    padding: '20px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  userArea: {
    padding: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  navArea: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: '8px',
    paddingBottom: '16px',
  },
  navItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 16px',
    fontSize: '13px',
    color: active ? '#fff' : '#9ca3af',
    background: active ? '#3b5bdb' : 'transparent',
    borderRight: active ? '3px solid #93c5fd' : '3px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    boxSizing: 'border-box',
  }),
  navItemHover: {
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
  },
  parentItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 16px',
    fontSize: '13px',
    color: active ? '#fff' : '#9ca3af',
    background: active ? 'rgba(59,91,219,0.15)' : 'transparent',
    cursor: 'pointer',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.15s',
  }),
  childItem: (active) => ({
    display: 'block',
    padding: '7px 16px 7px 42px',
    fontSize: '13px',
    color: active ? '#60a5fa' : '#6b7280',
    background: active ? 'rgba(59,130,246,0.08)' : 'transparent',
    borderRight: active ? '2px solid #60a5fa' : '2px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
    width: '100%',
    boxSizing: 'border-box',
  }),
  subList: {
    background: 'rgba(0,0,0,0.15)',
    overflow: 'hidden',
  },
  arrow: (open) => ({
    fontSize: '10px',
    color: '#6b7280',
    transition: 'transform 0.2s',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
    display: 'inline-block',
    flexShrink: 0,
  }),
  icon: {
    fontSize: '15px',
    width: '18px',
    textAlign: 'center',
    flexShrink: 0,
  },
}

function NavItem({ item }) {
  const location = useLocation()
  const hasChildren = Boolean(item.children && item.children.length > 0)
  const isChildActive = hasChildren ? item.children.some(c => location.pathname === c.path || location.pathname.startsWith(c.path + '/')) : false
  const [open, setOpen] = useState(isChildActive)
  const [hovered, setHovered] = useState(false)

  if (hasChildren) {
    return (
      <li style={{ listStyle: 'none' }}>
        <button
          style={{ ...styles.parentItem(isChildActive), ...(hovered ? { background: 'rgba(255,255,255,0.06)', color: '#fff' } : {}) }}
          onClick={() => setOpen(prev => !prev)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          type="button"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </span>
          <span style={styles.arrow(open)}>&#9654;</span>
        </button>
        {open && (
          <ul style={{ ...styles.subList, margin: 0, padding: 0 }}>
            {item.children.map(child => {
              const childActive = location.pathname === child.path || location.pathname.startsWith(child.path + '/')
              return (
                <li key={child.path} style={{ listStyle: 'none' }}>
                  <NavLink
                    to={child.path}
                    style={({ isActive }) => styles.childItem(isActive)}
                  >
                    {child.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li style={{ listStyle: 'none' }}>
      <NavLink
        to={item.path}
        style={({ isActive }) => ({
          ...styles.navItem(isActive),
          ...(hovered && !location.pathname.startsWith(item.path.replace('/', '') === 'dashboard' ? item.path : item.path) ? styles.navItemHover : {}),
        })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={styles.icon}>{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  const { currentUser } = useApp()
  return (
    <aside style={styles.aside}>
      {/* Logo */}
      <div style={styles.logoArea}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#3b5bdb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>LW</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Bluverse CRM</div>
            <div style={{ color: '#6b7280', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</div>
          </div>
        </div>
      </div>

      {/* User profile */}
      <div style={styles.userArea}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{currentUser.avatar}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#e5e7eb', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
            <div style={{ color: '#6b7280', fontSize: '11px' }}>{currentUser.role}</div>
          </div>
        </div>
      </div>

      {/* Navigation — scrollable */}
      <nav style={styles.navArea}>
        <ul style={{ margin: 0, padding: 0 }}>
          {navItems.map((item, idx) => (
            <NavItem key={item.path || (item.label + idx)} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}