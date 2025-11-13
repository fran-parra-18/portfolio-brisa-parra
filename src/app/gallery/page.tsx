"use client";

import { useState } from "react";
import Image from "next/image";
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  const allImages = PlaceHolderImages.filter(p => 
    p.id.startsWith("gallery_") || 
    p.id.startsWith("vegetal_") ||
    p.id.startsWith("impulso_") ||
    p.id.startsWith("zelda_")
  );

  const openModal = (image: ImagePlaceholder) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-center mb-16">
            Galería Completa
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allImages.map((image) => (
              <div
                key={image.id}
                className="cursor-pointer group overflow-hidden rounded-lg shadow-lg"
                onClick={() => openModal(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover aspect-square transform transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.description}
              width={1600}
              height={1200}
              className="object-contain w-full h-full rounded-lg shadow-2xl"
            />
             <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 z-10 bg-card rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-card/90 transition-all"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
