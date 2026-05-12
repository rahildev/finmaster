import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Finmaster Academy - Mühasibatlıq və Maliyyə Təhsili",
  description: "Peşəkar mühasib olmaq üçün lazım olan bütün biliklər bir platformada. Mühasibatlıq, maliyyə, audit və vergi kursları.",
  keywords: ["mühasibatlıq", "maliyyə", "təhsil", "kurs", "Azərbaycan", "audit", "vergi"],
  authors: [{ name: "Finmaster Academy" }],
  metadataBase: new URL("https://finmasteracademy.az"),
  alternates: {
    canonical: "https://finmasteracademy.az",
  },
  openGraph: {
    title: "Finmaster Academy - Mühasibatlıq və Maliyyə Təhsili",
    description: "Peşəkar mühasib olmaq üçün lazım olan bütün biliklər bir platformada",
    type: "website",
    url: "https://finmasteracademy.az",
    siteName: "Finmaster Academy",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value;
  const initialLanguage: 'az' | 'en' = lang === 'en' ? 'en' : 'az';

  return (
    <html
      lang={initialLanguage}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-gray-dark overflow-x-hidden" suppressHydrationWarning>
        <Providers initialLanguage={initialLanguage}>{children}</Providers>
      </body>
    </html>
  );
}
