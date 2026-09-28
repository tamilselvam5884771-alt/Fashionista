import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui';
import { TailornovaHeader } from '../components/studio/TailornovaHeader';
import { TailornovaSidebar } from '../components/studio/TailornovaSidebar';
import { TechnicalSketch2D } from '../components/studio/TechnicalSketch2D';
import { FlatPatternGrid } from '../components/studio/FlatPatternGrid';
import { GarmentCanvas3D } from '../components/studio/GarmentCanvas3D';
import { MeasurementControls } from '../components/studio/MeasurementControls';
import type { OutfitSelections } from '../components/studio/BitmojiStyleBuilder';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabaseClient';
import type { GarmentCategory } from '../types';

export const Studio: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();

  // Project Info State
  const [outfitTitle, setOutfitTitle] = useState('UNTITLED DESIGN');
  const [viewMode, setViewMode] = useState<'split' | '3d' | 'pattern'>('split');
  const [isFitModalOpen, setIsFitModalOpen] = useState(false);

  // Mannequin & Selections State
  const [userGender, setUserGender] = useState<'female' | 'male'>('female');
  const [cameraAngle, setCameraAngle] = useState<'front' | 'side' | 'back'>('front');

  const [selections, setSelections] = useState<OutfitSelections>({
    category: 'dress',
    neckline: 'vneck',
    sleeve: 'short',
    hem: 'midi',
    fabric: 'silk',
    color: '#8B5CF6',
  });

  // Parametric Measurements (CUSTOMIZE FIT)
  const [measurements, setMeasurements] = useState({
    height_cm: 170,
    chest_cm: 88,
    waist_cm: 70,
    hips_cm: 96,
    sleeve_length_cm: 60,
    inseam_cm: 78,
  });

  const [necklineCut, setNecklineCut] = useState(0.2);
  const [fitTightness, setFitTightness] = useState(0.4);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch User Profile Gender from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('gender')
          .eq('id', user.id)
          .maybeSingle();

        if (profile?.gender) {
          const g = profile.gender.toLowerCase();
          if (g === 'male' || g === 'm') {
            setUserGender('male');
            setSelections((prev) => ({ ...prev, category: 'suit' }));
          } else {
            setUserGender('female');
          }
        }
      } catch (err) {
        console.error('Error loading profile gender:', err);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSelectionChange = (updated: Partial<OutfitSelections>) => {
    setSelections((prev) => ({ ...prev, ...updated }));
  };

  const handleMeasurementChange = (key: string, val: number) => {
    setMeasurements((prev) => ({ ...prev, [key]: val }));
  };

  // Save Design into Supabase custom_outfits table
  const handleSaveToWardrobe = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required 🔒',
        description: 'Please sign in to save custom CAD outfits to your wardrobe.',
        variant: 'error',
      });
      navigate('/login');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from('custom_outfits').insert({
        user_id: user.id,
        title: outfitTitle,
        category: (selections.category === 'suit' ? 'suit' : selections.category === 'tee_skirt' ? 'skirt' : 'dress') as GarmentCategory,
        measurements: {
          gender: userGender,
          neckline: selections.neckline,
          sleeve: selections.sleeve,
          hem: selections.hem,
          ...measurements,
        },
        fabric_config: {
          primary_color: selections.color,
          texture_type: selections.fabric,
        },
        pattern_specs: {
          cut_pieces_count: 5,
        },
        is_public: true,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'CAD Pattern Saved to Wardrobe ✨',
        description: `"${outfitTitle}" has been saved to your Supabase profile!`,
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Error saving outfit to Supabase:', err);
      toast({
        title: 'Save Failed',
        description: err.message || 'Could not save CAD outfit configuration.',
        variant: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#FAFAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-inter overflow-hidden select-none">
      {/* 1. Top Tailornova Header Bar */}
      <TailornovaHeader
        title={outfitTitle}
        onTitleChange={setOutfitTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenFitModal={() => setIsFitModalOpen(true)}
        onSaveToWardrobe={handleSaveToWardrobe}
        isSaving={isSaving}
      />

      {/* 2. Main Studio Viewport (Sidebar + Dual Canvas) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Vertical Icon Menu Bar */}
        <TailornovaSidebar selections={selections} onChange={handleSelectionChange} />

        {/* Center Main Viewport */}
        <div className="flex-1 flex overflow-hidden relative">
          {viewMode === 'split' ? (
            /* Dual Split View: Left Technical Sketch, Right Flat Pattern Grid */
            <div className="flex-1 flex overflow-hidden">
              <TechnicalSketch2D
                category={selections.category}
                neckline={selections.neckline}
                sleeve={selections.sleeve}
                color={selections.color}
              />
              <FlatPatternGrid
                category={selections.category}
                neckline={selections.neckline}
                sleeve={selections.sleeve}
              />
            </div>
          ) : (
            /* Full-Screen 3D Showroom Viewport */
            <div className="flex-1 relative bg-[#07070B]">
              <GarmentCanvas3D
                gender={userGender}
                category={selections.category}
                neckline={selections.neckline}
                sleeve={selections.sleeve}
                hem={selections.hem}
                fabric={selections.fabric}
                color={selections.color}
                cameraAngle={cameraAngle}
                onCameraAngleChange={setCameraAngle}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. CUSTOMIZE FIT Parametric Sliders Modal */}
      <Modal
        isOpen={isFitModalOpen}
        onClose={() => setIsFitModalOpen(false)}
        title="Tailornova Parametric Fit Customizer"
        maxWidth="md"
      >
        <div className="h-[460px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <MeasurementControls
            category={(selections.category === 'suit' ? 'suit' : selections.category === 'tee_skirt' ? 'skirt' : 'dress') as GarmentCategory}
            onCategoryChange={(cat) => handleSelectionChange({ category: cat })}
            measurements={measurements}
            onMeasurementChange={handleMeasurementChange}
            necklineCut={necklineCut}
            onNecklineChange={setNecklineCut}
            fitTightness={fitTightness}
            onFitChange={setFitTightness}
            onResetDefault={() => {
              setMeasurements({
                height_cm: 170,
                chest_cm: 88,
                waist_cm: 70,
                hips_cm: 96,
                sleeve_length_cm: 60,
                inseam_cm: 78,
              });
              toast({ title: 'Measurements Reset', description: 'Reset to standard mannequin body size.', variant: 'info' });
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Studio;
