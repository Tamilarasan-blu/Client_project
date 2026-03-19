import { useState } from 'react';
import { Plus } from 'lucide-react';
import { products } from '../data/mockData';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
export default function Products() {
  const [showCreate,setShowCreate]=useState(false);
  const columns=[
    {label:'Product Name',accessor:'name',render:v=><span className="font-medium text-[#0069d9] hover:underline cursor-pointer">{v}</span>},
    {label:'Code',accessor:'code'},{label:'Category',accessor:'category'},
    {label:'Unit',accessor:'unit'},{label:'Unit Price',accessor:'unitPrice',render:v=><span className="font-semibold text-gray-800">₹{v.toLocaleString()}</span>},
    {label:'Taxable',accessor:'taxable',render:v=><span className={v?'z-badge-green':'z-badge-gray'}>{v?'Yes':'No'}</span>},
    {label:'Active',accessor:'active',render:v=><span className={v?'z-badge-green':'z-badge-red'}>{v?'Active':'Inactive'}</span>},
  ];
  return (
    <div>
      <PageHeader title="Products" subtitle="Products and services catalog"
        actions={<button onClick={()=>setShowCreate(true)} className="z-btn-primary text-xs py-1.5"><Plus size={13}/> New Product</button>}
      />
      <DataTable columns={columns} data={products}/>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="New Product" size="md"
        footer={<><button onClick={()=>setShowCreate(false)} className="z-btn-secondary text-sm">Cancel</button><button className="z-btn-primary text-sm">Save</button></>}>
        <div className="grid grid-cols-2 gap-3">
          {[{label:'Product Name *',placeholder:'Name'},{label:'Product Code',placeholder:'Code'},{label:'Category',placeholder:'Category'},{label:'Unit',placeholder:'e.g. Hour,License'}].map(f=>(
            <div key={f.label}><label className="z-label">{f.label}</label><input className="z-input text-sm" placeholder={f.placeholder}/></div>
          ))}
          <div><label className="z-label">Unit Price (₹)</label><input type="number" className="z-input text-sm" placeholder="0"/></div>
          <div><label className="z-label">Vendor</label><input className="z-input text-sm" placeholder="Vendor name"/></div>
          <div className="flex gap-3 items-center"><label className="z-label mb-0">Taxable</label><input type="checkbox" defaultChecked className="rounded"/></div>
          <div className="flex gap-3 items-center"><label className="z-label mb-0">Active</label><input type="checkbox" defaultChecked className="rounded"/></div>
          <div className="col-span-2"><label className="z-label">Description</label><textarea className="z-textarea text-sm" rows={2}/></div>
        </div>
      </Modal>
    </div>
  );
}
