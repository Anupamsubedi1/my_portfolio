import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer | anupamsubedi.com.np',
  description: 'Anupam Subedi (anupamsubedi.com.np) - ML Enthusiast and Full Stack Developer from Kathmandu, Nepal. Specializing in real-world machine learning projects, data-driven solutions, and MERN stack development. Expert in Python, Java, C++, JavaScript, TensorFlow, PyTorch, React, and Next.js.',
  keywords: [
    'Anupam Subedi',
    'anupamsubedi.com.np',
    'anupamsubedi',
    'Anupam Subedi Nepal',
    'Anupam Subedi Kathmandu',
    'Anupam Subedi Portfolio',
    'Anupam Subedi ML',
    'Anupam Subedi Machine Learning',
    'Anupam Subedi Developer',
    'ML Enthusiast Nepal',
    'Machine Learning Engineer Nepal',
    'Full Stack Developer Nepal',
    'MERN Stack Developer Nepal',
    'Python Developer Kathmandu',
    'Data Science Nepal',
    'BSc CSIT Nepal',
    'Amrit Science Campus',
    'Computer Science Nepal',
    'AI Developer Nepal',
    'TensorFlow Expert Nepal',
    'PyTorch Developer',
    'React Developer Kathmandu',
    'Next.js Developer Nepal',
    'Java Developer Nepal',
    'C++ Programmer Nepal',
    'Spam Detection Machine Learning',
    'Sentiment Analysis Project',
    'Real-time Chat Application',
    'Connectify Chat App',
    'Predictive Analytics Nepal',
    'Data-driven Projects',
    'Healthcare ML Nepal',
    'Energy Optimization AI',
    'NLP Projects Nepal'
  ],
  authors: [{ name: 'Anupam Subedi', url: 'https://anupamsubedi.com.np' }],
  creator: 'Anupam Subedi',
  publisher: 'Anupam Subedi',
  metadataBase: new URL('https://anupamsubedi.com.np'),
  alternates: {
    canonical: 'https://anupamsubedi.com.np',
  },
  openGraph: {
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer | anupamsubedi.com.np',
    description: 'ML Enthusiast and Full Stack Developer specializing in real-world machine learning projects and data-driven solutions. Expert in Python, TensorFlow, PyTorch, and MERN stack. Based in Kathmandu, Nepal.',
    url: 'https://anupamsubedi.com.np',
    siteName: 'Anupam Subedi - anupamsubedi.com.np',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: 'https://anupamsubedi.com.np/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anupam Subedi - ML Enthusiast & Full Stack Developer from Nepal',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anupam Subedi | ML Enthusiast & Full Stack Developer',
    description: 'ML Enthusiast & Full Stack Developer from Nepal. Specializing in real-world machine learning and data-driven projects. anupamsubedi.com.np',
    images: ['https://anupamsubedi.com.np/og-image.jpg'],
    creator: '@anupamsubedi',
    site: '@anupamsubedi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://anupamsubedi.com.np" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const darkMode = localStorage.getItem('darkMode');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (darkMode === 'true' || (!darkMode && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://anupamsubedi.com.np/#person',
              name: 'Anupam Subedi',
              alternateName: 'Anupam Subedi Nepal',
              url: 'https://anupamsubedi.com.np',
              image: 'https://anupamsubedi.com.np/og-image.jpg',
              email: 'anupamsubedi542@gmail.com',
              telephone: '+977-9843012542',
              jobTitle: 'ML Enthusiast & Full Stack Developer',
              description: 'Machine Learning enthusiast and Full Stack Developer specializing in real-world, data-driven projects. Passionate about building intelligent systems.',
              worksFor: {
                '@type': 'Organization',
                name: 'Independent',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Baniyatar, Kathmandu',
                addressRegion: 'Bagmati',
                addressCountry: 'NP',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Amrit Science Campus',
                address: 'Lainchaur, Kathmandu, Nepal',
              },
              knowsAbout: [
                'Machine Learning',
                'Deep Learning',
                'Data Science',
                'Artificial Intelligence',
                'Python Programming',
                'Java Programming',
                'C++ Programming',
                'JavaScript',
                'TypeScript',
                'React.js',
                'Next.js',
                'Node.js',
                'TensorFlow',
                'PyTorch',
                'Scikit-learn',
                'MERN Stack',
                'Full Stack Development',
                'Web Development',
                'Natural Language Processing',
                'Computer Vision',
                'Predictive Analytics',
              ],
              sameAs: [
                'https://github.com/Anupamsubedi1',
                'https://www.linkedin.com/in/anupam-subedi-773719346/',
                'https://www.facebook.com/anupam.subedi',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
