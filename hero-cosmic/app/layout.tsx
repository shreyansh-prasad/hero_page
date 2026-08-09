import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo_2, Nunito, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  weight: ["700", "800", "900"],
  variable: "--font-exo2",
  subsets: ["latin"],
});

const nunito = Nunito({
  weight: ['900'],
  variable: '--font-nunito',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmic HUD Hero",
  description: "A premium cosmic hero with cursor-localized HUD scanner interaction",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${exo2.variable} ${nunito.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="bg-black text-white overflow-hidden">{children}</body>
    </html>
  );
}
