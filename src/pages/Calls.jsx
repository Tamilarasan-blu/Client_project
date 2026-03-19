import { useState } from 'react';
import { Plus } from 'lucide-react';
import { calls } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
const statusColors = { Completed:'z-badge-green', Scheduled:'z-badge-blue', Missed:'z-badge-red', 'In Progress':'z-badge-orange' };
const typeColors = { Outbound:'z-badge-blue', Inbound:'z-badge-green' };
export default function Calls() {
  const [showCreate, setShowCreate] = useState(false);
  const columns = [
    { label:'Subject', accessor:'subject', render:v=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span> },
    { label:'Type', accessor:'callType', render:v=><span className={typeColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Status', accessor:'status', render:v=><span className={statusColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Duration', accessor:'duration' },
    { label:'Date', accessor:'callDate' },
    { label:'Contact', accessor:'contact', render:v=>v||'—' },
    { label:'Account', accessor:'account', render:v=>v||'—' },
    { label:'Owner', accessor:'owner' },
    { label:'Call Result', accessor:'callResult', render:v=>v||'—' },
  ];
  return (
    <div>
      <PageHeader title="Calls" subtitle="Track all call activities"
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> Log Call</button>}
      />
      <DataTable columns={columns} data={calls} />
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Log a Call" size="md"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="space-y-3">
          <div><label className="z-label">Subject *</label><input className="z-input text-sm" placeholder="Call subject" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="z-label">Call Type</label><select className="z-select text-sm"><option>Outbound</option><option>Inbound</option></select></div>
            <div><label className="z-label">Status</label><select className="z-select text-sm"><option>Completed</option><option>Scheduled</option><option>Missed</option></select></div>
            <div><label className="z-label">Duration (HH:MM:SS)</label><input className="z-input text-sm" placeholder="00:00:00" /></div>
            <div><label className="z-label">Call Date</label><input type="datetime-local" className="z-input text-sm" /></div>
            <div><label className="z-label">Contact</label><input className="z-input text-sm" placeholder="Contact name" /></div>
            <div><label className="z-label">Account</label><input className="z-input text-sm" placeholder="Account name" /></div>
          </div>
          <div><label className="z-label">Call Result</label><input className="z-input text-sm" placeholder="Outcome of the call" /></div>
          <div><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={2} placeholder="Call notes..." /></div>
        </div>
      </Modal>
    </div>
  );
}
