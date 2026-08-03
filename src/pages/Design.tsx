import React from 'react';
import { Sparkles, Palette, Ruler, CheckCircle2 } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Input, Badge } from '../components/ui';

export const Design: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <Badge variant="rose" dot>Fashionista Studio</Badge>
        <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles className="w-7 h-7 text-rose-gold" />
          Custom Atelier Fitting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter max-w-2xl">
          Collaborate with master tailors to design custom gowns, tuxedos, and bespoke couture made to your exact measurements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 border-royal-purple/20">
          <div className="w-12 h-12 rounded-2xl bg-royal-purple/10 text-royal-purple dark:text-lavender flex items-center justify-center">
            <Palette className="w-6 h-6" />
          </div>
          <CardTitle>1. Select Fabrics</CardTitle>
          <CardDescription>
            Choose from imported Mulberry silk, French lace, velvet, and organic cottons.
          </CardDescription>
        </Card>

        <Card className="p-6 space-y-4 border-amber-300/30">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 flex items-center justify-center">
            <Ruler className="w-6 h-6" />
          </div>
          <CardTitle>2. Virtual 3D Measurement</CardTitle>
          <CardDescription>
            Input your precise measurements or schedule a 1-on-1 virtual fitting session.
          </CardDescription>
        </Card>

        <Card className="p-6 space-y-4 border-rose-200/50">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-gold flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <CardTitle>3. Tailored Delivery</CardTitle>
          <CardDescription>
            Hand-stitched by couture artisans and delivered in signature luxury packaging.
          </CardDescription>
        </Card>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <CardTitle>Start Custom Fitting Consultation</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Sophia Laurent" />
          <Input label="Contact Email" placeholder="sophia@luxury.com" />
          <Input label="Preferred Style Category" placeholder="Evening Gown / Velvet Tuxedo" />
          <Input label="Target Event Date" type="date" />
        </div>
        <Button variant="primary" size="lg" className="w-full sm:w-auto">
          Submit Design Request
        </Button>
      </Card>
    </div>
  );
};

export default Design;
