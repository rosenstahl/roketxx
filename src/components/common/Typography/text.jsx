// src/components/typography/text.jsx
import React from 'react';
import { classNames } from '../../utils';
import { CommonPropTypes, CommonDefaultProps } from './types';

export const LeadText = ({ children, className, ...props }) => (
  <p 
    className={classNames(
      'font-inter text-lead-mobile md:text-lead text-main-tertiary',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

LeadText.propTypes = CommonPropTypes;
LeadText.defaultProps = CommonDefaultProps;

export const BodyText = ({ children, className, ...props }) => (
  <p 
    className={classNames(
      'font-inter text-base text-main-tertiary',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

BodyText.propTypes = CommonPropTypes;
BodyText.defaultProps = CommonDefaultProps;

export const SmallText = ({ children, className, ...props }) => (
  <p 
    className={classNames(
      'font-inter text-small text-main-tertiary',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

SmallText.propTypes = CommonPropTypes;
SmallText.defaultProps = CommonDefaultProps;