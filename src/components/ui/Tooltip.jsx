import { useState } from 'react';

export default function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  const positionMap = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={`absolute z-50 ${positionMap[position]} bg-dark-800 text-slate-200 text-xs px-2 py-1 rounded-md border border-white/10 whitespace-nowrap shadow-lg`}>
          {content}
        </div>
      )}
    </div>
  );
}
