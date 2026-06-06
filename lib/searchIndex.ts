// ── lib/searchIndex.ts ───────────────────────────────────────────────────────
// Single-source search index built from the same data objects used by pages.
// Both SearchPanel and CommandPalette import SEARCH_INDEX — no duplicated data.
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchEntry {
  id: string;
  sectionId: "about" | "projects" | "skills" | "experience" | "contact";
  sectionLabel: string;
  content: string;      // full searchable text (lowercased at query time)
  preview: string;      // short display snippet
  navigateTo: string;   // URL path
}

// ── About section data ────────────────────────────────────────────────────────
const aboutEntries: SearchEntry[] = [
  {
    id: "about-bio",
    sectionId: "about",
    sectionLabel: "About",
    content: "Rohan Nagare Final year IT Engineering student passionate about Web Development AI building innovative developer tools Pune India",
    preview: "Bio — Rohan Nagare, Pune",
    navigateTo: "/",
  },
  {
    id: "about-doing-1",
    sectionId: "about",
    sectionLabel: "About",
    content: "Building a VS Code Extension Code Context Navigator",
    preview: "Currently: VS Code Extension — Code Context Navigator",
    navigateTo: "/",
  },
  {
    id: "about-doing-2",
    sectionId: "about",
    sectionLabel: "About",
    content: "Exploring Large Language Models and RAG pipelines LLM AI",
    preview: "Currently: Exploring LLMs and RAG pipelines",
    navigateTo: "/",
  },
  {
    id: "about-doing-3",
    sectionId: "about",
    sectionLabel: "About",
    content: "Contributing to open-source developer tooling GitHub",
    preview: "Currently: Open-source developer tooling",
    navigateTo: "/",
  },
  {
    id: "about-interests",
    sectionId: "about",
    sectionLabel: "About",
    content: "Full-Stack Web Development Artificial Intelligence ML Developer Tools DX Competitive Programming",
    preview: "Interests: Full-Stack, AI/ML, Dev Tools, CP",
    navigateTo: "/",
  },
  {
    id: "about-stats",
    sectionId: "about",
    sectionLabel: "About",
    content: "400 GitHub Contributions 200 VS Code Extension Installs 450 LeetCode Problems 10 Projects Shipped",
    preview: "Stats: 400+ contributions, 450+ LeetCode, 10+ projects",
    navigateTo: "/",
  },
];

// ── Projects section data ─────────────────────────────────────────────────────
const projectsEntries: SearchEntry[] = [
  {
    id: "project-ccn",
    sectionId: "projects",
    sectionLabel: "Projects",
    content: "Code Context Navigator VS Code Extension TypeScript VS Code API Tree-sitter LLM semantic code graph AI function summaries cross-file dependency tracking active",
    preview: "Code Context Navigator — VS Code Extension",
    navigateTo: "/projects",
  },
  {
    id: "project-battleship",
    sectionId: "projects",
    sectionLabel: "Projects",
    content: "Multiplayer Battleship Game Node.js Socket.IO React TypeScript real-time rooms spectators chat replay latency matchmaking",
    preview: "Multiplayer Battleship — Node.js, Socket.IO",
    navigateTo: "/projects",
  },
  {
    id: "project-safemap",
    sectionId: "projects",
    sectionLabel: "Projects",
    content: "Safe Neighborhood Map D3.js React MongoDB community safety heatmap hackathon Best Social Impact incident reports clustering",
    preview: "Safe Neighborhood Map — Hackathon Winner",
    navigateTo: "/projects",
  },
  {
    id: "project-webide",
    sectionId: "projects",
    sectionLabel: "Projects",
    content: "Web IDE Subdomain Hosting Next.js Monaco Editor Docker Nginx PostgreSQL browser IDE subdomain live deployment collaborative",
    preview: "Web IDE — Monaco Editor, Docker, Nginx",
    navigateTo: "/projects",
  },
];

