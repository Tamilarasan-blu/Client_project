import { useState } from 'react';
import { Plus, FileText, Download, Search } from 'lucide-react';
import { documents } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
const typeColors={Proposal:'z-badge-blue',Contract:'z-badge-green',Marketing:'z-badge-purple',Pricing:'z-badge-orange'};
export default function Documents() {
  const [search,setSearch]=useState('');
  const filtered=documents.filter(d=>d.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <PageHeader title="Documents" subtitle="Manage files and attachments"
        actions={<button className="z-btn-primary text-xs py-1.5"><Plus size={13}/> Upload Document</button>}
      />
      <div className="z-card p-3 mb-4"><div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" className="z-input pl-8 text-sm" placeholder="Search documents..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="z-card overflow-hidden">
        {filtered.map((d,i)=>(
          <div key={d.id} className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><FileText size={18} className="text-blue-500"/></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{d.name}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className={typeColors[d.type]||'z-badge-gray'}>{d.type}</span>
                <span className="text-xs text-gray-400">{d.size}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">{d.created}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">{d.owner}</span>
                {d.relatedTo&&<><span className="text-xs text-gray-400">·</span><span className="text-xs text-blue-600">{d.relatedTo}</span></>}
              </div>
            </div>
            <button className="z-btn-secondary text-xs py-1"><Download size={12}/> Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
