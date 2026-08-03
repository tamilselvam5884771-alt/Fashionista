import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, Sparkles, Crown, User } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', path: '/explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Design', path: '/design', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Wedding', path: '/wedding', icon: <Crown className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 shadow-lg transition-colors duration-300">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center py-1 px-3 min-w-[56px] transition-colors ${
                isActive
                  ? 'text-royal-purple dark:text-lavender font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavDot"
                    className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-royal-purple dark:bg-lavender shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-poppins mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
