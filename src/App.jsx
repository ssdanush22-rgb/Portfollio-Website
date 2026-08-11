import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import TerminalDemo from './components/TerminalDemo';
import ContactSection from './components/ContactSection';
import AnalyticsWidget from './components/AnalyticsWidget';
import ThemeModal from './components/ThemeModal';
import Toast from './components/Toast';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  const [activeSection, setActiveSection] = useState('hero');
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  // Fetch profile, skills, projects, experience from backend API
  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => data.success && setProfile(data.data))
      .catch(() => {});

    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => data.success && setSkills(data.data))
      .catch(() => {});

    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => data.success && setProjects(data.data))
      .catch(() => {});

    fetch('/api/experiences')
      .then((res) => res.json())
      .then((data) => data.success && setExperiences(data.data))
      .catch(() => {});
  }, []);

  // Theme changing handler
  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    if (themeId === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    showToast(`Color theme updated to ${themeId}!`, 'info');
    setThemeModalOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'experience', 'terminal', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      const navHeight = 70;
      window.scrollTo({
        top: el.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-main-wrapper">
      {/* Background Interactive Particle Mesh */}
      <ParticleCanvas />

      {/* Glassmorphic Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenThemeModal={() => setThemeModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        profile={profile}
        onOpenTerminal={handleOpenTerminal}
        showToast={showToast}
      />

      {/* Skills Matrix */}
      <SkillsSection skills={skills} />

      {/* Projects Showcase */}
      <ProjectsSection projects={projects} />

      {/* Experience & Credentials */}
      <ExperienceSection experiences={experiences} />

      {/* Interactive CLI Terminal Demo */}
      <TerminalDemo
        profile={profile}
        skills={skills}
        projects={projects}
        onOpenThemeModal={() => setThemeModalOpen(true)}
        showToast={showToast}
      />

      {/* Functional Contact Form & Message History */}
      <ContactSection profile={profile} showToast={showToast} />

      {/* Analytics & Footer */}
      <AnalyticsWidget />

      {/* Theme Accent Picker Modal */}
      {themeModalOpen && (
        <ThemeModal
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          onClose={() => setThemeModalOpen(false)}
        />
      )}

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
