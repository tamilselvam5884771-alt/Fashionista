import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Search, Heart, Wallet, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useThemeStore, useAuthStore } from '../../store';
import { Button, Avatar } from '../ui';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-royal-purple text-white rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-champagne-gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-lg leading-tight text-royal-purple dark:text-lavender tracking-tight">
              Fashionista
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase -mt-0.5 font-inter">
              Atelier
            </span>
          </div>
        </Link>

        {/* Center: Search Bar (Desktop) */}
        {!isAuthPage && (
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative items-center"
          >
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search couture, dresses, designers..."
              className="w-full pl-10 pr-10 py-2.5 bg-soft-grey dark:bg-slate-800/80 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl border border-slate-200/70 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-royal-purple/30 dark:focus:ring-lavender/30 transition-all font-inter"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </form>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-gold ring-2 ring-white dark:ring-slate-900" />
          </Link>

          {/* Wallet Link */}
          <Link
            to="/wallet"
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
            title="Wallet"
          >
            <Wallet className="w-5 h-5 text-champagne-gold" />
            <span className="font-poppins font-semibold text-slate-700 dark:text-slate-200 hidden lg:inline">
              $1,250
            </span>
          </Link>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-champagne-gold animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-royal-purple" />
            )}
          </button>

          {/* Profile / Login / Logout */}
          <div className="pl-1 border-l border-slate-200 dark:border-slate-800 flex items-center">
            {isAuthPage ? (
              <Link to="/">
                <Button size="sm" variant="ghost">
                  Home
                </Button>
              </Link>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="flex items-center gap-2">
                  <Avatar size="sm" name={user.name} status="online" />
                  <span className="hidden xl:inline text-xs font-semibold text-slate-700 dark:text-slate-200 font-poppins">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button size="sm" variant="primary" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
