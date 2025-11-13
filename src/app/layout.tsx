"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ParallaxProvider } from 'react-scroll-parallax';

// This is a client component, so metadata is not exported
// export const metadata: Metadata = {
//   title: "Brisa's Portfolio",
//   description: 'Portfolio de Brisa Parra, Ilustradora',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ParallaxProvider>
      <html lang="es" className="dark">
        <head>
          <title>Brisa's Portfolio</title>
          <meta name="description" content="Portfolio de Brisa Parra, Ilustradora" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className="font-body antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </ParallaxProvider>
  );
}
