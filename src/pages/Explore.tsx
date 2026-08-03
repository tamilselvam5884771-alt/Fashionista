import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Filter,
  Search,
  Star,
  MapPin,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { Button, Card, Input, Badge, Modal, useToast } from '../components/ui';
import { FilterSidebar, type FilterState } from '../components/features';
import { exploreOutfits } from '../lib/mockData';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const searchQuery = searchParams.get('q') || '';
  const occasionParam = searchParams.get('occasion');
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Filter State
  const initialFilterState: FilterState = {
    occasions: [],
    fabrics: [],
    maxPrice: 5000,
    designers: [],
    minRating: 0,
    location: 'All',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Sync route query param 'occasion' into filters state on mount / change
  useEffect(() => {
    if (occasionParam) {
      setFilters((prev) => ({
        ...prev,
        occasions: prev.occasions.includes(occasionParam) ? prev.occasions : [occasionParam],
      }));
    }
  }, [occasionParam]);

  const [wishlistedIds, setWishlistedIds] = useState<string[]>(['exp-1']);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const toggleWishlist = (id: string, title: string) => {
    setWishlistedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast({
          title: 'Removed from Wishlist',
          description: `${title} removed from saved items.`,
          variant: 'info',
        });
        return prev.filter((item) => item !== id);
      } else {
        toast({
          title: 'Added to Wishlist',
          description: `${title} saved to your atelier collection.`,
          variant: 'success',
        });
        return [...prev, id];
      }
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setSearchInput('');
    setSearchParams({});
  };

  // Active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.occasions.length > 0) count += filters.occasions.length;
    if (filters.fabrics.length > 0) count += filters.fabrics.length;
    if (filters.designers.length > 0) count += filters.designers.length;
    if (filters.maxPrice < 5000) count += 1;
    if (filters.minRating > 0) count += 1;
    if (filters.location !== 'All') count += 1;
    return count;
  }, [filters]);

  // Filter & Sort Logic
  const filteredOutfits = useMemo(() => {
    return exploreOutfits
      .filter((item) => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesDesigner = item.designer.toLowerCase().includes(q);
          const matchesFabric = item.fabric.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesigner && !matchesFabric) return false;
        }

        // Max Price
        if (item.price > filters.maxPrice) return false;

        // Occasions
        if (filters.occasions.length > 0 && !filters.occasions.includes(item.occasion)) {
          return false;
        }

        // Fabrics
        if (filters.fabrics.length > 0 && !filters.fabrics.includes(item.fabric)) {
          return false;
        }

        // Designers
        if (filters.designers.length > 0 && !filters.designers.includes(item.designer)) {
          return false;
        }

        // Min Rating
        if (filters.minRating > 0 && item.rating < filters.minRating) {
          return false;
        }

        // Location
        if (filters.location !== 'All' && item.location !== filters.location) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount; // 'popular'
      });
  }, [searchQuery, filters, sortBy]);

  // Framer Motion Stagger Variants
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
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-inter">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-royal-purple dark:text-lavender" />
            Explore Atelier Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
            Showing {filteredOutfits.length} high-fashion garments from Paris, Milan, and Rome.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter className="w-4 h-4 text-royal-purple dark:text-lavender" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>
      </div>

      {/* Search Input & Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search velvet, silk dresses, Saint-Germain..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-poppins font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-inter font-semibold p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple/20 cursor-pointer shadow-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-poppins text-xs font-medium">Active Filters:</span>
          {filters.occasions.map((o) => (
            <Badge key={o} variant="primary" className="gap-1">
              <span>{o}</span>
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, occasions: f.occasions.filter((x) => x !== o) }))
                }
                className="hover:text-rose-400 font-bold"
              >
                ✕
              </button>
            </Badge>
          ))}
          {filters.fabrics.map((fab) => (
            <Badge key={fab} variant="rose" className="gap-1">
              <span>{fab}</span>
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, fabrics: f.fabrics.filter((x) => x !== fab) }))
                }
                className="hover:text-rose-400 font-bold"
              >
                ✕
              </button>
            </Badge>
          ))}
          {filters.location !== 'All' && (
            <Badge variant="gold" className="gap-1">
              <span>{filters.location}</span>
              <button
                onClick={() => setFilters((f) => ({ ...f, location: 'All' }))}
                className="hover:text-rose-400 font-bold"
              >
                ✕
              </button>
            </Badge>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-rose-500 hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid & Desktop Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Outfit Grid Container */}
        <div className="lg:col-span-3">
          {filteredOutfits.length === 0 ? (
            <Card className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-lavender/30 text-royal-purple dark:text-lavender flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
                No Outfits Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No garments matched your selected filter criteria. Try expanding your price range or resetting filters.
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
                return (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card hoverEffect className="p-4 space-y-3 h-full flex flex-col justify-between group">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-64">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />
                        {/* Rating Badge */}
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{item.rating}</span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(item.id, item.title)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-colors ${
                            isWish
                              ? 'bg-rose-gold text-white'
                              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:text-rose-gold'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                        </button>

                        <div className="absolute bottom-3 left-3">
                          <Badge variant="gold" size="sm">{item.occasion}</Badge>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-poppins">
                          <span>{item.designer}</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-rose-gold" /> {item.location}
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
                          <span className="font-poppins font-bold text-base text-royal-purple dark:text-lavender">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="sm" variant="secondary" leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}>
                          Details
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Dialog */}
      <Modal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Outfits"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          isMobile
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Explore;
