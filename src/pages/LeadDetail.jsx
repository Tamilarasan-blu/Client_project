import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail, Globe, MapPin, User, Building2, TrendingUp, ChevronRight, CheckSquare, Calendar, MessageSquare, Star, RefreshCw } from 'lucide-react';
import { leads } from '../data/mockData';

const tabs = ['Details', 'Activities', 'Timeline', 'Related'];

function Section({ title, children }) {
  return (
    <div className="z-card p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, link }) {
  return (
    <div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 w-36 shrink-0">{label}</span>
      {link ? <a href={link} className="text-xs text-[#0069d9] hover:underline flex-1">{value || '—'}</a>
        : <span className="text-xs text-gray-700 flex-1">{value || '—'}</span>}
    </div>
  );
}

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lead = leads.find(l => l.id === Number(id));
  const [activeTab, setActiveTab] = useState('Details');

  if (!lead) return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-gray-500">Lead not found</p>
      <button onClick={() => navigate('/leads')} className="z-btn-primary mt-3 text-sm">Back to Leads</button>
    </div>
  );

  const ratingColor = lead.rating === 'Hot' ? 'text-red-500' : lead.rating === 'Warm' ? 'text-orange-500' : 'text-gray-400';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <button onClick={() => navigate('/leads')} className="hover:text-blue-600 flex items-center gap-1"><ArrowLeft size={12} /> Leads</button>
        <ChevronRight size={12} />
        <span className="text-gray-600">{lead.name}</span>
      </div>

      {/* Header Card */}
      <div className="z-card p-5 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
              {lead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">{lead.name}</h1>
                <Star size={16} className={`fill-current ${ratingColor}`} />
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lead.converted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {lead.converted ? 'Converted' : lead.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{lead.company || 'No company'} {lead.industry ? `· ${lead.industry}` : ''}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                {lead.email && <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-blue-600 hover:underline"><Mail size={12} />{lead.email}</a>}
                {lead.phone && <span className="flex items-center gap-1"><Phone size={12} />{lead.phone}</span>}
                {lead.city && <span className="flex items-center gap-1"><MapPin size={12} />{lead.city}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="z-btn-secondary text-xs py-1.5"><Phone size={13} /> Call</button>
            <button className="z-btn-secondary text-xs py-1.5"><Mail size={13} /> Email</button>
            <button className="z-btn-primary text-xs py-1.5"><TrendingUp size={13} /> Convert</button>
            <button className="z-btn-ghost text-xs py-1.5 px-2"><Edit size={13} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-4 border-b border-gray-200 -mb-5 -mx-5 px-5">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#0069d9] text-[#0069d9]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4">
            <Section title="Lead Information">
              <Field label="Lead Name" value={lead.name} />
              <Field label="Company" value={lead.company} />
              <Field label="Email" value={lead.email} link={`mailto:${lead.email}`} />
              <Field label="Phone" value={lead.phone} />
              <Field label="Mobile" value={lead.phone} />
              <Field label="Website" value={lead.company ? `www.${lead.company.toLowerCase().replace(/\s+/g,'')}.com` : null} />
            </Section>
            <Section title="Lead Status">
              <Field label="Lead Status" value={lead.status} />
              <Field label="Lead Source" value={lead.source} />
              <Field label="Rating" value={lead.rating} />
              <Field label="Campaign" value={lead.campaign} />
              <Field label="Converted" value={lead.converted ? 'Yes' : 'No'} />
            </Section>
            <Section title="Address">
              <Field label="City" value={lead.city} />
              <Field label="Country" value="India" />
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Section title="Lead Details">
              <Field label="Industry" value={lead.industry} />
              <Field label="No. of Employees" value={lead.noOfEmployees?.toLocaleString()} />
              <Field label="Annual Revenue" value={lead.annualRevenue ? `₹${lead.annualRevenue.toLocaleString()}` : null} />
              <Field label="Lead Owner" value={lead.owner} />
              <Field label="Created" value={lead.created} />
            </Section>
            <Section title="Description">
              <p className="text-xs text-gray-600 leading-relaxed">{lead.description || 'No description added.'}</p>
            </Section>
            <Section title="Quick Actions">
              <div className="space-y-2">
                {[
                  { icon: Phone, label: 'Log a Call' },
                  { icon: CheckSquare, label: 'Add Task' },
                  { icon: Calendar, label: 'Schedule Meeting' },
                  { icon: MessageSquare, label: 'Send Email' },
                ].map(action => (
                  <button key={action.label} className="flex items-center gap-2.5 w-full px-3 py-2 rounded text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100 hover:border-blue-200">
                    <action.icon size={13} className="text-gray-400" />
                    {action.label}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        </div>
      )}

      {activeTab === 'Activities' && (
        <div className="z-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Activities</h3>
            <button className="z-btn-primary text-xs py-1.5"><CheckSquare size={13} /> Add Activity</button>
          </div>
          <p className="text-sm text-gray-400 text-center py-8">No activities recorded yet.</p>
        </div>
      )}

      {activeTab === 'Timeline' && (
        <div className="z-card p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Lead Timeline</h3>
          <div className="space-y-4">
            {[
              { action: 'Lead created', time: lead.created, user: lead.owner, icon: User },
              { action: `Lead status changed to "${lead.status}"`, time: lead.created, user: lead.owner, icon: RefreshCw },
              { action: 'Lead assigned to ' + lead.owner, time: lead.created, user: 'System', icon: User },
            ].map((item, i) => (
              <div key={i} className="z-timeline-item">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 z-10 relative">
                  <item.icon size={13} className="text-blue-500" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-700">{item.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time} · by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
