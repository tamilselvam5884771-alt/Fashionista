import React from 'react';
import { Wallet as WalletIcon, PlusCircle } from 'lucide-react';
import { Button, Card, CardTitle, Badge } from '../components/ui';

export const Wallet: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <WalletIcon className="w-6 h-6 text-champagne-gold" />
            Atelier Wallet & Credits
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage store credits, reward points, and saved payment methods.</p>
        </div>
        <Button variant="gold" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
          Add Funds
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-r from-royal-purple to-purple-900 text-white space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="gold" dot>Atelier Credit Card</Badge>
            <span className="text-xs font-mono opacity-80">Fashionista VIP</span>
          </div>
          <div className="pt-4">
            <span className="text-xs text-lavender/80 font-inter">Available Balance</span>
            <div className="font-poppins font-extrabold text-3xl text-champagne-gold mt-1">$1,250.00</div>
          </div>
          <div className="flex justify-between items-center text-xs font-mono pt-4 border-t border-white/10">
            <span>•••• •••• •••• 9412</span>
            <span>EXP 09/29</span>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="space-y-3">
            {[
              { title: 'Velvet Blazer Fitting', amount: '-$1,420.00', date: 'Today' },
              { title: 'VIP CashBack Loyalty Deposit', amount: '+$150.00', date: 'Yesterday' },
            ].map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-soft-grey dark:bg-slate-800">
                <div>
                  <span className="font-poppins font-semibold text-xs text-slate-800 dark:text-slate-200">{tx.title}</span>
                  <span className="text-[10px] text-slate-400 block">{tx.date}</span>
                </div>
                <span className={`font-poppins font-bold text-xs ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-900 dark:text-slate-100'}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
