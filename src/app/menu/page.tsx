'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'katana', label: '⚔️ Make Your Katana' },
  { id: 'classics', label: '🍔 Classiques' },
  { id: 'boxes', label: '📦 Boxes' },
  { id: 'sides', label: '🍟 Accompagnements' },
];

const sauces = ['Kitanaï Sauce', 'Mizo Mayo', 'Ketchup', 'Sauce Piquante', 'Sauce Fromagère'];

const addons = [
  { name: 'Gruyère', price: 100 },
  { name: 'Camembert', price: 100 },
  { name: 'Cheddar', price: 100 },
  { name: 'Oignons Caramélisés', price: 50 },
  { name: 'Oeuf', price: 50 },
  { name: 'Champignons', price: 100 },
];

const menuData = {
  katana: [
    {
      name: 'Beef Katana',
      emoji: '🍔',
      description: 'Construisez votre burger bœuf parfait. Choisissez vos add-ons et sauces.',
      basePrice: 380,
      extraLabel: '+150 DA par pièce de bœuf supplémentaire',
      extras: [{ name: 'Pièce de Bœuf', price: 150 }],
      note: 'Livré sans salade, sans tomate, sans sauces, sans slices, sans cornichon.',
    },
    {
      name: 'Crusty Katana',
      emoji: '🍗',
      description: 'Le burger poulet croustillant signature. Croustillant dehors, juteux dedans.',
      basePrice: 550,
      extraLabel: '+250 DA par pièce de poulet supplémentaire',
      extras: [{ name: 'Pièce de Poulet', price: 250 }],
      note: 'Livré sans salade, sans tomate, sans sauces, sans slices, sans cornichon.',
    },
  ],
  classics: [
    { name: 'Simple Poulet', emoji: '🍗', description: 'Burger poulet classique', basePrice: 200 },
    { name: 'Double Poulet', emoji: '🍗', description: 'Double portion de poulet', basePrice: 300 },
    { name: 'Simple Viande', emoji: '🍔', description: 'Burger viande classique', basePrice: 250 },
    { name: 'Double Viande', emoji: '🍔', description: 'Double portion de viande', basePrice: 400 },
  ],
  boxes: [
    {
      name: 'Mini Box',
      emoji: '📦',
      description: '1 Burger Bœuf (380 DA) + Frites (100 DA) + Boisson (100 DA)',
      basePrice: 490,
      highlight: true,
    },
    {
      name: 'Creamy Box',
      emoji: '🧀',
      description: '2 Burgers Bœuf (380 DA × 2) + Frites (150 DA) + Mac & Cheese (200 DA) + 2 Boissons (100 DA × 2)',
      basePrice: 1190,
    },
    {
      name: 'Duo Box',
      emoji: '👥',
      description: '2 Burgers Bœuf (380 DA × 2) + 2 Frites (100 DA × 2) + 2 Mac & Cheese (200 DA × 2) + 2 Boissons (100 DA × 2)',
      basePrice: 1390,
    },
    {
      name: 'Full Box',
      emoji: '🔥',
      description: '3 Burgers Bœuf (380 DA × 3) + 2 Frites (150 DA × 2) + 2 Mac & Cheese (200 DA × 2) + 3 Boissons (100 DA × 3)',
      basePrice: 1890,
      highlight: true,
    },
  ],
  sides: [
    { name: 'Mac & Cheese', emoji: '🧀', description: 'Macaroni au fromage crémeux', basePrice: 200 },
    { name: 'Frites (Petite)', emoji: '🍟', description: 'Frites croustillantes', basePrice: 100 },
    { name: 'Frites (Grande)', emoji: '🍟', description: 'Grande portion de frites', basePrice: 150 },
    { name: 'Chicken Bites', emoji: '🍗', description: 'Bouchées de poulet croustillantes', basePrice: 250 },
  ],
};

