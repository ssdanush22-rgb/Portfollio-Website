import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, Building2 } from 'lucide-react';

export default function ExperienceSection({ experiences }) {
  const [activeTab, setActiveTab] = useState('work');

  const educationData = [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'University of California, Berkeley',
      period: '2015 - 2019',
      location: 'Berkeley, CA',
      highlights: [
        'Graduated Magna Cum Laude with 3.92 GPA.',
        'Specialized in Distributed Systems, Algorithms, and Software Architecture.',
        'President of the Open Source Developer Club (2018-2019).'
      ],
      skills: ['Algorithms', 'Data Structures', 'Operating Systems', 'Database Systems']
    },
    {
      id: 'edu-2',
      degree: 'AWS Certified Solutions Architect – Professional',
      institution: 'Amazon Web Services',
      period: 'Issued 2024',
      location: 'Global Certification',
      highlights: [
        'Advanced architecture design for multi-region high-availability enterprise applications.',
        'Cost optimization and cloud migration strategy mastery.'
      ],
      skills: ['AWS Lambda', 'ECS/EKS', 'DynamoDB', 'CloudFront', 'IAM Architecture']
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career Journey & Credentials</span>
          </div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            A track record of engineering leadership, scalable backend APIs, and modern frontend user experiences.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="experience-tab-switcher">
          <button
            onClick={() => setActiveTab('work')}
            className={`exp-tab-btn ${activeTab === 'work' ? 'active' : ''}`}
          >
            <Briefcase size={16} />
            <span>Work Experience</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          >
            <Award size={16} />
            <span>Education & Certifications</span>
          </button>
        </div>

        {/* Timeline View */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {activeTab === 'work' ? (
            experiences.map((exp, idx) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-inner" />
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <span className="company-badge">
                        <Building2 size={13} />
                        <span>{exp.company}</span>
                      </span>
                      <h3 className="role-title">{exp.role}</h3>
                    </div>
                    <div className="timeline-meta">
                      <span className="meta-pill">
                        <Calendar size={13} />
                        <span>{exp.period}</span>
                      </span>
                      <span className="meta-pill">
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  <ul className="highlights-list">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={16} className="accent-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            educationData.map((edu) => (
              <div key={edu.id} className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-inner" />
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <span className="company-badge">
                        <Award size={13} />
                        <span>{edu.institution}</span>
                      </span>
                      <h3 className="role-title">{edu.degree}</h3>
                    </div>
                    <div className="timeline-meta">
                      <span className="meta-pill">
                        <Calendar size={13} />
                        <span>{edu.period}</span>
                      </span>
                      <span className="meta-pill">
                        <MapPin size={13} />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                  </div>

                  <ul className="highlights-list">
                    {edu.highlights.map((item, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={16} className="accent-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-skills">
                    {edu.skills.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
