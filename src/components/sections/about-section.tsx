"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import imagePortrait from "../../app/assets/portrait.png";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24"
    >
      <div
        className={cn(
          "container mx-auto px-4 transition-opacity duration-1000 ease-in-out",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src={imagePortrait}
              alt="Imagen de la artista"
              width={320}
              height={480}
              className="object-contain rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              data-ai-hint="illustrator portrait"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-headline font-bold mb-8 text-primary">Sobre mí</h2>
            <div className="text-base md:text-lg space-y-4">
              <p className="max-w-prose mx-auto md:mx-0">
              Ilustradora de Benito Juárez, Buenos Aires.
              </p>
              <p className="max-w-prose mx-auto md:mx-0">
              Me inspiro en lo cotidiano: los viajes en colectivo, lo que me rodea, las pequeñas escenas de todos los días. Anoto ideas en el celular y las llevo al papel, primero en lápiz, luego, si lo pide la imagen, al plano digital.            </p>
              <p className="max-w-prose mx-auto md:mx-0">
              Mis ilustraciones buscan generar cercanía, contar historias simples con sensibilidad. Me gusta trabajar con el cuerpo femenino y los entornos como recursos para crear climas y emociones.            </p>
              <p className="max-w-prose mx-auto md:mx-0 font-semibold text-primary">
              Bienvenidx a mi universo visual.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
