import React, { useState } from 'react';
import {
  Layers,
  Scissors,
  Sparkles,
  Palette,
  Check,
  Crown,
  Shirt,
  Briefcase,
  Heart,
  X,
} from 'lucide-react';
import type { OutfitSelections } from './BitmojiStyleBuilder';

interface TailornovaSidebarProps {
  selections: OutfitSelections;
  onChange: (updated: Partial<OutfitSelections>) => void;
}

export const TailornovaSidebar: React.FC<TailornovaSidebarProps> = ({
  selections,
  onChange,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>('silhouettes');

  const menuItems = [
    { id: 'silhouettes', label: 'SILHOUETTES', icon: Layers },
    { id: 'necklines', label: 'NECKLINES', icon: Scissors },
    { id: 'sleeves', label: 'SLEEVES', icon: Sparkles },
    { id: 'color', label: 'COLOR', icon: Palette },
    { id: 'fabric', label: 'FABRIC', icon: Shirt },
  ];

  const categories = [
    { id: 'dress', label: 'Classic Dress', icon: Crown },
    { id: 'tee_skirt', label: 'Casual Tee & Skirt', icon: Shirt },
    { id: 'suit', label: 'Formal Suit / Jacket', icon: Briefcase },
    { id: 'ethnic', label: 'Traditional Ethnic', icon: Heart },
  ];

  const necklines = [
    { id: 'vneck', label: 'V-Neck Plunge' },
    { id: 'crew', label: 'Round / Crew' },
    { id: 'offshoulder', label: 'Off-Shoulder' },
    { id: 'collar', label: 'High Neck Collar' },
    { id: 'sweetheart', label: 'Sweetheart Cut' },
  ];

  const sleeves = [
    { id: 'sleeveless', label: 'Sleeveless' },
    { id: 'short', label: 'Short Sleeve' },
    { id: 'threequarter', label: '3/4 Sleeve' },
    { id: 'full', label: 'Full Length' },
  ];

  const fabrics = [
    { id: 'silk', label: 'Silk / Satin' },
    { id: 'cotton', label: 'Cotton Twill' },
    { id: 'velvet', label: 'Royal Velvet' },
    { id: 'denim', label: 'Structured Denim' },
    { id: 'linen', label: 'Natural Linen' },
  ];

  const colors = [
    { hex: '#8B5CF6', name: 'Royal Purple' },
    { hex: '#E05297', name: 'Rose Gold' },
    { hex: '#10B981', name: 'Emerald' },
    { hex: '#F59E0B', name: 'Champagne Gold' },
    { hex: '#3B82F6', name: 'Sapphire' },
    { hex: '#EC4899', name: 'Crimson Pink' },
    { hex: '#18181B', name: 'Midnight Black' },
    { hex: '#F4F4F5', name: 'Ivory Silk' },
  ];

  return (
    <div className="flex h-full z-20 font-inter select-none">
      {/* 1. Far Left Vertical Icon Bar */}
      <div className="w-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-4 space-y-4 shrink-0 shadow-sm">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
              className={`w-16 py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
                isActive
                  ? 'bg-pink-50 dark:bg-slate-800 text-[#e05297] font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <IconComp className="w-5 h-5" />
              <span className="text-[9px] font-poppins font-bold uppercase tracking-tighter">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Slide-out Drawer Panel */}
      {activeMenu && (
        <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-lg z-20 font-inter">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
            <span className="text-xs font-poppins font-extrabold uppercase text-slate-700 dark:text-slate-200 tracking-wider">
              {activeMenu}
            </span>
            <button
              onClick={() => setActiveMenu(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 overflow-y-auto space-y-2 flex-1">
            {/* Silhouettes */}
            {activeMenu === 'silhouettes' &&
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onChange({ category: cat.id })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-poppins font-semibold text-left flex items-center justify-between transition-all ${
                    selections.category === cat.id
                      ? 'bg-[#e05297] text-white border-[#e05297] shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#e05297]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selections.category === cat.id && <Check className="w-4 h-4" />}
                </button>
              ))}

            {/* Necklines */}
            {activeMenu === 'necklines' &&
              necklines.map((neck) => (
                <button
                  key={neck.id}
                  onClick={() => onChange({ neckline: neck.id })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-poppins font-semibold text-left flex items-center justify-between transition-all ${
                    selections.neckline === neck.id
                      ? 'bg-[#e05297] text-white border-[#e05297] shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#e05297]'
                  }`}
                >
                  <span>{neck.label}</span>
                  {selections.neckline === neck.id && <Check className="w-4 h-4" />}
                </button>
              ))}

            {/* Sleeves */}
            {activeMenu === 'sleeves' &&
              sleeves.map((slv) => (
                <button
                  key={slv.id}
                  onClick={() => onChange({ sleeve: slv.id })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-poppins font-semibold text-left flex items-center justify-between transition-all ${
                    selections.sleeve === slv.id
                      ? 'bg-[#e05297] text-white border-[#e05297] shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#e05297]'
                  }`}
                >
                  <span>{slv.label}</span>
                  {selections.sleeve === slv.id && <Check className="w-4 h-4" />}
                </button>
              ))}

            {/* Fabrics */}
            {activeMenu === 'fabric' &&
              fabrics.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onChange({ fabric: f.id })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-poppins font-semibold text-left flex items-center justify-between transition-all ${
                    selections.fabric === f.id
                      ? 'bg-[#e05297] text-white border-[#e05297] shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#e05297]'
                  }`}
                >
                  <span>{f.label}</span>
                  {selections.fabric === f.id && <Check className="w-4 h-4" />}
                </button>
              ))}

            {/* Colors */}
            {activeMenu === 'color' && (
              <div className="grid grid-cols-4 gap-3 p-2">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => onChange({ color: c.hex })}
                    title={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-transform shadow-md hover:scale-110 flex items-center justify-center ${
                      selections.color === c.hex
                        ? 'border-[#e05297] scale-110 ring-2 ring-[#e05297]/50'
                        : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selections.color === c.hex && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TailornovaSidebar;
