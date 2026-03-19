import { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';

export default function KanbanBoard({ columns, cards, cardKey = 'id', renderCard, onCardClick, onAddCard }) {
  const [dragging, setDragging] = useState(null);

  const getCards = (colId) => cards.filter(c => c.stage === colId || c.status === colId);

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 pt-1">
      {columns.map(col => {
        const colCards = getCards(col.name || col.id);
        const total = colCards.reduce((s, c) => s + (c.amount || 0), 0);
        return (
          <div key={col.name || col.id} className="z-kanban-col flex-shrink-0">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color || '#94a3b8' }} />
                <span className="text-xs font-semibold text-gray-700 truncate">{col.name || col.id}</span>
                <span className="text-xs text-gray-400">({colCards.length})</span>
              </div>
              {total > 0 && <span className="text-xs text-gray-500">₹{(total/100000).toFixed(1)}L</span>}
            </div>

            {/* Cards */}
            <div className="space-y-2 min-h-[100px] p-2 bg-gray-100/60 rounded-lg">
              {colCards.map(card => (
                <div key={card[cardKey]}
                  onClick={() => onCardClick?.(card)}
                  className="z-kanban-card"
                  style={{ borderLeftColor: col.color || '#94a3b8' }}
                >
                  {renderCard ? renderCard(card, col) : (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-1 leading-tight">{card.name || card.subject}</p>
                      {card.amount && <p className="text-xs text-green-600 font-medium">₹{card.amount.toLocaleString()}</p>}
                      {card.contact && <p className="text-xs text-gray-500 mt-1">{card.contact}</p>}
                    </div>
                  )}
                </div>
              ))}
              {onAddCard && (
                <button onClick={() => onAddCard?.(col)}
                  className="w-full flex items-center gap-1.5 p-2 text-xs text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors border border-dashed border-gray-200 hover:border-gray-300">
                  <Plus size={12} /> Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
