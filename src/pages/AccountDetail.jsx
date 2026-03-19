import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, Globe, Edit, Building2 } from 'lucide-react';
import { accounts, contacts, deals } from '../data/mockData';
function Field({ label, value, link }) {
  return (<div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0"><span className="text-xs text-gray-400 w-40 shrink-0">{label}</span>{link?<a href={link} className="text-xs text-[#0069d9] hover:underline flex-1">{value||'—'}</a>:<span className="text-xs text-gray-700 flex-1">{value||'—'}</span>}</div>);
}
export default function AccountDetail() {
  const { id } = useParams(); const navigate = useNavigate();
  const a = accounts.find(x=>x.id===Number(id));
  if (!a) return <div className="text-center py-12 text-gray-500">Account not found <button onClick={()=>navigate('/accounts')} className="text-blue-600 hover:underline ml-2">Back</button></div>;
  const relContacts = contacts.filter(c=>c.account===a.name);
  const relDeals = deals.filter(d=>d.account===a.name);
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4"><button onClick={()=>navigate('/accounts')} className="hover:text-blue-600 flex items-center gap-1"><ArrowLeft size={12}/> Accounts</button><ChevronRight size={12}/><span className="text-gray-600">{a.name}</span></div>
      <div className="z-card p-5 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold">{a.name[0]}</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{a.name}</h1>
              <p className="text-sm text-gray-500">{a.industry} · {a.type} · {a.employees.toLocaleString()} employees</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">{a.phone&&<span className="flex items-center gap-1"><Phone size={12}/>{a.phone}</span>}{a.website&&<a href={a.website} className="flex items-center gap-1 text-blue-600 hover:underline"><Globe size={12}/>{a.website}</a>}</div>
            </div>
          </div>
          <div className="flex gap-2"><button className="z-btn-secondary text-xs"><Phone size={13}/> Call</button><button className="z-btn-ghost text-xs px-2"><Edit size={13}/></button></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Account Information</h3><Field label="Account Name" value={a.name}/><Field label="Phone" value={a.phone}/><Field label="Website" value={a.website} link={a.website}/><Field label="Industry" value={a.industry}/><Field label="No. of Employees" value={a.employees?.toLocaleString()}/><Field label="Annual Revenue" value={`₹${a.annualRevenue.toLocaleString()}`}/><Field label="Account Type" value={a.type}/><Field label="Rating" value={a.rating}/><Field label="Billing Address" value={a.billingAddress}/><Field label="Owner" value={a.owner}/><Field label="Created" value={a.created}/></div>
          {relContacts.length>0&&<div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3">Contacts ({relContacts.length})</h3>{relContacts.map(c=><div key={c.id} onClick={()=>navigate(`/contacts/${c.id}`)} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"><div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">{c.firstName[0]}</div><div><p className="text-sm font-medium text-[#0069d9] hover:underline">{c.firstName} {c.lastName}</p><p className="text-xs text-gray-500">{c.title}</p></div></div>)}</div>}
          {relDeals.length>0&&<div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3">Deals ({relDeals.length})</h3>{relDeals.map(d=><div key={d.id} onClick={()=>navigate(`/deals/${d.id}`)} className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"><div><p className="text-sm font-medium text-[#0069d9] hover:underline">{d.name}</p><p className="text-xs text-gray-500">{d.stage}</p></div><span className="text-sm font-semibold text-green-600">₹{(d.amount/100000).toFixed(1)}L</span></div>)}</div>}
        </div>
        <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Description</h3><p className="text-xs text-gray-600">{a.description||'No description.'}</p></div>
      </div>
    </div>
  );
}
