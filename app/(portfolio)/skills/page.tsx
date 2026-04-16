import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "Skills | Rohan Nagare — Full Stack Developer",
  description:
    "Rohan Nagare's technical skills: TypeScript, React, Next.js, Node.js, Python, AI/ML, Docker, and more.",
};

export default function SkillsPage() {
  return <EditorArea activeFile="skills.json" />;
}
