'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from '@/components/CartSidebar';

const categories = [
  { id: 'katana', label: 'Make Your Katana' },
  { id: 'classics', label: 'Classiques' },
  { id: 'boxes', label: 'Boxes' },
  { id: 'sides', label: 'Accompagnements' },
  { id: 'drinks', label: 'Boissons' },
];

const sauces = ['Kitanaï Sauce', 'Mizo Mayo', 'Ketchup', 'Sauce Piquante', 'Sauce Fromagère'];

const addonPrices: Record<string, number> = {
  'Gruyère': 100, 'Camembert': 100, 'Cheddar': 100,
  'Oignons Caramélisés': 50, 'Oeuf': 50, 'Champignons': 100, 'Cornichons': 50
};

const menuData = {
  katana: [
    {
      name: 'Beef Katana',
      description: 'Construisez votre burger bœuf parfait. Choisissez vos add-ons et sauces.',
      basePrice: 380,
      extraLabel: '+150 DA par pièce de bœuf supplémentaire',
      extras: [{ name: 'Pièce de Bœuf', price: 150 }],
      image: '/images/products/beef-katana.jpg',
      icon: 'burger-beef',
    },
    {
      name: 'Crusty Katana',
      description: 'Le burger poulet croustillant signature. Croustillant dehors, juteux dedans.',
      basePrice: 550,
      extraLabel: '+250 DA par pièce de poulet supplémentaire',
      extras: [{ name: 'Pièce de Poulet', price: 250 }],
      image: '/images/products/crusty-katana.jpg',
      icon: 'burger-chicken',
    },
  ],
  classics: [
    { name: 'Simple Poulet', description: 'Burger poulet classique', basePrice: 200, image: '/images/products/simple-poulet.jpg', icon: 'burger-chicken' },
    { name: 'Double Poulet', description: 'Double portion de poulet', basePrice: 300, image: '/images/products/double-poulet.jpg', icon: 'burger-chicken' },
    { name: 'Simple Viande', description: 'Burger viande classique', basePrice: 250, image: '/images/products/simple-viande.jpg', icon: 'burger-beef' },
    { name: 'Double Viande', description: 'Double portion de viande', basePrice: 400, image: '/images/products/double-viande.jpg', icon: 'burger-beef' },
  ],
  boxes: [
    {
      name: 'Mini Box',
      description: '1 Burger Bœuf (380 DA) + Frites (100 DA) + Boisson (100 DA)',
      basePrice: 490,
      highlight: true,
      image: '/images/products/mini-box.jpg',
      icon: 'box',
    },
    {
      name: 'Creamy Box',
      description: '2 Burgers Bœuf + Frites + Mac & Cheese + 2 Boissons',
      basePrice: 1190,
      image: '/images/products/creamy-box.jpg',
      icon: 'box',
    },
    {
      name: 'Duo Box',
      description: '2 Burgers Bœuf + 2 Frites + 2 Mac & Cheese + 2 Boissons',
      basePrice: 1390,
      image: '/images/products/duo-box.jpg',
      icon: 'box',
    },
    {
      name: 'Full Box',
      description: '3 Burgers Bœuf + 2 Frites + 2 Mac & Cheese + 3 Boissons',
      basePrice: 1890,
      highlight: true,
      image: '/images/products/full-box.jpg',
      icon: 'box',
    },
  ],
  sides: [
    { name: 'Mac & Cheese', description: 'Macaroni au fromage crémeux', basePrice: 200, image: '/images/products/mac-cheese.jpg', icon: 'cheese' },
    { name: 'Frites (Petite)', description: 'Frites croustillantes', basePrice: 100, image: '/images/products/frites-petite.jpg', icon: 'fries' },
    { name: 'Frites (Grande)', description: 'Grande portion de frites', basePrice: 150, image: '/images/products/frites-grande.jpg', icon: 'fries' },
    { name: 'Chicken Bites', description: 'Bouchées de poulet croustillantes', basePrice: 250, image: '/images/products/chicken-bites.jpg', icon: 'chicken' },
  ],
  drinks: [
    { name: 'Canette', description: 'Coca-Cola, Fanta, Sprite, Orangina', basePrice: 100, image: '/images/products/canette.jpg', icon: 'can' },
    { name: 'Bouteille Coca-Cola', description: 'Coca-Cola bouteille 33cl', basePrice: 70, image: '/images/products/coca-bouteille.jpg', icon: 'bottle' },
  ],
};

