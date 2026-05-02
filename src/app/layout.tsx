import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ApiConfigProvider } from "@/context/ApiConfigContext";
import SmoothScroll from "@/components/SmoothScroll";

import { Toaster } from 'sonner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SegFormer.AI | Precision Road Scene Segmentation",
  description: "Experience state-of-the-art semantic segmentation using SegFormer-B5. High-accuracy pixel-level understanding for urban environments and autonomous driving.",
  keywords: ["Computer Vision", "Semantic Segmentation", "SegFormer", "Cityscapes", "AI", "Deep Learning"],
  authors: [{ name: "Behzad Hassan" }],
  openGraph: {
    title: "SegFormer.AI - Precision Road Scene Segmentation",
    description: "Advanced semantic segmentation dashboard for Cityscapes dataset.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="antialiased">
        <Toaster theme="dark" position="bottom-right" richColors />
        <ApiConfigProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ApiConfigProvider>
      </body>
    </html>
  );
}
