import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Camera,
  ExternalLink,
  Facebook,
  FolderKanban,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import {
  additionalSkills,
  academicProjects,
  academicRecords,
  education,
  interests,
  personalInfo,
  profile,
  researchInterests,
  technicalSkills,
  participation,
} from '../data/cvData';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const travelPhotos = [
  '/travels/travel-1.jpg',
  '/travels/travel-2.jpg',
  '/travels/travel-3.jpg',
  '/travels/travel-4.jpg',
  '/travels/travel-5.jpg',
  '/travels/travel-6.jpg',
  '/travels/travel-7.jpg',
  '/travels/travel-8.jpg',
  '/travels/travel-9.jpg',
];

const softSkills = [
  'Teamwork',
  'Leadership',
  'Communication',
  'Active Listening',
  'Growth Mindset',
];

const socialLinks = [
  { label: 'GitHub', href: personalInfo.github, icon: Github },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: Linkedin },
  { label: 'Facebook', href: personalInfo.facebook, icon: Facebook },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
];

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
  description:
    'Anupam Subedi is an ML Enthusiast and Full Stack Developer from Kathmandu, Nepal. Explore machine learning projects, research interests, technical skills, and contact details.',
  keywords: [
    'Anupam Subedi',
    'ML Enthusiast',
    'Full Stack Developer',
    'Machine Learning Nepal',
    'Portfolio',
    'Kathmandu Developer',
    'Next.js Developer',
    'React Developer',
    'Python Developer',
  ],
  authors: [{ name: 'Anupam Subedi', url: 'https://anupamsubedi.com.np' }],
  creator: 'Anupam Subedi',
  publisher: 'Anupam Subedi',
  alternates: {
    canonical: 'https://anupamsubedi.com.np',
  },
  openGraph: {
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
    description:
      'Explore the portfolio of Anupam Subedi, including ML projects, web development work, research interests, education, and contact information.',
    url: 'https://anupamsubedi.com.np',
    siteName: 'Anupam Subedi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://anupamsubedi.com.np/profile/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Anupam Subedi portfolio preview',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
    description:
      'Portfolio of Anupam Subedi, showcasing machine learning, full stack development, and research interests.',
    images: ['https://anupamsubedi.com.np/profile/profile.jpeg'],
  },
};

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string; }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400 mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 dark:text-white mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description ? (
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      ) : null}
      <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-5 rounded-full" />
    </div>
  );
}

