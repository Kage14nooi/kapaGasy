import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#8B6F47] text-[#F7F3F0] py-16 mt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="text-center mb-16 pb-12 border-b border-[#D9C6B0]/30">
          <h3 className="text-2xl font-['Lora'] font-bold mb-3 text-white">
            Rejoignez notre communauté
          </h3>
          <p className="text-[#F7F3F0]/80 mb-6 max-w-md mx-auto">
            Recevez nos nouveautés et offres exclusives directement dans votre
            boîte mail
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-[#D9C6B0]/30 text-white placeholder-[#F7F3F0]/50 focus:outline-none focus:border-[#E07B39] transition-colors"
            />
            <button className="px-6 py-3 bg-[#E07B39] text-white rounded-lg font-medium hover:bg-[#C96A2E] transition-all hover:shadow-lg">
              S'inscrire
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h4 className="text-xl font-['Lora'] font-bold mb-4 text-white">
              Sandal'Art
            </h4>
            <p className="text-[#F7F3F0]/80 leading-relaxed mb-4">
              Des sandales artisanales fabriquées avec passion et savoir-faire
              traditionnel.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E07B39] transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E07B39] transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-['Lora'] font-bold mb-4 text-white">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#collection"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="#artisan"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Notre Histoire
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Témoignages
                </a>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-lg font-['Lora'] font-bold mb-4 text-white">
              Informations
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Livraison
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Retours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  Entretien
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#F7F3F0]/80 hover:text-[#E07B39] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-['Lora'] font-bold mb-4 text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#F7F3F0]/80">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-center gap-3 text-[#F7F3F0]/80">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+261"
                  className="hover:text-[#E07B39] transition-colors"
                >
                  +261 XX XX XXX XX
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#F7F3F0]/80">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:contact@sandalart.mg"
                  className="hover:text-[#E07B39] transition-colors"
                >
                  contact@sandalart.mg
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D9C6B0]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F7F3F0]/70">
          <p>© {new Date().getFullYear()} Sandal'Art - Tous droits réservés</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E07B39] transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-[#E07B39] transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-[#E07B39] transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
