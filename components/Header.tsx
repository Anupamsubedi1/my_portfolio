import React from 'react';
import { personalInfo } from '../data/cvData';

export default function Header() {
  return (
    <header className="text-center mb-12 pb-8 border-b-2 border-gray-300 dark:border-gray-600">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {personalInfo.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-3">
        {personalInfo.location}
      </p>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:text-base">
        <a 
          href={`mailto:${personalInfo.email}`}
          className="text-academic-blue-700 dark:text-academic-blue-400 hover:underline transition-colors"
        >
          {personalInfo.email}
        </a>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <a 
          href={`tel:${personalInfo.phone}`}
          className="text-academic-blue-700 dark:text-academic-blue-400 hover:underline transition-colors"
        >
          {personalInfo.phone}
        </a>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <a 
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-academic-blue-700 dark:text-academic-blue-400 hover:underline transition-colors"
        >
          LinkedIn
        </a>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <a 
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-academic-blue-700 dark:text-academic-blue-400 hover:underline transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
