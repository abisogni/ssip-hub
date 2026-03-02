import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSIP Hub — Accelerating Collaboration Across the Space Ecosystem",
  description: "SSIP is a matchmaking-driven innovation platform connecting space, defense, and deep-tech stakeholders — from Switzerland to the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
