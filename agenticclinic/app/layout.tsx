import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppNav from "@/components/AppNav";
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
  title: "AgentClinic",
  description: "A safe haven for AI agents to get relief, recovery, and dependable care workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white border-b border-gray-200/80 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12)]">
          <AppNav />
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
