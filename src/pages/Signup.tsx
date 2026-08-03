import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, UserPlus } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Input, useToast } from '../components/ui';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Account Created Successfully',
      description: 'Welcome to Fashionista Atelier membership.',
      variant: 'success',
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-royal-purple text-white rounded-2xl shadow-md mb-2">
            <Sparkles className="w-6 h-6 text-champagne-gold" />
          </div>
          <CardTitle className="text-2xl">Create Atelier Account</CardTitle>
          <CardDescription>Join Fashionista to access bespoke fitting sessions & VIP lookbooks.</CardDescription>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Sophia Laurent"
            leftIcon={<User className="w-4 h-4" />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="sophia@atelier.com"
            leftIcon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button variant="primary" size="lg" className="w-full mt-2" leftIcon={<UserPlus className="w-4 h-4" />}>
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Already have an atelier account?{' '}
          <Link to="/login" className="text-royal-purple dark:text-lavender font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
