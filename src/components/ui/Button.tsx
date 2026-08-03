import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'rose' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-inter rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

    const sizeStyles = {
      sm: 'px-3.5 py-2 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-royal-purple text-white hover:bg-royal-purple/90 focus:ring-royal-purple dark:bg-royal-purple dark:hover:bg-royal-purple/80 shadow-sm hover:shadow-md',
      secondary:
        'bg-lavender text-royal-purple hover:bg-lavender/80 dark:bg-slate-800 dark:text-lavender dark:hover:bg-slate-700 focus:ring-royal-purple',
      ghost:
        'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 focus:ring-slate-400',
      outline:
        'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-royal-purple dark:hover:border-lavender hover:bg-royal-purple/5 dark:hover:bg-lavender/5 focus:ring-royal-purple',
      rose:
        'bg-rose-gold text-white hover:bg-rose-gold/90 focus:ring-rose-gold shadow-sm hover:shadow-md',
      gold:
        'bg-champagne-gold text-slate-950 hover:bg-champagne-gold/90 focus:ring-champagne-gold font-semibold shadow-sm hover:shadow-md',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -1 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
