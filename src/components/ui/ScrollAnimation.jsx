import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const ScrollAnimation = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  triggerOnce = true 
}) => {
  const getInitialDirection = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 };
      case 'down': return { opacity: 0, y: -40 };
      case 'left': return { opacity: 0, x: 40 };
      case 'right': return { opacity: 0, x: -40 };
      default: return { opacity: 0, y: 40 };
    }
  };

  const getFinalDirection = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialDirection()}
      whileInView={getFinalDirection()}
      viewport={{ once: triggerOnce, margin: '-100px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

ScrollAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string,
  triggerOnce: PropTypes.bool
};

