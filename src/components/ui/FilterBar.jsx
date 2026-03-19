import { Filter, X } from 'lucide-react';
import { useState } from 'react';

export default function FilterBar({ onFilter, filters = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn-secondary text-sm">
        <Filter size={14} /> Filters
      </button>
      {open && (
        <div className="absolute right-0 top-10 bg-dark-800 border border-white/10 rounded-xl p-4 shadow-2xl z-50 w-72 animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Filter Options</span>
            <button onClick={() => setOpen(false)}>
              <X size={14} className="text-slate-400" />
            </button>
          </div>
          {filters.map(f => (
            <div key={f.key} className="mb-3">
              <label className="text-xs text-slate-400 mb-1 block">{f.label}</label>
              {f.type === 'select' ? (
                <select className="input-field text-sm" onChange={e => onFilter?.(f.key, e.target.value)}>
                  <option value="">All</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type || 'text'} className="input-field text-sm" placeholder={f.placeholder} onChange={e => onFilter?.(f.key, e.target.value)} />
              )}
            </div>
          ))}
          <button onClick={() => { onFilter?.('clear'); setOpen(false); }} className="btn-secondary text-sm w-full justify-center mt-2">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
