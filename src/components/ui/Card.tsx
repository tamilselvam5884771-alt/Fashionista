import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hoverEffect = true, children, className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow p-6 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`space-y-1.5 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3
    className={`font-poppins text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p className={`text-xs text-slate-500 dark:text-slate-400 font-inter ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => <div className={`pt-2 ${className}`} {...props}>{children}</div>;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`flex items-center pt-5 border-t border-slate-100 dark:border-slate-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);
