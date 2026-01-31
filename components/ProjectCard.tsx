import React from 'react';

interface ProjectCardProps {
  title: string;
  links?: { label: string; url: string }[];
  items?: string[];
}

export default function ProjectCard({ title, links, items }: ProjectCardProps) {
  return (
    <div className="mb-6 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-academic-blue-700 dark:text-academic-blue-400 hover:underline text-sm"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
      
      {items && items.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
