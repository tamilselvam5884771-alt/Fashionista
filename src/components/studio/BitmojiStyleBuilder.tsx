import React, { useState } from 'react';
import { Layers, Scissors, Palette, Sparkles, Check, Crown, Shirt, Briefcase, Heart } from 'lucide-react';

export interface OutfitSelections {
  category: string;
  neckline: string;
  sleeve: string;
  hem: string;
  fabric: string;
  color: string;
}

interface BitmojiStyleBuilderProps {
  selections: OutfitSelections;
  onChange: (updated: Partial<OutfitSelections>) => void;
}

export const BitmojiStyleBuilder: React.FC<BitmojiStyleBuilderProps> = ({
  selections,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<'silhouette' | 'neckline' | 'length' | 'fabric'>('silhouette');

  const categories = [
    { id: 'dress', label: 'Classic Dress', icon: Crown, desc: 'Flowing Haute Couture Silhouette' },
    { id: 'tee_skirt', label: 'Casual Tee & Skirt', icon: Shirt, desc: 'Modern Atelier Two-Piece' },
    { id: 'suit', label: 'Formal Suit / Jacket', icon: Briefcase, desc: 'Sharp Structured Blazer' },
    { id: 'ethnic', label: 'Traditional Ethnic', icon: Heart, desc: 'Heritage Brocade Lehenga' },
  ];

  const necklines = [
    { id: 'vneck', label: 'V-Neck Plunge', desc: 'Deep V-shaped Cut' },
    { id: 'crew', label: 'Round / Crew', desc: 'Classic Rounded Collar' },
    { id: 'offshoulder', label: 'Off-Shoulder', desc: 'Sweeping Shoulder Seam' },
    { id: 'collar', label: 'High Neck Collar', desc: 'Executive Stand Collar' },
    { id: 'sweetheart', label: 'Sweetheart Cut', desc: 'Curved Bustline' },
  ];

  const sleeves = [
    { id: 'sleeveless', label: 'Sleeveless' },
    { id: 'short', label: 'Short Sleeve' },
    { id: 'threequarter', label: '3/4 Sleeve' },
    { id: 'full', label: 'Full Length' },
  ];

  const hems = [
    { id: 'mini', label: 'Mini Cut' },
    { id: 'midi', label: 'Midi Calf Length' },
    { id: 'floor', label: 'Full Floor Length' },
  ];

  const fabrics = [
    { id: 'silk', label: 'Silk / Satin', sheen: 'High Gloss Sheen' },
    { id: 'cotton', label: 'Cotton Twill', sheen: 'Breathable Matte' },
    { id: 'velvet', label: 'Royal Velvet', sheen: 'Rich Heavy Texture' },
    { id: 'denim', label: 'Structured Denim', sheen: 'Casual Weave' },
    { id: 'linen', label: 'Natural Linen', sheen: 'Light Organic' },
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
    { hex: '#D97706', name: 'Antique Amber' },
    { hex: '#6366F1', name: 'Indigo Velvet' },
  ];

  return (
    <div className="w-96 bg-[#12131C]/95 backdrop-blur-2xl border-l border-white/10 flex flex-col h-full overflow-hidden font-inter text-slate-200 select-none">
      {/* Top Tab Bar Navigation */}
      <div className="p-2 bg-[#171824] border-b border-white/10 grid grid-cols-4 gap-1">
        <button
          onClick={() => setActiveTab('silhouette')}
          className={`py-2 px-2 rounded-xl text-center font-poppins font-bold text-[11px] flex flex-col items-center gap-1 transition-all ${
            activeTab === 'silhouette'
              ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Silhouette</span>
        </button>

        <button
          onClick={() => setActiveTab('neckline')}
          className={`py-2 px-2 rounded-xl text-center font-poppins font-bold text-[11px] flex flex-col items-center gap-1 transition-all ${
            activeTab === 'neckline'
              ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Neckline</span>
        </button>

        <button
          onClick={() => setActiveTab('length')}
          className={`py-2 px-2 rounded-xl text-center font-poppins font-bold text-[11px] flex flex-col items-center gap-1 transition-all ${
            activeTab === 'length'
              ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Length</span>
        </button>

        <button
          onClick={() => setActiveTab('fabric')}
          className={`py-2 px-2 rounded-xl text-center font-poppins font-bold text-[11px] flex flex-col items-center gap-1 transition-all ${
            activeTab === 'fabric'
              ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Fabric</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* TAB 1: Garment Silhouette */}
        {activeTab === 'silhouette' && (
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
              Select Garment Type
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selections.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onChange({ category: cat.id })}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#8B5CF6]/30 to-[#E05297]/30 border-[#8B5CF6] text-white shadow-xl ring-1 ring-[#8B5CF6]'
                        : 'bg-[#181926] border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${
                          isSelected ? 'bg-[#8B5CF6] text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-poppins font-bold text-xs text-white">{cat.label}</h5>
                        <p className="text-[11px] text-slate-400 font-inter">{cat.desc}</p>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-[#8B5CF6]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Neckline Styles */}
        {activeTab === 'neckline' && (
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
              Select Neckline Style
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {necklines.map((neck) => {
                const isSelected = selections.neckline === neck.id;
                return (
                  <button
                    key={neck.id}
                    onClick={() => onChange({ neckline: neck.id })}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-lg'
                        : 'bg-[#181926] border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <h5 className="font-poppins font-bold text-xs">{neck.label}</h5>
                      <p className="text-[10px] text-slate-300 font-inter">{neck.desc}</p>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Sleeve & Hem Length */}
        {activeTab === 'length' && (
          <div className="space-y-6">
            {/* Sleeves */}
            <div className="space-y-2">
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
                Sleeve Length
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {sleeves.map((slv) => {
                  const isSelected = selections.sleeve === slv.id;
                  return (
                    <button
                      key={slv.id}
                      onClick={() => onChange({ sleeve: slv.id })}
                      className={`py-3 px-3 rounded-xl border text-xs font-poppins font-bold text-center transition-all ${
                        isSelected
                          ? 'bg-[#E05297] border-[#E05297] text-white shadow-md'
                          : 'bg-[#181926] border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {slv.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hem */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
                Garment Hem Cut
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {hems.map((h) => {
                  const isSelected = selections.hem === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => onChange({ hem: h.id })}
                      className={`py-3 px-4 rounded-xl border text-xs font-poppins font-bold text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-md'
                          : 'bg-[#181926] border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span>{h.label}</span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Fabrics & Colors */}
        {activeTab === 'fabric' && (
          <div className="space-y-6">
            {/* Fabric Selector */}
            <div className="space-y-2">
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
                Textile Weave Material
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {fabrics.map((f) => {
                  const isSelected = selections.fabric === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => onChange({ fabric: f.id })}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#E05297] border-[#E05297] text-white shadow-md'
                          : 'bg-[#181926] border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h5 className="font-poppins font-bold text-xs">{f.label}</h5>
                        <span className="text-[10px] text-slate-300 font-mono">{f.sheen}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400">
                Color Palette Swatches
              </h4>

              <div className="grid grid-cols-5 gap-3">
                {colors.map((c) => {
                  const isSelected = selections.color === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => onChange({ color: c.hex })}
                      title={c.name}
                      className={`w-10 h-10 rounded-full border-2 transition-transform flex items-center justify-center shadow-lg hover:scale-110 ${
                        isSelected ? 'border-white scale-110 ring-4 ring-[#8B5CF6]/50' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BitmojiStyleBuilder;
