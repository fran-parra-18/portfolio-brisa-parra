"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith("gallery_"));
const duplicatedImages = [...galleryImages, ...galleryImages];

export default function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="gallery"
      className={cn(
        "py-20 md:py-32 bg-card transition-all duration-1000 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-primary font-bold">03. Ilustraciones</p>
        <h2 className="text-4xl font-headline font-bold">Galería</h2>
      </div>
      <div
        className="w-full overflow-hidden relative"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {duplicatedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="w-64 md:w-80 flex-shrink-0">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={400}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                data-ai-hint={image.imageHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
