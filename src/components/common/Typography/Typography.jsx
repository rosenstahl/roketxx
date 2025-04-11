import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';

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

H1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

LeadText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

BodyText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

SmallText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

ButtonText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const Quote = ({ children, className, ...props }) => (
  <blockquote 
    className={classNames(
      'font-inter text-quote italic leading-[1.8]',
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
);

Quote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const Price = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-sf text-price tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

Price.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const InputLabel = ({ children, className, ...props }) => (
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

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const InputText = ({ className, ...props }) => (
  <input
    className={classNames(
      'font-inter text-base placeholder:opacity-60',
      className
    )}
    {...props}
  />
);

InputText.propTypes = {
  className: PropTypes.string,
};

export const Placeholder = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-inter text-base text-support-gray',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

Placeholder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const ListTitle = ({ children, className, ...props }) => (
  <span 
    className={classNames(
      'font-sf text-base text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

ListTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const ListItem = ({ children, className, ...props }) => (
  <li 
    className={classNames(
      'font-inter text-base text-main-tertiary mb-list-gap',
      className
    )}
    {...props}
  >
    {children}
  </li>
);

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const FooterHeading = ({ children, className, ...props }) => (
  <h6 
    className={classNames(
      'font-sf text-base text-main-secondary',
      className
    )}
    {...props}
  >
    {children}
  </h6>
);

FooterHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const FooterText = ({ children, className, ...props }) => (
  <p 
    className={classNames(
      'font-inter text-small text-support-gray',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

FooterText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}; 