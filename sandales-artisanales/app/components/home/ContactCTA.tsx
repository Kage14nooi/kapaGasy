"use client";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  Globe,
  Palette,
  CreditCard,
  Leaf,
} from "lucide-react";

export default function ContactCTA() {
  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      text: "contact@sandalart.mg",
      link: "mailto:contact@sandalart.mg",
    },
    {
      icon: MapPin,
      title: "Atelier",
      text: "Antananarivo, Madagascar",
      link: null,
    },
    {
      icon: Clock,
      title: "Horaires",
      text: "Lun - Sam : 9h - 18h",
      link: null,
    },
  ];

  const trustIcons = [
    { icon: Globe, text: "Livraison internationale" },
    { icon: Palette, text: "Personnalisation offerte" },
    { icon: CreditCard, text: "Paiement sécurisé" },
    { icon: Leaf, text: "Matériaux naturels" },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#9B8565] via-[#B59A7A] to-[#9B8565] relative overflow-hidden"
    >
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full animate-pulse-slow"></div>
        <div
          className="absolute bottom-32 right-16 w-40 h-40 border border-white rounded-full animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 border border-white rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mx-auto border border-white/20">
              <Send className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight"
            style={{
              fontFamily: "'Lora', serif",
              textShadow: "0 2px 20px rgba(0,0,0,0.2)",
            }}
          >
            Créons Ensemble Votre Paire Parfaite
          </h2>

          <p
            className="text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
          >
            Chaque paire de sandales est une œuvre unique, façonnée avec passion
            et savoir-faire. Que vous ayez une question, un projet sur mesure ou
            simplement l'envie de découvrir notre artisanat, nous sommes là pour
            vous accompagner.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80 mt-6">
            <span className="px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              ✓ Réponse sous 24h
            </span>
            <span className="px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              ✓ Devis gratuit
            </span>
            <span className="px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              ✓ Création sur mesure
            </span>
          </div>
        </div>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
          <a
            href="mailto:contact@sandalart.mg"
            className="group inline-flex items-center justify-center gap-2.5 bg-[#D97339] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#C96A2E] transition-all duration-300 shadow-xl hover:shadow-[#D97339]/40 hover:scale-105 min-w-[220px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Mail size={20} />
            Envoyer un Message
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="tel:+261XXXXXXXXX"
            className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#8B6F47] px-8 py-3.5 rounded-full font-semibold hover:bg-[#F7F3F0] transition-all duration-300 shadow-xl hover:scale-105 min-w-[220px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Phone size={20} />
            Nous Appeler
          </a>
        </div>

        {/* Cartes d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactCards.map((card, index) => (
            <div
              key={card.title}
              className="group bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="mb-3 text-[#D97339] inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <card.icon size={28} />
              </div>

              <h3
                className="font-bold text-lg mb-2 text-white"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {card.title}
              </h3>

              {card.link ? (
                <a
                  href={card.link}
                  className="text-sm text-white/85 hover:text-white transition-colors duration-300 hover:underline block"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {card.text}
                </a>
              ) : (
                <p
                  className="text-sm text-white/85"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {card.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Barre de confiance */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center flex flex-wrap justify-center gap-5">
          {trustIcons.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-white/75 text-xs md:text-sm"
            >
              <item.icon size={14} />
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

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
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.05;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.08;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
