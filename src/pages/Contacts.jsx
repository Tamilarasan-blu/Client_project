import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload } from 'lucide-react';
import { contacts } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import ViewToggle from '../components/ui/ViewToggle';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { useApp } from '../context/AppContext';

export default function Contacts() {
  const navigate = useNavigate();
  const { viewMode } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', account:'', title:'', department:'', owner:'Deepan N.' });
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'my' ? contacts.filter(c=>c.owner==='Deepan N.') : contacts;
  const tabs = [
    { id:'all', label:'All Contacts', count: contacts.length },
    { id:'my', label:'My Contacts', count: contacts.filter(c=>c.owner==='Deepan N.').length },
  ];
  const columns = [
    { label:'Name', accessor:'firstName', render:(v,row)=><button onClick={e=>{e.stopPropagation();navigate(`/contacts/${row.id}`)}} className="text-[#0069d9] hover:underline font-medium">{row.firstName} {row.lastName}</button> },
    { label:'Account', accessor:'account', render:v=><span className="text-[#0069d9] cursor-pointer hover:underline">{v}</span> },
    { label:'Email', accessor:'email', render:v=><a href={`mailto:${v}`} onClick={e=>e.stopPropagation()} className="text-[#0069d9] hover:underline">{v}</a> },
    { label:'Phone', accessor:'phone' },
    { label:'Title', accessor:'title' },
    { label:'Department', accessor:'department' },
    { label:'Lead Source', accessor:'leadSource' },
    { label:'Owner', accessor:'owner' },
  ];
  return (
    <div>
      <PageHeader title="Contacts" subtitle="Key individuals and customers"
        tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}
        actions={<div className="flex gap-2"><ViewToggle views={['list','grid']} /><button className="z-btn-secondary text-xs py-1.5"><Upload size={13}/> Import</button><button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Contact</button></div>}
      />
      {viewMode==='grid'?(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>navigate(`/contacts/${c.id}`)} className="z-card p-4 cursor-pointer hover:shadow-card-hover text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">{c.firstName[0]}</div>
              <p className="font-semibold text-gray-800 text-sm">{c.firstName} {c.lastName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.title}</p>
              <p className="text-xs text-blue-600">{c.account}</p>
            </div>
          ))}
        </div>
      ):(
        <DataTable columns={columns} data={filtered} onRowClick={row=>navigate(`/contacts/${row.id}`)} />
      )}
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Contact" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          {[{label:'First Name *',key:'firstName'},{label:'Last Name *',key:'lastName'},{label:'Email',key:'email',type:'email'},{label:'Phone',key:'phone'},{label:'Account',key:'account'},{label:'Title',key:'title'},{label:'Department',key:'department'}].map(f=>(
            <div key={f.key}><label className="z-label">{f.label}</label><input type={f.type||'text'} className="z-input text-sm" value={form[f.key]||''} onChange={e=>setForm({...form,[f.key]:e.target.value})} /></div>
          ))}
          <div><label className="z-label">Owner</label><select className="z-select text-sm" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}>{['Deepan N.','Ravi K.','Priya S.'].map(o=><option key={o}>{o}</option>)}</select></div>
        </div>
      </Modal>
    </div>
  );
}
