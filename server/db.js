import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'portfolio.json');

// Initial seed data
const initialData = {
  profile: {
    name: "S S Danush",
    title: "Full-Stack & AI Engineer",
    bio: "Building high-performance web applications, resilient distributed systems, and intuitive AI-powered digital experiences with modern web architecture.",
    tagline: "Translating complex algorithms into scalable, beautifully engineered web products.",
    location: "Chennai, IN (Open to Remote)",
    status: "Available for high-impact roles & consulting",
    resumeUrl: "#resume",
    socials: {
      github: "https://github.com/ssdanush22-rgb",
      linkedin: "https://www.linkedin.com/in/s-s-danush-b2348b276/",
      twitter: "https://x.com/SSDanush189491",
      email: "ssdanush22@gmail.com"
    },
    stats: [
      { label: "Years Experience", value: "6+" },
      { label: "Projects Delivered", value: "32+" },
      { label: "Code Contributions", value: "4.8k+" },
      { label: "Client Satisfaction", value: "99.4%" }
    ]
  },

  skills: [
    {
      id: "fe-react",
      name: "React.js / Next.js",
      category: "Frontend",
      level: 95,
      icon: "Code2",
      description: "Custom hooks, state management, SSR, Server Components, concurrent rendering.",
      tags: ["Hooks", "Context API", "Redux Toolkit", "Next.js 14", "Zustand"]
    },
    {
      id: "fe-js",
      name: "TypeScript / ES6+",
      category: "Frontend",
      level: 92,
      icon: "FileCode",
      description: "Strict typing, generics, async workflows, module federation, DOM optimization.",
      tags: ["Generics", "Async/Await", "Web Workers", "DOM APIs"]
    },
    {
      id: "fe-css",
      name: "CSS3 / Design Systems",
      category: "Frontend",
      level: 90,
      icon: "Palette",
      description: "Vanilla CSS, CSS Modules, Tailwind, Glassmorphism, Responsive Grid, Animations.",
      tags: ["Variables", "Grid/Flex", "Keyframes", "Custom Properties"]
    },
    {
      id: "be-node",
      name: "Node.js / Express",
      category: "Backend",
      level: 94,
      icon: "Server",
      description: "RESTful APIs, middleware architecture, event loops, streaming, microservices.",
      tags: ["Express", "JWT", "WebSockets", "Streams", "Middleware"]
    },
    {
      id: "be-db",
      name: "PostgreSQL & SQLite & Redis",
      category: "Backend",
      level: 88,
      icon: "Database",
      description: "Database modeling, complex SQL queries, index optimization, query caching.",
      tags: ["SQL", "Migrations", "Transactions", "ORMs", "Redis Cache"]
    },
    {
      id: "be-python",
      name: "Python / FastApi",
      category: "Backend",
      level: 85,
      icon: "Terminal",
      description: "Backend services, data parsing, machine learning pipelines, asynchronous API tasks.",
      tags: ["FastAPI", "Pydantic", "Asyncio", "Pandas"]
    },
    {
      id: "ai-llm",
      name: "AI & LLM Integration",
      category: "AI / ML",
      level: 89,
      icon: "Cpu",
      description: "OpenAI API, LangChain, RAG architecture, vector search, custom AI agents.",
      tags: ["RAG", "Vector DBs", "Embeddings", "Prompt Engineering"]
    },
    {
      id: "cloud-ops",
      name: "Docker, CI/CD & Cloud",
      category: "DevOps & Cloud",
      level: 86,
      icon: "Cloud",
      description: "Containerization, GitHub Actions, AWS (S3, Lambda, EC2), Vercel, Nginx.",
      tags: ["Docker", "GitHub Actions", "AWS", "Nginx", "Linux"]
    },
    {
      id: "web-dev",
      name: "Web Developer",
      category: "Frontend",
      level: 93,
      icon: "Globe",
      description: "End-to-end web development with HTML5, CSS3, JavaScript, and modern frameworks. Responsive layouts, accessibility, and performance optimization.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "REST APIs", "SEO"]
    },
    {
      id: "android-dev",
      name: "Android Developer",
      category: "Mobile",
      level: 82,
      icon: "Smartphone",
      description: "Native Android application development using Kotlin & Java. UI design with Jetpack Compose, Firebase integration, and Play Store deployment.",
      tags: ["Kotlin", "Java", "Jetpack Compose", "Firebase", "Android SDK", "Material UI"]
    }
  ],

  projects: [
    {
      id: "ERP-Portal",
      title: "Web-Based ERP Portal",
      category: "Enterprise Web Application",
      tagline: "A comprehensive web-based ERP portal for managing business operations, including inventory, sales, and HR modules.",
      description: "Developed a full-stack ERP portal using React for the frontend and Node.js/Express for the backend. Implemented secure authentication, role-based access control, and real-time data updates with WebSockets. Integrated PostgreSQL for relational data management and Redis for caching frequently accessed data.",
      techStack: ["React.js", "Node.js", "Express", "PostgreSQL", "Redis", "WebSockets", "JWT Authentication"],
      github: "https://github.com/ssdanush22-rgb/ERP-Portal",
      featured: true,
      imagePlaceholder: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
      metrics: {
        users: "12,400+ Active",
        speed: "180ms Latency",
        stars: "1.2k Stars"
      },
      architecture: [
        "React SPA with dynamic routing and lazy-loaded components.",
        "Node.js/Express REST API with JWT-based authentication and role-based access control.",
        "PostgreSQL relational database with optimized indexing and query caching via Redis.",
        "WebSocket implementation for real-time notifications and updates.",
        "Deployed on AWS EC2 with Nginx reverse proxy and SSL termination."
      ],
      features: [
        "Role-based access control for different user types (Admin, Manager, Employee).",
        "Real-time inventory and sales tracking with WebSocket notifications.",
        "Responsive UI with Material-UI and custom design system for consistent branding.",
        "Comprehensive reporting module with export options (PDF, CSV).",
        "Secure authentication with JWT and password hashing using bcrypt."
      ]
    },
  ],

  experiences: [
    {
      id: "exp-1",
      role: "Web Developer & Cloud Solutions Engineer",
      company: "Cod Gallata",
      period: "2023 - Present",
      location: "Chennai, IN (Remote)",
      type: "Full-time",
      highlights: [
        "Led the development of a modern web application using React and Node.js, resulting in a 40% reduction in UI component development time.",
        "Implemented cloud-based solutions on AWS, including S3 for storage and Lambda for serverless functions, improving system scalability and reducing operational costs by 25%.",
        "Optimized database queries and implemented caching strategies, enhancing application performance and reducing average response time by 30%."
      ],
      skills: ["React", "Node.js", "AWS", "REST APIs", "Performance Optimization"]
    },
    {
      id: "exp-2",
      role: "Frontend & Web Developer",
      company: "Vanguard Software Inc",
      period: "2023 - 2024",
      location: "Chennai, IN (Remote)",
      type: "Full-time",
      highlights: [
        "Developed and maintained responsive web applications using React, TypeScript, and CSS Modules, ensuring cross-browser compatibility and accessibility compliance.",
        "Collaborated with UX/UI designers to implement design systems and reusable components, improving development efficiency and consistency across projects.",
        "Integrated third-party APIs and services, enhancing application functionality and user experience, while maintaining high code quality through unit testing and code reviews."
      ],
      skills: ["React", "TypeScript", "CSS Modules", "API Integration", "Unit Testing"]
    },
    {
      id: "exp-3",
      role: "Full-Stack Software Engineer",
      company: "CloudScale Systems",
      period: "2019 - 2021",
      location: "Seattle, WA",
      type: "Full-time",
      highlights: [
        "Developed end-to-end full-stack web features using Node.js, Express, HTML5, CSS3, and JavaScript.",
        "Created background job queues for automated report generation and email notifications.",
        "Collaborated with UX designers to craft responsive user experiences tailored for desktop & mobile."
      ],
      skills: ["Node.js", "JavaScript", "HTML/CSS", "SQLite/MySQL", "Git"]
    }
  ],

  messages: [
    {
      id: "msg-sample-1",
      name: "Sarah Chen",
      email: "sarah.chen@techventures.io",
      subject: "Senior Full-Stack Role Opportunity",
      message: "Hi Danush! Really impressed by your HyperFlow AI project. We are looking for a Lead Full-Stack Engineer to join our team. Would love to connect!",
      timestamp: "2026-08-10T14:32:00.000Z"
    }
  ],

  analytics: {
    totalViews: 1420,
    projectClicks: 538,
    resumeDownloads: 194,
    messagesCount: 1,
    recentInteractions: [
      { type: "page_view", timestamp: new Date().toISOString() }
    ]
  }
};

