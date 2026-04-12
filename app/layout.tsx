import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Rohan Nagare | Full Stack Developer Portfolio",
  description:
    "Rohan Nagare is a final year IT engineering student and full stack developer skilled in React, Next.js, Node.js, and AI. Explore projects like Code Context Navigator, Multiplayer Battleship Game, and more.",
  keywords: [
    "Rohan Nagare",
    "Rohan Nagare developer",
    "Full stack developer portfolio",
    "React developer India",
    "Next.js developer portfolio",
    "Node.js projects",
    "AI developer portfolio",
    "Software developer Pune",
  ],
  authors: [{ name: "Rohan Nagare" }],
  creator: "Rohan Nagare",
  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "Rohan Nagare | Developer Portfolio",
    description:
      "Explore projects, skills, and experience of Rohan Nagare – a full stack developer building modern web and AI applications.",
    url: "https://yourdomain.com",
    siteName: "Rohan Nagare Portfolio",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohan Nagare Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohan Nagare | Developer Portfolio",
    description:
      "Full stack developer portfolio showcasing projects in React, Next.js, Node.js, and AI.",
    images: ["https://yourdomain.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
