import type { Metadata } from "next";
import { Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur Louette — PhD Candidate // RL // Robotics",
  description:
    "PhD Candidate in Robotic Reinforcement Learning at the University of Liège. Deploying RL agents from simulation to reality for defence applications.",
  keywords: [
    "Reinforcement Learning",
    "Robotics",
    "PhD",
    "Drone",
    "Defence",
    "Multi-Agent",
    "Sim-to-Real",
    "Arthur Louette",
    "University of Liège",
  ],
  authors: [{ name: "Arthur Louette" }],
  openGraph: {
    title: "Arthur Louette — PhD Candidate // RL // Robotics",
    description:
      "Deploying RL agents from simulation to reality for defence and autonomous systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${inter.variable} ${jetbrains.variable} antialiased scanline-overlay hud-grid-bg`}
      >
        {children}
      </body>
    </html>
  );
}
