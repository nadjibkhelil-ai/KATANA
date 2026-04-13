'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'katana_admin_auth';
const AUTH_EXPIRY_KEY = 'katana_admin_auth_expiry';
const POLL_INTERVAL = 8000; // 8 seconds

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';

interface OrderItem {
  name: string;
  quantity: number;
  basePrice: number;
  extras?: { name: string; price: number; count: number }[];
  addons?: string[];
  sauces?: string[];
  notes?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  specialInstructions?: string;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; emoji: string; color: string; bg: string; border: string }> = {
  pending:   { label: 'En attente',  emoji: '🔵', color: 'text-blue-400',   bg: 'bg-blue-950/40',   border: 'border-blue-800/50' },
  confirmed: { label: 'Confirmé',    emoji: '🟢', color: 'text-green-400',  bg: 'bg-green-950/40',  border: 'border-green-800/50' },
  preparing: { label: 'En prépa',    emoji: '🟡', color: 'text-yellow-400', bg: 'bg-yellow-950/40', border: 'border-yellow-800/50' },
  delivered: { label: 'Livré',       emoji: '✅', color: 'text-gray-400',   bg: 'bg-gray-800/40',   border: 'border-gray-700/50' },
  cancelled: { label: 'Annulé',      emoji: '❌', color: 'text-red-400',    bg: 'bg-red-950/40',    border: 'border-red-800/50' },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return `Aujourd'hui ${formatTime(iso)}`;
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) + ' ' + formatTime(iso);
}

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const playBeep = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.01);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + duration);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.05);
    };
    playBeep(880, 0, 0.15);
    playBeep(1100, 0.2, 0.15);
    playBeep(880, 0.4, 0.15);
    playBeep(1100, 0.6, 0.25);
  } catch {
    // Audio not supported
  }
}

function flashScreen() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(59,130,246,0.15);z-index:9999;pointer-events:none;transition:opacity 0.3s';
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.style.opacity = '0'; }, 300);
  setTimeout(() => { document.body.removeChild(overlay); }, 700);
}

