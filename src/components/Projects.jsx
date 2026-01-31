import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { projects, filterOptions } from '../data/projects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.some(tag => tag.includes(activeFilter)));

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-100">Featured Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Showcasing my ML, Data Science, and Full-Stack projects with real-world impact
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group bg-slate-800 border border-slate-700 hover:border-blue-400 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Title and Tags */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Problem Statement */}
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <p className="text-xs font-semibold text-blue-400 mb-1">Problem</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
                </div>

                {/* Dataset Info */}
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Dataset:</span> {project.dataset}
                </div>

                {/* Techniques */}
                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-2">Techniques</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techniques.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techniques.length > 3 && (
                      <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600">
                        +{project.techniques.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Tools Used */}
                <div className="text-xs text-slate-400 pb-3 border-b border-slate-700">
                  <span className="font-semibold text-slate-300">Tools:</span> {project.tools.join(', ')}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <a
                    href={project.github}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-blue-500 text-slate-300 hover:text-white rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.liveDemo}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
