import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button, Input, Modal, useToast } from '../components/ui';
import { supabase } from '../lib/supabaseClient';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Forgot Password Modal
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

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

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Authentication Failed',
          description: error.message,
          variant: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: 'Welcome Back to Fashionista',
        description: 'Successfully signed in to your atelier account.',
        variant: 'success',
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Sign In Error',
        description: err?.message || 'An unexpected error occurred.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'error',
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast({
          title: 'Reset Error',
          description: error.message,
          variant: 'error',
        });
      } else {
        setIsResetOpen(false);
        toast({
          title: 'Password Reset Link Sent',
          description: `Instructions sent to ${resetEmail}`,
          variant: 'info',
        });
      }
    } catch (err: any) {
      toast({
        title: 'Reset Error',
        description: err?.message || 'Failed to send reset link.',
        variant: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-950 font-inter">
      {/* Left Panel: Animated Gradient & Fashion Shapes (Desktop) */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-royal-purple via-purple-950 to-slate-950 text-white p-12 flex-col justify-between select-none">
        {/* Floating Animated Geometric Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-champagne-gold/30 to-lavender/20 blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-10 w-80 h-80 rounded-3xl bg-rose-gold/20 blur-2xl border border-white/10 pointer-events-none"
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
              <Sparkles className="w-3.5 h-3.5" /> Paris Fashion Week 2026
            </div>
            <h2 className="font-poppins text-4xl font-extrabold leading-tight text-white">
              "Elegance is not standing out, but being remembered."
            </h2>
            <p className="text-sm text-lavender/80 font-inter">
              Access your private fitting room, customized lookbooks, and exclusive atelier collections.
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
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
              Enter your credentials to sign in to your atelier account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-1">
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
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(true)}
                  className="text-xs font-semibold text-royal-purple dark:text-lavender hover:underline font-poppins"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Switch to Signup */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an atelier account?{' '}
            <Link to="/signup" className="text-royal-purple dark:text-lavender font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        title="Reset Your Password"
        description="Enter your registered email address to receive a password reset link."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleResetSubmit}>
              Send Reset Link
            </Button>
          </>
        }
      >
        <div className="py-2">
          <Input
            label="Registered Email"
            type="email"
            placeholder="fashionista@atelier.com"
            leftIcon={<Mail className="w-4 h-4" />}
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Login;
