import Image from 'next/image';
import { ArrowDown, Facebook, Github, Linkedin, Mail } from 'lucide-react';
import HeroBackdrop from './HeroBackdrop';
import { personalInfo } from '../../data/cvData';

/**
 * SERVER COMPONENT - deliberately no 'use client'.
 *
 * Everything a crawler cares about (the <h1>, title, tagline, every link) is
 * emitted as plain HTML from the server with no JavaScript required. The
 * entrance animation is pure CSS for the same reason: a motion library here
 * would force this file to become a client component.
 *
 * The 3D scene is isolated in <HeroBackdrop />, the only part that skips SSR.
 * Layout matches the original hero: copy on the left, portrait on the right.
 */
export default function Hero() {
  const socials = [
    { href: personalInfo.github, label: 'GitHub', Icon: Github },
    { href: personalInfo.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: personalInfo.facebook, label: 'Facebook', Icon: Facebook },
  ];

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] pt-16"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Content side */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="hero-rise hero-delay-1 mb-3 sm:mb-4">
              <span className="inline-block rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                👋 Welcome to my portfolio
              </span>
            </div>

            <h1 className="hero-rise hero-delay-2 mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            <p className="hero-rise hero-delay-3 mb-3 px-2 text-lg font-medium text-slate-200 sm:mb-4 sm:px-0 sm:text-xl md:text-2xl lg:text-3xl">
              {personalInfo.title}
            </p>

            <p className="hero-rise hero-delay-4 mb-6 max-w-2xl px-2 text-sm text-slate-400 sm:mb-8 sm:px-0 sm:text-base md:text-lg lg:max-w-none">
              {personalInfo.tagline}
            </p>

            <div className="hero-rise hero-delay-5 mb-8 flex flex-wrap items-center justify-center gap-3 sm:mb-12 sm:gap-4 lg:justify-start">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-[0_0_28px_-8px_rgba(79,110,247,0.8)] transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:px-6 sm:py-3 sm:text-base"
              >
                <Mail size={18} className="sm:h-5 sm:w-5" />
                Get in Touch
              </a>

              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border-2 border-white/15 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:px-6 sm:py-3 sm:text-base"
                >
                  <Icon size={18} className="sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">{label}</span>
                </a>
              ))}
            </div>

            <div className="hero-rise hero-delay-5 flex justify-center lg:justify-start">
              <ArrowDown
                aria-hidden="true"
                size={28}
                className="animate-bounce text-slate-500 sm:h-8 sm:w-8"
              />
            </div>
          </div>

          {/* Portrait side */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <div className="hero-glow relative h-48 w-48 overflow-hidden rounded-full shadow-2xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                <Image
                  src="/profile/profile.jpeg"
                  alt={personalInfo.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 12rem, (max-width: 1024px) 16rem, 24rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
