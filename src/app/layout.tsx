import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
  title: "Arthur Louette — PhD Researcher · Reinforcement Learning · Robotics",
  description:
    "PhD Researcher in Robotic Reinforcement Learning at the University of Liège. Deploying RL agents from simulation to reality for defence and autonomous systems.",
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
    title: "Arthur Louette — PhD Researcher · RL · Robotics",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased grain-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
