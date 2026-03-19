import { List, Grid, Columns } from 'lucide-react';
import { useApp } from '../../context/AppContext';
export default function ViewToggle({ views = ['list', 'kanban'] }) {
  const { viewMode, setViewMode } = useApp();
  const icons = { list: List, kanban: Columns, grid: Grid };
  return (
    <div className="flex border border-gray-200 rounded-md overflow-hidden">
      {views.map(v => {
        const Icon = icons[v] || List;
        return (
          <button key={v} onClick={() => setViewMode(v)}
            className={`px-2.5 py-1.5 transition-colors ${viewMode === v ? 'bg-[#0069d9] text-white' : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
            title={v.charAt(0).toUpperCase() + v.slice(1) + ' View'}>
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
