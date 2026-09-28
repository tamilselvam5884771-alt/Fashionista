import React, { useEffect } from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardTitle, useToast } from '../components/ui';
import { useWishlistStore, FALLBACK_WISHLIST_IMAGE } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export const Wishlist: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { wishlist, fetchWishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    }
  }, [user]);

  const handleMoveToBag = (item: any) => {
    addToCart(
      {
        outfit_id: item.outfit_id,
        title: item.title,
        price: item.price,
        image_url: item.image_url,
        designer: item.designer,
      },
      user?.id
    );

    removeFromWishlist(item.id, user?.id);

    toast({
      title: 'Moved to Bag 🛍️',
      description: `"${item.title}" has been moved to your shopping bag.`,
      variant: 'success',
    });
  };

  const handleRemove = (id: string, title: string) => {
    removeFromWishlist(id, user?.id);
    toast({
      title: 'Removed from Wishlist',
      description: `"${title}" removed.`,
      variant: 'info',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-inter text-slate-900 dark:text-slate-100 selection:bg-[#E05297]/30">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-[#E05297] fill-[#E05297]/20" />
            Saved Items ({wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Outfits saved for later.
          </p>
        </div>

        {wishlist.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearWishlist(user?.id);
              toast({ title: 'Wishlist Cleared', description: 'All items removed.', variant: 'info' });
            }}
            className="text-slate-500 hover:text-rose-500 self-start sm:self-auto"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Wishlist Grid / Empty State */}
      {wishlist.length === 0 ? (
        <Card className="p-12 text-center space-y-4 border border-slate-200/80 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-pink-500/10 text-[#E05297] mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white">
              Your saved list is empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Explore our collection and tap the heart icon to save outfits here.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="gold" size="md" className="rounded-xl font-poppins font-bold px-6" rightIcon={<ArrowRight className="w-4 h-4 text-amber-950" />}>
              Explore Collection
            </Button>
          </Link>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card hoverEffect className="p-4 space-y-4 border border-slate-200/80 dark:border-slate-800 hover:border-[#E05297]/50 shadow-xs hover:shadow-xl transition-all duration-300 group">
                  {/* Image with Graceful Error Fallback Handler */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-64">
                    <img
                      src={item.image_url || FALLBACK_WISHLIST_IMAGE}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_WISHLIST_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold text-purple-300">
                      {item.category || 'Traditional'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-[#8B5CF6] dark:text-purple-400">
                      {item.designer || 'Kanchi Weaves'}
                    </span>
                    <CardTitle className="text-sm line-clamp-1">{item.title}</CardTitle>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-poppins font-bold text-base text-slate-900 dark:text-white">
                      ₹{item.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(item.id, item.title)}
                        className="text-slate-400 hover:text-rose-500"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => handleMoveToBag(item)}
                        className="font-poppins font-bold text-xs rounded-xl"
                        leftIcon={<ShoppingBag className="w-3.5 h-3.5 text-amber-950" />}
                      >
                        Move to Bag
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Wishlist;
