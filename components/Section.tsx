import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </section>
  );
}
