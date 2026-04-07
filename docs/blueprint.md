# Blueprint — KATANA BURGER

## 1. Project Identity
- **Name:** KATANA BURGER
- **Tagline:** "La lame qui coupe la faim"
- **Type:** Restaurant website with digital menu
- **Location:** 26 Rue des Freres Sentouhi, Aïn Taya 16019, Algiers
- **Phone:** 07 83 78 07 16
- **Rating:** 4.4 stars on Google Maps
- **Hours:** Daily 11:30 AM - 12:30 AM | Friday 5:30 PM - 1:00 AM

## 2. Brand Identity
- **Concept:** Fast food meets Japanese aesthetics
- **Visual Identity:** Black, red, white color palette
- **Motifs:** Mount Fuji, cherry blossoms, katana slicing burger
- **Packaging:** Kraft paper with red katana-burger logo
- **Tone:** Bold, youthful, humorous, energetic
- **Social Media:** Active on Instagram/TikTok with video content

## 3. Tech Stack
| Technology | Version | Rationale |
|---|---|---|
| Next.js | 14 (App Router) | SSR/SSG, fast loading, SEO |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4 | Rapid styling, responsive |
| Framer Motion | 10.x | Smooth animations, scroll reveals |
| Vercel | Latest | Free deployment, edge network |

## 4. Design System

### Color Palette
```css
--bg-primary: #050505;      /* True black */
--bg-secondary: #0a0a0a;    /* Card surfaces */
--bg-elevated: #111111;     /* Hover states */
--text-primary: #f5f5f5;    /* Off-white text */
--text-muted: #a0a0a0;      /* Secondary text */
--accent: #dc2626;          /* Katana Red */
--accent-hover: #ef4444;    /* Red hover */
--border: #1a1a1a;          /* Subtle borders */
--gold: #d4af37;            /* Premium accent (sparingly) */
```

### Typography
- **Headings:** Inter (900 weight), uppercase, tight tracking — aggressive impact
- **Body:** Inter (400-500), relaxed line-height
- **Prices:** Inter (700), red accent, large size

### Components
- **Buttons:** Solid red for CTAs, ghost buttons for secondary actions
- **Cards:** Dark surfaces, 1px borders, hover lift with red glow
- **Badges:** Pill-shaped, red bg for "NOUVEAU", muted for tags
- **Menu Items:** Clean layout, prominent pricing, add-on toggles

## 5. Information Architecture
| Page | Purpose | Key Elements |
|---|---|---|
| `/` (Home) | Hero, intro, featured items, CTA | Animated hero, hours, location, social links |
| `/menu` | Full digital menu | Build-your-own, classics, combos, sides |
| `/menu/[category]` | Category detail | Item cards with add-ons |

## 6. Menu Structure

### Make Your Katana (Build-Your-Own)
- **Beef Katana** — starting at 380 DA (each extra beef: +150 DA)
- **Crusty Katana (Chicken)** — starting at 550 DA (each extra chicken: +250 DA)
- **Add-ons:** Gruyère 100 DA, Camembert 100 DA, Cheddar 100 DA, Caramelized Onions 50 DA, Oeuf 50 DA, Champignons 100 DA
- **Sauces (FREE, choose 2):** Kitanaï Sauce, Mizo Mayo, Ketchup, Sauce Piquante, Sauce Fromagère
- **Note:** Build-your-own comes without salad, tomato, sauces, slices, cornichon (customizable)

### Classic Burgers
- **Simple Poulet** — 200 DA | **Double Poulet** — 300 DA
- **Simple Viande** — 250 DA | **Double Viande** — 400 DA
- **Add-ons:** Same as above + Cornichons 50 DA
- **Note:** Classics come without salad, tomato, sauces, fries, cheese (customizable)

### Combos / Boxes
- **Mini Box** — 490 DA: 1 Beef Burger (380 DA) + Fries (100 DA) + Drink (100 DA)
- **Creamy Box** — 1,190 DA: 2 Beef Burgers (380 DA each) + Fries (150 DA) + Mac & Cheese (200 DA) + 2 Drinks (100 DA each)
- **Duo Box** — 1,390 DA: 2 Beef Burgers (380 DA each) + 2 Fries (100 DA each) + 2 Mac & Cheese (200 DA each) + 2 Drinks (100 DA each)
- **Full Box** — 1,890 DA: 3 Beef Burgers (380 DA each) + 2 Fries (150 DA each) + 2 Mac & Cheese (200 DA each) + 3 Drinks (100 DA each)

### Sides
- **Mac & Cheese** — 200 DA
- **Fries** — 100 DA / 150 DA
- **Chicken Bites** — 250 DA

### Drinks
- **Canettes** — 100 DA
- **Bouteilles** — 70 DA

## 7. Pages & Sections

### Home Page
1. **Hero:** Full-screen with animated katana/burger visual, slogan, CTA to menu
2. **About:** Brief concept description, Japanese fusion aesthetic
3. **Featured:** Highlight popular items (boxes, signature burgers)
4. **Info:** Hours, location, phone, Google Maps embed
5. **Social:** Instagram/TikTok links, social proof

### Menu Page
1. **Category Navigation:** Sticky tabs (Make Your Katana, Classics, Boxes, Sides)
2. **Item Cards:** Name, description, price, add-on selectors
3. **Customization:** Toggle add-ons, see price update in real-time

## 8. SEO Strategy
- Unique titles and meta descriptions per page
- Open Graph tags for social sharing
- Structured data (Restaurant schema)
- Google Maps integration
- Local SEO optimization

## 9. Phase Plan
1. **Phase 1:** Foundation (config, layout, global styles)
2. **Phase 2:** Home Page (hero, about, info, social)
3. **Phase 3:** Menu Page (full interactive menu with pricing)
4. **Phase 4:** Polish, SEO, animations
5. **Phase 5:** Deployment

## Self-Review
- 🔒 Security: No user data collection, no auth needed
- ✅ Features: Full menu with pricing, hours, location, contact
- 🎨 Design: Dark mode, red accents, Japanese aesthetic, cinematic feel
- ⚡ Performance: Static generation, optimized images
- 📱 Responsive: Mobile-first (most users will be on phone)
- 🔍 SEO: Local business schema, meta tags, Google Maps