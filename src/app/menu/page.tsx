'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MenuPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        {/* Cherry blossom decoration */}
        <div className="absolute top-20 right-10 text-6xl opacity-20 animate-pulse-soft">
          <svg className="w-16 h-16 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-10 text-4xl opacity-15 animate-pulse-soft" style={{ animationDelay: '1s' }}>
          <svg className="w-12 h-12 text-accent/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>

        <div className="container-narrow relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-red mb-6 inline-block animate-pulse-soft">
              4.4/5 — Aïn Taya, Algiers
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-accent">KATANA</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-muted font-serif font-bold tracking-tight">
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
            className="text-base md:text-lg text-text-muted max-w-lg mx-auto mb-10 leading-relaxed font-light"
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
            <Link href="/" className="btn-primary">
              Accueil
            </Link>
            <a href="tel:+213783780716" className="btn-ghost">
              Commander
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-lg font-light">
              Chez KATANA BURGER, on ne fait pas que des burgers — on forge des expériences.
              Notre concept fusionne la street food avec l'esthétique japonaise :
              un mur Mount Fuji et cerisiers en fleurs, des chaises modernes rouges et grises,
              et un packaging kraft avec notre logo rouge — une katana tranchant un burger.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Esthétique Japonaise', desc: 'Mount Fuji, cerisiers, et ambiance zen' },
              { title: 'Burgers Signature', desc: 'Des burgers épais, juteux, et personnalisables' },
              { title: 'Rapide & Frais', desc: 'Préparé à la minute, servi avec le sourire' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="menu-card text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 text-accent">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm font-light">{item.desc}</p>
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
            {[
              { name: 'Beef Katana', price: '380 DA', desc: 'Build your perfect burger' },
              { name: 'Crusty Katana', price: '550 DA', desc: 'Crispy chicken perfection' },
              { name: 'Mini Box', price: '490 DA', desc: 'Burger + Fries + Drink' },
              { name: 'Full Box', price: '1,890 DA', desc: 'The ultimate feast' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
                }}
                className="menu-card text-center group cursor-pointer"
              >
<h3 className="text-lg font-serif font-bold mb-1 group-hover:text-accent transition-colors cursor-pointer" onClick={() => alert('Clicked: ' + item.name)}>{item.name}</h3>
<p className="text-text-muted text-sm mb-3 font-light">{item.desc}</p>
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
              Voir le Menu Complet
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
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horaires
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-text-muted font-light">Sam - Jeu</span>
                  <span className="font-medium">11:30 - 00:30</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-accent font-medium">Vendredi</span>
                  <span className="font-medium text-accent">17:30 - 01:00</span>
                </div>
              </div>
               <div className="mt-6 space-y-3">
                  <a href="tel:+213783780716" className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors font-light">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.1-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    07 83 78 07 16
                  </a>
                  <a href="mailto:katanaburgercontact@gmail.com" className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors font-light">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    katanaburgercontact@gmail.com
                  </a>
                  <p className="text-text-muted font-light flex items-center gap-3">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    26 Rue des Freres Sentouhi, Aïn Taya 16019
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-medium uppercase tracking-wider mb-4 text-text-muted">Suivez-nous</p>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com/katana.burger"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-pink-500 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="5"/>
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                      </svg>
                    </a>
                    <a
                      href="https://tiktok.com/@katana_burger"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-white transition-all duration-300"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.78V6.69h3.77z"/>
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/213783780716"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-green-500 transition-all duration-300"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
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
             <p className="text-text-muted max-w-xl mx-auto mb-8 text-lg font-light">
               Passez commander ou venez nous rendre visite. La faim n'a qu'à bien se tenir.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/menu" className="btn-primary">
                 Voir le Menu
               </Link>
               <a
                 href="https://instagram.com/katana.burger"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn-ghost"
               >
                 Suivez-nous
               </a>
             </div>
           </motion.div>
         </div>
       </section>
    </div>
  );
}