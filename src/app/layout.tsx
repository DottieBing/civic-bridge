import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civic Bridge Africa",
  description: "Bridging citizens and governance across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}