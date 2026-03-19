import React, { useState } from 'react'
import PageHeader from '../../components/UI/PageHeader'

const sections = {
  General: [
    { id: 'general', label: 'General', icon: '⚙️', desc: 'App name, domain, RTL settings' },
    { id: 'company', label: 'Company Information', icon: '🏢', desc: 'Company name, address, logo' },
    { id: 'localization', label: 'Localization', icon: '🌐', desc: 'Timezone, currency, date format' },
    { id: 'email', label: 'Email', icon: '📧', desc: 'SMTP settings and email templates' },
    { id: 'update', label: 'System Update', icon: '🔧', desc: 'Check for and install updates' },
    { id: 'server', label: 'System/Server Info', icon: '🖥️', desc: 'Server configuration and info' },
  ],
  Finance: [
    { id: 'finGeneral', label: 'General', icon: '💰', desc: 'Tax rates, discount settings' },
    { id: 'invoices', label: 'Invoices', icon: '📄', desc: 'Invoice prefix, starting number, terms' },
    { id: 'proposals', label: 'Proposals', icon: '📋', desc: 'Proposal settings and templates' },
    { id: 'estimates', label: 'Estimates', icon: '📝', desc: 'Estimate prefix and settings' },
    { id: 'creditNotes', label: 'Credit Notes', icon: '📃', desc: 'Credit note settings' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '🔄', desc: 'Stripe and subscription settings' },
    { id: 'paymentGateways', label: 'Payment Gateways', icon: '💳', desc: 'Configure Stripe, PayPal, Razorpay' },
  ],
  Features: [
    { id: 'customers', label: 'Customers', icon: '👥', desc: 'Customer portal and contact settings' },
    { id: 'tasks', label: 'Tasks', icon: '✅', desc: 'Task settings and workflows' },
    { id: 'support', label: 'Support', icon: '🎯', desc: 'Ticket settings and departments' },
    { id: 'leads', label: 'Leads', icon: '⭐', desc: 'Lead capture and assignment rules' },
  ],
  Integrations: [
    { id: 'google', label: 'Google', icon: '🔍', desc: 'Google OAuth and Maps integration' },
    { id: 'pusher', label: 'Pusher.com', icon: '📡', desc: 'Real-time notifications via Pusher' },
    { id: 'ai', label: 'AI Integration', icon: '🤖', desc: 'AI tools and assistants' },
  ],
  Other: [
    { id: 'calendar', label: 'Calendar', icon: '📅', desc: 'Calendar event types and settings' },
    { id: 'pdf', label: 'PDF', icon: '📑', desc: 'PDF template settings' },
    { id: 'esign', label: 'E-Sign', icon: '✍️', desc: 'Electronic signature settings' },
    { id: 'tags', label: 'Tags', icon: '🏷️', desc: 'Manage tags used across CRM' },
    { id: 'sms', label: 'SMS', icon: '📱', desc: 'SMS gateway configuration' },
    { id: 'misc', label: 'Misc', icon: '🔩', desc: 'Miscellaneous settings' },
    { id: 'cron', label: 'Cron Job', icon: '⏰', desc: 'Scheduled task settings' },
  ]
}

