import { useState } from 'react';
import { Plus } from 'lucide-react';
import { campaigns } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
const statusColors = { Active:'z-badge-green', Completed:'z-badge-gray', Planning:'z-badge-blue' };
export default function Campaigns() {
  const [showCreate,setShowCreate]=useState(false);
  const columns=[
    {label:'Campaign Name',accessor:'name',render:v=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span>},
    {label:'Type',accessor:'type'},{label:'Status',accessor:'status',render:v=><span className={statusColors[v]||'z-badge-gray'}>{v}</span>},
    {label:'Start Date',accessor:'startDate'},{label:'End Date',accessor:'endDate'},
    {label:'Leads',accessor:'leadsGenerated'},{label:'Budget',accessor:'budgetedCost',render:v=>`₹${v.toLocaleString()}`},
    {label:'Actual Cost',accessor:'actualCost',render:v=>`₹${v.toLocaleString()}`},
    {label:'Exp. Revenue',accessor:'expectedRevenue',render:v=><span className="text-green-600 font-medium">₹{(v/100000).toFixed(1)}L</span>},
    {label:'Owner',accessor:'owner'},
  ];
  return (
    <div>
      <PageHeader title="Campaigns" subtitle="Marketing campaigns and lead generation"
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Campaign</button>}
      />
      <DataTable columns={columns} data={campaigns}/>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Campaign" size="lg"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="z-label">Campaign Name *</label><input className="z-input text-sm" placeholder="Campaign name"/></div>
          {[{label:'Type',type:'select',opts:['Email','Conference','Webinar','Social Media','SEO/PPC','Direct Mail']},{label:'Status',type:'select',opts:['Planning','Active','Completed','Paused']}].map(f=>(
            <div key={f.label}><label className="z-label">{f.label}</label><select className="z-select text-sm">{f.opts.map(o=><option key={o}>{o}</option>)}</select></div>
          ))}
          {[{label:'Start Date',key:'start',type:'date'},{label:'End Date',key:'end',type:'date'},{label:'Budgeted Cost (₹)',type:'number'},{label:'Expected Revenue (₹)',type:'number'}].map((f,i)=>(
            <div key={i}><label className="z-label">{f.label}</label><input type={f.type||'text'} className="z-input text-sm"/></div>
          ))}
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={2} placeholder="Campaign description..."/></div>
        </div>
      </Modal>
    </div>
  );
}
