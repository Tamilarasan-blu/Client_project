import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, Target, CheckSquare, ArrowUp, ArrowDown, Phone, Calendar, Briefcase, Trophy, AlertCircle } from 'lucide-react';
import { dashboardKPIs, revenueByMonth, leadsBySource, dealsByStage, teamPerformance } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#6366f1'];

function KPICard({ icon: Icon, label, value, sub, change, color = 'blue', path }) {
  const navigate = useNavigate();
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-600',
  };
  return (
    <div onClick={() => path && navigate(path)} className={`z-card p-4 flex items-start gap-3 hover:shadow-card-hover transition-shadow ${path ? 'cursor-pointer' : ''}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {change >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            <span>{Math.abs(change)}% vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, Deepan. Here's your sales overview.</p>
        </div>
        <div className="flex gap-2">
          <select className="z-select text-xs w-auto py-1.5">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard icon={Users} label="Total Leads" value={dashboardKPIs.totalLeads.toLocaleString()} sub={`+${dashboardKPIs.newLeadsThisMonth} this month`} change={12} color="blue" path="/leads" />
        <KPICard icon={TrendingUp} label="Open Deals" value={dashboardKPIs.openDeals} sub={`₹${(dashboardKPIs.dealValue/100000).toFixed(1)}L pipeline`} change={8} color="orange" path="/deals" />
        <KPICard icon={Trophy} label="Deals Won" value={dashboardKPIs.wonDeals} sub={`₹${(dashboardKPIs.wonValue/100000).toFixed(1)}L revenue`} change={22} color="green" path="/deals" />
        <KPICard icon={Target} label="Conversion Rate" value={`${dashboardKPIs.conversionRate}%`} sub="Lead to deal" change={-2} color="purple" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard icon={DollarSign} label="Avg Deal Size" value={`₹${(dashboardKPIs.avgDealSize/100000).toFixed(1)}L`} change={5} color="teal" path="/deals" />
        <KPICard icon={Briefcase} label="Activities This Week" value={dashboardKPIs.activitiesThisWeek} sub="calls, meetings, tasks" color="blue" path="/activities" />
        <KPICard icon={AlertCircle} label="Overdue Tasks" value={dashboardKPIs.tasksOverdue} sub="Need attention" change={-1} color="red" path="/tasks" />
        <KPICard icon={CheckSquare} label="Tasks Due Today" value={2} sub="Out of 12 total" color="orange" path="/tasks" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 z-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Revenue vs Target</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#0069d9] inline-block rounded" />Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-gray-300 inline-block rounded border-dashed" />Target</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueByMonth} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0069d9" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0069d9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v/100000).toFixed(0) + 'L'} />
              <Tooltip formatter={v => ['₹' + (v/100000).toFixed(2) + 'L']} contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="#0069d9" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="#d1d5db" fill="none" strokeWidth={1.5} strokeDasharray="4 2" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by Source */}
        <div className="z-card p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Leads by Source</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={leadsBySource} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                {leadsBySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => [v + ' leads']} contentStyle={{ fontSize: 11, border: '1px solid #e5e7eb', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {leadsBySource.slice(0, 5).map((item, i) => (
              <div key={item.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-gray-600">{item.source}</span>
                </div>
                <span className="font-medium text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Deal Pipeline */}
        <div className="lg:col-span-2 z-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Deal Pipeline by Stage</h3>
            <button onClick={() => navigate('/deals')} className="text-xs text-blue-600 hover:underline">View all →</button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dealsByStage} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v/100000).toFixed(0) + 'L'} />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} width={120} />
              <Tooltip formatter={v => ['₹' + (v/100000).toFixed(2) + 'L']} contentStyle={{ fontSize: 11, border: '1px solid #e5e7eb', borderRadius: 8 }} />
              <Bar dataKey="value" fill="#0069d9" radius={[0,4,4,0]} name="Deal Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance */}
        <div className="z-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Team Performance</h3>
          </div>
          <div className="space-y-3">
            {teamPerformance.map(member => (
              <div key={member.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{member.name}</span>
                  <span className="text-gray-500">{member.rate}% win rate</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0069d9] rounded-full" style={{ width: member.rate + '%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{member.leads} leads</span>
                  <span>{member.deals} deals · ₹{(member.revenue/100000).toFixed(1)}L</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="z-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Recent Calls</h3>
            <button onClick={() => navigate('/calls')} className="text-xs text-blue-600 hover:underline">View all →</button>
          </div>
          {[
            { name: 'Aditya Rai', duration: '25 min', result: 'Interested', time: '2h ago', type: 'out' },
            { name: 'Deepak Ahir', duration: '15 min', result: 'Demo scheduled', time: '4h ago', type: 'in' },
            { name: 'Amit Patel', duration: '—', result: 'Missed', time: '5h ago', type: 'miss' },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${c.type === 'out' ? 'bg-blue-100 text-blue-600' : c.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                <Phone size={12} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
                <span className="text-xs text-gray-500">{c.duration} · {c.result}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="z-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Upcoming Tasks</h3>
            <button onClick={() => navigate('/tasks')} className="text-xs text-blue-600 hover:underline">View all →</button>
          </div>
          {[
            { subject: 'Follow up with Rajesh Kumar', due: 'Today', priority: 'High', contact: 'TechCorp' },
            { subject: 'Send proposal to Priya Sharma', due: 'Tomorrow', priority: 'High', contact: 'Legal Assoc.' },
            { subject: 'Demo preparation', due: 'Mar 25', priority: 'Normal', contact: 'Finance Plus' },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{t.subject}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${t.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{t.priority}</span>
                </div>
                <span className="text-xs text-gray-500">{t.due} · {t.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
