import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { revenueByMonth, teamPerformance } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
export default function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Advanced business intelligence and insights" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[{label:'Total Revenue',value:'₹28.5L',change:'+14%',pos:true},{label:'Deals Won',value:'6',change:'+2 this month',pos:true},{label:'Avg Sales Cycle',value:'42 days',change:'-5 days',pos:true}].map(k=>(
          <div key={k.label} className="z-card p-4">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{k.value}</p>
            <p className={`text-xs mt-1 ${k.pos?'text-green-600':'text-red-500'}`}>{k.change}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueByMonth}>
              <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0069d9" stopOpacity={0.15}/><stop offset="95%" stopColor="#0069d9" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'#9ca3af'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={v=>'₹'+(v/100000)+'L'}/>
              <Tooltip formatter={v=>['₹'+(v/100000).toFixed(2)+'L']} contentStyle={{fontSize:12,border:'1px solid #e5e7eb',borderRadius:8}}/>
              <Area type="monotone" dataKey="revenue" stroke="#0069d9" fill="url(#ag)" strokeWidth={2} name="Revenue"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="name" tick={{fontSize:10,fill:'#9ca3af'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'#9ca3af'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:11,border:'1px solid #e5e7eb',borderRadius:8}}/>
              <Bar dataKey="deals" fill="#0069d9" radius={[4,4,0,0]} name="Deals"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
