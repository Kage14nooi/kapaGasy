"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Image de fond avec parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=2071&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Overlay gradient doux pour meilleure lisibilité */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139, 111, 71, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        {/* Petit texte au-dessus avec effet d'apparition */}
        <p
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 opacity-90"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#F7F3F0",
            fontWeight: "500",
            animation: "fadeInUp 0.8s ease-out",
          }}
        >
          Artisanat Authentique de Madagascar
        </p>

        {/* Titre principal avec effet premium */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          style={{
            fontFamily: "'Lora', serif",
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            letterSpacing: "-0.02em",
            animation: "fadeInUp 1s ease-out 0.2s both",
          }}
        >
          Sandales Artisanales
        </h1>

        {/* Sous-titre élégant */}
        <p
          className="text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#F7F3F0",
            fontWeight: "300",
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            lineHeight: "1.6",
            animation: "fadeInUp 1.2s ease-out 0.4s both",
          }}
        >
          Fabriquées à la main avec passion et matériaux naturels. Chaque paire
          raconte une histoire unique d'authenticité et de savoir-faire.
        </p>

        {/* CTA Buttons avec effets améliorés */}
        <div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          style={{
            animation: "fadeInUp 1.4s ease-out 0.6s both",
          }}
        >
          <a
            href="#collection"
            className="group px-10 py-4 rounded-full font-semibold text-base md:text-lg bg-[#E07B39] text-white transition-all duration-300 hover:bg-[#C96A2E] hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Voir la Collection
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>

          <a
            href="#artisan"
            className="px-10 py-4 rounded-full font-semibold text-base md:text-lg border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-[#8B6F47] hover:scale-105 hover:shadow-xl backdrop-blur-md"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            Découvrir l'Artisan
          </a>
        </div>
      </div>

      {/* Scroll indicator amélioré */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-xs tracking-[0.2em] uppercase opacity-90"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#F7F3F0",
              fontWeight: "500",
            }}
          >
            Défiler
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-[#F7F3F0] flex items-start justify-center p-2 hover:border-[#E07B39] transition-colors duration-300">
            <div className="w-1.5 h-3 rounded-full bg-[#E07B39] animate-bounce" />
          </div>
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

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
