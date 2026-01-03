# Admin Quick Reference

## 🔐 Login
**URL**: `your-site.com/login`  
**Credentials**: Email and password set in Supabase Auth

---

## 📁 Categories Management (`/admin/categories`)

### Add Category
1. Click **"Add Category"**
2. Enter name (slug auto-generates)
3. Add description (optional)
4. Click **"Create"**

### Edit Category
- Click **Edit** icon next to category
- Modify fields
- Click **"Update"**

### Delete Category
- Click **Trash** icon
- Confirm deletion
- ⚠️ This will also delete all products in that category

### Toggle Visibility
- Click the status badge (Active/Inactive)
- Inactive categories don't show on frontend

---

## 📦 Products Management (`/admin/products`)

### Add Product
1. Click **"Add Product"**
2. Fill in:
   - **Name**: Product title
   - **Category**: Select from dropdown
   - **Description**: Detailed description
   - **Price**: Optional (e.g., "₹999" or "Custom")
   - **Image**: Click to upload (max 5MB)
3. Check **"Featured"** to show on homepage
4. Check **"Active"** to make visible
5. Click **"Create"**

### Edit Product
- Click **Edit** icon
- Modify any field
- Upload new image (optional)
- Click **"Update"**

### Delete Product
- Click **Trash** icon
- Confirm deletion

### Quick Toggles
- **Eye icon**: Toggle active status (show/hide)
- **Star icon**: Toggle featured status

---

## ✏️ Site Content (`/admin/content`)

### Edit Hero Section
- Update homepage headline
- Modify subtext
- Click **"Save Changes"**

### Edit About Section
- Change "About" title
- Update business story
- Click **"Save Changes"**

### Edit Contact Info
- Modify contact section heading
- Update description
- Click **"Save Changes"**

### Edit Footer
- Change footer text
- Update tagline
- Click **"Save Changes"**

**Note**: Changes appear instantly on frontend!

---

## 🖼️ Image Upload Tips

### Best Practices
- **Format**: JPG, PNG, or WebP
- **Size**: Under 5MB (500KB recommended)
- **Dimensions**: 800x800px or 1000x1000px
- **Quality**: High-res but compressed

### Image Upload Steps
1. Prepare image on your computer
2. In Products form, click file input
3. Select image
4. Preview appears immediately
5. Save product to upload

### If Upload Fails
- Check file size (must be < 5MB)
- Verify format (JPG/PNG/WebP only)
- Try compressing image first
- Check internet connection

---

## 📊 Dashboard (`/admin`)

### Stats Overview
- **Total Products**: All products in database
- **Active Products**: Currently visible
- **Featured Products**: Shown on homepage
- **Categories**: Total category count

### Quick Actions
- Click cards to jump to management pages
- All stats update in real-time

---

## 🔄 Common Workflows

### Adding New Product with Image
1. Go to Products
2. Click "Add Product"
3. Fill name, category, description
4. Upload image
5. Mark as "Active" and optionally "Featured"
6. Save
7. View on homepage immediately

### Hiding a Product Temporarily
1. Go to Products
2. Click eye icon next to product
3. Status changes to "Inactive"
4. Product hidden from frontend
5. Click eye again to show

### Updating Homepage Content
1. Go to Site Content
2. Edit "Hero Section"
3. Change title/description
4. Save Changes
5. Refresh homepage to see update

### Creating Product Category
1. Go to Categories
2. Add new category (e.g., "Birthday Gifts")
3. Go to Products
4. Add products in that category
5. Category appears in frontend filter

---

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S`: Save (in forms)
- `Esc`: Close dialog
- `Tab`: Navigate form fields

---

## 🚨 Troubleshooting

### Can't Login
- Check email/password
- Clear browser cookies
- Try incognito mode
- Verify account exists in Supabase

### Image Won't Upload
- File too large (> 5MB)
- Wrong format (use JPG/PNG)
- Check internet connection
- Try smaller image

### Changes Not Showing
- Hard refresh browser (Ctrl/Cmd + Shift + R)
- Clear cache
- Check "Active" is enabled
- Verify saved successfully

### "Failed to fetch" Error
- Check internet connection
- Verify Supabase is running
- Try logging out and back in
- Contact administrator

---

## 💡 Tips & Best Practices

### Product Management
- ✅ Use clear, descriptive product names
- ✅ Write detailed descriptions
- ✅ Upload high-quality images
- ✅ Set realistic prices or "Custom"
- ✅ Mark bestsellers as "Featured"
- ✅ Update regularly with new products

### Category Organization
- ✅ Keep categories simple and clear
- ✅ Don't create too many (5-8 ideal)
- ✅ Use descriptive names
- ✅ Delete unused categories

### Content Updates
- ✅ Keep text concise and engaging
- ✅ Update seasonally (festivals, events)
- ✅ Highlight new services/products
- ✅ Maintain consistent tone

### Image Guidelines
- ✅ Use consistent backgrounds
- ✅ Good lighting
- ✅ Show multiple angles (add more images later)
- ✅ Include size reference if relevant
- ✅ Showcase product details

---

## 📞 Need Help?

### Common Questions
**Q: How do I change my password?**  
A: Contact admin to reset via Supabase

**Q: Can I add multiple images per product?**  
A: Currently one main image. Feature coming soon!

**Q: Where do WhatsApp messages go?**  
A: They open the customer's WhatsApp with a pre-filled message

**Q: How do I backup my data?**  
A: Supabase auto-backups. Export manually from Dashboard.

---

## 🎯 Quick Checklist

### Daily Tasks
- [ ] Check for new messages on WhatsApp
- [ ] Review product inventory
- [ ] Respond to inquiries

### Weekly Tasks
- [ ] Add new products
- [ ] Update featured products
- [ ] Check analytics (if set up)
- [ ] Update Instagram with new items

### Monthly Tasks
- [ ] Review and update categories
- [ ] Refresh site content for season/events
- [ ] Check Supabase usage
- [ ] Backup product images

---

**Keep this guide handy for quick reference! 📌**
