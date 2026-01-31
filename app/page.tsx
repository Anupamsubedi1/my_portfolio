'use client';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