// SVG Icon components for products
function ProductIcon({ type, className = "w-12 h-12" }: { type: string; className?: string }) {
  const iconPaths: Record<string, JSX.Element> = {
    'burger-beef': (
      <>
        <path d="M4 10h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2z" />
        <path d="M3 10v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4" />
        <path d="M5 16h14c.6 0 1 .4 1 1v1c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3v-1c0-.6.4-1 1-1z" />
        <path d="M6 12h12" strokeDasharray="2 2" />
      </>
    ),
    'burger-chicken': (
      <>
        <path d="M4 10h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2z" />
        <path d="M3 10v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4" />
        <path d="M5 16h14c.6 0 1 .4 1 1v1c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3v-1c0-.6.4-1 1-1z" />
      </>
    ),
    'box': (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
      </>
    ),
    'cheese': (
      <>
        <path d="M4 16l8-12 8 12H4z" />
        <circle cx="9" cy="13" r="1.5" />
        <circle cx="14" cy="11" r="1" />
        <circle cx="11" cy="15" r="1" />
      </>
    ),
    'fries': (
      <>
        <path d="M6 18h12l-2-14H8L6 18z" />
        <path d="M9 4v6" />
        <path d="M12 4v6" />
        <path d="M15 4v6" />
      </>
    ),
    'chicken': (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M10 10c0-1.1.9-2 2-2s2 .9 2 2" />
        <circle cx="9" cy="14" r="1" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" />
      </>
    ),
    'can': (
      <>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M6 8h12" />
        <path d="M6 16h12" />
        <path d="M10 4v16" />
      </>
    ),
    'bottle': (
      <>
        <path d="M9 2h6v4l2 4v10a2 2 0 01-2 2H9a2 2 0 01-2-2V10l2-4V2z" />
        <path d="M9 6h6" />
        <path d="M7 12h10" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[type] || iconPaths['burger-beef']}
    </svg>
  );
}

// Product image component with hover zoom effect
function ProductImage({ src, alt, icon }: { src: string; alt: string; icon: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="product-image-placeholder">
        <ProductIcon type={icon} className="w-12 h-12 text-text-muted/30" />
      </div>
    );
  }

  return (
    <div className="product-image-wrapper">
      <img
        src={src}
        alt={alt}
        className="product-image"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}

