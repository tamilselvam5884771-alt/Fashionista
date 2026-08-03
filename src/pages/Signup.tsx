import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react';
import { Button, Input, useToast } from '../components/ui';
import { supabase } from '../lib/supabaseClient';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validate = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name.trim()) {
      setNameError('Full name is required.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!agreeTerms) {
      toast({
        title: 'Terms & Conditions Required',
        description: 'Please accept the atelier terms of service to continue.',
        variant: 'warning',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'customer',
          },
        },
      });

      if (error) {
        toast({
          title: 'Registration Failed',
          description: error.message,
          variant: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').upsert([
          {
            id: data.user.id,
            full_name: name,
            role: 'customer',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          },
        ]);

        if (profileError) {
          console.error('Failed to create user profile row:', profileError);
        }
      }

      toast({
        title: 'Welcome to Fashionista Atelier',
        description: 'Your account has been created successfully.',
        variant: 'success',
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Registration Error',
        description: err?.message || 'An unexpected error occurred.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-950 font-inter">
      {/* Left Panel: Animated Gradient & Fashion Shapes (Desktop) */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-purple-950 via-royal-purple to-rose-gold/40 text-white p-12 flex-col justify-between select-none">
        {/* Floating Animated Geometric Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -60, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-gold/40 to-lavender/30 blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-10 w-72 h-72 rounded-full bg-champagne-gold/20 blur-2xl border border-white/10 pointer-events-none"
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Sparkles className="w-6 h-6 text-champagne-gold" />
          </div>
          <div>
            <span className="font-poppins font-bold text-2xl tracking-tight text-lavender">Fashionista</span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-poppins">Haute Couture Atelier</span>
          </div>
        </div>

        {/* Center Quote Illustration */}
        <div className="relative z-10 max-w-md space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-poppins text-champagne-gold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Exclusive VIP Atelier Access
            </div>
            <h2 className="font-poppins text-4xl font-extrabold leading-tight text-white">
              "Style is a way to say who you are without having to speak."
            </h2>
            <p className="text-sm text-lavender/80 font-inter">
              Join our global community of fashion icons, personal styling sessions, and bespoke fittings.
            </p>
          </motion.div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 text-xs text-slate-400 font-mono">
          © 2026 Fashionista Atelier. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Form Area */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex lg:hidden p-3 bg-royal-purple text-white rounded-2xl shadow-md mb-2">
              <Sparkles className="w-6 h-6 text-champagne-gold" />
            </div>
            <h1 className="font-poppins text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
              Join Fashionista to unlock bespoke fittings and VIP lookbooks.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Sophia Laurent"
              leftIcon={<User className="w-4 h-4" />}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              error={nameError}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="fashionista@atelier.com"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={emailError}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              error={passwordError}
            />

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError('');
              }}
              error={confirmPasswordError}
            />

            {/* Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-royal-purple focus:ring-royal-purple"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 font-inter leading-tight">
                I agree to the{' '}
                <a href="#" className="text-royal-purple dark:text-lavender font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-royal-purple dark:text-lavender font-semibold hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isSubmitting}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an atelier account?{' '}
            <Link to="/login" className="text-royal-purple dark:text-lavender font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
