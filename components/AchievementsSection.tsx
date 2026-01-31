'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Star, 
  Heart, 
  Users, 
  Target, 
  MessageCircle, 
  Ear, 
  TrendingUp,
  Globe,
  Brain,
  BookOpen,
  Footprints,
  Trophy
} from 'lucide-react';
import { additionalSkills, interests } from '../data/cvData';

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const softSkillsData = [
    { icon: Users, label: 'Teamwork', color: 'from-blue-500 to-blue-600' },
    { icon: Target, label: 'Leadership', color: 'from-purple-500 to-purple-600' },
    { icon: MessageCircle, label: 'Communication', color: 'from-indigo-500 to-indigo-600' },
    { icon: Ear, label: 'Active Listening', color: 'from-cyan-500 to-cyan-600' },
    { icon: TrendingUp, label: 'Growth Mindset', color: 'from-teal-500 to-teal-600' },
  ];

  const interestsData = [
    { icon: Brain, label: 'ML Research', color: 'from-pink-500 to-rose-500' },
    { icon: BookOpen, label: 'Reading', color: 'from-purple-500 to-pink-500' },
    { icon: Footprints, label: 'Running', color: 'from-orange-500 to-red-500' },
    { icon: Trophy, label: 'Football', color: 'from-green-500 to-emerald-500' },
    { icon: Trophy, label: 'Cricket', color: 'from-blue-500 to-cyan-500' },
  ];

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
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
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
                Skills & Interests
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Additional Skills */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Skills & Languages
                </h3>
              </div>
              <div className="space-y-6">
                {/* Languages */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={18} className="text-blue-600 dark:text-blue-400" />
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Languages</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pl-6">{additionalSkills.languages}</p>
                </div>
                
                {/* Soft Skills */}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Soft Skills</p>
                  <div className="grid grid-cols-2 gap-3">
                    {softSkillsData.map((skill, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50"
                      >
                        <div className={`p-1.5 bg-gradient-to-br ${skill.color} rounded-lg`}>
                          <skill.icon size={14} className="text-white" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{skill.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 border border-pink-100 dark:border-pink-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Interests
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {interestsData.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50"
                  >
                    <div className={`p-2.5 bg-gradient-to-br ${interest.color} rounded-xl`}>
                      <interest.icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {interest.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
