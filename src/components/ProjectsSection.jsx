import React, { useState } from 'react';
import { Layers, ExternalLink, Star, Search, Sparkles, Eye } from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'AI & Full-Stack', 'Full-Stack Web', 'Web Apps', 'DevOps & Cloud'];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All' || proj.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="section-title">
            Engineering <span className="gradient-text">Showcase</span>
          </h2>
          <p className="section-subtitle">
            Explore full-stack web applications, distributed backend platforms, and intelligent software tools built for speed and scale.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="skills-filter-bar glass-card">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              
              {/* Project Card Header Banner */}
              <div className="project-banner" style={{ background: project.imagePlaceholder }}>
                {project.featured && (
                  <span className="featured-badge">
                    <Sparkles size={12} />
                    <span>Featured</span>
                  </span>
                )}
                <div className="project-overlay-actions">
                  <button
                    onClick={() => handleOpenProject(project)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={14} />
                    <span>Case Study</span>
                  </button>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-card-body">
                <div className="project-meta-top">
                  <span className="project-cat-text">{project.category}</span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc-short">{project.description}</p>

                {/* Tech Stack Pills */}
                <div className="project-tech-pills">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics Footer */}
                {project.metrics && (
                  <div className="project-metrics-row">
                    {Object.values(project.metrics).map((val, i) => (
                      <span key={i} className="metric-badge">
                        {val}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-footer">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="card-action-link"
                >
                  <span>View Case Study & Architecture</span>
                </button>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="github-icon-link"
                  title="View GitHub Code"
                >
                  <GithubIcon size={18} />
                </a>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state glass-card">
            <p>No projects match your filter query "{searchQuery}".</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline btn-sm">
              Reset Project Filters
            </button>
          </div>
        )}

      </div>

      {/* Case Study Detailed Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
