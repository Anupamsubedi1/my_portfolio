'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check current state from localStorage and DOM
    const savedMode = localStorage.getItem('darkMode');
    const currentDark = document.documentElement.classList.contains('dark');
    
    console.log('Initial dark mode check:', { savedMode, currentDark });
    
    setIsDark(currentDark);
  }, []);

  const toggle = () => {
    const newDarkMode = !isDark;
    
    console.log('Toggling dark mode to:', newDarkMode);
    
    setIsDark(newDarkMode);
    
    // Update localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Update DOM - force the change
    const htmlElement = document.documentElement;
    if (newDarkMode) {
      htmlElement.classList.add('dark');
      console.log('Added dark class. Classes:', htmlElement.className);
    } else {
      htmlElement.classList.remove('dark');
      console.log('Removed dark class. Classes:', htmlElement.className);
    }
  };

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 p-3 rounded-full bg-gray-200 shadow-lg z-[100] w-[52px] h-[52px]" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow-lg z-[100] hover:scale-110"
      aria-label="Toggle dark mode"
      type="button"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
