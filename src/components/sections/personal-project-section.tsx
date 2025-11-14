"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import vegetal1 from "@/app/assets/section1/1.jpg";
import vegetal2 from "@/app/assets/section1/2.jpg";
import vegetal3 from "@/app/assets/section1/3.jpg";
import vegetal4 from "@/app/assets/section1/4.jpg";


const projectImages = [
  { id: "vegetal_1", src: vegetal1, description: "Ilustración del proyecto Mi Yo Vegetal 1", imageHint: "plant illustration" },
  { id: "vegetal_2", src: vegetal2, description: "Ilustración del proyecto Mi Yo Vegetal 2", imageHint: "nature drawing" },
  { id: "vegetal_3", src: vegetal3, description: "Ilustración del proyecto Mi Yo Vegetal 3", imageHint: "botanical art" },
  { id: "vegetal_4", src: vegetal4, description: "Ilustración del proyecto Mi Yo Vegetal 4", imageHint: "flower sketch" },
];


export default function PersonalProjectSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="projects"
      className={cn(
        "min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className={cn(
              "md:col-span-2 space-y-6 transition-all duration-1000 ease-out",
              inView ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-8"
            )}>
            {/* 
              Puedes cambiar el tamaño del texto "01. Proyecto personal" aquí.
              Usa clases como text-sm, text-base, etc.
            */}            
            <h1 className="text-6xl text-primary font-bold pb-10">Proyecto personal</h1>
            {/* 
              Puedes cambiar el tamaño del título "Libro Álbum Mi yo vegetal" aquí.
              Usa clases como text-3xl, text-4xl, text-5xl.
            */}
            <h2 className="text-4xl font-headline font-bold">Libro Álbum <br /> 
            <span className="text-primary">Mi yo vegetal</span></h2>

            {/* 
              Puedes cambiar el tamaño del párrafo de descripción aquí.
              Usa clases como text-sm, text-base, text-lg.
            */}
            <p className="w-[65%]">
              Un concepto oral convertido en proyecto donde me encontré explorando mis raíces, mis abuelos y mi pedazo de campo. Este libro ilustrado busca reconectarme con ese universo del interior que es mi refugio y donde la soledad no se siente del todo.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
            {projectImages.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-95",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Image
                  src={image.src}
                  alt={image.description}
                  
                  className="rounded-lg object-cover shadow-lg"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
