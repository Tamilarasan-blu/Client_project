import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ChevronRight, Edit, CheckSquare, Phone, Mail, Calendar, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import { deals, dealStages } from '../data/mockData';

function Field({ label, value }) {
  return (<div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0"><span className="text-xs text-gray-400 w-40 shrink-0">{label}</span><span className="text-xs text-gray-700 flex-1">{value||'—'}</span></div>);
}

export default function DealDetail() {
  const { id } = useParams(); const navigate = useNavigate();
  const deal = deals.find(d=>d.id===Number(id));
  const [activeTab, setActiveTab] = useState('Details');
  if (!deal) return <div className="text-center py-12 text-gray-500">Deal not found <button onClick={()=>navigate('/deals')} className="text-blue-600 hover:underline ml-2">Back</button></div>;

  const stageIdx = dealStages.findIndex(s=>s.name===deal.stage);
  const won = deal.stage==='Closed Won', lost = deal.stage==='Closed Lost';
  const stageColor = won?'bg-green-500':lost?'bg-red-500':'bg-blue-500';

  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4"><button onClick={()=>navigate('/deals')} className="hover:text-blue-600 flex items-center gap-1"><ArrowLeft size={12}/> Deals</button><ChevronRight size={12}/><span className="text-gray-600">{deal.name}</span></div>
      <div className="z-card p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-800">{deal.name}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full text-white font-medium ${stageColor}`}>{deal.stage}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{deal.account} · {deal.contact}</p>
            <div className="flex items-center gap-6 mt-3">
              <div><span className="text-xs text-gray-400 block">Deal Value</span><span className="text-xl font-bold text-green-600">₹{deal.amount.toLocaleString()}</span></div>
              <div><span className="text-xs text-gray-400 block">Probability</span><span className="text-xl font-bold text-blue-600">{deal.probability}%</span></div>
              <div><span className="text-xs text-gray-400 block">Expected Revenue</span><span className="text-xl font-bold text-gray-700">₹{((deal.amount*deal.probability)/100).toLocaleString()}</span></div>
              <div><span className="text-xs text-gray-400 block">Close Date</span><span className="text-sm font-semibold text-gray-700">{deal.closeDate}</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="z-btn-secondary text-xs"><Phone size={13}/> Call</button>
            <button className="z-btn-secondary text-xs"><Mail size={13}/> Email</button>
            <button className="z-btn-primary text-xs"><CheckSquare size={13}/> Add Activity</button>
            <button className="z-btn-ghost text-xs px-2"><Edit size={13}/></button>
          </div>
        </div>
        {/* Stage Progress */}
        {!lost && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Deal Stage Progress</p>
            <div className="flex items-center gap-0 overflow-x-auto">
              {dealStages.filter(s=>s.name!=='Closed Lost').map((s,i)=>{
                const isActive = s.name===deal.stage;
                const isPast = dealStages.indexOf(dealStages.find(x=>x.name===deal.stage)) > i;
                return (
                  <div key={s.name} className="flex items-center flex-shrink-0">
                    <div className={`px-3 py-1.5 text-xs font-medium rounded cursor-pointer transition-all ${isActive?'bg-blue-600 text-white shadow-sm':isPast?'bg-blue-100 text-blue-600':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {s.name}
                    </div>
                    {i<dealStages.filter(s=>s.name!=='Closed Lost').length-1&&<ChevronRight size={14} className="text-gray-300 mx-0.5 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex gap-0 mt-4 border-b border-gray-200 -mb-5 -mx-5 px-5">
          {['Details','Activities','Notes'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab===tab?'border-[#0069d9] text-[#0069d9]':'border-transparent text-gray-500 hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {activeTab==='Details'&&(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Deal Information</h3><Field label="Deal Name" value={deal.name}/><Field label="Account" value={deal.account}/><Field label="Contact" value={deal.contact}/><Field label="Amount" value={`₹${deal.amount.toLocaleString()}`}/><Field label="Stage" value={deal.stage}/><Field label="Probability" value={deal.probability+'%'}/><Field label="Close Date" value={deal.closeDate}/><Field label="Type" value={deal.type}/><Field label="Lead Source" value={deal.leadSource}/><Field label="Campaign" value={deal.campaign}/><Field label="Forecast Category" value={deal.forecastCategory}/></div>
            <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Additional Information</h3><Field label="Owner" value={deal.owner}/><Field label="Next Step" value={deal.nextStep}/><Field label="Created" value={deal.created}/><div className="pt-2"><p className="text-xs text-gray-400 mb-1">Description</p><p className="text-xs text-gray-600 leading-relaxed">{deal.description||'No description.'}</p></div></div>
          </div>
          <div className="space-y-4">
            <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Quick Actions</h3>
              {[{icon:CheckSquare,label:'Add Task'},{icon:Calendar,label:'Schedule Meeting'},{icon:Phone,label:'Log a Call'},{icon:Mail,label:'Send Email'},{icon:DollarSign,label:'Add Payment'},{icon:BarChart2,label:'View Reports'}].map(a=>(
                <button key={a.label} className="flex items-center gap-2.5 w-full px-3 py-2 rounded text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100 hover:border-blue-200 mb-1.5 last:mb-0"><a.icon size={13} className="text-gray-400"/>{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab==='Activities'&&<div className="z-card p-5 text-center py-12 text-gray-400 text-sm">No activities recorded yet.</div>}
      {activeTab==='Notes'&&<div className="z-card p-5"><textarea className="z-textarea w-full text-sm" rows={6} placeholder="Add a note..."/><div className="flex justify-end mt-2"><button className="z-btn-primary text-xs">Save Note</button></div></div>}
    </div>
  );
}
