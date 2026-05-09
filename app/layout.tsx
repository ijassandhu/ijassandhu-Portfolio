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
  title: "Jaskeerat Singh | AI Engineer",
  description:
    "AI Engineer based in Chandigarh, India building LLM applications, RAG pipelines, Document AI systems, and AI automation workflows.",
  keywords: [
    "Jaskeerat Singh",
    "AI Engineer",
    "LLM Engineer",
    "RAG Developer",
    "Document AI",
    "AI Automation",
    "LangChain",
    "Next.js",
    "Python",
    "Chandigarh",
  ],
  authors: [{ name: "Jaskeerat Singh" }],
  openGraph: {
    title: "Jaskeerat Singh | AI Engineer",
    description:
      "AI Engineer building practical LLM, RAG, Document AI, and automation systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaskeerat Singh | AI Engineer",
    description:
      "AI Engineer building practical LLM, RAG, Document AI, and automation systems.",
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
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
