"use client";
import { useEffect, useState } from "react";
// Importation du service API
import { getArtisan } from "@/app/services/apiService";

// --- Interfaces (Inchangées) ---

interface ImageFormat {
  url: string;
}

interface Photo {
  url: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
  };
}

interface ArtisanData {
  id: number;
  name: string;
  description: string;
  photo: Photo | null;
  gallery: Photo[] | null;
}

// --- Constantes et Fonctions Utilitaires ---

const API_BASE_URL = "http://localhost:1337";

const getFullImageUrl = (
  photo: Photo | null,
  format: "url" | "small" = "url"
) => {
  if (!photo) return "/placeholder.jpg";
  let url = photo.url;
  if (format === "small" && photo.formats?.small?.url) {
    url = photo.formats.small.url;
  }
  return url.startsWith("/") ? `${API_BASE_URL}${url}` : url;
};

// --- Composant CarouselModal ---

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative p-6 max-w-6xl w-full max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de Fermeture */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 m-4 text-white text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 z-10"
          style={{
            backgroundColor: "rgba(224, 123, 57, 0.9)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ×
        </button>

        {/* Image du Carrousel */}
        <div className="flex items-center justify-center h-full relative">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
          />
        </div>

        {/* Contrôles de Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10"
              style={{ backgroundColor: "rgba(193, 154, 107, 0.8)" }}
            >
              <span className="text-2xl">‹</span>
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10"
              style={{ backgroundColor: "rgba(193, 154, 107, 0.8)" }}
            >
              <span className="text-2xl">›</span>
            </button>
          </>
        )}

        {/* Compteur */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#F7F3F0",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

// --- Composant Principal : AboutArtisan ---

export default function AboutArtisan() {
  const [artisan, setArtisan] = useState<ArtisanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        // Chargement réel des données via l'API
        const data = await getArtisan();
        setArtisan(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'artisan :", err);
        setError("Impossible de charger les informations de l'artisan.");
        setLoading(false);
      }
    };
    fetchArtisan();
  }, []);

  const openCarouselModal = (startIndex: number) => {
    if (!artisan) return;

    const allImages: { src: string; alt: string }[] = [];

    if (artisan.photo) {
      allImages.push({
        src: getFullImageUrl(artisan.photo),
        alt: `Portrait de ${artisan.name || "l'artisan"} (Principale)`,
      });
    }

    (artisan.gallery || []).forEach((photo, index) => {
      allImages.push({
        src: getFullImageUrl(photo),
        alt: `Galerie photo ${index + 1}`,
      });
    });

    if (allImages.length === 0) return;

    setCarouselImages(allImages);
    setInitialSlideIndex(startIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // --- Rendu de l'état de chargement et des données par défaut/erreur ---

  if (loading) {
    return (
      <section
        className="py-32 text-center"
        style={{ backgroundColor: "#F7F3F0" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#E07B39", borderTopColor: "transparent" }}
          />
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A" }}>
            Chargement des informations...
          </p>
        </div>
      </section>
    );
  }

  // Données de fallback si l'API échoue ou ne retourne rien, ou les données réelles
  const artisanData =
    artisan ||
    ({
      name: "L'Artisan Local",
      description:
        "Passionné par le cuir et les matériaux naturels, notre artisan crée des sandales uniques et confortables, fabriquées à la main avec amour et soin.\n\nChaque paire raconte une histoire et vous garantit qualité et durabilité.",
      photo: null,
      gallery: null,
    } as ArtisanData);

  const mainPhotoUrl =
    getFullImageUrl(artisanData.photo) ||
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2074&auto=format&fit=crop";
  const gallery = artisanData.gallery || [];

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: "#F7F3F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section principale alternée */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Colonne Texte */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#E07B39",
                fontWeight: "600",
              }}
            >
              Savoir-Faire Artisanal
            </p>

            <h2
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "'Lora', serif",
                color: "#4A4A4A",
                letterSpacing: "-0.01em",
              }}
            >
              À propos de {artisanData.name}
            </h2>

            <div
              className="text-lg leading-relaxed mb-8 space-y-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#6B6B6B",
                fontWeight: "300",
              }}
            >
              {(artisanData.description || "")
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              <p className="font-medium" style={{ color: "#C19A6B" }}>
                L'artisanat local au service de vos pieds !
              </p>
            </div>

            <a
              href="/sandales"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: "#E07B39",
                color: "#FFFFFF",
              }}
            >
              Découvrir nos créations
              <span>→</span>
            </a>
          </div>

          {/* Colonne Image (Cliquable) */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div
              className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() => openCarouselModal(0)}
            >
              <img
                src={mainPhotoUrl}
                alt={`Portrait de ${artisanData.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-12">
                <span
                  className="px-6 py-3 rounded-full font-semibold"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: "rgba(224, 123, 57, 0.9)",
                    color: "#FFFFFF",
                  }}
                >
                  Voir la galerie complète
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Galerie de photos (si disponible) */}
        {gallery.length > 0 && (
          <div className="mt-24">
            <h3
              className="text-3xl font-bold mb-10 text-center"
              style={{
                fontFamily: "'Lora', serif",
                color: "#4A4A4A",
              }}
            >
              Notre savoir-faire en images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((photo, index) => {
                const thumbUrl = getFullImageUrl(photo, "small");
                const carouselIndex = (artisanData.photo ? 1 : 0) + index;

                return (
                  <div
                    key={index}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group transition-transform duration-300 hover:scale-105"
                    onClick={() => openCarouselModal(carouselIndex)}
                  >
                    <img
                      src={thumbUrl}
                      alt={`Galerie photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "rgba(193, 154, 107, 0.3)" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modale Carrousel */}
      {modalOpen && carouselImages.length > 0 && (
        <CarouselModal
          images={carouselImages}
          initialIndex={initialSlideIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
