'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredItems = [
  { emoji: '🍔', name: 'Beef Katana', price: '380 DA', desc: 'Build your perfect burger' },
  { emoji: '🍗', name: 'Crusty Katana', price: '550 DA', desc: 'Crispy chicken perfection' },
  { emoji: '📦', name: 'Mini Box', price: '490 DA', desc: 'Burger + Fries + Drink' },
  { emoji: '🔥', name: 'Full Box', price: '1,890 DA', desc: 'The ultimate feast' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        {/* Cherry blossom decoration */}
        <div className="absolute top-20 right-10 text-6xl opacity-20 animate-pulse-soft">🌸</div>
        <div className="absolute bottom-32 left-10 text-4xl opacity-15 animate-pulse-soft" style={{ animationDelay: '1s' }}>🌸</div>

        <div className="container-narrow relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-red mb-6 inline-block animate-pulse-soft">
              ⭐ 4.4/5 — Aïn Taya, Algiers
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.9] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-accent">⚔️</span> KATANA
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-muted font-heading font-bold tracking-tight">
              BURGER
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-muted max-w-xl mx-auto mb-4 font-light italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            "La lame qui coupe la faim"
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-text-muted max-w-lg mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Fast food meets Japanese aesthetics. Signature burgers, boxes, and more.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/menu" className="btn-primary">
              🍔 Voir le Menu
            </Link>
            <a href="tel:0783780716" className="btn-ghost">
              📞 Commander
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-bg-secondary">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-muted mb-4 inline-block">Notre Concept</span>
            <h2 className="section-title mb-6">
              Le Goût du <span className="text-accent">Japon</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-lg">
              Chez KATANA BURGER, on ne fait pas que des burgers — on forge des expériences.
              Notre concept fusionne la street food avec l'esthétique japonaise :
              un mur Mount Fuji et cerisiers en fleurs, des chaises modernes rouges et grises,
              et un packaging kraft avec notre logo rouge — une katana tranchant un burger.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '🗻', title: 'Esthétique Japonaise', desc: 'Mount Fuji, cerisiers, et ambiance zen' },
              { emoji: '🍔', title: 'Burgers Signature', desc: 'Des burgers épais, juteux, et personnalisables' },
              { emoji: '⚡', title: 'Rapide & Frais', desc: 'Préparé à la minute, servi avec le sourire' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="menu-card text-center"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Featured Menu Items */}
      <section className="py-24 md:py-32">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-muted mb-4 inline-block">Populaire</span>
            <h2 className="section-title mb-6">Nos Incontournables</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredItems.map((item, i) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="menu-card text-center group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <h3 className="text-lg font-heading font-bold mb-1 group-hover:text-accent transition-colors">{item.name}</h3>
                <p className="text-text-muted text-sm mb-3">{item.desc}</p>
                <span className="price">{item.price}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/menu" className="btn-ghost">
              Voir le Menu Complet →
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Info Section */}
      <section id="contact" className="py-24 md:py-32 bg-bg-secondary">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge badge-muted mb-4 inline-block">Infos</span>
            <h2 className="section-title mb-6">Nous Trouver</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hours & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="menu-card"
            >
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                🕐 Horaires
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-text-muted">Sam - Jeu</span>
                  <span className="font-bold">11:30 - 00:30</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-accent font-bold">Vendredi</span>
                  <span className="font-bold text-accent">17:30 - 01:00</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <a href="tel:0783780716" className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors">
                  📞 07 83 78 07 16
                </a>
                <p className="text-text-muted">
                  📍 26 Rue des Freres Sentouhi, Aïn Taya 16019
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="menu-card p-0 overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d3.28!3d36.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ2JzEyLjAiTiAzwrAxNic0OC4wIkU!5e0!3m2!1sfr!2sdz!4v1"
                width="100%"
                height="100%"
                style={{ minHeight: '300px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KATANA BURGER Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-4">
              Prêt à <span className="text-accent">Trancher</span> ?
            </h2>
            <p className="text-text-muted max-w-xl mx-auto mb-8 text-lg">
              Passez commander ou venez nous rendre visite. La faim n'a qu'à bien se tenir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="btn-primary">
                🍔 Voir le Menu
              </Link>
              <a
                href="https://instagram.com/katanaburger"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                📸 Suivez-nous
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}