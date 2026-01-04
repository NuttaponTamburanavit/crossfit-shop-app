# CrossFit Gear E-commerce Platform Specification

## 📋 Project Overview

A modern, high-performance e-commerce platform specializing in CrossFit equipment, apparel, and accessories. Built with a focus on security, performance, and an exceptional user experience featuring smooth animations and interactive design elements.

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router for SSR/SSG |
| **TypeScript** | Type-safe development |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Scroll-reactive animations & transitions |
| **CSS Modules / Tailwind CSS** | Styling with CSS variables for theming |
| **pnpm** | Package Manager (Performance & Disk Space efficient) |

### Backend (Next.js API Routes)
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | RESTful API endpoints |
| **Prisma ORM** | Database management |
| **PostgreSQL** | Primary database |
| **NextAuth.js** | Authentication & authorization |
| **Stripe** | Payment processing |

### Security Stack
| Layer | Implementation |
|-------|----------------|
| **Authentication** | NextAuth.js with JWT + refresh tokens |
| **Authorization** | Role-based access control (RBAC) |
| **Data Validation** | Zod schema validation |
| **API Security** | Rate limiting, CORS, CSP headers |
| **Encryption** | bcrypt for passwords, HTTPS enforced |
| **Input Sanitization** | XSS protection, SQL injection prevention |

---

## 📁 Folder Structure (Atomic Design + Barrel Pattern)

```
crossfit-shop-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     # Styled components / CSS-in-JS
|   │   │   |   └── index.test.tsx      # Unit tests
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (shop)/                   # Shop route group
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── (account)/                # User account route group
│   │   │   ├── profile/
│   │   │   ├── orders/
│   │   │   └── wishlist/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── users/
│   │   │   └── payments/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css
│   │
│   ├── components/                   # Atomic Design Components
│   │   ├── atoms/                    # Basic building blocks
│   │   │   ├── button/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     # Styled components / CSS-in-JS
|   │   │   |   └── index.test.tsx      # Unit tests
│   │   │   ├── input/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     
|   │   │   |   └── index.test.tsx      
│   │   │   ├── icon/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     
|   │   │   |   └── index.test.tsx      
│   │   │   ├── badge/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     
|   │   │   |   └── index.test.tsx      
│   │   │   ├── loader/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     
|   │   │   |   └── index.test.tsx      
│   │   │   ├── typography/
|   │   │   |   ├── index.tsx           # Main component (exports default)
|   │   │   |   ├── index.style.tsx     
|   │   │   |   └── index.test.tsx      

│   │   ├── molecules/                # Combined atoms
│   │   │   ├── productCard/
│   │   │   ├── searchBar/
│   │   │   ├── cartItem/
│   │   │   ├── ratingStars/
│   │   │   └── priceTag/
│   │   ├── organisms/                # Complex components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── productGrid/
│   │   │   ├── categorySlider/
│   │   │   ├── heroSection/
│   │   │   ├── checkoutForm/
│   │   │   └── searchModal/
│   │   ├── templates/                # Page layouts
│   │   │   ├── mainLayout/
│   │   │   ├── authLayout/
│   │   │   └── dashboardLayout/
│   │   └── pages/                    # Full page compositions
│   │       ├── landingPage/
│   │       ├── productListPage/
│   │       └── productDetailPage/
│   │
│   ├── store/                        # Zustand stores
│   │   ├── useCartStore.ts
│   │   ├── useUserStore.ts
│   │   ├── useProductStore.ts
│   │   ├── useUIStore.ts
│   │   └── useThemeStore.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useScrollAnimation.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMediaQuery.ts
│   │   └── useDebounce.ts
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── stripe.ts
│   │   └── validators.ts
│   │
│   ├── utils/                        # Helper functions
│   │   ├── formatters.ts
│   │   ├── api-helpers.ts
│   │   └── constants.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   └── api.ts
│   │
│   └── styles/                       # Global styles & theme
│       ├── variables.css
│       ├── animations.css
│       └── theme.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── config/
    ├── site.config.ts                # Site configuration
    └── theme.config.ts               # Theme & color config
```

### Component Structure (Barrel Pattern)

Each component follows a **barrel pattern** for clean imports and encapsulation:


#### Example: Button Component

