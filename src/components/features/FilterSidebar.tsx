import React from 'react';
import { RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui';

export interface FilterState {
  occasions: string[];
  fabrics: string[];
  maxPrice: number;
  designers: string[];
  minRating: number;
  location: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobile = false,
  onCloseMobile,
}) => {
  const occasionOptions = ['Evening', 'Wedding', 'Cocktail', 'Runway', 'Casual Luxe'];
  const fabricOptions = ['Velvet', 'Silk', 'Lace', 'Organza', 'Satin'];
  const designerOptions = ['Saint-Germain', 'Maison de L’Amour', 'Valenti Milan', 'Haute London'];
  const locationOptions = ['All', 'Paris', 'Milan', 'Rome', 'London'];

  const toggleOccasion = (val: string) => {
    const next = filters.occasions.includes(val)
      ? filters.occasions.filter((item) => item !== val)
      : [...filters.occasions, val];
    onFilterChange({ ...filters, occasions: next });
  };

  const toggleFabric = (val: string) => {
    const next = filters.fabrics.includes(val)
      ? filters.fabrics.filter((item) => item !== val)
      : [...filters.fabrics, val];
    onFilterChange({ ...filters, fabrics: next });
  };

  const toggleDesigner = (val: string) => {
    const next = filters.designers.includes(val)
      ? filters.designers.filter((item) => item !== val)
      : [...filters.designers, val];
    onFilterChange({ ...filters, designers: next });
  };

  return (
    <div
      className={`space-y-6 font-inter ${
        isMobile
          ? 'p-6'
          : 'p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-royal-purple dark:text-lavender" />
          <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-slate-100">
            Filter Atelier
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-royal-purple dark:hover:text-lavender flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Budget Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-poppins font-semibold text-slate-800 dark:text-slate-200">
            Max Budget
          </span>
          <span className="font-poppins font-bold text-royal-purple dark:text-lavender">
            ${filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-royal-purple cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>$500</span>
          <span>$5,000</span>
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <span className="block text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200">
          Occasion
        </span>
        <div className="flex flex-wrap gap-2">
          {occasionOptions.map((occ) => {
            const isSelected = filters.occasions.includes(occ);
            return (
              <button
                key={occ}
                type="button"
                onClick={() => toggleOccasion(occ)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-poppins transition-all select-none ${
                  isSelected
                    ? 'bg-royal-purple text-white shadow-sm'
                    : 'bg-soft-grey dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric */}
      <div className="space-y-2">
        <span className="block text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200">
          Fabric Material
        </span>
        <div className="flex flex-wrap gap-2">
          {fabricOptions.map((fab) => {
            const isSelected = filters.fabrics.includes(fab);
            return (
              <button
                key={fab}
                type="button"
                onClick={() => toggleFabric(fab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-poppins transition-all select-none ${
                  isSelected
                    ? 'bg-rose-gold text-white shadow-sm'
                    : 'bg-soft-grey dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {fab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Designer */}
      <div className="space-y-2">
        <span className="block text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200">
          Design House
        </span>
        <div className="space-y-1.5">
          {designerOptions.map((des) => {
            const isSelected = filters.designers.includes(des);
            return (
              <label
                key={des}
                className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDesigner(des)}
                  className="rounded border-slate-300 text-royal-purple focus:ring-royal-purple"
                />
                <span>{des}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <span className="block text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200">
          Minimum Rating
        </span>
        <div className="flex gap-2">
          {[0, 4.5, 4.8].map((rate) => {
            const isSelected = filters.minRating === rate;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRating: rate })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-poppins transition-all ${
                  isSelected
                    ? 'bg-champagne-gold text-slate-950 font-bold shadow-sm'
                    : 'bg-soft-grey dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {rate === 0 ? 'All' : `${rate}+ ⭐`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <span className="block text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200">
          Boutique City
        </span>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className="w-full text-xs font-inter p-2.5 bg-soft-grey dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple/20"
        >
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc === 'All' ? 'All Fashion Capitals' : loc}
            </option>
          ))}
        </select>
      </div>

      {isMobile && onCloseMobile && (
        <Button variant="primary" size="lg" className="w-full mt-4" onClick={onCloseMobile}>
          Apply Filters
        </Button>
      )}
    </div>
  );
};
