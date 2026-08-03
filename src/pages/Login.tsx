import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button, Input, Modal, useToast } from '../components/ui';
import { useAuthStore } from '../store';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email);
      toast({
        title: 'Welcome Back to Fashionista',
        description: 'Successfully signed in to your atelier account.',
        variant: 'success',
      });
      setIsSubmitting(false);
      navigate('/');
    }, 600);
  };

  const handleGoogleLogin = () => {
    login('atelier.guest@fashionista.com', 'Guest Member');
    toast({
      title: 'Signed in with Google',
      description: 'Connected as guest member.',
      variant: 'success',
    });
    navigate('/');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'error',
      });
      return;
    }
    setIsResetOpen(false);
    toast({
      title: 'Password Reset Link Sent',
      description: `Instructions sent to ${resetEmail}`,
      variant: 'info',
    });
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
              Enter your details to sign in to your atelier account.
            </p>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold font-poppins text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-purple/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="absolute px-3 bg-white dark:bg-slate-950 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Or sign in with email
            </span>
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
