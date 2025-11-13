"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getImages } from "@/lib/imagekit";


type Illustration = {
  id: string;
  imageUrl: string;
  description: string;
};

export default function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [galleryImages, setGalleryImages] = useState<Illustration[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages();
        setGalleryImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <section
      ref={ref}
      id="gallery"
      className={cn(
        "min-h-screen flex flex-col justify-center bg-card transition-all duration-1000 ease-in-out py-24",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-primary font-bold">03. Ilustraciones</p>
        <h2 className="text-4xl font-headline font-bold">Galería</h2>
      </div>
      <div className="w-full relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
           plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {galleryImages.slice(0, 12).map((image) => (
              <CarouselItem key={image.id} className="pl-4 basis-auto">
                {/* 
                  Puedes ajustar el ancho (w-64) y alto (h-96) de las imágenes del carrusel aquí.
                  w-64 = 16rem = 256px
                  h-96 = 24rem = 384px
                */}
                <div className="relative w-64 h-96"> 
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
       <div className="container mx-auto px-4 text-center mt-12">
          <Link href="/gallery" passHref>
            <Button variant="outline" size="lg">Ver todas</Button>
          </Link>
        </div>
    </section>
  );
}
