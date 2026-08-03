import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, LogIn } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Input, useToast } from '../components/ui';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Welcome Back to Fashionista',
      description: 'Successfully signed in to your atelier account.',
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
          <CardTitle className="text-2xl">Sign In to Atelier</CardTitle>
          <CardDescription>Enter your credentials to access your private fitting profile.</CardDescription>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="fashionista@atelier.com"
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

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-inter">
              <input type="checkbox" className="rounded border-slate-300 text-royal-purple focus:ring-royal-purple" />
              Remember me
            </label>
            <a href="#" className="text-royal-purple dark:text-lavender font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <Button variant="primary" size="lg" className="w-full mt-2" leftIcon={<LogIn className="w-4 h-4" />}>
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an atelier account?{' '}
          <Link to="/signup" className="text-royal-purple dark:text-lavender font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
