import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Timeline() {
  const timeline = [
    {
      year: "2020",
      title: "Started CS Journey",
      description: "Began my Computer Science degree with focus on algorithms and data structures",
      icon: "🎓"
    },
    {
      year: "2021",
      title: "Discovered Data Science",
      description: "Completed first ML course and built a customer segmentation project",
      icon: "📊"
    },
    {
      year: "2022",
      title: "Deep Learning Exploration",
      description: "Delved into CNNs, RNNs, and transformers for computer vision and NLP",
      icon: "⚡"
    },
    {
      year: "2023",
      title: "Full-Stack Development",
      description: "Built end-to-end applications combining backend APIs with React frontends",
      icon: "🚀"
    },
    {
      year: "2024",
      title: "ML Research Focus",
      description: "Researched advanced techniques in feature engineering and model optimization",
      icon: "🔬"
    },
    {
      year: "2025",
      title: "Portfolio Development",
      description: "Showcasing completed projects and preparing for industry roles",
      icon: "⭐"
    }
  ];

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-100">My Journey</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A timeline of my progression in Data Science and Full-Stack Development
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative animate-slide-up ${idx % 2 === 0 ? 'md:pr-1/2' : ''}`}>
                {/* Desktop Layout */}
                <div className={`hidden md:grid grid-cols-2 gap-8 items-start ${idx % 2 === 0 ? '' : 'grid-cols-2-reverse'}`}>
                  {/* Left Content (even) / Right Content (odd) */}
                  <div className={idx % 2 === 0 ? '' : 'order-2'}>
                    <div className="bg-slate-800 border border-slate-700 hover:border-blue-400 rounded-lg p-6 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{item.icon}</span>
                        <p className="text-blue-400 font-bold text-sm">{item.year}</p>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-blue-500/50">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50 text-xl">
                      {item.icon}
                    </div>
                    {idx !== timeline.length - 1 && (
                      <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-indigo-500 mt-2"></div>
                    )}
                  </div>

                  <div className="pb-8 pt-2">
                    <p className="text-blue-400 font-bold text-sm mb-2">{item.year}</p>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <p className="text-3xl font-bold text-blue-400 mb-2">20+</p>
            <p className="text-slate-300 font-medium">Projects Completed</p>
            <p className="text-slate-400 text-sm mt-2">Diverse domains and technologies</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
            <p className="text-3xl font-bold text-indigo-400 mb-2">5+</p>
            <p className="text-slate-300 font-medium">Years Learning</p>
            <p className="text-slate-400 text-sm mt-2">Continuous growth and development</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
            <p className="text-3xl font-bold text-cyan-400 mb-2">100%</p>
            <p className="text-slate-300 font-medium">Commitment</p>
            <p className="text-slate-400 text-sm mt-2">Dedicated to excellence and innovation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
