import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = ['Home', 'About', 'Projects', 'Skills', 'Timeline', 'Contact'];

  const handleNavClick = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section.toLowerCase());
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-slate-900/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              DS Portfolio
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`transition-colors duration-300 font-medium text-sm ${
                  activeSection === section.toLowerCase()
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                {section}
              </button>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300"
              >
                {section}
              </button>
            ))}
            <a
              href="#contact"
              className="block w-full text-left px-4 py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
