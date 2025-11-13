"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useCollection, useFirebase, useUser, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { X, PlusCircle, Trash2 } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Illustration = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

const ADMIN_EMAIL = "franciscoparra22@gmail.com";

export default function GalleryPage() {
  const { auth, firestore } = useFirebase();
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<Illustration | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");

  const illustrationsCollection = useMemo(() => collection(firestore, 'illustrations'), [firestore]);
  const illustrationsQuery = useMemo(() => query(illustrationsCollection), [illustrationsCollection]);
  
  const { data: allImages, isLoading } = useCollection<Omit<Illustration, 'id'>>(illustrationsQuery);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const openModal = (image: Illustration) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const handleAddImage = async () => {
    if (!newImageUrl || !newImageDescription) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const newIllustration = {
      imageUrl: newImageUrl,
      description: newImageDescription,
      imageHint: "custom illustration",
    };
    await addDocumentNonBlocking(illustrationsCollection, newIllustration);
    setIsAddDialogOpen(false);
    setNewImageUrl("");
    setNewImageDescription("");
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta ilustración?")) return;
    const docRef = (await import('firebase/firestore')).doc(firestore, 'illustrations', imageId);
    await deleteDocumentNonBlocking(docRef);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-center">
              Galería Completa
            </h1>
            {isAdmin ? (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Ilustración
              </Button>
            ) : (
              <Button onClick={handleGoogleSignIn}>Iniciar Sesión como Admin</Button>
            )}
          </div>
          {isLoading && <p className="text-center">Cargando ilustraciones...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allImages?.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <div
                  className="cursor-pointer w-full h-full"
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
                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Ilustración</DialogTitle>
            <DialogDescription>
              Introduce la URL y la descripción de la nueva imagen.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                URL de Imagen
              </Label>
              <Input
                id="imageUrl"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Input
                id="description"
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddImage}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
