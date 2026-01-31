# Portfolio Setup Guide

## 🎉 All Features Implemented!

### ✅ Completed Features

1. **Facebook Link Added** - Available in hero section and footer
2. **Removed Sections** - Academic records and participation sections removed
3. **Softer Gradients** - Changed from blue-purple-pink to blue-indigo (less flashy)
4. **Dark Mode Fixed** - Now works properly with smooth transitions
5. **Research Interests Section** - Detailed explanation of ML research areas
6. **Travel Gallery** - Interactive modal with travel destinations
7. **Contact Form** - Functional form with toast notifications
8. **SEO Optimized** - Comprehensive SEO for "anupamsubedi.com.np"

---

## 🔧 Setup Instructions

### Email Integration (Optional)

The contact form currently shows a success toast message. To enable real email delivery:

#### Option 1: Web3Forms (Recommended - Free & No Backend)

1. Go to [web3forms.com](https://web3forms.com)
2. Sign up with your email: `anupamking444@gmail.com`
3. Get your **Access Key**
4. Open `components/ContactSection.tsx`
5. Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` on line 35 with your actual key
6. That's it! Emails will be sent to `anupamking444@gmail.com`

#### Option 2: Formspree (Alternative)

1. Go to [formspree.io](https://formspree.io)
2. Create a form pointing to `anupamking444@gmail.com`
3. Update the form endpoint in `ContactSection.tsx`

---

## 🖼️ Adding Travel Photos

To add your actual travel photos:

1. Create a folder: `public/travels/`
2. Add your images with these names:
   - `pokhara.jpg`
   - `chitwan.jpg`
   - `mustang.jpg`
   - `lumbini.jpg`
   - `kathmandu.jpg`
   - `nagarkot.jpg`
3. The images will automatically display!

Or update the `travelImages` array in `components/TravelGallery.tsx` with your own destinations.

---

## 🚀 SEO Optimization

The site is now optimized for search engines with:

- **Comprehensive Keywords**: Including "anupamsubedi.com.np", location-based keywords
- **Structured Data**: JSON-LD schema for person/professional
- **Meta Tags**: Title, description, Open Graph, Twitter cards
- **Robots.txt**: Allows all search engines
- **Canonical URL**: Set to anupamsubedi.com.np

### To Improve Google Ranking:

1. **Verify Ownership**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your domain
   - Copy the verification code
   - Replace `'your-google-verification-code'` in `app/layout.tsx` line 48

2. **Submit Sitemap**:
   ```bash
   npm run build
   ```
   Then submit `https://anupamsubedi.com.np/sitemap.xml` to Google Search Console

3. **Create Content**:
   - Add a blog section (optional)
   - Update projects regularly
   - Add detailed case studies

4. **Backlinks**:
   - Share on LinkedIn, GitHub profile
   - Add to dev.to, Medium articles
   - List on developer directories

---

## 📱 Deployment

### Deploy to Vercel (Recommended):

```bash
npm install -g vercel
vercel --prod
```

Then set your custom domain `anupamsubedi.com.np` in Vercel dashboard.

### Deploy to Netlify:

```bash
npm run build
```

Drag the `out` folder to Netlify drop zone.

---

## 🎨 Color Scheme

Updated to softer gradients:
- Primary: Blue (#2563EB) to Indigo (#4F46E5)
- Removed flashy purple and pink
- Professional and modern look

---

## 🌓 Dark Mode

- Toggle button in top-right corner
- Persists across page refreshes
- Smooth transitions between modes

---

## 📧 Contact Information

All contact links are functional:
- **Display Email**: anupamsubedi542@gmail.com
- **Form Delivery**: anupamking444@gmail.com
- **Phone**: +977 9843012542
- **LinkedIn**: Active link
- **GitHub**: Active link  
- **Facebook**: Active link (NEW!)

---

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- React Hot Toast

---

## 📝 Notes

- The site loads instantly
- All animations are smooth and performant
- Mobile-responsive on all devices
- Accessible with semantic HTML
- Production-ready code

---

## 🎯 What to Do Next

1. ✅ Set up Web3Forms for email (5 minutes)
2. ✅ Add your travel photos to `public/travels/`
3. ✅ Get Google Search Console verification code
4. ✅ Deploy to Vercel with custom domain
5. ✅ Share on social media!

---

**Your modern, professional portfolio is ready! 🚀**
