import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Search,
  Star,
  MapPin,
  Heart,
  SlidersHorizontal,
  AlertCircle,
  Video,
  ShoppingBag,
} from 'lucide-react';
import { Button, Card, Input, Modal, Skeleton, useToast } from '../components/ui';
import { FilterSidebar, type FilterState } from '../components/features';
import { ConsultationBookingModal } from '../components/features/ConsultationBookingModal';
import { exploreOutfits as fallbackOutfits } from '../lib/mockData';
import { supabase } from '../lib/supabaseClient';
import { useCartStore } from '../store/useCartStore';
import { getCategoryTheme } from './Home';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const searchQuery = searchParams.get('q') || '';
  const occasionParam = searchParams.get('occasion');
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Supabase Data & Loading State
  const [outfits, setOutfits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(['exp-1']);

  // Filter State
  const initialFilterState: FilterState = {
    occasions: [],
    fabrics: [],
    maxPrice: 15000,
    designers: [],
    minRating: 0,
    location: 'All',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Fetch Outfits from Supabase
  const loadOutfits = async () => {
    setIsLoading(true);
    try {
      const { data: dbData, error } = await supabase
        .from('outfits')
        .select('*, boutiques(name, location)')
        .order('rating', { ascending: false });

      if (error) throw error;

      if (dbData && dbData.length > 0) {
        const mapped = dbData.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          originalPrice: Number(item.price) * 1.45,
          category: item.category || 'Saree',
          occasion: item.occasion || 'Festive',
          fabric: item.fabric || 'Pure Silk',
          designer: item.boutiques?.name || 'Kanchi Weaves',
          boutique: item.boutiques?.name || 'Kanchi Weaves Atelier',
          rating: Number(item.rating) || 4.9,
          reviewCount: 48,
          image:
            item.image_url ||
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          location: item.boutiques?.location || 'Bengaluru, India',
        }));
        setOutfits(mapped);
      } else {
        setOutfits(fallbackOutfits);
      }
    } catch (err: any) {
      console.warn('Supabase explore outfits fetch failed, using fallback:', err);
      setOutfits(fallbackOutfits);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOutfits();
  }, []);

  useEffect(() => {
    if (occasionParam) {
      const formattedOccasion =
        occasionParam.charAt(0).toUpperCase() + occasionParam.slice(1).toLowerCase();
      setFilters((prev) => ({
        ...prev,
        occasions: [formattedOccasion],
      }));
    }
  }, [occasionParam]);

  const toggleWishlist = (id: string, title: string) => {
    if (wishlistedIds.includes(id)) {
      setWishlistedIds((prev) => prev.filter((i) => i !== id));
      toast({ title: 'Removed from Wishlist', description: `"${title}" removed.`, variant: 'info' });
    } else {
      setWishlistedIds((prev) => [...prev, id]);
      toast({ title: 'Saved to Wishlist ❤️', description: `"${title}" saved to your wishlist.`, variant: 'success' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchInput ? { q: searchInput } : {});
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setSearchInput('');
    setSearchParams({});
  };

  // Compute Filtered & Sorted Outfits
  const filteredOutfits = useMemo(() => {
    return outfits
      .filter((item) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesDesigner = item.designer.toLowerCase().includes(q);
          const matchesFabric = item.fabric.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesigner && !matchesFabric) return false;
        }

        if (filters.occasions.length > 0 && !filters.occasions.includes(item.occasion)) {
          return false;
        }

        if (filters.fabrics.length > 0 && !filters.fabrics.includes(item.fabric)) {
          return false;
        }

        if (item.price > filters.maxPrice) {
          return false;
        }

        if (filters.designers.length > 0 && !filters.designers.includes(item.designer)) {
          return false;
        }

        if (filters.minRating > 0 && item.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [outfits, searchQuery, filters, sortBy]);

  const activeFilterCount =
    filters.occasions.length +
    filters.fabrics.length +
    filters.designers.length +
    (filters.maxPrice < 15000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="space-y-8 pb-16 font-inter text-slate-900 dark:text-slate-100 selection:bg-[#E05297]/30">
      {/* 1. Cyber-Luxe Indigo & Rose Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B0C16] via-[#15172A] to-[#0B0C16] p-8 sm:p-10 border border-purple-500/20 shadow-2xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Compass className="w-3.5 h-3.5 text-[#E05297]" />
              <span>Interactive Collection Explorer</span>
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              South Indian Traditional & Luxe Apparel
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-inter">
              Browse Kanjivaram silk sarees, floral Anarkalis, Chanderi suits, and georgette lehengas. Filter by fabric, budget, and occasion.
            </p>
          </div>

          {/* Book Consultation Trigger */}
          <Button
            size="lg"
            variant="gold"
            onClick={() => setIsConsultationOpen(true)}
            className="rounded-xl shadow-lg shadow-amber-500/20 font-poppins text-xs font-bold px-6 shrink-0"
            leftIcon={<Video className="w-4 h-4 text-amber-950 animate-pulse" />}
          >
            Book Live Consultation
          </Button>
        </div>
      </div>

      {/* 2. Search & Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by saree, silk, kurti, designer..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="w-full"
          />
        </form>

        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors relative"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E05297] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-poppins font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Catalog (Filter Sidebar + Reactbits-Style 3D Tilt Card Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400">
              Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{filteredOutfits.length}</strong> items
            </p>

            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-poppins font-bold text-[#E05297] hover:underline"
              >
                Clear all filters ({activeFilterCount})
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="rectangular" height={320} className="w-full rounded-2xl" />
              ))}
            </div>
          ) : filteredOutfits.length === 0 ? (
            <Card className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-slate-100">
                No matching garments found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try loosening your filters or searching for different terms like "Silk", "Saree", "Anarkali", or "Kurti".
              </p>
              <Button variant="primary" size="sm" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            </Card>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredOutfits.map((item) => {
                const isWish = wishlistedIds.includes(item.id);
                const theme = getCategoryTheme(item.category || item.occasion || item.title);
                return (
                  <motion.div key={item.id} variants={itemVariants} whileHover={{ y: -6 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
                    <Card hoverEffect className={`p-4 space-y-3 h-full flex flex-col justify-between border ${theme.border} ${theme.hoverBorder} ${theme.glow} transition-all duration-300 group`}>
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-64">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Dark Scrim with Category Tint */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradientOverlay} opacity-70 group-hover:opacity-90 transition-opacity duration-300`} />

                        {/* Rating Badge */}
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 shadow-sm z-10">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{item.rating}</span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(item.id, item.title)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-colors z-10 ${
                            isWish
                              ? 'bg-[#E05297] text-white'
                              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:text-[#E05297]'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                        </button>

                        <div className="absolute bottom-3 left-3 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${theme.badgeBg} ${theme.badgeText}`}>
                            {item.occasion || item.category || 'Festive'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-poppins">
                          <Link
                            to={`/boutique/${encodeURIComponent(item.designer)}`}
                            className="hover:text-[#E05297] transition-colors font-bold underline decoration-dotted"
                          >
                            {item.designer}
                          </Link>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#E05297]" /> {item.location}
                          </span>
                        </div>
                        <h3 className="font-poppins font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-inter">
                          {item.boutique} • {item.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-poppins font-bold text-base text-slate-900 dark:text-white">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              ₹{Math.round(item.originalPrice).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="gold"
                            onClick={() => {
                              useCartStore.getState().addToCart(
                                {
                                  outfit_id: item.id,
                                  title: item.title,
                                  price: item.price,
                                  image_url: item.image,
                                  designer: item.designer,
                                },
                                undefined
                              );
                              toast({
                                title: 'Added to Bag 🛍️',
                                description: `"${item.title}" added to your shopping bag!`,
                                variant: 'success',
                              });
                            }}
                            leftIcon={<ShoppingBag className="w-3.5 h-3.5 text-amber-950" />}
                          >
                            Add to Bag
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Live Consultation Booking Modal Triggered from Header / Cards */}
      <ConsultationBookingModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        boutiqueOrDesigner={{
          name: 'Atelier Master Designer',
          specialty: '1-on-1 Live Video Fit Consultation',
        }}
        onSuccess={() => setIsConsultationOpen(false)}
      />

      {/* Mobile Filter Bottom Sheet Dialog */}
      <Modal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Outfits"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={(newF) => {
            handleFilterChange(newF);
            setIsMobileFilterOpen(false);
          }}
          onReset={() => {
            handleResetFilters();
            setIsMobileFilterOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Explore;
