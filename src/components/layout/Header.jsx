import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Settings, Share2, CheckSquare, Clock, X, Check } from 'lucide-react';

export default function Header() {
  const { notifications, markNotificationRead, unreadCount, searchQuery, setSearchQuery } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-dark-900/80 backdrop-blur-sm border-b border-white/5 flex items-center px-6 gap-4 z-40 sticky top-0">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Settings"
        >
          <Settings size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors">
          <Share2 size={18} />
        </button>
        <button
          onClick={() => navigate('/tasks')}
          className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <CheckSquare size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors">
          <Clock size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-dark-800 border border-white/10 rounded-xl shadow-2xl z-50 animate-slide-in">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-semibold text-white text-sm">Notifications</h3>
                <button onClick={() => setShowNotifications(false)}>
                  <X size={16} className="text-slate-400 hover:text-white" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`flex items-start gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0 ${!n.read ? 'bg-primary-500/5' : ''}`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-primary-400' : 'bg-slate-600'}`} />
                    <div className="flex-1">
                      <p className="text-xs text-slate-300">{n.message}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <Check size={12} className="text-primary-400 mt-1" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
