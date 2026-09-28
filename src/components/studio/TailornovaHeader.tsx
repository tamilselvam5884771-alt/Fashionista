import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  RotateCcw,
  RotateCw,
  FileText,
  Layers,
  Ruler,
  HelpCircle,
  Download,
  Box,
  Save,
} from 'lucide-react';
import { Button } from '../ui';

interface TailornovaHeaderProps {
  title: string;
  onTitleChange: (val: string) => void;
  viewMode: 'split' | '3d' | 'pattern';
  onViewModeChange: (mode: 'split' | '3d' | 'pattern') => void;
  onOpenFitModal: () => void;
  onSaveToWardrobe: () => void;
  isSaving?: boolean;
}

export const TailornovaHeader: React.FC<TailornovaHeaderProps> = ({
  title,
  onTitleChange,
  viewMode,
  onViewModeChange,
  onOpenFitModal,
  onSaveToWardrobe,
  isSaving = false,
}) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 font-inter text-slate-800 dark:text-slate-100 shadow-sm select-none">
      {/* 1. Left Brand & Project Title */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#e05297] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Scissors className="w-4 h-4" />
          </div>
          <span className="font-poppins font-bold text-lg text-[#e05297] tracking-tight">
            fashionista
          </span>
        </Link>
        <span className="text-slate-300 font-mono text-xs">/</span>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="px-2 py-1 text-xs font-poppins font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded focus:outline-none focus:border-[#e05297] w-48"
        />
      </div>

      {/* 2. Center Top Action Tools Bar */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-poppins font-semibold text-slate-600 dark:text-slate-300">
        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <Scissors className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">DESIGN</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">UNDO</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <RotateCw className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">REDO</span>
        </button>

        <span className="w-px h-6 bg-slate-200 dark:bg-slate-800" />

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <FileText className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">SPECS</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <Ruler className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">EASE</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <Layers className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">SEWING</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <Download className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">YARDAGE</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 hover:text-[#e05297] transition-colors">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span className="text-[10px]">HELP</span>
        </button>
      </div>

      {/* 3. Right Action Bar: CUSTOMIZE FIT, Mode Toggles, Save CTA */}
      <div className="flex items-center gap-3">
        {/* Adjust Fit CTA */}
        <button
          onClick={onOpenFitModal}
          className="px-4 py-2 rounded-full bg-[#e05297] hover:bg-[#c93f82] text-white text-xs font-poppins font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Adjust Fit</span>
        </button>

        {/* View Mode Switcher Toggles */}
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1">
          <button
            onClick={() => onViewModeChange('split')}
            className={`px-3 py-1 rounded-full text-xs font-poppins font-bold flex items-center gap-1 transition-all ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-900 text-[#e05297] shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="Technical Sketch View"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Sketch</span>
          </button>

          <button
            onClick={() => onViewModeChange('3d')}
            className={`px-3 py-1 rounded-full text-xs font-poppins font-bold flex items-center gap-1 transition-all ${
              viewMode === '3d'
                ? 'bg-white dark:bg-slate-900 text-[#e05297] shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="3D Preview"
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Preview</span>
          </button>
        </div>

        {/* Save Outfit CTA */}
        <Button
          variant="primary"
          size="sm"
          isLoading={isSaving}
          onClick={onSaveToWardrobe}
          className="rounded-full px-4 text-xs font-poppins font-bold shadow-md"
          leftIcon={<Save className="w-3.5 h-3.5" />}
        >
          Save Outfit
        </Button>
      </div>
    </header>
  );
};

export default TailornovaHeader;
