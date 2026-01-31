import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: Mail, label: 'Email', url: 'mailto:your-email@example.com' }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
              DS Portfolio
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Showcasing my journey in Data Science, Machine Learning, and Full-Stack Development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-slate-400 text-sm">
            © {currentYear} Data Science Portfolio. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
