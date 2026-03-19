import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cases } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
const statusColors = { Open:'z-badge-blue','In Progress':'z-badge-orange',Closed:'z-badge-green',Escalated:'z-badge-red' };
const priorityColors = { High:'z-badge-red', Medium:'z-badge-yellow', Low:'z-badge-gray' };
export default function Cases() {
  const [showCreate,setShowCreate]=useState(false);
  const [activeTab,setActiveTab]=useState('all');
  const filtered=activeTab==='open'?cases.filter(c=>c.status==='Open'||c.status==='In Progress'):cases;
  const columns=[
    {label:'Case#',accessor:'caseNumber'},{label:'Subject',accessor:'subject',render:v=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span>},
    {label:'Status',accessor:'status',render:v=><span className={statusColors[v]||'z-badge-gray'}>{v}</span>},
    {label:'Priority',accessor:'priority',render:v=><span className={priorityColors[v]||'z-badge-gray'}>{v}</span>},
    {label:'Type',accessor:'type'},{label:'Account',accessor:'account'},{label:'Contact',accessor:'contact'},{label:'Owner',accessor:'owner'},{label:'Created',accessor:'created'},
  ];
  return (
    <div>
      <PageHeader title="Cases" subtitle="Customer support and issue tracking"
        tabs={[{id:'all',label:'All Cases',count:cases.length},{id:'open',label:'Open',count:cases.filter(c=>['Open','In Progress'].includes(c.status)).length}]}
        activeTab={activeTab} onTabChange={setActiveTab}
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Case</button>}
      />
      <DataTable columns={columns} data={filtered}/>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Case" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="z-label">Subject *</label><input className="z-input text-sm" placeholder="Case subject"/></div>
          {[{label:'Account',placeholder:'Account name'},{label:'Contact',placeholder:'Contact name'}].map(f=>(
            <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" placeholder={f.placeholder}/></div>
          ))}
          <div><label className="z-label">Status</label><select className="z-select text-sm"><option>Open</option><option>In Progress</option><option>Closed</option></select></div>
          <div><label className="z-label">Priority</label><select className="z-select text-sm"><option>High</option><option>Medium</option><option>Low</option></select></div>
          <div><label className="z-label">Type</label><select className="z-select text-sm"><option>User Error</option><option>Bug</option><option>Feature Request</option><option>Other</option></select></div>
          <div><label className="z-label">Owner</label><select className="z-select text-sm"><option>Deepan N.</option><option>Ravi K.</option><option>Priya S.</option></select></div>
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={3} placeholder="Describe the issue..."/></div>
        </div>
      </Modal>
    </div>
  );
}
