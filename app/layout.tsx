import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jaskeerat Singh — AI Engineer",
  description:
    "AI Engineer building intelligent automation systems using LLMs, RAG pipelines, document AI, and workflow automation.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "Machine Learning",
    "Portfolio",
    "Automation",
    "Chandigarh",
  ],
  authors: [{ name: "Jaskeerat Singh" }],
  openGraph: {
    title: "Jaskeerat Singh — AI Engineer",
    description:
      "AI Engineer building intelligent automation systems using LLMs, RAG pipelines, and document AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
