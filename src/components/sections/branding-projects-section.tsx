"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import impulso1 from "@/app/assets/section2/1.jpg";
import impulso2 from "@/app/assets/section2/3.jpg";
import impulso3 from "@/app/assets/section2/2.png";

import zelda1 from "@/app/assets/section2/4.jpg";
import zelda2 from "@/app/assets/section2/6.jpg";
import zelda3 from "@/app/assets/section2/5.png";


const impulsoImages = [
  { id: "impulso_1", src: impulso1, description: "Branding para Impulso Azul 1", imageHint: "brand design" },
  { id: "impulso_2", src: impulso2, description: "Branding para Impulso Azul 2", imageHint: "logo concept" },
  { id: "impulso_3", src: impulso3, description: "Branding para Impulso Azul 3", imageHint: "pastel branding" },
];
const zeldaImages = [
  { id: "zelda_1", src: zelda1, description: "Branding para Zelda Tattoo Supplies 1", imageHint: "supply branding" },
  { id: "zelda_2", src: zelda2, description: "Branding para Zelda Tattoo Supplies 2", imageHint: "clean logo" },
  { id: "zelda_3", src: zelda3, description: "Branding para Zelda Tattoo Supplies 3", imageHint: "modern identity" },
];

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
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary font-bold">02. Diseño de marca</p>
            <h2 className="text-4xl font-headline font-bold">{project.title}</h2>
            <p className="text-muted-foreground max-w-prose">{project.description}</p>
          </div>
           <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
            <div className="col-span-1 row-span-1 relative">
              <Image
                key={project.images[0].id}
                src={project.images[0].src}
                alt={project.images[0].description}
                fill
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.images[0].imageHint}
              />
            </div>
            <div className="col-span-1 row-span-2 relative">
              <Image
                key={project.images[1].id}
                src={project.images[1].src}
                alt={project.images[1].description}
                fill
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.images[1].imageHint}
              />
            </div>
            <div className="col-span-1 row-span-1 relative">
               <Image
                key={project.images[2].id}
                src={project.images[2].src}
                alt={project.images[2].description}
                fill
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.images[2].imageHint}
              />
            </div>
          </div>
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="container mx-auto px-4 h-full relative">
          <ProjectContent id="impulso" isActive={activeProject === 'impulso'} />
          <ProjectContent id="zelda" isActive={activeProject === 'zelda'} />
        </div>
      </div>
    </section>
  );
}
