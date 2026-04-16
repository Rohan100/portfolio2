"use client";

const timeline = [
  {
    type: "education",
    icon: "🎓",
    title: "B.E. Information Technology",
    org: "Savitribai Phule Pune University",
    period: "2021 – 2025",
    color: "#569cd6",
    details: [
      "CGPA: 8.6 / 10",
      "Relevant coursework: Data Structures, DBMS, OS,",
      "Machine Learning, Computer Networks, Cloud Computing",
    ],
  },
  {
    type: "experience",
    icon: "💻",
    title: "Open Source Contributor",
    org: "Self-directed",
    period: "2023 – Present",
    color: "#4ec9b0",
    details: [
      "Contributed features and bug fixes to developer-tooling repos",
      "Authored a VS Code extension with 200+ installs",
      "Active on GitHub with 400+ contributions in the last year",
    ],
  },
  {
    type: "experience",
    icon: "⚡",
    title: "Hackathon Lead Developer",
    org: "Various Events",
    period: "2022 – Present",
    color: "#dcdcaa",
    details: [
      "Won Best Social Impact at PuneTech Hackathon 2024",
      "Finalist at HackWithInfy 2023 — built an AI resume ranker in 36 hours",
    ],
  },
  {
    type: "experience",
    icon: "🌐",
    title: "Freelance Web Developer",
    org: "Remote",
    period: "2022 – 2023",
    color: "#ce9178",
    details: [
      "Delivered 5+ client projects (landing pages, dashboards)",
      "Reduced one client's page load time by 60% through lazy loading & CDN",
    ],
  },
];

const achievements = [
  { icon: "🏆", label: "Winner — Best Social Impact", sub: "PuneTech Hackathon 2024" },
  { icon: "🥈", label: "Finalist — HackWithInfy 2023", sub: "AI resume ranker project" },
  { icon: "🧩", label: "Top 5% on LeetCode", sub: "450+ problems solved" },
  { icon: "🔌", label: "Published VS Code Extension", sub: "200+ installs on Marketplace" },
];

const certifications = [
  { name: "AWS Cloud Practitioner",             year: "2024", color: "#ff9900" },
  { name: "Meta Front-End Developer Certificate", year: "2023", color: "#0866ff" },
  { name: "DeepLearning.AI — ML Specialisation", year: "2023", color: "#ff6b6b" },
];

export default function ExperiencePageUI() {
  return (
    <div className="px-9 pt-7 pb-6 flex flex-col gap-6 max-w-[820px] font-mono text-[13px]">
      {/* Header */}
      <div className="text-[16px] font-bold">
        <span className="tok-md-heading"># Education &amp; Experience</span>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            {/* Left — dot + connector */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] z-10 flex-shrink-0"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}66` }}
              >
                {item.icon}
              </div>
              {i < timeline.length - 1 && (
                <div className="w-[2px] flex-1 min-h-5 my-1 bg-border-light" />
              )}
            </div>

            {/* Right — content */}
            <div className="flex-1 pb-5 pt-1">
              <div className="flex justify-between items-start gap-3 mb-[2px]">
                <span className="text-[14px] font-semibold text-text-active font-sans">
                  {item.title}
                </span>
                <span className="text-[11px] flex-shrink-0" style={{ color: item.color }}>
                  {item.period}
                </span>
              </div>
              <div className="text-[12px] mb-2 text-text-secondary font-sans">
                {item.org}
              </div>
              <ul className="flex flex-col gap-1 list-none">
                {item.details.map((d, di) => (
                  <li key={di} className="flex gap-2 text-[12px] text-text-secondary font-sans">
                    <span className="tok-operator">-</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="flex flex-col gap-3">
        <div className="text-[14px]">
          <span className="tok-md-heading">## 🏆 Achievements</span>
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          {achievements.map((a) => (
            <div
              key={a.label}
              className="flex gap-3 items-start rounded-[6px] px-[14px] py-3 border border-border-light bg-sidebar transition-colors duration-150 cursor-default hover:border-tok-number"
            >
              <span className="text-[22px] flex-shrink-0">{a.icon}</span>
              <div>
                <div className="text-[12px] font-semibold mb-[2px] text-text-active font-sans">
                  {a.label}
                </div>
                <div className="text-[11px] italic tok-comment">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-3">
        <div className="text-[14px]">
          <span className="tok-md-heading">## 📜 Certifications</span>
        </div>
        <div className="flex flex-col gap-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-[10px] px-[14px] py-2 rounded border border-border-light bg-sidebar"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cert.color }}
              />
              <span className="flex-1 text-[12px] text-text-primary">
                {cert.name}
              </span>
              <span className="text-[11px] tok-number">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
