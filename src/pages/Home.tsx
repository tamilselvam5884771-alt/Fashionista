import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  Clock,
  Crown,
  ShoppingBag,
  Eye,
} from 'lucide-react';
import {
  Button,
  Card,
  CardTitle,
  CardDescription,
  Badge,
  Skeleton,
  useToast,
} from '../components/ui';
import {
  heroBanners,
  aiPicks,
  trendingCollections,
  nearbyBoutiques,
  recentlyViewed,
} from '../lib/mockData';

export const Home: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Wishlist State (Mock)
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(['ai-1']);

  // Simulate 800ms API loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Autoplay Hero Carousel (4.5s)
  useEffect(() => {
    if (isLoading || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, isPaused]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 font-inter">
      {/* 1. Hero Banner Carousel */}
      <section className="relative">
        {isLoading ? (
          <Skeleton variant="rectangular" height={360} className="w-full rounded-3xl" />
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[360px] sm:min-h-[420px] bg-slate-950 flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={heroBanners[currentSlide].image}
                  alt={heroBanners[currentSlide].title}
                  className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slide Content */}
            <div className="relative z-10 p-8 sm:p-14 max-w-xl space-y-5 text-white">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-4"
              >
                <Badge
                  variant={
                    heroBanners[currentSlide].colorScheme === 'gold'
                      ? 'gold'
                      : heroBanners[currentSlide].colorScheme === 'rose'
                      ? 'rose'
                      : 'primary'
                  }
                  dot
                >
                  {heroBanners[currentSlide].badge}
                </Badge>
                <h1 className="font-poppins text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  {heroBanners[currentSlide].title}
                </h1>
                <p className="text-xs sm:text-base text-slate-300 font-inter leading-relaxed">
                  {heroBanners[currentSlide].subtitle}
                </p>
                <div className="pt-2">
                  <Link to={heroBanners[currentSlide].ctaLink}>
                    <Button
                      variant={
                        heroBanners[currentSlide].colorScheme === 'gold'
                          ? 'gold'
                          : heroBanners[currentSlide].colorScheme === 'rose'
                          ? 'rose'
                          : 'primary'
                      }
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {heroBanners[currentSlide].ctaText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 z-20 p-2.5 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-slate-900 transition-all border border-white/10"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 z-20 p-2.5 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-slate-900 transition-all border border-white/10"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators Dots */}
            <div className="absolute bottom-5 right-6 z-20 flex items-center space-x-2">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-champagne-gold' : 'w-2 bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Today's AI Picks (Horizontal Scrollable Card Row) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-royal-purple/10 dark:bg-royal-purple/20 text-royal-purple dark:text-lavender rounded-xl">
              <Sparkles className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <h2 className="font-poppins text-xl font-bold text-slate-900 dark:text-slate-100">
                Today's AI Picks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalized recommendations tailored to your style profile
              </p>
            </div>
          </div>
          <Link to="/explore">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height={280} className="w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="flex space-x-5 overflow-x-auto snap-x pb-4 pt-1 no-scrollbar">
            {aiPicks.map((item) => {
              const isWish = wishlistedIds.includes(item.id);
              return (
                <div key={item.id} className="snap-start shrink-0 w-72 sm:w-80">
                  <Card hoverEffect className="p-4 space-y-3 h-full flex flex-col justify-between">
                    <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-52 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* AI Match Score Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary" dot>
                          {item.matchScore}% Match
                        </Badge>
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
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 font-poppins">
                        {item.designer}
                      </span>
                      <h3 className="font-poppins font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-1">
                        "{item.reason}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-baseline gap-2">
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
                        Bag
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Trending Collections (Grid with Hover Zoom-on-Image Effect) */}
      <section className="space-y-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-slate-900 dark:text-slate-100">
            Trending Lookbooks
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Curated style collections from Paris, Milan, and Tokyo</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" height={320} className="w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingCollections.map((col) => (
              <Card key={col.id} hoverEffect className="overflow-hidden p-0 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" dot>{col.tag}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest block">
                      {col.itemCount} Garments
                    </span>
                    <h3 className="font-poppins font-bold text-lg leading-snug">{col.title}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {col.description}
                  </p>
                  <Link to="/explore" className="inline-block w-full">
                    <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Explore Lookbook
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 4. Wedding Specials Banner Strip */}
      <section>
        {isLoading ? (
          <Skeleton variant="rectangular" height={180} className="w-full rounded-3xl" />
        ) : (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-purple-950 to-slate-950 text-white p-8 sm:p-10 shadow-xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <Badge variant="gold" dot>Bridal & Wedding Salon</Badge>
              <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-amber-100 flex items-center justify-center md:justify-start gap-2.5">
                <Crown className="w-7 h-7 text-champagne-gold" />
                Royal Bridal Fittings & Custom Veils
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/80 font-inter">
                Schedule a 1-on-1 private consultation with our master bridal tailors for bespoke wedding gowns.
              </p>
            </div>
            <Link to="/explore?occasion=Wedding" className="shrink-0">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Bridal Suite
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* 5. Nearby Boutiques (Cards with Rating Badges) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-gold" />
              Nearby Atelier Boutiques
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Partner luxury salons near your current location</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" height={220} className="w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyBoutiques.map((bt) => (
              <Card key={bt.id} hoverEffect className="p-4 space-y-3">
                <div className="relative rounded-xl overflow-hidden h-36 bg-slate-100 dark:bg-slate-800">
                  <img src={bt.image} alt={bt.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{bt.rating}</span>
                    <span className="text-slate-400 font-normal">({bt.reviewCount})</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={bt.isOpen ? 'primary' : 'grey'}>
                      {bt.isOpen ? 'Open Now' : 'Closed'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-gold" /> {bt.distance} away
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5" /> 10 AM - 8 PM
                    </span>
                  </div>
                  <CardTitle className="text-base">{bt.name}</CardTitle>
                  <CardDescription>{bt.specialty}</CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-full mt-2 opacity-60 cursor-not-allowed border-dashed bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 font-medium"
                >
                  Book Fitting (Coming Soon)
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 6. Recently Viewed Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-royal-purple dark:text-lavender" />
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              Recently Viewed
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height={120} className="w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewed.map((rv) => (
              <Card key={rv.id} hoverEffect className="p-3 flex items-center space-x-3">
                <img
                  src={rv.image}
                  alt={rv.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
                />
                <div className="overflow-hidden space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-mono">{rv.brand}</span>
                  <h4 className="font-poppins font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                    {rv.title}
                  </h4>
                  <span className="font-poppins font-bold text-xs text-royal-purple dark:text-lavender block">
                    ${rv.price}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
