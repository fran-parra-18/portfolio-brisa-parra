"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

// SVGs from simpleicons.org
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Instagram</title>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.338.936 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.717 2.126-1.384s.936-1.338 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126S20.65.936 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.18 8.797 2.16 12 2.16zm0 2.88c-2.94 0-5.31 2.37-5.31 5.31s2.37 5.31 5.31 5.31 5.31-2.37 5.31-5.31-2.37-5.31-5.31-5.31zm0 8.76c-1.92 0-3.48-1.56-3.48-3.48s1.56-3.48 3.48-3.48 3.48 1.56 3.48 3.48-1.56 3.48-3.48 3.48zm5.25-8.83c0-.62-.51-1.13-1.13-1.13s-1.13.51-1.13 1.13.51 1.13 1.13 1.13 1.13-.51 1.13-1.13z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>WhatsApp</title>
    <path d="M12.04 0C5.39 0 0 5.39 0 12.04c0 2.21.58 4.29 1.67 6.13l-1.63 5.82 5.96-1.59c1.78.96 3.79 1.49 5.92 1.49h.01c6.65 0 12.04-5.39 12.04-12.04C24.08 5.39 18.69 0 12.04 0M12.04 22c-1.85 0-3.6-.5-5.14-1.39l-.37-.22-3.82 1.02 1.04-3.73-.24-.38a9.92 9.92 0 0 1-1.52-5.28c0-5.52 4.48-9.99 9.99-9.99s9.99 4.47 9.99 9.99-4.48 9.99-9.99 9.99m5.4-7.46c-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.5.11-.15.22-.56.71-.69.85-.13.15-.26.16-.48.06-.22-.11-.94-.35-1.79-1.1-.66-.58-1.1-1.3-1.23-1.52-.12-.22-.02-.34.1-.45.11-.1.22-.26.33-.39.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.38s-.5-.95-.69-1.3-.37-.3-.5-.3c-.14 0-.3 0-.44.01-.15.01-.35.05-.53.24-.18.18-.7.68-.7 1.65 0 .97.72 1.92.82 2.06.1.15 1.41 2.15 3.42 3.01.48.21.85.33 1.15.42.52.14.99.12 1.36.07.41-.05 1.29-.52 1.47-.94.18-.42.18-.78.13-.85-.05-.07-.16-.11-.34-.21Z" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Email</title>
    <path d="M23.008 4.238l-7.79 6.837 7.79 6.836V4.238Zm-1.14-2.24h-19.74c-.582 0-1.137.227-1.547.63l11.417 10.01 11.417-10.01c-.41-.403-.965-.63-1.547-.63Zm-20.86 2.24v13.525l7.788-6.836-7.788-6.889Zm1.14 15.523c.41.402.965.63 1.547.63h19.74c.582 0 1.137-.228 1.547-.63l-8.01-7.01-2.455 2.148c-.41.36-1.04.36-1.45 0l-2.455-2.148-8.414 7.01Z" />
  </svg>
);


const contactLinks = [
  {
    href: "#",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "#",
    icon: WhatsAppIcon,
    label: "WhatsApp",
  },
  {
    href: "#",
    icon: MailIcon,
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
              <link.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
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
