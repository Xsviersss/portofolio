import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Xavier Moreau — Fullstack Developer",
  description: "Portfolio of Xsvierss.",

  openGraph: {
    title: "Xavier Moreau — Fullstack Developer",
    description: "Portfolio of Xsvierss.",
    images: [
      {
        url: "/portfoliothumb.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-text">{children}</body>
    </html>
  );
}
