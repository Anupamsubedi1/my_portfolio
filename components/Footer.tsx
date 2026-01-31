'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Facebook, MapPin, Phone, Heart } from 'lucide-react';
import { personalInfo } from '../data/cvData';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/profile/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Education', 'Skills', 'Projects', 'Research'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Mail size={18} />
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Phone size={18} />
                  {personalInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                {personalInfo.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href={personalInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Facebook size={20} />
          </motion.a>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Mail size={20} />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-red-500" /> by {personalInfo.name}
          </p>
          <p className="mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