function KatanaMenuItem({ item }: { item: typeof menuData.katana[number] }) {
  const { addItem } = useCart();
  const [extraCount, setExtraCount] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [showConditions, setShowConditions] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);

  const extraItem = item.extras?.[0];
  const extrasPrice = extraItem ? extraItem.price * extraCount : 0;
  const addonsPrice = selectedAddons.reduce((sum, name) => sum + (addonPrices[name] || 0), 0);
  const totalPrice = item.basePrice + extrasPrice + addonsPrice;

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const toggleSauce = (name: string) => {
    if (selectedSauces.includes(name)) {
      setSelectedSauces(prev => prev.filter(s => s !== name));
    } else if (selectedSauces.length < 2) {
      setSelectedSauces(prev => [...prev, name]);
    }
  };

  const toggleCondition = (name: string) => {
    setConditions(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const handleAddToCart = () => {
    const extras = extraCount > 0 ? [{ name: extraItem!.name, price: extraItem!.price, count: extraCount }] : undefined;
    const notes = conditions.length > 0 ? `Sans: ${conditions.join(', ')}` : undefined;
    addItem({
      name: item.name,
      icon: item.icon,
      basePrice: item.basePrice,
      extras,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
      sauces: selectedSauces.length > 0 ? selectedSauces : undefined,
      notes,
      image: item.image,
    });
    setExtraCount(0);
    setSelectedAddons([]);
    setSelectedSauces([]);
    setConditions([]);
    setShowConditions(false);
  };

  return (
    <div className="menu-card">
      {/* Product Image */}
      <ProductImage src={item.image} alt={item.name} icon={item.icon} />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
            <span className="price">{totalPrice} DA</span>
          </div>
          <p className="text-text-muted text-sm mt-2 font-light">{item.description}</p>
        </div>
      </div>

      {/* Extra pieces */}
      <div className="mb-6 p-4 bg-bg-elevated rounded-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted font-light">Pièces supplémentaires</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setExtraCount(Math.max(0, extraCount - 1))}
              className="w-8 h-8 rounded-sm bg-bg-secondary border border-border text-text-primary hover:border-accent transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="font-medium w-6 text-center">{extraCount}</span>
            <button
              onClick={() => setExtraCount(extraCount + 1)}
              className="w-8 h-8 rounded-sm bg-bg-secondary border border-border text-text-primary hover:border-accent transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
        {extraCount > 0 && (
          <p className="text-xs text-accent mt-2">
            +{extrasPrice} DA ({extraCount} × {extraItem!.price} DA)
          </p>
        )}
        <p className="text-xs text-text-muted mt-2 font-light">{item.extraLabel}</p>
      </div>

      {/* Add-ons */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 uppercase tracking-wider text-text-muted">Add-ons</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(addonPrices).filter(([name]) => name !== 'Cornichons').map(([name, price]) => (
            <button
              key={name}
              onClick={() => toggleAddon(name)}
              className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                selectedAddons.includes(name)
                  ? 'bg-accent text-white'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary'
              }`}
            >
              {name} +{price} DA
            </button>
          ))}
        </div>
      </div>

      {/* Sauces */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 uppercase tracking-wider text-text-muted">Sauces gratuites (2 au choix)</p>
        <div className="flex flex-wrap gap-2">
          {sauces.map((sauce) => (
            <button
              key={sauce}
              onClick={() => toggleSauce(sauce)}
              className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                selectedSauces.includes(sauce)
                  ? 'bg-accent text-white'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary'
              }`}
            >
              {sauce}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-2 font-light">
          {selectedSauces.length}/2 sélectionnées
        </p>
      </div>

      {/* Conditions */}
      <div className="mb-6">
        <button
          onClick={() => setShowConditions(!showConditions)}
          className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-wider"
        >
          <svg className={`w-4 h-4 transition-transform ${showConditions ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Conditions spéciales
        </button>
        <AnimatePresence>
          {showConditions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3">
                {['Sans salade', 'Sans tomate', 'Sans sauces', 'Sans slices', 'Sans cornichon'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => toggleCondition(cond)}
                    className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                      conditions.includes(cond)
                        ? 'bg-accent/20 text-accent border border-accent'
                        : 'bg-bg-elevated text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full btn-primary text-sm"
      >
        Ajouter au panier — {totalPrice} DA
      </button>
    </div>
  );
}

function ClassicMenuItem({ item }: { item: typeof menuData.classics[number] }) {
  const { addItem } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showConditions, setShowConditions] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);

  const allAddons = [...Object.entries(addonPrices).map(([name, price]) => ({ name, price }))];
  const addonsPrice = selectedAddons.reduce((sum, name) => sum + (addonPrices[name] || 0), 0);
  const totalPrice = item.basePrice + addonsPrice;

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const toggleCondition = (name: string) => {
    setConditions(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const handleAddToCart = () => {
    const notes = conditions.length > 0 ? `Sans: ${conditions.join(', ')}` : undefined;
    addItem({
      name: item.name,
      icon: item.icon,
      basePrice: item.basePrice,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
      notes,
      image: item.image,
    });
    setSelectedAddons([]);
    setConditions([]);
    setShowConditions(false);
  };

  return (
    <div className="menu-card">
      {/* Product Image */}
      <ProductImage src={item.image} alt={item.name} icon={item.icon} />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
            <span className="price">{totalPrice} DA</span>
          </div>
          <p className="text-text-muted text-sm mt-2 font-light">{item.description}</p>
        </div>
      </div>

      {/* Add-ons */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 uppercase tracking-wider text-text-muted">Add-ons</p>
        <div className="flex flex-wrap gap-2">
          {allAddons.map(({ name, price }) => (
            <button
              key={name}
              onClick={() => toggleAddon(name)}
              className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                selectedAddons.includes(name)
                  ? 'bg-accent text-white'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary'
              }`}
            >
              {name} +{price} DA
            </button>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="mb-6">
        <button
          onClick={() => setShowConditions(!showConditions)}
          className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-wider"
        >
          <svg className={`w-4 h-4 transition-transform ${showConditions ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Conditions spéciales
        </button>
        <AnimatePresence>
          {showConditions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3">
                {['Sans salade', 'Sans tomate', 'Sans sauces', 'Sans frites', 'Sans fromage'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => toggleCondition(cond)}
                    className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                      conditions.includes(cond)
                        ? 'bg-accent/20 text-accent border border-accent'
                        : 'bg-bg-elevated text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full btn-primary text-sm"
      >
        Ajouter au panier — {totalPrice} DA
      </button>
    </div>
  );
}

function SimpleMenuItem({ item }: { item: typeof menuData.boxes[number] }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      name: item.name,
      icon: item.icon || 'box',
      basePrice: item.basePrice,
      image: item.image,
    });
  };

  return (
    <div className={`menu-card ${'highlight' in item && item.highlight ? 'border-accent/30' : ''}`}>
      {/* Product Image */}
      <ProductImage src={item.image} alt={item.name} icon={item.icon || 'box'} />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
            <span className="price">{item.basePrice} DA</span>
          </div>
          <p className="text-text-muted text-sm mt-2 font-light">{item.description}</p>
          {'highlight' in item && item.highlight && (
            <span className="badge badge-red mt-4 inline-block">Populaire</span>
          )}
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full btn-primary text-sm"
      >
        Ajouter au panier — {item.basePrice} DA
      </button>
    </div>
  );
}

function ShareButton() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://katanaburger.com/menu';
  const shareText = 'Découvrez le menu de KATANA BURGER';

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'instagram':
        navigator.clipboard?.writeText(shareUrl);
        break;
      case 'copy':
        navigator.clipboard?.writeText(shareUrl);
        break;
    }
    if (url) window.open(url, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-6 py-3 bg-bg-elevated border border-border rounded-sm text-sm text-text-muted hover:text-accent hover:border-accent transition-all uppercase tracking-wider font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Partager
      </button>
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-56 bg-bg-elevated border border-border rounded-sm shadow-xl overflow-hidden z-20"
          >
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-text-muted hover:bg-bg-secondary hover:text-green-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('instagram')}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-text-muted hover:bg-bg-secondary hover:text-pink-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              Instagram (lien copié)
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-text-muted hover:bg-bg-secondary hover:text-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              Copier le lien
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('katana');

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-red mb-6 inline-block">Menu</span>
          <h1 className="section-title mb-6">
            Notre <span className="text-accent">Menu</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto font-light">
            Construisez votre katana ou choisissez nos classiques. Chaque burger est préparé à la minute.
          </p>
          {/* Share Button */}
          <div className="flex justify-center mt-8">
            <ShareButton />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="sticky top-20 md:top-24 z-30 bg-bg-primary/95 backdrop-blur-md py-4 -mx-4 px-4 mb-10 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-sm text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
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
                <KatanaMenuItem key={item.name} item={item} />
              ))}

            {activeCategory === 'classics' &&
              menuData.classics.map((item) => (
                <ClassicMenuItem key={item.name} item={item} />
              ))}

            {activeCategory === 'boxes' &&
              menuData.boxes.map((item) => (
                <SimpleMenuItem key={item.name} item={item} />
              ))}

            {activeCategory === 'sides' &&
              menuData.sides.map((item) => (
                <SimpleMenuItem key={item.name} item={item} />
              ))}

            {activeCategory === 'drinks' &&
              menuData.drinks.map((item) => (
                <SimpleMenuItem key={item.name} item={item} />
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div
          className="mt-20 p-10 bg-bg-secondary border border-border rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-bold text-center mb-8">
            Contactez-nous / <span className="text-accent">Commandez</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/213783780716"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-bg-elevated rounded-sm border border-border hover:border-green-500/50 transition-all group"
            >
              <svg className="w-8 h-8 text-green-500 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider text-center">WhatsApp</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+213783780716"
              className="flex flex-col items-center gap-4 p-8 bg-bg-elevated rounded-sm border border-border hover:border-accent/50 transition-all group"
            >
              <svg className="w-8 h-8 text-accent group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider text-center">Appeler</span>
            </a>

            {/* Google Maps */}
            <a
              href="https://maps.google.com/?q=26+Rue+des+Freres+Sentouhi+Ain+Taya+Algiers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-bg-elevated rounded-sm border border-border hover:border-blue-500/50 transition-all group"
            >
              <svg className="w-8 h-8 text-blue-500 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider text-center">Itinéraire</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/katana.burger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-bg-elevated rounded-sm border border-border hover:border-pink-500/50 transition-all group"
            >
              <svg className="w-8 h-8 text-pink-500 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider text-center">Instagram</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
}