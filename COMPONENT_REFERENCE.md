# Component Reference Guide

## Overview

This guide documents all components, their props, and customization options.

---

## 🎯 Navbar Component

**File:** `src/components/Navbar.jsx`

### Features
- Sticky positioning at top
- Responsive hamburger menu on mobile
- Active section highlighting
- Smooth scroll navigation
- Dynamic background blur on scroll

### Customization

**Change navigation links:**
```jsx
const sections = ['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Contact'];
```

**Change logo text:**
```jsx
<a href="#home" className="text-2xl font-bold ...">
  YOUR LOGO TEXT
</a>
```

**Change CTA button:**
```jsx
<a href="#contact" className="...">
  Your Text
</a>
```

### Styling Props
- Primary color: `blue-400` / `blue-500`
- Hover effects: All transitions 300ms
- Mobile breakpoint: `md:` (768px)

---

## 🦸 Hero Component

**File:** `src/components/Hero.jsx`

### Sections
1. **Content Area**
   - Name/title display
   - Subtitle & introduction
   - Two CTA buttons
   - Stats display

2. **Visual Area**
   - Animated gradient background
   - Icon display (emoji)
   - Responsive visibility

### Key Elements to Customize

**Main Title:**
```jsx
<h1 className="text-5xl md:text-7xl font-bold leading-tight">
  <span className="block text-slate-100">Hi, I'm a</span>
  <span className="block bg-gradient-to-r ...">
    YOUR TITLE
  </span>
</h1>
```

**Subtitle:**
```jsx
<p className="text-xl md:text-2xl text-slate-400 font-light">
  YOUR SUBTITLE
</p>
```

**Description:**
```jsx
<p className="text-slate-300 text-lg leading-relaxed max-w-lg">
  YOUR DESCRIPTION
</p>
```

**CTA Buttons:**
```jsx
<button onClick={() => scrollToSection('projects')}>
  View Projects
</button>

<a href="#resume-link">
  <Download size={20} />
  Resume
</a>
```

**Stats:**
```jsx
<div className="grid grid-cols-3 gap-4 pt-8">
  <div>
    <p className="text-3xl font-bold text-blue-400">6+</p>
    <p className="text-slate-400">Projects</p>
  </div>
  {/* More stats... */}
</div>
```

### Colors
- Gradient: `from-blue-400 to-indigo-600`
- Text: `slate-100`, `slate-300`, `slate-400`
- Accent: `blue-500`, `indigo-400`

---

## ℹ️ About Component

**File:** `src/components/About.jsx`

### Sections
1. **Text Content** - Background & focus areas
2. **Info Cards** - Education, experience, philosophy

### Customize Highlights

```jsx
const highlights = [
  {
    icon: Database,
    title: "Your Title",
    description: "Your description"
  },
  // ...
];
```

**Update bullet points:**
```jsx
{
  "Statistical modeling and hypothesis testing",
  "Your achievement",
  // ...
}
```

**Info Cards:**
```jsx
<div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 ...">
  <div className="text-5xl mb-4">🎓</div>
  <h4 className="text-xl font-semibold ...">Your Title</h4>
  <p className="text-slate-400">Your description</p>
</div>
```

### Available Icons (Lucide React)
- `Database` - For data/analytics
- `Code2` - For development
- `Zap` - For performance/speed
- `BookOpen` - For learning
- `Award` - For achievements

---

## 📊 Projects Component

**File:** `src/components/Projects.jsx`

### Features
- Filterable grid
- Project cards with images
- Multiple action buttons
- Status badges/tags

### Data Structure

```javascript
{
  id: 1,
  title: "Project Name",
  description: "Short description",
  problem: "Problem being solved",
  dataset: "Data source info",
  techniques: ["Technique 1", "Technique 2", ...],
  tags: ["ML", "Data Science"],
  tools: ["Python", "TensorFlow"],
  github: "https://github.com/link",
  liveDemo: "https://demo.com",
  image: "https://image-url.jpg"
}
```

