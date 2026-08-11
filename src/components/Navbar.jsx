import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Layers, Briefcase, Mail, Palette, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeSection, onOpenThemeModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'terminal', label: 'Terminal Demo', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="nav-logo">
          <div className="logo-icon">
            <Terminal size={20} className="accent-icon" />
          </div>
          <span className="logo-text">
            S S <span className="gradient-text">Danush</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">
            <button
              onClick={onOpenThemeModal}
              className="theme-toggle-btn"
              title="Customize Accent Color Theme"
            >
              <Palette size={18} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-primary btn-sm"
            >
              Hire Me
            </button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="mobile-actions">
          <button
            onClick={onOpenThemeModal}
            className="theme-toggle-btn"
            title="Theme Palette"
          >
            <Palette size={18} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
