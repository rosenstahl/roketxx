import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ButtonText } from "../common/Typography";
import { classNames } from "../../utils";

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer overflow-hidden";
  
  const variants = {
    primary: "bg-accent-primary text-white shadow-lg hover:shadow-xl",
    secondary: "bg-main-primary text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-accent-primary text-accent-primary",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-500"
  };
  
  const sizes = {
    small: "px-4 py-2",
    default: "px-8 py-6",
    large: "px-10 py-5"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className,
        "group"
      )}
      onClick={onClick}
      {...props}
    >
      {/* Container für den Welleneffekt */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Welleneffekt-Element */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`
              absolute 
              top-1/2 
              left-1/2 
              -translate-x-1/2 
              -translate-y-1/2 
              w-[300%] 
              h-[300%] 
              ${variant === 'primary' ? 'bg-[#FF7043]' : 'bg-gray-200'} 
              rounded-full 
              opacity-0 
              group-hover:opacity-100 
              group-hover:scale-100 
              scale-0
              transition-all 
              duration-500 
              ease-out
            `}
          />
        </div>
      </div>
      
      <ButtonText className={`
        relative 
        z-10 
        ${variant === 'ghost' ? 'font-normal' : 'font-medium'}
      `}>
        {children}
      </ButtonText>
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string
};

export default Button;