import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://ssdanush22-rgb.github.io'
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes

// GET /api/profile
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.getProfile();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/skills
app.get('/api/skills', (req, res) => {
  try {
    const { category, search } = req.query;
    let skills = db.getSkills();

    if (category && category !== 'All') {
      skills = skills.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const query = search.toLowerCase();
      skills = skills.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.description.toLowerCase().includes(query) ||
        s.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/projects
app.get('/api/projects', (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let projects = db.getProjects();

    if (featured === 'true') {
      projects = projects.filter(p => p.featured);
    }

    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const query = search.toLowerCase();
      projects = projects.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.techStack.some(t => t.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/projects/:id
app.get('/api/projects/:id', (req, res) => {
  try {
    const projects = db.getProjects();
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    // Track click analytics
    db.trackAnalytics('project_click');
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/experiences
app.get('/api/experiences', (req, res) => {
  try {
    const experiences = db.getExperiences();
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields.' 
      });
    }

    // Basic email regex test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      });
    }

    const savedMessage = db.addMessage({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: savedMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contact/messages (Admin view for testing)
app.get('/api/contact/messages', (req, res) => {
  try {
    const messages = db.getMessages();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/analytics/track
app.post('/api/analytics/track', (req, res) => {
  try {
    const { eventType } = req.body;
    const analytics = db.trackAnalytics(eventType || 'page_view');
    res.json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/analytics/stats
app.get('/api/analytics/stats', (req, res) => {
  try {
    const analytics = db.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Serve frontend static assets in production mode
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all handler for static assets / client routing
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('API Server active. Front-end is running in Vite dev mode.');
  }
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Portfolio Express Backend running on port ${PORT}`);
  console.log(`👉 API Endpoints: http://localhost:${PORT}/api/profile`);
  console.log(`=================================================`);
});
