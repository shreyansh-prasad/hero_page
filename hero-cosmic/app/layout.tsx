import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const corpta = localFont({
  src: "../public/fonts/Corpta.ttf.otf",
  variable: "--font-corpta",
});

export const metadata: Metadata = {
  title: "Cosmic HUD Hero",
  description: "A premium cosmic hero with cursor-localized HUD scanner interaction",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${corpta.variable} antialiased`}
    >
      <body className="bg-black text-white overflow-hidden font-corpta">{children}</body>
    </html>
  );
}
