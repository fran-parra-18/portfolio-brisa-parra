"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Instagram, MessageSquare, Mail } from "lucide-react";

const contactLinks = [
  {
    href: "#",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "#",
    icon: MessageSquare,
    label: "WhatsApp",
  },
  {
    href: "#",
    icon: Mail,
    label: "Correo electrónico",
  },
];

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section
      ref={ref}
      id="contact"
      className={cn(
        "min-h-screen flex items-center justify-center text-center transition-all duration-1000 ease-in-out transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto px-4">
        {/* 
          Puedes cambiar el tamaño del título "Contactame" aquí.
          Usa clases como text-3xl, text-4xl, text-5xl.
        */}
        <h2 className="text-7xl text-primary font-headline font-bold mb-12">
          Contactame
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {contactLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-3 text-lg transition-all duration-700 ease-out",
                inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <link.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              {/* 
                Puedes cambiar el tamaño del texto de los enlaces de contacto (Instagram, WhatsApp, etc.) aquí.
                Actualmente está en 'text-lg'. Puedes cambiarlo a text-base, text-xl, etc.
                La clase está en el elemento <a> padre, unas líneas más arriba.
              */}
              <span className="transition-colors duration-300 group-hover:text-primary">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