### Customize Filter Options

**File:** `src/data/projects.js`
```javascript
export const filterOptions = ["All", "Data Science", "ML", "Full-Stack", ...];
```

### Add New Project

In `src/data/projects.js`:
```javascript
{
  id: 7,
  title: "Your Project",
  description: "What it does",
  problem: "What problem it solves",
  dataset: "Data source",
  techniques: ["Tech 1", "Tech 2"],
  tags: ["ML", "Data Science"],
  tools: ["Python", "Library"],
  github: "https://your-repo",
  liveDemo: "https://your-demo",
  image: "https://image-url.jpg"
}
```

### Image Sources
- Unsplash: `https://images.unsplash.com/photo-XXX?w=500&h=300&fit=crop`
- Pexels: `https://images.pexels.com/...`
- Custom: Upload to `public/` folder

---

## 🎯 Skills Component

**File:** `src/components/Skills.jsx`

### Data Structure

```javascript
{
  primary: {
    title: "Primary Skills Title",
    skills: [
      {
        name: "Skill Name",
        level: 95,           // 0-100
        icon: "🐍",         // Emoji
        description: "What this is"
      },
      // ...
    ]
  },
  secondary: { ... },
  tools: { ... }
}
```

### Customize Skills

**File:** `src/data/skills.js`

```javascript
export const skillsData = {
  primary: {
    title: "Your Category Title",
    skills: [
      {
        name: "Python",
        level: 95,
        icon: "🐍",
        description: "Primary programming language"
      },
      // Add more skills...
    ]
  }
};
```

### Progress Bar Animation
- Smooth on hover
- Color gradient
- Responsive width

### Emojis for Skills
- Languages: 🐍 🟡 ⚙️ 🔗
- Tools: 📊 💾 🖥️ 📚
- Frameworks: ⚛️ 🟢 📦 🎨
- Concepts: 🤖 ⚡ 🔬 🎓

### Achievement Stats
```jsx
<div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
<p className="text-slate-300 font-medium">Kaggle Datasets</p>
<p className="text-slate-400 text-sm mt-2">Description</p>
```

---

## 📅 Timeline Component

**File:** `src/components/Timeline.jsx`

### Timeline Item Structure

```javascript
{
  year: "2020",
  title: "Event Title",
  description: "What happened",
  icon: "🎓"
}
```

### Customize Timeline

```jsx
const timeline = [
  {
    year: "2025",
    title: "Your Milestone",
    description: "Details about this milestone",
    icon: "⭐"
  },
  // ...
];
```

### Milestone Cards at Bottom

```jsx
<div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
<p className="text-slate-300 font-medium">Achievement Name</p>
<p className="text-slate-400 text-sm mt-2">Description</p>
```

### Timeline Icons
- 🎓 Education
- 📊 Data/Projects
- ⚡ Breakthrough
- 🚀 Launch
- 🔬 Research
- ⭐ Achievement

### Desktop vs Mobile
- Desktop: Alternating left/right layout
- Mobile: Single column with vertical line

---

## 📧 Contact Component

**File:** `src/components/Contact.jsx`

### Form Fields

```jsx
{
  name: '',      // Text input
  email: '',     // Email input
  message: ''    // Textarea (min 10 chars)
}
```

### Validation Rules

```javascript
const validateForm = () => {
  // Name: Not empty
  // Email: Valid email format
  // Message: Min 10 characters
}
```

### Status States
- `''` - Default
- `'loading'` - Sending
- `'success'` - Sent successfully
- `'error'` - Validation error

### Update Email

```jsx
{ name: 'Email', url: 'mailto:your-email@example.com', icon: '✉️' }
```

### Add More Social Links

```javascript
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/profile', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/profile', icon: '💼' },
  // Add more...
];
```

### Customize Form Submission

Replace the form submission logic with:
- EmailJS
- Formspree
- Custom backend API
- Netlify Forms

---

## 🔗 Footer Component

