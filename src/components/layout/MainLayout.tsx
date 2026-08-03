import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { AiStylistChat } from '../features';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen flex flex-col bg-soft-grey dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-inter">
      {/* Top Desktop Navbar */}
      <Navbar />

      {/* Main Content Area with Page Route Transitions */}
      <main className="flex-1 pb-20 md:pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Global AI Stylist FAB & Drawer */}
      <AiStylistChat />

      {/* Bottom Mobile Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default MainLayout;
