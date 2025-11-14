"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
      "absolute inset-0 flex flex-col justify-center",
      isActive ? "z-10" : "z-0"
    )}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* 
              Puedes cambiar el tamaño del texto "02. Diseño de marca" aquí.
              Usa clases como text-sm, text-base, etc.
            */}            
            
            <h1 className="text-6xl text-primary font-bold pb-10">Diseño de marca</h1>
            {/* 
              Puedes cambiar el tamaño del título del proyecto (ej. "Impulso Azul") aquí.
              Usa clases como text-3xl, text-4xl, text-5xl.
            */}
            <h2 className="text-4xl font-headline font-bold text-primary">{project.title}</h2>
            {/* 
              Puedes cambiar el tamaño del párrafo de descripción aquí.
              Usa clases como text-sm, text-base, text-lg.
            */}
            <p className="w-[65%]">{project.description}</p>
          </motion.div>
           <motion.div
            className="md:col-span-3 grid grid-cols-2 grid-rows-2 gap-4 h-[600px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
           >
            <div className="col-span-1 row-span-1 relative">
              <Image
                key={project.images[0].id}
                src={project.images[0].src}
                alt={project.images[0].description}
                width={385}
                height={308}
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.images[0].imageHint}
              />
            </div>
            <div className="col-span-1 row-span-2 relative">
              <Image
                key={project.images[1].id}
                src={project.images[1].src}
                alt={project.images[1].description}
                width={428}
                max-height={650}
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.images[1].imageHint}
              />
            </div>
            <div className="col-span-1 row-span-1 relative">
               <Image
                key={project.images[2].id}
                src={project.images[2].src}
                alt={project.images[2].description}
                width={385}
                  height={308}
                className="rounded-lg object-cover shadow-lg mt-10"
                data-ai-hint={project.images[2].imageHint}
              />
            </div>
          </motion.div>
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
