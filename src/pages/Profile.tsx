import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon,
  ShoppingBag,
  ShieldCheck,
  LogOut,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  Truck,
  Scissors,
  Check,
  Video,
  Clock,
} from 'lucide-react';
import { Button, Card, CardTitle, Avatar, Badge, Tabs, Skeleton, useToast } from '../components/ui';
import { VideoCallModal } from '../components/features';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabaseClient';
import type { Consultation } from '../types';

export const ORDER_STAGES = [
  { id: 'design_approval', label: 'Design Approval', icon: Sparkles },
  { id: 'fabric', label: 'Fabric Selection', icon: PackageCheck },
  { id: 'tailoring', label: 'Bespoke Tailoring', icon: Scissors },
  { id: 'embroidery', label: 'Master Embroidery', icon: Sparkles },
  { id: 'quality_check', label: 'Quality Check', icon: ShieldCheck },
  { id: 'packaging', label: 'Atelier Packaging', icon: PackageCheck },
  { id: 'shipping', label: 'Express Shipping', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuthStore();

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Consultations & Video Call State
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoadingConsultations, setIsLoadingConsultations] = useState(true);
  const [activeVideoCallConsultation, setActiveVideoCallConsultation] = useState<Consultation | null>(null);

  // 1. Fetch User Orders from Supabase & Subscribe to Realtime Updates
  useEffect(() => {
    if (!user) return;

    let channel: any = null;

    const fetchOrdersAndSubscribe = async () => {
      setIsLoadingOrders(true);
      try {
        const { data: dbOrders, error } = await supabase
          .from('orders')
          .select('*, outfits(title, image_url, price, category)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching user orders:', error);
        } else if (dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders);
        } else {
          const { data: outfitSample } = await supabase
            .from('outfits')
            .select('id, title, price, image_url')
            .limit(1)
            .maybeSingle();

          const newOrderPayload = {
            user_id: user.id,
            outfit_id: outfitSample?.id || null,
            status: 'design_approval',
            total: outfitSample?.price || 2450.0,
          };

          const { data: insertedOrder } = await supabase
            .from('orders')
            .insert(newOrderPayload)
            .select('*, outfits(title, image_url, price, category)')
            .single();

          if (insertedOrder) {
            setOrders([insertedOrder]);
          }
        }

        channel = supabase
          .channel(`orders:${user.id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'orders',
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              if (payload.eventType === 'UPDATE') {
                const updatedRow = payload.new;

                setOrders((prevOrders) =>
                  prevOrders.map((ord) =>
                    ord.id === updatedRow.id
                      ? {
                          ...ord,
                          ...updatedRow,
                          outfits: ord.outfits,
                        }
                      : ord
                  )
                );

                const stageName =
                  ORDER_STAGES.find((s) => s.id === updatedRow.status)?.label ||
                  updatedRow.status;

                toast({
                  title: 'Order Status Live Update! ⚡',
                  description: `Order #${updatedRow.id.substring(0, 8)} status is now ${stageName}.`,
                  variant: 'success',
                });
              } else if (payload.eventType === 'INSERT') {
                setOrders((prev) => [payload.new as any, ...prev]);
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.error('Realtime orders error:', err);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrdersAndSubscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user]);

  // 2. Fetch User Consultations & Subscribe to Realtime Updates
  useEffect(() => {
    if (!user) return;

    let channel: any = null;

    const fetchConsultationsAndSubscribe = async () => {
      setIsLoadingConsultations(true);
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('user_id', user.id)
          .order('scheduled_at', { ascending: true });

        if (error) {
          console.error('Error fetching consultations:', error);
        } else if (data && data.length > 0) {
          setConsultations(data as Consultation[]);
        } else {
          // Seed an initial demo consultation if user has none
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(11, 0, 0, 0);

          const demoPayload = {
            user_id: user.id,
            designer_name: 'Atelier Saint-Germain',
            designer_avatar:
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            scheduled_at: tomorrow.toISOString(),
            status: 'scheduled',
            notes: 'Initial 3D fitting & silk fabric selection review',
          };

          const { data: inserted } = await supabase
            .from('consultations')
            .insert(demoPayload)
            .select()
            .single();

          if (inserted) {
            setConsultations([inserted as Consultation]);
          }
        }

        channel = supabase
          .channel(`consultations:${user.id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'consultations',
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              if (payload.eventType === 'INSERT') {
                setConsultations((prev) => [payload.new as Consultation, ...prev]);
                toast({
                  title: 'New Consultation Scheduled! 📅',
                  description: `Appointment with ${payload.new.designer_name} confirmed.`,
                  variant: 'success',
                });
              } else if (payload.eventType === 'UPDATE') {
                setConsultations((prev) =>
                  prev.map((item) =>
                    item.id === payload.new.id ? (payload.new as Consultation) : item
                  )
                );
              } else if (payload.eventType === 'DELETE') {
                setConsultations((prev) => prev.filter((item) => item.id !== payload.old.id));
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.error('Realtime consultations error:', err);
      } finally {
        setIsLoadingConsultations(false);
      }
    };

    fetchConsultationsAndSubscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [user]);

  // Advance Order Stage (Triggers Supabase Realtime UPDATE)
  const handleAdvanceStage = async (orderId: string, currentStatus: string) => {
    const currentIdx = ORDER_STAGES.findIndex((s) => s.id === currentStatus);
    const nextIdx = (currentIdx + 1) % ORDER_STAGES.length;
    const nextStatus = ORDER_STAGES[nextIdx].id;

    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: nextStatus })
        .eq('id', orderId);

      if (error) {
        toast({
          title: 'Update Error',
          description: error.message,
          variant: 'error',
        });
      }
    } catch (err: any) {
      console.error('Failed to update order stage:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: 'Signed Out',
      description: 'You have been signed out of your atelier account.',
      variant: 'info',
    });
    navigate('/login');
  };

  const profileTabs = [
    {
      id: 'consultations',
      label: 'Upcoming Consultations',
      icon: <Video className="w-4 h-4 text-emerald-500" />,
      content: (
        <div className="space-y-6">
          {isLoadingConsultations ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} variant="rectangular" height={160} className="w-full rounded-2xl" />
              ))}
            </div>
          ) : consultations.length === 0 ? (
            <Card className="p-8 text-center space-y-4">
              <Video className="w-12 h-12 mx-auto text-slate-400" />
              <CardTitle>No Scheduled Consultations</CardTitle>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Book a 1-on-1 live consultation with our master designers or ateliers.
              </p>
              <Button size="sm" variant="primary" onClick={() => navigate('/design')}>
                Book Live Consultation
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultations.map((item) => {
                const scheduledDate = new Date(item.scheduled_at);
                const isScheduled = item.status === 'scheduled';

                return (
                  <Card key={item.id} hoverEffect className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.designer_avatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                          }
                          alt={item.designer_name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-royal-purple/20"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-slate-100">
                            {item.designer_name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-rose-gold" />
                            {scheduledDate.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            •{' '}
                            {scheduledDate.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={
                          item.status === 'completed'
                            ? 'grey'
                            : item.status === 'cancelled'
                            ? 'rose'
                            : 'gold'
                        }
                        dot={isScheduled}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>

                    {item.notes && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 font-inter">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase mb-0.5">
                          Fitting Notes
                        </span>
                        {item.notes}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Virtual Fitting Room
                      </span>

                      {isScheduled ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setActiveVideoCallConsultation(item)}
                          leftIcon={<Video className="w-4 h-4 animate-pulse" />}
                        >
                          Join Call
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" disabled>
                          Call Ended
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'orders',
      label: 'My Orders & Realtime Tracking',
      icon: <ShoppingBag className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {isLoadingOrders ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} variant="rectangular" height={200} className="w-full rounded-2xl" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="p-8 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-400" />
              <CardTitle>No Active Orders</CardTitle>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our Haute Couture collection or design your custom garment to place your first order.
              </p>
              <Button size="sm" variant="primary" onClick={() => navigate('/explore')}>
                Explore Atelier Catalog
              </Button>
            </Card>
          ) : (
            orders.map((order) => {
              const currentStageIdx = ORDER_STAGES.findIndex((s) => s.id === order.status);
              const activeStage = ORDER_STAGES[currentStageIdx >= 0 ? currentStageIdx : 0];

              return (
                <Card key={order.id} className="p-6 space-y-6 overflow-hidden">
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-poppins font-bold text-base text-slate-900 dark:text-slate-100">
                          Order #{order.id.substring(0, 8).toUpperCase()}
                        </span>

                        {/* Animated Live Status Badge */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={order.status}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Badge
                              variant={
                                order.status === 'delivered'
                                  ? 'gold'
                                  : order.status === 'shipping'
                                  ? 'rose'
                                  : 'primary'
                              }
                              dot
                            >
                              {activeStage.label}
                            </Badge>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{order.outfits?.title || 'Custom Bespoke Outfit'}</span>
                        <span>•</span>
                        <span className="font-bold text-royal-purple dark:text-lavender">
                          ${order.total}
                        </span>
                      </p>
                    </div>

                    {/* Simulation Action Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      isLoading={updatingOrderId === order.id}
                      onClick={() => handleAdvanceStage(order.id, order.status)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Simulate Next Stage ⚡
                    </Button>
                  </div>

                  {/* Visual Stepper Timeline with Framer Motion */}
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-poppins block">
                      Live Tailoring & Delivery Progress
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                      {ORDER_STAGES.map((stage, idx) => {
                        const isDone = idx < currentStageIdx;
                        const isCurrent = idx === currentStageIdx;
                        const StageIcon = stage.icon;

                        return (
                          <div
                            key={stage.id}
                            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 ${
                              isCurrent
                                ? 'bg-royal-purple/10 dark:bg-royal-purple/20 border-royal-purple dark:border-lavender text-royal-purple dark:text-lavender shadow-sm scale-105'
                                : isDone
                                ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                : 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-100 dark:border-slate-850 text-slate-400 opacity-60'
                            }`}
                          >
                            <div className="relative">
                              {isDone ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <StageIcon
                                  className={`w-4 h-4 ${
                                    isCurrent ? 'text-royal-purple dark:text-lavender animate-pulse' : ''
                                  }`}
                                />
                              )}
                            </div>
                            <span className="text-[10px] font-poppins font-semibold leading-tight line-clamp-1">
                              {stage.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      ),
    },
    {
      id: 'measurements',
      label: 'Saved Atelier Sizes',
      icon: <UserIcon className="w-4 h-4" />,
      content: (
        <Card className="p-6 space-y-4">
          <CardTitle>Bespoke Fitting Profile</CardTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-soft-grey dark:bg-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Bust / Chest</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">36 in</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-soft-grey dark:bg-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Waist</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">28 in</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-soft-grey dark:bg-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Hips</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">38 in</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-soft-grey dark:bg-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Height</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">5 ft 9 in</span>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-inter">
      {/* Profile Header */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar
            size="xl"
            name={user?.name || 'Valued Client'}
            src={user?.avatar_url}
            status="online"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-2">
              {user?.name || 'Atelier VIP Client'}
              <ShieldCheck className="w-5 h-5 text-royal-purple dark:text-lavender" />
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {user?.email}
            </p>
            <div className="flex gap-2 pt-1 justify-center sm:justify-start">
              <Badge variant="gold" dot>
                {user?.role ? user.role.toUpperCase() : 'CUSTOMER'}
              </Badge>
              <Badge variant="lavender">Paris Atelier</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Button
              variant="gold"
              onClick={() => navigate('/design')}
              className="font-poppins font-bold text-xs shadow-md rounded-xl"
              leftIcon={<Sparkles className="w-4 h-4 text-amber-950" />}
            >
              Identify My Outfit
            </Button>
          </motion.div>

          <Button variant="outline" onClick={handleLogout} leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Identify My Outfit Feature Banner Card */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card
          onClick={() => navigate('/design')}
          className="p-5 bg-gradient-to-r from-purple-950/40 via-slate-900 to-purple-950 border border-purple-500/30 hover:border-purple-500/70 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors group rounded-3xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:bg-[#5B2C91] group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                Have an Outfit Photo? Identify My Outfit
              </h3>
              <p className="text-xs text-slate-300">
                Upload a photo of any outfit to identify the style, fabric, and match expert tailors.
              </p>
            </div>
          </div>
          <Button
            variant="gold"
            size="sm"
            className="rounded-xl font-poppins font-bold text-xs shrink-0"
            rightIcon={<ArrowRight className="w-4 h-4 text-amber-950 group-hover:translate-x-1 transition-transform" />}
          >
            Upload Photo Now
          </Button>
        </Card>
      </motion.div>

      <Tabs items={profileTabs} />

      {/* Video Call Room Modal */}
      <VideoCallModal
        isOpen={Boolean(activeVideoCallConsultation)}
        onClose={() => setActiveVideoCallConsultation(null)}
        consultation={activeVideoCallConsultation}
        onCallEnded={() => {
          if (activeVideoCallConsultation) {
            setConsultations((prev) =>
              prev.map((c) =>
                c.id === activeVideoCallConsultation.id ? { ...c, status: 'completed' } : c
              )
            );
          }
        }}
      />
    </div>
  );
};

export default Profile;
