# Creative Crafts - Complete Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)
- Git (optional)

## Step-by-Step Setup

### Step 1: Install Dependencies
```bash
cd creative_crafts
npm install
```

###Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Enter:
   - **Name**: Creative Crafts
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
4. Wait for project to finish setting up (~2 minutes)

### Step 3: Get Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

3. Go to **Settings** → **Database** → **Connection string**
4. Note the service_role key (you'll need it later)

### Step 4: Configure Environment Variables

1. In your project root, create a file called `.env.local`:

```bash
# Create the file
touch .env.local
```

2. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Never commit `.env.local` to git!

### Step 5: Set Up Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open the file `supabase-setup.sql` in your project
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (bottom right)

You should see: "Success. No rows returned"

This creates:
- ✅ Categories table
- ✅ Products table
- ✅ Site Content table
- ✅ Storage bucket for images
- ✅ Security policies
- ✅ Default categories and content

### Step 6: Create Admin User

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **"Add User"** → **"Create new user"**
3. Enter:
   - **Email**: your-admin@email.com
   - **Password**: (choose a strong password)
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

### Step 7: Verify Storage Setup

1. Go to **Storage** in Supabase Dashboard
2. You should see a bucket called `product-images`
3. Click on it → **Policies**
4. Verify you see policies for INSERT, SELECT, UPDATE, DELETE

### Step 8: Run the Application

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in 2s
```

### Step 9: Test the Application

#### Test Frontend
1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the Creative Crafts homepage
3. The catalog should show placeholder products

#### Test Admin Login
1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter the admin credentials you created
3. Click "Login"
4. You should be redirected to `/admin`

#### Test Admin Panel
1. Click **"Categories"** in sidebar
2. Try adding a new category
3. Click **"Products"** in sidebar
4. Try adding a product with an image
5. Go back to the homepage and verify the product appears

## Troubleshooting

### "Cannot find module '@supabase/ssr'"
```bash
npm install @supabase/ssr @supabase/auth-helpers-nextjs
```

### "Failed to fetch" errors
- Check your `.env.local` file exists and has correct values
- Verify NEXT_PUBLIC_SUPABASE_URL starts with `https://`
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

### Login not working
- Verify user exists in Supabase Auth dashboard
- Check email/password is correct
- Make sure "Auto Confirm User" was checked
- Clear browser cookies and try again

### Image upload fails
- Go to Supabase Storage → product-images
- Check bucket exists and is public
- Verify storage policies exist (run SQL setup again if needed)

### Database errors
- Re-run `supabase-setup.sql` in SQL Editor
- Check RLS is enabled on all tables
- Verify your service role key is in `.env.local`

## Next Steps

### Add Real Products
1. Login to `/admin`
2. Go to "Products"
3. Click "Add Product"
4. Upload a real product image
5. Fill in details
6. Mark as "Featured" or "Active"
7. Save

### Customize Content
1. Go to `/admin/content`
2. Edit "Hero Section" title and description
3. Update "About Section" with your story
4. Modify contact information
5. Click "Save Changes" for each section

### Update Contact Info
Replace these in the code:
- WhatsApp: `1234567890` → your number
- Instagram: `@creativecrafts` → your handle
- Email: `hello@creativecrafts.com` → your email

### Deploy to Production
See "Deployment" section in README.md

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

## File Structure Quick Reference

```
creative_crafts/
├── .env.local              # ← Your Supabase credentials (create this)
├── supabase-setup.sql      # ← Run this in Supabase SQL Editor
├── app/
│   ├── admin/              # ← Admin panel pages
│   ├── login/              # ← Login page
│   └── page.tsx            # ← Homepage
├── components/             # ← All UI components
└── lib/
    └── supabase.ts        # ← Supabase client configuration
```

## Support

If you run into issues:
1. Check the Troubleshooting section above
2. Verify all environment variables are set correctly
3. Make sure the database SQL was run successfully
4. Check the browser console (F12) for error messages

## Security Checklist

Before deploying:
- [ ] Change default admin password
- [ ] Add `.env.local` to `.gitignore` (already done)
- [ ] Verify RLS policies are enabled
- [ ] Test admin access on incognito/private window
- [ ] Set up proper domain in Supabase settings

---

**You're all set! Happy crafting! 🎨✨**
