import "./globals.css";
import type { Metadata } from "next";
import "@uploadthing/react/styles.css";

export const metadata: Metadata = {
  title: "PrepAssist",
  description: "Your Second Brain for Studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
