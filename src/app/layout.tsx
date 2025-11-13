"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

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
    <html lang="es" className="dark">
      <head>
        <title>Brisa's Portfolio</title>
        <meta name="description" content="Portfolio de Brisa Parra, Ilustradora" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/calmingly" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          {children}
          <Toaster />
      </body>
    </html>
  );
}
