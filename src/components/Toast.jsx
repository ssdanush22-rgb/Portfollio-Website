import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  const IconComponent = icons[toast.type] || Info;

  return (
    <div className={`toast-container ${toast.type}`}>
      <IconComponent size={18} className="toast-icon" />
      <span className="toast-message">{toast.message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={14} />
      </button>
    </div>
  );
}
