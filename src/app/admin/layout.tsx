import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KATANA Admin — Gestion des commandes',
  description: 'Panneau d\'administration KATANA BURGER',
  robots: { index: false, follow: false },
};

// Admin layout — no header/footer/cart from main layout
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell" style={{ isolation: 'isolate' }}>
      {children}
    </div>
  );
}
