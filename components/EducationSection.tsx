'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { education } from '../data/cvData';

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="education" ref={ref} className="py-20 bg-white dark:bg-gray-900">
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
                Education
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />

            {/* Education Items */}
            <div className="space-y-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                        <GraduationCap className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>

                    {edu.grade && (
                      <div className="flex items-center gap-2 mb-4">
                        <Award size={16} className="text-yellow-600 dark:text-yellow-400" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {edu.grade}
                        </span>
                      </div>
                    )}

                    {edu.modules && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                          <BookOpen size={16} />
                          Key Modules
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.modules}
                        </p>
                      </div>
                    )}

                    {edu.dissertation && (
                      <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Dissertation
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.dissertation}
                        </p>
                      </div>
                    )}

                    {edu.subjects && (
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Subjects
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.subjects}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
