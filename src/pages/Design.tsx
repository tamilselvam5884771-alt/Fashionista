import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge, Modal, useToast } from '../components/ui';

export const Design: React.FC = () => {
  const { toast } = useToast();

  // Workflow State
  const [step, setStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzingStepText, setAnalyzingStepText] = useState('Scanning dress silhouette...');

  // Interactive Customization State
  const [isLuxury, setIsLuxury] = useState(true);
  const [selectedFabric, setSelectedFabric] = useState('Royal Velvet');
  const [selectedColor, setSelectedColor] = useState({
    name: 'Royal Purple',
    hex: '#5B2C91',
    bgClass: 'bg-royal-purple',
  });

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
      name: 'Gold Embellished Look',
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const fabricSwatches = [
    { name: 'Royal Velvet', priceDiff: 0 },
    { name: 'Mulberry Silk', priceDiff: 320 },
    { name: 'French Lace', priceDiff: 250 },
    { name: 'Organza', priceDiff: 180 },
    { name: 'Satin', priceDiff: 120 },
  ];

  const colorSwatches = [
    { name: 'Royal Purple', hex: '#5B2C91', bgClass: 'bg-royal-purple' },
    { name: 'Champagne Gold', hex: '#D4AF37', bgClass: 'bg-champagne-gold' },
    { name: 'Lavender', hex: '#E6E0F8', bgClass: 'bg-lavender' },
    { name: 'Rose Gold', hex: '#B76E79', bgClass: 'bg-rose-gold' },
    { name: 'Midnight Black', hex: '#0F172A', bgClass: 'bg-slate-900' },
  ];

  // Start AI Analysis Process (~2 seconds)
  const startAnalysis = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setStep('analyzing');
    setAnalyzingStepText('Scanning dress silhouette & neckline...');

    setTimeout(() => {
      setAnalyzingStepText('Extracting fabric texture & embroidery patterns...');
    }, 700);

    setTimeout(() => {
      setAnalyzingStepText('Matching boutique tailors & estimated pricing...');
    }, 1400);

    setTimeout(() => {
      setStep('results');
      toast({
        title: 'AI Analysis Complete',
        description: '8 design attributes detected with 3 boutique matches.',
        variant: 'success',
      });
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          startAnalysis(reader.result as string);
        }
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
      reader.onload = () => {
        if (reader.result) {
          startAnalysis(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Price Calculation
  const currentFabricObj = fabricSwatches.find((f) => f.name === selectedFabric);
  const basePrice = isLuxury ? 2850 : 890;
  const totalPrice = basePrice + (currentFabricObj?.priceDiff || 0);

  const resetWorkflow = () => {
    setStep('upload');
    setUploadedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-inter">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <Badge variant="rose" dot className="mb-2">
            Flagship AI Atelier
          </Badge>
          <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-royal-purple dark:text-lavender animate-pulse" />
            Design Your Outfit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter mt-1 max-w-2xl">
            Upload a Pinterest screenshot or dress inspiration. Our AI extracts pattern features, matches luxury tailors, and generates custom fitting estimates.
          </p>
        </div>

        {step === 'results' && (
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-4 h-4" />} onClick={resetWorkflow}>
            Upload Another Image
          </Button>
        )}
      </div>

      {/* STEP 1: Upload Zone */}
      {step === 'upload' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {/* Main Drag-and-Drop Dropzone */}
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
                  onClick={() => startAnalysis(preset.url)}
                  className="p-3 flex items-center space-x-3 cursor-pointer group"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span className="font-poppins font-semibold text-xs text-slate-900 dark:text-slate-100 block">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-royal-purple dark:text-lavender font-bold flex items-center gap-1 mt-1">
                      Analyze with AI <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: AI Scanning Animation (~2s) */}
      {step === 'analyzing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center p-8 space-y-6"
        >
          <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            {uploadedImage && (
              <img src={uploadedImage} alt="Analyzing" className="w-full h-full object-cover opacity-60" />
            )}

            {/* Glowing Laser Scan Line */}
            <motion.div
              animate={{ y: [-180, 180, -180] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne-gold to-transparent shadow-[0_0_15px_#D4AF37]"
            />

            {/* Center Status Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
              <Sparkles className="w-10 h-10 text-champagne-gold animate-spin-slow" />
              <div className="space-y-1">
                <span className="font-poppins font-bold text-sm tracking-wide text-lavender">
                  AI Atelier Scanning
                </span>
                <p className="text-xs text-slate-300 font-mono animate-pulse">
                  {analyzingStepText}
                </p>
              </div>
            </div>
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
                      {isLuxury ? '7–10 Days' : '12–14 Days'}
                    </span>
                    <span className="text-[10px] text-slate-400">Delivery</span>
                  </div>

                  <Button variant="primary" size="lg" onClick={() => setIsBookingOpen(true)}>
                    Book Fitting
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
                { label: 'Dress Type', value: 'Evening Velvet Gown' },
                { label: 'Neck Style', value: 'Plunging V-Neck' },
                { label: 'Sleeves', value: 'Sleeveless Tailored' },
                { label: 'Embroidery', value: 'Hand-stitched Gold Thread' },
                { label: 'Fabric Material', value: selectedFabric },
                { label: 'Color Hue', value: selectedColor.name },
                { label: 'Pattern', value: 'Solid Velvet Metallic' },
                { label: 'Length', value: 'Floor-Length Train' },
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
                    Select Atelier
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title="Confirm Fitting Consultation"
        description={`Schedule your 3D custom fitting with ${selectedBoutique}.`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsBookingOpen(false);
                toast({
                  title: 'Fitting Consultation Reserved',
                  description: `Appointment reserved at ${selectedBoutique}. Confirmation sent to your email.`,
                  variant: 'success',
                });
              }}
            >
              Confirm Appointment
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-inter py-2">
          <div className="p-4 rounded-2xl bg-lavender/30 dark:bg-slate-800 border border-lavender/50 space-y-1">
            <span className="font-poppins font-bold text-xs text-royal-purple dark:text-lavender block">
              Fitting Details Summary:
            </span>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <p>• <strong>Selected Fabric:</strong> {selectedFabric}</p>
              <p>• <strong>Selected Color:</strong> {selectedColor.name}</p>
              <p>• <strong>Estimated Total:</strong> ${totalPrice.toLocaleString()}</p>
              <p>• <strong>Tier:</strong> {isLuxury ? 'Luxury Atelier Version' : 'Budget Version'}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Design;
