"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi (remplacer par votre logique d'envoi)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Réinitialiser le message après 5 secondes
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <main className="pt-20 bg-[#F7F3F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#D9C6B0] to-[#C19A6B] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
            style={{ fontFamily: "Lora, serif" }}
          >
            Parlons de votre projet
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.7" }}
          >
            Nous sommes là pour répondre à toutes vos questions et créer
            ensemble la paire de sandales qui vous ressemble
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg"
                style={{ border: "1px solid #E8DDD2" }}
              >
                <h2
                  className="text-3xl font-bold mb-6 text-[#3D3D3D]"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  Envoyez-nous un message
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p
                      className="text-green-700 font-medium"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      ✓ Message envoyé avec succès ! Nous vous répondrons dans
                      les plus brefs délais.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p
                      className="text-red-700 font-medium"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      ✗ Une erreur est survenue. Veuillez réessayer.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-[#3D3D3D] mb-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#3D3D3D] mb-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean.dupont@example.com"
                        className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors bg-white"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="commande">Passer une commande</option>
                      <option value="personnalisation">
                        Création sur mesure
                      </option>
                      <option value="information">Demande d'information</option>
                      <option value="reparation">Réparation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez-nous votre projet ou posez-nous vos questions..."
                      className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors resize-none"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                      rows={6}
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#E07B39] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C86A2F] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </button>

                  <p
                    className="text-sm text-gray-500 text-center"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    * Champs obligatoires
                  </p>
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              {/* Coordonnées */}
              <div
                className="bg-white p-6 rounded-2xl shadow-lg"
                style={{ border: "1px solid #E8DDD2" }}
              >
                <h3
                  className="text-2xl font-bold mb-6 text-[#3D3D3D]"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  Nos coordonnées
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#E07B39] text-xl flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-[#3D3D3D] mb-1"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        Atelier
                      </h4>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        123 Rue de l'Artisan
                        <br />
                        Antananarivo, Madagascar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#E07B39] text-xl flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-[#3D3D3D] mb-1"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        Téléphone
                      </h4>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        +261 34 12 345 67
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#E07B39] text-xl flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-[#3D3D3D] mb-1"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        Email
                      </h4>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        contact@sandales-artisan.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#E07B39] text-xl flex-shrink-0">
                      ⏰
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-[#3D3D3D] mb-1"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        Horaires
                      </h4>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Lundi - Samedi
                        <br />
                        9h00 - 18h00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Délais de réponse */}
              <div className="bg-gradient-to-br from-[#E07B39] to-[#C86A2F] p-6 rounded-2xl shadow-lg text-white">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  💬 Temps de réponse
                </h3>
                <p
                  className="text-sm text-white/90"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    lineHeight: "1.6",
                  }}
                >
                  Nous nous engageons à répondre à votre message dans un délai
                  de 24h maximum (jours ouvrables).
                </p>
              </div>

              {/* Réseaux sociaux */}
              <div
                className="bg-white p-6 rounded-2xl shadow-lg"
                style={{ border: "1px solid #E8DDD2" }}
              >
                <h3
                  className="text-xl font-bold mb-4 text-[#3D3D3D]"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  Suivez-nous
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all duration-300"
                  >
                    📘
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all duration-300"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all duration-300"
                  >
                    🐦
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
