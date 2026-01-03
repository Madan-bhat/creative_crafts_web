# Creative Crafts - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │   Customer    │  │  Admin User   │  │ Mobile Device  │  │
│  │   Browser     │  │   Browser     │  │   Browser      │  │
│  └───────┬───────┘  └───────┬───────┘  └────────┬───────┘  │
└──────────┼───────────────────┼───────────────────┼──────────┘
           │                   │                   │
           ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  NEXT.JS APPLICATION                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PUBLIC ROUTES                                         │  │
│  │ • / (Homepage)                                        │  │
│  │ • /catalog (Coming soon)                             │  │
│  │ • /about (Coming soon)                               │  │
│  │ • /contact (Coming soon)                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PROTECTED ROUTES (Admin Only)                        │  │
│  │ • /admin (Dashboard)                                 │  │
│  │ • /admin/categories (Category Management)            │  │
│  │ • /admin/products (Product Management)               │  │
│  │ • /admin/content (Site Content Editor)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ MIDDLEWARE (Route Protection)                        │  │
│  │ • Session verification                               │  │
│  │ • Admin role check                                   │  │
│  │ • Redirect unauthorized users                        │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE BACKEND                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ AUTHENTICATION                                        │  │
│  │ • Email/Password auth                                │  │
│  │ • Session management                                 │  │
│  │ • JWT tokens                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ POSTGRESQL DATABASE                                   │  │
│  │                                                       │  │
│  │ ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │ │  categories  │  │   products   │  │   site_    │ │  │
│  │ │              │  │              │  │   content  │ │  │
│  │ │ • id         │  │ • id         │  │ • id       │ │  │
│  │ │ • name       │  │ • name       │  │ • section  │ │  │
│  │ │ • slug       │  │ • category_id│  │ • title    │ │  │
│  │ │ • is_active  │  │ • image_url  │  │ • desc     │ │  │
│  │ └──────────────┘  │ • is_featured│  └────────────┘ │  │
│  │                   │ • is_active  │                  │  │
│  │                   └──────────────┘                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ STORAGE (product-images bucket)                      │  │
│  │ • Image uploads                                      │  │
│  │ • Public CDN                                         │  │
│  │ • Automatic optimization                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ROW LEVEL SECURITY                                   │  │
│  │ • Public: Read active items                          │  │
│  │ • Authenticated: Full CRUD                           │  │
│  │ • Policy-based access control                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Customer Viewing Products

```
Customer → Homepage
    ↓
Next.js Server → Supabase (SELECT active products)
    ↓
Products returned with images
    ↓
Rendered on page
    ↓
Customer clicks WhatsApp → Opens WhatsApp with message
```

### Admin Adding Product

```
Admin → Login (/login)
    ↓
Credentials → Supabase Auth
    ↓
Session created → Redirected to /admin
    ↓
Click "Add Product"
    ↓
Fill form + Upload image
    ↓
Image → Supabase Storage (returns URL)
    ↓
Product data + image URL → Supabase Database
    ↓
Success toast shown
    ↓
Product appears in table
    ↓
Product visible on frontend (if active)
```

---

## Component Hierarchy

```
App Layout (Root)
│
├── Navigation (All pages)
│   ├── Desktop Links
│   └── Mobile Menu
│
├── Homepage (/)
│   ├── Hero Section
│   ├── Visual Focus Section
│   ├── Catalog Section
│   │   ├── Filter Buttons
│   │   └── Product Cards (dynamic from DB)
│   ├── About Section
│   ├── Contact Section
│   └── Footer
│
├── Login Page (/login)
│   └── Login Form
│
└── Admin Layout (/admin/*)
    ├── Sidebar
    │   ├── Dashboard Link
    │   ├── Categories Link
    │   ├── Products Link
    │   ├── Content Link
    │   └── Logout Button
    ├── Top Bar
    └── Page Content
        ├── Dashboard
        │   ├── Stats Cards
        │   └── Quick Actions
        ├── Categories Page
        │   ├── Add Category Dialog
        │   └── Categories Table
        ├── Products Page
        │   ├── Add Product Dialog
        │   │   ├── Form Fields
        │   │   └── Image Upload
        │   └── Products Table
        └── Content Page
            └── Section Editors
```

