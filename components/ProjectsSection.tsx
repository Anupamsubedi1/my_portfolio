'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, FileText, Folder } from 'lucide-react';
import { academicProjects } from '../data/cvData';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return Github;
      case 'demo':
        return ExternalLink;
      case 'document':
        return FileText;
      default:
        return ExternalLink;
    }
  };

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {academicProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800"
              >
                {/* Project Header */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                      <Folder className="text-white" size={24} />
                    </div>
                    {project.links && (
                      <div className="flex gap-2">
                        {project.links.map((link, linkIndex) => {
                          const Icon = getLinkIcon(link.type || 'default');
                          return (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors text-gray-600 dark:text-gray-400"
                              title={link.label}
                            >
                              <Icon size={18} />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Items */}
                  {project.items && (
                    <ul className="space-y-2">
                      {project.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Links */}
                  {project.links && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            {link.label}
                            <ExternalLink size={14} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
