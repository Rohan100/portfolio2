import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "Experience | Rohan Nagare — Full Stack Developer",
  description:
    "Rohan Nagare's education, work experience, hackathon achievements, and certifications.",
};

export default function ExperiencePage() {
  return <EditorArea activeFile="experience.md" />;
}
