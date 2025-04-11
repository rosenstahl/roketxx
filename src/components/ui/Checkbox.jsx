import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { SmallText } from '../common/Typography';

const Checkbox = ({
  children,
  checked,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={`
              w-5 h-5 rounded
              border-2
              ${checked
                ? 'bg-accent-primary border-accent-primary'
                : 'border-black/20 group-hover:border-black/40'
              }
              ${error ? 'border-red-500' : ''}
              transition-colors duration-200
            `}
            animate={checked ? { scale: [0.8, 1] } : { scale: 1 }}
          >
            {checked && (
              <motion.svg
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </motion.div>
        </div>
        <span className="text-sm text-black">{children}</span>
      </label>
      {error && (
        <SmallText className="text-red-500 ml-8">{error}</SmallText>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Checkbox;