---

## Security Layers

```
┌─────────────────────────────────────────┐
│ Layer 1: Client-Side                    │
│ • Form validation                       │
│ • Input sanitization                    │
│ • File type/size checks                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 2: Next.js Middleware             │
│ • Route protection                      │
│ • Session verification                  │
│ • Redirect unauthorized                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 3: Server Actions                 │
│ • Server-side validation                │
│ • Auth context check                    │
│ • Business logic enforcement            │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 4: Supabase RLS                   │
│ • Row-level policies                    │
│ • Role-based access                     │
│ • Database-level security               │
└─────────────────────────────────────────┘
```

---

## File Upload Flow

```
Admin selects image
    ↓
Client validates (size, type)
    ↓
Preview shown
    ↓
Form submitted
    ↓
Image uploaded to Supabase Storage
    ↓
Public URL generated
    ↓
URL saved in products table
    ↓
Image displayed via CDN
```

---

## Deployment Architecture

```
┌───────────────────────────────────────────────┐
│              GitHub Repository                 │
│  • Source code                                │
│  • Version control                            │
└─────────────────┬─────────────────────────────┘
                  │
                  ↓ (Push trigger)
┌───────────────────────────────────────────────┐
│            Vercel / Netlify                   │
│  ┌─────────────────────────────────────────┐ │
│  │ Build Process                           │ │
│  │ • npm install                           │ │
│  │ • npm run build                         │ │
│  │ • Optimize assets                       │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ Edge Network (CDN)                      │ │
│  │ • Static files                          │ │
│  │ • Images                                │ │
│  │ • CSS/JS                                │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ Serverless Functions                    │ │
│  │ • API routes                            │ │
│  │ • Server components                     │ │
│  │ • Authentication                        │ │
│  └─────────────────────────────────────────┘ │
└───────────────┬───────────────────────────────┘
                │
                ↓ (Database queries)
┌───────────────────────────────────────────────┐
│           Supabase Cloud                      │
│  • PostgreSQL database                        │
│  • File storage                               │
│  • Authentication                             │
│  • Real-time subscriptions                    │
└───────────────────────────────────────────────┘
```

---

## State Management

```
Server State (Supabase)
├── Categories (database)
├── Products (database)
├── Site Content (database)
└── User Session (auth)

Client State
├── Form data (React state)
├── UI state (dialogs, toasts)
├── Loading states
└── Error states

No global state management needed!
(Using React Server Components + Supabase)
```

---

## API Endpoints (Implicit)

```
Supabase Auto-Generated REST API:

GET    /rest/v1/categories        # List categories
POST   /rest/v1/categories        # Create category
PATCH  /rest/v1/categories/:id    # Update category
DELETE /rest/v1/categories/:id    # Delete category

GET    /rest/v1/products          # List products
POST   /rest/v1/products          # Create product
PATCH  /rest/v1/products/:id      # Update product
DELETE /rest/v1/products/:id      # Delete product

GET    /rest/v1/site_content      # List content
PATCH  /rest/v1/site_content/:id  # Update content

POST   /auth/v1/token             # Login
POST   /auth/v1/logout            # Logout

POST   /storage/v1/object/        # Upload file
GET    /storage/v1/object/        # Get file
DELETE /storage/v1/object/        # Delete file
```

---

## Performance Optimizations

```
Next.js
├── Static Generation (where possible)
├── Server Components (reduce JS)
├── Image Optimization (automatic)
├── Code Splitting (automatic)
└── Edge Caching

Supabase
├── Connection Pooling
├── Query Optimization
├── CDN for storage
└── Indexed columns

Client
├── Lazy Loading
├── Debounced inputs
├── Optimistic UI updates
└── Toast notifications (non-blocking)
```

---

This architecture provides:
✅ Scalability  
✅ Security  
✅ Performance  
✅ Maintainability  
✅ Developer Experience  
✅ Production-ready
