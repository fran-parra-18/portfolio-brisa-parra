"use client";

import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { href: "#about", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#gallery", label: "Ilustraciones" },
  { href: "#contact", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isGalleryPage = pathname === '/gallery';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled || isGalleryPage ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* 
            Puedes cambiar el tamaño del texto "Portfolio" aquí.
            Ej. text-xl, text-2xl, text-3xl
          */}
          <Link href="/" className="text-2xl font-bold font-headline transition-colors duration-300 hover:text-primary">
            Portfolio
          </Link>
          {!isGalleryPage && (
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {/* 
                      Puedes cambiar el tamaño de los enlaces de navegación aquí.
                      Ej. text-xs, text-sm, text-base
                    */}
                    <Link
                      href={item.href}
                      className="text-sm font-medium transition-colors duration-300 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
