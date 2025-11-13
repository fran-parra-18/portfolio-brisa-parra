"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { useRef, useState, MouseEvent, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const galleryImages = PlaceHolderImages;

  const duplicatedImages = useMemo(() => {
    if (!galleryImages) return [];
    const limitedImages = galleryImages.slice(0, 12);
    return [...limitedImages, ...limitedImages];
  }, [galleryImages]);


  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!marqueeRef.current) return;
    setIsDown(true);
    marqueeRef.current.classList.add("cursor-grabbing");
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;
    setIsDown(false);
    marqueeRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    if (!marqueeRef.current) return;
    setIsDown(false);
    marqueeRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <section
      ref={ref}
      id="gallery"
      className={cn(
        "min-h-screen flex flex-col justify-center bg-card transition-all duration-1000 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-primary font-bold">03. Ilustraciones</p>
        <h2 className="text-4xl font-headline font-bold">Galería</h2>
      </div>
      <div
        ref={marqueeRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="w-full overflow-x-auto cursor-grab relative no-scrollbar"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] items-center select-none">
          {duplicatedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="w-64 md:w-80 flex-shrink-0">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={400}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md pointer-events-none"
                data-ai-hint={image.imageHint}
              />
            </div>
          ))}
        </div>
      </div>
       <div className="container mx-auto px-4 text-center mt-12">
          <Link href="/gallery" passHref>
            <Button variant="outline" size="lg">Ver todas</Button>
          </Link>
        </div>
    </section>
  );
}
