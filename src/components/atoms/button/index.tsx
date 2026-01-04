'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { buttonStyles, loaderStyles } from './index.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const styles = buttonStyles({ variant, size, disabled: disabled || isLoading });

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${styles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className={loaderStyles} />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
