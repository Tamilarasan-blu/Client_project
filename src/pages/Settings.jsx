import { useState } from 'react';
import { User, Building2, Users, Bell, Shield, Globe, Palette, Plug, Database, CreditCard, Save, ChevronRight } from 'lucide-react';

const sections = [
  { id:'personal', label:'Personal Settings', icon:User, sub:'My Profile, Password, Signature' },
  { id:'company', label:'Company Settings', icon:Building2, sub:'Company Info, Address, Logo' },
  { id:'users', label:'Users & Controls', icon:Users, sub:'Users, Roles, Profiles, Groups' },
  { id:'notifications', label:'Notifications', icon:Bell, sub:'Email, In-App, Mobile' },
  { id:'security', label:'Security', icon:Shield, sub:'Two-Factor Auth, IP Restriction' },
  { id:'localization', label:'Localization', icon:Globe, sub:'Language, Timezone, Currency' },
  { id:'customization', label:'Customization', icon:Palette, sub:'Fields, Layouts, Modules' },
  { id:'integrations', label:'Integrations', icon:Plug, sub:'Email, Calendar, 3rd Party Apps' },
  { id:'data', label:'Data Administration', icon:Database, sub:'Import, Export, Backup' },
  { id:'billing', label:'Subscription & Billing', icon:CreditCard, sub:'Plan, Usage, Invoices' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('personal');

  const renderContent = () => {
    switch(activeSection) {
      case 'personal': return (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">Personal Settings</h2>
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">DN</div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[{label:'First Name',val:'Deepan'},{label:'Last Name',val:'Naicker'},{label:'Email',val:'legalindiaservices1@gmail.com',type:'email'},{label:'Phone',val:'+91 9876543210'},{label:'Mobile',val:'+91 9876543210'},{label:'Title',val:'Admin'}].map(f=>(
                <div key={f.label}><label className="z-label">{f.label}</label><input type={f.type||'text'} className="z-input text-sm" defaultValue={f.val}/></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{label:'Language',val:'English'},{label:'Date Format',val:'YYYY-MM-DD'},{label:'Time Format',val:'24 hour'},{label:'Timezone',val:'Asia/Kolkata (IST)'}].map(f=>(
              <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" defaultValue={f.val}/></div>
            ))}
          </div>
          <div><label className="z-label">Email Signature</label><textarea className="z-textarea text-sm" rows={4} defaultValue="Best regards,
Deenan Naicker
Admin - bluverse CRM"/></div>
        </div>
      );
      case 'company': return (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">Company Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            {[{label:'Company Name',val:'bluverse Services'},{label:'Phone',val:'+91 9876543210'},{label:'Website',val:'https://bluverse.com'},{label:'Industry',val:'Legal Services'},{label:'Employees',val:'50-100'},{label:'Revenue',val:'₹1Cr - ₹5Cr'}].map(f=>(
              <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" defaultValue={f.val}/></div>
            ))}
          </div>
          <div><label className="z-label">Company Address</label><textarea className="z-textarea text-sm" rows={2} defaultValue="123 Legal Street, Mumbai, Maharashtra 400001"/></div>
          <div className="grid grid-cols-2 gap-4">
            {[{label:'Currency',val:'INR - Indian Rupee'},{label:'Fiscal Year Start',val:'April'}].map(f=>(
              <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" defaultValue={f.val}/></div>
            ))}
          </div>
        </div>
      );
      case 'notifications': return (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">Notification Settings</h2>
          {[
            {label:'New lead assigned',desc:'Receive notification when a lead is assigned to you'},
            {label:'Deal stage changed',desc:'Get notified when a deal stage is updated'},
            {label:'Task due reminder',desc:'Reminder before task due dates'},
            {label:'Missed call notification',desc:'Alert for missed calls from contacts'},
            {label:'Case opened',desc:'Alert when a new support case is created'},
            {label:'Email reply received',desc:'Notification when a contact replies to your email'},
          ].map(item=>(
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <div className="flex gap-5">
                <label className="flex items-center gap-1.5 text-xs text-gray-500"><input type="checkbox" defaultChecked className="rounded text-blue-500"/> Email</label>
                <label className="flex items-center gap-1.5 text-xs text-gray-500"><input type="checkbox" defaultChecked className="rounded text-blue-500"/> In-App</label>
                <label className="flex items-center gap-1.5 text-xs text-gray-500"><input type="checkbox" className="rounded text-blue-500"/> Mobile</label>
              </div>
            </div>
          ))}
        </div>
      );
      case 'users': return (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100">Users & Controls</h2>
          <div className="z-card overflow-hidden">
            {[{name:'Bluverse',email:'bluverse@gmail.com',role:'Admin',status:'Active'},{name:'Ravi Kumar',email:'ravi@bluverse.com',role:'Sales',status:'Active'},{name:'Priya Sharma',email:'priya@bluverse.com',role:'Sales',status:'Active'},{name:'Ankit Mehta',email:'ankit@bluverse.com',role:'Support',status:'Inactive'}].map((u,i)=>(
              <div key={i} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{u.name[0]}</div>
                  <div><p className="text-sm font-medium text-gray-700">{u.name}</p><p className="text-xs text-gray-500">{u.email}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{u.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${u.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{u.status}</span>
                  <button className="text-xs text-blue-600 hover:underline">Edit</button>
                </div>
              </div>
            ))}
          </div>
          <button className="z-btn-primary text-xs"><User size={12}/> Add User</button>
        </div>
      );
      default: return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            {(() => { const s=sections.find(x=>x.id===activeSection); return s ? <s.icon size={24}/> : null; })()}
          </div>
          <p className="text-sm font-medium">{sections.find(x=>x.id===activeSection)?.label}</p>
          <p className="text-xs mt-1">Configuration options coming soon</p>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-semibold text-gray-800">Settings</h1><p className="text-xs text-gray-500 mt-0.5">Manage your CRM preferences</p></div>
        <button className="z-btn-primary text-sm"><Save size={14}/> Save Changes</button>
      </div>
      <div className="flex gap-5">
        <div className="w-56 shrink-0 z-card p-2 h-fit">
          {sections.map(s=>(
            <button key={s.id} onClick={()=>setActiveSection(s.id)}
              className={`flex items-start gap-3 w-full px-3 py-2.5 rounded-lg transition-all mb-0.5 text-left ${activeSection===s.id?'bg-blue-50 text-blue-700':'text-gray-600 hover:bg-gray-50'}`}>
              <s.icon size={15} className="mt-0.5 shrink-0"/>
              <div><p className="text-xs font-medium">{s.label}</p><p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p></div>
            </button>
          ))}
        </div>
        <div className="flex-1 z-card p-5">{renderContent()}</div>
      </div>
    </div>
  );
}
