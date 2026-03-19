import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload } from 'lucide-react';
import { accounts } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
const ratingColors = { Hot:'z-badge-red', Warm:'z-badge-orange', Cold:'z-badge-gray' };
const typeColors = { Customer:'z-badge-green', Partner:'z-badge-blue', Prospect:'z-badge-purple' };
export default function Accounts() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({name:'',phone:'',website:'',industry:'Technology',employees:'',type:'Prospect',owner:'Deepan N.'});
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab==='my'?accounts.filter(a=>a.owner==='Deepan N.'):accounts;
  const columns = [
    { label:'Account Name', accessor:'name', render:(v,row)=><button onClick={e=>{e.stopPropagation();navigate(`/accounts/${row.id}`)}} className="text-[#0069d9] hover:underline font-medium">{v}</button> },
    { label:'Phone', accessor:'phone' },
    { label:'Website', accessor:'website', render:v=>v?<a href={v} onClick={e=>e.stopPropagation()} className="text-[#0069d9] hover:underline">{v}</a>:'—' },
    { label:'Industry', accessor:'industry' },
    { label:'Employees', accessor:'employees', render:v=>v?.toLocaleString() },
    { label:'Annual Revenue', accessor:'annualRevenue', render:v=><span className="text-green-700 font-medium">₹{(v/100000).toFixed(1)}L</span> },
    { label:'Type', accessor:'type', render:v=><span className={typeColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Rating', accessor:'rating', render:v=><span className={ratingColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Owner', accessor:'owner' },
  ];
  return (
    <div>
      <PageHeader title="Accounts" subtitle="Companies and organizations"
        tabs={[{id:'all',label:'All Accounts',count:accounts.length},{id:'my',label:'My Accounts',count:accounts.filter(a=>a.owner==='Deepan N.').length}]}
        activeTab={activeTab} onTabChange={setActiveTab}
        actions={<div className="flex gap-2"><button className="z-btn-secondary text-xs py-1.5"><Upload size={13}/> Import</button><button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Account</button></div>}
      />
      <DataTable columns={columns} data={filtered} onRowClick={row=>navigate(`/accounts/${row.id}`)} />
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Account" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          {[{label:'Account Name *',key:'name'},{label:'Phone',key:'phone'},{label:'Website',key:'website'},{label:'No. of Employees',key:'employees',type:'number'}].map(f=>(
            <div key={f.key}><label className="z-label">{f.label}</label><input type={f.type||'text'} className="z-input text-sm" value={form[f.key]||''} onChange={e=>setForm({...form,[f.key]:e.target.value})} /></div>
          ))}
          <div><label className="z-label">Industry</label><select className="z-select text-sm" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}>{['Technology','Legal Services','Financial Services','Healthcare','Construction','Education','Agriculture','Other'].map(i=><option key={i}>{i}</option>)}</select></div>
          <div><label className="z-label">Account Type</label><select className="z-select text-sm" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{['Customer','Partner','Prospect','Vendor'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label className="z-label">Owner</label><select className="z-select text-sm" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}>{['Deepan N.','Ravi K.','Priya S.'].map(o=><option key={o}>{o}</option>)}</select></div>
          <div><label className="z-label">Rating</label><select className="z-select text-sm"><option>Hot</option><option>Warm</option><option>Cold</option></select></div>
          <div className="col-span-2"><label className="z-label">Billing Address</label><input className="z-input text-sm" placeholder="Full billing address" /></div>
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={2} placeholder="Account description..." /></div>
        </div>
      </Modal>
    </div>
  );
}
