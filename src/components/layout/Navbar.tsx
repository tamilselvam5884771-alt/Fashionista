import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Search, Heart, Sun, Moon, LogOut, Video, Scissors, ShoppingBag } from 'lucide-react';
import { useThemeStore, useAuthStore, useCartStore } from '../../store';
import { Button, Avatar } from '../ui';
import { ConsultationBookingModal } from '../features/ConsultationBookingModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A0B10]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
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
                Custom Fashion
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
                placeholder="Search sarees, kurtis, lehengas..."
                className="w-full pl-10 pr-10 py-2 bg-soft-grey dark:bg-slate-800/80 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl border border-slate-200/70 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-royal-purple/30 dark:focus:ring-lavender/30 transition-all font-inter"
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* The ONE Highlighted Action Button */}
            <Button
              size="sm"
              variant="gold"
              onClick={() => setIsConsultationOpen(true)}
              className="rounded-xl shadow-md font-poppins text-xs font-bold hidden md:flex items-center gap-1.5 px-3.5 py-2"
              leftIcon={<Video className="w-3.5 h-3.5 text-amber-950" />}
            >
              Book a Call
            </Button>

            {/* 3D Fitting Link */}
            <Link
              to="/studio"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
              title="3D Fitting Studio"
            >
              <Scissors className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden lg:inline text-xs font-poppins font-medium text-slate-600 dark:text-slate-300">
                3D Fitting
              </span>
            </Link>

            {/* Identify Outfit Entry Point Link */}
            <Link
              to="/design"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium group"
              title="Identify My Outfit from Photo"
            >
              <Sparkles className="w-4 h-4 text-[#8B5CF6] dark:text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-xs font-poppins font-medium text-slate-600 dark:text-slate-300 group-hover:text-[#5B2C91] dark:group-hover:text-purple-300">
                Identify Outfit
              </span>
            </Link>

            {/* Shopping Bag Cart Icon with Live Count Badge */}
            <button
              onClick={() => useCartStore.getState().setIsOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#8B5CF6] dark:text-purple-400" />
              {useCartStore.getState().getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E05297] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-md">
                  {useCartStore.getState().getItemCount()}
                </span>
              )}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
            </Link>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-champagne-gold" />
              ) : (
                <Moon className="w-4 h-4 text-royal-purple" />
              )}
            </button>

            {/* Profile / Login / Logout */}
            <div className="pl-1 border-l border-slate-200 dark:border-slate-800 flex items-center ml-1">
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
                    <Button size="sm" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Live Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        boutiqueOrDesigner={{
          name: 'Expert Designer',
          specialty: '1-on-1 Fitting Consultation',
        }}
        onSuccess={() => setIsConsultationOpen(false)}
      />
    </>
  );
};

export default Navbar;
