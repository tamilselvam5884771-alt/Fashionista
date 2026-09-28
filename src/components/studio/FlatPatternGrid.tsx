import React, { useState } from 'react';
import { MoreVertical, Download, Printer } from 'lucide-react';
import { useToast } from '../ui';

interface FlatPatternGridProps {
  category: string;
  neckline: string;
  sleeve: string;
}

export const FlatPatternGrid: React.FC<FlatPatternGridProps> = ({
  category: _category,
  neckline: _neckline,
  sleeve: _sleeve,
}) => {
  const { toast } = useToast();
  const [sampleSize, setSampleSize] = useState('Medium (M / US 6)');

  const handleDownloadPDF = () => {
    toast({
      title: 'Vector Sewing Pattern Generated 🖨️',
      description: 'Downloaded production 2D CAD pattern PDF with 15mm seam allowances.',
      variant: 'success',
    });
  };

  return (
    <div className="flex-1 bg-[#FAFAFC] dark:bg-slate-950 flex flex-col h-full overflow-hidden select-none font-inter relative">
      {/* Grid Graph Background */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <h3 className="font-poppins font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
          FLAT PATTERN
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1 text-[11px] font-poppins font-bold text-slate-600 dark:text-slate-300 hover:text-[#e05297]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>EXPORT PDF</span>
          </button>
          <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>
      </div>

      {/* Pattern Pieces Canvas Area */}
      <div className="flex-1 p-6 overflow-auto flex items-center justify-center z-10">
        <svg width="480" height="380" viewBox="0 0 480 380" className="w-full max-w-[500px] h-auto">
          {/* Pattern 1: Front Bodice Piece */}
          <g transform="translate(40, 20)">
            <path
              d="M 10 20 Q 60 45 110 20 L 140 160 L 10 160 Z"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            {/* Seam Allowance Dash Outer Line */}
            <path
              d="M 5 15 Q 60 40 115 15 L 146 166 L 4 166 Z"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <text x="75" y="90" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              FRONT BODICE (x1 Cut)
            </text>
            <text x="75" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
              Grainline ↑
            </text>
          </g>

          {/* Pattern 2: Back Bodice Piece */}
          <g transform="translate(220, 20)">
            <path
              d="M 10 20 Q 60 28 110 20 L 140 160 L 10 160 Z"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            <path
              d="M 5 15 Q 60 23 115 15 L 146 166 L 4 166 Z"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <text x="75" y="90" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              BACK BODICE (x2 Cut)
            </text>
            <text x="75" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
              Zipper Seam Line
            </text>
          </g>

          {/* Pattern 3: Sleeve Cap Piece */}
          <g transform="translate(100, 210)">
            <path
              d="M 10 70 C 40 10, 110 10, 140 70 L 130 110 L 20 110 Z"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            <text x="75" y="70" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              SLEEVE CAP (x2 Cut)
            </text>
          </g>

          {/* Pattern 4: Neck Binding Strip */}
          <g transform="translate(260, 230)">
            <rect x="0" y="0" width="160" height="25" fill="none" stroke="#1e293b" strokeWidth="1.5" />
            <text x="80" y="16" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
              NECK BINDING STRIP
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-between z-10">
        <select
          value={sampleSize}
          onChange={(e) => setSampleSize(e.target.value)}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="Small (S / US 4)">Small (S / US 4)</option>
          <option value="Medium (M / US 6)">Medium (M / US 6)</option>
          <option value="Large (L / US 10)">Large (L / US 10)</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-1.5 rounded-full bg-[#e05297] hover:bg-[#c93f82] text-white text-xs font-poppins font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Pattern PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlatPatternGrid;
