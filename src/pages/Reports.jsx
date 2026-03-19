import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { revenueByMonth, dealsByStage, leadsBySource } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import { BarChart3, PieChart as PieIcon, TrendingUp, Users } from 'lucide-react';

const COLORS = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#6366f1'];

const reportCategories = [
  { name:'Sales Reports', icon:TrendingUp, color:'blue', reports:['Deal Pipeline','Revenue by Stage','Sales by Owner','Won Deals Analysis','Lost Deals Analysis','Sales Forecast'] },
  { name:'Lead Reports', icon:Users, color:'purple', reports:['Leads by Status','Leads by Source','Lead Conversion Rate','Lead Pipeline','Campaign Performance','Lead Aging'] },
  { name:'Activity Reports', icon:BarChart3, color:'green', reports:['Call Summary','Meeting Summary','Task Completion','Activity by Owner','Daily Activity Log'] },
  { name:'Account Reports', icon:PieIcon, color:'orange', reports:['Account Summary','Revenue by Account','Top Accounts','Account Activity','Customer Retention'] },
];

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Insights and analytics for your CRM data" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="month" tick={{fontSize:11,fill:'#9ca3af'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:'#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={v=>'₹'+(v/100000).toFixed(0)+'L'}/><Tooltip formatter={v=>['₹'+(v/100000).toFixed(2)+'L']} contentStyle={{fontSize:12,border:'1px solid #e5e7eb',borderRadius:8}}/><Bar dataKey="revenue" fill="#0069d9" radius={[4,4,0,0]} name="Revenue"/><Bar dataKey="target" fill="#e5e7eb" radius={[4,4,0,0]} name="Target"/></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Leads by Source</h3>
          <div className="flex">
            <ResponsiveContainer width="50%" height={200}><PieChart><Pie data={leadsBySource} cx="50%" cy="50%" innerRadius={40} outerRadius={75} dataKey="value">{leadsBySource.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip contentStyle={{fontSize:11,border:'1px solid #e5e7eb',borderRadius:8}}/></PieChart></ResponsiveContainer>
            <div className="flex-1 flex flex-col justify-center space-y-1.5">
              {leadsBySource.map((item,i)=>(
                <div key={item.source} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{background:COLORS[i%COLORS.length]}}/><span className="text-gray-600">{item.source}</span></div>
                  <span className="font-medium text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCategories.map(cat=>(
          <div key={cat.name} className="z-card p-4">
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-gray-100`}>
              <div className={`w-7 h-7 rounded bg-${cat.color}-50 flex items-center justify-center`}><cat.icon size={14} className={`text-${cat.color}-600`}/></div>
              <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
            </div>
            <ul className="space-y-1.5">
              {cat.reports.map(r=><li key={r}><button className="text-xs text-[#0069d9] hover:underline text-left w-full">{r}</button></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
