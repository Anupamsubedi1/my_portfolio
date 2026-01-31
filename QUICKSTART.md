# Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd "portfolio website"
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Your portfolio will open automatically at `http://localhost:3000`

---

## 🎯 Essential Customizations (First Things First)

### 1. Update Your Name & Title
**File:** [src/components/Hero.jsx](src/components/Hero.jsx)

Find the Hero section and change:
```jsx
<span className="block text-slate-100">Hi, I'm a</span>
<span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
  Data Scientist
</span>
```

### 2. Add Your Projects
**File:** [src/data/projects.js](src/data/projects.js)

Example project object:
```javascript
{
  id: 1,
  title: "Your Project Name",
  description: "What it does",
  problem: "The problem it solves",
  dataset: "Data source",
  techniques: ["ML Technique 1", "ML Technique 2"],
  tags: ["ML", "Data Science"],
  tools: ["Python", "TensorFlow"],
  github: "https://github.com/yourrepo",
  liveDemo: "https://your-demo.com",
  image: "https://image-url.com/image.jpg"
}
```

### 3. Update Skills
**File:** [src/data/skills.js](src/data/skills.js)

Update skill names, levels, descriptions, and icons:
```javascript
{
  name: "Python",
  level: 95,
  icon: "🐍",
  description: "Your description"
}
```

### 4. Add Contact Information
**File:** [src/components/Contact.jsx](src/components/Contact.jsx)

Update email and social links:
```jsx
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourprofile', icon: '🔗' },
  // ... more links
];
```

### 5. Update Footer
**File:** [src/components/Footer.jsx](src/components/Footer.jsx)

Change social media links and contact info.

---

## 🎨 Common Customizations

### Change Color Theme
Edit [tailwind.config.js](tailwind.config.js):
```javascript
colors: {
  primary: '#3b82f6',    // Main blue
  secondary: '#1e293b',  // Dark slate
  accent: '#6366f1',     // Indigo
}
```

### Add Resume Download
In [src/components/Hero.jsx](src/components/Hero.jsx), update the resume button:
```jsx
<a
  href="/your-resume.pdf"  // Add your PDF to public/
  download
  className="..."
>
  <Download size={20} />
  Resume
</a>
```

### Change Navigation Links
**File:** [src/components/Navbar.jsx](src/components/Navbar.jsx)

Update the sections array:
```jsx
const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact'];
```

---

## 📊 Project Card Structure

Each project needs this information:

| Field | Type | Example |
|-------|------|---------|
| `id` | Number | `1` |
| `title` | String | "Churn Prediction" |
| `description` | String | "ML model for customer churn" |
| `problem` | String | "Reduce churn by 15%" |
| `dataset` | String | "10K customer records" |
| `techniques` | Array | `["Random Forest", "XGBoost"]` |
| `tags` | Array | `["ML", "Data Science"]` |
| `tools` | Array | `["Python", "Scikit-learn"]` |
| `github` | URL String | "https://github.com/..." |
| `liveDemo` | URL String | "https://demo.com" |
| `image` | URL String | "https://unsplash.com/..." |

---

## 🚀 Deploy in 5 Minutes

### To Vercel (Easiest)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Git Repository"
4. Select your portfolio repo
5. Click Deploy

Done! Your site is live.

### To Netlify
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist/` folder
4. Done!

---

## 📱 Preview Sections

- **Navbar** - Always visible at top, smooth scroll navigation
- **Hero** - Full-screen introduction with CTA buttons
- **About** - Your background and focus areas
- **Projects** - Filterable grid of your work (6 sample projects)
- **Skills** - Categorized skills with progress bars
- **Timeline** - Your journey/milestones
- **Contact** - Email form and social links
- **Footer** - Footer links and back-to-top button

---

## ✅ Pre-Launch Checklist

- [ ] Updated all personal information
- [ ] Added 3-6 of your best projects
- [ ] Updated skills with your technologies
- [ ] Added resume PDF (optional)
- [ ] Updated social links (GitHub, LinkedIn, etc.)
- [ ] Tested on mobile (right-click → Inspect → Toggle device toolbar)
- [ ] Verified all links work
- [ ] Built project (`npm run build`)
- [ ] Deployed to hosting service

---

## 🆘 Quick Fixes

### Site looks weird/styles not loading
```bash
npm install
npm run dev
```

### Want to change a color?
Open [tailwind.config.js](tailwind.config.js) and update the color values.

### Want to add more projects?
Copy a project object in [src/data/projects.js](src/data/projects.js) and modify it.

### Want different fonts?
Update `fontFamily` in [tailwind.config.js](tailwind.config.js).

---

## 📈 Next Steps After Deployment

1. **Add Resume** - Add PDF to `public/resume.pdf`
2. **Google Analytics** - Track visitors (optional)
3. **Custom Domain** - Point domain to your site
4. **SEO Optimization** - Update meta tags
5. **Blog Section** - Add articles (optional)
6. **Email Integration** - Setup EmailJS or similar

---

## 🎓 Learning Path

After setup, explore:
- Modifying component styles
- Adding new sections
- Implementing dark mode
- Creating blog functionality
- Integrating backend API

---

**Questions?** Refer to the main [README.md](README.md) for detailed documentation.

**Ready to go?** Start customizing! 🚀