// Database class with persistence helper
class PortfolioDB {
  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading DB file, initializing seed data:', err.message);
    }
    this.saveData(initialData);
    return initialData;
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB file:', err.message);
    }
  }

  getProfile() {
    return this.data.profile;
  }

  getSkills() {
    return this.data.skills;
  }

  getProjects() {
    return this.data.projects;
  }

  getExperiences() {
    return this.data.experiences;
  }

  addMessage(messageObj) {
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: messageObj.name,
      email: messageObj.email,
      subject: messageObj.subject || 'Portfolio Inquiry',
      message: messageObj.message,
      timestamp: new Date().toISOString()
    };
    this.data.messages.unshift(newMessage);
    this.data.analytics.messagesCount = this.data.messages.length;
    this.saveData();
    return newMessage;
  }

  getMessages() {
    return this.data.messages;
  }

  trackAnalytics(eventType) {
    if (!this.data.analytics) {
      this.data.analytics = { totalViews: 0, projectClicks: 0, resumeDownloads: 0, messagesCount: 0, recentInteractions: [] };
    }

    if (eventType === 'page_view') {
      this.data.analytics.totalViews = (this.data.analytics.totalViews || 0) + 1;
    } else if (eventType === 'project_click') {
      this.data.analytics.projectClicks = (this.data.analytics.projectClicks || 0) + 1;
    } else if (eventType === 'resume_download') {
      this.data.analytics.resumeDownloads = (this.data.analytics.resumeDownloads || 0) + 1;
    }

    if (!Array.isArray(this.data.analytics.recentInteractions)) {
      this.data.analytics.recentInteractions = [];
    }

    this.data.analytics.recentInteractions.unshift({
      type: eventType,
      timestamp: new Date().toISOString()
    });

    // Keep last 50 interactions
    if (this.data.analytics.recentInteractions.length > 50) {
      this.data.analytics.recentInteractions.pop();
    }

    this.saveData();
    return this.data.analytics;
  }

  getAnalytics() {
    return this.data.analytics;
  }
}

export const db = new PortfolioDB();
