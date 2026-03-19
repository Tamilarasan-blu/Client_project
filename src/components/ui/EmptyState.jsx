export default function EmptyState({ icon: Icon, title = 'No entries found', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Icon size={28} className="text-slate-500" />
        </div>
      )}
      <p className="text-slate-400 font-medium mb-1">{title}</p>
      {description && <p className="text-slate-600 text-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
