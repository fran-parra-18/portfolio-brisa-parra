"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import InstagramIcon from "../../app/assets/icons/instagram.svg";
import WhatsAppIcon from "../../app/assets/icons/whatsapp.svg";
import MailIcon from "../../app/assets/icons/mail.svg";

const contactLinks = [
  {
    href: "https://www.instagram.com/brisa.ilus/",
    icon: InstagramIcon,
    label: "@brisa.ilus",
  },
  {
    href: "#",
    icon: WhatsAppIcon,
    label: "WhatsApp",
  },
  {
    href: null,
    icon: MailIcon,
    label: "Correo electrónico",
    clickable: false, // 👈 ESTE NO SE CLICKEA
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
            className={cn(
              "group flex items-center gap-3 text-lg transition-all duration-700 ease-out",
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <img
              src={link.icon.src}
              alt={link.label}
              className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="transition-colors duration-300 group-hover:text-primary">
              {link.label}
            </span>
          </a>
          ))}
        </div>
      </div>
    </section>
  );
}
