import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Loader2, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success('Password reset link sent to your email!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link');
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
        
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors hover:underline underline-offset-4">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Login
        </Link>

        {/* Branding Icon */}
        <div className="flex justify-start mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <ShieldAlert className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Recovery</h2>
          <p className="text-slate-400 font-light leading-relaxed">Enter your registered operative ID to receive a secure password reset link.</p>
        </div>

        {!sent ? (
          <form onSubmit={handleReset} className="space-y-6">
            
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
                  'DISPATCH RESET LINK'
                )}
              </div>
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 bg-[#020617]/50 rounded-2xl border border-cyan-500/20"
          >
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl text-white font-medium mb-3">Transmission Successful</h3>
            <p className="text-slate-400 font-light px-4">
              We've dispatched recovery instructions to <br/><span className="text-cyan-400 font-medium">{email}</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
