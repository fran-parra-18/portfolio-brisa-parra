"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import imagePortrait from "../../app/assets/portrait.png";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className={cn(
          "container mx-auto px-4 transition-opacity duration-1000 ease-in-out",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex justify-center"
          >
            <Image
              src={imagePortrait}
              alt="Imagen de la artista"
              width={400}
              height={600}
              className="object-contain"
              data-ai-hint="illustrator portrait"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-6 text-lg"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
