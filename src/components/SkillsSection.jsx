import React, { useState } from 'react';
import { Code2, FileCode, Palette, Server, Database, Terminal, Cpu, Cloud, Search, CheckCircle } from 'lucide-react';

const iconMap = {
  Code2,
  FileCode,
  Palette,
  Server,
  Database,
  Terminal,
  Cpu,
  Cloud
};

export default function SkillsSection({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = ['All', 'Frontend', 'Backend', 'AI / ML', 'DevOps & Cloud', 'Mobile'];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      activeCategory === 'All' || skill.category.toLowerCase().includes(activeCategory.toLowerCase().replace(' & ', ''));
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        
        {/* Section Title Header */}
        <div className="section-header">
          <div className="section-badge">
            <Code2 size={14} />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Architectural Stack</span>
          </h2>
          <p className="section-subtitle">
            A battle-tested set of web frameworks, backend microservices, database architectures, and AI tooling.
          </p>
        </div>

        {/* Filter Controls Bar */}
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
              placeholder="Search skills or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            const isSelected = selectedSkill?.id === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(isSelected ? null : skill)}
                className={`glass-card skill-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="skill-card-top">
                  <div className="skill-icon-wrapper">
                    <IconComponent size={22} className="accent-icon" />
                  </div>
                  <div className="skill-meta">
                    <span className="skill-category-tag">{skill.category}</span>
                    <h3 className="skill-name">{skill.name}</h3>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>

                {/* Animated Level Bar */}
                <div className="skill-progress-bg">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p className="skill-description">{skill.description}</p>

                {/* Tech Tags */}
                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="empty-state glass-card">
            <p>No matching skills found for "{searchQuery}". Try clearing search filters.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline btn-sm">
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
