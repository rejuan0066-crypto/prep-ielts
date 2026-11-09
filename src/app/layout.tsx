import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SupportProvider } from "@/context/SupportContext";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepIELTS.ai - শূন্য থেকে ব্যান্ড ৮.৫ এআই আইএলটিএস প্ল্যাটফর্ম",
  description: "IELTS Speaking AI Tutor, In-Context Dictionary, CD-IELTS Mock Test, and Band 8+ AI Writing Evaluator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-rose-500 selection:text-white">
        <AuthProvider>
          <SupportProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </SupportProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
