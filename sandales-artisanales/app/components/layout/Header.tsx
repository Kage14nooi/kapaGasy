"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md backdrop-blur-sm bg-opacity-98"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo avec typographie Lora */}
        <a
          href="/"
          className={`text-2xl lg:text-3xl font-bold tracking-wide transition-all duration-300 hover:scale-105 ${
            scrolled ? "text-[#C19A6B]" : "text-white drop-shadow-lg"
          }`}
          style={{
            fontFamily: "'Lora', serif",
          }}
        >
          SANDAL'ART
        </a>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="/"
            className={`relative text-base font-medium tracking-wide transition-all duration-300 hover:scale-105 group ${
              scrolled ? "text-[#4A4A4A]" : "text-white drop-shadow-md"
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Accueil
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E07B39] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/sandales"
            className={`relative text-base font-medium tracking-wide transition-all duration-300 hover:scale-105 group ${
              scrolled ? "text-[#4A4A4A]" : "text-white drop-shadow-md"
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Collection
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E07B39] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/artisan"
            className={`relative text-base font-medium tracking-wide transition-all duration-300 hover:scale-105 group ${
              scrolled ? "text-[#4A4A4A]" : "text-white drop-shadow-md"
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            L'Artisan
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E07B39] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/temoinages"
            className={`relative text-base font-medium tracking-wide transition-all duration-300 hover:scale-105 group ${
              scrolled ? "text-[#4A4A4A]" : "text-white drop-shadow-md"
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Témoignages
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E07B39] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/contact"
            className="px-6 py-2.5 rounded-full font-semibold bg-[#E07B39] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C96A2E]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact
          </a>
        </nav>

        {/* Burger menu mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              } ${scrolled || open ? "bg-[#C19A6B]" : "bg-white"}`}
              style={{
                transformOrigin: "center",
              }}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              } ${scrolled || open ? "bg-[#C19A6B]" : "bg-white"}`}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              } ${scrolled || open ? "bg-[#C19A6B]" : "bg-white"}`}
              style={{
                transformOrigin: "center",
              }}
            />
          </div>
        </button>
      </div>

      {/* Menu mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-[#F7F3F0] border-t border-[#D9C6B0]/30 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-8 space-y-6">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="block text-lg font-medium tracking-wide text-[#4A4A4A] transition-all duration-300 hover:translate-x-2 hover:text-[#E07B39]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Accueil
          </a>
          <a
            href="/sandales"
            onClick={() => setOpen(false)}
            className="block text-lg font-medium tracking-wide text-[#4A4A4A] transition-all duration-300 hover:translate-x-2 hover:text-[#E07B39]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Collection
          </a>
          <a
            href="/artisan"
            onClick={() => setOpen(false)}
            className="block text-lg font-medium tracking-wide text-[#4A4A4A] transition-all duration-300 hover:translate-x-2 hover:text-[#E07B39]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            L'Artisan
          </a>
          <a
            href="/temoniages"
            onClick={() => setOpen(false)}
            className="block text-lg font-medium tracking-wide text-[#4A4A4A] transition-all duration-300 hover:translate-x-2 hover:text-[#E07B39]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Témoignages
          </a>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-3 rounded-full font-semibold bg-[#E07B39] text-white transition-all duration-300 hover:shadow-lg hover:bg-[#C96A2E]"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
