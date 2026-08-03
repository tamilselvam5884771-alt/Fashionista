import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  ShoppingBag,
  Package,
  LineChart,
  ArrowLeft,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  X,
  Building,
} from 'lucide-react';
import { useThemeStore } from '../../store';
import { Avatar } from '../ui';

export const BoutiqueLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Orders & Fittings', path: '/dashboard#orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Inventory', path: '/dashboard#inventory', icon: <Package className="w-4 h-4" /> },
    { label: 'Analytics', path: '/dashboard#analytics', icon: <LineChart className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-soft-grey dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-inter">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-5 justify-between shrink-0 select-none">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2.5 bg-royal-purple text-white rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <span className="font-poppins font-bold text-lg leading-tight text-royal-purple dark:text-lavender tracking-tight">
                Fashionista
              </span>
              <span className="block text-[10px] font-semibold tracking-widest text-amber-600 dark:text-amber-300 uppercase font-poppins">
                Atelier Manager
              </span>
            </div>
          </Link>

          {/* Location Switcher Badge */}
          <div className="p-3 rounded-2xl bg-lavender/30 dark:bg-slate-800/60 border border-lavender/50 text-xs space-y-1">
            <span className="text-[10px] text-slate-400 font-poppins uppercase tracking-wider block">
              Active Location
            </span>
            <div className="font-poppins font-bold text-royal-purple dark:text-lavender flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-champagne-gold" /> Atelier Le Paris
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold font-poppins transition-colors ${
                    isActive
                      ? 'bg-royal-purple text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Customer Storefront */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-royal-purple dark:hover:text-lavender hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content & Header */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-poppins font-bold text-lg text-slate-900 dark:text-slate-100">
              Boutique Owner Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, SKU, clients..."
                className="pl-9 pr-4 py-2 bg-soft-grey dark:bg-slate-800 text-xs font-inter text-slate-900 dark:text-slate-100 placeholder:text-slate-400 rounded-xl border border-slate-200/60 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-royal-purple/20 w-56"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-champagne-gold" /> : <Moon className="w-4 h-4 text-royal-purple" />}
            </button>

            <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-gold ring-2 ring-white dark:ring-slate-900" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <Avatar size="sm" name="Atelier Manager" status="online" />
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 dark:text-slate-300 font-poppins">
                Jean-Luc Atelier
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-500"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        )}

        {/* Dashboard Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
