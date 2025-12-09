"use client";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const contactFields = [
  {
    label: "Nom complet",
    name: "name",
    type: "text",
    required: true,
    placeholder: "Jean Dupont",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    placeholder: "jean.dupont@example.com",
  },
  {
    label: "Téléphone",
    name: "phone",
    type: "tel",
    placeholder: "+33 6 12 34 56 78",
  },
  {
    label: "Sujet",
    name: "subject",
    type: "select",
    required: true,
    options: [
      { value: "", text: "Sélectionnez un sujet" },
      { value: "commande", text: "Passer une commande" },
      { value: "personnalisation", text: "Création sur mesure" },
      { value: "information", text: "Demande d'information" },
      { value: "reparation", text: "Réparation" },
      { value: "autre", text: "Autre" },
    ],
  },
  {
    label: "Message",
    name: "message",
    type: "textarea",
    required: true,
    placeholder: "Décrivez votre projet...",
  },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Atelier",
    text: "123 Rue de l'Artisan\nAntananarivo, Madagascar",
  },
  { icon: Phone, title: "Téléphone", text: "+261 34 12 345 67" },
  { icon: Mail, title: "Email", text: "contact@sandales-artisan.com" },
  { icon: Clock, title: "Horaires", text: "Lundi - Samedi\n9h00 - 18h00" },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
];

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <main className="pt-20 bg-[#F7F3F0] min-h-screen">
      <section className="py-16 bg-gradient-to-br from-[#D9C6B0] to-[#C19A6B] text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Parlons de votre projet
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Nous sommes là pour répondre à toutes vos questions et créer ensemble
          la paire de sandales qui vous ressemble
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-[#E8DDD2]">
          <h2 className="text-3xl font-bold mb-6">Envoyez-nous un message</h2>

          {submitStatus && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {submitStatus === "success"
                ? "✓ Message envoyé avec succès ! Nous vous répondrons rapidement."
                : "✗ Une erreur est survenue. Veuillez réessayer."}
            </div>
          )}

          <div className="flex flex-col gap-6">
            {contactFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-2">
                  {field.label}
                  {field.required && " *"}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={6}
                    className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors resize-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors bg-white"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.text}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border-2 border-[#E8DDD2] px-4 py-3 rounded-lg focus:outline-none focus:border-[#E07B39] transition-colors"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#E07B39] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C86A2F] transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </button>

            <p className="text-sm text-gray-500 text-center">
              * Champs obligatoires
            </p>
          </div>
        </div>

        {/* Informations */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E8DDD2]">
            <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#E07B39]">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{info.title}</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {info.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#E07B39] to-[#C86A2F] p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-3">💬 Temps de réponse</h3>
            <p className="text-sm text-white/90">
              Nous nous engageons à répondre à votre message dans un délai de
              24h maximum (jours ouvrables).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E8DDD2]">
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-12 h-12 bg-[#F7F3F0] rounded-full flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
