import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Search,
  Mail,
  Lock,
  Heart,
  ShoppingBag,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Layers,
  LayoutGrid,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Avatar,
  Modal,
  Skeleton,
  Tabs,
  useToast,
} from '../components/ui';
import { useThemeStore } from '../store';

export const StyleGuide: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const triggerToast = (variant: 'success' | 'error' | 'info' | 'warning') => {
    const titles = {
      success: 'Item Added to Wishlist',
      error: 'Payment Authorization Failed',
      info: 'New Summer Collection Available',
      warning: 'Low Stock Alert: Only 2 items left',
    };
    const descriptions = {
      success: 'Silk Evening Dress has been saved to your collection.',
      error: 'Please verify your credit card details and try again.',
      info: 'Explore Paris Fashion Week arrivals now.',
      warning: 'Complete checkout soon to secure your order.',
    };

    toast({
      title: titles[variant],
      description: descriptions[variant],
      variant,
    });
  };

  const sampleTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutGrid className="w-4 h-4" />,
      content: (
        <Card className="p-6">
          <CardTitle>Design System Overview</CardTitle>
          <CardDescription className="mt-1">
            Built with generous padding, soft shadow elevation, and subtle Framer Motion micro-interactions.
          </CardDescription>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Badge variant="primary" dot>TailwindCSS v3</Badge>
            <Badge variant="gold" dot>Framer Motion 12</Badge>
            <Badge variant="lavender" dot>React Router v6</Badge>
            <Badge variant="rose" dot>Zustand Store</Badge>
          </div>
        </Card>
      ),
    },
    {
      id: 'analytics',
      label: 'Collections',
      icon: <Layers className="w-4 h-4" />,
      content: (
        <Card className="p-6">
          <CardTitle>Curated Collections</CardTitle>
          <CardDescription className="mt-1">
            High-fashion luxury lines for Autumn/Winter 2026.
          </CardDescription>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-lavender/30 dark:bg-slate-800/60 border border-lavender/50">
              <span className="font-poppins font-semibold text-xs text-royal-purple dark:text-lavender">Haute Couture</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Exclusive handcrafted dresses</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50">
              <span className="font-poppins font-semibold text-xs text-amber-800 dark:text-amber-300">Gold Accent Line</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Champagne gold accessories</p>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-soft-grey dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-royal-purple text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <h1 className="font-poppins text-xl font-bold tracking-tight text-royal-purple dark:text-lavender">
                Fashionista Design System
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
                Interactive Component Library & Visual Style Guide
              </p>
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-champagne-gold" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-royal-purple" /> Dark Mode
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto p-6 sm:p-10 space-y-12">
        {/* Section: Color Palette & Typography */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              1. Theme Colors & Tokens
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-royal-purple text-white shadow-sm space-y-1">
              <div className="font-poppins font-bold text-sm">Royal Purple</div>
              <div className="text-xs opacity-80 font-mono">#5B2C91</div>
            </div>
            <div className="p-4 rounded-2xl bg-champagne-gold text-slate-950 shadow-sm space-y-1">
              <div className="font-poppins font-bold text-sm">Champagne Gold</div>
              <div className="text-xs opacity-80 font-mono">#D4AF37</div>
            </div>
            <div className="p-4 rounded-2xl bg-lavender text-royal-purple shadow-sm space-y-1">
              <div className="font-poppins font-bold text-sm">Lavender</div>
              <div className="text-xs opacity-80 font-mono">#E6E0F8</div>
            </div>
            <div className="p-4 rounded-2xl bg-rose-gold text-white shadow-sm space-y-1">
              <div className="font-poppins font-bold text-sm">Rose Gold</div>
              <div className="text-xs opacity-80 font-mono">#B76E79</div>
            </div>
            <div className="p-4 rounded-2xl bg-soft-grey text-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
              <div className="font-poppins font-bold text-sm">Soft Grey</div>
              <div className="text-xs opacity-80 font-mono">#F5F5F7</div>
            </div>
          </div>
        </section>

        {/* Section: Buttons */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              2. Buttons & Micro-Animations
            </h2>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" leftIcon={<ShoppingBag className="w-4 h-4" />}>
                Primary Action
              </Button>
              <Button variant="secondary" leftIcon={<Heart className="w-4 h-4" />}>
                Secondary
              </Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="rose">Rose Gold</Button>
              <Button variant="gold">Champagne Gold</Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button size="sm" variant="primary">Small (sm)</Button>
              <Button size="md" variant="primary">Medium (md)</Button>
              <Button size="lg" variant="primary">Large (lg)</Button>
              <Button isLoading variant="primary">Loading State</Button>
              <Button disabled variant="primary">Disabled</Button>
            </div>
          </div>
        </section>

        {/* Section: Cards */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              3. Cards (Rounded 2xl & Hover Lift)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-royal-purple/10 dark:bg-royal-purple/20 flex items-center justify-center text-royal-purple dark:text-lavender mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <CardTitle>Velvet Evening Gown</CardTitle>
                <CardDescription>Handcrafted French Silk Couture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Designed for red carpet elegance with a tailored silhouette and subtle rose gold embellishments.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="font-poppins font-bold text-royal-purple dark:text-lavender">$1,850</span>
                <Button size="sm" variant="primary">Add to Bag</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-300 mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <CardTitle>Champagne Clutch</CardTitle>
                <CardDescription>Italian Leather Collection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Metallic champagne gold finish with detachable luxury chain strap.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="font-poppins font-bold text-amber-600 dark:text-amber-300">$620</span>
                <Button size="sm" variant="gold">Wishlist</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-300 mb-2">
                  <Bell className="w-5 h-5" />
                </div>
                <CardTitle>VIP Atelier Pass</CardTitle>
                <CardDescription>Private Styling Sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Exclusive access to fashion week previews and personal masterclass fittings.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <Badge variant="rose" dot>Exclusive</Badge>
                <Button size="sm" variant="rose">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Section: Inputs */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              4. Inputs & Forms
            </h2>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              placeholder="fashionista@atelier.com"
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="We send weekly fashion week updates."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Search Catalogue"
              placeholder="Search silk, velvet, jackets..."
              leftIcon={<Search className="w-4 h-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              error="Password must contain at least 8 characters."
            />
            <Input
              label="Promo Code (Disabled)"
              placeholder="SUMMER2026"
              disabled
              helperText="Promo codes unlock during seasonal sales."
            />
          </div>
        </section>

        {/* Section: Badges & Avatars */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              5. Badges & Avatars
            </h2>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            {/* Badges */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-poppins">Badges</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="primary" dot>Royal Purple</Badge>
                <Badge variant="gold" dot>Champagne Gold</Badge>
                <Badge variant="lavender" dot>Lavender</Badge>
                <Badge variant="rose" dot>Rose Gold</Badge>
                <Badge variant="grey">Soft Grey</Badge>
                <Badge variant="outline">Outline Badge</Badge>
              </div>
            </div>

            {/* Avatars */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-poppins">Avatars & Fallbacks</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Avatar size="sm" name="Coco Chanel" status="online" />
                <Avatar size="md" name="Christian Dior" status="busy" />
                <Avatar size="lg" name="Yves Saint Laurent" status="away" />
                <Avatar size="xl" name="Gianni Versace" status="online" />
                <Avatar
                  size="lg"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Model"
                  status="online"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Tabs & Skeleton Loader */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
                6. Animated Tabs
              </h2>
            </div>
            <Tabs items={sampleTabs} />
          </div>

          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
                7. Skeleton Shimmer Loader
              </h2>
            </div>
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="space-y-2 flex-1">
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="40%" height={12} />
                </div>
              </div>
              <Skeleton variant="rectangular" height={100} className="w-full" />
              <div className="flex justify-between pt-2">
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width={100} height={32} />
              </div>
            </Card>
          </div>
        </section>

        {/* Section: Modal & Toast Trigger Interactive Systems */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="font-poppins text-lg font-bold text-slate-900 dark:text-slate-100">
              8. Modal & Toast Systems
            </h2>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal Dialog
            </Button>

            <Button variant="secondary" leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} onClick={() => triggerToast('success')}>
              Success Toast
            </Button>

            <Button variant="secondary" leftIcon={<Info className="w-4 h-4 text-royal-purple" />} onClick={() => triggerToast('info')}>
              Info Toast
            </Button>

            <Button variant="secondary" leftIcon={<AlertTriangle className="w-4 h-4 text-amber-500" />} onClick={() => triggerToast('warning')}>
              Warning Toast
            </Button>

            <Button variant="secondary" leftIcon={<AlertCircle className="w-4 h-4 text-rose-500" />} onClick={() => triggerToast('error')}>
              Error Toast
            </Button>
          </div>
        </section>
      </main>

      {/* Interactive Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Fashion Week Exclusive Access"
        description="Reserve your private seat for the Autumn/Winter 2026 Paris Runway."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                triggerToast('success');
              }}
            >
              Confirm Reservation
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-inter">
          <p>
            Your invitation includes front-row seating, backstage champagne reception, and early access to order runway garments directly.
          </p>
          <div className="p-4 rounded-2xl bg-lavender/30 dark:bg-slate-800 border border-lavender/50 text-xs text-royal-purple dark:text-lavender">
            <strong>Location:</strong> Palais Galliera, Paris • <strong>Date:</strong> Oct 14, 2026
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StyleGuide;