function SectionCard({ icon: Icon, title, children, className = '' }: { icon: LucideIcon; title: string; children: React.ReactNode; className?: string; }) {
  return (
    <div className={`rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-gray-800 dark:bg-gray-900/85 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white shadow-lg">
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-gray-950 dark:text-white">{title}</h3>
          <div className="mt-3 text-gray-600 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(219,234,254,0.85),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_32%,_#ffffff_100%)] text-gray-900 dark:bg-[radial-gradient(circle_at_top,_rgba(30,41,59,0.95),_transparent_42%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] dark:text-gray-100">
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl dark:border-gray-800/80 dark:bg-slate-950/75">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl ring-1 ring-blue-200 dark:ring-blue-900/70">
              <Image src="/profile/logo.png" alt="Anupam Subedi logo" fill priority className="object-contain p-1" />
            </div>
            <div>
              <div className="text-base font-bold text-gray-950 dark:text-white">Anupam Subedi</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ML Enthusiast & Full Stack Developer</div>
            </div>
          </a>

          <nav aria-label="Primary" className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:border-blue-900/70 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(129,140,248,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.12),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(129,140,248,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.12),_transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles size={16} />
              Welcome to my portfolio
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-7xl dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-gray-700 sm:text-2xl dark:text-gray-300">
              {personalInfo.title}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg lg:mx-0 dark:text-gray-400">
              {personalInfo.tagline}. {profile}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5"
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-blue-800 dark:hover:text-blue-300"
              >
                View Projects
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'Email' ? undefined : '_blank'}
                    rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:border-blue-900/80 dark:hover:text-blue-300"
                  >
                    <Icon size={16} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-fuchsia-400/20 blur-2xl" />
              <div className="relative h-72 w-72 overflow-hidden rounded-full border border-white/80 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem] dark:border-gray-800">
                <Image
                  src="/profile/profile.jpeg"
                  alt={personalInfo.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 18rem, 26rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Profile" title="About Me" />
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionCard icon={Target} title="Who I Am" className="bg-white/90 dark:bg-gray-950/80">
              <p className="leading-8">{profile}</p>
            </SectionCard>

            <div className="grid gap-4 sm:grid-cols-2">
              <SectionCard icon={Target} title="Research Focus">
                <p>Machine learning and data-driven systems with emphasis on practical applications.</p>
              </SectionCard>
              <SectionCard icon={Sparkles} title="Current Status">
                <p>Final-year BSc CSIT student focused on collaborative research and production-ready projects.</p>
              </SectionCard>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="bg-white/60 py-20 sm:py-24 dark:bg-gray-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Academic Path" title="Education" description="Formal study and milestones that shaped my approach to machine learning and software development." />
          <div className="relative space-y-8">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-blue-600 via-indigo-600 to-fuchsia-600 md:left-1/2 md:block md:-translate-x-1/2" />
            {education.map((item, index) => (
              <article key={item.institution} className={`relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center ${index % 2 === 1 ? 'md:[&>*:first-child]:order-3 md:[&>*:last-child]:order-1' : ''}`}>
                <div className="md:pr-8">
                  <SectionCard icon={BookOpen} title={item.degree} className="h-full">
                    <p className="font-semibold text-blue-700 dark:text-blue-300">{item.institution}</p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
                    {item.grade ? <p className="mt-3 text-sm"><span className="font-semibold text-gray-900 dark:text-white">Result:</span> {item.grade}</p> : null}
                    {item.modules ? <p className="mt-3 text-sm"><span className="font-semibold text-gray-900 dark:text-white">Key Modules:</span> {item.modules}</p> : null}
                    {item.dissertation ? <p className="mt-3 text-sm"><span className="font-semibold text-gray-900 dark:text-white">Dissertation:</span> {item.dissertation}</p> : null}
                    {item.subjects ? <p className="mt-3 text-sm"><span className="font-semibold text-gray-900 dark:text-white">Subjects:</span> {item.subjects}</p> : null}
                  </SectionCard>
                </div>
                <div className="hidden md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30" />
                </div>
                <div className="hidden md:block md:pl-8" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Stack" title="Technical Skills" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <SectionCard key={category} icon={Terminal} title={category} className="bg-white/90 dark:bg-gray-950/80">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionCard>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white/60 py-20 sm:py-24 dark:bg-gray-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Builds" title="Featured Projects" description="Selected work across machine learning, web development, and applied problem solving." />
          <div className="grid gap-6 lg:grid-cols-2">
            {academicProjects.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-950/80">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-950/40 dark:to-indigo-950/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white shadow-lg">
                      <FolderKanban size={24} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.links?.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:text-blue-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-blue-300"
                        >
                          {link.label}
                          <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-gray-950 dark:text-white">{project.title}</h3>
                  {project.description ? <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p> : null}
                </div>
                <div className="p-6">
                  {project.tags ? (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {project.items ? (
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      {project.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {project.links ? (
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                        >
                          {link.label}
                          <ArrowRight size={14} />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Focus Areas" title="Research Interests" description={researchInterests.description} />
          <div className="grid gap-6 md:grid-cols-2">
            {researchInterests.areas.map((area) => (
              <SectionCard key={area.title} icon={Sparkles} title={area.title} className="bg-white/90 dark:bg-gray-950/80">
                <p>{area.description}</p>
              </SectionCard>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white/60 py-20 sm:py-24 dark:bg-gray-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Beyond Work" title="Travel Gallery" description="A small look at the landscapes that inspire me." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelPhotos.map((photo, index) => (
              <article key={photo} className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-900">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo}
                    alt={`Travel photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-semibold">Photo {index + 1}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Highlights" title="Achievements & Interests" />
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard icon={Trophy} title="Academic & Community" className="bg-white/90 dark:bg-gray-950/80">
              <ul className="space-y-3">
                {academicRecords.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
                {participation.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard icon={Heart} title="Skills & Interests" className="bg-white/90 dark:bg-gray-950/80">
              <p className="mb-4"><span className="font-semibold text-gray-900 dark:text-white">Languages:</span> {additionalSkills.languages}</p>
              <p className="mb-4"><span className="font-semibold text-gray-900 dark:text-white">Soft Skills:</span> {softSkills.join(', ')}</p>
              <p><span className="font-semibold text-gray-900 dark:text-white">Interests:</span> {interests}</p>
            </SectionCard>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white/60 py-20 sm:py-24 dark:bg-gray-950/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Contact" title="Get in Touch" description="If you want to collaborate, have a question, or need help with a project, reach out directly." />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <SectionCard icon={Mail} title="Contact Details" className="bg-white/90 dark:bg-gray-950/80">
              <div className="space-y-3 text-sm sm:text-base">
                <p className="flex items-center gap-2"><Mail size={18} className="text-blue-600 dark:text-blue-400" /> {personalInfo.email}</p>
                <p className="flex items-center gap-2"><Phone size={18} className="text-blue-600 dark:text-blue-400" /> {personalInfo.phone}</p>
                <p className="flex items-center gap-2"><MapPin size={18} className="text-blue-600 dark:text-blue-400" /> {personalInfo.location}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-600/20">
                  <Mail size={16} /> Email Me
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </SectionCard>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-950/80"
            >
              <input type="hidden" name="access_key" value="36808164-3233-4661-9bb6-f1cb547bdd14" />
              <input type="hidden" name="subject" value="Portfolio contact form submission" />
              <input type="hidden" name="from_name" value={personalInfo.name} />
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                  <input id="name" name="name" type="text" required className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Anupam Subedi" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                  <input id="email" name="email" type="email" required className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Message</label>
                  <textarea id="message" name="message" required rows={6} className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Tell me about your project or question." />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5">
                  <MessageSquare size={18} /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-gray-950 py-12 text-white dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image src="/profile/logo.png" alt="Anupam Subedi logo" fill className="object-contain p-1" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{personalInfo.name}</div>
                  <div className="text-sm text-gray-400">{personalInfo.tagline}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="transition-colors hover:text-blue-300">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2"><Mail size={18} /> {personalInfo.email}</li>
                <li className="flex items-center gap-2"><Phone size={18} /> {personalInfo.phone}</li>
                <li className="flex items-center gap-2"><MapPin size={18} /> {personalInfo.location}</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500">
            <p>Made with care by {personalInfo.name}.</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
