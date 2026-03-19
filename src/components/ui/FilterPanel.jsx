import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
export default function FilterPanel({ filters = [], onFilter, activeFilters = {} }) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(activeFilters).filter(Boolean).length;
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={`z-btn-secondary text-xs py-1.5 ${activeCount > 0 ? 'border-blue-400 text-blue-600' : ''}`}>
        <Filter size={13} />
        Filter
        {activeCount > 0 && <span className="ml-1 bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">{activeCount}</span>}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute left-0 top-9 z-50 bg-white border border-gray-200 rounded-lg shadow-dropdown w-72 p-4 animate-slide-down">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Filter Records</span>
            <div className="flex gap-2">
              {activeCount > 0 && <button onClick={() => { onFilter?.('__clear__'); }} className="text-xs text-red-500 hover:underline">Clear</button>}
              <button onClick={() => setOpen(false)}><X size={14} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
          </div>
          <div className="space-y-3">
            {filters.map(f => (
              <div key={f.key}>
                <label className="text-xs font-medium text-gray-500 mb-1 block">{f.label}</label>
                {f.type === 'select' ? (
                  <select className="z-select text-xs" value={activeFilters[f.key] || ''} onChange={e => onFilter?.(f.key, e.target.value)}>
                    <option value="">All</option>
                    {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type || 'text'} className="z-input text-xs" placeholder={f.placeholder || f.label} value={activeFilters[f.key] || ''} onChange={e => onFilter?.(f.key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setOpen(false)} className="z-btn-primary text-xs w-full mt-3 justify-center">Apply Filters</button>
        </div>
      )}
    </div>
  );
}
