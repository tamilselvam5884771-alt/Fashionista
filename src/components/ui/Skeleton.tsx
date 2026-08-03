import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 animate-pulse ${variantStyles[variant]} ${className}`}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent animate-[shimmer_1.8s_infinite]" />
    </div>
  );
};
