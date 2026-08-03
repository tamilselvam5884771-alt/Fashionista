import React from 'react';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className = '', id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full space-y-1.5"
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-poppins"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full font-inter text-sm bg-white dark:bg-slate-900 border text-slate-900 dark:text-slate-100 rounded-xl transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:cursor-not-allowed ${
              leftIcon ? 'pl-10' : 'pl-4'
            } ${rightIcon ? 'pr-10' : 'pr-4'} py-3 ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/50'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-royal-purple focus:ring-royal-purple/20 dark:focus:border-lavender dark:focus:ring-lavender/20'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-500 dark:text-rose-400 font-inter">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">{helperText}</p>
        ) : null}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';
