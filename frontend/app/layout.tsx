import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Finmaster Academy - Mühasibatlıq və Maliyyə Təhsili",
  description: "Peşəkar mühasib olmaq üçün lazım olan bütün biliklər bir platformada. Mühasibatlıq, maliyyə, audit və vergi kursları.",
  keywords: ["mühasibatlıq", "maliyyə", "təhsil", "kurs", "Azərbaycan", "audit", "vergi"],
  authors: [{ name: "Finmaster Academy" }],
  openGraph: {
    title: "Finmaster Academy - Mühasibatlıq və Maliyyə Təhsili",
    description: "Peşəkar mühasib olmaq üçün lazım olan bütün biliklər bir platformada",
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
      lang="az"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-dark">{children}</body>
    </html>
  );
}
