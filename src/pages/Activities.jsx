import { useState } from 'react';
import { Phone, Calendar, CheckSquare, Clock } from 'lucide-react';
import { tasks, calls, meetings } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';

export default function Activities() {
  const [activeTab, setActiveTab] = useState('all');
  const allActivities = [
    ...tasks.map(t=>({...t,type:'task',date:t.dueDate})),
    ...calls.map(c=>({...c,type:'call',date:c.callDate})),
    ...meetings.map(m=>({...m,type:'meeting',date:m.from?.split(' ')[0]})),
  ].sort((a,b)=>new Date(b.date)-new Date(a.date));

  const icons = { task: CheckSquare, call: Phone, meeting: Calendar };
  const colors = { task:'bg-blue-50 text-blue-600', call:'bg-green-50 text-green-600', meeting:'bg-purple-50 text-purple-600' };

  return (
    <div>
      <PageHeader title="Activities" subtitle="All calls, meetings, and tasks"
        tabs={[{id:'all',label:'All',count:allActivities.length},{id:'task',label:'Tasks',count:tasks.length},{id:'call',label:'Calls',count:calls.length},{id:'meeting',label:'Meetings',count:meetings.length}]}
        activeTab={activeTab} onTabChange={setActiveTab}
      />
      <div className="z-card overflow-hidden">
        {allActivities.filter(a=>activeTab==='all'||a.type===activeTab).map((a,i)=>{
          const Icon=icons[a.type]||Clock;
          return (
            <div key={i} className="flex items-start gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colors[a.type]}`}><Icon size={15}/></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{a.subject||a.title}</span>
                  <span className="text-xs text-gray-400">{a.date}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className={`text-[10px] capitalize px-1.5 py-0.5 rounded ${colors[a.type]} font-medium`}>{a.type}</span>
                  {a.contact&&<span className="text-xs text-gray-500">{a.contact}</span>}
                  {a.account&&<span className="text-xs text-gray-400">· {a.account}</span>}
                  {a.status&&<span className="text-xs text-gray-500">· {a.status}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
