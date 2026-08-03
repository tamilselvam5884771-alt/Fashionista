import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShoppingBag, Heart, Crown } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '../components/ui';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-royal-purple via-purple-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <Badge variant="gold" dot>Autumn / Winter 2026 Collection</Badge>
          <h1 className="font-poppins text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Haute Couture <br />
            <span className="text-champagne-gold">Redefined</span>
          </h1>
          <p className="text-sm sm:text-base text-lavender/90 font-inter leading-relaxed">
            Discover bespoke atelier creations, runway essentials, and personalized fashion design crafted for the modern icon.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/explore">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Runway
              </Button>
            </Link>
            <Link to="/design">
              <Button variant="outline" size="lg" className="border-lavender/40 text-lavender hover:bg-lavender/10">
                Custom Fitting
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/explore">
          <Card className="p-5 text-center flex flex-col items-center justify-center space-y-2 hover:border-royal-purple/40">
            <div className="p-3 rounded-2xl bg-royal-purple/10 text-royal-purple dark:text-lavender">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="font-poppins font-semibold text-xs text-slate-800 dark:text-slate-200">
              New Arrivals
            </span>
          </Card>
        </Link>
        <Link to="/design">
          <Card className="p-5 text-center flex flex-col items-center justify-center space-y-2 hover:border-rose-gold/40">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-gold dark:bg-rose-950/40">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-poppins font-semibold text-xs text-slate-800 dark:text-slate-200">
              Atelier Studio
            </span>
          </Card>
        </Link>
        <Link to="/wedding">
          <Card className="p-5 text-center flex flex-col items-center justify-center space-y-2 hover:border-amber-400/40">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
              <Crown className="w-6 h-6" />
            </div>
            <span className="font-poppins font-semibold text-xs text-slate-800 dark:text-slate-200">
              Bridal & Wedding
            </span>
          </Card>
        </Link>
        <Link to="/wishlist">
          <Card className="p-5 text-center flex flex-col items-center justify-center space-y-2 hover:border-lavender">
            <div className="p-3 rounded-2xl bg-lavender text-royal-purple dark:bg-slate-800 dark:text-lavender">
              <Heart className="w-6 h-6" />
            </div>
            <span className="font-poppins font-semibold text-xs text-slate-800 dark:text-slate-200">
              Saved Wishlist
            </span>
          </Card>
        </Link>
      </div>

      {/* Trending Collections Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-xl font-bold text-slate-900 dark:text-slate-100">
              Curated Lookbook
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Selected looks for Paris Fashion Week</p>
          </div>
          <Link to="/explore">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardTitle>Royal Velvet Blazer</CardTitle>
            <CardDescription>Midnight Purple Silk Lapel</CardDescription>
            <div className="mt-4 p-4 rounded-xl bg-soft-grey dark:bg-slate-800/60 flex items-center justify-between">
              <span className="font-poppins font-bold text-royal-purple dark:text-lavender">$1,420</span>
              <Badge variant="primary">Popular</Badge>
            </div>
          </Card>
          <Card>
            <CardTitle>Champagne Silk Gown</CardTitle>
            <CardDescription>Floor-length pleated silhouette</CardDescription>
            <div className="mt-4 p-4 rounded-xl bg-soft-grey dark:bg-slate-800/60 flex items-center justify-between">
              <span className="font-poppins font-bold text-amber-600 dark:text-amber-300">$2,100</span>
              <Badge variant="gold">Limited</Badge>
            </div>
          </Card>
          <Card>
            <CardTitle>Rose Gold Embellished Clutch</CardTitle>
            <CardDescription>Hand-stitched crystal detailing</CardDescription>
            <div className="mt-4 p-4 rounded-xl bg-soft-grey dark:bg-slate-800/60 flex items-center justify-between">
              <span className="font-poppins font-bold text-rose-gold">$780</span>
              <Badge variant="rose">Trending</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
