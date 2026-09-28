import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RotateCcw,
  Star,
  MapPin,
  Clock,
  Scissors,
  Layers,
  Palette,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Video,
  Sliders,
  Coins,
  TrendingDown,
  Check,
  Zap,
} from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge, useToast } from '../components/ui';
import { ConsultationBookingModal } from '../components/features';
import { analyzeOutfitImage, type OutfitAnalysisResult } from '../lib/aiService';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabaseClient';

// --- Smooth Animated Number Counter Component ---
const AnimatedNumber: React.FC<{ value: number; prefix?: string }> = ({ value, prefix = '₹' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let animationFrameId: number;
    const startValue = displayValue;
    const endValue = value;
    const duration = 350; // ms
    const startTime = performance.now();

    const updateNumber = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= duration) {
        setDisplayValue(endValue);
      } else {
        const progress = elapsedTime / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(startValue + (endValue - startValue) * easeProgress);
        setDisplayValue(current);
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString()}</span>;
};

// --- Budget Circular Fabric Swatches Data ---
export interface BudgetFabricSwatch {
  id: string;
  name: string;
  subLabel: string;
  colorGradient: string;
  priceDiff: number; // in INR
  tierTag: string;
  description: string;
}

const BUDGET_FABRIC_SWATCHES: BudgetFabricSwatch[] = [
  {
    id: 'cotton',
    name: 'Cotton Blend',
    subLabel: 'Lightweight & Matte',
    colorGradient: 'from-amber-200 via-amber-400 to-yellow-500 border-amber-300 text-amber-950',
    priceDiff: -3200,
    tierTag: 'Budget Choice',
    description: 'Soft daily-wear feel with machine detailing.',
  },
  {
    id: 'georgette',
    name: 'Poly Georgette',
    subLabel: 'Fluid & Graceful',
    colorGradient: 'from-purple-300 via-pink-400 to-rose-400 border-purple-300 text-purple-950',
    priceDiff: -1500,
    tierTag: 'Smart Value',
    description: 'Breezy sheer drape ideal for party wear.',
  },
  {
    id: 'raw_silk',
    name: 'Raw Velvet / Silk',
    subLabel: 'Signature Runway',
    colorGradient: 'from-indigo-600 via-purple-700 to-purple-900 border-indigo-400 text-white',
    priceDiff: 0,
    tierTag: 'Original Fit',
    description: 'Lustrous plush finish with heavy structure.',
  },
  {
    id: 'banarasi',
    name: 'Pure Banarasi Silk',
    subLabel: 'Handloom Royal',
    colorGradient: 'from-amber-400 via-rose-500 to-purple-950 border-amber-300 text-white',
    priceDiff: 6500,
    tierTag: 'Royal Heritage',
    description: 'Intricate metallic Zari weaving by master weavers.',
  },
];

// --- Budget Tier Matcher Logic ---
const getBudgetTierDetails = (price: number) => {
  if (price < 5000) {
    return {
      tierName: 'Budget Alternative',
      badgeVariant: 'grey' as const,
      recommendedFabric: 'Cotton-Blend / Poly Satin',
      recommendedEmbroidery: 'Machine Stitching & Printed Accents',
      stitchingType: 'Standard Tailoring & Single Lining',
      deliveryDays: '5-7 Days',
      savingTip: 'Ideal for casual events & everyday elegance',
    };
  } else if (price < 15000) {
    return {
      tierName: 'Smart Atelier Fit',
      badgeVariant: 'lavender' as const,
      recommendedFabric: 'Georgette / Chiffon / Art Silk',
      recommendedEmbroidery: 'Thread Zari & Sequence Highlights',
      stitchingType: 'Custom Fitted Lining & Reinforced Seams',
      deliveryDays: '7-10 Days',
      savingTip: 'Perfect balance of luxury look and value',
    };
  } else if (price < 30000) {
    return {
      tierName: 'Bespoke Couture',
      badgeVariant: 'gold' as const,
      recommendedFabric: 'Raw Silk / Pure Organza / Velvet',
      recommendedEmbroidery: 'Hand-Stitched Zardozi & Threadwork',
      stitchingType: 'Bespoke 3D Fitting & Padded Structure',
      deliveryDays: '10-14 Days',
      savingTip: 'High fashion runway quality for weddings',
    };
  } else {
    return {
      tierName: 'Royal Master Tier',
      badgeVariant: 'rose' as const,
      recommendedFabric: 'Pure Banarasi Silk / Imported Velvet',
      recommendedEmbroidery: '24k Gold Thread Zardozi & Swarovski Crystal Work',
      stitchingType: 'Master Artisan Handcrafting & Heavy Silk Lining',
      deliveryDays: '14-21 Days',
      savingTip: 'Flagship bridal couture craftsmanship',
    };
  }
};

