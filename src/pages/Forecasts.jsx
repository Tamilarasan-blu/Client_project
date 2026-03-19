import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { deals, teamPerformance } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
const categories = ['Pipeline','Best Case','Commit','Closed'];
const catColors = { Pipeline:'bg-blue-100 text-blue-700', 'Best Case':'bg-purple-100 text-purple-700', Commit:'bg-orange-100 text-orange-700', Closed:'bg-green-100 text-green-700' };
export default function Forecasts() {
  const catData = categories.map(cat=>({ name:cat, value:deals.filter(d=>d.forecastCategory===cat).reduce((s,d)=>s+d.amount,0), count:deals.filter(d=>d.forecastCategory===cat).length }));
  return (
    <div>
      <PageHeader title="Forecasts" subtitle="Sales forecast and revenue predictions" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {catData.map(c=>(
          <div key={c.name} className="z-card p-4">
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${catColors[c.name]}`}>{c.name}</span>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹{(c.value/100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.count} deals</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Forecast by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={catData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="name" tick={{fontSize:10,fill:'#9ca3af'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:'#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={v=>'₹'+(v/100000).toFixed(0)+'L'}/><Tooltip formatter={v=>['₹'+(v/100000).toFixed(2)+'L']} contentStyle={{fontSize:11,border:'1px solid #e5e7eb',borderRadius:8}}/><Bar dataKey="value" fill="#0069d9" radius={[4,4,0,0]} name="Value"/></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Team Forecast</h3>
          {teamPerformance.map(m=>(
            <div key={m.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3"><div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{m.name[0]}</div><span className="text-sm text-gray-700">{m.name}</span></div>
              <div className="text-right"><p className="text-sm font-semibold text-gray-800">₹{(m.revenue/100000).toFixed(1)}L</p><p className="text-xs text-gray-400">{m.rate}% win rate</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
