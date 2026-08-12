import React, { useState } from 'react';
import { API_URL } from '../config';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, MessageSquare, History, User, AtSign, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export default function ContactSection({ profile, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [messagesHistory, setMessagesHistory] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleCopyEmail = () => {
    const email = 'ssdanush22@gmail.com';
    navigator.clipboard.writeText(email);
    showToast('Email address copied to clipboard!', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage({ type: 'success', text: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
        showToast('Message delivered to backend server!', 'success');
        // Refresh messages list if history is open
        if (showHistory) fetchHistory();
      } else {
        setStatusMessage({ type: 'error', text: result.message || 'Failed to send message.' });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Network error connecting to Express server backend.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchHistory = () => {
    fetch(`${API_URL}/api/contact/messages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessagesHistory(data.data);
        }
      })
      .catch(() => {});
  };

  const toggleHistory = () => {
    if (!showHistory) {
      fetchHistory();
    }
    setShowHistory(!showHistory);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, an engineering role opportunity, or just want to talk software architecture? Send a direct message below.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Direct Info */}
          <div className="glass-card contact-info-card">
            <h3 className="card-title">Contact Details</h3>
            <p className="card-desc">
              I'm actively seeking opportunities for senior full-stack roles, contract architecture consulting, and high-impact software engineering projects.
            </p>

          {/*}<div className="info-item">
            <div className="info-icon">
              <Mail size={20} className="accent-icon" />
            </div>
            
            <div className="info-text-group">
              <span className="info-label">Direct Email</span>
              <span className="info-val">ssdanush22@gmail.com</span>
            </div>{*/}

            <button
               type="button"
               onClick={handleCopyEmail}
               className="copy-btn"
               title="Copy Email"
               aria-label="Copy Email"
            >
              <Copy size={16} />
            </button>
          </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} className="accent-icon" />
              </div>

              <div className="info-text-group">
                 <span className="info-label">Location & Status</span>
                 <span className="info-val">
                  {profile?.location || "Chennai (Open to Remote)"}
                </span>
              </div>
            </div>

            <div className="contact-social-box">
              <span className="info-label">Social Channels:</span>
              <div className="social-links-flex">
                <a href={profile?.socials?.github || "https://github.com/ssdanush22-rgb"} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a href={profile?.socials?.linkedin || "https://www.linkedin.com/in/s-s-danush-b2348b276/"} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
                <a href={profile?.socials?.twitter || "https://x.com/SSDanush189491"} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <TwitterIcon size={16} />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            {/* Test Messages Trigger */}
            <div className="admin-demo-box">
              <button onClick={toggleHistory} className="btn btn-outline btn-sm">
                <History size={16} />
                <span>{showHistory ? 'Hide Submitted Messages' : 'View Backend Received Messages'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="card-title">Send a Direct Message</h3>

              {statusMessage && (
                <div className={`status-banner ${statusMessage.type}`}>
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">
                    <User size={14} />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Chen"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <AtSign size={14} />
                    <span>Your Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FileText size={14} />
                  <span>Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Project Consultation / Engineering Role"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={14} />
                  <span>Message</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message details here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-submit"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Received Messages History Modal / Drawer */}
        {showHistory && (
          <div className="messages-history-box glass-card">
            <div className="history-header">
              <h4>Received Messages (Persisted in Express Backend)</h4>
              <span className="count-tag">{messagesHistory?.length || 0} Total Messages</span>
            </div>

            {messagesHistory && messagesHistory.length > 0 ? (
              <div className="history-list">
                {messagesHistory.map((msg) => (
                  <div key={msg.id} className="history-item">
                    <div className="history-item-top">
                      <span className="msg-sender">{msg.name} ({msg.email})</span>
                      <span className="msg-time">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <span className="msg-subj">Subject: {msg.subject}</span>
                    <p className="msg-body">{msg.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No messages received yet. Submit the contact form above to test!</p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
