import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "Settings | Rohan Nagare — Full Stack Developer",
  description: "Configure user preferences, appearance, and keyboard shortcuts.",
};

export default function SettingsPage() {
  return <EditorArea activeFile="settings.json" />;
}
