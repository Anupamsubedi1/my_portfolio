# Anupam Subedi - Academic Portfolio

A professional, clean, and academic portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases academic achievements, projects, skills, and experience extracted directly from a LaTeX CV.

## Features

✅ **Professional Academic Design** - Clean layout suitable for professors and MS/PhD applications  
✅ **Dark Mode Toggle** - Seamless light/dark theme switching with localStorage persistence  
✅ **Fully Responsive** - Optimized for mobile, tablet, and desktop viewing  
✅ **SEO Optimized** - Meta tags, Open Graph tags, and semantic HTML  
✅ **TypeScript** - Type-safe code with full TypeScript support  
✅ **Tailwind CSS** - Modern, utility-first styling  
✅ **Accessible** - Proper semantic HTML and ARIA labels  
✅ **Single-Page Scrollable** - Easy navigation through all sections  

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Static export (can be deployed anywhere)

## Sections Included

1. **Header** - Name, location, contact information with clickable links
2. **Profile** - Academic background and research interests
3. **Education** - Detailed educational history
4. **Technical Skills** - Programming languages, ML frameworks, and tools
5. **Academic Projects** - Major projects with live links
6. **Participation and Volunteering** - Community involvement
7. **Academic Records and Scholarships** - Academic achievements
8. **Additional Skills** - Languages and soft skills
9. **Interests** - Personal and professional interests

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main portfolio page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Header with contact info
│   ├── Section.tsx      # Reusable section component
│   ├── ProjectCard.tsx  # Project display card
│   └── DarkModeToggle.tsx # Theme switcher
├── data/
│   └── cvData.ts        # All CV content (single source of truth)
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Customization

All content is stored in `data/cvData.ts`. To update your portfolio:

1. Edit the data in `data/cvData.ts`
2. The changes will automatically reflect across the site
3. No need to modify components

## Deployment

This project is configured for static export and can be deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Build Static Export

```bash
npm run build
```

The static files will be in the `out/` directory.

## Design Principles

- **Academic Aesthetic**: Neutral colors, professional typography
- **Readability First**: Ample white space, clear hierarchy
- **Accessibility**: Semantic HTML, proper contrast ratios
- **Performance**: Optimized builds, minimal JavaScript
- **Mobile-First**: Responsive design that works on all devices

## Color Scheme

The portfolio uses a professional academic blue color palette:

- Light Mode: White background with dark blue text
- Dark Mode: Dark gray background with light text
- Accent: Academic blue (#334e68 and variants)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2026 Anupam Subedi. All rights reserved.

## Contact

- **Email**: anupamsubedi542@gmail.com
- **LinkedIn**: [linkedin.com/in/anupam-subedi-773719346](https://www.linkedin.com/in/anupam-subedi-773719346/)
- **GitHub**: [github.com/Anupamsubedi1](https://github.com/Anupamsubedi1)

---

Built with ❤️ using Next.js and TypeScript
