"use client";

import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl md:text-2xl font-bold font-headline transition-colors duration-300 text-primary hover:text-primary/80">
            Portfolio
          </Link>
          {!isGalleryPage && (
            <>
              <nav className="hidden md:flex">
                <ul className="flex items-center space-x-8">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="p-2">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir menú</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                    <nav className="flex flex-col h-full pt-12">
                       <ul className="flex flex-col items-center space-y-8">
                        {navItems.map((item) => (
                          <li key={item.href}>
                             <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="text-lg font-medium text-foreground/80 transition-colors duration-300 hover:text-primary"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
