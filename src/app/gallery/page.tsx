"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { X } from "lucide-react";
import { getImages } from "@/lib/imagekit";

type Illustration = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<Illustration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Illustration | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await getImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to fetch images", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);


  const openModal = (image: Illustration) => {
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
          {/* 
            Puedes cambiar el tamaño del título "Galería Completa" aquí.
            Usa clases como text-3xl, text-4xl, text-5xl.
            También puedes usar prefijos para diferentes tamaños de pantalla (ej. md:text-5xl).
          */}
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-center mb-16">
            Galería Completa
          </h1>
          {isLoading ? (
             <div className="text-center">Cargando imágenes...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover aspect-square transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.description}
              fill
              className="object-contain rounded-lg shadow-2xl"
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
