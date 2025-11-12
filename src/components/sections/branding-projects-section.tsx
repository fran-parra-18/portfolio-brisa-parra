"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const impulsoImages = PlaceHolderImages.filter(p => p.id.startsWith("impulso_"));
const zeldaImages = PlaceHolderImages.filter(p => p.id.startsWith("zelda_"));

const projects = {
  impulso: {
    title: "Impulso Azul",
    description: "Impulso Azul es una tienda creada por dos chicas que se dedican a hacer tatuajes con enfoque distinto. La idea fue crear una identidad que refleje ese concepto fresco, con el deseo detrás del Gua y su energía, y con un estilo visual limpio pero con alma. El diseño se trabajó con tonos pasteles, de manera natural, simple y orgánica, reflejando esa estética simpática y fresca.",
    images: impulsoImages,
  },
  zelda: {
    title: "Zelda Tattoo Supplies",
    description: "Zelda Tattoo Supplies es una tienda mendocina que se dedica a vender insumos para tatuadores. El objetivo del diseño fue crear una imagen que transmita seriedad, limpieza y confianza, para acompañar la identidad del negocio. El logotipo está inspirado en la vara de Asclepio, símbolo universal de la salud, adaptado con estilo moderno para darle un toque propio del juego.",
    images: zeldaImages,
  },
};

const ProjectContent = ({ id, isActive }: { id: "impulso" | "zelda", isActive: boolean }) => {
  const project = projects[id];
  return (
    <div className={cn(
      "absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center",
      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <p className="text-primary font-bold">02. Diseño de marca</p>
          <h2 className="text-4xl font-headline font-bold">{project.title}</h2>
          <p className="text-muted-foreground max-w-prose">{project.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
          {project.images.map((image, index) => (
            <Image
              key={image.id}
              src={image.imageUrl}
              alt={image.description}
              width={600}
              height={600}
              className="rounded-lg object-cover shadow-lg aspect-square"
              data-ai-hint={image.imageHint}
              style={{ transitionDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BrandingProjectsSection() {
  const [activeProject, setActiveProject] = useState<"impulso" | "zelda">("impulso");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const { current } = sectionRef;
      if (!current) return;

      const { top, height } = current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const scrollAmount = -top;
      
      const scrollPercent = Math.max(0, Math.min(1, scrollAmount / scrollableHeight));
      
      setActiveProject(scrollPercent > 0.5 ? "zelda" : "impulso");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="container mx-auto px-4 h-full relative">
          <ProjectContent id="impulso" isActive={activeProject === 'impulso'} />
          <ProjectContent id="zelda" isActive={activeProject === 'zelda'} />
        </div>
      </div>
    </section>
  );
}
