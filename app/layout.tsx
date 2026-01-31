import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anupam Subedi | Computer Science & ML Portfolio | Nepal',
  description: 'Anupam Subedi - Final-year BSc CSIT student from Nepal specializing in machine learning, data science, and web development. Expert in Python, JavaScript, TensorFlow, React, and Next.js. Passionate about real-world ML applications and predictive analytics.',
  keywords: [
    'Anupam Subedi',
    'anupamsubedi.com.np',
    'Anupam Subedi Nepal',
    'Anupam Subedi Kathmandu',
    'Computer Science Nepal',
    'Machine Learning Nepal',
    'BSc CSIT Nepal',
    'Amrit Science Campus',
    'Data Science Portfolio',
    'ML Engineer Nepal',
    'Python Developer Nepal',
    'Web Developer Nepal',
    'AI Research Nepal',
    'TensorFlow Developer',
    'React Developer Nepal',
    'Next.js Portfolio',
    'Anupam Subedi Portfolio',
    'Anupam Subedi GitHub',
    'Machine Learning Projects Nepal',
    'Spam Detection ML',
    'Sentiment Analysis',
    'Predictive Analytics Nepal'
  ],
  authors: [{ name: 'Anupam Subedi', url: 'https://anupamsubedi.com.np' }],
  creator: 'Anupam Subedi',
  publisher: 'Anupam Subedi',
  metadataBase: new URL('https://anupamsubedi.com.np'),
  alternates: {
    canonical: 'https://anupamsubedi.com.np',
  },
  openGraph: {
    title: 'Anupam Subedi - Computer Science & Machine Learning Portfolio',
    description: 'Final-year BSc CSIT student from Nepal specializing in machine learning, data science, and full-stack development. Building intelligent systems with code and data.',
    url: 'https://anupamsubedi.com.np',
    siteName: 'Anupam Subedi Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anupam Subedi - ML & CS Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anupam Subedi - ML & CS Portfolio',
    description: 'BSc CSIT student specializing in machine learning and full-stack development',
    images: ['/og-image.jpg'],
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
              name: 'Anupam Subedi',
              url: 'https://anupamsubedi.com.np',
              email: 'anupamsubedi542@gmail.com',
              jobTitle: 'Computer Science Student & ML Enthusiast',
              description: 'Final-year BSc CSIT student specializing in machine learning and data-driven systems',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kathmandu',
                addressCountry: 'Nepal',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Amrit Science Campus',
              },
              knowsAbout: [
                'Machine Learning',
                'Data Science',
                'Python',
                'JavaScript',
                'React',
                'Next.js',
                'TensorFlow',
                'Web Development',
              ],
              sameAs: [
                'https://github.com/Anupamsubedi1',
                'https://www.linkedin.com/in/anupam-subedi-773719346/',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
