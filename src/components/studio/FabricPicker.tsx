import React from 'react';
import { Palette, Sliders } from 'lucide-react';

interface FabricConfig {
  primary_color: string;
  secondary_color: string;
  roughness: number;
  metalness: number;
  texture_type: string;
}

interface FabricPickerProps {
  config: FabricConfig;
  onChange: (updated: Partial<FabricConfig>) => void;
}

export const FabricPicker: React.FC<FabricPickerProps> = ({ config, onChange }) => {
  const textures = [
    { id: 'mulberry_silk', name: 'Mulberry Silk', roughness: 0.25, metalness: 0.4 },
    { id: 'royal_velvet', name: 'Royal Velvet', roughness: 0.75, metalness: 0.1 },
    { id: 'french_organza', name: 'French Organza', roughness: 0.15, metalness: 0.6 },
    { id: 'cotton_twill', name: 'Cotton Twill', roughness: 0.5, metalness: 0.0 },
    { id: 'brocade_jacquard', name: 'Gold Brocade', roughness: 0.35, metalness: 0.8 },
    { id: 'banarasi_silk', name: 'Banarasi Weave', roughness: 0.3, metalness: 0.7 },
  ];

  const colorPresets = [
    '#8B5CF6', // Royal Purple
    '#E05297', // Rose Gold Accent
    '#10B981', // Emerald
    '#F59E0B', // Champagne Gold
    '#3B82F6', // Sapphire Blue
    '#EC4899', // Crimson Pink
    '#18181B', // Midnight Black
    '#F4F4F5', // Pure Ivory
  ];

  return (
    <div className="w-80 bg-[#12131C] border-l border-white/10 flex flex-col h-full overflow-y-auto font-inter text-slate-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#171824] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#E05297]" />
          <h3 className="font-poppins font-bold text-xs uppercase tracking-wider text-white">
            Fabric & Material PBR
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#E05297] bg-[#E05297]/10 px-2 py-0.5 rounded border border-[#E05297]/30">
          Studio PBR
        </span>
      </div>

      <div className="p-4 space-y-6 flex-1">
        {/* 1. Fabric Texture Preset */}
        <div className="space-y-2">
          <label className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 block">
            Textile Weave Preset
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {textures.map((tex) => (
              <button
                key={tex.id}
                onClick={() =>
                  onChange({
                    texture_type: tex.id,
                    roughness: tex.roughness,
                    metalness: tex.metalness,
                  })
                }
                className={`px-3 py-2 rounded-xl text-xs font-poppins font-semibold transition-all text-left border ${
                  config.texture_type === tex.id
                    ? 'bg-[#E05297] text-white border-[#E05297] shadow-lg shadow-pink-500/20'
                    : 'bg-[#181926] text-slate-300 border-white/5 hover:border-white/20'
                }`}
              >
                {tex.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Color Palette Selection */}
        <div className="space-y-4 pt-2 border-t border-white/5">
          <label className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 block">
            Primary Body Color
          </label>

          {/* Color Swatch Grid */}
          <div className="flex flex-wrap gap-2">
            {colorPresets.map((hex) => (
              <button
                key={hex}
                onClick={() => onChange({ primary_color: hex })}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 shadow-md ${
                  config.primary_color === hex ? 'border-white scale-110 ring-2 ring-[#E05297]/50' : 'border-transparent'
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.primary_color}
              onChange={(e) => onChange({ primary_color: e.target.value })}
              className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer bg-transparent"
            />
            <span className="text-xs font-mono text-slate-400">{config.primary_color}</span>
          </div>
        </div>

        {/* 3. Secondary Trim Color */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          <label className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 block">
            Secondary Accent Trim
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.secondary_color}
              onChange={(e) => onChange({ secondary_color: e.target.value })}
              className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer bg-transparent"
            />
            <span className="text-xs font-mono text-slate-400">{config.secondary_color}</span>
          </div>
        </div>

        {/* 4. PBR Material Shading Parameters */}
        <div className="space-y-4 pt-2 border-t border-white/5">
          <span className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" /> PBR Shader Tuning
          </span>

          {/* Roughness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Surface Roughness</span>
              <span className="text-pink-400 font-bold">{Math.round(config.roughness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={config.roughness}
              onChange={(e) => onChange({ roughness: Number(e.target.value) })}
              className="w-full accent-pink-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Metalness / Sheen */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Metallic Sheen</span>
              <span className="text-purple-400 font-bold">{Math.round(config.metalness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={config.metalness}
              onChange={(e) => onChange({ metalness: Number(e.target.value) })}
              className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricPicker;
