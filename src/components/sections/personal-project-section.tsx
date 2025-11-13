"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projectImages = PlaceHolderImages.filter(p => p.id.startsWith("vegetal_"));

export default function PersonalProjectSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="projects"
      className={cn(
        "min-h-screen flex items-center justify-center bg-card transition-all duration-1000 ease-in-out transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary font-bold">01. Proyecto personal</p>
            <h2 className="text-4xl font-headline font-bold">Libro Álbum <br /> Mi yo vegetal</h2>
            <p className="text-muted-foreground max-w-prose">
              Un concepto oral convertido en proyecto donde me encontré explorando mis raíces, mis abuelos y mi pedazo de campo. Este libro ilustrado busca reconectarme con ese universo del interior que es mi refugio y donde la soledad no se siente del todo.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
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
                  src={image.imageUrl}
                  alt={image.description}
                  width={800}
                  height={600}
                  className="rounded-lg object-cover shadow-lg aspect-square"
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
