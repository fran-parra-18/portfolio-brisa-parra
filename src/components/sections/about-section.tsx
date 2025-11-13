"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useEffect, useRef } from "react";
import imagePortrait  from "../../app/assests/portrait.png";

const aboutImage = PlaceHolderImages.find(p => p.id === "about_brisa");

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxStyle = () => {
    if (!sectionRef.current) return {};
    const { offsetTop, offsetHeight } = sectionRef.current;
    const scrollPosition = scrollY;
    const start = offsetTop - window.innerHeight;
    const end = offsetTop + offsetHeight;
  
    if (scrollPosition < start || scrollPosition > end) return {};
  
    const progress = (scrollPosition - start) / (end - start);
    const translateY = (progress - 0.5) * -350; // Adjust multiplier for effect intensity
  
    return {
      transform: `translateY(${translateY}px)`,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-opacity duration-1000 ease-in-out",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 flex justify-center">
             {aboutImage && (
                <div 
                  className="transition-transform duration-300 ease-out"
                  style={getParallaxStyle()}
                >
                  <Image
                    src={imagePortrait}
                    alt={aboutImage.description}
                    width={400}
                    height={600}
                    className="object-contain"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              )}
          </div>
          <div className={cn(
              "md:col-span-3 space-y-6 text-lg transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
            <h2 className="text-4xl font-headline font-bold mb-8">Sobre mí</h2>
            <p className="max-w-prose">
              Ilustradora de Benito Juárez, Buenos Aires.
            </p>
            <p className="max-w-prose">
              Me inspiro en lo cotidiano: los viajes en colectivo, lo que me rodea, los pequeños escenarios de todos los días. Busco capturar el día a día y los rituales, plasmar en lápiz, hueso, lo que le pido al imaginario, al plano digital.
            </p>
            <p className="max-w-prose">
              Mis ilustraciones buscan generar cercanía, convertir historias simples en sensibilidad. Me gusta trabajar con el cuerpo femenino y las escenas como recursos para crear climas y emociones.
            </p>
            <p className="max-w-prose font-semibold text-primary">
              Bienvenidos a mi universo visual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
