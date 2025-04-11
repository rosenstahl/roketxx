// src/components/typography/ui.jsx
import React from 'react';
import { classNames } from '../../utils';
import { CommonPropTypes, CommonDefaultProps } from './types';

export const ButtonText = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-sf text-button',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

ButtonText.propTypes = CommonPropTypes;
ButtonText.defaultProps = CommonDefaultProps;

export const NavLink = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-sf text-nav tracking-ui',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

NavLink.propTypes = CommonPropTypes;
NavLink.defaultProps = CommonDefaultProps;

export const Label = ({ children, className, ...props }) => (
  <label 
    className={classNames(
      'font-sf text-label tracking-ui',
      className
    )}
    {...props}
  >
    {children}
  </label>
);

Label.propTypes = CommonPropTypes;
Label.defaultProps = CommonDefaultProps;