import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResearchSection from '../components/ResearchSection';
import AchievementsSection from '../components/AchievementsSection';
import TravelGallery from '../components/TravelGallery';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgress from '../components/ScrollProgress';

// NOTE: this file must stay a SERVER component - no 'use client' here.
// Next.js only allows `export const metadata` from server components, so adding
// that directive would silently drop the page-level SEO below. Every section
// component declares its own 'use client', so the animations still work.

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
  description:
    'Anupam Subedi is an ML Enthusiast and Full Stack Developer from Kathmandu, Nepal. Explore machine learning projects, research interests, technical skills, and contact details.',
  keywords: [
    'Anupam Subedi',
    'ML Enthusiast',
    'Full Stack Developer',
    'Machine Learning Nepal',
    'Portfolio',
    'Kathmandu Developer',
    'Next.js Developer',
    'React Developer',
    'Python Developer',
  ],
  authors: [{ name: 'Anupam Subedi', url: 'https://anupamsubedi.com.np' }],
  creator: 'Anupam Subedi',
  publisher: 'Anupam Subedi',
  alternates: {
    canonical: 'https://anupamsubedi.com.np',
  },
  openGraph: {
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
    description:
      'Explore the portfolio of Anupam Subedi, including ML projects, web development work, research interests, education, and contact information.',
    url: 'https://anupamsubedi.com.np',
    siteName: 'Anupam Subedi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://anupamsubedi.com.np/profile/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Anupam Subedi portfolio preview',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
    description:
      'Portfolio of Anupam Subedi, showcasing machine learning, full stack development, and research interests.',
    images: ['https://anupamsubedi.com.np/profile/profile.jpeg'],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ScrollProgress />
      <DarkModeToggle />
      <ScrollToTop />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ResearchSection />
      <TravelGallery />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
