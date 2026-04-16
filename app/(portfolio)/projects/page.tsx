import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "Projects | Rohan Nagare — Full Stack Developer",
  description:
    "Explore Rohan Nagare's projects including Code Context Navigator, Multiplayer Battleship, Safe Neighborhood Map, and Web IDE with subdomain hosting.",
};

export default function ProjectsPage() {
  return <EditorArea activeFile="projects.ts" />;
}
