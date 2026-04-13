# Project Blueprint: KATANA BURGER

## 1. Project Identity

**Name:** KATANA BURGER  
**Slogan:** *La lame qui coupe la faim*  
**Location:** 26 Rue des Freres Sentouhi, Aïn Taya 16019, Algiers  
**Target Audience:** Local residents, beach tourists, young demographic (16-35)  
**Primary Language:** French  
**Tone:** Sharp, modern, humorous, youthful, premium street food vibe  
**Key Brand Values:** Quality, speed, personality, fusion culture

---

## 2. Tech Stack

| Technology | Version | Purpose | Rationale |
|---|---|---|---|
| Next.js 14 | ^14.0.0 | Full Stack Framework | App Router, Server Components, optimal performance |
| TypeScript | ^5.0.0 | Type Safety | Catch errors at compile time, better code quality |
| Tailwind CSS | ^3.3.0 | Styling | Rapid UI development, consistent design system |
| Prisma | ^5.0.0 | ORM | Type-safe database queries, migrations |
| PostgreSQL | 15 | Database | Production grade relational database |
| NextAuth.js | ^5.0.0-beta | Authentication | Secure admin authentication |
| Supabase | - | Database Hosting | Free tier available, managed PostgreSQL |
| Vercel | - | Deployment | Optimized for Next.js, zero config deployments |

---

## 3. Information Architecture

### Public Pages
| Path | Purpose |
|---|---|
| `/` | Landing page with hero, menu preview, about, contact |
| `/menu` | Complete interactive menu with ordering system |
| `/contact` | Contact information, map, opening hours |

### Admin Pages
| Path | Purpose |
|---|---|
| `/admin/login` | Admin authentication page |
| `/admin/dashboard` | Main orders management dashboard |
| `/admin/orders/[id]` | Individual order details |

### API Routes
| Method | Path | Purpose |
|---|---|---|
| POST | `/api/orders` | Create new customer order |
| GET | `/api/orders` | Get all orders (admin only) |
| PATCH | `/api/orders/[id]` | Update order status |
| DELETE | `/api/orders/[id]` | Delete order |

---

## 4. Design System

### Color Palette
| Role | Hex | CSS Variable |
|---|---|---|
| Base Black | `#050505` | `--color-black` |
| Deep Charcoal | `#0A0A0A` | `--color-charcoal` |
| Surface Card | `#111111` | `--color-surface` |
| Elevated Surface | `#1A1A1A` | `--color-elevated` |
| Border / Divider | `#2A2A2A` | `--color-border` |
| Katana Red | `#D32F2F` | `--color-primary` |
| Off White Text | `#F5F5F5` | `--color-text` |
| Muted Grey | `#A0A0A0` | `--color-muted` |

### Typography
- **Headings:** Inter Black / 900, uppercase, tight tracking
- **Body:** Inter 400-600, comfortable line height
- **Prices:** Inter Black, Katana Red accent

### Animation Guidelines
- Scroll reveal: fade up 20px, 600ms duration
- Hover transitions: 300ms ease
- Staggered entrance: 100ms delay between items
- Button scale: 1.03x on hover

---

## 5. Database Schema

### Order Model
```prisma
model Order {
  id          String   @id @default(cuid())
  orderNumber Int      @unique @default(autoincrement())
  customerName String
  phone       String
  address     String?
  notes       String?
  items       Json
  total       Int
  status      String   @default("NEW")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Admin User Model
```prisma
model User {
  id       String @id @default(cuid())
  email    String @unique
  password String
  role     String @default("ADMIN")
}
```

---

## 6. Features Implementation Plan

### ✅ Public Website Features
- [ ] Responsive design mobile first
- [ ] Floating social media sidebar (Instagram, TikTok, WhatsApp)
- [ ] Animated hover effects on all interactive elements
- [ ] Complete menu with categories
- [ ] Shopping cart system
- [ ] Order form with customer details
- [ ] Order summary and confirmation
- [ ] Contact section with call/map buttons
- [ ] Opening hours display
- [ ] Full SEO metadata

### ✅ Admin Dashboard Features
- [ ] Secure admin authentication
- [ ] Real time orders dashboard
- [ ] Order status management
- [ ] New order sound notifications
- [ ] Daily statistics
- [ ] Mobile optimized admin interface

---

## 7. Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Next Auth
NEXTAUTH_SECRET="generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="admin@katanaburger.dz"
ADMIN_PASSWORD=""
```

---

## 8. Deployment Architecture

- **Frontend & API:** Vercel (automated deployments from GitHub)
- **Database:** Supabase PostgreSQL
- **Assets:** Vercel Blob Storage
- **Domain:** Custom domain `katanaburger.dz`
- **CI/CD:** Automatic deploy on every commit to `main` branch

---

## 9. Build Phase Plan

### Phase 1: Foundation
- [ ] Initialize Next.js 14 project
- [ ] Configure TypeScript, Tailwind CSS
- [ ] Setup Prisma ORM
- [ ] Configure environment variables
- [ ] Initialize Git repository

### Phase 2: Design System & Layout
- [ ] Create global styles and CSS variables
- [ ] Build Header component
- [ ] Build Footer component
- [ ] Create floating social bar
- [ ] Build reusable UI components

### Phase 3: Public Website
- [ ] Landing page
- [ ] Menu page layout
- [ ] Menu items display system
- [ ] Shopping cart implementation
- [ ] Order form
- [ ] Contact section

### Phase 4: Order System Backend
- [ ] Order API routes
- [ ] Create order functionality
- [ ] Order validation
- [ ] Database migrations

### Phase 5: Admin Dashboard
- [ ] Admin authentication
- [ ] Login page
- [ ] Orders dashboard
- [ ] Status management
- [ ] Statistics widgets
- [ ] Real time updates

### Phase 6: Testing & Deployment
- [ ] Mobile responsiveness testing
- [ ] Order flow end to end testing
- [ ] Admin functionality testing
- [ ] SEO optimization
- [ ] Vercel deployment

---

## Self-Review

✅ **Security:** All admin routes protected, inputs validated, no secrets hardcoded  
✅ **Completeness:** All requested features included in blueprint  
✅ **Technical Consistency:** Stack is production ready with proven compatibility  
✅ **Legal:** No required legal pages for this phase (will be added before launch)  
✅ **UX:** All flows are user friendly, mobile optimized  
✅ **Scope:** No scope creep, all items match exactly what was requested