import React from 'react';
import { Sliders, UserCheck, Scissors, RefreshCw } from 'lucide-react';
import type { GarmentCategory } from '../../types';

interface MeasurementControlsProps {
  category: GarmentCategory;
  onCategoryChange: (cat: GarmentCategory) => void;
  measurements: {
    height_cm: number;
    chest_cm: number;
    waist_cm: number;
    hips_cm: number;
    sleeve_length_cm: number;
    inseam_cm: number;
  };
  onMeasurementChange: (key: string, val: number) => void;
  necklineCut: number;
  onNecklineChange: (val: number) => void;
  fitTightness: number;
  onFitChange: (val: number) => void;
  onResetDefault: () => void;
}

export const MeasurementControls: React.FC<MeasurementControlsProps> = ({
  category,
  onCategoryChange,
  measurements,
  onMeasurementChange,
  necklineCut,
  onNecklineChange,
  fitTightness,
  onFitChange,
  onResetDefault,
}) => {
  const categories: { id: GarmentCategory; label: string }[] = [
    { id: 'dress', label: 'Dress / Gown' },
    { id: 'suit', label: 'Suit / Jacket' },
    { id: 'shirt', label: 'Shirt / Top' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'skirt', label: 'Skirt' },
    { id: 'outerwear', label: 'Outerwear' },
  ];

  return (
    <div className="w-80 bg-[#12131C] border-r border-white/10 flex flex-col h-full overflow-y-auto font-inter text-slate-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#171824] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#8B5CF6]" />
          <h3 className="font-poppins font-bold text-xs uppercase tracking-wider text-white">
            Parametric Controls
          </h3>
        </div>
        <button
          onClick={onResetDefault}
          title="Reset Sliders"
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 space-y-6 flex-1">
        {/* 1. Garment Category Pills */}
        <div className="space-y-2">
          <label className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 block">
            Garment Geometry
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-poppins font-semibold transition-all text-left border ${
                  category === cat.id
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-lg shadow-purple-500/20'
                    : 'bg-[#181926] text-slate-300 border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Body Measurements Sliders */}
        <div className="space-y-4 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-rose-400" /> Body Mannequin
            </span>
            <span className="text-[10px] font-mono text-purple-400">Metric (CM)</span>
          </div>

          {/* Height */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Height</span>
              <span className="text-[#8B5CF6] font-bold">{measurements.height_cm} cm</span>
            </div>
            <input
              type="range"
              min="150"
              max="200"
              value={measurements.height_cm}
              onChange={(e) => onMeasurementChange('height_cm', Number(e.target.value))}
              className="w-full accent-[#8B5CF6] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Chest / Bust */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Chest / Bust</span>
              <span className="text-[#8B5CF6] font-bold">{measurements.chest_cm} cm</span>
            </div>
            <input
              type="range"
              min="70"
              max="120"
              value={measurements.chest_cm}
              onChange={(e) => onMeasurementChange('chest_cm', Number(e.target.value))}
              className="w-full accent-[#8B5CF6] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Waist */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Waist Circumference</span>
              <span className="text-[#8B5CF6] font-bold">{measurements.waist_cm} cm</span>
            </div>
            <input
              type="range"
              min="50"
              max="110"
              value={measurements.waist_cm}
              onChange={(e) => onMeasurementChange('waist_cm', Number(e.target.value))}
              className="w-full accent-[#8B5CF6] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Hips */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Hips Circumference</span>
              <span className="text-[#8B5CF6] font-bold">{measurements.hips_cm} cm</span>
            </div>
            <input
              type="range"
              min="75"
              max="130"
              value={measurements.hips_cm}
              onChange={(e) => onMeasurementChange('hips_cm', Number(e.target.value))}
              className="w-full accent-[#8B5CF6] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Garment Tailoring Sliders */}
        <div className="space-y-4 pt-2 border-t border-white/5">
          <span className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-amber-400" /> Tailoring Parameters
          </span>

          {/* Sleeve Length */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Sleeve Length</span>
              <span className="text-amber-400 font-bold">{measurements.sleeve_length_cm} cm</span>
            </div>
            <input
              type="range"
              min="0"
              max="75"
              value={measurements.sleeve_length_cm}
              onChange={(e) => onMeasurementChange('sleeve_length_cm', Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Neckline Cut Depth */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Neckline Plunge Cut</span>
              <span className="text-amber-400 font-bold">{Math.round(necklineCut * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={necklineCut}
              onChange={(e) => onNecklineChange(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Fit Tightness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Silhouette Tightness</span>
              <span className="text-rose-400 font-bold">{Math.round(fitTightness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={fitTightness}
              onChange={(e) => onFitChange(Number(e.target.value))}
              className="w-full accent-rose-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementControls;