function MenuItem({ item, isKatana }: { item: typeof menuData.katana[number]; isKatana?: boolean }) {
  const [extraCount, setExtraCount] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);

  const extraItem = isKatana ? item.extras?.[0] : null;
  const extrasPrice = extraItem ? extraItem.price * extraCount : 0;
  const addonsPrice = selectedAddons.reduce((sum, name) => {
    const addon = addons.find(a => a.name === name);
    return sum + (addon?.price || 0);
  }, 0);

  const totalPrice = item.basePrice + extrasPrice + addonsPrice;

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const toggleSauce = (name: string) => {
    if (selectedSauces.includes(name)) {
      setSelectedSauces(prev => prev.filter(s => s !== name));
    } else if (selectedSauces.length < 2) {
      setSelectedSauces(prev => [...prev, name]);
    }
  };

  return (
    <div className="menu-card">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{item.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-heading font-bold">{item.name}</h3>
            <span className="price">{totalPrice} DA</span>
          </div>
          <p className="text-text-muted text-sm mt-1">{item.description}</p>
        </div>
      </div>

      {/* Extra pieces (for Katana items) */}
      {isKatana && extraItem && (
        <div className="mb-4 p-3 bg-bg-elevated rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Pièces supplémentaires</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExtraCount(Math.max(0, extraCount - 1))}
                className="w-8 h-8 rounded-full bg-bg-secondary border border-border text-text-primary hover:border-accent transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="font-bold w-6 text-center">{extraCount}</span>
              <button
                onClick={() => setExtraCount(extraCount + 1)}
                className="w-8 h-8 rounded-full bg-bg-secondary border border-border text-text-primary hover:border-accent transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          {extraCount > 0 && (
            <p className="text-xs text-accent mt-2">
              +{extrasPrice} DA ({extraCount} × {extraItem.price} DA)
            </p>
          )}
          <p className="text-xs text-text-muted mt-1">{item.extraLabel}</p>
        </div>
      )}

      {/* Add-ons */}
      <div className="mb-4">
        <p className="text-sm font-bold mb-2">Add-ons:</p>
        <div className="flex flex-wrap gap-2">
          {addons.map((addon) => (
            <button
              key={addon.name}
              onClick={() => toggleAddon(addon.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedAddons.includes(addon.name)
                  ? 'bg-accent text-white'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary'
              }`}
            >
              {addon.name} +{addon.price} DA
            </button>
          ))}
        </div>
      </div>

      {/* Sauces (for Katana items) */}
      {isKatana && (
        <div className="mb-4">
          <p className="text-sm font-bold mb-2">Sauces gratuites (choisissez 2):</p>
          <div className="flex flex-wrap gap-2">
            {sauces.map((sauce) => (
              <button
                key={sauce}
                onClick={() => toggleSauce(sauce)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedSauces.includes(sauce)
                    ? 'bg-accent text-white'
                    : 'bg-bg-elevated text-text-muted hover:text-text-primary'
                }`}
              >
                {sauce}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-2">
            {selectedSauces.length}/2 sélectionnées
          </p>
        </div>
      )}

      {/* Note */}
      {item.note && (
        <p className="text-xs text-text-muted italic p-3 bg-bg-elevated/50 rounded-lg">
          📋 {item.note}
        </p>
      )}
    </div>
  );
}

function ClassicItem({ item }: { item: typeof menuData.classics[number] }) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsWithCornichons = [...addons, { name: 'Cornichons', price: 50 }];
  const addonsPrice = selectedAddons.reduce((sum, name) => {
    const addon = addonsWithCornichons.find(a => a.name === name);
    return sum + (addon?.price || 0);
  }, 0);

  const totalPrice = item.basePrice + addonsPrice;

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  return (
    <div className="menu-card">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{item.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-heading font-bold">{item.name}</h3>
            <span className="price">{totalPrice} DA</span>
          </div>
          <p className="text-text-muted text-sm mt-1">{item.description}</p>
        </div>
      </div>

      {/* Add-ons */}
      <div className="mb-4">
        <p className="text-sm font-bold mb-2">Add-ons:</p>
        <div className="flex flex-wrap gap-2">
          {addonsWithCornichons.map((addon) => (
            <button
              key={addon.name}
              onClick={() => toggleAddon(addon.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedAddons.includes(addon.name)
                  ? 'bg-accent text-white'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary'
              }`}
            >
              {addon.name} +{addon.price} DA
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-muted italic p-3 bg-bg-elevated/50 rounded-lg">
        📋 Livré sans salade, sans tomate, sans sauces, sans frites, sans fromage.
      </p>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('katana');

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge badge-red mb-4 inline-block">Menu</span>
          <h1 className="section-title mb-4">
            Notre <span className="text-accent">Menu</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            Construisez votre katana ou choisissez nos classiques. Chaque burger est préparé à la minute.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="sticky top-16 md:top-20 z-30 bg-bg-primary/90 backdrop-blur-md py-4 -mx-4 px-4 mb-8 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-accent text-white'
                    : 'bg-bg-elevated text-text-muted hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeCategory === 'katana' &&
              menuData.katana.map((item) => (
                <MenuItem key={item.name} item={item} isKatana />
              ))}

            {activeCategory === 'classics' &&
              menuData.classics.map((item) => (
                <ClassicItem key={item.name} item={item} />
              ))}

            {activeCategory === 'boxes' &&
              menuData.boxes.map((item) => (
                <div key={item.name} className={`menu-card ${item.highlight ? 'border-accent/50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-heading font-bold">{item.name}</h3>
                        <span className="price">{item.basePrice} DA</span>
                      </div>
                      <p className="text-text-muted text-sm mt-2">{item.description}</p>
                      {item.highlight && (
                        <span className="badge badge-red mt-3 inline-block">POPULAIRE</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {activeCategory === 'sides' &&
              menuData.sides.map((item) => (
                <div key={item.name} className="menu-card">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-heading font-bold">{item.name}</h3>
                        <span className="price">{item.basePrice} DA</span>
                      </div>
                      <p className="text-text-muted text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-text-muted mb-6">
            Envie de commander ?
          </p>
          <a href="tel:0783780716" className="btn-primary">
            📞 Appelez maintenant — 07 83 78 07 16
          </a>
        </motion.div>
      </div>
    </div>
  );
}