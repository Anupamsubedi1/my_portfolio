'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Zap, MessageSquare, TrendingUp } from 'lucide-react';
import { researchInterests } from '../data/cvData';

const iconMap: { [key: string]: any } = {
  heart: Heart,
  zap: Zap,
  message: MessageSquare,
  trending: TrendingUp,
};

export default function ResearchSection() {
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
    <section id="research" ref={ref} className="py-20 bg-white dark:bg-gray-900">
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
                Research Interests
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {researchInterests.description}
            </p>
          </motion.div>

          {/* Research Areas Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {researchInterests.areas.map((area, index) => {
              const Icon = iconMap[area.icon] || Heart;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-blue-100 dark:border-blue-800"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
