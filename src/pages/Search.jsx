import { useApp } from '../context/AppContext';
import { leads, contacts, accounts, deals } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Building2, TrendingUp } from 'lucide-react';
export default function Search() {
  const { searchQuery } = useApp();
  const navigate = useNavigate();
  const q = searchQuery.toLowerCase();
  if (!q) return <div className="text-center py-16 text-gray-400"><p className="text-lg font-medium">Search CRM</p><p className="text-sm mt-1">Type in the search bar to find leads, contacts, accounts, and deals</p></div>;
  const results = [
    ...leads.filter(l=>l.name.toLowerCase().includes(q)||l.company?.toLowerCase().includes(q)||l.email.toLowerCase().includes(q)).map(l=>({...l,_type:'Lead',_path:`/leads/${l.id}`,_sub:l.company||l.email})),
    ...contacts.filter(c=>(c.firstName+' '+c.lastName).toLowerCase().includes(q)||c.email.toLowerCase().includes(q)||c.account.toLowerCase().includes(q)).map(c=>({...c,_type:'Contact',name:c.firstName+' '+c.lastName,_path:`/contacts/${c.id}`,_sub:c.account})),
    ...accounts.filter(a=>a.name.toLowerCase().includes(q)||a.industry.toLowerCase().includes(q)).map(a=>({...a,_type:'Account',_path:`/accounts/${a.id}`,_sub:a.industry})),
    ...deals.filter(d=>d.name.toLowerCase().includes(q)||d.account.toLowerCase().includes(q)).map(d=>({...d,_type:'Deal',_path:`/deals/${d.id}`,_sub:d.account})),
  ];
  const typeIcons = { Lead:Users, Contact:UserCheck, Account:Building2, Deal:TrendingUp };
  const typeColors = { Lead:'bg-blue-100 text-blue-600', Contact:'bg-purple-100 text-purple-600', Account:'bg-green-100 text-green-600', Deal:'bg-orange-100 text-orange-600' };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Search results for "{searchQuery}"</h1>
        <span className="text-sm text-gray-500">{results.length} results found</span>
      </div>
      {results.length === 0 ? (
        <div className="z-card p-12 text-center text-gray-400"><p>No results found for "{searchQuery}"</p></div>
      ) : (
        <div className="z-card overflow-hidden">
          {results.map((r,i)=>{
            const Icon=typeIcons[r._type]||Users;
            return (
              <div key={i} onClick={()=>navigate(r._path)} className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${typeColors[r._type]}`}><Icon size={14}/></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="text-sm font-medium text-gray-800">{r.name}</span><span className={`text-[10px] px-1.5 py-0.5 rounded ${typeColors[r._type]} font-medium`}>{r._type}</span></div>
                  <p className="text-xs text-gray-500 mt-0.5">{r._sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