export const Design: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();

  // Workflow State
  const [step, setStep] = useState<'upload' | 'analyzing' | 'results' | 'error'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzingStepText, setAnalyzingStepText] = useState('Scanning dress silhouette...');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Dynamic AI Result State
  const [aiResult, setAiResult] = useState<OutfitAnalysisResult | null>(null);

  // Interactive Customization State
  const [isLuxury, setIsLuxury] = useState(true);
  const [selectedFabric, setSelectedFabric] = useState('Royal Velvet');
  const [selectedColor, setSelectedColor] = useState({
    name: 'Royal Purple',
    hex: '#5B2C91',
    bgClass: 'bg-royal-purple',
  });

  // Recreate in Your Budget State
  const [sliderBudget, setSliderBudget] = useState<number>(15000);
  const [selectedBudgetFabric, setSelectedBudgetFabric] = useState<BudgetFabricSwatch>(
    BUDGET_FABRIC_SWATCHES[2] // Raw Velvet/Silk default
  );
  const [isSavingDesign, setIsSavingDesign] = useState(false);

  // Modal Booking State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBoutique, setSelectedBoutique] = useState<string>('Atelier Le Paris');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sample Presets
  const presets = [
    {
      name: 'Velvet Evening Gown',
      url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Royal Bridal Train',
      url: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Silk Cocktail Outfit',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Fabric & Color Swatches Option List
  const fabricSwatches = [
    { name: 'Royal Velvet', priceDiff: 0 },
    { name: 'Pure Dupion Silk', priceDiff: 350 },
    { name: 'Italian Satin', priceDiff: 200 },
    { name: 'Organza Silk', priceDiff: 150 },
    { name: 'Linen Cashmere', priceDiff: -100 },
  ];

  const colorSwatches = [
    { name: 'Royal Purple', hex: '#5B2C91', bgClass: 'bg-royal-purple' },
    { name: 'Rose Gold', hex: '#B76E79', bgClass: 'bg-rose-gold' },
    { name: 'Emerald Silk', hex: '#046A38', bgClass: 'bg-emerald-700' },
    { name: 'Midnight Black', hex: '#0F172A', bgClass: 'bg-slate-900' },
    { name: 'Champagne Gold', hex: '#F7E7CE', bgClass: 'bg-amber-300' },
  ];

  // Trigger Image Analysis Pipeline
  const startAnalysis = async (imageSrc: string) => {
    setStep('analyzing');
    setAnalysisError(null);

    const steps = [
      'Scanning dress silhouette & necklines...',
      'Detecting fabric weave & embroidery texture...',
      'Matching luxury atelier database...',
      'Calculating custom fitting estimates...',
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < steps.length) {
        setAnalyzingStepText(steps[currentIdx]);
      }
    }, 600);

    try {
      const result = await analyzeOutfitImage(imageSrc);
      setAiResult(result);
      // Initialize slider budget based on estimate converted approx to INR
      if (result.estimatedPrice) {
        setSliderBudget(Math.round(result.estimatedPrice * 18));
      }
      setStep('results');
    } catch (err: any) {
      console.error('AI Analysis failed:', err);
      setAnalysisError(err?.message || 'Failed to analyze garment image. Please try again.');
      setStep('error');
    } finally {
      clearInterval(interval);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setUploadedImage(src);
        startAnalysis(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setUploadedImage(src);
        startAnalysis(src);
      };
      reader.readAsDataURL(file);
    }
  };

  // Base Price Calculation
  const currentFabricObj = fabricSwatches.find((f) => f.name === selectedFabric);
  const basePrice = isLuxury
    ? aiResult?.luxuryPrice || 2850
    : aiResult?.estimatedPrice || 890;
  const totalPrice = basePrice + (currentFabricObj?.priceDiff || 0);

  // Recreate Budget Calculation
  const finalRecreatePrice = Math.max(1500, sliderBudget + selectedBudgetFabric.priceDiff);
  const currentTierDetails = getBudgetTierDetails(sliderBudget);

  const savingsCalloutText =
    selectedBudgetFabric.priceDiff < 0
      ? `Switching to ${selectedBudgetFabric.name} saves ~₹${Math.abs(selectedBudgetFabric.priceDiff).toLocaleString()}`
      : selectedBudgetFabric.priceDiff > 0
      ? `Upgrading to ${selectedBudgetFabric.name} adds +₹${selectedBudgetFabric.priceDiff.toLocaleString()}`
      : 'Original Signature Design Fabric Selected';

  // Save Custom Recreate Request to Supabase
  const handleSaveDesignRequest = async () => {
    if (!user) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to save your custom design request.',
        variant: 'error',
      });
      return;
    }

    setIsSavingDesign(true);
    try {
      const payload = {
        user_id: user.id,
        uploaded_image_url: uploadedImage || null,
        price_estimate: finalRecreatePrice,
        ai_attributes: {
          budget_slider_inr: sliderBudget,
          final_price_inr: finalRecreatePrice,
          selected_fabric: selectedBudgetFabric.name,
          fabric_price_diff_inr: selectedBudgetFabric.priceDiff,
          savings_callout: savingsCalloutText,
          matched_tier: currentTierDetails.tierName,
          embroidery_suggestion: currentTierDetails.recommendedEmbroidery,
          recommended_fabric: currentTierDetails.recommendedFabric,
          stitching_type: currentTierDetails.stitchingType,
          delivery_estimate: currentTierDetails.deliveryDays,
          dress_type: aiResult?.dressType || 'Evening Velvet Gown',
          neck_style: aiResult?.neckStyle || 'Plunging V-Neck',
          color: selectedColor.name,
        },
        status: 'pending',
      };

      const { error } = await supabase.from('design_requests').insert(payload);

      if (error) throw error;

      toast({
        title: 'Recreated Design Saved! ✨',
        description: `Saved request for ₹${finalRecreatePrice.toLocaleString()} (${selectedBudgetFabric.name}). Saved to your atelier profile.`,
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Error saving design request:', err);
      toast({
        title: 'Save Failed',
        description: err.message || 'Could not save design request to database.',
        variant: 'error',
      });
    } finally {
      setIsSavingDesign(false);
    }
  };

  const resetWorkflow = () => {
    setStep('upload');
    setUploadedImage(null);
    setAiResult(null);
    setAnalysisError(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-inter">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <Badge variant="rose" dot className="mb-2">
            AI Style Identifier
          </Badge>
          <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#8B5CF6] dark:text-purple-400 animate-pulse" />
            Identify My Outfit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter mt-1 max-w-2xl">
            Upload a photo of any outfit. Our AI identifies the dress style, fabric, and matches expert tailors to recreate it in your budget.
          </p>
        </div>

        {(step === 'results' || step === 'error') && (
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-4 h-4" />} onClick={resetWorkflow}>
            Upload Another Photo
          </Button>
        )}
      </div>

      {/* Step Indicators Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-poppins font-semibold">
        <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 'upload' ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-purple-400' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-bold">1</span>
          <span>Upload a Photo</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 'analyzing' ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-purple-400' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-bold">2</span>
          <span>We Identify Style</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 'results' ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-purple-400' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-bold">3</span>
          <span>Choose a Designer</span>
        </div>
        <div className="p-3 rounded-xl border flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400">
          <span className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px] font-bold">4</span>
          <span>Confirm Your Order</span>
        </div>
      </div>

      {/* STEP 1: Upload Zone */}
      {step === 'upload' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl p-10 sm:p-16 border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center space-y-4 shadow-sm hover:shadow-md ${
              isDragging
                ? 'border-royal-purple bg-royal-purple/5 dark:bg-royal-purple/10 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-royal-purple/60 dark:hover:border-lavender/60'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-3xl bg-lavender/40 dark:bg-slate-800 text-royal-purple dark:text-lavender flex items-center justify-center shadow-sm">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
                Drag & Drop Outfit Screenshot Here
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
                Supports Pinterest, Instagram, or runway inspiration photos (PNG, JPG, WEBP)
              </p>
            </div>

            <Button variant="primary" size="md" leftIcon={<ImageIcon className="w-4 h-4" />}>
              Browse Image Files
            </Button>
          </div>

          {/* Quick Presets Trial */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-poppins block">
              Or Try A Sample Outfit Screenshot:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {presets.map((preset, idx) => (
                <Card
                  key={idx}
                  hoverEffect
                  className="p-3 flex items-center gap-3 cursor-pointer group"
                  onClick={() => {
                    setUploadedImage(preset.url);
                    startAnalysis(preset.url);
                  }}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
                  />
                  <div className="space-y-1 overflow-hidden">
                    <CardTitle className="text-xs group-hover:text-royal-purple dark:group-hover:text-lavender transition-colors">
                      {preset.name}
                    </CardTitle>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      Click to Test AI Scan
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Analyzing Loading State */}
      {step === 'analyzing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 flex flex-col items-center justify-center text-center space-y-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-royal-purple/20 border-t-royal-purple dark:border-t-lavender animate-spin" />
            <Sparkles className="w-8 h-8 text-royal-purple dark:text-lavender absolute inset-0 m-auto animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="font-poppins font-extrabold text-xl text-slate-900 dark:text-slate-100">
              AI Atelier Neural Analysis
            </h3>
            <p className="text-xs font-mono text-royal-purple dark:text-lavender animate-pulse">
              {analyzingStepText}
            </p>
          </div>
        </motion.div>
      )}

      {/* STEP Error State */}
      {step === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-center space-y-4 max-w-xl mx-auto"
        >
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-poppins font-bold text-lg text-rose-900 dark:text-rose-100">
              AI Analysis Error
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 font-inter">
              {analysisError || 'Could not process the uploaded garment image.'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={() => uploadedImage && startAnalysis(uploadedImage)}
            >
              Retry AI Analysis
            </Button>
            <Button variant="outline" size="md" onClick={resetWorkflow}>
              Upload Different Image
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Results Panel */}
      {step === 'results' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          {/* Top Bar: Preview & Tier Toggle */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Uploaded Image Preview */}
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-80 bg-slate-900 border border-slate-200 dark:border-slate-800">
                {uploadedImage && (
                  <img src={uploadedImage} alt="Detected Outfit" className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="primary" dot>AI Feature Matched</Badge>
                </div>
              </div>
            </div>

            {/* Right: Tier Toggle & Estimate Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Luxury vs Budget Switch */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-poppins font-bold text-sm text-slate-900 dark:text-slate-100">
                    Tailoring Tier Version
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Toggle between Luxury Atelier Couture vs Budget Alternative
                  </p>
                </div>

                <div className="flex items-center p-1 bg-soft-grey dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                  <button
                    onClick={() => setIsLuxury(false)}
                    className={`px-4 py-2 text-xs font-semibold font-poppins rounded-xl transition-all ${
                      !isLuxury
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Budget Tier
                  </button>
                  <button
                    onClick={() => setIsLuxury(true)}
                    className={`px-4 py-2 text-xs font-semibold font-poppins rounded-xl transition-all ${
                      isLuxury
                        ? 'bg-royal-purple text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    ✨ Luxury Version
                  </button>
                </div>
              </div>

              {/* Price & Delivery Card */}
              <Card className="p-6 bg-gradient-to-r from-royal-purple/10 via-lavender/20 to-rose-gold/10 dark:from-slate-900 dark:to-slate-900/90 border-royal-purple/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-poppins uppercase tracking-wider block">
                    Estimated Custom Fitting Cost
                  </span>
                  <motion.div
                    key={`${totalPrice}-${isLuxury}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-poppins font-extrabold text-3xl text-royal-purple dark:text-lavender"
                  >
                    ${totalPrice.toLocaleString()}
                  </motion.div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                    {isLuxury ? 'Includes 3D virtual fittings & imported silk thread' : 'Standard tailoring & local fabrics'}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-center">
                    <Clock className="w-5 h-5 text-champagne-gold mx-auto mb-1" />
                    <span className="font-poppins font-bold text-xs block text-slate-800 dark:text-slate-200">
                      {isLuxury
                        ? `${aiResult?.deliveryDays || 7} Days`
                        : `${(aiResult?.deliveryDays || 7) + 5} Days`}
                    </span>
                    <span className="text-[10px] text-slate-400">Delivery</span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                    leftIcon={<Video className="w-4 h-4 text-emerald-400 animate-pulse" />}
                  >
                    Book Consultation
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Detected Attributes Grid */}
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-rose-gold" />
              Detected Outfit Attributes (8 Features)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Dress Type', value: aiResult?.dressType || 'Evening Velvet Gown' },
                { label: 'Neck Style', value: aiResult?.neckStyle || 'Plunging V-Neck' },
                { label: 'Sleeves', value: aiResult?.sleeves || 'Sleeveless Tailored' },
                { label: 'Embroidery', value: aiResult?.embroidery || 'Hand-stitched Gold Thread' },
                { label: 'Fabric Material', value: selectedFabric },
                { label: 'Color Hue', value: aiResult?.color || selectedColor.name },
                { label: 'Pattern', value: aiResult?.pattern || 'Solid Velvet Metallic' },
                { label: 'Length', value: aiResult?.length || 'Floor-Length Train' },
              ].map((attr, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-poppins block">
                    {attr.label}
                  </span>
                  <span className="font-poppins font-semibold text-xs text-slate-900 dark:text-slate-100 block truncate">
                    {attr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FEATURE 2: RECREATE IN YOUR BUDGET SECTION */}
          {/* ========================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-royal-purple/20 to-slate-950 border border-royal-purple/30 text-white space-y-8 shadow-xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-royal-purple/20 rounded-full blur-3xl -z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" size="sm" dot>Smart Recreation Engine</Badge>
                  <span className="text-[11px] font-mono text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> Dynamic Fabric & Cost Optimization
                  </span>
                </div>
                <h3 className="font-poppins text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Sliders className="w-6 h-6 text-amber-400" />
                  Recreate In Your Budget
                </h3>
                <p className="text-xs text-slate-300 max-w-xl font-inter">
                  Drag the budget slider to live-recalculate your outfit estimate. Our AI automatically adapts recommended fabric textures and embroidery complexity to fit your target cost.
                </p>
              </div>

              {/* Price Display with Animated Counter */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[200px] shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-poppins block">
                  Recreated Outfit Estimate
                </span>
                <div className="font-poppins font-extrabold text-3xl text-amber-300 tracking-tight my-0.5">
                  <AnimatedNumber value={finalRecreatePrice} prefix="₹" />
                </div>
                <Badge variant={currentTierDetails.badgeVariant} size="sm">
                  {currentTierDetails.tierName}
                </Badge>
              </div>
            </div>

            {/* Slider & Tier Detail Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Columns: Range Slider & Circular Swatches */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Range Slider (₹2,000 to ₹50,000) */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs font-poppins font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-amber-400" /> Target Budget Limit
                    </span>
                    <span className="text-amber-300 font-mono text-sm">
                      ₹{sliderBudget.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={500}
                    value={sliderBudget}
                    onChange={(e) => setSliderBudget(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 transition-all"
                  />

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>₹2,000 (Budget)</span>
                    <span>₹25,000 (Couture)</span>
                    <span>₹50,000 (Royal)</span>
                  </div>
                </div>

                {/* 2. Circular Fabric Swatch Picker */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-rose-gold" /> Tap Circular Fabric Swatch to Compare
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BUDGET_FABRIC_SWATCHES.map((swatch) => {
                      const isSelected = selectedBudgetFabric.id === swatch.id;
                      return (
                        <motion.button
                          key={swatch.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedBudgetFabric(swatch)}
                          className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col items-center text-center space-y-2 relative overflow-hidden ${
                            isSelected
                              ? 'bg-royal-purple/40 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-royal-purple/30'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                          }`}
                        >
                          {/* Circular Swatch Visualizer */}
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-tr ${swatch.colorGradient} border-2 flex items-center justify-center shadow-md relative`}
                          >
                            {isSelected && (
                              <Check className="w-5 h-5 drop-shadow-md stroke-[3]" />
                            )}
                          </div>

                          <div className="space-y-0.5 w-full">
                            <span className="font-poppins font-bold text-xs text-white block truncate">
                              {swatch.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono truncate">
                              {swatch.subLabel}
                            </span>
                          </div>

                          <div className="pt-1 w-full border-t border-white/10 flex items-center justify-center">
                            <span
                              className={`text-[11px] font-mono font-bold ${
                                swatch.priceDiff < 0
                                  ? 'text-emerald-400'
                                  : swatch.priceDiff > 0
                                  ? 'text-amber-300'
                                  : 'text-slate-300'
                              }`}
                            >
                              {swatch.priceDiff === 0
                                ? 'Base Cost'
                                : swatch.priceDiff < 0
                                ? `-₹${Math.abs(swatch.priceDiff)}`
                                : `+₹${swatch.priceDiff}`}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Animated Dynamic Savings Callout Pill */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBudgetFabric.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-poppins font-semibold flex items-center justify-between shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{savingsCalloutText}</span>
                    </span>
                    <Badge variant="gold" size="sm">Smart Pick</Badge>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right 5 Columns: Tier Breakdown & Finalize Button */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
                  <h4 className="font-poppins font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    AI Recreation Specifications
                  </h4>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between items-start">
                      <span className="text-slate-400">Matched Tier:</span>
                      <span className="font-bold text-white text-right">{currentTierDetails.tierName}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-400">Fabric Recommendation:</span>
                      <span className="font-bold text-amber-300 text-right">{selectedBudgetFabric.name}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-400">Embroidery Style:</span>
                      <span className="font-bold text-white text-right">{currentTierDetails.recommendedEmbroidery}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-400">Tailoring Craft:</span>
                      <span className="font-bold text-slate-200 text-right">{currentTierDetails.stitchingType}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-400">Estimated Delivery:</span>
                      <span className="font-mono font-bold text-emerald-400 text-right">{currentTierDetails.deliveryDays}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-200/90 font-mono italic">
                    💡 {currentTierDetails.savingTip}
                  </div>
                </div>

                {/* Database Finalize Action Button */}
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full py-3.5 shadow-lg shadow-amber-500/20"
                  isLoading={isSavingDesign}
                  onClick={handleSaveDesignRequest}
                  leftIcon={<Sparkles className="w-4 h-4 text-amber-950" />}
                >
                  Save & Lock Custom Recreate Budget
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Fabric & Color Swatches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Fabric Swatches */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-royal-purple dark:text-lavender" />
                <span className="font-poppins font-bold text-sm text-slate-900 dark:text-slate-100">
                  Alternative Fabric Swatches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fabricSwatches.map((fab) => {
                  const isSel = selectedFabric === fab.name;
                  return (
                    <button
                      key={fab.name}
                      onClick={() => setSelectedFabric(fab.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-poppins transition-all flex items-center gap-2 ${
                        isSel
                          ? 'bg-royal-purple text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-royal-purple'
                      }`}
                    >
                      <span>{fab.name}</span>
                      {fab.priceDiff > 0 && (
                        <span className={`text-[10px] ${isSel ? 'text-champagne-gold' : 'text-slate-400'}`}>
                          +${fab.priceDiff}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-rose-gold" />
                <span className="font-poppins font-bold text-sm text-slate-900 dark:text-slate-100">
                  Alternative Color Palette
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colorSwatches.map((col) => {
                  const isSel = selectedColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`w-10 h-10 rounded-2xl ${col.bgClass} flex items-center justify-center transition-all ${
                        isSel
                          ? 'ring-4 ring-royal-purple/40 scale-110 shadow-md'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      title={col.name}
                    >
                      {isSel && <CheckCircle2 className="w-5 h-5 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3 Recommended Boutiques */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-royal-purple dark:text-lavender" />
              Recommended Matched Ateliers (3 Boutiques)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Atelier Le Paris',
                  rating: 4.9,
                  distance: '0.8 km',
                  specialty: 'Master Velvet & Silk Tailoring',
                  image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
                },
                {
                  name: 'Maison de Couture',
                  rating: 5.0,
                  distance: '1.5 km',
                  specialty: 'Royal Bridal & Evening Salon',
                  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
                },
                {
                  name: 'Valenti Luxury Salon',
                  rating: 4.8,
                  distance: '2.3 km',
                  specialty: 'Milan High Fashion Fitting',
                  image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
                },
              ].map((bt, idx) => (
                <Card key={idx} hoverEffect className="p-4 space-y-3">
                  <div className="relative rounded-xl overflow-hidden h-36 bg-slate-100 dark:bg-slate-800">
                    <img src={bt.image} alt={bt.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{bt.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-rose-gold" /> {bt.distance} away
                      </span>
                    </div>
                    <CardTitle className="text-base">{bt.name}</CardTitle>
                    <CardDescription>{bt.specialty}</CardDescription>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedBoutique(bt.name);
                      setIsBookingOpen(true);
                    }}
                  >
                    Book Consultation
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Live Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        boutiqueOrDesigner={{
          name: selectedBoutique,
          specialty: 'Master Custom Fitting & Silk Tailoring',
          location: 'Paris Atelier',
        }}
        onSuccess={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default Design;
