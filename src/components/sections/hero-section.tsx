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
        "min-h-[150vh] flex items-center justify-center text-center transition-all duration-1000 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter">
          Brisa Parra
        </h1>
        <p className="text-xl md:text-2xl text-primary">
          – Ilustradora –
        </p>
      </div>
    </section>
  );
}
