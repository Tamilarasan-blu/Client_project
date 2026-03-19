import { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { tasks } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';

const statusColors = { 'Not Started':'z-badge-gray', 'In Progress':'z-badge-blue', 'Completed':'z-badge-green', 'Deferred':'z-badge-orange', 'Waiting on Contact':'z-badge-yellow' };
const priorityColors = { 'High':'z-badge-red', 'Normal':'z-badge-blue', 'Low':'z-badge-gray' };

export default function Tasks() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab==='my'?tasks.filter(t=>t.owner==='Deepan N.'):activeTab==='overdue'?tasks.filter(t=>t.status!=='Completed'&&new Date(t.dueDate)<new Date()):tasks;
  const columns = [
    { label:'Subject', accessor:'subject', render:(v,row)=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span> },
    { label:'Status', accessor:'status', render:v=><span className={statusColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Priority', accessor:'priority', render:v=><span className={priorityColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Due Date', accessor:'dueDate' },
    { label:'Contact', accessor:'contact', render:v=>v||'—' },
    { label:'Account', accessor:'account', render:v=>v||'—' },
    { label:'Owner', accessor:'owner' },
    { label:'Related To', accessor:'relatedTo', render:v=>v||'—' },
  ];
  return (
    <div>
      <PageHeader title="Tasks" subtitle="Manage your to-do items"
        tabs={[{id:'all',label:'All Tasks',count:tasks.length},{id:'my',label:'My Tasks',count:tasks.filter(t=>t.owner==='Deepan N.').length},{id:'overdue',label:'Overdue',count:0}]}
        activeTab={activeTab} onTabChange={setActiveTab}
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Task</button>}
      />
      <DataTable columns={columns} data={filtered} />
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Task" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="z-label">Subject *</label><input className="z-input text-sm" placeholder="Task subject" /></div>
          {[{label:'Contact',placeholder:'Contact name'},{label:'Account',placeholder:'Account name'},{label:'Related To',placeholder:'Deal or Lead'}].map(f=>(
            <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" placeholder={f.placeholder} /></div>
          ))}
          <div><label className="z-label">Due Date</label><input type="date" className="z-input text-sm" /></div>
          <div><label className="z-label">Status</label><select className="z-select text-sm">{['Not Started','In Progress','Completed','Deferred'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label className="z-label">Priority</label><select className="z-select text-sm">{['High','Normal','Low'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={3} placeholder="Task details..." /></div>
        </div>
      </Modal>
    </div>
  );
}
