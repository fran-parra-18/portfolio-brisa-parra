"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      id="home"
      className={cn(
        "min-h-[100vh] flex items-center justify-center text-center transition-all duration-1000 ease-in-out px-4",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="space-y-4">
        {/* 
          Puedes cambiar el tamaño del título principal "Brisa Parra" aquí.
          Usa clases como text-5xl, text-6xl, text-7xl.
          También puedes usar prefijos para diferentes tamaños de pantalla (ej. md:text-7xl).
        */}
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Brisa Parra
        </h1>
        {/* 
          Puedes cambiar el tamaño del subtítulo "– Ilustradora –" aquí.
          Usa clases como text-lg, text-xl, text-2xl.
          También puedes usar prefijos para diferentes tamaños de pantalla (ej. md:text-2xl).
        */}
        <p className="text-lg md:text-xl text-primary">
          – Ilustradora –
        </p>
      </div>
    </section>
  );
}
