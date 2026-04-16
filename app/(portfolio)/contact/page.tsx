import { Metadata } from "next";
import EditorArea from "@/components/EditorArea";

export const metadata: Metadata = {
  title: "Contact | Rohan Nagare — Full Stack Developer",
  description:
    "Get in touch with Rohan Nagare — open to SDE roles, internships, open-source collaboration, and tech coffee chats.",
};

export default function ContactPage() {
  return <EditorArea activeFile="contact.js" />;
}
