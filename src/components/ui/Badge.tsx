import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  variant?: 'primary' | 'gold' | 'lavender' | 'rose' | 'grey' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-medium font-inter rounded-full transition-colors select-none';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px] gap-1.5',
    md: 'px-3 py-1 text-xs gap-1.5',
  };

  const variantStyles = {
    primary:
      'bg-royal-purple/10 text-royal-purple dark:bg-royal-purple/20 dark:text-lavender border border-royal-purple/20 dark:border-royal-purple/30',
    gold:
      'bg-amber-100/70 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40',
    lavender:
      'bg-lavender text-royal-purple dark:bg-slate-800 dark:text-lavender border border-lavender/60 dark:border-slate-700',
    rose:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40',
    grey:
      'bg-soft-grey text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    outline:
      'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
  };

  const dotStyles = {
    primary: 'bg-royal-purple dark:bg-lavender',
    gold: 'bg-amber-500',
    lavender: 'bg-royal-purple',
    rose: 'bg-rose-500',
    grey: 'bg-slate-400',
    outline: 'bg-slate-400',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyles[variant]}`} />}
      <span>{children}</span>
    </motion.span>
  );
};
