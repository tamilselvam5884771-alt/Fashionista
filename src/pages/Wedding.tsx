import React from 'react';
import { Crown, Heart } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '../components/ui';

export const Wedding: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-slate-950 text-white p-8 sm:p-12 space-y-4 shadow-xl border border-amber-500/20">
        <Badge variant="gold" dot>Royal Bridal Collection</Badge>
        <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
          <Crown className="w-8 h-8 text-champagne-gold" />
          The Wedding & Bridal Salon
        </h1>
        <p className="text-sm sm:text-base text-amber-100/90 font-inter max-w-xl">
          Elegance crafted for unforgettable moments. Explore bridal gowns, groom tuxedos, and bridesmaid collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: 'Princess Cut Silk Train', price: '$4,200', tag: 'Royal Bridal' },
          { title: 'Champagne Gold Veil Gown', price: '$3,800', tag: 'Bestseller' },
          { title: 'Rose Gold Groom Velvet Suit', price: '$2,600', tag: 'Luxury Suit' },
        ].map((item, index) => (
          <Card key={index} className="space-y-4">
            <div className="h-56 rounded-2xl bg-gradient-to-tr from-amber-100/40 via-rose-100/30 to-lavender/40 dark:from-slate-800 dark:to-amber-950/40 flex items-center justify-center p-4">
              <Heart className="w-8 h-8 text-amber-600 dark:text-amber-300 opacity-60" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="gold">{item.tag}</Badge>
                <span className="font-poppins font-bold text-amber-600 dark:text-amber-300">{item.price}</span>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>Includes complimentary custom alterations.</CardDescription>
              <Button variant="gold" size="sm" className="w-full mt-2">
                Book Fitting Consultation
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wedding;
