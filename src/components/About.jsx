import React from 'react';
import { Code2, Database, Zap } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Database,
      title: "Data-Driven Problem Solving",
      description: "Leverage statistical analysis and ML to extract actionable insights from complex datasets"
    },
    {
      icon: Zap,
      title: "ML Research & Development",
      description: "Explore cutting-edge algorithms, transformers, and deep learning architectures"
    },
    {
      icon: Code2,
      title: "Full-Stack Implementation",
      description: "Build end-to-end solutions from data pipeline to production deployment"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-100">About Me</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Passionate about transforming raw data into meaningful insights through rigorous statistical analysis and machine learning
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-100">
                Computer Science Undergraduate
              </h3>
              <p className="text-slate-300 leading-relaxed">
                I'm passionate about data science and machine learning, with a strong foundation in computer science fundamentals. My journey has taken me through diverse projects spanning classification, deep learning, NLP, and full-stack development.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-100">My Focus Areas</h4>
              <ul className="space-y-3">
                {[
                  "Statistical modeling and hypothesis testing",
                  "Building robust ML pipelines with feature engineering",
                  "Deep learning applications in computer vision and NLP",
                  "Translating research into production systems"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-slate-300 italic pt-4 border-t border-slate-700">
              "The best way to predict the future is to build it with data."
            </p>
          </div>

          {/* Image / Visual */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-xl p-8 border border-slate-700 hover:border-blue-400/50 transition-colors">
              <div className="text-5xl mb-4">🎓</div>
              <h4 className="text-xl font-semibold text-slate-100 mb-2">Education</h4>
              <p className="text-slate-400">B.S. in Computer Science | Focus: AI & Machine Learning</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-xl p-8 border border-slate-700 hover:border-indigo-400/50 transition-colors">
              <div className="text-5xl mb-4">🚀</div>
              <h4 className="text-xl font-semibold text-slate-100 mb-2">Experience</h4>
              <p className="text-slate-400">ML Projects | Data Analysis | Full-Stack Development</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-colors">
              <div className="text-5xl mb-4">💡</div>
              <h4 className="text-xl font-semibold text-slate-100 mb-2">Philosophy</h4>
              <p className="text-slate-400">Data-driven decisions, continuous learning, and innovation</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-400 rounded-xl p-8 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-indigo-400 transition-colors" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
