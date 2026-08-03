import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Heart,
  Calendar,
  Sparkles,
  DollarSign,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Button, Card, CardTitle, Badge, Tabs, useToast } from '../components/ui';
import { weddingPackages, moodboardPins } from '../lib/mockData';

export const Wedding: React.FC = () => {
  const { toast } = useToast();

  // Wedding Date State
  const [weddingDateStr, setWeddingDateStr] = useState('2026-10-24');

  // Budget Planner State
  const [totalBudget, setTotalBudget] = useState(15000);
  const [spentAmount, setSpentAmount] = useState(9400);

  // Moodboard Pins Saved State
  const [savedPinIds, setSavedPinIds] = useState<string[]>(['pin-1']);

  // Calculate Relative Timeline Dates
  const timelineEvents = useMemo(() => {
    const target = new Date(weddingDateStr || '2026-10-24');

    const addDays = (d: Date, days: number) => {
      const result = new Date(d);
      result.setDate(result.getDate() + days);
      return result.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return [
      { id: 'ev-1', title: 'Engagement Gala', offset: -60, dateStr: addDays(target, -60), status: 'Completed' },
      { id: 'ev-2', title: 'Haldi & Sangeet', offset: -2, dateStr: addDays(target, -2), status: 'Upcoming' },
      { id: 'ev-3', title: 'Mehendi Ceremony', offset: -1, dateStr: addDays(target, -1), status: 'Upcoming' },
      { id: 'ev-4', title: 'Royal Wedding Day', offset: 0, dateStr: addDays(target, 0), status: 'Main Event' },
      { id: 'ev-5', title: 'Grand Reception', offset: 1, dateStr: addDays(target, 1), status: 'Upcoming' },
    ];
  }, [weddingDateStr]);

  // Budget SVG Ring Calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const spentRatio = Math.min(spentAmount / Math.max(totalBudget, 1), 1);
  const strokeDashoffset = circumference - spentRatio * circumference;
  const remainingAmount = Math.max(totalBudget - spentAmount, 0);

  const toggleSavePin = (id: string, title: string) => {
    setSavedPinIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast({
          title: 'Removed from Moodboard',
          description: `${title} removed from saved pins.`,
          variant: 'info',
        });
        return prev.filter((p) => p !== id);
      } else {
        toast({
          title: 'Saved to Wedding Moodboard',
          description: `${title} saved to your bridal board.`,
          variant: 'success',
        });
        return [...prev, id];
      }
    });
  };

  // Tab Content Helper
  const renderPackageCards = (type: 'Bride' | 'Groom' | 'Bridesmaid' | 'Family') => {
    const items = weddingPackages.filter((item) => item.packageType === type);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {items.map((pkg) => (
          <Card key={pkg.id} hoverEffect className="p-5 flex flex-col sm:flex-row gap-5 items-center">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full sm:w-40 h-44 rounded-2xl object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
            />
            <div className="space-y-2 flex-1 w-full">
              <div className="flex items-center justify-between">
                <Badge variant="gold" size="sm" dot>{pkg.tag}</Badge>
                <span className="font-poppins font-bold text-base text-amber-600 dark:text-amber-300">
                  ${pkg.price.toLocaleString()}
                </span>
              </div>
              <CardTitle className="text-base">{pkg.title}</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter line-clamp-2">
                {pkg.description}
              </p>
              <div className="text-[11px] font-mono text-slate-400">
                Fabric: {pkg.fabric} • {pkg.designer}
              </div>
              <Button
                variant="gold"
                size="sm"
                className="w-full mt-2"
                onClick={() =>
                  toast({
                    title: 'Fitting Consultation Reserved',
                    description: `Reserved ${pkg.title} package fitting session.`,
                    variant: 'success',
                  })
                }
              >
                Reserve Package
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const packageTabs = [
    { id: 'bride', label: 'Bride Package', icon: <Crown className="w-4 h-4 text-amber-500" />, content: renderPackageCards('Bride') },
    { id: 'groom', label: 'Groom Package', icon: <ShieldCheck className="w-4 h-4 text-royal-purple" />, content: renderPackageCards('Groom') },
    { id: 'bridesmaid', label: 'Bridesmaid Package', icon: <Heart className="w-4 h-4 text-rose-gold" />, content: renderPackageCards('Bridesmaid') },
    { id: 'family', label: 'Family Package', icon: <Users className="w-4 h-4 text-slate-500" />, content: renderPackageCards('Family') },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 font-inter">
      {/* 1. Hero & Interactive Wedding Date Picker */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-950 via-purple-950 to-slate-950 text-white p-8 sm:p-12 space-y-8 shadow-2xl border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Badge variant="gold" dot>Bridal & Atelier Wedding Suite</Badge>
            <h1 className="font-poppins text-3xl sm:text-5xl font-extrabold flex items-center gap-3 tracking-tight">
              <Crown className="w-9 h-9 text-champagne-gold animate-pulse" />
              Royal Wedding Hub
            </h1>
            <p className="text-xs sm:text-base text-amber-100/90 font-inter leading-relaxed">
              Plan your milestone wedding timeline, explore luxury bridal packages, track couture budgets, and pin inspiration to your moodboard.
            </p>
          </div>

          {/* Interactive Date Picker Card */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 shrink-0 w-full sm:w-auto">
            <label className="text-xs font-poppins font-semibold text-champagne-gold flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Select Your Wedding Date:
            </label>
            <input
              type="date"
              value={weddingDateStr}
              onChange={(e) => setWeddingDateStr(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-900/90 text-white border border-white/20 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-champagne-gold"
            />
          </div>
        </div>

        {/* Animated Horizontal Timeline Stepper */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <span className="text-xs font-poppins font-semibold text-slate-300 uppercase tracking-widest block">
            Personalized Event Timeline:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {timelineEvents.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`p-3.5 rounded-2xl border transition-all ${
                  ev.offset === 0
                    ? 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-champagne-gold text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-200/80 mb-1">
                  <span>{ev.dateStr}</span>
                  <span className="font-bold">
                    {ev.offset === 0 ? 'D-Day' : ev.offset > 0 ? `+${ev.offset}d` : `${ev.offset}d`}
                  </span>
                </div>
                <h4 className="font-poppins font-bold text-xs text-white truncate">{ev.title}</h4>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                      ev.offset === 0
                        ? 'bg-champagne-gold text-slate-950 font-bold'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Tabbed Curated Packages */}
      <section className="space-y-4">
        <div>
          <h2 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100">
            Curated Wedding Packages
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Handcrafted couture sets tailored for the bride, groom, bridesmaids, and family.</p>
        </div>

        <Tabs items={packageTabs} />
      </section>

      {/* 3. Wedding Budget Planner (SVG Circular Progress Ring) */}
      <section className="space-y-4">
        <div>
          <h2 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-500" />
            Wedding Budget Planner
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track outfit expenses and monitor remaining attire budget.</p>
        </div>

        <Card className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Animated Circular SVG Progress Ring */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                {/* Background Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-100 dark:text-slate-800"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-royal-purple dark:text-lavender transition-all duration-700 ease-out"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-poppins font-extrabold text-xl text-royal-purple dark:text-lavender">
                  {Math.round(spentRatio * 100)}%
                </span>
                <span className="text-[10px] text-slate-400 font-poppins uppercase tracking-wider">Allocated</span>
              </div>
            </div>
          </div>

          {/* Budget Overview Breakdown */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-soft-grey dark:bg-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-poppins">Total Attire Budget</span>
              <div className="font-poppins font-bold text-xl text-slate-900 dark:text-slate-100">
                ${totalBudget.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
                <span className="text-slate-500 block">Spent / Committed</span>
                <span className="font-poppins font-bold text-royal-purple dark:text-lavender">
                  ${spentAmount.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                <span className="text-slate-500 block">Remaining Balance</span>
                <span className="font-poppins font-bold text-emerald-600 dark:text-emerald-300">
                  ${remainingAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Budget Adjustment */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-poppins font-semibold text-slate-700 dark:text-slate-300 block">
                Adjust Total Budget Limit:
              </label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-soft-grey dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-poppins font-semibold text-slate-700 dark:text-slate-300 block">
                Update Committed Expenses:
              </label>
              <input
                type="number"
                value={spentAmount}
                onChange={(e) => setSpentAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-soft-grey dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple/20"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Pinterest-Style Masonry Moodboard Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-champagne-gold" />
              Bridal Moodboard & Inspiration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Save luxury gowns, decor themes, and accessories to your private moodboard.</p>
          </div>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {moodboardPins.map((pin) => {
            const isSaved = savedPinIds.includes(pin.id);
            return (
              <div key={pin.id} className="break-inside-avoid">
                <Card hoverEffect className="overflow-hidden p-0 relative group">
                  <div className={`relative ${pin.heightClass} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <Badge variant="gold" size="sm" dot>{pin.category}</Badge>
                    </div>

                    {/* Animated Heart Save Pop Button */}
                    <motion.button
                      whileTap={{ scale: 1.35 }}
                      onClick={() => toggleSavePin(pin.id, pin.title)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-colors ${
                        isSaved
                          ? 'bg-rose-gold text-white'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:text-rose-gold'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </motion.button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-poppins font-bold text-sm leading-snug">{pin.title}</h4>
                      <span className="text-[10px] text-amber-200/80 font-mono flex items-center gap-1 mt-1">
                        <Heart className="w-3 h-3 fill-amber-200/80" /> {pin.likes + (isSaved ? 1 : 0)} Likes
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Wedding;
