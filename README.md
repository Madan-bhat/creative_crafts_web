# Creative Crafts - Full-Stack E-Commerce Website

A modern, production-ready handmade crafts website with admin panel, built with Next.js 14, Supabase, and Shadcn UI.

## ✨ Features

### Frontend
- Modern design with warm, elegant aesthetic
- Fully responsive (mobile-first)
- Interactive catalog with filtering
- WhatsApp & Instagram integration
- Dynamic content from database

### Admin Panel (`/admin`)
- Secure authentication
- Dashboard with stats
- Category management (CRUD)
- Product management with image upload
- Site content editor
- Real-time updates

### Backend (Supabase)
- PostgreSQL database
- Supabase Auth
- Image storage
- Row Level Security
- Real-time data

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Supabase credentials

### 3. Run Database Setup
- Go to Supabase SQL Editor
- Run `supabase-setup.sql`

### 4. Create Admin User
- Supabase Dashboard → Authentication → Add User

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📱 Routes

- `/` - Homepage
- `/admin` - Admin Dashboard
- `/admin/categories` - Category Management
- `/admin/products` - Product Management
- `/admin/content` - Site Content Editor
- `/login` - Admin Login

## 🔐 Security

- Protected admin routes with middleware
- Row Level Security on all tables
- Secure image upload (max 5MB)
- No sensitive data exposed to client

## 🎨 Customization

### Update Contact Info
Search and replace in files:
- WhatsApp: `wa.me/1234567890`
- Instagram: `@creativecrafts`
- Email: `hello@creativecrafts.com`

### Modify Content
Use `/admin/content` to update site text without code changes.

## 📊 Database Schema

**Categories**: id, name, slug, description, is_active  
**Products**: id, category_id, name, description, price, image_url, is_featured, is_active  
**Site Content**: id, section, title, description

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Import on Vercel
3. Add environment variables
4. Deploy!

## 📝 Admin Usage

1. **Login**: `/login` with admin credentials
2. **Categories**: Add/edit product categories
3. **Products**: Upload images, set prices, toggle featured
4. **Content**: Edit hero, about, contact sections

## 🐛 Troubleshooting

- **Auth Issues**: Verify `.env.local` variables
- **Image Upload**: Check storage bucket exists
- **Database Errors**: Confirm RLS policies enabled

## 📄 Tech Stack

Next.js 14 • Supabase • TypeScript • Tailwind CSS • Shadcn UI

---

**Made with ❤️ by Creative Crafts**
