// src/components/typography/types.js
import PropTypes from 'prop-types';

export const CommonPropTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CommonDefaultProps = {
  className: '',
};