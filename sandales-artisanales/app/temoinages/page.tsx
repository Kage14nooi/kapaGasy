"use client";
import { useEffect, useState } from "react";
import { getTemoignages } from "@/app/services/apiService";
import { Quote, X, Star } from "lucide-react";

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
  const [showReviewForm, setShowReviewForm] = useState(false);

  // États du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setFormData({ name: "", email: "", message: "", rating: 0 });
    setSubmitSuccess(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simuler l'envoi (remplacer par votre API)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);

      // Fermer après 2 secondes
      setTimeout(() => {
        closeReviewForm();
      }, 2000);
    }, 1500);
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
      <section
        id="testimonials"
        className="py-28 bg-gradient-to-b from-white to-[#F7F3F0]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#E07B39] border-t-transparent rounded-full animate-spin"></div>
            <p
              className="text-[#8B6F47] text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Chargement des témoignages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="testimonials"
        className="py-28 bg-gradient-to-b from-white to-[#F7F3F0]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-[#D9C6B0]">
            <p
              className="text-[#C19A6B] text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Calcul des statistiques
  const totalTestimonials = testimonials.length;
  const averageRating =
    testimonials.reduce((acc, t) => acc + (t.rating || 0), 0) /
    totalTestimonials;
  const fiveStarCount = testimonials.filter((t) => t.rating === 5).length;

  return (
    <>
      <section
        id="testimonials"
        className="py-28 bg-gradient-to-b from-white to-[#F7F3F0]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* En-tête de section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-[#E07B39]/10 rounded-full mx-auto">
                <Quote className="w-8 h-8 text-[#E07B39]" />
              </div>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3D3D3D]"
              style={{ fontFamily: "'Lora', serif", letterSpacing: "-0.01em" }}
            >
              Témoignages Clients
            </h2>

            <p
              className="text-lg md:text-xl text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
            >
              Découvrez les expériences authentiques de nos clients qui ont
              choisi l'excellence artisanale
            </p>

            {/* Statistiques */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div
                  className="text-4xl font-bold text-[#E07B39] mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {totalTestimonials}+
                </div>
                <div
                  className="text-sm text-[#8B6F47] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Avis clients
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl font-bold text-[#E07B39] mb-2 flex items-center gap-2 justify-center"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {averageRating.toFixed(1)} <span className="text-2xl">★</span>
                </div>
                <div
                  className="text-sm text-[#8B6F47] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Note moyenne
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl font-bold text-[#E07B39] mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {Math.round((fiveStarCount / totalTestimonials) * 100)}%
                </div>
                <div
                  className="text-sm text-[#8B6F47] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  5 étoiles
                </div>
              </div>
            </div>
          </div>

          {/* Grille de témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => {
              const fullAvatarUrl = getAvatarUrl(t);

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTestimonial(t)}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer border border-[#D9C6B0]/30 hover:border-[#E07B39]/50 relative overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Décoration d'angle */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#E07B39]/5 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>

                  {/* Icône de citation */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Quote className="w-12 h-12 text-[#E07B39]" />
                  </div>

                  {/* Photo + nom */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <img
                      src={fullAvatarUrl}
                      alt={t.name || "Avatar client"}
                      className="w-16 h-16 rounded-full object-cover border-3 border-[#D9C6B0] group-hover:border-[#E07B39] transition-all duration-500 group-hover:scale-110"
                    />
                    <div>
                      <p
                        className="font-semibold text-lg text-[#3D3D3D] group-hover:text-[#E07B39] transition-colors duration-300"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {t.name || "Client Anonyme"}
                      </p>
                      {t.rating && (
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-base transition-colors duration-300 ${
                                i < t.rating!
                                  ? "text-[#E07B39]"
                                  : "text-[#D9C6B0]"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <p
                    className="text-[#6B6B6B] leading-relaxed line-clamp-4 relative z-10"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: "1.8",
                      fontSize: "0.95rem",
                    }}
                  >
                    "{t.message || "Témoignage non disponible."}"
                  </p>

                  {/* Indicateur "Lire plus" */}
                  <div className="mt-6 pt-4 border-t border-[#D9C6B0]/30 flex items-center justify-between relative z-10">
                    <span
                      className="text-sm text-[#E07B39] font-medium group-hover:underline"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Lire le témoignage complet
                    </span>
                    <span className="text-[#E07B39] transform transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA pour laisser un avis */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-[#D9C6B0]/20 to-[#C19A6B]/20 rounded-3xl p-12 border border-[#D9C6B0]/50">
              <h3
                className="text-3xl font-bold text-[#3D3D3D] mb-4"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Partagez votre expérience
              </h3>
              <p
                className="text-[#6B6B6B] mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                Vous avez acheté nos sandales ? Votre avis compte pour nous et
                aide d'autres clients à faire leur choix
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-10 py-4 bg-[#E07B39] text-white rounded-full font-semibold hover:bg-[#C96A2E] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Laisser un avis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal témoignage complet */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full p-12 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
            style={{ border: "2px solid #D9C6B0" }}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F3F0] text-[#8B6F47] hover:bg-[#E07B39] hover:text-white transition-all duration-300 hover:rotate-90"
              aria-label="Fermer"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            {/* Icône de citation décorative */}
            <div className="absolute top-12 left-12 opacity-5">
              <Quote className="w-24 h-24 text-[#E07B39]" />
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Avatar agrandi */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-[#E07B39]/20 rounded-full blur-2xl"></div>
                <img
                  src={getAvatarUrl(selectedTestimonial)}
                  alt={selectedTestimonial.name || "Avatar client"}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-[#E07B39] shadow-lg"
                />
              </div>

              {/* Nom */}
              <p
                className="font-bold text-3xl text-[#3D3D3D] mb-3"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {selectedTestimonial.name || "Client Anonyme"}
              </p>

              {/* Note */}
              {selectedTestimonial.rating && (
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl transition-all duration-300 ${
                        i < selectedTestimonial.rating!
                          ? "text-[#E07B39]"
                          : "text-[#D9C6B0]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Message complet */}
              <div className="relative">
                <p
                  className="text-[#6B6B6B] text-lg leading-relaxed max-w-2xl"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  "{selectedTestimonial.message || "Témoignage non disponible."}
                  "
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal formulaire d'avis */}
      {showReviewForm && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeReviewForm}
        >
          <div
            className="relative bg-white rounded-3xl max-w-2xl w-full p-10 shadow-2xl animate-scaleIn overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ border: "2px solid #D9C6B0" }}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeReviewForm}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F3F0] text-[#8B6F47] hover:bg-[#E07B39] hover:text-white transition-all duration-300 hover:rotate-90"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {!submitSuccess ? (
              <>
                {/* En-tête */}
                <div className="text-center mb-8">
                  <div className="inline-block mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#E07B39]/10 rounded-full mx-auto">
                      <Star className="w-8 h-8 text-[#E07B39]" />
                    </div>
                  </div>
                  <h3
                    className="text-3xl font-bold text-[#3D3D3D] mb-3"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Laissez votre avis
                  </h3>
                  <p
                    className="text-[#6B6B6B]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Partagez votre expérience avec nos sandales artisanales
                  </p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Votre nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#D9C6B0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:border-transparent transition-all"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Votre email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#D9C6B0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:border-transparent transition-all"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="jean@exemple.com"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#3D3D3D] mb-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Votre note *
                    </label>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-all duration-200 hover:scale-125"
                        >
                          <Star
                            size={40}
                            className={`${
                              star <= (hoveredRating || formData.rating)
                                ? "fill-[#E07B39] text-[#E07B39]"
                                : "text-[#D9C6B0]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Votre témoignage *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-[#D9C6B0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:border-transparent transition-all resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Partagez votre expérience avec nos sandales..."
                    />
                  </div>

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={submitting || formData.rating === 0}
                    className="w-full px-8 py-4 bg-[#E07B39] text-white rounded-full font-semibold hover:bg-[#C96A2E] transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {submitting ? "Envoi en cours..." : "Envoyer mon avis"}
                  </button>
                </form>
              </>
            ) : (
              /* Message de succès */
              <div className="text-center py-12">
                <div className="inline-block mb-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto">
                    <svg
                      className="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className="text-3xl font-bold text-[#3D3D3D] mb-4"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Merci pour votre avis !
                </h3>
                <p
                  className="text-[#6B6B6B] text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Votre témoignage a été envoyé avec succès.
                  <br />
                  Il sera publié après validation.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
