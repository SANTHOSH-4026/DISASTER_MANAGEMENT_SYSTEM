import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Loader2, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

export const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Decorative Glow Behind Card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50" />
      
      {/* Main Glassmorphism Card */}
      <div className="relative bg-[#0F172A]/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        
        {/* Mobile-only Branding */}
        <div className="lg:hidden flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Request</h2>
          <p className="text-slate-400 font-light">Register for system clearance.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Operative Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                placeholder="John Doe"
                required
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-focus-within:w-[calc(100%-2rem)] transition-all duration-300 rounded-full opacity-0 group-focus-within:opacity-100" />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email / ID</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                placeholder="operative@disaster.in"
                required
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-focus-within:w-[calc(100%-2rem)] transition-all duration-300 rounded-full opacity-0 group-focus-within:opacity-100" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Access Key</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-12 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-cyan-400 transition-colors duration-300 z-10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-focus-within:w-[calc(100%-2rem)] transition-all duration-300 rounded-full opacity-0 group-focus-within:opacity-100" />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Verify Key</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-12 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-cyan-400 transition-colors duration-300 z-10"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-focus-within:w-[calc(100%-2rem)] transition-all duration-300 rounded-full opacity-0 group-focus-within:opacity-100" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-xl mt-8"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite] group-hover:bg-[length:100%_auto] transition-all duration-500" />
            
            {/* Button Content */}
            <div className="relative flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold tracking-wide">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white/90" />
              ) : (
                <>
                  REQUEST CLEARANCE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Already have clearance?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline underline-offset-4">
              Return to Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
