// src/components/typography/special.jsx
import React from 'react';
import { classNames } from '../../../utils';
import { CommonPropTypes, CommonDefaultProps } from './types';

export const Quote = ({ children, className, ...props }) => (
  <blockquote 
    className={classNames(
      'font-inter text-quote italic',
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
);

Quote.propTypes = CommonPropTypes;
Quote.defaultProps = CommonDefaultProps;

export const Price = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-sf text-price',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

Price.propTypes = CommonPropTypes;
Price.defaultProps = CommonDefaultProps;

export const Alert = ({ children, className, ...props }) => (
  <div 
    className={classNames(
      'font-inter text-alert',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

Alert.propTypes = CommonPropTypes;
Alert.defaultProps = CommonDefaultProps;