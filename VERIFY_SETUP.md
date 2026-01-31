# 🔍 Environment Setup Verification

After running `npm install`, verify your setup is correct by checking this list.

## ✅ Installation Verification

### Step 1: Check Node.js & npm

```bash
node --version    # Should be v16 or higher
npm --version     # Should be v8 or higher
```

**Expected Output:**
```
v18.x.x (or higher)
9.x.x (or higher)
```

### Step 2: Verify Project Dependencies

```bash
npm list
```

**Essential packages that should appear:**
- react@18.2.0
- react-dom@18.2.0
- tailwindcss@3.3.0
- vite@4.4.9
- postcss@8.4.31

### Step 3: Check File Structure

Verify these directories exist:

```
✅ portfolio website/
   ✅ src/
      ✅ components/
         ✅ Navbar.jsx
         ✅ Hero.jsx
         ✅ About.jsx
         ✅ Projects.jsx
         ✅ Skills.jsx
         ✅ Timeline.jsx
         ✅ Contact.jsx
         ✅ Footer.jsx
      ✅ data/
         ✅ projects.js
         ✅ skills.js
      ✅ App.jsx
      ✅ main.jsx
      ✅ index.css
   ✅ public/
   ✅ index.html
   ✅ package.json
   ✅ vite.config.js
   ✅ tailwind.config.js
   ✅ postcss.config.js
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected:**
- ✅ Vite dev server starts
- ✅ Browser opens automatically
- ✅ URL: http://localhost:3000
- ✅ Page loads without errors

### Step 5: Check Browser Console

Open browser DevTools (F12):
1. Go to Console tab
2. Should see **no red errors**
3. May see some warnings (OK)

### Step 6: Verify UI Loads

On http://localhost:3000, you should see:

- [x] Navbar at top with logo
- [x] Hero section with large title
- [x] Profile image/icon area
- [x] About section visible on scroll
- [x] Projects grid with 6 cards
- [x] Skills section with progress bars
- [x] Timeline section
- [x] Contact form
- [x] Footer at bottom

### Step 7: Test Responsiveness

1. Press F12 (DevTools)
2. Click device toggle (mobile icon)
3. Select "iPhone 12" or similar
4. Page should be responsive:
   - Navbar hamburger menu appears
   - Content stacks vertically
   - All buttons/forms work
   - Text is readable

### Step 8: Test Navigation

Click navbar links:
- [x] Smooth scroll to sections
- [x] Active link highlights
- [x] Mobile menu collapses on link click

### Step 9: Test Interactive Elements

- [x] Hover on project cards - should lift
- [x] Hover on skill bars - should highlight
- [x] Click form inputs - should focus
- [x] Hover on buttons - should change color

### Step 10: Build for Production

```bash
npm run build
```

**Expected:**
- ✅ Build completes without errors
- ✅ `dist/` folder is created
- ✅ Contains HTML, CSS, JS files

---

## 🎯 Common Setup Issues & Fixes

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Port 3000 already in use"
**Solution:** 
```bash
npm run dev -- --port 3001
```

### Issue: Tailwind styles not loading
**Solution:**
1. Stop dev server (Ctrl+C)
2. Clear cache: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Restart: `npm run dev`

### Issue: Components not found (404 errors)
**Solution:**
1. Verify file structure matches above
2. Check file names (case-sensitive on Mac/Linux)
3. Ensure all components are properly exported

### Issue: Import errors in console
**Solution:**
1. Run `npm install` again
2. Check that all dependencies installed
3. Verify node_modules folder exists

### Issue: Hot reload not working
**Solution:**
1. Stop dev server
2. Run: `npm run dev`
3. If still broken, clear browser cache (Ctrl+Shift+Delete)

---

## 🚀 Performance Checks

### Bundle Size
```bash
npm run build
```

Then check the `dist/` folder size. Should be:
- ✅ Total < 500KB (gzipped)
- ✅ JavaScript < 300KB
- ✅ CSS < 100KB

### Development Speed
- ✅ `npm install` completes in < 2 minutes
- ✅ `npm run dev` starts in < 10 seconds
- ✅ Hot reload on save < 1 second
- ✅ Build completes in < 30 seconds

---

## 📋 Pre-Launch Verification Checklist

Before deploying, verify:

### Code Quality
- [ ] No console errors (F12 → Console)
- [ ] No console warnings
- [ ] All components render
- [ ] All links work

### Functionality
- [ ] Navigation works (all links)
- [ ] Mobile menu opens/closes
- [ ] Project filter buttons work
- [ ] Contact form validates
- [ ] Smooth scrolling works

### Responsiveness
- [ ] Mobile (< 640px) - looks good
- [ ] Tablet (640-1024px) - looks good
- [ ] Desktop (> 1024px) - looks good
- [ ] All text readable
- [ ] All buttons clickable

### Performance
- [ ] Page loads quickly
- [ ] Animations are smooth
- [ ] No lag on scroll
- [ ] Form submission fast

### Customization
- [ ] Your name appears
- [ ] Your projects show
- [ ] Your skills listed
- [ ] Your contact info visible
- [ ] Your social links work

---

## 🔧 Troubleshooting Commands

If something doesn't work, try these in order:

```bash
# 1. Clear npm cache
npm cache clean --force

# 2. Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Clear Vite cache and restart
rm -rf .vite
npm run dev

# 4. Build fresh
npm run build

# 5. Check for port conflicts
# On Windows:
netstat -ano | findstr :3000

# On Mac/Linux:
lsof -i :3000
```

---

## ✨ Optimization Verification

### CSS Optimization
- [x] Tailwind purges unused styles
- [x] CSS file minimal size
- [x] No unused classes

### JavaScript Optimization
- [x] Code splitting works
- [x] Lazy loading ready
- [x] No duplicate dependencies

### Image Optimization
- [x] Images use URLs (not local)
- [x] No bloated assets
- [x] Fast loading

### Production Build
- [x] Minified HTML
- [x] Minified CSS
- [x] Minified JavaScript
- [x] Source maps (if needed)

---

## 📊 Setup Success Metrics

You're all set if:

| Metric | Status |
|--------|--------|
| npm install succeeds | ✅ |
| npm run dev starts | ✅ |
| Website loads at localhost:3000 | ✅ |
| No console errors | ✅ |
| All sections visible | ✅ |
| Mobile responsive | ✅ |
| Build completes successfully | ✅ |

---

## 🎉 Next Steps

If all checks pass:

1. ✅ Customize your information
2. ✅ Add your projects
3. ✅ Update your skills
4. ✅ Test everything works
5. ✅ Run `npm run build`
6. ✅ Deploy to Vercel/Netlify
7. ✅ Share your portfolio!

If checks failed:
1. ✅ Review troubleshooting section above
2. ✅ Check [SETUP.md](SETUP.md) for detailed help
3. ✅ Review [README.md](README.md) for common issues

---

## 📞 Support

If setup still doesn't work:

1. Check [SETUP.md](SETUP.md) - Detailed setup guide
2. Check [README.md](README.md#-troubleshooting) - Troubleshooting
3. Run `npm run dev --verbose` for detailed output
4. Check Node.js version matches requirements

---

**Setup verification complete!** ✅

Your portfolio is ready. [Start customizing →](QUICKSTART.md)
