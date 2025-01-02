import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import { useState } from "react";

interface GalleryProps {
  photos: Array<{
    url: string;
    alt: string;
    description: string;
  }>;
}

export const Gallery = ({ photos }: GalleryProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-8 text-center">Галерия</h2>
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <div className="relative">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <DialogTrigger asChild>
                    <div 
                      className="p-1 cursor-pointer"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white text-lg font-medium">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 sm:max-w-[100vw] border-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <Carousel className="w-full h-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="max-w-full max-h-[85vh] object-contain mx-auto"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white text-lg font-medium text-center">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 sm:left-8 h-10 w-10 sm:h-12 sm:w-12" />
              <CarouselNext className="right-4 sm:right-8 h-10 w-10 sm:h-12 sm:w-12" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};