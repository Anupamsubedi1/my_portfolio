import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  useEffect(() => {
    // Add scroll behavior
    document.documentElement.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-slate-900 text-slate-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
