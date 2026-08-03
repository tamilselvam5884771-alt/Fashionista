import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ShoppingBag,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  Package,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardTitle, CardDescription, Badge, Button } from '../components/ui';
import {
  revenueChartData,
  dashboardOrders,
  dashboardInventory,
} from '../lib/mockData';

// Animated Count-Up Number Component
const AnimatedCount: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
};

export const BoutiqueDashboard: React.FC = () => {
  const statusBadgeVariantMap = {
    Completed: 'primary' as const,
    'In Fitting': 'gold' as const,
    Pending: 'rose' as const,
    Shipped: 'lavender' as const,
  };

  const statusIconMap = {
    Completed: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
    'In Fitting': <Clock className="w-3.5 h-3.5 text-amber-500" />,
    Pending: <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />,
    Shipped: <Truck className="w-3.5 h-3.5 text-royal-purple dark:text-lavender" />,
  };

  return (
    <div className="space-y-8 font-inter">
      {/* 1. Overview Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <Card hoverEffect className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400">
              Total Fitting Orders
            </span>
            <div className="p-2.5 rounded-xl bg-royal-purple/10 dark:bg-royal-purple/20 text-royal-purple dark:text-lavender">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-extrabold text-3xl text-slate-900 dark:text-slate-100">
              <AnimatedCount value={142} />
            </h3>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12.4% vs last month
            </span>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card hoverEffect className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400">
              Monthly Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-extrabold text-3xl text-amber-600 dark:text-amber-300">
              <AnimatedCount value={48250} prefix="$" />
            </h3>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.2% vs last month
            </span>
          </div>
        </Card>

        {/* Average Rating */}
        <Card hoverEffect className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400">
              Atelier Rating
            </span>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-gold">
              <Star className="w-5 h-5 fill-rose-gold" />
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-extrabold text-3xl text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <AnimatedCount value={4.9} decimals={1} />
              <span className="text-sm font-normal text-slate-400">/ 5.0</span>
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1 block">
              Based on 128 client reviews
            </span>
          </div>
        </Card>

        {/* Active Consultations */}
        <Card hoverEffect className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-poppins font-semibold text-slate-500 dark:text-slate-400">
              Active Consultations
            </span>
            <div className="p-2.5 rounded-xl bg-lavender text-royal-purple dark:bg-slate-800 dark:text-lavender">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-extrabold text-3xl text-royal-purple dark:text-lavender">
              <AnimatedCount value={18} />
            </h3>
            <span className="text-[11px] text-royal-purple dark:text-lavender font-semibold mt-1 block">
              3 VIP fittings scheduled today
            </span>
          </div>
        </Card>
      </div>

      {/* 2. Recharts Revenue Line Chart */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Revenue & Consultation Growth</CardTitle>
            <CardDescription>Monthly performance analytics for Atelier Le Paris (2026)</CardDescription>
          </div>
          <Badge variant="gold" dot>Live Data Sync</Badge>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B2C91" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#5B2C91" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '16px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#5B2C91" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 3. Recent Orders Table */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-royal-purple dark:text-lavender" />
              Recent Fitting Orders
            </CardTitle>
            <CardDescription>Latest bespoke couture bookings and order statuses</CardDescription>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs font-inter border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-poppins uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Garment Title</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {dashboardOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-royal-purple dark:text-lavender">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4 font-poppins font-bold text-slate-900 dark:text-slate-100">
                    {ord.customerName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {ord.garmentTitle}
                  </td>
                  <td className="py-3.5 px-4 font-poppins font-bold text-slate-900 dark:text-slate-100">
                    ${ord.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {ord.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={statusBadgeVariantMap[ord.status]} size="sm" className="gap-1">
                      {statusIconMap[ord.status]}
                      <span>{ord.status}</span>
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. Inventory Management List */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-rose-gold" />
              Atelier Garment Inventory
            </CardTitle>
            <CardDescription>Stock tracking for luxury silk, velvet, and bridal items</CardDescription>
          </div>
          <Button variant="primary" size="sm">
            Add New Item
          </Button>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs font-inter border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-poppins uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Garment Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {dashboardInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    {item.sku}
                  </td>
                  <td className="py-3.5 px-4 font-poppins font-bold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 font-poppins font-bold text-royal-purple dark:text-lavender">
                    ${item.price.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    {item.stock} units
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={item.status === 'In Stock' ? 'primary' : 'gold'} size="sm">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BoutiqueDashboard;
