import React, { useState, useEffect } from 'react';
import { Activity, Eye, MousePointer, Download, MessageSquare, RefreshCw } from 'lucide-react';

export default function AnalyticsWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    fetch('/api/analytics/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Record page view on load
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'page_view' })
    })
      .then(() => fetchStats())
      .catch(() => fetchStats());
  }, []);

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        <div className="analytics-bar glass-card">
          <div className="analytics-title">
            <Activity size={16} className="accent-icon pulse" />
            <span>Backend Analytics Tracker</span>
            <button onClick={fetchStats} className="refresh-btn" title="Refresh Live Server Stats">
              <RefreshCw size={13} className={loading ? 'spin' : ''} />
            </button>
          </div>

          <div className="analytics-metrics">
            <div className="analytic-item">
              <Eye size={14} className="metric-icon" />
              <span className="analytic-val">{stats?.totalViews || 0}</span>
              <span className="analytic-lbl">Page Views</span>
            </div>

            <div className="analytic-item">
              <MousePointer size={14} className="metric-icon" />
              <span className="analytic-val">{stats?.projectClicks || 0}</span>
              <span className="analytic-lbl">Project Clicks</span>
            </div>

            <div className="analytic-item">
              <Download size={14} className="metric-icon" />
              <span className="analytic-val">{stats?.resumeDownloads || 0}</span>
              <span className="analytic-lbl">CV Downloads</span>
            </div>

            <div className="analytic-item">
              <MessageSquare size={14} className="metric-icon" />
              <span className="analytic-val">{stats?.messagesCount || 0}</span>
              <span className="analytic-lbl">Messages</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright-text">
            © {new Date().getFullYear()} S S Danush. Engineered with React 19, Express.js & SQLite.
          </p>
          <div className="footer-links">
            <a href="#hero">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
