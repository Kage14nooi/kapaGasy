"use client";
import { useEffect, useState } from "react";
import { getTemoignages } from "@/app/services/apiService";

interface TestimonialData {
  id: number;
  name: string;
  message: string;
  rating?: number;
  photo?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
    };
  } | null;
}

const API_BASE_URL = "http://localhost:1337";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialData | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTemoignages();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des témoignages :", err);
        setError("Erreur lors du chargement des témoignages.");
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  const getAvatarUrl = (testimonial: TestimonialData) => {
    let avatarUrl = "/placeholder.jpg";
    const photoUrl = testimonial.photo?.url;
    const thumbnailUrl = testimonial.photo?.formats?.thumbnail?.url;

    if (thumbnailUrl) {
      avatarUrl = thumbnailUrl;
    } else if (photoUrl) {
      avatarUrl = photoUrl;
    }

    return avatarUrl.startsWith("/")
      ? `${API_BASE_URL}${avatarUrl}`
      : avatarUrl;
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p
            className="text-[#C19A6B] text-lg font-light"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Chargement des avis clients...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p
            className="text-red-500 font-light"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-[#3D3D3D] tracking-wide"
            style={{ fontFamily: "Lora, serif" }}
          >
            Ce que disent nos clients
          </h2>
          <p
            className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
            style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.6" }}
          >
            Découvrez les retours authentiques de ceux qui portent nos créations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((t) => {
              const fullAvatarUrl = getAvatarUrl(t);

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTestimonial(t)}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center cursor-pointer"
                  style={{ border: "1px solid #E8DDD2" }}
                >
                  <img
                    src={fullAvatarUrl}
                    alt={t.name || "Avatar client"}
                    className="w-20 h-20 rounded-full mb-6 object-cover border-4 border-[#D9C6B0] transition-all duration-300"
                  />

                  {t.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < t.rating! ? "text-[#E07B39]" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}

                  <p
                    className="text-gray-700 mb-6 italic leading-relaxed line-clamp-3"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      lineHeight: "1.7",
                    }}
                  >
                    "{t.message || "Témoignage non disponible."}"
                  </p>

                  <p
                    className="font-semibold text-lg text-[#3D3D3D] mt-auto"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {t.name || "Client Anonyme"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal pour afficher le témoignage complet */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ border: "2px solid #D9C6B0" }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#E07B39] text-3xl font-light transition-colors"
              aria-label="Fermer"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={getAvatarUrl(selectedTestimonial)}
                alt={selectedTestimonial.name || "Avatar client"}
                className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-[#D9C6B0]"
              />

              <p
                className="font-bold text-2xl text-[#3D3D3D] mb-2"
                style={{ fontFamily: "Lora, serif" }}
              >
                {selectedTestimonial.name || "Client Anonyme"}
              </p>

              {selectedTestimonial.rating && (
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < selectedTestimonial.rating!
                          ? "text-[#E07B39]"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              <p
                className="text-gray-700 text-lg italic leading-relaxed"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  lineHeight: "1.8",
                }}
              >
                "{selectedTestimonial.message || "Témoignage non disponible."}"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
