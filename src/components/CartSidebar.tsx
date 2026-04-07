'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function CartSidebar() {
  const { items, totalPrice, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleWhatsAppOrder = () => {
    if (!customerName || !customerPhone) return;

    let message = `*Nouvelle Commande - KATANA BURGER*\n\n`;
    message += `*Client:* ${customerName}\n`;
    message += `*Téléphone:* ${customerPhone}\n`;
    if (customerAddress) message += `*Adresse:* ${customerAddress}\n`;
    message += `\n*Commande:*\n`;

    items.forEach((item) => {
      message += `\n• ${item.name} - ${item.basePrice} DA`;
      if (item.extras && item.extras.length > 0) {
        item.extras.forEach((extra) => {
          message += `\n  + ${extra.count}x ${extra.name} (+${extra.price * extra.count} DA)`;
        });
      }
      if (item.addons && item.addons.length > 0) {
        message += `\n  Add-ons: ${item.addons.join(', ')}`;
      }
      if (item.sauces && item.sauces.length > 0) {
        message += `\n  Sauces: ${item.sauces.join(', ')}`;
      }
      if (item.notes) {
        message += `\n  Notes: ${item.notes}`;
      }
    });

    message += `\n\n*Total: ${totalPrice} DA*`;
    if (specialInstructions) {
      message += `\n\n*Instructions spéciales:* ${specialInstructions}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/213783780716?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-bg-secondary border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-serif font-bold uppercase tracking-wider">Votre Panier</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-text-muted hover:text-accent transition-colors"
                aria-label="Fermer le panier"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-text-muted/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-text-muted font-light">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 bg-bg-elevated rounded-sm border border-border">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-gold text-sm mt-1">{item.basePrice} DA</p>
                          {item.extras && item.extras.length > 0 && (
                            <div className="mt-2">
                              {item.extras.map((extra, i) => (
                                <p key={i} className="text-xs text-text-muted">
                                  +{extra.count}x {extra.name} (+{extra.price * extra.count} DA)
                                </p>
                              ))}
                            </div>
                          )}
                          {item.addons && item.addons.length > 0 && (
                            <p className="text-xs text-text-muted mt-1">
                              Add-ons: {item.addons.join(', ')}
                            </p>
                          )}
                          {item.sauces && item.sauces.length > 0 && (
                            <p className="text-xs text-text-muted mt-1">
                              Sauces: {item.sauces.join(', ')}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-accent mt-1">{item.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-7 h-7 rounded-sm bg-bg-secondary border border-border text-text-muted hover:border-accent transition-colors flex items-center justify-center text-sm"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-sm bg-bg-secondary border border-border text-text-muted hover:border-accent transition-colors flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-3 text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium uppercase tracking-wider text-text-muted">Total</span>
                  <span className="text-2xl font-serif font-bold text-gold">{totalPrice} DA</span>
                </div>

                {!showOrderForm ? (
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full btn-primary text-sm"
                  >
                    Passer la commande
                  </button>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Votre nom *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-sm text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-sm text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Adresse de livraison"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-sm text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    <textarea
                      placeholder="Instructions spéciales"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-sm text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <button
                      onClick={handleWhatsAppOrder}
                      disabled={!customerName || !customerPhone}
                      className="w-full btn-primary text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Commander via WhatsApp
                    </button>
                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="w-full text-xs text-text-muted hover:text-accent transition-colors py-2"
                    >
                      Retour au panier
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}