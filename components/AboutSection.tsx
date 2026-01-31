'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Target, Sparkles } from 'lucide-react';
import { profile } from '../data/cvData';

export default function AboutSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900">
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
                About Me
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <User className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Who I Am
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {profile}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights Cards */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Target className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Research Focus
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Machine learning and data-driven systems with emphasis on practical applications
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Current Status
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Final-year BSc CSIT student | Strong academic foundation | Ready for collaborative research
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
