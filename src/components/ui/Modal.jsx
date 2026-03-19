import React from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  if (!open) return null
  const sizeMap = { sm: '400px', md: '600px', lg: '800px', xl: '1000px' }
  return createPortal(
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-in" style={{ maxWidth: sizeMap[size] }}>
        <div className="modal-header">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}