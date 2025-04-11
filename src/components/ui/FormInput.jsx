import React from 'react';
import PropTypes from 'prop-types';
import { Label, SmallText } from '../common/Typography';

const FormInput = React.forwardRef(({ 
  label, 
  error, 
  required, 
  className = '', 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="black/20" htmlFor={props.id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-white/[0.1]
          border border-black/20
          black/20
          hover:border-black
          placeholder:black/20
          focus:border-accent-primary focus:ring-1 focus:ring-accent-primary
          outline-none
          transition-all duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <SmallText className="text-red-500">{error}</SmallText>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string
};

export default FormInput;