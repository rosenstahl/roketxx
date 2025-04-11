import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { H2, H3, LeadText, BodyText } from '@/components/common/Typography';

export const TestimonialSlider = () => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const testimonials = t('testimonials.items', { returnObjects: true });

  useEffect(() => {
    setNextIndex((currentIndex + 1) % testimonials.length);
  }, [currentIndex, testimonials.length]);

  return (
    <section className="w-full bg-base-primary py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <H2 className="text-main-secondary mb-4">
            {t('testimonials.header.title')}
          </H2>
          <LeadText className="max-w-2xl mx-auto">
            {t('testimonials.header.subtitle')}
          </LeadText>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex justify-center items-center min-h-[500px] mx-auto">
            {testimonials.map((testimonial, idx) => {
              let position = idx - currentIndex;
              if (position < -2) position += testimonials.length;
              if (position > 2) position -= testimonials.length;
              
              const isCenter = position === 0;
              const isVisible = Math.abs(position) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={idx}
                  animate={{
                    x: `${position * 110}%`,
                    scale: isCenter ? 1 : 0.8,
                    opacity: isCenter ? 1 : 0.3,
                    zIndex: isCenter ? 20 : 10,
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  className={`absolute w-full max-w-2xl ${
                    isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-50 transition-opacity'
                  }`}
                  onClick={() => !isCenter && setCurrentIndex(idx)}
                >
                  <div className="bg-white rounded-2xl shadow-sm p-12">
                    <div className="space-y-8">
                      {/* Author Info */}
                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <H3 className="text-main-secondary">
                              {testimonial.name}
                            </H3>
                            <BodyText className="text-main-tertiary">
                              {testimonial.position}
                            </BodyText>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-accent-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        {/* Award Badge */}
                        {testimonial.award && (
                          <div className="inline-flex items-center gap-2 bg-accent-primary/5 px-4 py-2 rounded-full">
                            <svg className="w-4 h-4 text-accent-primary" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            <span className="font-sf text-sm font-medium text-accent-primary">
                              {testimonial.award}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Testimonial Content */}
                      <div className="relative">
                        <svg className="absolute -top-4 -left-4 w-8 h-8 text-accent-primary/10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <BodyText className="italic text-main-tertiary text-lg">
                          {testimonial.content}
                        </BodyText>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-sm hover:shadow-md transition-all z-30 group"
            aria-label={t('testimonials.navigation.previous')}
          >
            <svg className="w-6 h-6 text-main-secondary group-hover:text-accent-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-sm hover:shadow-md transition-all z-30 group"
            aria-label={t('testimonials.navigation.next')}
          >
            <svg className="w-6 h-6 text-main-secondary group-hover:text-accent-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 bg-accent-primary' 
                  : index === nextIndex
                    ? 'w-6 bg-accent-primary/30'
                    : 'w-3 bg-support-gray'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`${t('testimonials.navigation.goto')} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;