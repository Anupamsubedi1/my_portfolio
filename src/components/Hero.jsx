import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full">
                <p className="text-blue-300 text-sm font-medium">Welcome to my portfolio</p>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-slate-100">Hi, I'm a</span>
                <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Data Scientist
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 font-light">
                Machine Learning Enthusiast & Full-Stack Developer
              </p>

              <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                Computer Science Undergraduate focused on leveraging data-driven insights to solve real-world problems. Passionate about ML research, statistical analysis, and building scalable solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                View Projects
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#"
                className="px-8 py-3 border-2 border-slate-400 hover:border-blue-400 text-slate-300 hover:text-blue-400 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Resume
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-700">
              <div>
                <p className="text-3xl font-bold text-blue-400">6+</p>
                <p className="text-slate-400">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-400">95%</p>
                <p className="text-slate-400">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">3+</p>
                <p className="text-slate-400">Technologies</p>
              </div>
            </div>
          </div>

          {/* Illustration / Image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 blur-2xl animate-bounce"></div>
                <div className="absolute text-6xl">📊</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-bounce">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
