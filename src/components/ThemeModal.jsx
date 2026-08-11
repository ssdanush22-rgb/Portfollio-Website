import React from 'react';
import { X, Palette, Check } from 'lucide-react';

export default function ThemeModal({ currentTheme, onSelectTheme, onClose }) {
  const themes = [
    { id: 'cyan', name: 'Cyber Neon', color: '#06b6d4', desc: 'Futuristic electric cyan & deep sapphire' },
    { id: 'violet', name: 'Deep Violet', color: '#8b5cf6', desc: 'Cosmic magenta & ultraviolet glow' },
    { id: 'emerald', name: 'Emerald Pulse', color: '#10b981', desc: 'Modern emerald green & teal accents' },
    { id: 'amber', name: 'Sunset Amber', color: '#f59e0b', desc: 'Warm amber gold & crimson highlights' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card theme-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Palette size={20} className="accent-icon" />
            <h3 className="modal-project-title">Select Color Theme</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-text" style={{ marginBottom: '1.2rem' }}>
            Choose an accent palette below to dynamically update the application design system.
          </p>

          <div className="theme-options-grid">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`theme-option-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="theme-color-preview" style={{ background: theme.color }}>
                    {isSelected && <Check size={16} color="#ffffff" />}
                  </div>
                  <div className="theme-info">
                    <h4 className="theme-name">{theme.name}</h4>
                    <p className="theme-desc">{theme.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
