import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  onChange,
  className = '',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (items[0]?.id ?? '')
  );

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    if (onChange) onChange(id);
  };

  const activeItem = items.find((item) => item.id === activeTabId);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Tab Pill Navigation */}
      <div className="flex items-center space-x-1 p-1.5 bg-soft-grey dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 self-start inline-flex">
        {items.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium font-poppins rounded-xl transition-colors duration-200 outline-none select-none ${
                isActive
                  ? 'text-royal-purple dark:text-lavender'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeItem.content}
        </motion.div>
      )}
    </div>
  );
};
