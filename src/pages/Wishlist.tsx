import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription } from '../components/ui';

export const Wishlist: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-gold fill-rose-gold/20" />
            Saved Wishlist (3 Items)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Curated garments reserved in your atelier wishlist.</p>
        </div>
        <Button variant="ghost" size="sm">
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Velvet Evening Gown', price: '$1,850', color: 'Royal Purple' },
          { title: 'Champagne Leather Clutch', price: '$620', color: 'Champagne Gold' },
          { title: 'Rose Gold Silk Scarf', price: '$340', color: 'Rose Gold' },
        ].map((item, idx) => (
          <Card key={idx} className="space-y-4">
            <div className="h-40 rounded-xl bg-lavender/30 dark:bg-slate-800 flex items-center justify-center">
              <span className="font-poppins text-xs font-semibold text-royal-purple dark:text-lavender">
                {item.color}
              </span>
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>In stock • Ships within 24 hours</CardDescription>
            <div className="flex items-center justify-between pt-2">
              <span className="font-poppins font-bold text-royal-purple dark:text-lavender">{item.price}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-slate-400" />
                </Button>
                <Button size="sm" variant="primary" leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}>
                  Move to Bag
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
