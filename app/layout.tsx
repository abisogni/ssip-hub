import type { Metadata } from "next";
import Script from "next/script";
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
      {/* <Script src="https://endeavor.zone/script/init/4616b1cc-ba4f-4059-bb1b-8c9a8938e192/" strategy="afterInteractive" /> */}
    </html>
  );
}
