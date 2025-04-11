import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';

// Komponenten werden bereits in App.jsx lazy geladen
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import Support from '@/components/sections/Support';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import PackageComparison from '@/components/sections/PackageComparison';

// Loading-Komponente für einzelne Sektionen
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Wrapper-Komponente für Sektionen
const Section = ({ id, children }) => (
  <motion.div
    data-section={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <Suspense fallback={<SectionLoader />}>
      {children}
    </Suspense>
  </motion.div>
);

export const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.dataset.section]);
          }
        });
      },
      { rootMargin: '100px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <main className="flex-grow">
      <Section id="hero">
        <Hero />
      </Section>

      <Section id="stats">
        <Stats />
      </Section>

      <Section id="about">
        <About />
      </Section>

      <Section id="packages">
        <PackageComparison />
      </Section>

      <Section id="support">
        <Support />
      </Section>

      <Section id="testimonials">
        <Testimonials />
      </Section>

      <Section id="faq">
        <FAQ />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>
    </main>
  );
};