**`index.tsx`** - Main component with barrel export
```tsx
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { StyledButton, ButtonLoader } from './index.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} $variant={variant} $size={size} {...props}>
        {isLoading && <ButtonLoader />}
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

**`index.style.tsx`** - Styled components (encapsulated)
```tsx
'use client';

import { styled } from '@/lib/styled';

export const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  $size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  /* Size variants */
  ${({ $size }) => sizes[$size]}
  
  /* Color variants */
  ${({ $variant }) => variants[$variant]}
`;

export const ButtonLoader = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
`;

const sizes = {
  sm: `padding: 8px 16px; font-size: 14px;`,
  md: `padding: 12px 24px; font-size: 16px;`,
  lg: `padding: 16px 32px; font-size: 18px;`,
};

const variants = {
  primary: `background: var(--primary); color: white;`,
  secondary: `background: #262626; color: white;`,
  outline: `border: 2px solid var(--primary); color: var(--primary);`,
  ghost: `background: transparent; color: #525252;`,
};
```

**`index.test.tsx`** - Unit tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('render loader when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toContainElement(
      document.querySelector('[class*="ButtonLoader"]')
    );
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Usage (Clean Imports)

```tsx
// Clean import from barrel
import Button from '@/components/atoms/button';

// Multiple components from same level
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Badge from '@/components/atoms/badge';

