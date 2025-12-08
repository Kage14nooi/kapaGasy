// --- Composant CarouselModal ---
"use client";
import { useEffect, useState } from "react";
interface CarouselModalProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

const CarouselModal = ({
  images,
  initialIndex,
  onClose,
}: CarouselModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85"
      onClick={onClose}
    >
      <div
        className="relative p-6 max-w-5xl w-full max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de Fermeture */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white text-3xl font-bold p-2 bg-black/50 rounded-full hover:bg-black/70 transition z-10"
        >
          &times;
        </button>

        {/* Image du Carrousel */}
        <div className="flex items-center justify-center h-full relative">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
          />
        </div>

        {/* Contrôles de Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full ml-4 hover:bg-black/70 transition z-10"
            >
              &#10094;
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full mr-4 hover:bg-black/70 transition z-10"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Compteur */}
        <div className="absolute bottom-0 w-full text-center p-2 text-white/80">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
