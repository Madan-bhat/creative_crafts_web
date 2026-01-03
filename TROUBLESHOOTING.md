# Troubleshooting Guide - Creative Crafts

## Common Issues & Solutions

---

## Installation Issues

### Problem: `npm install` fails
**Symptoms**: Errors during package installation

**Solutions**:
```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or use specific Node version
nvm use 18
npm install
```

---

### Problem: TypeScript errors after install
**Symptoms**: Red squiggly lines everywhere

**Solution**:
1. Restart VS Code
2. Or run: `npx tsc --noEmit`
3. Or: TypeScript → Restart TS Server (VS Code command palette)

---

## Environment Variables

### Problem: "Cannot find module '@supabase/supabase-js'"
**Symptoms**: Import errors, module not found

**Solution**:
```bash
# Verify .env.local exists
ls -la .env.local

# Should contain:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Restart dev server
# Ctrl+C then npm run dev
```

---

### Problem: "Invalid API key"
**Symptoms**: 401 errors, authentication failures

**Solution**:
1. Go to Supabase → Settings → API
2. Copy anon key again (eyJ...)
3. Update `.env.local`
4. **Must restart dev server** after changing env vars
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## Database Issues

### Problem: "relation does not exist"
**Symptoms**: SQL errors about missing tables

**Solution**:
1. Go to Supabase SQL Editor
2. Re-run entire `supabase-setup.sql`
3. Check for any error messages
4. Verify tables exist: Database → Tables

---

### Problem: "Failed to fetch" from database
**Symptoms**: Loading states never complete

**Solutions**:
```bash
# 1. Check Supabase project is running
#    (not paused - free tier pauses after 7 days inactivity)

# 2. Verify URL is correct in .env.local
echo $NEXT_PUBLIC_SUPABASE_URL

# 3. Test connection in browser:
https://your-project.supabase.co/rest/v1/categories

# Should return [] or data, not 404
```

---

### Problem: "insufficient_privilege" error
**Symptoms**: Permission denied on database operations

**Solution**:
1. Go to Supabase → Authentication → Policies
2. Verify RLS policies exist
3. Re-run policy section from `supabase-setup.sql`
4. Ensure user is authenticated

---

## Authentication Issues

### Problem: Can't login - "Invalid login credentials"
**Symptoms**: Login fails with correct password

**Solutions**:
1. **Check user exists**:
   - Supabase → Authentication → Users
   - Verify email is there

2. **Confirm email** (if required):
   - In user list, check "Confirmed" column
   - Or create user with "Auto Confirm" checked

3. **Try password reset**:
   ```sql
   -- In Supabase SQL Editor
   UPDATE auth.users 
   SET email_confirmed_at = NOW()
   WHERE email = 'your@email.com';
   ```

---

### Problem: Logged in but can't access admin
**Symptoms**: Redirect loop or 403 errors

**Solution**:
```bash
# 1. Check middleware.ts exists
ls middleware.ts

# 2. Verify session cookie
# Open DevTools → Application → Cookies
# Should see: sb-<project>-auth-token

# 3. Clear cookies and login again
# Chrome: Settings → Clear browsing data → Cookies

# 4. Check middleware protection:
# middleware.ts should protect /admin routes
```

---

## Image Upload Issues

### Problem: "Failed to upload image"
**Symptoms**: Upload button spins, then error

**Solutions**:
1. **Check file size**:
   - Must be < 5MB
   - Compress image at tinypng.com

2. **Verify storage bucket**:
   - Supabase → Storage
   - Bucket `product-images` should exist
   - Should be **Public**

3. **Check storage policies**:
   ```sql
   -- Run in SQL Editor
   SELECT * FROM storage.policies 
   WHERE bucket_id = 'product-images';
   
   -- Should return 4 policies (SELECT, INSERT, UPDATE, DELETE)
   ```

4. **Check file type**:
   - Only JPG, PNG, WebP, GIF allowed
   - Check file extension

---

### Problem: Images don't show after upload
**Symptoms**: Broken image icon on frontend

**Solutions**:
1. **Check URL format**:
   ```javascript
   // Should look like:
   https://xxx.supabase.co/storage/v1/object/public/product-images/abc123.jpg
   ```

2. **Verify public access**:
   - Go to uploaded image URL directly
   - Should show image, not JSON error

3. **Check image exists in storage**:
   - Supabase → Storage → product-images
   - Find your image file

---

## Frontend Issues

### Problem: Products not showing on homepage
**Symptoms**: Empty catalog, no products

**Solutions**:
1. **Check products exist in database**:
   - Go to /admin/products
   - Should see products listed

2. **Verify products are active**:
   - Click eye icon to toggle active
   - Eye icon should be green

