import React from 'react';
import { User, Settings, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button, Card, CardTitle, Avatar, Badge, Tabs } from '../components/ui';

export const Profile: React.FC = () => {
  const profileTabs = [
    {
      id: 'orders',
      label: 'My Orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <Card className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-poppins font-bold text-sm text-slate-900 dark:text-slate-100">
                  Order #FASH-8921
                </span>
                <Badge variant="primary" dot>Processing</Badge>
              </div>
              <p className="text-xs text-slate-500">Royal Velvet Blazer • $1,420</p>
            </div>
            <Button size="sm" variant="outline">Track Order</Button>
          </Card>
        </div>
      ),
    },
    {
      id: 'measurements',
      label: 'Saved Sizes',
      icon: <User className="w-4 h-4" />,
      content: (
        <Card className="p-6 space-y-4">
          <CardTitle>Atelier Measurements</CardTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-soft-grey dark:bg-slate-800">
              <span className="text-slate-400 block">Bust / Chest</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">36 in</span>
            </div>
            <div className="p-3 rounded-xl bg-soft-grey dark:bg-slate-800">
              <span className="text-slate-400 block">Waist</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">28 in</span>
            </div>
            <div className="p-3 rounded-xl bg-soft-grey dark:bg-slate-800">
              <span className="text-slate-400 block">Hips</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">38 in</span>
            </div>
            <div className="p-3 rounded-xl bg-soft-grey dark:bg-slate-800">
              <span className="text-slate-400 block">Height</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">5 ft 9 in</span>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar size="xl" name="Victoria Sterling" status="online" />
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-2">
              Victoria Sterling
              <ShieldCheck className="w-5 h-5 text-royal-purple dark:text-lavender" />
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">VIP Atelier Member • victoria@sterling.com</p>
            <div className="flex gap-2 pt-1 justify-center sm:justify-start">
              <Badge variant="gold" dot>Gold Tier</Badge>
              <Badge variant="lavender">Paris Atelier</Badge>
            </div>
          </div>
        </div>

        <Button variant="outline" leftIcon={<Settings className="w-4 h-4" />}>
          Edit Profile
        </Button>
      </Card>

      <Tabs items={profileTabs} />
    </div>
  );
};

export default Profile;
