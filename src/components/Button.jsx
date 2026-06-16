import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold transition-all duration-300 focus:outline-none rounded-xl';

  const variants = {
    primary: 'bg-primary text-white hover:bg-black',
    secondary: 'bg-white text-primary border border-gray-200 hover:border-primary',
    accent: 'bg-accent text-white hover:bg-indigo-700',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    full: 'w-full py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