**File:** `src/components/Footer.jsx`

### Sections
1. About section
2. Quick links
3. Social media links
4. Copyright & back-to-top

### Update Quick Links

```jsx
{['Home', 'About', 'Projects', 'Skills', 'Contact'].map((link) => (
  <li key={link}>
    <a href={`#${link.toLowerCase()}`}>
      {link}
    </a>
  </li>
))}
```

### Update Social Links

```javascript
const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/your-profile' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
  { icon: Mail, label: 'Email', url: 'mailto:your-email@example.com' }
];
```

### Copyright Year
- Automatically updates using `new Date().getFullYear()`

---

## 🎨 Tailwind CSS Classes Reference

### Colors Used
```
Slate: slate-100 (lightest) to slate-950 (darkest)
Blue: blue-400 to blue-600
Indigo: indigo-400 to indigo-600
Cyan: cyan-400
```

### Common Patterns
```jsx
// Gradient text
className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent"

// Hover border color
className="border border-slate-700 hover:border-blue-400"

// Responsive padding
className="p-6 md:p-8 lg:p-10"

// Hover lift effect
className="hover:shadow-xl hover:shadow-blue-500/20"

// Smooth transitions
className="transition-all duration-300"

// Animated gradient background
className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10"
```

### Responsive Breakpoints
- `sm:` - 640px (tablet)
- `md:` - 768px (tablet/desktop)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (wide desktop)

### Common Utilities
- Flexbox: `flex`, `flex-col`, `items-center`, `justify-between`
- Grid: `grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`
- Spacing: `mb-4`, `px-6`, `py-3`, `gap-8`
- Text: `text-xl`, `font-bold`, `font-semibold`, `leading-relaxed`

---

## 🔄 Animations

**Defined in:** `src/index.css` and `tailwind.config.js`

### Available Animations
```jsx
className="animate-fade-in"      // Fade in effect
className="animate-slide-up"     // Slide up from bottom
className="animate-scroll-bounce" // Scroll indicator bounce
```

### Animation Delays
```jsx
style={{ animationDelay: `${idx * 0.1}s` }}
```

### Custom Animations
Add to `src/index.css`:
```css
@keyframes customAnimation {
  from { /* initial state */ }
  to { /* final state */ }
}
```

Then use with `animate-customAnimation`.

---

## 📱 Responsive Design Patterns

### Mobile-First Stack
```jsx
className="flex flex-col md:flex-row"
// Mobile: vertical stack
// Tablet+: horizontal row
```

### Grid Responsive
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
```

### Hidden Elements
```jsx
className="hidden md:flex"     // Hide on mobile, show on tablet+
className="md:hidden"          // Show on mobile, hide on tablet+
```

---

## 🎯 Color Customization Quick Reference

### Update Global Colors

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',    // Main blue
      secondary: '#1e293b',  // Dark slate
      accent: '#6366f1',     // Indigo accent
    }
  }
}
```

### Component-Level Colors
- Backgrounds: `bg-slate-700`, `bg-slate-800`, `bg-slate-900`
- Text: `text-slate-100`, `text-slate-300`, `text-slate-400`
- Accent: `text-blue-400`, `text-indigo-400`
- Hover: `hover:bg-blue-500`, `hover:text-blue-400`

---

## ✨ Summary Table

| Component | File | Purpose |
|-----------|------|---------|
| Navbar | `components/Navbar.jsx` | Navigation & branding |
| Hero | `components/Hero.jsx` | Landing/intro section |
| About | `components/About.jsx` | Background info |
| Projects | `components/Projects.jsx` | Portfolio showcase |
| Skills | `components/Skills.jsx` | Technical abilities |
| Timeline | `components/Timeline.jsx` | Journey/milestones |
| Contact | `components/Contact.jsx` | Contact form |
| Footer | `components/Footer.jsx` | Footer/links |

---

**Next:** Check [QUICKSTART.md](QUICKSTART.md) for quick customization!
