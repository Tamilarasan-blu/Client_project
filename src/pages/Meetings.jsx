import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { meetings } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
const statusColors = { Planned:'z-badge-blue', Completed:'z-badge-green', Cancelled:'z-badge-red' };
export default function Meetings() {
  const [showCreate, setShowCreate] = useState(false);
  const columns = [
    { label:'Title', accessor:'title', render:v=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span> },
    { label:'From', accessor:'from' },
    { label:'To', accessor:'to' },
    { label:'Location', accessor:'location' },
    { label:'Host', accessor:'host' },
    { label:'Status', accessor:'status', render:v=><span className={statusColors[v]||'z-badge-gray'}>{v}</span> },
    { label:'Related To', accessor:'relatedTo', render:v=>v||'—' },
  ];
  return (
    <div>
      <PageHeader title="Meetings" subtitle="Schedule and track meetings"
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Meeting</button>}
      />
      <DataTable columns={columns} data={meetings} />
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Schedule Meeting" size="md"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="space-y-3">
          <div><label className="z-label">Meeting Title *</label><input className="z-input text-sm" placeholder="Meeting title" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="z-label">From *</label><input type="datetime-local" className="z-input text-sm" /></div>
            <div><label className="z-label">To *</label><input type="datetime-local" className="z-input text-sm" /></div>
          </div>
          <div><label className="z-label">Location</label><input className="z-input text-sm" placeholder="e.g. Google Meet, Zoom, Office" /></div>
          <div><label className="z-label">Participants</label><input className="z-input text-sm" placeholder="Enter participant names" /></div>
          <div><label className="z-label">Related To</label><input className="z-input text-sm" placeholder="Link to deal or lead" /></div>
          <div><label className="z-label">Agenda</label><textarea className="z-textarea text-sm" rows={3} placeholder="Meeting agenda and notes..." /></div>
        </div>
      </Modal>
    </div>
  );
}
