import React from 'react';
import { skillsData } from '../data/skills';

const SkillCard = ({ skill, idx }) => {
  const percentage = skill.level;

  return (
    <div
      className="group bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-400 rounded-lg p-5 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${idx * 0.05}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-slate-100 font-semibold text-sm md:text-base">{skill.name}</h4>
          <p className="text-xs text-slate-400 mt-1">{skill.description}</p>
        </div>
        <span className="text-2xl">{skill.icon}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500 group-hover:from-indigo-400 group-hover:to-purple-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-right">{percentage}%</p>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-100">Technical Skills</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across Data Science, ML, and Full-Stack Development
          </p>
        </div>

        {/* Primary Skills */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
              {skillsData.primary.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsData.primary.skills.map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} idx={idx} />
            ))}
          </div>
        </div>

        {/* Secondary Skills */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
              {skillsData.secondary.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsData.secondary.skills.map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} idx={idx} />
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
              {skillsData.tools.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsData.tools.skills.map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} idx={idx} />
            ))}
          </div>
        </div>

        {/* Certifications / Achievements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <p className="text-4xl font-bold text-blue-400 mb-2">50+</p>
            <p className="text-slate-300 font-medium">Kaggle Datasets Explored</p>
            <p className="text-slate-400 text-sm mt-2">Active participation in data competitions</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
            <p className="text-4xl font-bold text-indigo-400 mb-2">100+</p>
            <p className="text-slate-300 font-medium">ML Models Trained</p>
            <p className="text-slate-400 text-sm mt-2">Various architectures and techniques</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-slate-700 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
            <p className="text-4xl font-bold text-cyan-400 mb-2">1000+</p>
            <p className="text-slate-300 font-medium">Hours of Practice</p>
            <p className="text-slate-400 text-sm mt-2">Continuous learning and experimentation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