// Usage
<Button variant="primary" size="lg">Buy Now</Button>
```

---

## 🎨 Design System

### Design Principles
- **Minimal & Clean**: Focus on products with generous whitespace
- **Athletic & Bold**: Strong typography reflecting CrossFit energy
- **Performance-Focused**: Fast loading, smooth animations
- **Accessible**: WCAG 2.1 AA compliant

### Color Configuration System

```typescript
// config/theme.config.ts
export const themeConfig = {
  colors: {
    primary: {
      50: 'hsl(var(--primary-h), var(--primary-s), 95%)',
      100: 'hsl(var(--primary-h), var(--primary-s), 90%)',
      200: 'hsl(var(--primary-h), var(--primary-s), 80%)',
      300: 'hsl(var(--primary-h), var(--primary-s), 70%)',
      400: 'hsl(var(--primary-h), var(--primary-s), 60%)',
      500: 'hsl(var(--primary-h), var(--primary-s), 50%)', // Main primary
      600: 'hsl(var(--primary-h), var(--primary-s), 40%)',
      700: 'hsl(var(--primary-h), var(--primary-s), 30%)',
      800: 'hsl(var(--primary-h), var(--primary-s), 20%)',
      900: 'hsl(var(--primary-h), var(--primary-s), 10%)',
    },
    // Default primary: Vibrant Red (CrossFit energy)
    // H: 0, S: 85%
  },
  
  // Easily configurable primary color presets
  presets: {
    energyRed: { h: 0, s: 85 },
    powerOrange: { h: 25, s: 90 },
    strengthBlue: { h: 220, s: 75 },
    enduranceGreen: { h: 150, s: 70 },
    steelGray: { h: 210, s: 15 },
  }
};
```

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| **Headings** | Inter / Bebas Neue | 700-900 | 24-72px |
| **Body** | Inter | 400-500 | 14-18px |
| **Labels** | Inter | 500-600 | 12-14px |

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

---

## ✨ Animation & Interaction Design

### Scroll-Reactive Animations

```typescript
// Animation configurations
export const scrollAnimations = {
  // Fade in on scroll
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
    viewport: { once: true, margin: '-100px' },
  },
  
  // Parallax scroll effect
  parallax: {
    yOffset: ['0%', '-20%'],
    transition: { ease: 'linear' },
  },
  
  // Scale on scroll
  scaleUp: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  },
  
  // Stagger children
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
};
```

### Interactive Elements
| Element | Animation |
|---------|-----------|
| **Product Cards** | Hover lift + shadow, image zoom |
| **Buttons** | Scale press, color shift |
| **Gallery** | Smooth crossfade, drag-to-navigate |
| **Navigation** | Slide-in drawer, dropdown fade |
| **Page Transitions** | Smooth fade + slide between routes |
| **Scroll Progress** | Progress bar indicator |

### Gallery Transition System

```typescript
// Gallery with smooth transitions
export const galleryTransitions = {
  slide: {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  fade: {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  },
  zoom: {
    enter: { scale: 1.2, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
};
```

---

## 🔍 Global Search Experience

### Core Features
- **Global Availability**: Accessible from anywhere via Header icon or triggers.
- **Smart Triggers**:
  - **Header**: Search icon (hidden on Homepage).
  - **Hero Section**: "Search for gear..." fake input button.
- **Rich Results**: Displays product cards with images, prices, and categories in a grid.
- **Optimized**: Debounced input (300ms) for performance.

### Search Functionality
- **Multi-parameter Filtering**: Search matches against:
  - Product Name
  - Category
  - Tags (metadata)
- **Interactive Results**:
  - Click product -> Navigates to Product Detail Page (PDP) & closes modal
  - Empty query -> Shows "Popular Searches" quick links
- **Navigation Control**:
  - Close via "X" button
  - Close via `Esc` key
  - Close via backdrop click

### UI/UX Design
- **Backdrop**: Blur effect (`backdrop-blur-md`) to focus attention.
- **Input**: Large, centered, high-contrast input field (`text-3xl`).
- **Empty State**: Displays "Popular Searches" tags to guide users.
- **Gallery**: Responsive grid for results (1 col mobile -> 3 col desktop).

---

## 📄 Landing Page Sections

### 1. Hero Section
- **Content**: Full-screen video/image background with CrossFit athlete in action
- **Elements**:
  - Bold headline: "UNLOCK YOUR POTENTIAL"
  - Subheading: Brief value proposition
  - Search gear
  - Scroll indicator animation
- **Animations**: Parallax background, text reveal on load

### 2. Featured Categories
- **Layout**: Horizontal scroll or grid (3-4 categories)
- **Categories**:
  - 🏋️ Weightlifting Equipment (Barbells, Plates, Racks)
  - 👟 Training Footwear
  - 👕 Performance Apparel
  - 🎒 Accessories & Gear
- **Animations**: Cards scale on hover, stagger fade-in

### 3. Best Sellers / Trending Products
- **Layout**: Product carousel or grid (6-8 products)
- **Features**:
  - Quick view on hover
  - Add to cart button
  - Rating display
  - Sale badges
- **Animations**: Horizontal scroll snap, image zoom on hover

### 4. Brand Story / About
- **Layout**: Split section (image + text)
- **Content**:
  - Brand mission & values
  - Quality commitment
  - Community focus
- **Animations**: Text reveal on scroll, image parallax

### 5. Product Showcase Gallery
- **Layout**: Full-width masonry grid or slider
- **Features**:
  - High-quality product photography
  - Lifestyle images
  - Click to explore category
- **Animations**: Smooth gallery transitions, lightbox view

### 6. Customer Reviews / Testimonials
- **Layout**: Carousel with customer photos
- **Content**:
  - Star ratings
  - Review excerpts
  - Customer name & verified badge
- **Animations**: Auto-scroll carousel, fade transitions

### 7. Workout/Lifestyle Content
- **Layout**: Video section or image grid
- **Content**:
  - Training tips
  - Product in action
  - Community highlights
- **Animations**: Video autoplay on scroll, overlay reveals

### 8. Newsletter Signup
- **Layout**: Clean CTA section
- **Content**:
  - Headline: "Join the CrossFit Community"
  - Incentive: "Get 10% off your first order"
  - Email input + subscribe button
- **Animations**: Input focus effects, success animation

### 9. Trust Indicators
- **Layout**: Icon row or grid
- **Elements**:
  - 🚚 Free Shipping over $X
  - 🔄 Easy Returns
  - 🛡️ Secure Payments
  - 💬 24/7 Support
- **Animations**: Icon bounce on viewport enter

### 10. Footer
- **Layout**: Multi-column footer
- **Content**:
  - Navigation links
  - Social media icons
  - Payment method icons
  - Contact information
  - Copyright & legal links

---

## 🗄️ Database Schema (Prisma)

```prisma
// Core Models

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  phone         String?
  role          Role      @default(CUSTOMER)
  avatar        String?
  addresses     Address[]
  orders        Order[]
  wishlist      WishlistItem[]
  reviews       Review[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Product {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String
  shortDesc     String?
  price         Decimal   @db.Decimal(10, 2)
  comparePrice  Decimal?  @db.Decimal(10, 2)
  sku           String    @unique
  stock         Int       @default(0)
  images        ProductImage[]
  category      Category  @relation(fields: [categoryId], references: [id])
  categoryId    String
  tags          Tag[]
  variants      ProductVariant[]
  reviews       Review[]
  orderItems    OrderItem[]
  wishlistItems WishlistItem[]
  featured      Boolean   @default(false)
  status        ProductStatus @default(ACTIVE)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Category {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  description String?
  image       String?
  parent      Category?   @relation("SubCategories", fields: [parentId], references: [id])
  parentId    String?
  children    Category[]  @relation("SubCategories")
  products    Product[]
  createdAt   DateTime    @default(now())
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  user            User        @relation(fields: [userId], references: [id])
  userId          String
  items           OrderItem[]
  subtotal        Decimal     @db.Decimal(10, 2)
  tax             Decimal     @db.Decimal(10, 2)
  shipping        Decimal     @db.Decimal(10, 2)
  total           Decimal     @db.Decimal(10, 2)
  status          OrderStatus @default(PENDING)
  shippingAddress Address     @relation(fields: [addressId], references: [id])
  addressId       String
  paymentIntent   String?
  paymentStatus   PaymentStatus @default(UNPAID)
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

// Enums
enum Role {
  CUSTOMER
  ADMIN
  SUPER_ADMIN
}

enum ProductStatus {
  ACTIVE
  DRAFT
  ARCHIVED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  UNPAID
  PAID
  REFUNDED
  FAILED
}
```

---

## 🔐 Security Implementation

### Authentication Flow
1. **Registration**: Email verification required
2. **Login**: JWT access token (15min) + HTTP-only refresh token (7 days)
3. **Password**: bcrypt with salt rounds (12)
4. **Session**: Secure cookie storage

### API Security Middleware

```typescript
// Middleware stack
export const securityMiddleware = [
  helmet(),                    // Security headers
  rateLimit({                  // Rate limiting
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                  // 100 requests per window
  }),
  cors({                       // CORS configuration
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
  }),
  csrf(),                      // CSRF protection
  sanitize(),                  // Input sanitization
];
```

### Data Validation (Zod)

```typescript
// Example schemas
export const productSchema = z.object({
  name: z.string().min(3).max(200),
  price: z.number().positive(),
  description: z.string().min(10),
  categoryId: z.string().cuid(),
  stock: z.number().int().nonnegative(),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().positive(),
    variantId: z.string().cuid().optional(),
  })).min(1),
  shippingAddressId: z.string().cuid(),
});
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `xs` | 0-479px | Mobile portrait |
| `sm` | 480-767px | Mobile landscape |
| `md` | 768-1023px | Tablet |
| `lg` | 1024-1279px | Desktop |
| `xl` | 1280-1535px | Large desktop |
| `2xl` | 1536px+ | Ultra-wide |

---

## ⚡ Performance Targets

| Metric | Target |
|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **FID** (First Input Delay) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |
| **TTI** (Time to Interactive) | < 3.5s |
| **Lighthouse Score** | > 90 |

### Optimization Strategies
- Next.js Image optimization
- Code splitting & lazy loading
- Static generation for product pages
- Edge caching with Vercel/CDN
- Optimistic UI updates

---

## 🚀 Deployment

### Recommended Stack
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend & API hosting |
| **PostgreSQL** (Supabase/Neon) | Database |
| **Cloudinary/S3** | Image storage & CDN |
| **Stripe** | Payments |
| **SendGrid/Resend** | Transactional emails |
| **Sentry** | Error monitoring |

### Environment Variables

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Storage
CLOUDINARY_URL=

# Email
SENDGRID_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
ALLOWED_ORIGINS=
```

---

## 📋 MVP Features Checklist

### Phase 1: Core (Week 1-3)
- [ ] Project setup & configuration
- [ ] Landing page with all sections
- [ ] Product listing & detail pages
- [ ] Category navigation
- [ ] Search functionality
- [ ] User authentication
- [ ] Shopping cart (Zustand)
- [ ] Responsive design

### Phase 2: Commerce (Week 4-5)
- [ ] Checkout flow
- [ ] Stripe payment integration
- [ ] Order management
- [ ] Email notifications
- [ ] User account dashboard

### Phase 3: Enhancement (Week 6-7)
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Advanced filtering & sorting
- [ ] Related products
- [ ] Admin dashboard (basic)

### Phase 4: Polish (Week 8)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Analytics integration
- [ ] Security audit
- [ ] Testing & QA

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [NextAuth.js](https://next-auth.js.org/)

---

*Last Updated: January 2026*
*Version: 1.0.0*
