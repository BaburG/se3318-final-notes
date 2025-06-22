import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SE3318 Study Hub | Software Construction Final Exam Prep",
  description: "Comprehensive study materials for SE3318 Software Construction final exam. Features detailed notes on Working Classes, High Quality Routines, Variables, Loops, Conditionals, Defensive Programming, and Table-Driven Methods, plus complete Checkstyle reference.",
  keywords: "SE3318, Software Construction, Study Notes, Checkstyle, Final Exam, Programming, Software Engineering",
  authors: [{ name: "SE3318 Study Hub" }],
  openGraph: {
    title: "SE3318 Study Hub",
    description: "Your complete guide to acing the SE3318 Software Construction final exam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen`}>
        <div className="relative">
          {/* Background Pattern */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {children}
        </div>
      </body>
    </html>
  );
}