3. **Check category is active**:
   - Go to /admin/categories
   - Ensure category status is "Active"

4. **Inspect browser console**:
   - F12 → Console tab
   - Look for error messages

---

### Problem: Styles not loading
**Symptoms**: Unstyled page, plain HTML

**Solution**:
```bash
# 1. Check Tailwind CSS is working
npm run dev

# 2. Verify globals.css is imported
# Should be in app/layout.tsx

# 3. Clear .next cache
rm -rf .next
npm run dev

# 4. Check tailwind.config.ts content paths
# Should include: './app/**/*.{ts,tsx}'
```

---

## Admin Panel Issues

### Problem: Sidebar not showing
**Symptoms**: Admin panel has no navigation

**Solution**:
1. Check screen width (desktop layout needed)
2. Click hamburger menu on mobile
3. Verify AdminLayout is wrapping admin pages

---

### Problem: Toast notifications not working
**Symptoms**: No success/error messages

**Solution**:
```typescript
// Verify Toaster is in layout
// app/layout.tsx should have:
import { Toaster } from "@/components/ui/toaster"

// And in return:
<body>
  {children}
  <Toaster />
</body>
```

---

## Build & Deployment Issues

### Problem: `npm run build` fails
**Symptoms**: Build errors, can't deploy

**Solutions**:
```bash
# 1. Check TypeScript errors
npx tsc --noEmit

# 2. Check for console.log/errors
# Fix all TypeScript errors first

# 3. Test build locally
rm -rf .next
npm run build

# 4. If "Cannot find module" errors:
npm install
npm run build

# 5. Check environment variables in build
# Vercel: Add to project settings
# Local: Verify .env.local exists
```

---

### Problem: Works locally, not in production
**Symptoms**: Deployed site has errors

**Solutions**:
1. **Check environment variables on hosting**:
   - Vercel: Settings → Environment Variables
   - Must add all 3 variables
   - Redeploy after adding

2. **Update Supabase Site URL**:
   - Supabase → Authentication → URL Configuration
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

3. **Check build logs**:
   - Vercel: Deployments → Click deployment → Logs
   - Look for specific error

---

## Performance Issues

### Problem: Slow page loads
**Symptoms**: Pages take 3+ seconds to load

**Solutions**:
1. **Optimize images**:
   - Compress before upload
   - Use WebP format
   - Resize to max 1000px

2. **Check Supabase region**:
   - Should be close to your users
   - Can't change after creation (need new project)

3. **Enable caching**:
   - Already enabled in Next.js
   - Force refresh: Shift + F5

---

## Data Issues

### Problem: Old data still showing after update
**Symptoms**: Changes in admin not reflecting

**Solutions**:
1. **Hard refresh browser**:
   - Ctrl/Cmd + Shift + R
   - Or Shift + F5

2. **Check data was actually saved**:
   - Supabase → Table Editor
   - Verify data is there

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## Emergency Fixes

### Problem: Site is completely broken
**Panic mode solution**:

```bash
# 1. Roll back to last working commit
git log
git checkout <last-working-commit-hash>

# 2. Or revert specific file
git checkout HEAD~1 -- path/to/broken/file.tsx

# 3. Or start fresh
git stash  # Save changes
npm install
rm -rf .next node_modules
npm install
npm run dev
```

---

### Problem: Locked out of admin
**Solution**:

```sql
-- In Supabase SQL Editor, reset password:
UPDATE auth.users
SET encrypted_password = crypt('newpassword123', gen_salt('bf'))
WHERE email = 'your@email.com';

-- Or create new admin user:
-- Supabase → Authentication → Add User
```

---

## Getting More Help

### Check These First
1. Browser Console (F12 → Console)
2. Network Tab (F12 → Network)
3. Supabase Logs (Dashboard → Logs)
4. Vercel Logs (if deployed)

### Information to Provide
When asking for help, include:
- Error message (full text)
- Browser console screenshot
- What you were doing when error occurred
- What you've tried already

### Useful Commands
```bash
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version

# Clear everything and start fresh
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# Check for port conflicts
lsof -i :3000
# Kill if needed:
kill -9 <PID>
```

---

## Prevention Tips

✅ **Always test locally before deploying**  
✅ **Commit working code frequently**  
✅ **Keep dependencies updated** (monthly)  
✅ **Backup database** (weekly)  
✅ **Document custom changes**  
✅ **Test on multiple browsers**  
✅ **Monitor Supabase usage**  

---

**Still stuck? Check the other documentation files:**
- `SETUP_GUIDE.md` - Initial setup
- `DEPLOYMENT.md` - Deployment issues
- `ADMIN_GUIDE.md` - Admin panel usage
- `ARCHITECTURE.md` - How things work

---

Last resort: Start fresh with setup guide! 🔄
