import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

interface TechnicalSketch2DProps {
  category: string;
  neckline: string;
  sleeve: string;
  color: string;
}

export const TechnicalSketch2D: React.FC<TechnicalSketch2DProps> = ({
  category,
  neckline,
  sleeve,
  color: _color,
}) => {
  const [fabricType, setFabricType] = useState('Self');
  const [sketchView, setSketchView] = useState<'both' | 'front' | 'back'>('both');

  // Dynamic Tags based on selections
  const tags = [
    category === 'dress' ? 'DRESS' : category === 'suit' ? 'TAILORED SUIT' : 'KNITS',
    neckline === 'vneck' ? 'HI V-NECK BINDING' : neckline === 'collar' ? 'STAND COLLAR' : 'CREW NECK',
    sleeve === 'short' ? 'SHORT SLEEVES' : sleeve === 'full' ? 'FULL SLEEVES' : 'SLEEVELESS',
    'NO SEAM',
  ];

  return (
    <div className="flex-1 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Panel Header */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850">
        <div className="flex items-center gap-4">
          <h3 className="font-poppins font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
            TECHNICAL SKETCH
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400">FABRIC TYPE:</span>
            <select
              value={fabricType}
              onChange={(e) => setFabricType(e.target.value)}
              className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="Self">Self</option>
              <option value="Contrast">Contrast</option>
              <option value="Lining">Lining</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] font-poppins font-bold text-slate-400">
            <button
              onClick={() => setSketchView('both')}
              className={`px-2 py-0.5 rounded ${sketchView === 'both' ? 'bg-[#e05297] text-white' : 'hover:text-slate-800'}`}
            >
              BOTH
            </button>
            <button
              onClick={() => setSketchView('front')}
              className={`px-2 py-0.5 rounded ${sketchView === 'front' ? 'bg-[#e05297] text-white' : 'hover:text-slate-800'}`}
            >
              FRONT
            </button>
            <button
              onClick={() => setSketchView('back')}
              className={`px-2 py-0.5 rounded ${sketchView === 'back' ? 'bg-[#e05297] text-white' : 'hover:text-slate-800'}`}
            >
              BACK
            </button>
          </div>
          <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>
      </div>

      {/* Vector Line Canvas Area */}
      <div className="flex-1 p-6 flex items-center justify-center bg-white dark:bg-slate-900 relative">
        <div className="flex items-center justify-center gap-12 max-w-full">
          {/* Front View Technical Vector Drawing */}
          {(sketchView === 'both' || sketchView === 'front') && (
            <div className="flex flex-col items-center gap-2">
              <svg width="220" height="300" viewBox="0 0 220 300" className="w-full max-w-[220px] h-auto">
                {/* Bodice Front */}
                <path
                  d="M 60 40 L 160 40 L 175 110 L 155 240 L 65 240 L 45 110 Z"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Neckline Cut */}
                {neckline === 'vneck' ? (
                  <path d="M 90 40 L 110 80 L 130 40" fill="none" stroke="#1e293b" strokeWidth="2" />
                ) : neckline === 'collar' ? (
                  <path d="M 90 40 L 90 25 L 130 25 L 130 40" fill="none" stroke="#1e293b" strokeWidth="2" />
                ) : (
                  <path d="M 85 40 Q 110 65 135 40" fill="none" stroke="#1e293b" strokeWidth="2" />
                )}
                {/* Sleeves */}
                {sleeve !== 'sleeveless' && (
                  <>
                    <path
                      d="M 60 40 L 15 85 L 35 125 L 50 110"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <path
                      d="M 160 40 L 205 85 L 185 125 L 170 110"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                  </>
                )}
                {/* Seam Lines */}
                <line x1="110" y1="80" x2="110" y2="240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">FRONT VIEW</span>
            </div>
          )}

          {/* Back View Technical Vector Drawing */}
          {(sketchView === 'both' || sketchView === 'back') && (
            <div className="flex flex-col items-center gap-2">
              <svg width="150" height="210" viewBox="0 0 220 300" className="w-full max-w-[150px] h-auto">
                <path
                  d="M 60 40 L 160 40 L 175 110 L 155 240 L 65 240 L 45 110 Z"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.8"
                />
                <path d="M 85 40 Q 110 48 135 40" fill="none" stroke="#64748b" strokeWidth="1.8" />
                {sleeve !== 'sleeveless' && (
                  <>
                    <path d="M 60 40 L 15 85 L 35 125 L 50 110" fill="none" stroke="#64748b" strokeWidth="1.8" />
                    <path d="M 160 40 L 205 85 L 185 125 L 170 110" fill="none" stroke="#64748b" strokeWidth="1.8" />
                  </>
                )}
                {/* Back Zipper Line */}
                <line x1="110" y1="45" x2="110" y2="235" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">BACK VIEW</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Tag Pills */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tags.map((t, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 uppercase shrink-0 shadow-2xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSketch2D;