// ── Skills section data ───────────────────────────────────────────────────────
const skillsEntries: SearchEntry[] = [
  {
    id: "skills-languages",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "TypeScript JavaScript Python Java C++ programming languages",
    preview: "Languages: TypeScript, JavaScript, Python, Java, C++",
    navigateTo: "/skills",
  },
  {
    id: "skills-frontend",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "React Next.js TailwindCSS D3.js HTML5 CSS3 frontend web UI",
    preview: "Frontend: React, Next.js, Tailwind, D3.js",
    navigateTo: "/skills",
  },
  {
    id: "skills-backend",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "Node.js Express REST APIs Socket.IO GraphQL backend server API",
    preview: "Backend: Node.js, Express, REST APIs, Socket.IO",
    navigateTo: "/skills",
  },
  {
    id: "skills-ai",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "Machine Learning scikit-learn Pandas NumPy LLM Integration RAG Pipelines LangChain AI artificial intelligence",
    preview: "AI/ML: LLM, RAG, LangChain, scikit-learn",
    navigateTo: "/skills",
  },
  {
    id: "skills-databases",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "PostgreSQL MongoDB Redis Supabase database SQL NoSQL",
    preview: "Databases: PostgreSQL, MongoDB, Redis, Supabase",
    navigateTo: "/skills",
  },
  {
    id: "skills-devops",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "Docker Git GitHub Linux Nginx VS Code Vercel AWS S3 EC2 DevOps cloud deployment",
    preview: "DevOps: Docker, Git, Linux, Nginx, AWS",
    navigateTo: "/skills",
  },
  {
    id: "skills-learning",
    sectionId: "skills",
    sectionLabel: "Skills",
    content: "Rust WebAssembly Kubernetes currently learning",
    preview: "Learning: Rust, WebAssembly, Kubernetes",
    navigateTo: "/skills",
  },
];

// ── Experience section data ───────────────────────────────────────────────────
const experienceEntries: SearchEntry[] = [
  {
    id: "exp-education",
    sectionId: "experience",
    sectionLabel: "Experience",
    content: "B.E. Information Technology Savitribai Phule Pune University CGPA 8.6 Data Structures DBMS OS Machine Learning Computer Networks Cloud Computing education degree 2021 2025",
    preview: "B.E. IT — Savitribai Phule Pune University (CGPA 8.6)",
    navigateTo: "/experience",
  },
  {
    id: "exp-opensource",
    sectionId: "experience",
    sectionLabel: "Experience",
    content: "Open Source Contributor developer-tooling VS Code extension 200 installs GitHub 400 contributions 2023 present",
    preview: "Open Source Contributor — 400+ GitHub contributions",
    navigateTo: "/experience",
  },
  {
    id: "exp-hackathon",
    sectionId: "experience",
    sectionLabel: "Experience",
    content: "Hackathon Lead Developer Best Social Impact PuneTech 2024 HackWithInfy 2023 AI resume ranker finalist",
    preview: "Hackathon Lead — PuneTech Winner 2024",
    navigateTo: "/experience",
  },
  {
    id: "exp-freelance",
    sectionId: "experience",
    sectionLabel: "Experience",
    content: "Freelance Web Developer remote landing pages dashboards client projects 2022 2023 page load time CDN",
    preview: "Freelance Web Developer — 5+ client projects",
    navigateTo: "/experience",
  },
  {
    id: "exp-certs",
    sectionId: "experience",
    sectionLabel: "Experience",
    content: "AWS Cloud Practitioner 2024 Meta Front-End Developer Certificate 2023 DeepLearning.AI ML Specialisation certification",
    preview: "Certifications: AWS, Meta, DeepLearning.AI",
    navigateTo: "/experience",
  },
];

// ── Contact section data ──────────────────────────────────────────────────────
const contactEntries: SearchEntry[] = [
  {
    id: "contact-github",
    sectionId: "contact",
    sectionLabel: "Contact",
    content: "GitHub github.com/rohannagare rohannagare",
    preview: "GitHub — github.com/rohannagare",
    navigateTo: "/contact",
  },
  {
    id: "contact-linkedin",
    sectionId: "contact",
    sectionLabel: "Contact",
    content: "LinkedIn linkedin.com/in/rohannagare rohannagare",
    preview: "LinkedIn — linkedin.com/in/rohannagare",
    navigateTo: "/contact",
  },
  {
    id: "contact-email",
    sectionId: "contact",
    sectionLabel: "Contact",
    content: "Email rohannagare.dev@gmail.com mail",
    preview: "Email — rohannagare.dev@gmail.com",
    navigateTo: "/contact",
  },
  {
    id: "contact-twitter",
    sectionId: "contact",
    sectionLabel: "Contact",
    content: "Twitter @rohannagare social",
    preview: "Twitter — @rohannagare",
    navigateTo: "/contact",
  },
  {
    id: "contact-open",
    sectionId: "contact",
    sectionLabel: "Contact",
    content: "open to full-time SDE roles internship open-source collaboration pair programming tech coffee chats hiring",
    preview: "Open to: SDE roles, internships, collaboration",
    navigateTo: "/contact",
  },
];

// ── Full index ────────────────────────────────────────────────────────────────
export const SEARCH_INDEX: SearchEntry[] = [
  ...aboutEntries,
  ...projectsEntries,
  ...skillsEntries,
  ...experienceEntries,
  ...contactEntries,
];

/** Simple case-insensitive search returning matching entries */
export function searchIndex(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return SEARCH_INDEX.filter((entry) =>
    entry.content.toLowerCase().includes(q) ||
    entry.preview.toLowerCase().includes(q)
  );
}
