"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutImage = PlaceHolderImages.find(p => p.id === "about_brisa");

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      id="about"
      className={cn(
        "py-20 md:py-32 transition-opacity duration-1000 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 flex justify-center">
             {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={300}
                  height={300}
                  className="rounded-full object-cover aspect-square shadow-lg shadow-primary/10"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
          </div>
          <div className="md:col-span-3 space-y-6 text-lg">
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
