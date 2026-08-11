import React from 'react';
import { X, ExternalLink, Layers, Check, Cpu, Server } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="project-category-badge">{project.category}</span>
            <h2 className="modal-project-title">{project.title}</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Visual Banner */}
        <div className="modal-banner" style={{ background: project.imagePlaceholder }}>
          <div className="banner-overlay-text">
            <h3>{project.title}</h3>
            <p>{project.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          <div className="modal-section">
            <h4 className="modal-heading">Overview</h4>
            <p className="modal-text">{project.description}</p>
          </div>

          {/* Key Impact Metrics */}
          {project.metrics && (
            <div className="modal-section">
              <h4 className="modal-heading">Impact Metrics</h4>
              <div className="modal-metrics-grid">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="metric-chip">
                    <span className="metric-val gradient-text">{val}</span>
                    <span className="metric-key">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.features && (
            <div className="modal-section">
              <h4 className="modal-heading">Key Features</h4>
              <ul className="modal-features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <Check size={16} className="accent-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architecture && (
            <div className="modal-section">
              <h4 className="modal-heading">System Architecture</h4>
              <div className="modal-arch-box">
                {project.architecture.map((archLine, idx) => (
                  <div key={idx} className="arch-step">
                    <span className="step-num">{idx + 1}</span>
                    <span>{archLine}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="modal-section">
            <h4 className="modal-heading">Technologies Used</h4>
            <div className="modal-tech-flex">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag-pill accent">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <span>Launch Live Demo</span>
            <ExternalLink size={16} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <GithubIcon size={16} />
            <span>GitHub Repository</span>
          </a>
        </div>

      </div>
    </div>
  );
}
