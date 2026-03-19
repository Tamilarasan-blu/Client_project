import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp } from 'lucide-react';
import { deals, dealStages } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import KanbanBoard from '../components/ui/KanbanBoard';
import ViewToggle from '../components/ui/ViewToggle';
import FilterPanel from '../components/ui/FilterPanel';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { useApp } from '../context/AppContext';

const stageColors = { 'Closed Won':'z-badge-green','Closed Lost':'z-badge-red','Negotiation/Review':'z-badge-orange','Proposal/Price Quote':'z-badge-blue','Qualification':'z-badge-gray','Needs Analysis':'z-badge-teal','Value Proposition':'z-badge-purple' };

export default function Deals() {
  const navigate = useNavigate();
  const { viewMode } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [form, setForm] = useState({ name:'', account:'', contact:'', amount:'', stage:'Qualification', closeDate:'', type:'New Business', owner:'Deepan N.', probability:20, description:'' });

  const filtered = deals.filter(d => {
    if (activeTab === 'my') return d.owner === 'Deepan N.';
    if (activeTab === 'open') return !['Closed Won','Closed Lost'].includes(d.stage);
    if (activeTab === 'won') return d.stage === 'Closed Won';
    if (activeTab === 'lost') return d.stage === 'Closed Lost';
    return true;
  });

  const openDeals = deals.filter(d => !['Closed Won','Closed Lost'].includes(d.stage));
  const totalPipeline = openDeals.reduce((s,d) => s+d.amount, 0);
  const wonDeals = deals.filter(d => d.stage === 'Closed Won');
  const wonValue = wonDeals.reduce((s,d) => s+d.amount, 0);

  const tabs = [
    { id:'all', label:'All Deals', count: deals.length },
    { id:'open', label:'Open', count: openDeals.length },
    { id:'won', label:'Won', count: wonDeals.length },
    { id:'lost', label:'Lost', count: deals.filter(d=>d.stage==='Closed Lost').length },
  ];

  const columns = [
    { label:'Deal Name', accessor:'name', render:(v,row)=><button onClick={e=>{e.stopPropagation();navigate(`/deals/${row.id}`)}} className="text-[#0069d9] hover:underline font-medium text-left">{v}</button> },
    { label:'Account', accessor:'account' },
    { label:'Contact', accessor:'contact' },
    { label:'Amount', accessor:'amount', render:v=><span className="font-semibold text-gray-800">₹{v.toLocaleString()}</span> },
    { label:'Stage', accessor:'stage', render:v=><span className={stageColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Probability', accessor:'probability', render:v=><div className="flex items-center gap-2"><div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{width:v+'%'}}/></div><span className="text-xs text-gray-500">{v}%</span></div> },
    { label:'Close Date', accessor:'closeDate' },
    { label:'Owner', accessor:'owner' },
  ];

  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        {[{label:'Pipeline Value',value:`₹${(totalPipeline/100000).toFixed(1)}L`,sub:openDeals.length+' open deals',color:'blue'},
          {label:'Won This Month',value:`₹${(wonValue/100000).toFixed(1)}L`,sub:wonDeals.length+' deals won',color:'green'},
          {label:'Avg Deal Size',value:`₹${(totalPipeline/Math.max(openDeals.length,1)/100000).toFixed(1)}L`,sub:'Avg of open deals',color:'purple'},
        ].map(k=>(
          <div key={k.label} className="z-card px-4 py-3 flex items-center gap-3">
            <TrendingUp size={18} className={`text-${k.color}-500`} />
            <div><p className="text-xs text-gray-500">{k.label}</p><p className="text-lg font-bold text-gray-800">{k.value}</p><p className="text-xs text-gray-400">{k.sub}</p></div>
          </div>
        ))}
      </div>

      <PageHeader title="Deals" subtitle="Track your sales opportunities"
        tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}
        actions={<div className="flex gap-2"><FilterPanel filters={[{key:'stage',label:'Stage',type:'select',options:dealStages.map(s=>s.name)},{key:'owner',label:'Owner',type:'text'}]} onFilter={()=>{}} activeFilters={{}} /><ViewToggle views={['list','kanban']} /><button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Deal</button></div>}
      />

      {viewMode==='kanban'?(
        <KanbanBoard
          columns={dealStages.filter(s=>s.name!=='Closed Lost')}
          cards={filtered}
          cardKey="id"
          onCardClick={d=>navigate(`/deals/${d.id}`)}
          renderCard={(d,col)=>(
            <div>
              <p className="text-sm font-medium text-gray-800 leading-tight">{d.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{d.account}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-semibold text-green-600">₹{(d.amount/100000).toFixed(1)}L</span>
                <span className="text-xs text-gray-400">{d.closeDate}</span>
              </div>
            </div>
          )}
        />
      ):(
        <DataTable columns={columns} data={filtered} onRowClick={row=>navigate(`/deals/${row.id}`)} />
      )}

      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Deal" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="z-label">Deal Name *</label><input className="z-input text-sm" placeholder="Enter deal name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
          {[{label:'Account',key:'account'},{label:'Contact',key:'contact'},{label:'Close Date *',key:'closeDate',type:'date'}].map(f=>(
            <div key={f.key}><label className="z-label">{f.label}</label><input type={f.type||'text'} className="z-input text-sm" value={form[f.key]||''} onChange={e=>setForm({...form,[f.key]:e.target.value})} /></div>
          ))}
          <div><label className="z-label">Amount (₹)</label><input type="number" className="z-input text-sm" placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} /></div>
          <div><label className="z-label">Stage</label><select className="z-select text-sm" value={form.stage} onChange={e=>setForm({...form,stage:e.target.value})}>{dealStages.map(s=><option key={s.name}>{s.name}</option>)}</select></div>
          <div><label className="z-label">Probability (%)</label><input type="number" className="z-input text-sm" min="0" max="100" value={form.probability} onChange={e=>setForm({...form,probability:Number(e.target.value)})} /></div>
          <div><label className="z-label">Deal Type</label><select className="z-select text-sm" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{['New Business','Existing Business','Renewal','Upsell'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label className="z-label">Owner</label><select className="z-select text-sm" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}>{['Deepan N.','Ravi K.','Priya S.'].map(o=><option key={o}>{o}</option>)}</select></div>
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={2} placeholder="Deal notes..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
        </div>
      </Modal>
    </div>
  );
}
