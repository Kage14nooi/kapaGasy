"use client";
import { useEffect, useState } from "react";
import { getArtisan } from "@/app/services/apiService";

// --- Interfaces ---

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

// --- Composant Modale ---

interface ModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal = ({ src, alt, onClose }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative p-6 max-w-5xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-white text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 z-10"
          style={{
            backgroundColor: "rgba(224, 123, 57, 0.9)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ×
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] w-auto rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

// --- Composant Principal : ArtisanPage ---

const API_BASE_URL = "http://localhost:1337";

export default function ArtisanPage() {
  const [artisan, setArtisan] = useState<ArtisanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: "", alt: "" });

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const data = await getArtisan();
        setArtisan(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'artisan :", err);
        setLoading(false);
      }
    };
    fetchArtisan();
  }, []);

  const openModal = (url: string, alt: string) => {
    setCurrentImage({
      src: url.startsWith("/") ? `${API_BASE_URL}${url}` : url,
      alt,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  // --- Rendu ---

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

  const artisanData =
    artisan ||
    ({
      name: "L'Artisan",
      description:
        "Passionné par le cuir et les matériaux naturels, notre artisan crée des sandales uniques et confortables, fabriquées à la main avec amour et soin. Chaque paire raconte une histoire et vous garantit qualité et durabilité.",
      photo: null,
      gallery: null,
    } as ArtisanData);

  const mainPhotoUrl =
    getFullImageUrl(artisanData.photo) ||
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2074&auto=format&fit=crop";
  const gallery = artisanData.gallery || [];

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "#F7F3F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête de page */}
        <div className="text-center mb-16">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#E07B39",
              fontWeight: "600",
            }}
          >
            Rencontre avec
          </p>
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Lora', serif",
              color: "#4A4A4A",
              letterSpacing: "-0.01em",
            }}
          >
            {artisanData.name || "L'Artisan"}
          </h1>
        </div>

        {/* Section principale alternée */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20 mb-20">
          {/* Colonne Image principale */}
          <div className="w-full lg:w-1/2">
            <div
              className="relative w-full h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() =>
                openModal(mainPhotoUrl, `Portrait de ${artisanData.name}`)
              }
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
                  Voir en grand
                </span>
              </div>
            </div>
          </div>

          {/* Colonne Texte */}
          <div className="w-full lg:w-1/2">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#E07B39",
                fontWeight: "600",
              }}
            >
              Son histoire
            </p>

            <h2
              className="text-3xl lg:text-4xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "'Lora', serif",
                color: "#4A4A4A",
              }}
            >
              À propos de {artisanData.name || "l'artisan"}
            </h2>

            <p
              className="text-lg leading-relaxed mb-6 whitespace-pre-line"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#6B6B6B",
                fontWeight: "300",
              }}
            >
              {artisanData.description}
            </p>

            <p
              className="text-lg font-medium leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C19A6B",
              }}
            >
              L'artisanat local au service de vos pieds !
            </p>

            <a
              href="/sandales"
              className="inline-flex items-center gap-2 px-8 py-4 mt-8 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
        </div>

        {/* Galerie de photos */}
        {gallery.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <p
                className="text-sm tracking-[0.3em] uppercase mb-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#E07B39",
                  fontWeight: "600",
                }}
              >
                Galerie
              </p>
              <h3
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "'Lora', serif",
                  color: "#4A4A4A",
                }}
              >
                Notre savoir-faire en images
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((photo, index) => {
                const thumbUrl = getFullImageUrl(photo, "small");
                return (
                  <div
                    key={index}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group transition-transform duration-300 hover:scale-105"
                    onClick={() =>
                      openModal(
                        getFullImageUrl(photo),
                        `Galerie photo ${index + 1}`
                      )
                    }
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

      {/* Modale d'image */}
      {modalOpen && (
        <ImageModal
          src={currentImage.src}
          alt={currentImage.alt}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
