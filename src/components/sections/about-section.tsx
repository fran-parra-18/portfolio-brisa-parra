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
        <div className="grid md:grid-cols-5 gap-12 items-center pl-32">
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
              width={480}
              height={720}
              className="object-contain"
              data-ai-hint="illustrator portrait"
            />
          </motion.div>

          {/* 
            Puedes controlar el ancho de este contenedor de texto de varias maneras:
            1. Cambia 'md:col-span-3' a 'md:col-span-2' para que ocupe menos columnas en la rejilla.
            2. Añade una clase de ancho máximo como 'max-w-2xl' para limitar su anchura máxima.
          */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6 text-lg"
          >
            {/* 
              Puedes cambiar el tamaño del título "Sobre mí" aquí.
              Usa clases como text-3xl, text-4xl, text-5xl.
            */}
            <h2 className="text-8xl font-headline font-bold mb-8 text-primary">Sobre mí</h2>
            {/* 
              Puedes cambiar el tamaño de los párrafos de esta sección aquí.
              La clase 'text-lg' aplica a todos los <p> dentro de este div.
              Puedes cambiarla a text-base, text-xl, etc.
            */}
            <p className="max-w-prose">
            Ilustradora de Benito Juárez, Buenos Aires.
            </p>
            <p className="max-w-prose">
            Me inspiro en lo cotidiano: los viajes en colectivo, lo que me rodea, las pequeñas escenas de todos los días. Anoto ideas en el celular y las llevo al papel, primero en lápiz, luego, si lo pide la imagen, al plano digital.            </p>
            <p className="max-w-prose">
            Mis ilustraciones buscan generar cercanía, contar historias simples con sensibilidad. Me gusta trabajar con el cuerpo femenino y los entornos como recursos para crear climas y emociones.            </p>
            <p className="max-w-prose font-semibold text-primary">
            Bienvenidx a mi universo visual.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
