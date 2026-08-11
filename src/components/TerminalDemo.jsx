import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../config';
import { Terminal as TerminalIcon, X, Play, RefreshCw, CornerDownLeft, Sparkles } from 'lucide-react';

export default function TerminalDemo({ profile, skills, projects, onOpenThemeModal, showToast }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to S S Danush Interactive Shell v2.4.0' },
    { type: 'system', text: 'Type "help" to view all available commands.' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmd}` }];
    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Shell Commands:
  help       - Display list of CLI commands
  bio        - Display developer profile bio & summary
  skills     - List top technical skills & proficiencies
  projects   - Show featured engineering projects
  contact    - Display direct contact details & social channels
  stats      - Fetch live backend visitor analytics
  theme      - Open accent theme customizer
  clear      - Clear terminal screen
  sudo       - Execute privileged command`
        });
        break;

      case 'bio':
      case 'about':
        newHistory.push({
          type: 'output',
          text: `Developer Profile:
  Name:     ${profile?.name || 'S S Danush'}
  Title:    ${profile?.title || 'Senior Full-Stack & AI Engineer'}
  Bio:      ${profile?.bio || 'Building high-performance web applications.'}
  Status:   ${profile?.status || 'Open for opportunity'}`
        });
        break;

      case 'skills':
        const skillList = (skills || [])
          .map((s) => `  - ${s.name.padEnd(24)} [${s.category}] -> ${s.level}%`)
          .join('\n');
        newHistory.push({
          type: 'output',
          text: `Technical Proficiency Matrix:\n${skillList}`
        });
        break;

      case 'projects':
        const projList = (projects || [])
          .map((p) => `  * ${p.title.padEnd(26)} | ${p.category}\n    Demo: ${p.demo}`)
          .join('\n');
        newHistory.push({
          type: 'output',
          text: `Featured Engineering Projects:\n${projList}`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Direct Contact Channels:
  Email:    ssdanush22@gmail.com
  GitHub:   https://github.com/ssdanush22-rgb
  LinkedIn: https://www.linkedin.com/in/s-s-danush-b2348b276/
  Twitter:  https://x.com/SSDanush189491`
        });
        break;

      case 'stats':
        fetch(`${API_URL}/api/analytics/stats`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              const s = data.data;
              setHistory((prev) => [
                ...prev,
                {
                  type: 'output',
                  text: `Live Backend Analytics:
  Total Page Views:      ${s.totalViews}
  Project Clicks:        ${s.projectClicks}
  Resume Downloads:      ${s.resumeDownloads}
  Messages Received:     ${s.messagesCount}`
                }
              ]);
            }
          })
          .catch(() => {
            setHistory((prev) => [
              ...prev,
              { type: 'error', text: 'Error connecting to analytics server endpoint.' }
            ]);
          });
        break;

      case 'theme':
        onOpenThemeModal();
        newHistory.push({
          type: 'output',
          text: 'Opened Theme Palette Picker modal.'
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        newHistory.push({
          type: 'output',
          text: 'Access Granted: You are now running in S S Danush Developer Superuser mode! 🚀'
        });
        showToast('Superuser mode activated!', 'success');
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <section id="terminal" className="section terminal-section">
      <div className="container">
        
        {/* Section Title Header */}
        <div className="section-header">
          <div className="section-badge">
            <TerminalIcon size={14} />
            <span>Interactive Command Line</span>
          </div>
          <h2 className="section-title">
            Developer <span className="gradient-text">CLI Terminal</span>
          </h2>
          <p className="section-subtitle">
            Prefer terminal commands over clicking buttons? Query bio data, projects, skills, and server analytics directly in the shell below.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="glass-card terminal-window">
          <div className="terminal-topbar">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="terminal-title">zsh - danush@macbook: ~ (v2.4.0)</span>
            <button
              onClick={() => setHistory([{ type: 'system', text: 'Terminal reset. Type "help" for options.' }])}
              className="terminal-clear-btn"
              title="Reset Terminal"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="terminal-screen">
            {history.map((item, idx) => (
              <div key={idx} className={`terminal-line ${item.type}`}>
                {item.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleCommand} className="terminal-input-row">
            <span className="prompt-label">danush@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help', 'skills', 'projects', 'stats'..."
              className="terminal-input"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="terminal-send-btn">
              <CornerDownLeft size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
