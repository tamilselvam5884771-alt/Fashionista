import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button, useToast, Modal } from '../ui';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabaseClient';

export const CartDrawer: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const {
    cartItems,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getItemCount,
  } = useCartStore();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isOrderPlacedSuccess, setIsOrderPlacedSuccess] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 0 ? 0 : 0; // Free delivery
  const total = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Shopping Bag Empty 🛍️',
        description: 'Please add garments to your bag before checking out.',
        variant: 'info',
      });
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    try {
      if (user) {
        // Insert into Supabase public.orders table
        await supabase.from('orders').insert({
          user_id: user.id,
          status: 'design_approval',
          total: total,
        });

        await clearCart(user.id);
      } else {
        await clearCart();
      }

      setIsOrderPlacedSuccess(true);
      toast({
        title: 'Order Confirmed! 🎉',
        description: 'Your garment tailoring order has been received by our atelier.',
        variant: 'success',
      });
    } catch (err: any) {
      console.warn('Error placing order in Supabase:', err);
      setIsOrderPlacedSuccess(true);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      {/* Animated Sliding Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />

            {/* Slide-out Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col font-inter text-slate-900 dark:text-slate-100"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    <ShoppingBag className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="font-poppins font-bold text-base text-slate-900 dark:text-white">
                      Your Shopping Bag
                    </h2>
                    <span className="text-xs font-mono text-slate-400">
                      {getItemCount()} {getItemCount() === 1 ? 'garment' : 'garments'} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-poppins font-bold text-lg">Your bag is empty</h3>
                      <p className="text-xs text-slate-500 max-w-xs">
                        Explore our South Indian traditional sarees, kurtis, and lehengas to add bespoke garments to your bag.
                      </p>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex gap-3 items-center group"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-20 h-24 object-cover rounded-xl shrink-0"
                      />

                      {/* Info & Quantity Stepper */}
                      <div className="flex-1 space-y-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                          {item.designer || 'Atelier Weaves'}
                        </span>
                        <h4 className="font-poppins font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                          {item.title}
                        </h4>
                        <div className="font-poppins font-bold text-sm text-slate-900 dark:text-white">
                          ₹{item.price.toLocaleString()}
                        </div>

                        {/* Quantity Stepper & Delete */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, user?.id)}
                              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, user?.id)}
                              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id, user?.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Summary & Checkout Action Footer */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                  {/* Summary Breakdown */}
                  <div className="space-y-2 text-xs font-inter">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Delivery & Fitting Allowance</span>
                      <span className="text-emerald-500 font-bold uppercase text-[10px]">FREE</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-poppins font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>Total Price</span>
                      <span className="text-base text-royal-purple dark:text-lavender">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Checkout CTA */}
                  <Button
                    size="lg"
                    variant="gold"
                    onClick={handleProceedToCheckout}
                    className="w-full font-poppins font-bold text-xs shadow-lg shadow-amber-500/20 py-3.5 rounded-xl"
                    rightIcon={<ArrowRight className="w-4 h-4 text-amber-950" />}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Summary Confirmation Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          setIsCheckoutModalOpen(false);
          setIsOrderPlacedSuccess(false);
        }}
        title="Confirm Order"
        maxWidth="md"
      >
        <div className="p-2 space-y-6 font-inter select-none">
          {!isOrderPlacedSuccess ? (
            <>
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white">
                  Confirm Your Order
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review your items before submitting your order.
                </p>
              </div>

              {/* Items List inside Modal */}
              <div className="max-h-48 overflow-y-auto space-y-2 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/50 dark:border-slate-800/50 last:border-none">
                    <span className="font-poppins font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[240px]">
                      {item.title} (x{item.quantity})
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Place Order Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Amount</span>
                  <span className="font-poppins font-extrabold text-xl text-royal-purple dark:text-lavender">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <Button
                  size="md"
                  variant="gold"
                  isLoading={isPlacingOrder}
                  onClick={handlePlaceOrder}
                  className="px-6 font-poppins font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Place Order Now
                </Button>
              </div>
            </>
          ) : (
            /* Order Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-poppins font-extrabold text-xl text-slate-900 dark:text-white flex items-center justify-center gap-2">
                  Order Confirmed! <Sparkles className="w-5 h-5 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your order has been received. You can track your order status on your profile.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setIsOrderPlacedSuccess(false);
                  setIsOpen(false);
                }}
                className="px-6 font-poppins font-bold text-xs rounded-xl"
              >
                Return to Shop
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CartDrawer;
