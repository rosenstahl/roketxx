// src/components/typography/headings.jsx
import React from 'react';
import { classNames } from '../../utils';
import { CommonPropTypes, CommonDefaultProps } from './types';

export const H1 = ({ children, className, ...props }) => (
  <h1 
    className={classNames(
      'font-sf text-h1-mobile md:text-h1 text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

H1.propTypes = CommonPropTypes;
H1.defaultProps = CommonDefaultProps;

export const H2 = ({ children, className, ...props }) => (
  <h2 
    className={classNames(
      'font-sf text-h2-mobile md:text-h2 text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

H2.propTypes = CommonPropTypes;
H2.defaultProps = CommonDefaultProps;

export const H3 = ({ children, className, ...props }) => (
  <h3 
    className={classNames(
      'font-sf text-h3-mobile md:text-h3 text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

H3.propTypes = CommonPropTypes;
H3.defaultProps = CommonDefaultProps;

export const H4 = ({ children, className, ...props }) => (
  <h4 
    className={classNames(
      'font-sf text-h4-mobile md:text-h4 text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </h4>
);

H4.propTypes = CommonPropTypes;
H4.defaultProps = CommonDefaultProps;