import localFont from "next/font/local";
import "./globals.css";
import HudFrame from "@/components/HudFrame";

const corptaSans = localFont({
  src: "../Corpta.ttf.otf",
  variable: "--font-sans",
  display: "swap",
});

const corptaMono = localFont({
  src: "../Corpta.ttf.otf",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Shunya — Event Timeline | GDG On Campus",
  description:
    "Explore the Shunya competition showcase — a 2.5D interactive experience featuring 6 flagship events by GDG On Campus.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${corptaSans.variable} ${corptaMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative">
        <HudFrame />
        {children}
      </body>
    </html>
  );
}
