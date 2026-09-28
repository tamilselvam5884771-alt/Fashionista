import React from 'react';
import { Layers, Scissors, Ruler, Maximize2 } from 'lucide-react';

interface PatternPreview2DProps {
  category: string;
  measurements: {
    height_cm: number;
    chest_cm: number;
    waist_cm: number;
    hips_cm: number;
    sleeve_length_cm: number;
    inseam_cm: number;
  };
  patternSpecs?: {
    seam_allowance_mm: number;
    cut_pieces_count: number;
  };
  primaryColor?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const PatternPreview2D: React.FC<PatternPreview2DProps> = ({
  category: _category,
  measurements,
  patternSpecs = { seam_allowance_mm: 15, cut_pieces_count: 6 },
  primaryColor = '#8B5CF6',
  isCollapsed = false,
  onToggleCollapse,
}) => {
  // Calculate dynamic SVG scaling based on measurements
  const chestScale = (measurements.chest_cm / 88) * 0.9;
  const waistScale = (measurements.waist_cm / 70) * 0.9;
  const hipsScale = (measurements.hips_cm / 96) * 0.9;
  const sleeveLen = (measurements.sleeve_length_cm / 60) * 45;

  // Estimated fabric consumption in meters
  const fabricMeters = (
    (measurements.chest_cm * 2 + measurements.height_cm * 1.5 + measurements.sleeve_length_cm * 2) /
    180
  ).toFixed(2);

  return (
    <div className="bg-[#12131C] border-t border-white/10 text-white font-inter transition-all duration-300">
      {/* Header Bar */}
      <div
        onClick={onToggleCollapse}
        className="px-4 py-2.5 bg-[#171824] hover:bg-[#1e1f2e] cursor-pointer flex items-center justify-between border-b border-white/5 select-none"
      >
        <div className="flex items-center gap-2 text-xs font-poppins font-bold text-slate-200">
          <Scissors className="w-4 h-4 text-purple-400" />
          <span>2D Parametric Pattern Specs & Cut Pieces</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
            {patternSpecs.cut_pieces_count} Cut Pieces
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Ruler className="w-3.5 h-3.5 text-rose-400" /> Seam Allowance: {patternSpecs.seam_allowance_mm}mm
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" /> Est. Fabric: {fabricMeters}m
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* SVG Flat Pattern Outlines */}
      {!isCollapsed && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-[#0D0E15]">
          {/* Pattern Piece 1: Front Bodice */}
          <div className="p-3 rounded-xl bg-[#141520] border border-white/5 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
              01. Front Bodice
            </span>
            <svg width="120" height="110" viewBox="0 0 120 110" className="w-full max-w-[140px] h-auto">
              <path
                d={`M 35 15 Q 60 ${25 * chestScale} 85 15 L ${80 * chestScale} 45 L ${
                  68 * waistScale
                } 85 L 52 85 L ${40 * waistScale} 45 Z`}
                fill={`${primaryColor}22`}
                stroke={primaryColor}
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />
              <path
                d={`M 38 17 Q 60 ${23 * chestScale} 82 17 L ${77 * chestScale} 43 L ${
                  66 * waistScale
                } 82 L 54 82 L ${43 * waistScale} 43 Z`}
                fill="none"
                stroke="#ffffff44"
                strokeWidth="1"
              />
              {/* Dimensions Labels */}
              <text x="60" y="10" textAnchor="middle" fill="#A1A1AA" fontSize="7" fontFamily="monospace">
                Chest: {measurements.chest_cm}cm
              </text>
              <text x="60" y="98" textAnchor="middle" fill="#A1A1AA" fontSize="7" fontFamily="monospace">
                Waist: {measurements.waist_cm}cm
              </text>
            </svg>
          </div>

          {/* Pattern Piece 2: Back Bodice */}
          <div className="p-3 rounded-xl bg-[#141520] border border-white/5 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
              02. Back Bodice
            </span>
            <svg width="120" height="110" viewBox="0 0 120 110" className="w-full max-w-[140px] h-auto">
              <path
                d={`M 32 15 Q 60 18 88 15 L ${83 * chestScale} 45 L ${
                  70 * waistScale
                } 85 L 50 85 L ${37 * waistScale} 45 Z`}
                fill={`${primaryColor}22`}
                stroke={primaryColor}
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />
              <text x="60" y="55" textAnchor="middle" fill="#E4E4E7" fontSize="8" fontFamily="sans-serif">
                Back Center Fold
              </text>
            </svg>
          </div>

          {/* Pattern Piece 3: Sleeves */}
          <div className="p-3 rounded-xl bg-[#141520] border border-white/5 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
              03. Left & Right Sleeve (x2)
            </span>
            <svg width="120" height="110" viewBox="0 0 120 110" className="w-full max-w-[140px] h-auto">
              <path
                d={`M 35 15 C 45 5, 75 5, 85 15 L 75 ${15 + sleeveLen} L 45 ${
                  15 + sleeveLen
                } Z`}
                fill={`${primaryColor}22`}
                stroke={primaryColor}
                strokeWidth="1.8"
              />
              <text x="60" y={40 + sleeveLen / 2} textAnchor="middle" fill="#A1A1AA" fontSize="7" fontFamily="monospace">
                Len: {measurements.sleeve_length_cm}cm
              </text>
            </svg>
          </div>

          {/* Pattern Piece 4: Skirt / Lower Garment */}
          <div className="p-3 rounded-xl bg-[#141520] border border-white/5 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
              04. Lower Panel / Skirt (x2)
            </span>
            <svg width="120" height="110" viewBox="0 0 120 110" className="w-full max-w-[140px] h-auto">
              <path
                d={`M ${50 - waistScale * 15} 15 L ${70 + waistScale * 15} 15 L ${
                  75 + hipsScale * 20
                } 90 L ${45 - hipsScale * 20} 90 Z`}
                fill={`${primaryColor}22`}
                stroke={primaryColor}
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />
              <text x="60" y="98" textAnchor="middle" fill="#A1A1AA" fontSize="7" fontFamily="monospace">
                Hips: {measurements.hips_cm}cm
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPreview2D;
