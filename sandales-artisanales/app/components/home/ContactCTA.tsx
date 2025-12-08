export default function ContactCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#D9C6B0] to-[#C19A6B] text-center relative overflow-hidden">
      {/* Motif décoratif de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-wide"
          style={{ fontFamily: "Lora, serif" }}
        >
          Une question ? Envie d'une création sur mesure ?
        </h2>

        <p
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.7" }}
        >
          Chaque paire de sandales est unique. Contactez-nous pour discuter de
          vos besoins, poser vos questions ou commander une création
          personnalisée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="/contact"
            className="inline-block bg-[#E07B39] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C86A2F] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[200px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Envoyer un message
          </a>

          <a
            href="tel:+33123456789"
            className="inline-block bg-white text-[#3D3D3D] px-8 py-4 rounded-lg font-semibold hover:bg-[#F7F3F0] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[200px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            📞 Nous appeler
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-white">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl mb-3">✉️</div>
            <h3
              className="font-semibold text-lg mb-2"
              style={{ fontFamily: "Lora, serif" }}
            >
              Email
            </h3>
            <p
              className="text-sm text-white/80"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              contact@sandales-artisan.com
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl mb-3">📍</div>
            <h3
              className="font-semibold text-lg mb-2"
              style={{ fontFamily: "Lora, serif" }}
            >
              Atelier
            </h3>
            <p
              className="text-sm text-white/80"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Antananarivo, Madagascar
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl mb-3">⏰</div>
            <h3
              className="font-semibold text-lg mb-2"
              style={{ fontFamily: "Lora, serif" }}
            >
              Horaires
            </h3>
            <p
              className="text-sm text-white/80"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Lun - Sam : 9h - 18h
            </p>
          </div>
        </div>

        <p
          className="text-sm text-white/70 mt-8"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Réponse sous 24h • Devis gratuit • Livraison internationale
        </p>
      </div>
    </section>
  );
}
