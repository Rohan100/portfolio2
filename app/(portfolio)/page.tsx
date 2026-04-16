import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "About Me | Rohan Nagare — Full Stack Developer",
  description:
    "Learn about Rohan Nagare, a final year IT engineering student and full stack developer based in Pune, India.",
};

export default function AboutPage() {
  return <EditorArea activeFile="about-me.ts" />;
}
