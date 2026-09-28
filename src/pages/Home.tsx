import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Scissors,
  Heart,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Button, Card, useToast } from '../components/ui';
import { categoryProducts } from '../lib/mockData';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

// Helper for category-specific luxury theme accents
export const getCategoryTheme = (category: string) => {
  const cat = category.toLowerCase();

  if (cat.includes('saree') || cat.includes('pattu') || cat.includes('silk')) {
    // 1. Sarees: Royal Purple (#5B2C91) Theme
    return {
      border: 'border-[#5B2C91]/40',
      hoverBorder: 'hover:border-[#5B2C91]',
      badgeBg: 'bg-[#5B2C91]/25 border-[#5B2C91]/40',
      badgeText: 'text-purple-300',
      gradientOverlay: 'from-[#5B2C91]/40 via-[#0F0F14]/70 to-transparent',
      glow: 'hover:shadow-[0_12px_32px_rgba(91,44,145,0.35)]',
      accentDot: 'bg-[#5B2C91]',
    };
  } else if (cat.includes('lehenga') || cat.includes('choli') || cat.includes('festive')) {
    // 2. Lehengas: Rose Gold (#B76E79) Theme
    return {
      border: 'border-[#B76E79]/40',
      hoverBorder: 'hover:border-[#B76E79]',
      badgeBg: 'bg-[#B76E79]/25 border-[#B76E79]/40',
      badgeText: 'text-rose-300',
      gradientOverlay: 'from-[#B76E79]/40 via-[#0F0F14]/70 to-transparent',
      glow: 'hover:shadow-[0_12px_32px_rgba(183,110,121,0.35)]',
      accentDot: 'bg-[#B76E79]',
    };
  } else if (cat.includes('wedding') || cat.includes('bridal') || cat.includes('gown')) {
    // 3. Wedding Wear: Champagne Gold (#D4AF37) Theme
    return {
      border: 'border-[#D4AF37]/50',
      hoverBorder: 'hover:border-[#D4AF37]',
      badgeBg: 'bg-[#D4AF37]/20 border-[#D4AF37]/40',
      badgeText: 'text-amber-300',
      gradientOverlay: 'from-[#D4AF37]/35 via-[#0F0F14]/70 to-transparent',
      glow: 'hover:shadow-[0_12px_32px_rgba(212,175,55,0.3)]',
      accentDot: 'bg-[#D4AF37]',
    };
  } else {
    // 4. Suits / Kurtis: Lavender (#E6E0F8) Theme
    return {
      border: 'border-[#E6E0F8]/35',
      hoverBorder: 'hover:border-[#E6E0F8]',
      badgeBg: 'bg-[#E6E0F8]/15 border-[#E6E0F8]/30',
      badgeText: 'text-[#E6E0F8]',
      gradientOverlay: 'from-[#E6E0F8]/30 via-[#0F0F14]/70 to-transparent',
      glow: 'hover:shadow-[0_12px_32px_rgba(230,224,248,0.25)]',
      accentDot: 'bg-[#E6E0F8]',
    };
  }
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const curatedOutfits = categoryProducts.slice(0, 4);

  return (
    <div className="space-y-16 pb-20 font-inter text-slate-100 bg-[#0F0F14] min-h-screen selection:bg-[#5B2C91]/40">

      {/* SECTION 1: HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0F0F14] shadow-2xl">
        <div className="relative min-h-[480px] sm:min-h-[520px] flex items-center p-8 sm:p-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80"
              alt="Silk Saree"
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F14] via-[#0F0F14]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent" />
          </div>

          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>South Indian Collection</span>
            </div>

            {/* Headline */}
            <h1 className="font-poppins text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
              Handcrafted Silk Sarees & Custom Outfits
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 font-inter leading-relaxed max-w-lg">
              Explore pure silk sarees, printed kurtis, and wedding lehengas tailored to your exact fit.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-6 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Button
                  size="lg"
                  variant="gold"
                  onClick={() => navigate('/explore')}
                  className="rounded-xl shadow-lg shadow-amber-500/10 font-poppins font-bold px-8 py-3.5 text-sm"
                  rightIcon={<ArrowRight className="w-4 h-4 text-amber-950" />}
                >
                  Explore Collection
                </Button>
              </motion.div>

              <Link
                to="/design"
                className="text-xs font-poppins font-semibold text-slate-300 hover:text-purple-300 transition-colors flex items-center gap-1.5 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Identify Outfit from Photo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: SLIM TRUST STRIP */}
      <section className="py-7 px-8 sm:px-14 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-poppins font-medium text-slate-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <ShieldCheck className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
            <span>100% Pure Handloom Silk</span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <Award className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
            <span>Verified Expert Tailors</span>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-end">
            <Scissors className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
            <span>1-on-1 Video Fitting</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: RECOMMENDED OUTFITS (Distinct Category Visual Identity Cards) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recommended Outfits
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Top selected sarees, kurtis, and lehengas with distinct category styling
            </p>
          </div>

          <Link
            to="/explore"
            className="text-xs font-poppins font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 4 Category Cards Grid with Distinct Theme Overlays & Hover Lift (-6px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedOutfits.map((item) => {
            const theme = getCategoryTheme(item.category || item.title);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className={`p-3.5 space-y-3 bg-[#15161E] border ${theme.border} ${theme.hoverBorder} ${theme.glow} transition-all duration-300 group relative`}>
                  {/* Image Frame with Category Gradient Scrim & View Details Hover */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark Scrim with Category Tint */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradientOverlay} opacity-80 group-hover:opacity-95 transition-opacity duration-300`} />

                    {/* Category Badge Pill */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${theme.badgeBg} ${theme.badgeText} flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.accentDot}`} />
                        {item.category || 'Apparel'}
                      </span>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center z-10">
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => navigate('/explore')}
                        className="font-poppins font-bold text-xs rounded-xl shadow-lg"
                      >
                        View Details
                      </Button>
                    </div>

                    <button
                      onClick={() => {
                        useWishlistStore.getState().addToWishlist({
                          outfit_id: item.id,
                          title: item.title,
                          price: item.price,
                          image_url: item.image,
                          designer: item.brand,
                        });
                        toast({ title: 'Saved to Wishlist ❤️', description: `"${item.title}" saved.`, variant: 'success' });
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-pink-400 transition-colors z-10"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-poppins">
                      {item.brand}
                    </span>
                    <h3 className="font-poppins font-semibold text-xs text-white truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 relative z-10">
                    <span className="font-poppins font-bold text-sm text-white">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        useCartStore.getState().addToCart({
                          outfit_id: item.id,
                          title: item.title,
                          price: item.price,
                          image_url: item.image,
                          designer: item.brand,
                        });
                        toast({ title: 'Added to Bag 🛍️', description: `"${item.title}" added to bag.`, variant: 'success' });
                      }}
                      leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: WEDDING OUTFITS BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-[#1A140B] via-[#0F0F14] to-[#1A140B] p-8 sm:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bridal Collection</span>
            </div>

            <h2 className="font-poppins text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              South Indian Wedding Outfits
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
              Bridal silk sarees, embroidered lehengas, and groom blazers made to your custom measurements.
            </p>

            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="inline-block">
                <Button
                  size="md"
                  variant="gold"
                  onClick={() => navigate('/wedding')}
                  className="rounded-xl shadow-lg font-poppins font-bold px-6 text-xs"
                  rightIcon={<ArrowRight className="w-4 h-4 text-amber-950" />}
                >
                  See Wedding Collection
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="w-full md:w-80 h-56 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
              alt="Bridal Outfit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <footer className="pt-8 border-t border-white/10 text-xs font-inter text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Fashionista. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
          <Link to="/studio" className="hover:text-white transition-colors">3D Fitting</Link>
          <Link to="/wedding" className="hover:text-white transition-colors">Wedding</Link>
          <Link to="/profile" className="hover:text-white transition-colors">Profile</Link>
        </div>
      </footer>

    </div>
  );
};

export default Home;
