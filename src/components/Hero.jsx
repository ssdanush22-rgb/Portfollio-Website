import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import profilePhoto from '../assets/profile-photo.jpg';

export default function Hero({ profile, onOpenTerminal, showToast }) {
  const [typedRole, setTypedRole] = useState('');
  const roles = [
    'Senior Full-Stack Engineer',
    'Web developer & Cloud Solutions Specialist',
    'Android & iOS App Developer',
    'UI/UX Design Systems Creator'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && typedRole === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedRole === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedRole(
          current.substring(0, isDeleting ? typedRole.length - 1 : typedRole.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  const handleDownloadResume = (e) => {
    e.preventDefault();
    // Track resume download event
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'resume_download' })
    }).catch(() => {});

    showToast('CV / Resume downloaded successfully!', 'success');
  };

  return (
    <section id="hero" className="section hero-section">
      <div className="bg-glow-orb pulse" style={{ top: '-100px', right: '-100px' }} />
      <div className="container hero-container">
        
        {/* Left Bio Column */}
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>{profile?.status || "Available for high-impact roles"}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{profile?.name || "S S Danush"}</span>
          </h1>

          <div className="typing-container">
            <span className="typing-text">{typedRole}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-bio">
            {profile?.bio || "Building high-performance web applications, resilient distributed systems, and intuitive digital experiences with modern web architecture."}
          </p>

          {/* Action CTA Buttons */}
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <button onClick={onOpenTerminal} className="btn btn-secondary">
              <Terminal size={18} />
              <span>Interactive CLI</span>
            </button>
            <a href="#resume" onClick={handleDownloadResume} className="btn btn-outline">
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <span className="social-label">Connect with me:</span>
            <div className="social-icons">
              <a href={profile?.socials?.github || "https://github.com"} target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={profile?.socials?.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={profile?.socials?.twitter || "https://x.com"} target="_blank" rel="noreferrer" className="social-btn" title="Twitter / X">
                <TwitterIcon size={18} />
              </a>
              <a href={`mailto:${profile?.socials?.email || "ssdanush22@gmail.com"}`} className="social-btn" title="Email Direct">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Stats & Badge Card */}
        <div className="hero-visual">
          <div className="glass-card hero-card">
            <div className="card-header-bar">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="window-title">S S Danush — Profile</span>
            </div>

            <div className="passport-photo-wrapper">
              <div className="passport-photo-frame">
                <img
                  src={profilePhoto}
                  alt="S S Danush — Passport Photo"
                  className="passport-photo"
                />
                <div className="passport-photo-glow" />
              </div>
              <div className="passport-name-badge">
                <span className="passport-name gradient-text">{profile?.name || 'S S Danush'}</span>
                <span className="passport-role">{profile?.role || 'Full-Stack Developer'}</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="stats-grid">
              {(profile?.stats || [
                { label: "Years Experience", value: "6+" },
                { label: "Projects Delivered", value: "32+" },
                { label: "Code Contributions", value: "4.8k+" },
                { label: "Client Satisfaction", value: "99.4%" }
              ]).map((stat, idx) => (
                <div key={idx} className="stat-box">
                  <span className="stat-value gradient-text">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
