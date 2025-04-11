import React from 'react';
import PropTypes from 'prop-types';
import { Label, SmallText } from '../common/Typography';

const FormTextarea = React.forwardRef(({ 
  label, 
  error, 
  required, 
  className = '', 
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-white/[0.1] 
          border border-black/20
          hover:border-black
          text-black placeholder:black/20
          focus:border-accent-primary focus:ring-1 focus:ring-accent-primary
          outline-none
          resize-y
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

FormTextarea.displayName = 'FormTextarea';

FormTextarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
  id: PropTypes.string
};

export default FormTextarea;