// ─── Order Card ────────────────────────────────────────────────────────────────
function OrderCard({ order, onStatusChange, updating }: {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  updating: boolean;
}) {
  const cfg = STATUS_CONFIG[order.status];
  const [expanded, setExpanded] = useState(order.status === 'pending');

  const itemTotal = (item: OrderItem) => {
    const extrasTotal = item.extras?.reduce((s, e) => s + e.price * e.count, 0) || 0;
    return (item.basePrice + extrasTotal) * item.quantity;
  };

  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} overflow-hidden transition-all duration-300`}>
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 font-mono">{order.orderNumber}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} bg-black/20`}>
                {cfg.emoji} {cfg.label}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg mt-1 truncate">{order.customerName}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <a href={`tel:${order.customerPhone}`} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors" onClick={e => e.stopPropagation()}>
                {order.customerPhone}
              </a>
            </div>
            {order.customerAddress && (
              <div className="flex items-start gap-1 mt-0.5">
                <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-gray-400 text-sm leading-tight">{order.customerAddress}</span>
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-yellow-400 font-bold text-xl">{order.totalPrice} DA</div>
            <div className="text-gray-500 text-xs mt-1">{formatDate(order.createdAt)}</div>
            <div className="text-gray-600 text-xs mt-0.5">{order.items.length} article{order.items.length > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-center mt-2">
          <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/5 px-4 pb-4">
          {/* Items List */}
          <div className="mt-3 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Commande</p>
            {order.items.map((item, i) => (
              <div key={i} className="bg-black/20 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-white font-semibold text-sm">
                      {item.quantity}× {item.name}
                    </span>
                    {item.extras && item.extras.length > 0 && (
                      <div className="mt-1">
                        {item.extras.map((e, j) => (
                          <p key={j} className="text-xs text-gray-400">+ {e.count}× {e.name}</p>
                        ))}
                      </div>
                    )}
                    {item.addons && item.addons.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">Add-ons: {item.addons.join(', ')}</p>
                    )}
                    {item.sauces && item.sauces.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">Sauces: {item.sauces.join(', ')}</p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-orange-400 mt-0.5">⚠️ {item.notes}</p>
                    )}
                  </div>
                  <span className="text-yellow-400 text-sm font-semibold ml-2">{itemTotal(item)} DA</span>
                </div>
              </div>
            ))}
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div className="mt-3 p-3 bg-orange-950/30 border border-orange-800/30 rounded-xl">
              <p className="text-xs font-semibold text-orange-400 mb-1">⚠️ Instructions spéciales</p>
              <p className="text-sm text-orange-300">{order.specialInstructions}</p>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
            <span className="text-gray-400 text-sm font-medium">Total</span>
            <span className="text-yellow-400 font-bold text-lg">{order.totalPrice} DA</span>
          </div>

          {/* Action Buttons */}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => onStatusChange(order.id, 'confirmed')}
                    disabled={updating}
                    className="col-span-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-base"
                  >
                    {updating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '✅'}
                    Confirmer la commande
                  </button>
                  <button
                    onClick={() => onStatusChange(order.id, 'cancelled')}
                    disabled={updating}
                    className="col-span-2 flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-900/50 active:scale-[0.98] text-red-400 font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm border border-red-900/30"
                  >
                    ❌ Annuler
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => onStatusChange(order.id, 'preparing')}
                    disabled={updating}
                    className="col-span-2 flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-base"
                  >
                    {updating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '🍳'}
                    En préparation
                  </button>
                  <button
                    onClick={() => onStatusChange(order.id, 'cancelled')}
                    disabled={updating}
                    className="col-span-2 flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-900/50 active:scale-[0.98] text-red-400 font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm border border-red-900/30"
                  >
                    ❌ Annuler
                  </button>
                </>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => onStatusChange(order.id, 'delivered')}
                  disabled={updating}
                  className="col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-base"
                >
                  {updating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '🚀'}
                  Marquer comme livré
                </button>
              )}
            </div>
          )}

          {/* Completed/Cancelled badge */}
          {(order.status === 'delivered' || order.status === 'cancelled') && (
            <div className={`mt-4 text-center py-3 rounded-xl text-sm font-semibold ${order.status === 'delivered' ? 'bg-gray-800/50 text-gray-400' : 'bg-red-950/30 text-red-400'}`}>
              {order.status === 'delivered' ? '✅ Commande livrée' : '❌ Commande annulée'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar({ orders }: { orders: Order[] }) {
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const pending = orders.filter(o => o.status === 'pending').length;
  const confirmed = orders.filter(o => o.status === 'confirmed' || o.status === 'preparing').length;
  const revenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + o.totalPrice, 0);

  const stats = [
    { label: "Aujourd'hui", value: todayOrders.length, icon: '📋', color: 'text-white' },
    { label: 'En attente', value: pending, icon: '🔵', color: 'text-blue-400' },
    { label: 'En cours', value: confirmed, icon: '🟢', color: 'text-green-400' },
    { label: 'Revenus', value: `${revenue} DA`, icon: '💰', color: 'text-yellow-400' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [lastFetch, setLastFetch] = useState<string>(new Date().toISOString());
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [connectionOk, setConnectionOk] = useState(true);
  const knownIds = useRef<Set<string>>(new Set());
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auth check
  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (auth !== 'true' || !expiry || Date.now() >= parseInt(expiry)) {
      router.replace('/admin');
    }
  }, [router]);

  // Load orders from localStorage backup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('katana_orders_backup');
      if (saved) {
        const parsed = JSON.parse(saved) as Order[];
        setOrders(parsed);
        parsed.forEach(o => knownIds.current.add(o.id));
      }
    } catch { /* ignore */ }
  }, []);

  const fetchOrders = useCallback(async (isPolling = false) => {
    try {
      const res = await fetch('/api/orders', { cache: 'no-store' });
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json() as { orders: Order[]; timestamp: string };

      setConnectionOk(true);

      // Detect new orders
      if (isPolling) {
        const newOnes = data.orders.filter(o => !knownIds.current.has(o.id));
        if (newOnes.length > 0) {
          setNewOrderCount(prev => prev + newOnes.length);
          playNotificationSound();
          flashScreen();
          // Update tab title
          document.title = `(${newOnes.length} nouvelle${newOnes.length > 1 ? 's' : ''}) KATANA Admin`;
          setTimeout(() => { document.title = 'KATANA Admin'; }, 5000);
        }
        newOnes.forEach(o => knownIds.current.add(o.id));
      } else {
        data.orders.forEach(o => knownIds.current.add(o.id));
      }

      setOrders(data.orders);
      setLastFetch(data.timestamp);

      // Backup to localStorage
      try {
        localStorage.setItem('katana_orders_backup', JSON.stringify(data.orders.slice(0, 100)));
      } catch { /* storage full */ }
    } catch {
      setConnectionOk(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchOrders(false);
  }, [fetchOrders]);

  // Polling
  useEffect(() => {
    pollRef.current = setInterval(() => fetchOrders(true), POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
      }
    } catch { /* ignore */ }
    setUpdatingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
    router.push('/admin');
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-tight">KATANA Admin</h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${connectionOk ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-xs text-gray-500">
                  {connectionOk ? `Mis à jour ${formatTime(lastFetch)}` : 'Hors ligne'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {newOrderCount > 0 && (
              <button
                onClick={() => setNewOrderCount(0)}
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse"
              >
                🔔 {newOrderCount} nouveau{newOrderCount > 1 ? 'x' : ''}
              </button>
            )}
            <button
              onClick={() => fetchOrders(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors active:scale-90"
              title="Actualiser"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors active:scale-90"
              title="Déconnexion"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-2xl mx-auto">
        {/* Stats */}
        <StatsBar orders={orders} />

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {([
            { key: 'all', label: 'Toutes', count: orders.length },
            { key: 'pending', label: '🔵 Attente', count: orders.filter(o => o.status === 'pending').length },
            { key: 'confirmed', label: '🟢 Confirmé', count: orders.filter(o => o.status === 'confirmed').length },
            { key: 'preparing', label: '🟡 Prépa', count: orders.filter(o => o.status === 'preparing').length },
            { key: 'delivered', label: '✅ Livré', count: orders.filter(o => o.status === 'delivered').length },
            { key: 'cancelled', label: '❌ Annulé', count: orders.filter(o => o.status === 'cancelled').length },
          ] as { key: OrderStatus | 'all'; label: string; count: number }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 border border-gray-800'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.key ? 'bg-white/20' : 'bg-gray-800'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pending Alert */}
        {pendingCount > 0 && filter !== 'pending' && (
          <button
            onClick={() => setFilter('pending')}
            className="w-full mb-4 flex items-center justify-between bg-blue-950/50 border border-blue-800/50 rounded-2xl p-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔔</span>
              <div className="text-left">
                <p className="text-blue-300 font-bold text-sm">{pendingCount} commande{pendingCount > 1 ? 's' : ''} en attente!</p>
                <p className="text-blue-500 text-xs">Appuyez pour voir</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Orders List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Chargement des commandes...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">
              {filter === 'all' ? '📭' : filter === 'pending' ? '✅' : '📋'}
            </div>
            <p className="text-gray-400 font-semibold">
              {filter === 'all' ? 'Aucune commande pour le moment' : `Aucune commande ${STATUS_CONFIG[filter as OrderStatus]?.label || ''}`}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {filter === 'all' ? 'Les nouvelles commandes apparaîtront ici automatiquement' : ''}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                updating={updatingId === order.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom safe area */}
      <div className="h-8" />
    </div>
  );
}