const sectionSettings = {
  general: [
    { label: 'Company Main Domain', type: 'text', placeholder: 'https://yourcompany.com' },
    { label: 'RTL Admin Area (Right to Left)', type: 'radio', options: ['Yes', 'No'] },
    { label: 'RTL Customers Area (Right to Left)', type: 'radio', options: ['Yes', 'No'] },
    { label: 'Allowed File Types', type: 'text', placeholder: 'jpg,jpeg,png,pdf,doc' },
  ],
  company: [
    { label: 'Company Name', type: 'text', placeholder: 'bluverse Pvt. Ltd.' },
    { label: 'Address', type: 'textarea' },
    { label: 'City', type: 'text' },
    { label: 'State', type: 'text' },
    { label: 'Country', type: 'text', placeholder: 'India' },
    { label: 'Phone', type: 'text' },
    { label: 'Email', type: 'email' },
    { label: 'Website', type: 'text' },
    { label: 'VAT/GST Number', type: 'text' },
  ],
  localization: [
    { label: 'Timezone', type: 'select', options: ['Asia/Kolkata (IST)','UTC','America/New_York','Europe/London'] },
    { label: 'Currency', type: 'select', options: ['INR - Indian Rupee','USD - US Dollar','EUR - Euro','GBP - British Pound'] },
    { label: 'Currency Symbol', type: 'text', placeholder: '₹' },
    { label: 'Date Format', type: 'select', options: ['YYYY-MM-DD','DD/MM/YYYY','MM/DD/YYYY','DD-MM-YYYY'] },
    { label: 'Language', type: 'select', options: ['English','Hindi','Spanish','French','German'] },
  ],
  email: [
    { label: 'SMTP Host', type: 'text', placeholder: 'smtp.gmail.com' },
    { label: 'SMTP Port', type: 'text', placeholder: '587' },
    { label: 'SMTP Username', type: 'text' },
    { label: 'SMTP Password', type: 'password' },
    { label: 'From Email', type: 'email' },
    { label: 'From Name', type: 'text' },
    { label: 'Encryption', type: 'select', options: ['TLS','SSL','None'] },
  ],
  invoices: [
    { label: 'Invoice Prefix', type: 'text', placeholder: 'INV-' },
    { label: 'Next Invoice Number', type: 'number', placeholder: '88' },
    { label: 'Payment Terms', type: 'number', placeholder: '30 (days)' },
    { label: 'Invoice Due Date', type: 'select', options: ['30 Days','15 Days','60 Days','90 Days','Custom'] },
    { label: 'Default Notes', type: 'textarea' },
    { label: 'Default Terms', type: 'textarea' },
  ],
  paymentGateways: [
    { label: 'Stripe Publishable Key', type: 'text' },
    { label: 'Stripe Secret Key', type: 'password' },
    { label: 'PayPal Client ID', type: 'text' },
    { label: 'PayPal Secret', type: 'password' },
    { label: 'Razorpay Key ID', type: 'text' },
    { label: 'Razorpay Secret', type: 'password' },
  ],
}

export default function Setup() {
  const [activeSection, setActiveSection] = useState('general')
  const [formValues, setFormValues] = useState({})
  const currentSettings = sectionSettings[activeSection] || []

  return (
    <div className="fade-in">
      <PageHeader title="Setup" subtitle="Configure your CRM system" />
      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="stat-card p-0 overflow-hidden">
            {Object.entries(sections).map(([groupName, items]) => (
              <div key={groupName}>
                <div className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-200">{groupName}</div>
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors border-b border-gray-50 last:border-0 ${activeSection === item.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Settings Content */}
        <div className="flex-1">
          <div className="stat-card">
            {Object.values(sections).flat().find(s => s.id === activeSection) && (
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">{Object.values(sections).flat().find(s => s.id === activeSection)?.label}</h2>
                <p className="text-sm text-gray-400 mt-1">{Object.values(sections).flat().find(s => s.id === activeSection)?.desc}</p>
              </div>
            )}
            {currentSettings.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSettings.map(setting => (
                    <div key={setting.label} className={`form-group ${setting.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                      <label className="form-label">{setting.label}</label>
                      {setting.type === 'textarea' ? (
                        <textarea className="form-control" rows={3} placeholder={setting.placeholder} />
                      ) : setting.type === 'select' ? (
                        <select className="form-control">
                          {(setting.options || []).map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : setting.type === 'radio' ? (
                        <div className="flex gap-4 mt-1">
                          {(setting.options || []).map(o => (
                            <label key={o} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name={setting.label} value={o} className="text-blue-600" />
                              <span className="text-sm text-gray-700">{o}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input type={setting.type || 'text'} className="form-control" placeholder={setting.placeholder || ''} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="btn-primary">Save Settings</button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔧</div>
                <div className="empty-state-title">Configure {Object.values(sections).flat().find(s => s.id === activeSection)?.label}</div>
                <div className="empty-state-desc">Settings for this section are available in the full version.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}