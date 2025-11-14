"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MailIcon from "@/components/icons/MailIcon";

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
        "min-h-screen flex items-center justify-center text-center transition-all duration-1000 ease-in-out transform py-16 md:py-24",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl text-primary font-headline font-bold mb-12">
          Contactame
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {contactLinks.map((link, index) => (
            <a
            key={link.label}
            href={link.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-3 text-base md:text-lg transition-all duration-700 ease-out",
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90",
              !link.href && "pointer-events-none"
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <link.icon
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
