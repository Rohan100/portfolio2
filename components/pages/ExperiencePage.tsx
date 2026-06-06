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
    <div
      className="flex flex-col max-w-[820px] font-mono text-[13px]"
      style={{
        padding: "var(--space-8)",
        gap:     "var(--space-8)",
      }}
    >
      {/* Header */}
      <div className="text-[16px] font-bold">
        <span className="tok-md-heading"># Education &amp; Experience</span>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-[var(--space-5)] items-start">
            {/* Left — dot + connector */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] z-10 flex-shrink-0"
                style={{ background: item.color, boxShadow: `0 0 10px ${item.color}66` }}
              >
                {item.icon}
              </div>
              {i < timeline.length - 1 && (
                <div className="w-[2px] flex-1 min-h-[24px] my-2 bg-border-light" />
              )}
            </div>

            {/* Right — content */}
            <div className="flex-1 pb-[var(--space-6)] pt-[6px]">
              <div className="flex justify-between items-start gap-3 mb-[6px]">
                <span className="text-[14px] font-semibold text-text-active font-sans">
                  {item.title}
                </span>
                <span className="text-[11px] flex-shrink-0" style={{ color: item.color }}>
                  {item.period}
                </span>
              </div>
              <div className="text-[12px] mb-3 text-text-secondary font-sans">
                {item.org}
              </div>
              <div className="flex flex-col gap-[var(--space-2)]">
                {item.details.map((d, di) => (
                  <div key={di} className="flex gap-2 text-[12px] text-text-secondary font-sans">
                    <span className="tok-operator flex-shrink-0">-</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="flex flex-col gap-[var(--space-4)]">
        <div className="text-[14px]">
          <span className="tok-md-heading">## 🏆 Achievements</span>
        </div>
        <div className="grid grid-cols-2 gap-[var(--space-3)]">
          {achievements.map((a) => (
            <div
              key={a.label}
              className="flex gap-[var(--space-3)] items-start rounded-[6px] border border-border-light bg-sidebar transition-colors duration-150 cursor-default hover:border-tok-number"
              style={{ padding: "var(--space-4)" }}
            >
              <span className="text-[22px] flex-shrink-0 leading-none pt-[2px]">{a.icon}</span>
              <div className="flex flex-col gap-[var(--space-1)]">
                <div className="text-[12px] font-semibold text-text-active font-sans">
                  {a.label}
                </div>
                <div className="text-[11px] italic tok-comment">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-[var(--space-4)]">
        <div className="text-[14px]">
          <span className="tok-md-heading">## 📜 Certifications</span>
        </div>
        <div className="flex flex-col gap-[var(--space-2)]">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-[var(--space-3)] rounded border border-border-light bg-sidebar"
              style={{
                paddingLeft:  "var(--space-4)",
                paddingRight: "var(--space-4)",
                paddingTop:   "var(--space-3)",
                paddingBottom: "var(--space-3)",
              }}
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
