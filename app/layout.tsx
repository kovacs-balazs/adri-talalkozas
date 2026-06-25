import type { Metadata, Viewport } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Egy fontos kérdés...",
  description: "Egy fontos kérdés...",
};

// 👇 EZ A LÉNYEG IOS SAFARIHOZ
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className=" h-full min-h-dvh  overflow-x-hidden flex flex-col font-sans bg-pink-400">{children}</body>
    </html>
  );
}