import React from 'react';
import { Compass, Filter, Search } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Input, Badge } from '../components/ui';

export const Explore: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-royal-purple dark:text-lavender" />
            Explore Collections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
            Browse trending styles, designer catalogues, and luxury couture filter categories.
          </p>
        </div>
        <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
          Filter Results
        </Button>
      </div>

      {/* Search Input */}
      <Input
        placeholder="Filter by designer, color (purple, gold, rose), or season..."
        leftIcon={<Search className="w-4 h-4" />}
      />

      {/* Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Badge variant="primary" dot>All Styles</Badge>
        <Badge variant="gold">Evening Wear</Badge>
        <Badge variant="lavender">Haute Couture</Badge>
        <Badge variant="rose">Accessories</Badge>
        <Badge variant="grey">Footwear</Badge>
        <Badge variant="outline">Tailored Suits</Badge>
      </div>

      {/* Catalogue Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <Card key={idx}>
            <div className="h-44 rounded-xl bg-gradient-to-tr from-royal-purple/20 via-lavender/30 to-rose-gold/20 flex items-center justify-center p-4">
              <span className="font-poppins font-semibold text-sm text-royal-purple dark:text-lavender">
                Lookbook #{idx} Showcase
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <CardTitle>Paris Runway Design #{idx}</CardTitle>
              <CardDescription>Handcrafted luxury silk piece</CardDescription>
              <div className="flex items-center justify-between pt-2">
                <span className="font-poppins font-bold text-royal-purple dark:text-lavender">$1,290</span>
                <Button size="sm" variant="primary">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Explore;
