// lib/fileContents.ts
// All portfolio content displayed in the VS Code editor

export type FileId =
  | "about-me.ts"
  | "projects.ts"
  | "skills.json"
  | "experience.md"
  | "contact.js";

export type FileLanguage = "typescript" | "json" | "markdown" | "javascript";

export interface FileInfo {
  id: FileId;
  icon: string;
  language: FileLanguage;
  content: string;
}

export const FILES: FileInfo[] = [
  {
    id: "about-me.ts",
    icon: "🟦",
    language: "typescript",
    content: `import { Developer } from "@/types/developer";

const rohanNagare: Developer = {
  name: "Rohan Nagare",
  role: "Software Developer",
  location: "Pune, India 🇮🇳",

  bio: \`Final year IT Engineering student passionate about
  Web Development, AI, and building innovative developer
  tools that make engineers' lives easier.\`,

  currentlyDoing: [
    "Building a VS Code Extension — Code Context Navigator",
    "Exploring Large Language Models and RAG pipelines",
    "Contributing to open-source developer tooling",
  ],

  interests: [
    "Full-Stack Web Development",
    "Artificial Intelligence & ML",
    "Developer Tools & DX",
    "Competitive Programming",
  ],

  funFact: "I wrote my first program at 15 and haven't stopped since.",
};

export default rohanNagare;`,
  },
  {
    id: "projects.ts",
    icon: "🟦",
    language: "typescript",
    content: `import { Project } from "@/types/project";

const projects: Project[] = [
  {
    name: "Code Context Navigator",
    description:
      "A VS Code extension that intelligently maps code \
dependencies, generates semantic summaries of functions, \
and provides instant context navigation across large codebases.",
    techStack: ["TypeScript", "VS Code API", "Tree-sitter", "LLM"],
    highlights: [
      "Semantic code graph generation",
      "AI-powered function summaries",
      "Cross-file dependency tracking",
    ],
    github: "https://github.com/rohannagare",
    status: "active",
  },
  {
    name: "Multiplayer Battleship Game",
    description:
      "Real-time multiplayer Battleship with rooms, spectators, \
in-game chat, and a match replay system — built entirely \
with Node.js and Socket.IO.",
    techStack: ["Node.js", "Socket.IO", "React", "TypeScript"],
    highlights: [
      "< 50 ms round-trip latency",
      "Room-based matchmaking",
      "Live spectator mode",
    ],
    github: "https://github.com/rohannagare",
    status: "complete",
  },
  {
    name: "Safe Neighborhood Map",
    description:
      "A community-driven safety heatmap that aggregates incident \
reports with D3.js visualisations. Built in 24 hours at a hackathon.",
    techStack: ["React", "D3.js", "Node.js", "MongoDB"],
    highlights: [
      "Hackathon winner — Best Social Impact",
      "Real-time incident clustering",
      "Interactive heatmap overlays",
    ],
    github: "https://github.com/rohannagare",
    status: "complete",
  },
  {
    name: "Web IDE with Subdomain Hosting",
    description:
      "A browser-based IDE where each user project gets its own \
live subdomain. Supports Monaco editor, terminal emulation, \
and one-click Docker deployments.",
    techStack: ["Next.js", "Monaco Editor", "Docker", "Nginx", "PostgreSQL"],
    highlights: [
      "Wildcard subdomain routing",
      "Isolated container sandboxing",
      "Collaborative editing (WIP)",
    ],
    github: "https://github.com/rohannagare",
    status: "in-progress",
  },
];

export default projects;`,
  },
  {
    id: "skills.json",
    icon: "🟨",
    language: "json",
    content: `{
  "languages": [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C++"
  ],
  "frontend": [
    "React",
    "Next.js",
    "TailwindCSS",
    "D3.js",
    "HTML5 / CSS3"
  ],
  "backend": [
    "Node.js",
    "Express",
    "REST APIs",
    "Socket.IO",
    "GraphQL"
  ],
  "ai_ml": [
    "Machine Learning",
    "scikit-learn",
    "Pandas / NumPy",
    "LLM Integration",
    "RAG Pipelines",
    "LangChain"
  ],
  "databases": [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Supabase"
  ],
  "devops_tools": [
    "Docker",
    "Git / GitHub",
    "Linux",
    "Nginx",
    "VS Code",
    "Vercel",
    "AWS (S3, EC2)"
  ],
  "currently_learning": [
    "Rust",
    "WebAssembly",
    "Kubernetes"
  ]
}`,
  },
  {
    id: "experience.md",
    icon: "📄",
    language: "markdown",
    content: `# Education & Experience

## 🎓 Education

### B.E. Information Technology
**Savitribai Phule Pune University** · 2021 – 2025
- CGPA: 8.6 / 10
- Relevant coursework: Data Structures, DBMS, OS,
  Machine Learning, Computer Networks, Cloud Computing

---

## 💼 Experience

### Open Source Contributor
**Self-directed** · 2023 – Present
- Contributed features and bug fixes to developer-tooling repos
- Authored a VS Code extension with 200+ installs
- Active on GitHub with 400+ contributions in the last year

### Hackathon Lead Developer
**Various Events** · 2022 – Present
- Won **Best Social Impact** at PuneTech Hackathon 2024
  for Safe Neighbourhood Map
- Finalist at HackWithInfy 2023 — built an AI resume ranker
  in 36 hours

### Freelance Web Developer
**Remote** · 2022 – 2023
- Delivered 5+ client projects (landing pages, dashboards)
  using React & Node.js
- Reduced one client's page load time by 60% through
  lazy loading and CDN optimisation

---

## 🏆 Achievements

- **Winner** — Best Social Impact, PuneTech Hackathon 2024
- **Finalist** — HackWithInfy 2023
- **Top 5%** — LeetCode (450+ problems solved)
- **Published** VS Code Extension on Marketplace

---

## 📜 Certifications

- AWS Cloud Practitioner (2024)
- Meta Front-End Developer Certificate (2023)
- DeepLearning.AI — Machine Learning Specialisation (2023)`,
  },
  {
    id: "contact.js",
    icon: "🟡",
    language: "javascript",
    content: `// Let's connect! All links are real — don't be a stranger 👋

const contact = {
  name:     "Rohan Nagare",
  email:    "rohannagare.dev@gmail.com",
  location: "Pune, India",

  social: {
    github:   "https://github.com/rohannagare",
    linkedin: "https://linkedin.com/in/rohannagare",
    twitter:  "https://twitter.com/rohannagare",
  },

  openTo: [
    "Full-time SDE roles (2025 onwards)",
    "Internship opportunities",
    "Open-source collaboration",
    "Pair programming sessions",
    "Tech coffee chats ☕",
  ],

  responseTime: "Usually within 24 hours",

  preferredContact: "LinkedIn DM or email",
};

/**
 * Tip: If you're hiring or want to collaborate,
 * mention the specific project that caught your eye —
 * that gets a much faster reply! 😄
 */

export default contact;`,
  },
];

export const FILE_MAP: Record<FileId, FileInfo> = Object.fromEntries(
  FILES.map((f) => [f.id, f])
) as Record<FileId, FileInfo>;
