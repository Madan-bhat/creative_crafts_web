# Creative Crafts - Deployment Guide

## Deploying to Vercel (Recommended - 5 minutes)

### Step 1: Prepare Your Code

1. Make sure all changes are committed:
```bash
git add .
git commit -m "Ready for deployment"
```

2. Push to GitHub:
```bash
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New Project"**
3. Import your `creative_crafts` repository
4. Vercel will auto-detect Next.js configuration
5. **Before deploying**, add Environment Variables:

Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_SUPABASE_URL = your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
```

6. Click **"Deploy"**
7. Wait ~2 minutes for build to complete

### Step 3: Configure Supabase for Production

1. Go to your Supabase project → **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

### Step 4: Test Production Site

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test the homepage loads
3. Go to `/login` and sign in
4. Verify admin panel works
5. Try uploading a product image

---

## Deploying to Netlify

### Step 1: Build Settings

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)

### Step 2: Environment Variables

In Netlify dashboard, go to **Site settings** → **Environment variables**

Add:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### Step 3: Deploy

Click **"Deploy site"**

### Step 4: Configure Netlify for Next.js

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Commit and push:
```bash
git add netlify.toml
git commit -m "Add Netlify configuration"
git push
```

---

## Custom Domain Setup

### On Vercel

1. Go to your project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `creativecrafts.com`)
4. Follow DNS configuration instructions
5. Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### On Netlify

1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain
3. Configure DNS:

```
Type: A
Name: @
Value: (Netlify will provide)

Type: CNAME
Name: www
Value: (Netlify will provide)
```

### Update Supabase

After adding custom domain:
1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Update Site URL: `https://your-domain.com`
3. Update Redirect URLs: `https://your-domain.com/**`

---

## Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side) | Supabase → Settings → API |

**Important**: Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code!

---

## Pre-Deployment Checklist

### Security
- [ ] Admin user created with strong password
- [ ] Environment variables added to hosting platform
- [ ] `.env.local` is in `.gitignore`
- [ ] RLS policies enabled on all tables
- [ ] Storage bucket policies configured

### Functionality
- [ ] Test login on production
- [ ] Test adding/editing categories
- [ ] Test uploading product images
- [ ] Test editing site content
- [ ] Verify frontend displays dynamic data

### Content
- [ ] Replace placeholder WhatsApp number
- [ ] Update Instagram handle
- [ ] Change email addresses
- [ ] Add real product images
- [ ] Update about section content

### SEO (Optional)
- [ ] Add custom domain
- [ ] Update meta tags in `app/layout.tsx`
- [ ] Add Google Analytics (if needed)
- [ ] Submit sitemap to Google Search Console

---

## Post-Deployment Tasks

### 1. Test Everything
- Homepage loads correctly
- Catalog shows products
- WhatsApp links work
- Instagram links work
- Admin login works
- Image uploads work
- Content updates reflect on frontend

### 2. Set Up Backups
Supabase auto-backups your database, but you can also:
- Export database: Supabase → Database → Backups
- Download product images regularly

### 3. Monitor Usage
- Supabase Dashboard → Usage
- Check database rows, storage, and bandwidth
- Free tier limits:
  - 500MB database
  - 1GB file storage
  - 2GB bandwidth/month

### 4. Update Business Info
- Update all contact information
- Add real products
- Upload high-quality images
- Write compelling product descriptions

---

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

1. Push changes to GitHub:
```bash
git add .
git commit -m "Update products"
git push
```

2. Deployment triggers automatically
3. Live in ~2 minutes

---

## Troubleshooting Deployment

### Build Fails

**Error**: `Cannot find module`
```bash
# Run locally first
npm run build

# Fix any TypeScript errors
# Then commit and push
```

**Error**: Environment variables not found
- Double-check spelling in hosting platform
- Verify no extra spaces in values
- Redeploy after adding variables

### Images Not Loading

- Check Supabase Storage bucket is public
- Verify storage policies exist
- Test image URL directly in browser

### Authentication Not Working

- Update Supabase Site URL with production domain
- Add production URL to Redirect URLs
- Clear browser cache and cookies
- Try incognito/private mode

### Database Connection Issues

- Verify environment variables on hosting platform
- Check Supabase project is not paused (free tier pauses after 7 days of inactivity)
- Test connection from local environment first

---

## Rollback Procedure

If something goes wrong:

### On Vercel
1. Go to project → **Deployments**
2. Find last working deployment
3. Click **"..."** → **"Promote to Production"**

### On Netlify
1. Go to **Deploys**
2. Find last working deploy
3. Click **"Publish deploy"**

---

## Performance Optimization

### Image Optimization
- Use WebP format for product images
- Compress images before upload (max 500KB recommended)
- Use appropriate dimensions (800x800px for products)

### Caching
Next.js automatically caches pages. To force refresh:
```bash
# Clear Vercel cache
vercel --prod --force

# Or redeploy
git commit --allow-empty -m "Force deploy"
git push
```

---

## Support & Maintenance

### Regular Tasks
- [ ] Check Supabase usage monthly
- [ ] Backup database monthly
- [ ] Update product catalog
- [ ] Review and moderate content
- [ ] Check analytics (if set up)

### Getting Help
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

## Success! 🎉

Your Creative Crafts website is now live and ready to take orders!

**Next Steps**:
1. Share your website link
2. Update social media with new website
3. Start adding products
4. Promote on Instagram and WhatsApp

**Your website**: `https://your-domain.com`  
**Admin panel**: `https://your-domain.com/admin`

Good luck with your creative business! 🎨✨
