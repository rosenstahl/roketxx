// src/hooks/useParallax.js
import { useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

export const useParallax = (factor = 0.5) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${factor * 100}%`]);

  return { ref, y };
};