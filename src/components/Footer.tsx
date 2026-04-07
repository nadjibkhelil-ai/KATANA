import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary" role="contentinfo">
      <div className="container-narrow">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="text-2xl font-heading font-black tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center gap-2"
              >
                <span className="text-accent">⚔️</span>
                KATANA BURGER
              </Link>
              <p className="mt-4 text-text-muted text-sm leading-relaxed">
                La lame qui coupe la faim.
                <br />
                Fast food meets Japanese aesthetics.
              </p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-text-primary mb-4">
                Horaires
              </h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex justify-between">
                  <span>Sam - Jeu</span>
                  <span>11:30 - 00:30</span>
                </li>
                <li className="flex justify-between text-accent">
                  <span>Vendredi</span>
                  <span>17:30 - 01:00</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-text-primary mb-4">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:0783780716" className="text-text-muted hover:text-accent transition-colors flex items-center gap-2">
                    📞 07 83 78 07 16
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=26+Rue+des+Freres+Sentouhi+Ain+Taya+Algiers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors flex items-start gap-2"
                  >
                    📍 26 Rue des Freres Sentouhi, Aïn Taya
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/katanaburger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors flex items-center gap-2"
                  >
                    📸 Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@katanaburger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors flex items-center gap-2"
                  >
                    🎵 TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="section-divider mt-12 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-xs">
              &copy; {currentYear} KATANA BURGER. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span>⭐ 4.4/5 sur Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}