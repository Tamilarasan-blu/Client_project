import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, Mail, Edit, MapPin } from 'lucide-react';
import { contacts } from '../data/mockData';
function Field({ label, value, link }) {
  return (<div className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0"><span className="text-xs text-gray-400 w-36 shrink-0">{label}</span>{link?<a href={link} className="text-xs text-[#0069d9] hover:underline flex-1">{value||'—'}</a>:<span className="text-xs text-gray-700 flex-1">{value||'—'}</span>}</div>);
}
export default function ContactDetail() {
  const { id } = useParams(); const navigate = useNavigate();
  const c = contacts.find(x=>x.id===Number(id));
  if (!c) return <div className="text-center py-12 text-gray-500">Not found <button onClick={()=>navigate('/contacts')} className="text-blue-600 hover:underline ml-2">Back</button></div>;
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4"><button onClick={()=>navigate('/contacts')} className="hover:text-blue-600 flex items-center gap-1"><ArrowLeft size={12}/> Contacts</button><ChevronRight size={12}/><span className="text-gray-600">{c.firstName} {c.lastName}</span></div>
      <div className="z-card p-5 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xl font-bold">{c.firstName[0]}</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{c.firstName} {c.lastName}</h1>
              <p className="text-sm text-gray-500">{c.title}{c.account?' · '+c.account:''}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">{c.email&&<a href={`mailto:${c.email}`} className="flex items-center gap-1 text-blue-600 hover:underline"><Mail size={12}/>{c.email}</a>}{c.phone&&<span className="flex items-center gap-1"><Phone size={12}/>{c.phone}</span>}{c.city&&<span className="flex items-center gap-1"><MapPin size={12}/>{c.city}</span>}</div>
            </div>
          </div>
          <div className="flex gap-2"><button className="z-btn-secondary text-xs"><Phone size={13}/> Call</button><button className="z-btn-secondary text-xs"><Mail size={13}/> Email</button><button className="z-btn-ghost text-xs px-2"><Edit size={13}/></button></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Contact Information</h3><Field label="First Name" value={c.firstName}/><Field label="Last Name" value={c.lastName}/><Field label="Email" value={c.email} link={`mailto:${c.email}`}/><Field label="Phone" value={c.phone}/><Field label="Account" value={c.account}/><Field label="Title" value={c.title}/><Field label="Department" value={c.department}/><Field label="Reports To" value={c.reportTo}/><Field label="Mailing Address" value={c.mailingAddress}/><Field label="City" value={c.city}/><Field label="Country" value={c.country}/></div>
        <div className="z-card p-4"><h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Other Info</h3><Field label="Lead Source" value={c.leadSource}/><Field label="Owner" value={c.owner}/><Field label="Created" value={c.created}/><Field label="Twitter" value={c.twitter}/><Field label="LinkedIn" value={c.linkedin?'View Profile':null} link={c.linkedin}/><div className="mt-3 pt-3 border-t border-gray-100"><p className="text-xs text-gray-400 mb-1">Description</p><p className="text-xs text-gray-600">{c.description||'No description.'}</p></div></div>
      </div>
    </div>
  );
}
