import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, Download, RefreshCw, MoreHorizontal } from 'lucide-react';
import { leads } from '../data/mockData';
import { useApp } from '../context/AppContext';
import DataTable from '../components/ui/DataTable';
import KanbanBoard from '../components/ui/KanbanBoard';
import ViewToggle from '../components/ui/ViewToggle';
import FilterPanel from '../components/ui/FilterPanel';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';

const statusColors = {
  'New': 'z-badge-blue', 'Working': 'z-badge-orange', 'Contacted': 'z-badge-teal',
  'Unqualified': 'z-badge-gray', 'Converted': 'z-badge-green',
};
const ratingColors = { 'Hot': 'z-badge-red', 'Warm': 'z-badge-orange', 'Cold': 'z-badge-gray' };

const kanbanCols = [
  { name: 'New', color: '#3b82f6' }, { name: 'Working', color: '#f97316' },
  { name: 'Contacted', color: '#0891b2' }, { name: 'Unqualified', color: '#9ca3af' },
];

const initForm = { name: '', company: '', email: '', phone: '', status: 'New', source: 'Website', rating: 'Warm', owner: 'Deepan N.', industry: '', city: '', description: '' };

export default function Leads() {
  const navigate = useNavigate();
  const { viewMode } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(initForm);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({});

  const handleFilter = (key, val) => {
    if (key === '__clear__') setFilters({});
    else setFilters(f => ({...f, [key]: val}));
  };

  const filtered = leads.filter(l => {
    if (activeTab === 'my') return l.owner === 'Deepan N.';
    if (activeTab === 'converted') return l.converted;
    if (activeTab === 'new') return l.status === 'New';
    return true;
  }).filter(l => {
    return Object.entries(filters).every(([k, v]) => !v || String(l[k] || '').toLowerCase().includes(v.toLowerCase()));
  });

  const tabs = [
    { id: 'all', label: 'All Leads', count: leads.length },
    { id: 'my', label: 'My Leads', count: leads.filter(l => l.owner === 'Deepan N.').length },
    { id: 'new', label: 'New', count: leads.filter(l => l.status === 'New').length },
    { id: 'converted', label: 'Converted', count: leads.filter(l => l.converted).length },
  ];

  const columns = [
    { label: 'Name', accessor: 'name', render: (v, row) => (
      <button onClick={e => { e.stopPropagation(); navigate(`/leads/${row.id}`); }} className="text-[#0069d9] hover:underline font-medium text-left">{v}</button>
    )},
    { label: 'Company', accessor: 'company' },
    { label: 'Email', accessor: 'email', render: v => <a href={`mailto:${v}`} onClick={e=>e.stopPropagation()} className="text-[#0069d9] hover:underline">{v}</a> },
    { label: 'Phone', accessor: 'phone' },
    { label: 'Lead Source', accessor: 'source' },
    { label: 'Status', accessor: 'status', render: v => <span className={statusColors[v] || 'z-badge-gray'}>{v}</span> },
    { label: 'Rating', accessor: 'rating', render: v => <span className={ratingColors[v] || 'z-badge-gray'}>{v}</span> },
    { label: 'Owner', accessor: 'owner' },
    { label: 'Created', accessor: 'created' },
  ];

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Manage your sales pipeline prospects"
        tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}
        actions={
          <div className="flex items-center gap-2">
            <FilterPanel
              filters={[
                { key: 'status', label: 'Status', type: 'select', options: ['New','Working','Contacted','Unqualified','Converted'] },
                { key: 'rating', label: 'Rating', type: 'select', options: ['Hot','Warm','Cold'] },
                { key: 'source', label: 'Lead Source', type: 'select', options: ['Website','Referral','Cold Call','Social Media','Trade Show','Partner','Email Campaign'] },
                { key: 'owner', label: 'Owner', type: 'text', placeholder: 'Filter by owner...' },
              ]}
              onFilter={handleFilter}
              activeFilters={filters}
            />
            <ViewToggle views={['list','kanban']} />
            <button className="z-btn-secondary text-xs py-1.5"><Upload size={13} /> Import</button>
            <button onClick={() => setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13} /> New Lead</button>
          </div>
        }
      />

      {viewMode === 'kanban' ? (
        <KanbanBoard
          columns={kanbanCols}
          cards={filtered}
          cardKey="id"
          onCardClick={card => navigate(`/leads/${card.id}`)}
          renderCard={(card) => (
            <div>
              <p className="text-sm font-medium text-gray-800 leading-tight">{card.name}</p>
              {card.company && <p className="text-xs text-gray-500 mt-0.5">{card.company}</p>}
              <div className="flex items-center justify-between mt-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${ratingColors[card.rating] || 'z-badge-gray'}`}>{card.rating}</span>
                <span className="text-[10px] text-gray-400">{card.owner}</span>
              </div>
            </div>
          )}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={row => navigate(`/leads/${row.id}`)}
        />
      )}

      {/* Create Lead Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Lead" size="lg"
        footer={<><button onClick={() => setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Full Name *', key: 'name', placeholder: 'First Last' },
            { label: 'Company', key: 'company', placeholder: 'Company name' },
            { label: 'Email', key: 'email', placeholder: 'email@example.com', type: 'email' },
            { label: 'Phone', key: 'phone', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
            { label: 'City', key: 'city', placeholder: 'City' },
            { label: 'Industry', key: 'industry', placeholder: 'Industry' },
          ].map(f => (
            <div key={f.key}>
              <label className="z-label">{f.label}</label>
              <input type={f.type || 'text'} className="z-input text-sm" placeholder={f.placeholder}
                value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} />
            </div>
          ))}
          <div>
            <label className="z-label">Lead Status</label>
            <select className="z-select text-sm" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              {['New','Working','Contacted','Unqualified'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="z-label">Lead Source</label>
            <select className="z-select text-sm" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
              {['Website','Referral','Cold Call','Social Media','Trade Show','Partner','Email Campaign'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="z-label">Rating</label>
            <select className="z-select text-sm" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}>
              {['Hot','Warm','Cold'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="z-label">Lead Owner</label>
            <select className="z-select text-sm" value={form.owner} onChange={e => setForm({...form, owner: e.target.value})}>
              {['Deepan N.','Ravi K.','Priya S.','Ankit M.'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="z-label">Description</label>
            <textarea className="z-textarea text-sm" placeholder="Add notes about this lead..."
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
