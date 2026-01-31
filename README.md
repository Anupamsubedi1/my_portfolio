# Data Science Portfolio Website

A modern, fully responsive personal portfolio website built with React, Tailwind CSS, and Vite. Showcasing Data Science, Machine Learning, and Full-Stack Development projects.

## 🎯 Features

### ✨ Core Features
- **Sticky Navigation Bar** - With smooth scroll and active link highlighting
- **Hero Section** - Eye-catching landing with CTA buttons
- **About Section** - Professional introduction with key highlights
- **Projects Showcase** - Filterable project cards with tags, descriptions, and links
- **Skills Section** - Three-tier skill display with progress bars
- **Timeline** - Journey visualization from education to current work
- **Contact Form** - Client-side validation and status feedback
- **Responsive Footer** - Social links and quick navigation

### 🎨 Design Highlights
- **Mobile-First Responsive Design** - Optimized for all screen sizes
- **Dark Mode Theme** - Professional slate/indigo color palette
- **Smooth Animations** - Fade-in and slide-up animations
- **Interactive Components** - Hover effects, transitions, and micro-interactions
- **Professional Typography** - Clean, readable layout with strong hierarchy
- **Accessible Design** - WCAG compliant with proper semantic HTML

### ⚡ Technical Stack
- **React 18** - Functional components with hooks
- **Tailwind CSS 3** - Utility-first styling
- **Vite 4** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library
- **ES6+ JavaScript** - Modern JavaScript features

## 📁 Project Structure

```
portfolio website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation with mobile menu
│   │   ├── Hero.jsx            # Full-screen hero section
│   │   ├── About.jsx           # About me section
│   │   ├── Projects.jsx        # Filterable projects grid
│   │   ├── Skills.jsx          # Skills with progress bars
│   │   ├── Timeline.jsx        # Journey timeline
│   │   ├── Contact.jsx         # Contact form with validation
│   │   └── Footer.jsx          # Footer with social links
│   ├── data/
│   │   ├── projects.js         # Projects data array
│   │   └── skills.js           # Skills data structure
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles and animations
├── public/                      # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── .gitignore                  # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
```bash
cd "portfolio website"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:3000`

### Development

- **Dev Server** - Hot module replacement (HMR) for instant updates
```bash
npm run dev
```

- **Build for Production**
```bash
npm run build
```

- **Preview Production Build**
```bash
npm run preview
```

## 🎨 Customization

### Update Your Information

#### Hero Section ([src/components/Hero.jsx](src/components/Hero.jsx))
- Change name, title, and subtitle
- Update CTA button links
- Modify stats or remove as needed

#### About Section ([src/components/About.jsx](src/components/About.jsx))
- Update your background information
- Modify focus areas and highlights

#### Projects ([src/data/projects.js](src/data/projects.js))
- Add/edit project objects with:
  - `title`, `description`, `problem`
  - `dataset`, `techniques`, `tools`
  - `tags`, `github`, `liveDemo`, `image`

#### Skills ([src/data/skills.js](src/data/skills.js))
- Update skill names and proficiency levels (0-100)
- Add descriptions and icons
- Organize into categories (primary, secondary, tools)

#### Contact Form ([src/components/Contact.jsx](src/components/Contact.jsx))
- Update email address
- Add social media links
- Modify form validation rules

#### Timeline ([src/components/Timeline.jsx](src/components/Timeline.jsx))
- Update timeline events and dates
- Change descriptions and icons
- Add/remove milestone statistics

### Color Scheme Customization

Edit [tailwind.config.js](tailwind.config.js):

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
    }
  }
}
```

### Typography

Tailwind includes Inter font by default. To use custom fonts:

1. Add font import in [src/index.css](src/index.css)
2. Update `fontFamily` in `tailwind.config.js`

## 📱 Responsive Breakpoints

The design uses Tailwind's responsive prefixes:

- **Mobile**: Default styling (< 640px)
- **sm**: ≥ 640px
- **md**: ≥ 768px (tablet)
- **lg**: ≥ 1024px (desktop)
- **xl**: ≥ 1280px (wide desktop)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Focus-visible states
- Color contrast compliance
- Keyboard navigation support
- Alt text for images

## 📈 SEO

- Meta tags in [index.html](index.html)
- Semantic HTML elements
- Descriptive headings structure
- Open Graph support (ready to add)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Deploy with one click

3. **Configure custom domain**
   - Add domain in Vercel project settings
   - Update DNS records as instructed

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy**
   - Drag and drop the `dist/` folder to Netlify
   - Or connect GitHub for auto-deployment

### Deploy to GitHub Pages

1. **Update `vite.config.js`**
```javascript
export default {
  base: '/portfolio-website/',
  // ... rest of config
}
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Add deploy scripts to `package.json`**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. **Deploy**
```bash
npm run deploy
```

## 🔧 Advanced Customization

### Add Dark/Light Mode Toggle

1. Add state management for theme
2. Update Tailwind `tailwind.config.js` to use `darkMode: 'class'`
3. Toggle `dark` class on document root

### Add More Animations

Edit custom keyframes in:
- [src/index.css](src/index.css)
- [tailwind.config.js](tailwind.config.js)

### Integrate Email Service

Replace form submission in [src/components/Contact.jsx](src/components/Contact.jsx) with:
- EmailJS
- Formspree
- SendGrid
- Custom backend API

### Add Blog Section

Create new component:
- [src/components/Blog.jsx](src/components/Blog.jsx)
- Add blog data structure
- Implement markdown rendering

## 📦 Performance Optimization

- Lazy loading for images
- Code splitting with React.lazy()
- Optimized bundle size
- CSS tree-shaking with Tailwind
- Minification and compression

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling Issues
```bash
# Ensure Tailwind is scanning all files
# Check tailwind.config.js content paths
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide React Icons](https://lucide.dev)
- [Web.dev - Web Vitals](https://web.dev/vitals/)

## 📄 License

This project is open source and available for personal and commercial use.

## 💬 Support

For questions or issues:
1. Check the troubleshooting section
2. Review component documentation in code comments
3. Visit official documentation for dependencies
4. Create an issue on GitHub

## 🎓 Learning Resources Used

- React Hooks and Functional Components
- Tailwind CSS Utility-First Workflow
- Responsive Design Principles
- Web Accessibility Standards
- Modern JavaScript (ES6+)
- Component Composition Patterns

---

**Built with ❤️ for showcasing Data Science and ML projects**

Happy coding! 🚀
#   m y _ p o r t f o l i o  
 